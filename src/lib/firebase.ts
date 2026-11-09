import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  deleteDoc,
  onSnapshot, 
  getDocFromServer,
  increment,
  addDoc
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import { UserProfile, UserRole, UserStatus, UserPlan, SavedBaseline } from '../types';

export const ADMIN_EMAIL = 'alexrodrigues43@gmail.com';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebaseConfigData.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfigData.firestoreDatabaseId)
  : getFirestore(app);

// Central Database for the Suite (semantico-suite-core)
export const centralDb = getFirestore(app, 'semantico-suite-core');

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sanitiza recursivamente objetos removendo campos undefined para compatibilidade com o Firestore
 */
export function sanitizeForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
        clean[key] = sanitizeForFirestore(val);
      } else {
        clean[key] = val;
      }
    }
  }
  return clean;
}

export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// Connection test as required by Firebase skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'ping'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Verify network/config.');
      return false;
    }
    return true;
  }
}

// Ensure user document exists upon login/registration in Central Suite
export async function syncUserProfile(user: FirebaseUser): Promise<UserProfile> {
  const userRef = doc(centralDb, 'users', user.uid);
  const snap = await getDoc(userRef);
  const isSuperAdmin = isSuperAdminEmail(user.email);
  const now = new Date().toISOString();

  if (snap.exists()) {
    const existing = snap.data() as UserProfile;
    const updates: Partial<UserProfile> = {
      lastAppUsed: 'Analisador de Ganho de Informação',
      displayName: user.displayName || existing.displayName || user.email?.split('@')[0] || 'Usuário Semântico',
      photoURL: user.photoURL || existing.photoURL || '',
    };

    if (isSuperAdmin) {
      updates.role = 'admin';
      updates.status = 'active';
      updates.plan = 'lifetime';
      updates.creditsBalance = 999999;
    }

    await updateDoc(userRef, sanitizeForFirestore(updates));
    return { ...existing, ...updates };
  }

  // Create initial profile in Central Suite Core
  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'Usuário Semântico',
    photoURL: user.photoURL || '',
    role: isSuperAdmin ? 'admin' : 'client',
    status: 'active',
    plan: isSuperAdmin ? 'lifetime' : 'trial',
    creditsBalance: isSuperAdmin ? 999999 : 10,
    creditsUsed: 0,
    createdAt: now,
    lastAppUsed: 'Analisador de Ganho de Informação',
    notes: isSuperAdmin ? 'Super Administrador Automático' : 'Trial inicial da Suíte',
    auditsCount: 0
  };

  await setDoc(userRef, sanitizeForFirestore(newProfile));

  // Grava transação inicial de degustação
  if (!isSuperAdmin) {
    try {
      const txRef = doc(collection(centralDb, 'credit_transactions'));
      await setDoc(txRef, {
        id: txRef.id,
        uid: user.uid,
        userEmail: user.email || '',
        type: 'trial',
        app: 'Analisador de Ganho de Informação',
        amount: 10,
        balanceAfter: 10,
        description: 'Bônus de degustação da Suíte Semântico (10 créditos)',
        timestamp: now,
      });
    } catch (txErr) {
      console.warn('[Carteira] Falha ao registrar transação de trial:', txErr);
    }
  }

  return newProfile;
}

export async function loginWithEmail(email: string, pass: string): Promise<UserProfile> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return await syncUserProfile(cred.user);
}

export async function registerWithEmail(email: string, pass: string, name: string): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  if (name && cred.user) {
    try {
      await updateProfile(cred.user, { displayName: name });
    } catch (e) {
      console.warn('Could not set displayName:', e);
    }
  }
  return await syncUserProfile(cred.user);
}

export async function loginWithGoogle(): Promise<UserProfile> {
  const cred = await signInWithPopup(auth, googleProvider);
  return await syncUserProfile(cred.user);
}

export async function loginWithGoogleRedirect(): Promise<void> {
  await signInWithRedirect(auth, googleProvider);
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Escuta em tempo real o saldo da carteira central no semantico-suite-core
 */
export function subscribeCentralWallet(uid: string, callback: (profile: UserProfile | null) => void) {
  const userRef = doc(centralDb, 'users', uid);
  return onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as UserProfile);
    } else {
      callback(null);
    }
  }, (err) => {
    console.warn('[Carteira Central] Erro ao sincronizar carteira:', err);
  });
}

export const subscribeUserProfile = subscribeCentralWallet;

/**
 * Debita créditos atomicamente na base central semantico-suite-core e registra no extrato
 */
export async function deductCredits(
  uid: string,
  amount: number,
  actionDescription: string,
  userEmail: string
): Promise<boolean> {
  const isSuperAdmin = isSuperAdminEmail(userEmail);
  if (isSuperAdmin) return true; // Super Admin possui créditos infinitos

  const userRef = doc(centralDb, 'users', uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return false;

  const currentData = snap.data() as UserProfile;
  const currentBalance = currentData.creditsBalance ?? 0;
  if (currentBalance < amount) {
    return false; // Saldo insuficiente
  }

  const now = new Date().toISOString();
  await updateDoc(userRef, {
    creditsBalance: increment(-amount),
    creditsUsed: increment(amount),
    lastAppUsed: 'Analisador de Ganho de Informação',
  });

  // Registra no extrato de transações
  try {
    const txRef = doc(collection(centralDb, 'credit_transactions'));
    await setDoc(txRef, {
      id: txRef.id,
      uid,
      userEmail,
      type: 'usage',
      app: 'Analisador de Ganho de Informação',
      amount: -amount,
      balanceAfter: currentBalance - amount,
      description: actionDescription,
      timestamp: now,
    });
  } catch (err) {
    console.warn('[Carteira] Falha ao registrar transação no extrato:', err);
  }

  return true;
}

// Admin: Fetch all registered users
export async function getAllUsers(): Promise<UserProfile[]> {
  const usersRef = collection(db, 'users');
  const snap = await getDocs(usersRef);
  const list: UserProfile[] = [];
  snap.forEach((d) => {
    list.push(d.data() as UserProfile);
  });
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Admin: Update user status, plan, notes, or expiration
export async function updateUserAccess(
  userId: string, 
  data: Partial<Pick<UserProfile, 'status' | 'role' | 'plan' | 'expiresAt' | 'notes'>>
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, data);
}

// Admin: Delete user record
export async function deleteUserAccount(userId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
}

// Usage tracking: record audit execution
export async function recordUserAudit(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      auditsCount: increment(1)
    });
  } catch (err) {
    console.error('Failed to increment audit count:', err);
  }
}

// Persistência de Bases Canônicas do Usuário (Redator / Projeto)
export async function saveUserBaseline(userId: string, baseline: SavedBaseline): Promise<string> {
  try {
    const coll = collection(db, 'users', userId, 'baselines');
    const docRef = await addDoc(coll, {
      ...baseline,
      criado_em: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.warn('Erro ao salvar baseline no Firestore:', err);
    return 'local-' + Date.now();
  }
}

export async function getUserBaselines(userId: string): Promise<SavedBaseline[]> {
  try {
    const coll = collection(db, 'users', userId, 'baselines');
    const snap = await getDocs(coll);
    const list: SavedBaseline[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...(d.data() as SavedBaseline) });
    });
    return list.sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
  } catch (err) {
    console.warn('Erro ao recuperar baselines do Firestore:', err);
    return [];
  }
}

export async function deleteUserBaseline(userId: string, baselineId: string): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId, 'baselines', baselineId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Erro ao deletar baseline:', err);
  }
}

/**
 * Persist UI language to centralDb user profile
 */
export async function updateUserUiLang(uid: string, uiLang: 'pt' | 'en' | 'es'): Promise<void> {
  try {
    const userCentralRef = doc(centralDb, 'users', uid);
    await updateDoc(userCentralRef, {
      uiLang,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('[i18n] Falha ao sincronizar uiLang com centralDb:', err);
  }
}


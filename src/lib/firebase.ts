import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
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
  increment
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import { UserProfile, UserRole, UserStatus, UserPlan } from '../types';

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

const googleProvider = new GoogleAuthProvider();

// Connection test as required by Firebase skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'ping'));
    return true;
  } catch (error) {
    // If permission denied, connection to server is still established
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Verify network/config.');
      return false;
    }
    return true;
  }
}

// Ensure user document exists upon login/registration
export async function syncUserProfile(user: FirebaseUser): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (snap.exists()) {
    const existing = snap.data() as UserProfile;
    // Auto-promote admin email if not already
    if (isAdmin && existing.role !== 'admin') {
      await updateDoc(userRef, { role: 'admin', status: 'active' });
      return { ...existing, role: 'admin', status: 'active' };
    }
    return existing;
  }

  // Create initial profile
  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'Usuário',
    role: isAdmin ? 'admin' : 'client',
    status: isAdmin ? 'active' : 'pending',
    plan: isAdmin ? 'lifetime' : 'monthly',
    expiresAt: isAdmin ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    notes: isAdmin ? 'Super Administrador do Sistema' : 'Novo cadastro aguardando liberação',
    auditsCount: 0
  };

  await setDoc(userRef, newProfile);
  return newProfile;
}

export async function loginWithEmail(email: string, pass: string): Promise<UserProfile> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return await syncUserProfile(cred.user);
}

export async function registerWithEmail(email: string, pass: string, name: string): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  if (name && cred.user) {
    await updateProfile(cred.user, { displayName: name });
  }
  return await syncUserProfile(cred.user);
}

export async function loginWithGoogle(): Promise<UserProfile> {
  const cred = await signInWithPopup(auth, googleProvider);
  return await syncUserProfile(cred.user);
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeUserProfile(uid: string, callback: (profile: UserProfile | null) => void) {
  const userRef = doc(db, 'users', uid);
  return onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as UserProfile);
    } else {
      callback(null);
    }
  }, (err) => {
    console.warn('User profile subscription notice:', err.message);
  });
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

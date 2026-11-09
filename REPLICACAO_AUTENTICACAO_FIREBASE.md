# 🔐 Guia de Autenticação, Perfis e Controle RBAC: Analisador de Ganho de Informação

Este documento documenta a especificação técnica completa, regras de segurança, estruturas de dados, fluxos de código e automação de deploy do **Analisador de Ganho de Informação (Atomic Fact & Information Gain Analyzer)** no ecossistema Semântico.

---

## 📌 1. Visão Geral da Arquitetura

O sistema adota uma arquitetura híbrida de **Firebase Authentication + Cloud Firestore** com padrão **RBAC (Role-Based Access Control)** e governança de quota:

1. **Métodos de Autenticação:**
   - **Google 1-Click Login:** `signInWithPopup(auth, googleProvider)` com seleção de contas.
   - **E-mail e Senha:** `signInWithEmailAndPassword` e `createUserWithEmailAndPassword` com atualização de `displayName`.
2. **Sincronização Automática com Firestore (`users/{uid}`):**
   - Ao autenticar ou registrar, a função central `syncUserProfile(user)` verifica a existência do documento do usuário.
   - Se for o **Super Administrador** (`alexrodrigues43@gmail.com`), são concedidos automaticamente privilégios `role: "admin"`, `status: "active"`, `plan: "lifetime"`.
   - Usuários normais iniciam como `role: "client"`, `status: "pending"`, `plan: "monthly"`, aguardando liberação do admin.
3. **Escuta Reativa em Tempo Real (`onSnapshot`):**
   - O aplicativo observa em tempo real o status da conta do usuário. Assim que o administrador ativa a conta no painel, a restrição de acesso é removida dinamicamente.
4. **Regras de Segurança Estritas no Firestore (`firestore.rules`):**
   - Usuários comuns não conseguem alterar seus próprios campos protegidos (`role`, `status`, `plan`, `expiresAt`).
   - Somente o Super Admin consegue listar todos os usuários ou gerenciar privilégios.

---

## 📁 2. Mapeamento de Componentes & Arquivos

| Arquivo | Função / Responsabilidade |
| :--- | :--- |
| `src/types.ts` | Interfaces TypeScript (`UserProfile`, `UserRole`, `UserStatus`, `UserPlan`, `AtomicFact`, etc.) |
| `src/lib/firebase.ts` | Inicialização do Firebase Auth & Firestore, `syncUserProfile`, `loginWithGoogle`, `loginWithEmail`, `recordUserAudit` |
| `src/components/AuthModal.tsx` | Diálogo de Login e Criação de Conta |
| `src/components/AdminPanelModal.tsx` | Painel Administrativo para aprovação de contas, alteração de status e planos |
| `src/components/AccessRestrictedModal.tsx` | Notificação e retenção para contas com status `pending` ou `blocked` |
| `firestore.rules` | Regras de segurança no banco de dados para isolamento e proteção RBAC |
| `firebase-blueprint.json` | Esquema formal aceito pelas ferramentas do Firebase |
| `deploy_cloud_run.sh` | Automação de deploy com parâmetros de produção e injeção segura de segredos |
| `authorize_firebase_domain.py` | Script para autorização automática de domínios na API do Identity Toolkit |

---

## 🧱 3. Modelo de Dados de Usuário (`src/types.ts`)

```typescript
export type UserRole = 'admin' | 'client';
export type UserStatus = 'active' | 'pending' | 'blocked' | 'expired';
export type UserPlan = 'trial' | 'monthly' | 'annual' | 'lifetime';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  plan: UserPlan;
  expiresAt: string | null;
  createdAt: string;
  notes?: string;
  auditsCount?: number;
}
```

---

## 🛡️ 4. Regras de Segurança do Firestore (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && (
        request.auth.token.email == 'alexrodrigues43@gmail.com' ||
        (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin')
      );
    }

    match /users/{userId} {
      allow read: if isAdmin() || isOwner(userId);
      allow create: if isOwner(userId) || isAdmin();
      allow update: if isAdmin() || (
        isOwner(userId) &&
        !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'status', 'plan', 'expiresAt'])
      );
      allow delete: if isAdmin();
    }
  }
}
```

---

## 🚀 5. Deploy no Google Cloud Run e Domínios Customizados

### Pré-requisitos
- Projeto Firebase: `blogsemantico-1750525854725`
- Subdomínio: `ganho-informacao.semantico.com.br`

### Comandos de Deploy
```bash
# Executar script de deploy automatizado
./deploy_cloud_run.sh blogsemantico-1750525854725 us-central1

# Para autorizar qualquer subdomínio customizado adicional no Firebase:
python3 ./authorize_firebase_domain.py ganho-informacao.semantico.com.br
```

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  Trash2, 
  Edit3, 
  Save, 
  RefreshCw,
  Sparkles,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, UserStatus, UserPlan } from '../types';
import { getAllUsers, updateUserAccess, deleteUserAccount } from '../lib/firebase';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const list = await getAllUsers();
      setUsers(list);
    } catch (err: any) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      await updateUserAccess(userId, { status: newStatus });
      setUsers((prev) =>
        prev.map((u) => (u.uid === userId ? { ...u, status: newStatus } : u))
      );
      setActionSuccess(`Status atualizado para ${newStatus.toUpperCase()}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error updating status:', err);
    }
  };

  const handlePlanChange = async (userId: string, newPlan: UserPlan) => {
    try {
      await updateUserAccess(userId, { plan: newPlan });
      setUsers((prev) =>
        prev.map((u) => (u.uid === userId ? { ...u, plan: newPlan } : u))
      );
      setActionSuccess(`Plano alterado para ${newPlan.toUpperCase()}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error updating plan:', err);
    }
  };

  const handleSaveNotes = async (userId: string) => {
    try {
      await updateUserAccess(userId, { notes: editNotes });
      setUsers((prev) =>
        prev.map((u) => (u.uid === userId ? { ...u, notes: editNotes } : u))
      );
      setEditingUserId(null);
      setActionSuccess('Anotações salvas com sucesso');
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error saving notes:', err);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o cadastro de ${email}?`)) {
      return;
    }
    try {
      await deleteUserAccount(userId);
      setUsers((prev) => prev.filter((u) => u.uid !== userId));
      setActionSuccess(`Usuário ${email} removido`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error deleting user:', err);
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.displayName && u.displayName.toLowerCase().includes(search.toLowerCase())) ||
      (u.notes && u.notes.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Metrics
  const totalCount = users.length;
  const activeCount = users.filter((u) => u.status === 'active').length;
  const pendingCount = users.filter((u) => u.status === 'pending').length;
  const blockedCount = users.filter((u) => u.status === 'blocked' || u.status === 'expired').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-headline">
                  Painel Administrativo de Assinaturas & Licenças
                </h2>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Alexandre (Super Admin)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gerencie permissões de acesso, aprove pagamentos e controle clientes autorizados
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadUsers}
              disabled={loading}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Atualizar lista"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action success alert */}
        {actionSuccess && (
          <div className="px-6 py-2.5 bg-emerald-500 text-white text-xs font-semibold flex items-center justify-between">
            <span>{actionSuccess}</span>
            <button onClick={() => setActionSuccess(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Total de Cadastros
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              {totalCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40">
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Assinantes Ativos</span>
            </span>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {activeCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40">
            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 block flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Pendentes de Liberação</span>
            </span>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono">
              {pendingCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-medium text-rose-500 block flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              <span>Bloqueados / Expirados</span>
            </span>
            <span className="text-2xl font-bold text-rose-500 font-mono">
              {blockedCount}
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por e-mail, nome ou nota..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            {(['all', 'pending', 'active', 'blocked'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {status === 'all'
                  ? 'Todos'
                  : status === 'pending'
                  ? `Pendentes (${pendingCount})`
                  : status === 'active'
                  ? `Ativos (${activeCount})`
                  : 'Bloqueados'}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Nenhum usuário encontrado para este critério.
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSuperAdmin = user.email.toLowerCase() === 'alexrodrigues43@gmail.com';
              const isEditing = editingUserId === user.uid;

              return (
                <div
                  key={user.uid}
                  className={`p-4 rounded-2xl border transition-all ${
                    user.status === 'active'
                      ? 'border-emerald-200 dark:border-emerald-950/80 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : user.status === 'pending'
                      ? 'border-amber-300 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* User info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {user.displayName || 'Sem nome'}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          ({user.email})
                        </span>
                        {isSuperAdmin && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px]">
                            SUPER ADMIN
                          </span>
                        )}
                        {/* Status Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            user.status === 'active'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : user.status === 'pending'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                          }`}
                        >
                          {user.status === 'active'
                            ? 'Acesso Liberado'
                            : user.status === 'pending'
                            ? 'Aguardando Aprovação'
                            : 'Bloqueado'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>
                          Cadastrado em:{' '}
                          <strong className="text-slate-600 dark:text-slate-300">
                            {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          Auditorias realizadas:{' '}
                          <strong className="text-slate-600 dark:text-slate-300 font-mono">
                            {user.auditsCount || 0}
                          </strong>
                        </span>
                      </div>

                      {/* Notes row */}
                      <div className="pt-1 text-xs">
                        {isEditing ? (
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="text"
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Adicionar nota (ex: PIX R$ 197 recebido em 04/09)"
                              className="w-full sm:w-96 px-3 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveNotes(user.uid)}
                              className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Save className="w-3 h-3" />
                              <span>Salvar</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingUserId(null)}
                              className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 italic">
                            <span>
                              Nota: {user.notes || 'Nenhuma nota adicionada'}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingUserId(user.uid);
                                setEditNotes(user.notes || '');
                              }}
                              className="text-amber-600 dark:text-amber-400 hover:underline not-italic font-medium text-[11px] inline-flex items-center gap-0.5 cursor-pointer"
                            >
                              <Edit3 className="w-2.5 h-2.5" />
                              <span>Editar</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions & Plan control */}
                    {!isSuperAdmin && (
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* Plan selector */}
                        <select
                          value={user.plan || 'monthly'}
                          onChange={(e) => handlePlanChange(user.uid, e.target.value as UserPlan)}
                          className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                        >
                          <option value="trial">Trial (Teste)</option>
                          <option value="monthly">Plano Mensal</option>
                          <option value="annual">Plano Anual</option>
                          <option value="lifetime">Vitalício</option>
                        </select>

                        {/* Status Switch Buttons */}
                        {user.status !== 'active' ? (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(user.uid, 'active')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Liberar Acesso</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(user.uid, 'blocked')}
                            className="px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Bloquear</span>
                          </button>
                        )}

                        {/* Delete User */}
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user.uid, user.email)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Excluir cadastro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              Ao clicar em <strong>"Liberar Acesso"</strong>, o cliente tem acesso instantâneo às ferramentas de auditoria e grafos.
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold cursor-pointer"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};

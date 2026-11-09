import React from 'react';
import { 
  X, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  ExternalLink,
  Clock,
  Zap,
  QrCode
} from 'lucide-react';
import { UserProfile } from '../types';

interface AccessRestrictedModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  reason?: string;
}

export const AccessRestrictedModal: React.FC<AccessRestrictedModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  reason,
}) => {
  if (!isOpen) return null;

  const isPending = currentUser?.status === 'pending';
  const isBlocked = currentUser?.status === 'blocked' || currentUser?.status === 'expired';
  const isOutOfCredits = currentUser && (currentUser.creditsBalance ?? 0) <= 0;

  const cobradorUrl = 'https://semantico-cobrador-316925929262.us-central1.run.app';
  const whatsappUrl = `https://wa.me/5551989011709?text=${encodeURIComponent(
    `Olá Alex! Sou usuário do Semântico Analisador de Ganho de Informação (${currentUser?.email || 'novo usuário'}) e gostaria de assinar/recarregar créditos via PIX.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300" />

        <div className="p-6 sm:p-8">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center p-2 text-amber-600 dark:text-amber-400 shadow-xs">
              {isOutOfCredits ? (
                <Zap className="w-6 h-6 text-amber-500" />
              ) : isPending ? (
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              ) : (
                <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {!currentUser
                  ? 'Conecte-se e Ganhe 10 Créditos'
                  : isOutOfCredits
                  ? 'Créditos Esgotados'
                  : isPending
                  ? 'Cadastro em Análise'
                  : isBlocked
                  ? 'Licença Expirada'
                  : 'Carteira da Suíte Semântico'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-headline">
                {!currentUser
                  ? 'Experimente a Suíte Semântico'
                  : isOutOfCredits
                  ? 'Recarregue ou Assine a Suíte'
                  : 'Desbloqueie o Auditor Semântico S-P-O'}
              </h3>
            </div>
          </div>

          {/* Description text */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {reason || (
              !currentUser ? (
                <>Crie sua conta para receber imediatamente <strong>10 créditos de degustação gratuitos</strong> válidos em todas as ferramentas da Suíte Semântico.</>
              ) : isOutOfCredits ? (
                <>Seu saldo de créditos na carteira central chegou a zero. Adquira uma recarga avulsa ou assine um plano mensal para continuar auditando.</>
              ) : isPending ? (
                <>Olá, <strong>{currentUser.displayName || currentUser.email}</strong>! Seu cadastro está aguardando liberação da equipe.</>
              ) : isBlocked ? (
                <>Sua conta está pausada ou seu plano encerrou. Renove sua assinatura para continuar usando.</>
              ) : (
                <>Esta funcionalidade requer saldo positivo na sua carteira de créditos unificada da Suíte Semântico.</>
              )
            )}
          </p>

          {/* Wallet Balance Badge */}
          {currentUser && (
            <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <span>Saldo na Carteira Central:</span>
              <span className="font-extrabold text-amber-600 dark:text-amber-400">{currentUser.creditsBalance ?? 0} créditos</span>
            </div>
          )}

          {/* Plan Cards for logged-in users */}
          {currentUser && (
            <div className="space-y-2.5 mb-5">
              <div className="p-3 rounded-xl border-2 border-amber-400 bg-amber-50/60 dark:bg-amber-950/20 relative">
                <span className="absolute -top-2.5 right-3 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs">
                  Mais Popular
                </span>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Plano Especialista</h4>
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400">R$ 247/mês</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  <strong>150 créditos unificados</strong> mensais válidos em todas as 6 ferramentas.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Recarga Avulsa (100 Créditos)</h4>
                  <span className="text-xs font-black text-slate-950 dark:text-slate-200">R$ 97 avulso</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Créditos imediatos sem data de expiração.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Plano Agência</h4>
                  <span className="text-xs font-black text-slate-950 dark:text-slate-200">R$ 697/mês</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>600 créditos unificados</strong> para equipes e alto volume de produção.
                </p>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-2.5">
            {!currentUser ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth('register');
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Criar Cadastro e Ganhar 10 Créditos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Já tenho conta (Fazer Login)
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <a
                  href={cobradorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pagar via PIX no Cobrador Semântico</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar no WhatsApp para Liberação Imediata</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium transition-colors cursor-pointer text-center"
                >
                  Continuar Navegando
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

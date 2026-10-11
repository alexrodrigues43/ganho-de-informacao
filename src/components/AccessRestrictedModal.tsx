import React from 'react';
import { 
  X, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  ShieldAlert, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { UserProfile } from '../types';
import { SemanticoIcon } from './SemanticoIcon';

interface AccessRestrictedModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const AccessRestrictedModal: React.FC<AccessRestrictedModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const isPending = currentUser?.status === 'pending';
  const isBlocked = currentUser?.status === 'blocked' || currentUser?.status === 'expired';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
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
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center p-2 text-amber-600 dark:text-amber-400 shadow-xs">
              {isPending ? (
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              ) : (
                <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {isPending ? 'Cadastro em Análise' : isBlocked ? 'Assinatura Inativa' : 'Acesso Restrito a Assinantes'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-headline">
                {isPending 
                  ? 'Aguardando Liberação da Sua Licença' 
                  : isBlocked
                  ? 'Sua Licença Expirou ou foi Pausada'
                  : 'Desbloqueie o Auditor Semântico S-P-O'}
              </h3>
            </div>
          </div>

          {/* Description text */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {isPending ? (
              <>
                Olá, <strong>{currentUser?.displayName || currentUser?.email}</strong>! Seu cadastro foi recebido com sucesso no sistema. O acesso ao motor analítico e geração de grafos é exclusivo para clientes com assinatura ativa.
              </>
            ) : isBlocked ? (
              <>
                Seu período de assinatura encerrou ou sua conta está pausada. Entre em contato com o suporte do Semântico para reativar sua licença.
              </>
            ) : (
              <>
                Para processar textos com a extração formal de <strong>Fatos Atômicos (Sujeito-Predicado-Objeto)</strong>, cálculo de <strong>Ganho de Informação</strong> e renderização de <strong>Grafos de Conhecimento</strong>, é necessária uma assinatura ativa.
              </>
            )}
          </p>

          {/* What is included box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5 mb-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>O que está incluso na licença:</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Auditoria completa com patente de Ganho Marginal de Informação (US 11,354,342 B2)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Graph Studio com visualização 2D/3D interativa de nós e arestas semânticas</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Exportação de laudo analítico em Markdown e HTML anotado</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            {/* Primary Action: Talk to Alexandre / Contact */}
            <a
              href="https://semantico.com.br/contato.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Falar com Alexandre / Liberar Acesso</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth('login');
                  }}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Já sou Assinante (Login)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth('register');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  Criar Cadastro
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium transition-colors cursor-pointer text-center"
              >
                Voltar à navegação pública
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { AtomicFact, ThemeMode } from '../types';
import { X, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

interface FactDetailModalProps {
  fact: AtomicFact | null;
  onClose: () => void;
  theme: ThemeMode;
}

export const FactDetailModal: React.FC<FactDetailModalProps> = ({ fact, onClose, theme }) => {
  if (!fact) return null;

  const isDark = theme === 'dark';
  const isNew = fact.classificacao === 'NOVO';
  const isIncremental = fact.classificacao === 'INCREMENTAL';
  const isRedundant = fact.classificacao === 'REDUNDANTE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden flex flex-col transition-all ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-amber-500">{fact.id}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                isNew
                  ? isDark
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : isIncremental
                  ? isDark
                    ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {fact.classificacao || 'ATÔMICO CANÔNICO'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4 text-xs">
          {/* S-P-O Box */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Formalização FTS: Tripleto Atômico (S-P-O)
            </span>
            <div
              className={`p-3 rounded-lg border font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-medium">Sujeito</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{fact.sujeito}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 hidden sm:block" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-medium">Predicado</span>
                <span className="font-semibold text-amber-500">{fact.predicado}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 hidden sm:block" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-medium">Objeto</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{fact.objeto}</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`p-3 rounded-lg border flex flex-col gap-1 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] text-slate-400 font-medium">Score de Ganho Marginal</span>
              <div className="flex items-baseline gap-1">
                <span className={`font-mono text-xl font-bold ${isNew ? 'text-emerald-500' : isIncremental ? 'text-amber-500' : 'text-slate-400'}`}>
                  {fact.score_marginal !== undefined ? fact.score_marginal.toFixed(2) : '1.00'}
                </span>
                <span className="font-mono text-xs text-slate-400">/ 1.0</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border flex flex-col gap-1 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] text-slate-400 font-medium">Similaridade Cosseno</span>
              <span className="font-mono text-sm font-semibold text-slate-300">
                {typeof fact.similaridade_cosseno === 'number'
                  ? fact.similaridade_cosseno.toFixed(2)
                  : fact.similaridade_cosseno || '0.22 (Distante)'}
              </span>
            </div>
          </div>

          {/* Excerpt */}
          {fact.trecho_origem && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Trecho Literal na Fonte
              </span>
              <div
                className={`p-3 rounded-lg border font-serif text-xs leading-relaxed italic ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                "{fact.trecho_origem}"
              </div>
            </div>
          )}

          {/* Justification */}
          {fact.justificativa && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Justificativa Algorítmica (US 11,354,342 B2)
              </span>
              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {fact.justificativa}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-3 border-t flex items-center justify-between text-xs ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}
        >
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span>FTS Kernel Engine • Espaço vetorial 1536d</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { AtomicFact, SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';
import { X, Cpu, ArrowRight } from 'lucide-react';

interface FactDetailModalProps {
  fact: AtomicFact | null;
  onClose: () => void;
  uiLang?: SupportedLang;
}

export const FactDetailModal: React.FC<FactDetailModalProps> = ({ fact, onClose, uiLang = 'pt' }) => {
  const t = getTranslations(uiLang);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!fact) return null;

  const isNew = fact.classificacao === 'NOVO';
  const isIncremental = fact.classificacao === 'INCREMENTAL';

  const classLabel = isNew
    ? (uiLang === 'en' ? 'NOVEL' : uiLang === 'es' ? 'INÉDITO' : 'NOVO')
    : isIncremental
    ? (uiLang === 'en' ? 'INCREMENTAL' : uiLang === 'es' ? 'INCREMENTAL' : 'INCREMENTAL')
    : fact.classificacao || t.factDetail.canonicalBadge;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.factDetail.title}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-slate-300 bg-white text-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-amber-500">{fact.id}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                isNew
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : isIncremental
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {classLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
            aria-label={t.factDetail.close}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4 text-xs">
          {/* S-P-O Box */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {t.factDetail.spoFormalization}
            </span>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-medium">{t.factDetail.subject}</span>
                <span className="font-bold text-slate-900">[{fact.sujeito}]</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 hidden sm:block" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-medium">{t.factDetail.predicate}</span>
                <span className="font-semibold text-amber-500">{fact.predicado}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 hidden sm:block" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-medium">{t.factDetail.object}</span>
                <span className="font-bold text-slate-900">[{fact.objeto}]</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-medium">{t.factDetail.marginalScore}</span>
              <div className="flex items-baseline gap-1">
                <span className={`font-mono text-xl font-bold ${isNew ? 'text-emerald-500' : isIncremental ? 'text-amber-500' : 'text-slate-400'}`}>
                  {fact.score_marginal !== undefined ? fact.score_marginal.toFixed(2) : '1.00'}
                </span>
                <span className="font-mono text-xs text-slate-400">/ 1.0</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-medium">{t.factDetail.cosineSimilarity}</span>
              <span className="font-mono text-sm font-semibold text-slate-700">
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
                {t.factDetail.originSnippet}
              </span>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-serif text-xs leading-relaxed italic text-slate-700">
                "{fact.trecho_origem}"
              </div>
            </div>
          )}

          {/* Justification */}
          {fact.justificativa && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                {t.factDetail.justification}
              </span>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-700">
                {fact.justificativa}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>FTS Kernel Engine • Espaço vetorial 1536d</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold transition-colors cursor-pointer"
          >
            {t.factDetail.close}
          </button>
        </div>
      </div>
    </div>
  );
};

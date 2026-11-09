import React from 'react';
import { FilePlus, Zap, Loader2, Trash2, RotateCcw } from 'lucide-react';
import { SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';

interface CandidateCardProps {
  candidateText: string;
  onChangeCandidateText?: (text: string) => void;
  onTextChange?: (text: string) => void;
  onAnalyze?: () => void;
  onAnalyzeGain?: () => void;
  isAnalyzing: boolean;
  onClear?: () => void;
  onClearText?: () => void;
  onResetAll?: () => void;
  uiLang?: SupportedLang;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidateText,
  onChangeCandidateText,
  onTextChange,
  onAnalyze,
  onAnalyzeGain,
  isAnalyzing,
  onClear,
  onClearText,
  onResetAll,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  const handleTextChange = onTextChange || onChangeCandidateText || (() => {});
  const handleAnalyze = onAnalyze || onAnalyzeGain || (() => {});
  const handleClear = onClear || onClearText;

  const charCount = candidateText.length;
  const wordCount = candidateText.trim() ? candidateText.trim().split(/\s+/).length : 0;

  return (
    <div
      id="card-candidate-doc"
      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold shadow-xs">
            <FilePlus className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-slate-950">
              {t.candidate.title}
            </h3>
            <span className="text-[11px] text-slate-400 block -mt-0.5">
              {t.candidate.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {candidateText.length > 0 && handleClear && (
            <button
              type="button"
              onClick={handleClear}
              title={t.candidate.clearBtn}
              className="min-h-[44px] px-3 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.candidate.clearBtn}</span>
            </button>
          )}

          <span className="font-mono text-[11px] border px-3 py-1 rounded-full font-semibold text-amber-900 bg-amber-50 border-amber-200">
            {charCount.toLocaleString(uiLang === 'en' ? 'en-US' : uiLang === 'es' ? 'es-ES' : 'pt-BR')} {t.candidate.statsChar} • {wordCount} {t.candidate.statsWord}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col gap-4">
        <textarea
          id="input-new-doc"
          value={candidateText}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={t.candidate.placeholder}
          className="w-full font-sans text-base sm:text-xs leading-relaxed rounded-xl p-4 min-h-[170px] focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all resize-y custom-scroll border text-slate-800 bg-slate-50/70 border-slate-200/90 placeholder-slate-400"
        />

        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            id="btn-analyze-gain"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !candidateText.trim()}
            className="flex-1 w-full min-h-[44px] py-3.5 px-6 font-bold text-sm rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer bg-slate-950 hover:bg-slate-800 text-white"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Zap className="w-4 h-4 fill-current text-amber-400" aria-hidden="true" />
            )}
            <span>{isAnalyzing ? t.candidate.btnAnalyzing : t.candidate.btnAnalyze}</span>
          </button>

          {onResetAll && (
            <button
              type="button"
              id="btn-reset-all-quick"
              onClick={onResetAll}
              title={t.nav.resetAllDesc}
              className="min-h-[44px] px-4 py-3.5 rounded-full border border-slate-300 text-slate-600 hover:text-slate-950 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.candidate.resetAllQuick}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

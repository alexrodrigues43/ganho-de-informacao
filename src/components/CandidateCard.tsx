import React from 'react';
import { ThemeMode } from '../types';
import { FilePlus, Zap, Loader2, Sparkles, Trash2, RotateCcw } from 'lucide-react';

interface CandidateCardProps {
  theme: ThemeMode;
  candidateText: string;
  onChangeCandidateText: (text: string) => void;
  onAnalyzeGain: () => void;
  isAnalyzing: boolean;
  onClearText?: () => void;
  onResetAll?: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  theme,
  candidateText,
  onChangeCandidateText,
  onAnalyzeGain,
  isAnalyzing,
  onClearText,
  onResetAll,
}) => {
  const isDark = theme === 'dark';

  const charCount = candidateText.length;
  const wordCount = candidateText.trim() ? candidateText.trim().split(/\s+/).length : 0;

  return (
    <div
      id="card-candidate-doc"
      className={`rounded-2xl border transition-all flex flex-col justify-between ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}
    >
      {/* Header */}
      <div
        className={`p-6 border-b flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/70 border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold shadow-xs">
            <FilePlus className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`font-serif text-lg font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Novo Documento para Auditoria
            </h3>
            <span className="text-[11px] text-slate-400 block -mt-0.5">
              Texto candidato à mensuração de novidade e ganho marginal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {candidateText.length > 0 && onClearText && (
            <button
              type="button"
              onClick={onClearText}
              title="Limpar campo do texto candidato"
              className="px-2.5 py-1 text-[11px] font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          )}

          <span
            className={`font-mono text-[11px] border px-3 py-1 rounded-full font-semibold ${
              isDark
                ? 'text-amber-300 bg-amber-950/70 border-amber-500/40'
                : 'text-amber-900 bg-amber-50 border-amber-200'
            }`}
          >
            {charCount.toLocaleString('pt-BR')} carac. • {wordCount} pal.
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col gap-4">
        <textarea
          id="input-new-doc"
          value={candidateText}
          onChange={(e) => onChangeCandidateText(e.target.value)}
          placeholder="Cole aqui o artigo, post de blog, documentação ou texto a ser auditado contra a base..."
          className={`w-full font-sans text-xs leading-relaxed rounded-xl p-4 min-h-[170px] focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all resize-y custom-scroll border ${
            isDark
              ? 'text-slate-200 bg-slate-950/80 border-slate-800 placeholder-slate-600'
              : 'text-slate-800 bg-slate-50/70 border-slate-200/90 placeholder-slate-400'
          }`}
        />

        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            id="btn-analyze-gain"
            onClick={onAnalyzeGain}
            disabled={isAnalyzing || !candidateText.trim()}
            className={`flex-1 w-full py-3.5 px-6 font-bold text-sm rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer ${
              isDark
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                : 'bg-slate-950 hover:bg-slate-800 text-white'
            }`}
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 fill-current text-amber-400" />
            )}
            <span>{isAnalyzing ? 'Calculando divergência e ganho de informação...' : 'Calcular Ganho de Informação & Decompor Fatos'}</span>
          </button>

          {onResetAll && (
            <button
              type="button"
              id="btn-reset-all-quick"
              onClick={onResetAll}
              title="Limpar todos os campos e ocultar relatórios para começar do zero"
              className={`px-4 py-3.5 rounded-full border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'border-slate-300 text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Geral</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

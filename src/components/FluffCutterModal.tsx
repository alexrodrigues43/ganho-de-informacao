import React from 'react';
import { FluffItem, ThemeMode } from '../types';
import { Scissors, X, Check, ArrowRight, Sparkles, TrendingDown } from 'lucide-react';

interface FluffCutterModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  items: FluffItem[];
  onApplySynthesis: (original: string, synthesized: string) => void;
}

export const FluffCutterModal: React.FC<FluffCutterModalProps> = ({
  isOpen,
  onClose,
  theme,
  items,
  onApplySynthesis,
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Cirurgião de Redundância & Fluff
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400">
                  Densidade de Termos
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detecta frases prolixas que gastam muitos termos para expressar fatos redundantes e propõe versões enxutas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-emerald-500" />
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Excelente! Nenhum trecho com excesso de fluff foi detectado.
              </p>
              <p className="text-xs">
                Seu texto já apresenta uma proporção sólida entre termos empregados e ganho de informação.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border space-y-3 transition ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                    {item.id} • {item.total_termos} termos
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Economia: ~{item.economia_termos_pct}% de termos
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-red-500">
                    Trecho Prolixo Original:
                  </span>
                  <p className="text-xs line-through text-slate-500 dark:text-slate-400 italic">
                    "{item.trecho_original}"
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
                    Versão Sintetizada & Direta:
                  </span>
                  <div
                    className={`p-3 rounded-lg border text-xs font-medium ${
                      isDark
                        ? 'bg-slate-900 border-emerald-900/40 text-emerald-300'
                        : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    "{item.versao_sintetizada}"
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  💡 {item.motivo_corte}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onApplySynthesis(item.trecho_original, item.versao_sintetizada);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Substituir no Rascunho
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center text-xs text-slate-500">
          <span>
            {items.length} trecho(s) redundante(s) analisado(s).
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium text-slate-800 dark:text-slate-200 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

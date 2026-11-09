import React from 'react';
import { InformationGap, ThemeMode } from '../types';
import { Lightbulb, PlusCircle, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

interface InformationGapFinderProps {
  theme: ThemeMode;
  gaps: InformationGap[];
  isLoading: boolean;
  onApplyGapExample: (example: string) => void;
  onRefreshGaps: () => void;
}

export const InformationGapFinder: React.FC<InformationGapFinderProps> = ({
  theme,
  gaps,
  isLoading,
  onApplyGapExample,
  onRefreshGaps,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-2xl border p-6 transition-all shadow-sm ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Buscador de Lacunas de Informação
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                Ineditismo Editorial
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Identifica dimensões conceituais dos termos que os concorrentes cobrem ou que nenhum deles explorou.
            </p>
          </div>
        </div>

        <button
          onClick={onRefreshGaps}
          disabled={isLoading}
          className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 font-medium disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {isLoading ? 'Mapeando lacunas...' : 'Atualizar Lacunas'}
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center space-y-3">
          <div className="inline-block w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Comparando ontologia do rascunho com a base canônica dos termos...
          </p>
        </div>
      ) : gaps.length === 0 ? (
        <div className="py-8 text-center border border-dashed rounded-xl border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" />
          Nenhuma lacuna crítica detectada no momento. Seu rascunho já cobre os principais axiomas da base canônica.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gaps.map((gap) => {
            const isQuant = gap.tipo === 'DADOS_QUANTITATIVOS';
            const isUnprecedented = gap.tipo === 'ANGULO_INEDITO';

            return (
              <div
                key={gap.id}
                className={`flex flex-col justify-between p-4 rounded-xl border transition-all hover:border-amber-500/50 ${
                  isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                      Termo: {gap.termo_relacionado}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        isQuant
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                          : isUnprecedented
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {gap.tipo.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    {gap.angulo_sugerido}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {gap.explicacao}
                  </p>

                  <div
                    className={`p-2.5 rounded-lg text-xs italic font-serif border ${
                      isDark
                        ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    "{gap.exemplo_proposicao}"
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => onApplyGapExample(gap.exemplo_proposicao)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition flex items-center gap-1.5 shadow-sm"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Inserir no Meu Rascunho
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

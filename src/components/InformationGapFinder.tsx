import React from 'react';
import { InformationGap, SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';
import { Lightbulb, PlusCircle, Sparkles, AlertCircle } from 'lucide-react';

interface InformationGapFinderProps {
  gaps: InformationGap[];
  isLoading: boolean;
  onApplyGapExample: (example: string) => void;
  onRefreshGaps: () => void;
  uiLang?: SupportedLang;
}

export const InformationGapFinder: React.FC<InformationGapFinderProps> = ({
  gaps,
  isLoading,
  onApplyGapExample,
  onRefreshGaps,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-all shadow-sm text-slate-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
            <Lightbulb className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {t.writerStudio.gapFinderTitle}
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600">
                {uiLang === 'en' ? 'Editorial Originality' : uiLang === 'es' ? 'Originalidad Editorial' : 'Ineditismo Editorial'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.writerStudio.gapFinderSubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={onRefreshGaps}
          disabled={isLoading}
          className="min-h-[44px] text-xs px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 transition flex items-center gap-1.5 font-medium disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
          <span>{isLoading ? t.common.loading : (uiLang === 'en' ? 'Refresh Gaps' : uiLang === 'es' ? 'Actualizar Brechas' : 'Atualizar Lacunas')}</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center space-y-3">
          <div className="inline-block w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">
            {uiLang === 'en' ? 'Comparing draft ontology against knowledge baseline...' : uiLang === 'es' ? 'Comparando la ontología del borrador con la línea base de conocimiento...' : 'Comparando ontologia do rascunho com a base canônica dos termos...'}
          </p>
        </div>
      ) : gaps.length === 0 ? (
        <div className="py-8 text-center border border-dashed rounded-xl border-slate-200 text-slate-500 text-sm">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" aria-hidden="true" />
          {uiLang === 'en'
            ? 'No critical gaps detected at this time. Your draft already covers the core axioms of the knowledge baseline.'
            : uiLang === 'es'
            ? 'No se detectaron brechas críticas en este momento. Su borrador ya cubre los axiomas principales de la línea base.'
            : 'Nenhuma lacuna crítica detectada no momento. Seu rascunho já cobre os principais axiomas da base canônica.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gaps.map((gap) => {
            const isQuant = gap.tipo === 'DADOS_QUANTITATIVOS';
            const isUnprecedented = gap.tipo === 'ANGULO_INEDITO';

            return (
              <div
                key={gap.id}
                className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/80 transition-all hover:border-amber-500/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                      {uiLang === 'en' ? 'Concept' : uiLang === 'es' ? 'Concepto' : 'Termo'}: {gap.termo_relacionado}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        isQuant
                          ? 'bg-blue-500/15 text-blue-600'
                          : isUnprecedented
                          ? 'bg-emerald-500/15 text-emerald-600'
                          : 'bg-amber-500/15 text-amber-600'
                      }`}
                    >
                      {gap.tipo.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-semibold text-sm mb-1 text-slate-900 flex items-center gap-1.5">
                    {gap.angulo_sugerido}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {gap.explicacao}
                  </p>

                  <div className="p-2.5 rounded-lg text-xs italic font-serif border border-slate-200 bg-white text-slate-700">
                    "{gap.exemplo_proposicao}"
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => onApplyGapExample(gap.exemplo_proposicao)}
                    className="min-h-[44px] text-xs px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.writerStudio.btnApplyGapExample}</span>
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

import React from 'react';
import { ConsolidatedMetrics, SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';

interface MetricsCardsProps {
  metrics?: ConsolidatedMetrics;
  scoreGeral?: number;
  classificacaoGeral?: 'ALTO GANHO' | 'MÉDIO GANHO' | 'BAIXO GANHO';
  fatosNovosPct?: number;
  fatosNovosCount?: number;
  fatosIncrementaisPct?: number;
  fatosIncrementaisCount?: number;
  fatosRedundantesPct?: number;
  fatosRedundantesCount?: number;
  uiLang?: SupportedLang;
}

export const MetricsCards: React.FC<MetricsCardsProps> = (props) => {
  const uiLang = props.uiLang || 'pt';
  const t = getTranslations(uiLang);

  const metrics: ConsolidatedMetrics = props.metrics || {
    score_geral: props.scoreGeral ?? 0,
    classificacao_geral: props.classificacaoGeral ?? 'MÉDIO GANHO',
    fatos_novos_count: props.fatosNovosCount ?? 0,
    fatos_novos_pct: props.fatosNovosPct ?? 0,
    fatos_incrementais_count: props.fatosIncrementaisCount ?? 0,
    fatos_incrementais_pct: props.fatosIncrementaisPct ?? 0,
    fatos_redundantes_count: props.fatosRedundantesCount ?? 0,
    fatos_redundantes_pct: props.fatosRedundantesPct ?? 0,
  };

  const classificationText =
    metrics.classificacao_geral === 'ALTO GANHO'
      ? t.metrics.highGain
      : metrics.classificacao_geral === 'MÉDIO GANHO'
      ? t.metrics.mediumGain
      : t.metrics.lowGain;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" id="metrics-grid">
      {/* 1. Score Geral */}
      <div
        id="metric-overall-score"
        className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-amber-500 rounded-full" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              {t.metrics.generalScore}
            </span>
          </div>
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full border bg-amber-50 border-amber-300 text-amber-800">
            {classificationText}
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
              {metrics.score_geral.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 1.00</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden mt-3 bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.score_geral * 100)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 font-normal pt-1">
          {metrics.score_geral >= 0.7
            ? (uiLang === 'en' ? 'Comfortably above gain threshold' : uiLang === 'es' ? 'Umbral de ganancia superado con holgura' : 'Threshold de ganho superado com folga')
            : (uiLang === 'en' ? 'Narrow novelty margin' : uiLang === 'es' ? 'Margen de novedad restringido' : 'Margem de novidade restrita')}
        </span>
      </div>

      {/* 2. Fatos Novos */}
      <div
        id="metric-new-facts"
        className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-emerald-500 rounded-full" aria-hidden="true" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider font-mono">
              {t.metrics.newFacts}
            </span>
          </div>
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full border bg-emerald-50 border-emerald-300 text-emerald-800">
            +{metrics.fatos_novos_pct}%
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-emerald-600">
              {metrics.fatos_novos_count}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {uiLang === 'en' ? 'exclusive propositions' : uiLang === 'es' ? 'proposiciones inéditas' : 'proposições inéditas'}
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden mt-3 bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.fatos_novos_pct)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-emerald-700/80 font-normal pt-1">
          {t.metrics.newFactsDesc}
        </span>
      </div>

      {/* 3. Incrementais */}
      <div
        id="metric-incremental-facts"
        className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-amber-400 rounded-full" aria-hidden="true" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider font-mono">
              {t.metrics.incrementalFacts}
            </span>
          </div>
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full border bg-amber-50 border-amber-300 text-amber-800">
            +{metrics.fatos_incrementais_pct}%
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-amber-600">
              {metrics.fatos_incrementais_count}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {uiLang === 'en' ? 'relational expansions' : uiLang === 'es' ? 'expansiones relacionales' : 'expansões relacionais'}
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden mt-3 bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.fatos_incrementais_pct)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-amber-700/80 font-normal pt-1">
          {t.metrics.incrementalFactsDesc}
        </span>
      </div>

      {/* 4. Redundantes */}
      <div
        id="metric-redundant-facts"
        className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-slate-400 rounded-full" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              {t.metrics.redundantFacts}
            </span>
          </div>
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full border bg-slate-100 border-slate-300 text-slate-700">
            {metrics.fatos_redundantes_pct}%
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-slate-700">
              {metrics.fatos_redundantes_count}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {uiLang === 'en' ? 'consensus duplicates' : uiLang === 'es' ? 'duplicaciones de consenso' : 'duplicações'}
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden mt-3 bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-400 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.fatos_redundantes_pct)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 font-normal pt-1">
          {t.metrics.redundantFactsDesc}
        </span>
      </div>
    </div>
  );
};

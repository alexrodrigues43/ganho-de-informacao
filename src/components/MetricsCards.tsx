import React from 'react';
import { ConsolidatedMetrics, ThemeMode } from '../types';
import { Award, Sparkles, TrendingUp, CopyCheck } from 'lucide-react';

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
  theme: ThemeMode;
}

export const MetricsCards: React.FC<MetricsCardsProps> = (props) => {
  const { theme } = props;
  const isDark = theme === 'dark';

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" id="metrics-grid">
      {/* 1. Score Geral */}
      <div
        id="metric-overall-score"
        className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50'
            : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-amber-500 rounded-full" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              Score Geral
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${
              isDark
                ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                : 'bg-amber-50 border-amber-300 text-amber-800'
            }`}
          >
            {metrics.classificacao_geral}
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-serif text-3xl sm:text-4xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {metrics.score_geral.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 1.00</span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden mt-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.score_geral * 100)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 font-normal pt-1">
          {metrics.score_geral >= 0.7 ? 'Threshold de ganho superado com folga' : 'Margem de novidade restrita'}
        </span>
      </div>

      {/* 2. Fatos Novos */}
      <div
        id="metric-new-facts"
        className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50'
            : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono">
              Fatos Novos
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${
              isDark
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                : 'bg-emerald-50 border-emerald-300 text-emerald-800'
            }`}
          >
            +{metrics.fatos_novos_pct}%
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400`}>
              {metrics.fatos_novos_count}
            </span>
            <span className="text-xs text-slate-400 font-medium">proposições inéditas</span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden mt-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.fatos_novos_pct)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-emerald-700/80 dark:text-emerald-400/80 font-normal pt-1">
          Inédito perante a base canônica
        </span>
      </div>

      {/* 3. Incrementais */}
      <div
        id="metric-incremental-facts"
        className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50'
            : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-amber-400 rounded-full" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider font-mono">
              Incrementais
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${
              isDark
                ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                : 'bg-amber-50 border-amber-300 text-amber-800'
            }`}
          >
            +{metrics.fatos_incrementais_pct}%
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-amber-600 dark:text-amber-400`}>
              {metrics.fatos_incrementais_count}
            </span>
            <span className="text-xs text-slate-400 font-medium">expansões relacionais</span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden mt-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.fatos_incrementais_pct)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-amber-700/80 dark:text-amber-400/80 font-normal pt-1">
          Acrescenta novos predicados ou nuances
        </span>
      </div>

      {/* 4. Redundantes */}
      <div
        id="metric-redundant-facts"
        className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-slate-400 rounded-full" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              Redundantes
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            {metrics.fatos_redundantes_pct}%
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-serif text-3xl sm:text-4xl font-semibold tracking-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {metrics.fatos_redundantes_count}
            </span>
            <span className="text-xs text-slate-400 font-medium">duplicações</span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden mt-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div
              className="h-full rounded-full bg-slate-400 transition-all duration-700"
              style={{ width: `${Math.min(100, metrics.fatos_redundantes_pct)}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 font-normal pt-1">
          Sobreposição estrita com a baseline
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { ConsolidatedMetrics, SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';
import { Database, FileText, TrendingUp, Sparkles } from 'lucide-react';

interface ComparisonBalanceProps {
  baselineFactsCount: number;
  candidateTextLength: number;
  candidateWordCount: number;
  metrics: ConsolidatedMetrics;
  candidateDocumentTitle?: string;
  uiLang?: SupportedLang;
}

export const ComparisonBalance: React.FC<ComparisonBalanceProps> = ({
  baselineFactsCount,
  candidateTextLength,
  candidateWordCount,
  metrics,
  candidateDocumentTitle,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  const totalFatosNovoTexto =
    metrics.fatos_novos_count + metrics.fatos_incrementais_count + metrics.fatos_redundantes_count;

  const classificationText =
    metrics.classificacao_geral === 'ALTO GANHO'
      ? t.metrics.highGain
      : metrics.classificacao_geral === 'MÉDIO GANHO'
      ? t.metrics.mediumGain
      : t.metrics.lowGain;

  return (
    <div
      id="comparison-balance-panel"
      className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-7 shadow-sm text-slate-900 transition-all"
    >
      {/* Header with Title and Patent Reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-950">
              {t.comparisonBalance.title}
            </h3>
          </div>
          <p className="text-xs mt-1 text-slate-600">
            {t.comparisonBalance.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border shadow-xs ${
              metrics.classificacao_geral === 'ALTO GANHO'
                ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                : metrics.classificacao_geral === 'MÉDIO GANHO'
                ? 'bg-amber-100 text-amber-950 border-amber-400'
                : 'bg-rose-100 text-rose-950 border-rose-400'
            }`}
          >
            {t.comparisonBalance.netScoreLabel} {(metrics.score_geral * 100).toFixed(0)}% ({classificationText})
          </span>
        </div>
      </div>

      {/* 3-Column Comparative Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
        {/* Column 1: Base de Conhecimento (Régua Prévia) */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 text-slate-700">
              <Database className="w-4 h-4 text-sky-500" aria-hidden="true" />
              <span>1. {t.comparisonBalance.colBaselineTitle}</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold border bg-slate-200 text-slate-800 border-slate-300">
              {t.baseline.ontologyBadge}
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-slate-950">
                {baselineFactsCount}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {t.comparisonBalance.factsMapped}
              </span>
            </div>
            <p className="text-xs mt-2 leading-relaxed text-slate-600">
              {t.comparisonBalance.colBaselineSub}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] font-mono font-medium text-slate-600">
            {baselineFactsCount > 0
              ? (uiLang === 'en' ? '✓ Baseline structured & active' : uiLang === 'es' ? '✓ Línea base estructurada y activa' : '✓ Base estruturada e ativa')
              : (uiLang === 'en' ? '⚠️ Empty baseline' : uiLang === 'es' ? '⚠️ Línea base vacía' : '⚠️ Base vazia')}
          </div>
        </div>

        {/* Column 2: Novo Documento Avaliado */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 text-slate-700">
              <FileText className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>2. {t.comparisonBalance.colCandidateTitle}</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold border bg-amber-100 text-amber-900 border-amber-300">
              {candidateWordCount} {t.candidate.statsWord}
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-slate-950">
                {totalFatosNovoTexto}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {t.comparisonBalance.totalEvaluated}
              </span>
            </div>
            <p className="text-xs mt-2 leading-relaxed text-slate-600">
              {t.comparisonBalance.colCandidateSub} ({candidateWordCount} {t.candidate.statsWord} • {candidateTextLength} {t.candidate.statsChar})
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] font-mono font-medium text-slate-600">
            {candidateDocumentTitle ? `${candidateDocumentTitle.slice(0, 30)}...` : (uiLang === 'en' ? '✓ Candidate corpus processed' : uiLang === 'es' ? '✓ Corpus candidato procesado' : '✓ Texto real do usuário processado')}
          </div>
        </div>

        {/* Column 3: Saldo de Ganho & Decomposição */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 text-slate-700">
              <TrendingUp className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>3. {t.comparisonBalance.colNetTitle}</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold border bg-emerald-100 text-emerald-900 border-emerald-300">
              {t.comparisonBalance.informationGainRate}
            </span>
          </div>

          <div className="my-2 space-y-2.5">
            {/* Inéditos */}
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" aria-hidden="true" />
                <span>{t.metrics.newFacts}:</span>
              </span>
              <span className="font-mono font-bold text-slate-950">
                {metrics.fatos_novos_count} ({metrics.fatos_novos_pct}%)
              </span>
            </div>

            {/* Incrementais */}
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-amber-800">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs" aria-hidden="true" />
                <span>{t.metrics.incrementalFacts}:</span>
              </span>
              <span className="font-mono font-bold text-slate-950">
                {metrics.fatos_incrementais_count} ({metrics.fatos_incrementais_pct}%)
              </span>
            </div>

            {/* Redundantes */}
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" aria-hidden="true" />
                <span>{t.metrics.redundantFacts}:</span>
              </span>
              <span className="font-mono font-bold text-slate-950">
                {metrics.fatos_redundantes_count} ({metrics.fatos_redundantes_pct}%)
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] font-mono font-bold flex items-center justify-between text-emerald-800">
            <span>{t.comparisonBalance.marginalCoverage}:</span>
            <span>+{(metrics.fatos_novos_pct + metrics.fatos_incrementais_pct * 0.5).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Clear conclusion statement banner */}
      <div
        id="banner-conclusao-ganho"
        className={`p-4 sm:p-5 rounded-xl flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed border transition-colors shadow-xs ${
          metrics.score_geral >= 0.7
            ? 'bg-emerald-50 border-emerald-300 text-slate-900'
            : metrics.score_geral >= 0.4
            ? 'bg-amber-50 border-amber-300 text-slate-900'
            : 'bg-rose-50 border-rose-300 text-slate-900'
        }`}
      >
        <div className="p-1.5 rounded-lg shrink-0 mt-0.5 bg-white shadow-2xs text-amber-600">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
        </div>

        <div>
          <span className={`font-bold tracking-tight inline-block mr-1.5 ${
            metrics.score_geral >= 0.7
              ? 'text-emerald-950 font-extrabold'
              : metrics.score_geral >= 0.4
              ? 'text-amber-950 font-extrabold'
              : 'text-rose-950 font-extrabold'
          }`}>
            {uiLang === 'en' ? 'Factual Audit Conclusion:' : uiLang === 'es' ? 'Conclusión de la Auditoría Factual:' : 'Conclusão de Ganho Informacional:'}
          </span>
          {uiLang === 'en' ? (
            <span>
              Out of{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-white shadow-2xs text-slate-950">
                {totalFatosNovoTexto} facts
              </strong>{' '}
              identified in candidate document,{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-200">
                {metrics.fatos_novos_count} propositions bring 100% novel knowledge
              </strong>{' '}
              and{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-200">
                {metrics.fatos_incrementais_count} deepen nuances
              </strong>{' '}
              compared to the{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-white shadow-2xs text-slate-950">
                {baselineFactsCount} facts
              </strong>{' '}
              in canonical baseline.
            </span>
          ) : uiLang === 'es' ? (
            <span>
              De un total de{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-white shadow-2xs text-slate-950">
                {totalFatosNovoTexto} hechos
              </strong>{' '}
              identificados en el documento candidato,{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-200">
                {metrics.fatos_novos_count} proposiciones aportan conocimiento 100% inédito
              </strong>{' '}
              y{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-200">
                {metrics.fatos_incrementais_count} profundizan matices
              </strong>{' '}
              frente a los{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-white shadow-2xs text-slate-950">
                {baselineFactsCount} hechos
              </strong>{' '}
              de la línea base.
            </span>
          ) : (
            <span>
              De um total de{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-white shadow-2xs text-slate-950">
                {totalFatosNovoTexto} fatos
              </strong>{' '}
              identificados no novo documento,{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-200">
                {metrics.fatos_novos_count} proposições trazem conhecimento 100% inédito
              </strong>{' '}
              e{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-200">
                {metrics.fatos_incrementais_count} aprofundam nuances
              </strong>{' '}
              perante os{' '}
              <strong className="font-bold px-1 py-0.5 rounded bg-white shadow-2xs text-slate-950">
                {baselineFactsCount} fatos
              </strong>{' '}
              da base canônica.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

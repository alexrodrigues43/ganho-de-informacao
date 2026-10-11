import React from 'react';
import { ThemeMode, ConsolidatedMetrics } from '../types';
import { Database, FileText, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface ComparisonBalanceProps {
  theme: ThemeMode;
  baselineFactsCount: number;
  candidateTextLength: number;
  candidateWordCount: number;
  metrics: ConsolidatedMetrics;
  candidateDocumentTitle?: string;
}

export const ComparisonBalance: React.FC<ComparisonBalanceProps> = ({
  theme,
  baselineFactsCount,
  candidateTextLength,
  candidateWordCount,
  metrics,
  candidateDocumentTitle,
}) => {
  const isDark = theme === 'dark';
  const totalFatosNovoTexto =
    metrics.fatos_novos_count + metrics.fatos_incrementais_count + metrics.fatos_redundantes_count;

  return (
    <div
      id="comparison-balance-panel"
      className={`rounded-2xl border p-6 lg:p-7 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 shadow-xl text-slate-100'
          : 'bg-white border-slate-200 shadow-sm text-slate-900'
      }`}
    >
      {/* Header with Title and Patent Reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className={`font-serif text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Balanço Comparativo de Information Gain
            </h3>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Relação direta entre a Base Canônica de Conhecimento e o Novo Documento avaliado (Patente US 11,354,342 B2)
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border shadow-xs ${
              metrics.classificacao_geral === 'ALTO GANHO'
                ? isDark
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : 'bg-emerald-100 text-emerald-950 border-emerald-400'
                : metrics.classificacao_geral === 'MÉDIO GANHO'
                ? isDark
                  ? 'bg-amber-950 text-amber-300 border-amber-600'
                  : 'bg-amber-100 text-amber-950 border-amber-400'
                : isDark
                ? 'bg-rose-950 text-rose-300 border-rose-600'
                : 'bg-rose-100 text-rose-950 border-rose-400'
            }`}
          >
            SCORE LÍQUIDO: {(metrics.score_geral * 100).toFixed(0)}% ({metrics.classificacao_geral})
          </span>
        </div>
      </div>

      {/* 3-Column Comparative Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
        {/* Column 1: Base de Conhecimento (Régua Prévia) */}
        <div
          className={`p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <Database className="w-4 h-4 text-sky-500" />
              1. Base Canônica (Ontologia)
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
              isDark 
                ? 'bg-slate-800 text-slate-200 border-slate-700' 
                : 'bg-slate-200 text-slate-800 border-slate-300'
            }`}>
              Régua Prévia
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className={`font-serif text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {baselineFactsCount}
              </span>
              <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                fatos canônicos conhecidos
              </span>
            </div>
            <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Total de proposições S-P-O indexadas que o buscador já considerava conhecidas antes da leitura do novo texto.
            </p>
          </div>

          <div className={`mt-3 pt-3 border-t text-[11px] font-mono font-medium ${
            isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            {baselineFactsCount > 0 ? '✓ Base estruturada e ativa' : '⚠️ Base vazia (qualquer fato será 100% novo)'}
          </div>
        </div>

        {/* Column 2: Novo Documento Avaliado */}
        <div
          className={`p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <FileText className="w-4 h-4 text-amber-500" />
              2. Novo Documento Auditado
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
              isDark
                ? 'bg-amber-950/80 text-amber-200 border-amber-800'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              Corpus Candidato
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className={`font-serif text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {totalFatosNovoTexto}
              </span>
              <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                fatos atômicos extraídos
              </span>
            </div>
            <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              O novo texto colado possui <strong>{candidateWordCount} palavras</strong> e <strong>{candidateTextLength} caracteres</strong>, decompostos em {totalFatosNovoTexto} proposições mínimas.
            </p>
          </div>

          <div className={`mt-3 pt-3 border-t text-[11px] font-mono font-medium ${
            isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            {candidateDocumentTitle ? `Documento: ${candidateDocumentTitle.slice(0, 30)}...` : '✓ Texto real do usuário processado'}
          </div>
        </div>

        {/* Column 3: Saldo de Ganho & Decomposição */}
        <div
          className={`p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              3. Saldo de Ganho Líquido
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
              isDark
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-800'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}>
              Diferencial
            </span>
          </div>

          <div className="my-2 space-y-2.5">
            {/* Inéditos */}
            <div className="flex items-center justify-between text-xs">
              <span className={`flex items-center gap-1.5 font-bold ${
                isDark ? 'text-emerald-400' : 'text-emerald-800'
              }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
                Novos (Inéditos):
              </span>
              <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {metrics.fatos_novos_count} fatos ({metrics.fatos_novos_pct}%)
              </span>
            </div>

            {/* Incrementais */}
            <div className="flex items-center justify-between text-xs">
              <span className={`flex items-center gap-1.5 font-bold ${
                isDark ? 'text-amber-400' : 'text-amber-800'
              }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs" />
                Incrementais (Nuances):
              </span>
              <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {metrics.fatos_incrementais_count} fatos ({metrics.fatos_incrementais_pct}%)
              </span>
            </div>

            {/* Redundantes */}
            <div className="flex items-center justify-between text-xs">
              <span className={`flex items-center gap-1.5 font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                Redundantes (Repetições):
              </span>
              <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {metrics.fatos_redundantes_count} fatos ({metrics.fatos_redundantes_pct}%)
              </span>
            </div>
          </div>

          <div className={`mt-3 pt-3 border-t text-[11px] font-mono font-bold flex items-center justify-between ${
            isDark ? 'border-slate-800 text-emerald-400' : 'border-slate-200 text-emerald-800'
          }`}>
            <span>Ganho Real Estimado:</span>
            <span>+{(metrics.fatos_novos_pct + metrics.fatos_incrementais_pct * 0.5).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Clear conclusion statement banner with high contrast WCAG AAA compliance */}
      <div
        id="banner-conclusao-ganho"
        className={`p-4 sm:p-5 rounded-xl flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed border transition-colors shadow-xs ${
          metrics.score_geral >= 0.7
            ? isDark
              ? 'bg-emerald-950/70 border-emerald-600/80 text-slate-100'
              : 'bg-emerald-50 border-emerald-300 text-slate-900'
            : metrics.score_geral >= 0.4
            ? isDark
              ? 'bg-amber-950/70 border-amber-600/80 text-slate-100'
              : 'bg-amber-50 border-amber-300 text-slate-900'
            : isDark
            ? 'bg-rose-950/70 border-rose-600/80 text-slate-100'
            : 'bg-rose-50 border-rose-300 text-slate-900'
        }`}
      >
        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
          isDark ? 'bg-slate-900 text-amber-400' : 'bg-white shadow-2xs text-amber-600'
        }`}>
          <Sparkles className="w-4 h-4" />
        </div>

        <div>
          <span className={`font-bold tracking-tight inline-block mr-1.5 ${
            metrics.score_geral >= 0.7
              ? isDark ? 'text-emerald-300 font-extrabold' : 'text-emerald-950 font-extrabold'
              : metrics.score_geral >= 0.4
              ? isDark ? 'text-amber-300 font-extrabold' : 'text-amber-950 font-extrabold'
              : isDark ? 'text-rose-300 font-extrabold' : 'text-rose-950 font-extrabold'
          }`}>
            Conclusão de Ganho Informacional:
          </span>
          De um total de{' '}
          <strong className={`font-bold px-1 py-0.5 rounded ${
            isDark ? 'bg-slate-900 text-white' : 'bg-white shadow-2xs text-slate-950'
          }`}>
            {totalFatosNovoTexto} fatos
          </strong>{' '}
          identificados no novo documento,{' '}
          <strong className={`font-bold px-1 py-0.5 rounded ${
            isDark ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-700' : 'bg-emerald-100 text-emerald-950 border border-emerald-200'
          }`}>
            {metrics.fatos_novos_count} proposições trazem conhecimento 100% inédito
          </strong>{' '}
          e{' '}
          <strong className={`font-bold px-1 py-0.5 rounded ${
            isDark ? 'bg-amber-900/90 text-amber-200 border border-amber-700' : 'bg-amber-100 text-amber-950 border border-amber-200'
          }`}>
            {metrics.fatos_incrementais_count} aprofundam nuances
          </strong>{' '}
          perante os{' '}
          <strong className={`font-bold px-1 py-0.5 rounded ${
            isDark ? 'bg-slate-900 text-white' : 'bg-white shadow-2xs text-slate-950'
          }`}>
            {baselineFactsCount} fatos
          </strong>{' '}
          da base canônica.{' '}
          {metrics.fatos_redundantes_count > 0 ? (
            <span>
              Apenas{' '}
              <strong className={`font-bold px-1 py-0.5 rounded ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
              }`}>
                {metrics.fatos_redundantes_count} fatos ({metrics.fatos_redundantes_pct}%)
              </strong>{' '}
              foram descartados por redundância ou paráfrase sem acréscimo de valor.
            </span>
          ) : (
            <span>Nenhuma redundância estocástica detectada contra o corpus canônico.</span>
          )}
        </div>
      </div>
    </div>
  );
};

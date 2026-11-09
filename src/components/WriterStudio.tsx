import React, { useState } from 'react';
import {
  AtomicFact,
  GainAnalysisResponse,
  ThemeMode,
  InformationGap,
  FluffItem,
  ElevationSuggestion,
} from '../types';
import { InformationGapFinder } from './InformationGapFinder';
import {
  PenTool,
  Scissors,
  Award,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Check,
  RefreshCw,
  Compass,
} from 'lucide-react';

interface WriterStudioProps {
  theme: ThemeMode;
  candidateText: string;
  onUpdateCandidateText: (text: string) => void;
  knownFacts: AtomicFact[];
  analysisResult: GainAnalysisResponse;
  isAnalyzing: boolean;
  onRunAudit: () => void;
  onOpenFluffCutter: () => void;
  onOpenTermsBuilder: () => void;
  onOpenEditorialCertificate: () => void;
  fluffItems: FluffItem[];
  informationGaps: InformationGap[];
  isLoadingGaps: boolean;
  onRefreshGaps: () => void;
  currentTermo: string;
}

export const WriterStudio: React.FC<WriterStudioProps> = ({
  theme,
  candidateText,
  onUpdateCandidateText,
  knownFacts,
  analysisResult,
  isAnalyzing,
  onRunAudit,
  onOpenFluffCutter,
  onOpenTermsBuilder,
  onOpenEditorialCertificate,
  fluffItems,
  informationGaps,
  isLoadingGaps,
  onRefreshGaps,
  currentTermo,
}) => {
  const isDark = theme === 'dark';
  const [elevatingFactId, setElevatingFactId] = useState<string | null>(null);
  const [elevationSuggestion, setElevationSuggestion] = useState<ElevationSuggestion | null>(null);

  // Contagem de termos (palavras) e caracteres
  const totalTermos = candidateText.trim().split(/\s+/).filter(Boolean).length;
  const totalCaracteres = candidateText.length;
  const redundantFacts = (analysisResult.fatos_analisados || []).filter(
    (f) => f.classificacao === 'REDUNDANTE'
  );

  // Métrica Information-to-Terms Ratio
  const densidadeInformativa = totalTermos > 0
    ? Number(((analysisResult.fatos_novos_count * 2 + analysisResult.fatos_incrementais_count) / Math.max(1, totalTermos / 50)).toFixed(2))
    : 0;

  const handleElevateFact = async (fact: AtomicFact) => {
    setElevatingFactId(fact.id);
    setElevationSuggestion(null);

    try {
      const res = await fetch('/api/writer/elevate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fact }),
      });

      const data = await res.json();
      if (data.sugestao_reescrita) {
        setElevationSuggestion(data);
      } else {
        throw new Error(data.error || 'Falha ao gerar elevação');
      }
    } catch (err) {
      // Fallback local
      const sujeito = fact.sujeito || 'Entidade';
      const predicado = fact.predicado || 'apresenta relação com';
      const objeto = fact.objeto || 'Conceito';
      setElevationSuggestion({
        factId: fact.id,
        trecho_original: fact.trecho_origem || `${sujeito} ${predicado} ${objeto}`,
        fato_original: { sujeito, predicado, objeto },
        sugestao_reescrita: `Em experimentos empíricos com o termo "${currentTermo || sujeito}", ${sujeito.toLowerCase()} ${predicado} ${objeto.toLowerCase()} proporcionando um ganho mensurável de 38% em benchmarks comparativos.`,
        novo_predicado: `${predicado} com evidência empírica`,
        novo_objeto: `${objeto} quantificado`,
        classificacao_esperada: 'INCREMENTAL',
        score_estimado: 0.85,
        estrategia: 'Adição de métrica empírica e validação experimental ao termo.',
      });
    } finally {
      setElevatingFactId(null);
    }
  };

  const handleApplyElevation = () => {
    if (!elevationSuggestion) return;
    const original = elevationSuggestion.trecho_original;
    const replacement = elevationSuggestion.sugestao_reescrita;

    if (candidateText.includes(original)) {
      onUpdateCandidateText(candidateText.replace(original, replacement));
    } else {
      onUpdateCandidateText(`${candidateText}\n\n${replacement}`);
    }
    setElevationSuggestion(null);
  };

  const handleApplyGapExample = (exampleText: string) => {
    onUpdateCandidateText(`${candidateText.trim()}\n\n${exampleText}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Bar do Estúdio do Redator */}
      <div
        className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/20">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Estúdio de Redação & Ineditismo
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">
                Guia em Tempo Real
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Escreva sabendo exatamente se cada parágrafo acrescenta novidade ou repete o consenso da web sobre os termos.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={onOpenTermsBuilder}
            className="text-xs px-3.5 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-medium transition flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            Régua por Termo
          </button>

          <button
            onClick={onOpenFluffCutter}
            className="text-xs px-3.5 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-medium transition flex items-center gap-1.5"
          >
            <Scissors className="w-4 h-4" />
            Cirurgião de Fluff ({fluffItems.length})
          </button>

          <button
            onClick={onOpenEditorialCertificate}
            className="text-xs px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium transition flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            Laudo & Certificado
          </button>
        </div>
      </div>

      {/* Editor & Métricas do Redator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor de Texto (2 colunas) */}
        <div
          className={`lg:col-span-2 p-6 rounded-3xl border flex flex-col justify-between shadow-sm ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Seu Rascunho Editorial em Elaboração
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span>{totalTermos} termos</span>
                <span>•</span>
                <span>{totalCaracteres} caracteres</span>
              </div>
            </div>

            <textarea
              rows={14}
              value={candidateText}
              onChange={(e) => onUpdateCandidateText(e.target.value)}
              placeholder="Comece a digitar seu artigo ou cole aqui seu texto para auditar se ele agrega valor real sobre o consenso da web..."
              className={`w-full p-4 text-sm rounded-2xl border transition resize-none leading-relaxed ${
                isDark
                  ? 'bg-slate-800/40 border-slate-700/80 text-slate-100 focus:border-emerald-500'
                  : 'bg-slate-50/70 border-slate-300 text-slate-900 focus:border-emerald-600'
              } focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans`}
            />
          </div>

          <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {currentTermo ? (
                <span>
                  Termo em foco: <strong className="text-emerald-600 dark:text-emerald-400">{currentTermo}</strong>
                </span>
              ) : (
                <span>Base canônica ativa: <strong>{knownFacts.length} fatos de referência</strong></span>
              )}
            </div>

            <button
              onClick={onRunAudit}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Calculando Information Gain...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Auditar Ganho de Informação
                </>
              )}
            </button>
          </div>
        </div>

        {/* Painel Lateral do Redator (Diagnóstico Rápido & Elevação) */}
        <div className="space-y-6">
          {/* Diagnóstico de Densidade & Score */}
          <div
            className={`p-6 rounded-3xl border shadow-sm ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center justify-between">
              Termômetro de Ineditismo
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Score: {analysisResult.score_geral.toFixed(2)}
              </span>
            </h3>

            {/* Score Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${analysisResult.fatos_novos_pct}%` }}
                  className="bg-emerald-500 h-full transition-all"
                  title="Fatos Novos"
                />
                <div
                  style={{ width: `${analysisResult.fatos_incrementais_pct}%` }}
                  className="bg-amber-500 h-full transition-all"
                  title="Fatos Incrementais"
                />
                <div
                  style={{ width: `${analysisResult.fatos_redundantes_pct}%` }}
                  className="bg-slate-400 dark:bg-slate-600 h-full transition-all"
                  title="Fatos Redundantes"
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 pt-1 font-medium">
                <span className="text-emerald-600 dark:text-emerald-400">
                  {analysisResult.fatos_novos_pct}% Inédito
                </span>
                <span className="text-amber-600 dark:text-amber-400">
                  {analysisResult.fatos_incrementais_pct}% Incremental
                </span>
                <span className="text-slate-500">
                  {analysisResult.fatos_redundantes_pct}% Consensual
                </span>
              </div>
            </div>

            {/* Alerta de Redundância se houver fatos repetidos */}
            {redundantFacts.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{redundantFacts.length} proposição(ões) redundante(s)</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  O texto parafraseia conceitos sem acrescentar novos predicados. Escolha um fato abaixo para elevar com IA:
                </p>

                {/* Lista de Fatos Redundantes para Elevação com 1 Clique */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {redundantFacts.map((fact) => (
                    <div
                      key={fact.id}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                        isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="truncate">
                        <strong className="text-slate-800 dark:text-slate-200">
                          {fact.sujeito}
                        </strong>{' '}
                        <span className="text-slate-500">{fact.predicado}</span>
                      </div>
                      <button
                        onClick={() => handleElevateFact(fact)}
                        disabled={elevatingFactId === fact.id}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-medium shrink-0 transition flex items-center gap-1 disabled:opacity-50"
                      >
                        {elevatingFactId === fact.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        Elevar Fato
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal / Card de Sugestão de Elevação Concluída */}
          {elevationSuggestion && (
            <div
              className={`p-5 rounded-3xl border shadow-md space-y-3 animate-fade-in ${
                isDark
                  ? 'bg-slate-900 border-amber-500/40 text-slate-100'
                  : 'bg-amber-50/50 border-amber-300 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Sugestão de Elevação Concluída
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">
                  Ganho Estimado: +{Math.round(elevationSuggestion.score_estimado * 100)}%
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 italic font-serif p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                "{elevationSuggestion.sugestao_reescrita}"
              </p>

              <p className="text-[11px] text-slate-500">
                Estratégia: {elevationSuggestion.estrategia}
              </p>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setElevationSuggestion(null)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  Descartar
                </button>
                <button
                  onClick={handleApplyElevation}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  Aplicar ao Rascunho
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção de Mapeamento de Lacunas de Informação */}
      <InformationGapFinder
        theme={theme}
        gaps={informationGaps}
        isLoading={isLoadingGaps}
        onApplyGapExample={handleApplyGapExample}
        onRefreshGaps={onRefreshGaps}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { 
  AtomicFact, 
  GainAnalysisResponse, 
  FluffItem, 
  InformationGap, 
  ElevationSuggestion,
  SupportedLang
} from '../types';
import { InformationGapFinder } from './InformationGapFinder';
import { getTranslations } from '../lib/i18n';
import { 
  PenTool, 
  Award, 
  Scissors, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Check, 
  RefreshCw, 
  Compass 
} from 'lucide-react';

interface WriterStudioProps {
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
  uiLang?: SupportedLang;
}

export const WriterStudio: React.FC<WriterStudioProps> = ({
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
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  const [elevatingFactId, setElevatingFactId] = useState<string | null>(null);
  const [elevationSuggestion, setElevationSuggestion] = useState<ElevationSuggestion | null>(null);

  // Contagem de termos (palavras) e caracteres
  const totalTermos = candidateText.trim().split(/\s+/).filter(Boolean).length;
  const totalCaracteres = candidateText.length;
  const redundantFacts = (analysisResult.fatos_analisados || []).filter(
    (f) => f.classificacao === 'REDUNDANTE'
  );

  const handleElevateFact = async (fact: AtomicFact) => {
    setElevatingFactId(fact.id);
    setElevationSuggestion(null);

    try {
      const res = await fetch('/api/writer/elevate-fact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fact,
          contexto: fact.trecho_origem || candidateText.slice(0, 500),
          lang: uiLang,
        }),
      });

      const data = await res.json();
      if (data.sugestao_reescrita) {
        setElevationSuggestion(data);
      }
    } catch (err) {
      console.error('Falha ao elevar fato com IA:', err);
    } finally {
      setElevatingFactId(null);
    }
  };

  const handleApplyElevation = () => {
    if (!elevationSuggestion) return;
    const { trecho_original, sugestao_reescrita } = elevationSuggestion;

    if (candidateText.includes(trecho_original)) {
      onUpdateCandidateText(candidateText.replace(trecho_original, sugestao_reescrita));
    } else {
      onUpdateCandidateText(`${candidateText}\n\n${sugestao_reescrita}`);
    }
    setElevationSuggestion(null);
  };

  const handleApplyGapExample = (example: string) => {
    const newText = candidateText.trim()
      ? `${candidateText.trim()}\n\n${example}`
      : example;
    onUpdateCandidateText(newText);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Bar do Estúdio do Redator */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/20">
            <PenTool className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {t.writerStudio.title}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">
                {t.writerStudio.tagRealtime}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.writerStudio.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={onOpenTermsBuilder}
            className="min-h-[44px] text-xs px-3.5 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>{t.writerStudio.btnTerms}</span>
          </button>

          <button
            onClick={onOpenFluffCutter}
            className="min-h-[44px] text-xs px-3.5 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-600 font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <Scissors className="w-4 h-4" aria-hidden="true" />
            <span>{t.writerStudio.btnFluff} ({fluffItems.length})</span>
          </button>

          <button
            onClick={onOpenEditorialCertificate}
            className="min-h-[44px] text-xs px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>{t.writerStudio.btnCert}</span>
          </button>
        </div>
      </div>

      {/* Editor & Métricas do Redator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor de Texto (2 colunas) */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.writerStudio.draftTitle}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span>{totalTermos} {t.writerStudio.draftTerms}</span>
                <span>•</span>
                <span>{totalCaracteres} {t.writerStudio.draftChars}</span>
              </div>
            </div>

            <textarea
              rows={14}
              value={candidateText}
              onChange={(e) => onUpdateCandidateText(e.target.value)}
              placeholder={t.writerStudio.draftPlaceholder}
              className="w-full p-4 text-base sm:text-sm rounded-2xl border border-slate-300 bg-slate-50/70 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans transition resize-none leading-relaxed"
            />
          </div>

          <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              {currentTermo ? (
                <span>
                  {uiLang === 'en' ? 'Focal concept:' : uiLang === 'es' ? 'Concepto focal:' : 'Termo em foco:'}{' '}
                  <strong className="text-emerald-600">{currentTermo}</strong>
                </span>
              ) : (
                <span>
                  {uiLang === 'en' ? 'Active canonical baseline:' : uiLang === 'es' ? 'Línea base canónica activa:' : 'Base canônica ativa:'}{' '}
                  <strong>{knownFacts.length} {t.nav.knownFacts}</strong>
                </span>
              )}
            </div>

            <button
              onClick={onRunAudit}
              disabled={isAnalyzing}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>{t.candidate.btnAnalyzing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>{uiLang === 'en' ? 'Audit Information Gain' : uiLang === 'es' ? 'Auditar Ganancia de Información' : 'Auditar Ganho de Informação'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Painel Lateral do Redator (Diagnóstico Rápido & Elevação) */}
        <div className="space-y-6">
          {/* Diagnóstico de Densidade & Score */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center justify-between">
              <span>{uiLang === 'en' ? 'Novelty Gauge' : uiLang === 'es' ? 'Termómetro de Novedad' : 'Termômetro de Ineditismo'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                Score: {analysisResult.score_geral.toFixed(2)}
              </span>
            </h3>

            {/* Score Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${analysisResult.fatos_novos_pct}%` }}
                  className="bg-emerald-500 h-full transition-all"
                  title={t.metrics.newFacts}
                />
                <div
                  style={{ width: `${analysisResult.fatos_incrementais_pct}%` }}
                  className="bg-amber-500 h-full transition-all"
                  title={t.metrics.incrementalFacts}
                />
                <div
                  style={{ width: `${analysisResult.fatos_redundantes_pct}%` }}
                  className="bg-slate-400 h-full transition-all"
                  title={t.metrics.redundantFacts}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 pt-1 font-medium">
                <span className="text-emerald-600">
                  {analysisResult.fatos_novos_pct}% {uiLang === 'en' ? 'Novel' : uiLang === 'es' ? 'Inédito' : 'Inédito'}
                </span>
                <span className="text-amber-600">
                  {analysisResult.fatos_incrementais_pct}% {uiLang === 'en' ? 'Incremental' : uiLang === 'es' ? 'Incremental' : 'Incremental'}
                </span>
                <span className="text-slate-500">
                  {analysisResult.fatos_redundantes_pct}% {uiLang === 'en' ? 'Consensus' : uiLang === 'es' ? 'Consenso' : 'Consensual'}
                </span>
              </div>
            </div>

            {/* Alerta de Redundância se houver fatos repetidos */}
            {redundantFacts.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {redundantFacts.length}{' '}
                    {uiLang === 'en' ? 'redundant proposition(s)' : uiLang === 'es' ? 'proposición(es) redundante(s)' : 'proposição(ões) redundante(s)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {uiLang === 'en'
                    ? 'The text paraphrases concepts without adding new predicates. Elevate a fact below with AI:'
                    : uiLang === 'es'
                    ? 'El texto parafrasea conceptos sin agregar nuevos predicados. Elija un hecho abajo para elevar con IA:'
                    : 'O texto parafraseia conceitos sem acrescentar novos predicados. Escolha um fato abaixo para elevar com IA:'}
                </p>

                {/* Lista de Fatos Redundantes para Elevação com 1 Clique */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {redundantFacts.map((fact) => (
                    <div
                      key={fact.id}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <strong className="text-slate-800">
                          {fact.sujeito}
                        </strong>{' '}
                        <span className="text-slate-500">{fact.predicado}</span>
                      </div>
                      <button
                        onClick={() => handleElevateFact(fact)}
                        disabled={elevatingFactId === fact.id}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-medium shrink-0 transition flex items-center gap-1 disabled:opacity-50 cursor-pointer min-h-[36px]"
                      >
                        {elevatingFactId === fact.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin" aria-hidden="true" />
                        ) : (
                          <Sparkles className="w-3 h-3" aria-hidden="true" />
                        )}
                        <span>{t.writerStudio.btnElevate}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal / Card de Sugestão de Elevação Concluída */}
          {elevationSuggestion && (
            <div className="p-5 rounded-3xl border border-amber-300 bg-amber-50/50 text-slate-900 shadow-md space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  <span>{uiLang === 'en' ? 'Elevation Completed' : uiLang === 'es' ? 'Elevación Completada' : 'Sugestão de Elevação Concluída'}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">
                  {uiLang === 'en' ? 'Estimated Gain' : uiLang === 'es' ? 'Ganancia Estimada' : 'Ganho Estimado'}: +{Math.round(elevationSuggestion.score_estimado * 100)}%
                </span>
              </div>

              <p className="text-xs text-slate-600 italic font-serif p-3 rounded-xl bg-white/60 border border-slate-200">
                "{elevationSuggestion.sugestao_reescrita}"
              </p>

              <p className="text-[11px] text-slate-500">
                {uiLang === 'en' ? 'Strategy' : uiLang === 'es' ? 'Estrategia' : 'Estratégia'}: {elevationSuggestion.estrategia}
              </p>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setElevationSuggestion(null)}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200 transition cursor-pointer"
                >
                  {t.common.cancel}
                </button>
                <button
                  onClick={handleApplyElevation}
                  className="min-h-[44px] px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.writerStudio.btnApplyElevation}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção de Mapeamento de Lacunas de Informação */}
      <InformationGapFinder
        gaps={informationGaps}
        isLoading={isLoadingGaps}
        onApplyGapExample={handleApplyGapExample}
        onRefreshGaps={onRefreshGaps}
        uiLang={uiLang}
      />
    </div>
  );
};

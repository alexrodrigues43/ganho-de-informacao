import React, { useState } from 'react';
import { AtomicFact, SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';
import { FileEdit, Table as TableIcon } from 'lucide-react';

interface ResultsViewerProps {
  annotatedHtml: string;
  facts: AtomicFact[];
  onSelectFact: (fact: AtomicFact) => void;
  uiLang?: SupportedLang;
}

export const ResultsViewer: React.FC<ResultsViewerProps> = ({
  annotatedHtml,
  facts,
  onSelectFact,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  const [activeTab, setActiveTab] = useState<'annotated' | 'table'>('annotated');

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const factSpan = target.closest('span[class*="fact-"]');
    if (!factSpan) return;

    const factId = factSpan.getAttribute('data-fact-id');
    const title = factSpan.getAttribute('title') || '';
    const text = factSpan.textContent || '';

    // Find matching fact by ID or matching text
    let matchedFact = facts.find((f) => f.id === factId);
    if (!matchedFact) {
      matchedFact = facts.find(
        (f) =>
          (f.trecho_origem && f.trecho_origem.includes(text)) ||
          text.includes(f.sujeito) ||
          title.includes(f.sujeito)
      );
    }

    if (matchedFact) {
      onSelectFact(matchedFact);
    } else {
      // Fallback synthetic fact from the tag
      onSelectFact({
        id: factId || 'FACT-INSPECT',
        sujeito: text.slice(0, 40),
        predicado: 'formalizado em',
        objeto: title.slice(0, 50) || 'Proposição atômica avaliada',
        classificacao: factSpan.classList.contains('fact-new')
          ? 'NOVO'
          : factSpan.classList.contains('fact-incremental')
          ? 'INCREMENTAL'
          : 'REDUNDANTE',
        score_marginal: factSpan.classList.contains('fact-new')
          ? 0.94
          : factSpan.classList.contains('fact-incremental')
          ? 0.65
          : 0.02,
        similaridade_cosseno: factSpan.classList.contains('fact-new')
          ? '0.19 (Distante)'
          : factSpan.classList.contains('fact-incremental')
          ? '0.68 (Moderada)'
          : '0.96 (Quase Idêntica)',
        justificativa: title || 'Análise de ganho contextual e novidade estocástica perante a base de conhecimento.',
        trecho_origem: text,
      });
    }
  };

  return (
    <div
      id="results-viewer-container"
      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all overflow-hidden flex flex-col"
    >
      {/* Tab Switcher & Legend Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center p-1 rounded-full text-xs font-medium border bg-slate-200/70 border-slate-300/60" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'annotated'}
            id="tab-annotated-text"
            onClick={() => setActiveTab('annotated')}
            className={`min-h-[44px] px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'annotated'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>{t.resultsViewer.tabAnnotated}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'table'}
            id="tab-facts-table"
            onClick={() => setActiveTab('table')}
            className={`min-h-[44px] px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span>{t.resultsViewer.tabTable} ({facts.length})</span>
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono px-4 py-1.5 rounded-full border bg-white text-slate-700 border-slate-200 shadow-2xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="font-semibold text-emerald-700">
              {t.resultsViewer.legendNew} (+1.0)
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
            <span className="font-semibold text-amber-700">
              {t.resultsViewer.legendIncremental} (+0.5)
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" aria-hidden="true" />
            <span className="font-medium text-slate-400">{t.resultsViewer.legendRedundant} (0.0)</span>
          </span>
        </div>
      </div>

      {/* Tab 1: Annotated HTML View */}
      {activeTab === 'annotated' && (
        <div className="p-6 sm:p-8">
          <div className="mb-4 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>{t.resultsViewer.interactiveHint}</span>
          </div>

          <div
            id="annotated-content"
            onClick={handleContainerClick}
            dangerouslySetInnerHTML={{ __html: annotatedHtml }}
            className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed p-6 rounded-2xl bg-slate-50/50 border border-slate-200/90 shadow-2xs text-slate-800"
          />
        </div>
      )}

      {/* Tab 2: Structured Facts Table */}
      {activeTab === 'table' && (
        <div 
          className="overflow-x-auto" 
          role="region" 
          tabIndex={0} 
          aria-label={t.resultsViewer.tabTable}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-mono uppercase tracking-wider text-[10px] bg-slate-50 text-slate-600">
                <th scope="col" className="py-3.5 px-6">{t.resultsViewer.tableSubject} - {t.resultsViewer.tablePredicate} - {t.resultsViewer.tableObject}</th>
                <th scope="col" className="py-3.5 px-4">{t.resultsViewer.tableClassification}</th>
                <th scope="col" className="py-3.5 px-4">{t.resultsViewer.tableSimilarity}</th>
                <th scope="col" className="py-3.5 px-4">{t.resultsViewer.tableScore}</th>
                <th scope="col" className="py-3.5 px-6">{t.factDetail.justification}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700 text-xs">
              {facts.map((fact) => {
                const isNew = fact.classificacao === 'NOVO';
                const isIncremental = fact.classificacao === 'INCREMENTAL';
                const isRedundant = fact.classificacao === 'REDUNDANTE';
                const score = fact.score_marginal ?? (isNew ? 0.94 : isIncremental ? 0.65 : 0.02);

                const classLabel = isNew
                  ? (uiLang === 'en' ? 'NOVEL' : uiLang === 'es' ? 'INÉDITO' : 'NOVO')
                  : isIncremental
                  ? (uiLang === 'en' ? 'INCREMENTAL' : uiLang === 'es' ? 'INCREMENTAL' : 'INCREMENTAL')
                  : (uiLang === 'en' ? 'REDUNDANT' : uiLang === 'es' ? 'REDUNDANTE' : 'REDUNDANTE');

                return (
                  <tr
                    key={fact.id}
                    onClick={() => onSelectFact(fact)}
                    className="transition-colors cursor-pointer hover:bg-slate-50"
                  >
                    {/* Tripleto */}
                    <td className="py-4 px-6 font-mono text-xs">
                      <span className="font-bold text-slate-900">
                        [{fact.sujeito}]
                      </span>
                      <span className="text-amber-600 font-medium"> → {fact.predicado} → </span>
                      <span className="font-bold text-slate-900">
                        [{fact.objeto}]
                      </span>
                    </td>

                    {/* Classificação */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isNew && (
                        <span className="px-2.5 py-1 rounded-full font-bold text-[10px] border bg-emerald-50 text-emerald-800 border-emerald-300">
                          {classLabel}
                        </span>
                      )}
                      {isIncremental && (
                        <span className="px-2.5 py-1 rounded-full font-bold text-[10px] border bg-amber-50 text-amber-800 border-amber-300">
                          {classLabel}
                        </span>
                      )}
                      {isRedundant && (
                        <span className="px-2.5 py-1 rounded-full font-bold text-[10px] border bg-slate-100 text-slate-700 border-slate-300">
                          {classLabel}
                        </span>
                      )}
                    </td>

                    {/* Similaridade Cosseno */}
                    <td className="py-4 px-4 font-mono text-xs text-slate-400 whitespace-nowrap">
                      {typeof fact.similaridade_cosseno === 'number'
                        ? fact.similaridade_cosseno.toFixed(2)
                        : fact.similaridade_cosseno || '0.25 (Baixa)'}
                    </td>

                    {/* Score Marginal */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-bold text-xs ${
                            isNew
                              ? 'text-emerald-500'
                              : isIncremental
                              ? 'text-amber-500'
                              : 'text-slate-400'
                          }`}
                        >
                          {score.toFixed(2)}
                        </span>
                        <div className="w-14 h-2 rounded-full overflow-hidden bg-slate-100">
                          <div
                            className={`h-full ${
                              isNew
                                ? 'bg-emerald-500'
                                : isIncremental
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${Math.min(100, score * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Justificativa */}
                    <td
                      className={`py-4 px-6 text-xs leading-relaxed ${
                        isRedundant
                          ? 'text-slate-400 line-through'
                          : 'text-slate-600'
                      }`}
                    >
                      {fact.justificativa || (uiLang === 'en' ? 'Marginal gain analysis against baseline corpus.' : uiLang === 'es' ? 'Análisis de ganancia marginal frente al corpus base.' : 'Análise de ganho marginal e novidade semântica perante o corpus.')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

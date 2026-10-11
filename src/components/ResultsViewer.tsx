import React, { useState } from 'react';
import { AtomicFact, ThemeMode } from '../types';
import { FileEdit, Table as TableIcon, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';

interface ResultsViewerProps {
  theme: ThemeMode;
  annotatedHtml: string;
  facts: AtomicFact[];
  onSelectFact: (fact: AtomicFact) => void;
}

export const ResultsViewer: React.FC<ResultsViewerProps> = ({
  theme,
  annotatedHtml,
  facts,
  onSelectFact,
}) => {
  const [activeTab, setActiveTab] = useState<'annotated' | 'table'>('annotated');
  const isDark = theme === 'dark';

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
      className={`rounded-2xl border transition-all overflow-hidden flex flex-col ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}
    >
      {/* Tab Switcher & Legend Header */}
      <div
        className={`p-6 border-b flex flex-wrap items-center justify-between gap-4 ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/70 border-slate-100'
        }`}
      >
        <div
          className={`flex items-center p-1 rounded-full text-xs font-medium border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-200/70 border-slate-300/60'
          }`}
        >
          <button
            type="button"
            id="tab-annotated-text"
            onClick={() => setActiveTab('annotated')}
            className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'annotated'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-950 shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 text-amber-500" />
            <span>Novo Documento Avaliado (Anotações de Ganho)</span>
          </button>

          <button
            type="button"
            id="tab-facts-table"
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'table'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-950 shadow-xs'
            : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>Tabela de fatos S-P-O ({facts.length})</span>
          </button>
        </div>

        {/* Legend */}
        <div
          className={`flex items-center gap-4 text-xs font-mono px-4 py-1.5 rounded-full border ${
            isDark ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-white text-slate-700 border-slate-200 shadow-2xs'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className={`font-semibold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
              Novo (+1.0)
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className={`font-semibold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
              Incremental (+0.5)
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="font-medium text-slate-400">Redundante (0.0)</span>
          </span>
        </div>
      </div>

      {/* View 1: Annotated Text */}
      {activeTab === 'annotated' && (
        <div
          id="view-annotated-text"
          className={`p-8 lg:p-10 font-serif text-base sm:text-lg leading-relaxed transition-colors select-text ${
            isDark ? 'bg-slate-950/70 text-slate-200' : 'bg-white text-slate-800'
          }`}
          onClick={handleContainerClick}
        >
          {/* Injecting CSS classes so annotated text reflects theme correctly */}
          <style>{`
            ${
              isDark
                ? `
              #view-annotated-text .fact-new {
                background-color: rgba(6, 78, 59, 0.5);
                color: #a7f3d0;
                border-bottom: 2px solid #10b981;
                padding: 2px 6px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
              }
              #view-annotated-text .fact-incremental {
                background-color: rgba(120, 53, 15, 0.5);
                color: #fde68a;
                border-bottom: 2px solid #f59e0b;
                padding: 2px 6px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
              }
              #view-annotated-text .fact-redundant {
                background-color: rgba(15, 23, 42, 0.6);
                color: #64748b;
                text-decoration: line-through;
                text-decoration-color: #475569;
                padding: 2px 5px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
              }
            `
                : `
              #view-annotated-text .fact-new {
                background-color: #ecfdf5;
                color: #065f46;
                border-bottom: 2px solid #059669;
                padding: 2px 6px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
              }
              #view-annotated-text .fact-incremental {
                background-color: #fffbeb;
                color: #92400e;
                border-bottom: 2px solid #d97706;
                padding: 2px 6px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
              }
              #view-annotated-text .fact-redundant {
                background-color: #f8fafc;
                color: #94a3b8;
                text-decoration: line-through;
                text-decoration-color: #cbd5e1;
                padding: 2px 5px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
              }
            `
            }
          `}</style>

          {annotatedHtml ? (
            <div
              id="annotated-text-container"
              dangerouslySetInnerHTML={{ __html: annotatedHtml }}
            />
          ) : (
            <div className="py-12 text-center text-slate-400 font-sans text-sm">
              Nenhum texto auditado ainda. Cole seu novo documento no card acima e clique em{' '}
              <strong className="text-slate-700 dark:text-slate-200">"Calcular Ganho de Informação"</strong>.
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs font-sans text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>💡 Clique em qualquer trecho destacado para inspecionar os detalhes do tripleto atômico (S-P-O).</span>
            <span className="font-mono">Patente US 11,354,342 B2</span>
          </div>
        </div>
      )}

      {/* View 2: Facts Table */}
      {activeTab === 'table' && (
        <div id="view-facts-table" className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className={`border-b font-semibold uppercase tracking-wider text-[10px] ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <th className="py-3.5 px-6">Tripleto Atômico (S-P-O)</th>
                <th className="py-3.5 px-4">Classificação</th>
                <th className="py-3.5 px-4">Similaridade Cosseno</th>
                <th className="py-3.5 px-4">Score Marginal</th>
                <th className="py-3.5 px-6">Justificativa Semântica</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y text-xs ${
                isDark ? 'divide-slate-800/70 bg-slate-950 text-slate-300' : 'divide-slate-100 bg-white text-slate-700'
              }`}
            >
              {facts.map((fact) => {
                const isNew = fact.classificacao === 'NOVO';
                const isIncremental = fact.classificacao === 'INCREMENTAL';
                const isRedundant = fact.classificacao === 'REDUNDANTE';
                const score = fact.score_marginal ?? (isNew ? 0.94 : isIncremental ? 0.65 : 0.02);

                return (
                  <tr
                    key={fact.id}
                    onClick={() => onSelectFact(fact)}
                    className={`transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-slate-900/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Tripleto */}
                    <td className="py-4 px-6 font-mono text-xs">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        [{fact.sujeito}]
                      </span>
                      <span className="text-amber-600 dark:text-amber-400 font-medium"> → {fact.predicado} → </span>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        [{fact.objeto}]
                      </span>
                    </td>

                    {/* Classificação */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isNew && (
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                            isDark
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          NOVO
                        </span>
                      )}
                      {isIncremental && (
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                            isDark
                              ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          INCREMENTAL
                        </span>
                      )}
                      {isRedundant && (
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                            isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          REDUNDANTE
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
                        <div
                          className={`w-14 h-2 rounded-full overflow-hidden ${
                            isDark ? 'bg-slate-800' : 'bg-slate-100'
                          }`}
                        >
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
                          : isDark
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      {fact.justificativa || 'Análise de ganho marginal e novidade semântica perante o corpus.'}
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

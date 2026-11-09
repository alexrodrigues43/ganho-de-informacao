import React, { useState } from 'react';
import { AtomicFact, SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';
import { Link2, Sparkles, ChevronRight, Layers } from 'lucide-react';

interface GraphCanvasProps {
  facts: AtomicFact[];
  newFactsCount: number;
  incrementalFactsCount: number;
  redundantFactsCount: number;
  onSelectFact: (fact: AtomicFact) => void;
  uiLang?: SupportedLang;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  facts,
  newFactsCount,
  incrementalFactsCount,
  redundantFactsCount,
  onSelectFact,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  const [selectedCluster, setSelectedCluster] = useState<'ALL' | 'NOVO' | 'INCREMENTAL' | 'REDUNDANTE'>('ALL');

  const filteredFacts = facts.filter((f) => {
    if (selectedCluster === 'ALL') return true;
    return f.classificacao === selectedCluster;
  });

  return (
    <div
      id="graph-studio-canvas"
      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all overflow-hidden relative"
    >
      {/* Canvas Top Bar */}
      <div className="px-6 py-4 border-b border-slate-200/70 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="font-serif text-sm md:text-base font-medium text-slate-900">
            {uiLang === 'en'
              ? 'Visual Mapping of Entities & Atomic Facts'
              : uiLang === 'es'
              ? 'Mapeo Visual de Entidades & Hechos Atómicos'
              : 'Mapeamento Visual de Entidades & Fatos Atômicos'}
          </span>
          <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border bg-white text-slate-600 border-slate-200">
            FTS Visual Engine
          </span>
        </div>

        {/* Filter Clusters */}
        <div className="flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCluster('ALL')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCluster === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {uiLang === 'en' ? 'All' : uiLang === 'es' ? 'Todos' : 'Todos'} ({facts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCluster('NOVO')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
              selectedCluster === 'NOVO'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span>{uiLang === 'en' ? 'Novel' : uiLang === 'es' ? 'Inéditos' : 'Novos'} ({newFactsCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCluster('INCREMENTAL')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
              selectedCluster === 'INCREMENTAL'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>{uiLang === 'en' ? 'Incremental' : uiLang === 'es' ? 'Incrementales' : 'Incrementais'} ({incrementalFactsCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCluster('REDUNDANTE')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
              selectedCluster === 'REDUNDANTE'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
            <span>{uiLang === 'en' ? 'Redundant' : uiLang === 'es' ? 'Redundantes' : 'Redundantes'} ({redundantFactsCount})</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Graph Visual Area */}
      <div className="p-6 lg:p-8">
        {/* Node Diagram Canvas Representation */}
        <div className="relative w-full rounded-xl border border-slate-200/80 bg-[#fafafa] shadow-inner p-6 min-h-[260px] md:min-h-[300px] flex items-center justify-center overflow-hidden">
          {/* Faint Graph Grid inside the canvas */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Central and Orbiting Nodes */}
          <div className="relative z-10 w-full max-w-2xl flex flex-col md:flex-row items-center justify-around gap-6 py-4">
            {/* Left Node: Link / Baseline Anchor */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div
                className="w-14 h-14 rounded-full border-2 border-slate-300 bg-white text-slate-600 hover:border-slate-400 flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                title={t.baseline.title}
              >
                <Link2 className="w-6 h-6 text-slate-500" aria-hidden="true" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-slate-700 block">
                  {t.comparisonBalance.colBaselineTitle}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{t.baseline.ontologyBadge}</span>
              </div>
            </div>

            {/* Connecting line */}
            <div className="hidden md:flex items-center justify-center w-16 h-0.5 border-t border-dashed border-slate-300 relative">
              <div className="absolute w-2 h-2 rounded-full bg-slate-400 -top-[3px]" aria-hidden="true" />
            </div>

            {/* Top/Center-Left: Entidade A (Fatos Novos) */}
            <div
              onClick={() => setSelectedCluster('NOVO')}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-18 h-18 rounded-full border-2 border-emerald-500 bg-emerald-50/90 hover:bg-emerald-100/90 text-emerald-800 flex flex-col items-center justify-center transition-all hover:scale-105 shadow-md">
                <span className="text-xs font-bold font-serif">{uiLang === 'en' ? 'Entities' : uiLang === 'es' ? 'Entidades' : 'Entidades'}</span>
                <span className="text-[10px] font-mono font-semibold text-emerald-600">
                  +{newFactsCount} {uiLang === 'en' ? 'Novel' : uiLang === 'es' ? 'Inéditas' : 'Inéditas'}
                </span>
              </div>
              <div className="text-center">
                <span className="text-xs font-medium text-emerald-800 block">
                  {t.metrics.newFacts}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Score 0.85 - 1.0</span>
              </div>
            </div>

            {/* Center Core: Artigo (Main Document) */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer scale-110">
              <div className="w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 bg-slate-950 text-white border-2 border-slate-800">
                <Layers className="w-5 h-5 mb-0.5 text-amber-400" aria-hidden="true" />
                <span className="text-xs font-bold tracking-tight">{uiLang === 'en' ? 'Article' : uiLang === 'es' ? 'Artículo' : 'Artigo'}</span>
                <span className="text-[9px] opacity-70 font-mono">{uiLang === 'en' ? 'Document' : uiLang === 'es' ? 'Documento' : 'Documento'}</span>
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-slate-900 block">
                  {uiLang === 'en' ? 'Candidate' : uiLang === 'es' ? 'Candidato' : 'Candidato'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{uiLang === 'en' ? 'Audited Text' : uiLang === 'es' ? 'Texto Auditado' : 'Texto Auditado'}</span>
              </div>
            </div>

            {/* Connecting line */}
            <div className="hidden md:flex items-center justify-center w-16 h-0.5 border-t border-dashed border-slate-300 relative">
              <div className="absolute w-2 h-2 rounded-full bg-amber-400 -top-[3px]" aria-hidden="true" />
            </div>

            {/* Center-Right/Bottom: Conceito B (Fatos Incrementais) */}
            <div
              onClick={() => setSelectedCluster('INCREMENTAL')}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-18 h-18 rounded-full border-2 border-amber-500 bg-amber-50/90 hover:bg-amber-100/90 text-amber-800 flex flex-col items-center justify-center transition-all hover:scale-105 shadow-md">
                <span className="text-xs font-bold font-serif">{uiLang === 'en' ? 'Concepts' : uiLang === 'es' ? 'Conceptos' : 'Conceitos'}</span>
                <span className="text-[10px] font-mono font-semibold text-amber-600">
                  +{incrementalFactsCount} {uiLang === 'en' ? 'Expansions' : uiLang === 'es' ? 'Expansiones' : 'Expansões'}
                </span>
              </div>
              <div className="text-center">
                <span className="text-xs font-medium text-amber-800 block">
                  {t.metrics.incrementalFacts}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Score 0.40 - 0.75</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fact Chips Preview below canvas */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>{uiLang === 'en' ? 'Sample Propositions Connected to Graph' : uiLang === 'es' ? 'Muestra de Proposiciones Conectadas al Grafo' : 'Amostra de Proposições Conectadas ao Grafo'}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {t.resultsViewer.interactiveHint}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredFacts.slice(0, 6).map((fact) => {
              const isNew = fact.classificacao === 'NOVO';
              const isIncremental = fact.classificacao === 'INCREMENTAL';

              return (
                <div
                  key={fact.id}
                  onClick={() => onSelectFact(fact)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all hover:shadow-sm flex items-start justify-between gap-2 ${
                    isNew
                      ? 'bg-emerald-50/50 border-emerald-200/80 hover:border-emerald-400 text-emerald-900'
                      : isIncremental
                      ? 'bg-amber-50/50 border-amber-200/80 hover:border-amber-400 text-amber-900'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{fact.id}</span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                          isNew
                            ? 'bg-emerald-200/60 text-emerald-800'
                            : isIncremental
                            ? 'bg-amber-200/60 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {fact.classificacao}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] truncate leading-tight">
                      <strong>[{fact.sujeito}]</strong> {fact.predicado} <strong>[{fact.objeto}]</strong>
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AtomicFact, ThemeMode } from '../types';
import { Link2, Sparkles, ChevronRight, Layers, Eye } from 'lucide-react';

interface GraphCanvasProps {
  theme: ThemeMode;
  facts: AtomicFact[];
  newFactsCount: number;
  incrementalFactsCount: number;
  redundantFactsCount: number;
  onSelectFact: (fact: AtomicFact) => void;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  theme,
  facts,
  newFactsCount,
  incrementalFactsCount,
  redundantFactsCount,
  onSelectFact,
}) => {
  const [selectedCluster, setSelectedCluster] = useState<'ALL' | 'NOVO' | 'INCREMENTAL' | 'REDUNDANTE'>('ALL');
  const isDark = theme === 'dark';

  const filteredFacts = facts.filter((f) => {
    if (selectedCluster === 'ALL') return true;
    return f.classificacao === selectedCluster;
  });

  return (
    <div
      id="graph-studio-canvas"
      className={`rounded-2xl border shadow-xs transition-all overflow-hidden relative ${
        isDark
          ? 'bg-slate-900/80 border-slate-800'
          : 'bg-white border-slate-200/90'
      }`}
    >
      {/* Canvas Top Bar */}
      <div
        className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/70 border-slate-200/70'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`font-serif text-sm md:text-base font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Mapeamento Visual de Entidades & Fatos Atômicos
          </span>
          <span
            className={`hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${
              isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            FTS Visual Engine
          </span>
        </div>

        {/* Filter Clusters */}
        <div className="flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCluster('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedCluster === 'ALL'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-slate-900 text-white shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({facts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCluster('NOVO')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              selectedCluster === 'NOVO'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Novos ({newFactsCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCluster('INCREMENTAL')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              selectedCluster === 'INCREMENTAL'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Incrementais ({incrementalFactsCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCluster('REDUNDANTE')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              selectedCluster === 'REDUNDANTE'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Redundantes ({redundantFactsCount})
          </button>
        </div>
      </div>

      {/* Main Interactive Graph Visual Area */}
      <div className="p-6 lg:p-8">
        {/* Node Diagram Canvas Representation */}
        <div
          className={`relative w-full rounded-xl border p-6 min-h-[260px] flex items-center justify-center overflow-hidden ${
            isDark
              ? 'bg-slate-950/90 border-slate-800'
              : 'bg-[#fafafa] border-slate-200/80 shadow-inner'
          }`}
        >
          {/* Faint Graph Grid inside the canvas */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)'
                : 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Central and Orbiting Nodes (matching the reference image visual) */}
          <div className="relative z-10 w-full max-w-2xl flex flex-col md:flex-row items-center justify-around gap-6 py-4">
            {/* Left Node: Link / Baseline Anchor */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-105 shadow-sm ${
                  isDark
                    ? 'border-slate-700 bg-slate-900 text-slate-300'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                }`}
                title="Conexões Semânticas & Baseline"
              >
                <Link2 className="w-6 h-6 text-slate-500" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Ontologia Base
                </span>
                <span className="text-[10px] text-slate-400 font-mono">KB Canônica</span>
              </div>
            </div>

            {/* Connecting line */}
            <div className="hidden md:flex items-center justify-center w-16 h-0.5 border-t border-dashed border-slate-300 dark:border-slate-700 relative">
              <div className="absolute w-2 h-2 rounded-full bg-slate-400 -top-[3px]" />
            </div>

            {/* Top/Center-Left: Entidade A (Fatos Novos) */}
            <div
              onClick={() => setSelectedCluster('NOVO')}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div
                className={`w-18 h-18 rounded-full border-2 border-emerald-500 flex flex-col items-center justify-center transition-all hover:scale-105 shadow-md ${
                  isDark
                    ? 'bg-emerald-950/40 text-emerald-300'
                    : 'bg-emerald-50/90 text-emerald-800 hover:bg-emerald-100/90'
                }`}
              >
                <span className="text-xs font-bold font-serif">Entidades</span>
                <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  +{newFactsCount} Inéditas
                </span>
              </div>
              <div className="text-center">
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400 block">
                  Fatos Novos
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Score 0.85 - 1.0</span>
              </div>
            </div>

            {/* Center Core: Artigo (Main Document) */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer scale-110">
              <div
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 ${
                  isDark
                    ? 'bg-white text-slate-950 border-2 border-slate-200'
                    : 'bg-slate-950 text-white border-2 border-slate-800'
                }`}
              >
                <Layers className="w-5 h-5 mb-0.5 text-amber-400" />
                <span className="text-xs font-bold tracking-tight">Artigo</span>
                <span className="text-[9px] opacity-70 font-mono">Documento</span>
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">
                  Candidato
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Texto Auditado</span>
              </div>
            </div>

            {/* Connecting line */}
            <div className="hidden md:flex items-center justify-center w-16 h-0.5 border-t border-dashed border-slate-300 dark:border-slate-700 relative">
              <div className="absolute w-2 h-2 rounded-full bg-amber-400 -top-[3px]" />
            </div>

            {/* Center-Right/Bottom: Conceito B (Fatos Incrementais) */}
            <div
              onClick={() => setSelectedCluster('INCREMENTAL')}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div
                className={`w-18 h-18 rounded-full border-2 border-amber-500 flex flex-col items-center justify-center transition-all hover:scale-105 shadow-md ${
                  isDark
                    ? 'bg-amber-950/40 text-amber-300'
                    : 'bg-amber-50/90 text-amber-800 hover:bg-amber-100/90'
                }`}
              >
                <span className="text-xs font-bold font-serif">Conceitos</span>
                <span className="text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                  +{incrementalFactsCount} Expansões
                </span>
              </div>
              <div className="text-center">
                <span className="text-xs font-medium text-amber-800 dark:text-amber-400 block">
                  Incrementais
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Score 0.40 - 0.75</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fact Chips Preview below canvas */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Amostra de Proposições Conectadas ao Grafo</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Clique em um fato para inspecionar o tripleto S-P-O
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
                      ? isDark
                        ? 'bg-emerald-950/20 border-emerald-900/60 hover:border-emerald-500/60 text-emerald-200'
                        : 'bg-emerald-50/50 border-emerald-200/80 hover:border-emerald-400 text-emerald-900'
                      : isIncremental
                      ? isDark
                        ? 'bg-amber-950/20 border-amber-900/60 hover:border-amber-500/60 text-amber-200'
                        : 'bg-amber-50/50 border-amber-200/80 hover:border-amber-400 text-amber-900'
                      : isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{fact.id}</span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                          isNew
                            ? 'bg-emerald-200/60 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-300'
                            : isIncremental
                            ? 'bg-amber-200/60 text-amber-800 dark:bg-amber-900/80 dark:text-amber-300'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {fact.classificacao}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] truncate leading-tight">
                      <strong>[{fact.sujeito}]</strong> {fact.predicado} <strong>[{fact.objeto}]</strong>
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

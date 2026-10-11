import React from 'react';
import { ThemeMode } from '../types';
import { Sparkles, Brain, Quote } from 'lucide-react';

interface SynthesisCardProps {
  synthesis: string;
  theme: ThemeMode;
}

export const SynthesisCard: React.FC<SynthesisCardProps> = ({ synthesis, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div
      id="synthesis-container"
      className={`rounded-2xl border p-6 sm:p-7 transition-all ${
        isDark
          ? 'bg-slate-900/80 border-slate-800 text-slate-200'
          : 'bg-white border-slate-200/90 shadow-xs text-slate-800'
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
            <Brain className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <h3 className={`font-serif text-lg font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Síntese Analítica do Information Gain
            </h3>
            <span className="text-[11px] text-slate-400 block -mt-0.5">
              Diagnóstico contextual de novidade e relevância ontológica
            </span>
          </div>
        </div>

        <span
          className={`font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
            isDark
              ? 'text-amber-300 bg-amber-950/70 border-amber-500/40'
              : 'text-amber-800 bg-amber-50 border-amber-200'
          }`}
        >
          FTS v2.4 Engine
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8">
        <Quote className="absolute left-0 top-0 w-4 h-4 text-amber-500 opacity-60" />
        <div
          id="synthesis-content"
          className={`text-sm leading-relaxed font-sans ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {synthesis}
        </div>
      </div>
    </div>
  );
};

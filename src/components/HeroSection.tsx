import React from 'react';
import { ThemeMode } from '../types';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface HeroSectionProps {
  theme: ThemeMode;
  onAuditClick: () => void;
  onExploreKnowledgeBase: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onAuditClick,
  onExploreKnowledgeBase,
}) => {
  const isDark = theme === 'dark';

  return (
    <section id="hero" className="relative pt-12 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
      {/* Release Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-6 border transition-transform hover:scale-105 cursor-default shadow-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Analisador de Ganho de Informação</span>
      </div>

      {/* Main Serif Headline */}
      <h1
        className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.18] mb-6 ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}
      >
        Transforme seus textos em{' '}
        <span className="text-emerald-700 dark:text-emerald-400 italic">
          ativos de conhecimento conectados
        </span>
        .
      </h1>

      {/* Editorial Subtitle with spacious line height */}
      <p
        className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-9 font-normal ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        Não apenas escreva conteúdo. Construa autoridade com SEO Semântico e cálculo
        matemático de Ganho Marginal de Informação, garantindo que suas ideias tragam novidade
        factual real para humanos, LLMs e mecanismos de busca.
      </p>

      {/* Primary & Secondary Action Pill Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
        <button
          type="button"
          onClick={onAuditClick}
          id="hero-btn-audit"
          className={`px-7 py-3.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer ${
            isDark
              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold'
              : 'bg-slate-950 hover:bg-slate-800 text-white'
          }`}
        >
          <span>Quero auditar meu texto agora</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onExploreKnowledgeBase}
          id="hero-btn-explore-kb"
          className={`px-6 py-3.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 border shadow-xs hover:shadow-sm active:scale-98 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200'
              : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-slate-500" />
          <span>Explorar base de conhecimento</span>
        </button>
      </div>

      {/* Subtle indicator of principles */}
      <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-mono pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Tripletos S-P-O
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Distância Cosseno
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Score Marginal
        </span>
      </div>
    </section>
  );
};

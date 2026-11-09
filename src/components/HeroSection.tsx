import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';

interface HeroSectionProps {
  onAuditClick: () => void;
  onExploreKnowledgeBase: () => void;
  uiLang?: SupportedLang;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAuditClick,
  onExploreKnowledgeBase,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  return (
    <section id="hero" className="relative pt-12 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
      {/* Release Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-6 border transition-transform hover:scale-105 cursor-default shadow-xs bg-white border-slate-200 text-slate-700">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
        <span>{t.hero.badge}</span>
      </div>

      {/* Main Serif Headline */}
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.18] mb-6 text-slate-950">
        {t.hero.title}
      </h1>

      {/* Editorial Subtitle with spacious line height */}
      <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-9 font-normal text-slate-600">
        {t.hero.subtitle}
      </p>

      {/* Primary & Secondary Action Pill Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
        <button
          type="button"
          onClick={onAuditClick}
          id="hero-btn-audit"
          className="min-h-[44px] min-w-[44px] px-7 py-3.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer bg-slate-950 hover:bg-slate-800 text-white"
        >
          <span>{t.hero.btnAudit}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onExploreKnowledgeBase}
          id="hero-btn-explore-kb"
          className="min-h-[44px] min-w-[44px] px-6 py-3.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 border shadow-xs hover:shadow-sm active:scale-98 cursor-pointer border-slate-300 bg-white hover:bg-slate-50 text-slate-800"
        >
          <BookOpen className="w-4 h-4 text-slate-500" aria-hidden="true" />
          <span>{t.hero.btnExploreKb}</span>
        </button>
      </div>

      {/* Subtle indicator of principles */}
      <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-mono pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          {t.hero.pills.triplets}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
          {t.hero.pills.cosine}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
          {t.hero.pills.marginalScore}
        </span>
      </div>
    </section>
  );
};

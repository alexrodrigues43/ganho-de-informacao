import React from 'react';
import { 
  AlertTriangle, 
  Layers, 
  TrendingDown, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';

interface EditorialSectionsProps {
  onStartAudit: () => void;
  uiLang?: SupportedLang;
}

export const EditorialSections: React.FC<EditorialSectionsProps> = ({
  onStartAudit,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  const { problem, benefits, howItWorks, cta, footer } = t.editorialSections;

  return (
    <div className="space-y-24 py-12">
      {/* SECTION: O PROBLEMA */}
      <section id="o-problema" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">
            {problem.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mt-2 mb-4 text-slate-950">
            {problem.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {problem.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center mb-5">
              <TrendingDown className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2.5 text-slate-950">
              {problem.card1Title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {problem.card1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2.5 text-slate-950">
              {problem.card2Title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {problem.card2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-600 flex items-center justify-center mb-5">
              <Layers className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2.5 text-slate-950">
              {problem.card3Title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {problem.card3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: PRINCIPAIS BENEFÍCIOS */}
      <section id="beneficios" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-mono">
            {benefits.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mt-2 mb-4 text-slate-950">
            {benefits.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all relative overflow-hidden">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-emerald-600 font-semibold block mb-1">
              {benefits.b1Tag}
            </span>
            <h3 className="font-serif text-base font-semibold mb-2 text-slate-950">
              {benefits.b1Title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              {benefits.b1Desc}
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all relative overflow-hidden">
            <div className="w-1.5 h-6 bg-amber-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-amber-600 font-semibold block mb-1">
              {benefits.b2Tag}
            </span>
            <h3 className="font-serif text-base font-semibold mb-2 text-slate-950">
              {benefits.b2Title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              {benefits.b2Desc}
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all relative overflow-hidden">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-blue-600 font-semibold block mb-1">
              {benefits.b3Tag}
            </span>
            <h3 className="font-serif text-base font-semibold mb-2 text-slate-950">
              {benefits.b3Title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              {benefits.b3Desc}
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all relative overflow-hidden">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-purple-600 font-semibold block mb-1">
              {benefits.b4Tag}
            </span>
            <h3 className="font-serif text-base font-semibold mb-2 text-slate-950">
              {benefits.b4Title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              {benefits.b4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: COMO FUNCIONA */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">
            {howItWorks.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mt-2 mb-4 text-slate-950">
            {howItWorks.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all relative">
            <div className="text-3xl font-serif font-bold text-amber-500/30 mb-2 font-mono">
              {howItWorks.s1Num}
            </div>
            <h3 className="font-serif text-lg font-medium mb-2.5 text-slate-950">
              {howItWorks.s1Title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {howItWorks.s1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all relative">
            <div className="text-3xl font-serif font-bold text-amber-500/30 mb-2 font-mono">
              {howItWorks.s2Num}
            </div>
            <h3 className="font-serif text-lg font-medium mb-2.5 text-slate-950">
              {howItWorks.s2Title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {howItWorks.s2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all relative">
            <div className="text-3xl font-serif font-bold text-amber-500/30 mb-2 font-mono">
              {howItWorks.s3Num}
            </div>
            <h3 className="font-serif text-lg font-medium mb-2.5 text-slate-950">
              {howItWorks.s3Title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {howItWorks.s3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-14 text-center border border-slate-800 shadow-2xl">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-5">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{cta.badge}</span>
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
              {cta.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              {cta.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onStartAudit}
                className="min-h-[44px] min-w-[44px] px-8 py-3.5 rounded-full text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{cta.btnAudit}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FOOTER */}
      <footer className="border-t border-slate-200 pt-12 pb-16 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-4">
            <a
              href={t.navLinks.services.replace(/\/servicos\.html|\/services\.html|\/servicios\.html/, '') || 'https://semantico.com.br'}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1 transition-all"
            >
              <img
                src="/logo-semantico-horizontal.png"
                alt="Logo Semântico SEO"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            <div>
              <span className="font-bold text-slate-800 block font-headline">
                {footer.brand}
              </span>
              <span>{footer.rights}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={t.navLinks.services}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              {t.nav.services}
            </a>
            <a
              href={t.navLinks.suite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              {t.nav.suite}
            </a>
            <a
              href={t.navLinks.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              {t.nav.blog}
            </a>
            <a
              href={t.navLinks.podcasts}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              {t.nav.podcasts}
            </a>
            <a
              href={t.navLinks.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              {t.nav.contact}
            </a>
            <a
              href="https://www.linkedin.com/in/alexandre-rodrigues-seo/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold text-slate-700 py-2 min-h-[44px]"
            >
              <span>{footer.author}</span>
            </a>
            <a
              href="https://patents.google.com/patent/US11354342B2/en"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              {footer.patentLink}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

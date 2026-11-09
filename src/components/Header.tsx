import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, SupportedLang } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { getTranslations } from '../lib/i18n';
import { 
  RotateCcw, 
  ChevronDown, 
  Sparkles, 
  LogIn,
  LogOut, 
  ShieldCheck, 
  Zap,
  BookOpen, 
  Database, 
  ExternalLink 
} from 'lucide-react';

interface HeaderProps {
  knownFactsCount: number;
  onResetSession: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenAdmin: () => void;
  onOpenPaywall?: () => void;
  onLogout: () => void;
  onResetAll?: () => void;
  uiLang?: SupportedLang;
  onLanguageChange?: (lang: SupportedLang) => void;
}

export const Header: React.FC<HeaderProps> = ({
  knownFactsCount,
  onResetSession,
  currentUser,
  onOpenAuth,
  onOpenAdmin,
  onOpenPaywall,
  onLogout,
  onResetAll,
  uiLang = 'pt',
  onLanguageChange,
}) => {
  const t = getTranslations(uiLang);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = currentUser?.role === 'admin';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-800 shadow-2xs"
    >
      {/* TIER 1: TOP BAR (Brand Logo + Public Navigation + CTA + Auth) */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
            
            {/* 1. BRAND LOGO */}
            <div className="flex items-center gap-6">
              <a
                href={t.navLinks.services.replace(/\/servicos\.html|\/services\.html|\/servicios\.html/, '') || 'https://semantico.com.br'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group cursor-pointer shrink-0"
                id="brand-logo-container"
                title="Semântico — Significado e Sentido"
              >
                <div className="transition-all rounded-xl p-1 flex items-center">
                  <img
                    src="/logo-semantico-horizontal.png"
                    alt="Logo Semântico SEO — Significado e Sentido"
                    className="h-9 sm:h-11 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>

              {/* 2. CENTER LINKS (Matching official Semântico Suite navigation) */}
              <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-700" aria-label="Navegação Principal">
                <a
                  href={t.navLinks.contact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 transition-colors cursor-pointer py-2 min-h-[44px] flex items-center"
                >
                  {t.nav.contact}
                </a>
              </nav>
            </div>

            {/* 3. RIGHT CONTROLS (Wallet + Language + Penultimate: Criar Conta + Last: Entrar / User) */}
            <div className="flex items-center gap-2.5 shrink-0">

              {/* Central Credit Wallet Badge / Comprar Créditos */}
              <a
                href="https://cobrador.semantico.com.br"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-nav-wallet"
                className={`min-h-[44px] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs cursor-pointer whitespace-nowrap shrink-0 ${
                  !currentUser || isAdmin
                    ? 'bg-amber-500/10 text-amber-950 border-amber-300 hover:bg-amber-500/20'
                    : (currentUser.creditsBalance ?? 0) > 0
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100 animate-pulse'
                }`}
                title={isAdmin ? `Super Admin: ${t.nav.unlimitedCredits}` : 'Gerenciar créditos no Cobrador Semântico'}
              >
                <span className="text-sm" aria-hidden="true">🪙</span>
                <span>
                  {!currentUser
                    ? t.nav.buyCredits
                    : isAdmin
                      ? t.nav.unlimitedCredits
                      : `${currentUser.creditsBalance ?? 0} ${t.nav.credits}`}
                </span>
              </a>

              {/* Language Selector (WCAG 2.2 AA) */}
              <LanguageSelector
                currentLang={uiLang}
                onLanguageChange={onLanguageChange || (() => {})}
                ariaLabel={t.nav.languageSelectAria}
              />

              {/* PENULTIMATE ITEM: Criar Conta / Assinatura / Super Admin (Golden Button) */}
              <button
                type="button"
                onClick={() => {
                  if (isAdmin) {
                    onOpenAdmin();
                  } else if (!currentUser) {
                    onOpenAuth('register');
                  } else {
                    onOpenPaywall?.();
                  }
                }}
                className="min-h-[44px] px-4 py-1.5 rounded-full bg-[#f5be38] hover:bg-[#eab308] text-slate-950 text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-98 flex items-center gap-1.5"
                title={isAdmin ? t.nav.adminPanel : currentUser ? t.nav.subscription : t.nav.createAccount}
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" aria-hidden="true" />
                <span>{isAdmin ? t.nav.superAdmin : currentUser ? t.nav.subscription : t.nav.createAccount}</span>
              </button>

              {/* LAST ITEM: User Session Dropdown (Logged in) OR Entrar Button (Logged out) */}
              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="min-h-[44px] flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="" 
                        className="w-4 h-4 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#1a5d38]" aria-hidden="true" />
                    )}
                    <span className="max-w-[85px] truncate text-[11px] font-bold">
                      {isAdmin ? 'Admin' : (currentUser.displayName?.split(' ')[0] || currentUser.email?.split('@')[0])}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isAdmin ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isAdmin ? t.nav.superAdmin : `${t.nav.status}: ${currentUser.status}`}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            {currentUser.plan || 'free'}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 truncate mt-1">
                          {currentUser.displayName || t.nav.user}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {currentUser.email}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                          <span className="text-slate-500 font-semibold">{t.nav.balance}</span>
                          <span className="font-bold text-amber-800">
                            {isAdmin ? t.nav.unlimitedCredits : `${currentUser.creditsBalance ?? 0} ${t.nav.credits}`}
                          </span>
                        </div>
                      </div>

                      {!isAdmin && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenPaywall?.();
                          }}
                          className="w-full px-3.5 py-2.5 text-left hover:bg-amber-50 flex items-center gap-2 text-xs font-semibold text-amber-900 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                          <span>{t.nav.reloadSub}</span>
                        </button>
                      )}

                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenAdmin();
                          }}
                          className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#f5be38]" aria-hidden="true" />
                          <span>{t.nav.adminPanel}</span>
                        </button>
                      )}

                      {/* Benchmark & Session Controls */}
                      {onResetAll && (
                        <button
                          type="button"
                          onClick={() => {
                            onResetAll();
                            setUserMenuOpen(false);
                          }}
                          className="w-full px-3.5 py-2.5 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                          <span>{t.nav.resetAll}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          onResetSession();
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 text-slate-600 flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.nav.restoreInitialBenchmark}</span>
                      </button>

                      <a
                        href="https://patents.google.com/patent/US11354342B2/en"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.nav.patentGoogle}</span>
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full px-3.5 py-2.5 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 text-xs font-semibold border-t border-slate-100 mt-1 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.nav.logout}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="min-h-[44px] px-3.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  <span>{t.nav.login}</span>
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* TIER 2: SUB-NAVBAR RIBBON (Section Anchors + System Status) */}
      <div className="bg-slate-50/80 border-t border-slate-100 text-slate-600 px-4 sm:px-6 lg:px-8 py-2.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center relative">
          <div className="flex items-center justify-center gap-6 sm:gap-8 whitespace-nowrap overflow-x-auto custom-scroll py-0.5" role="navigation" aria-label="Navegação de Seções">
            <button
              type="button"
              onClick={() => scrollToSection('o-problema')}
              className="hover:text-slate-950 transition-colors cursor-pointer py-1"
            >
              {t.subnav.problem}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('graph-studio-canvas')}
              className="hover:text-slate-950 transition-colors flex items-center gap-1.5 text-emerald-700 font-semibold cursor-pointer py-1"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.subnav.graphStudio}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('beneficios')}
              className="hover:text-slate-950 transition-colors cursor-pointer py-1"
            >
              {t.subnav.benefits}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('como-funciona')}
              className="hover:text-slate-950 transition-colors cursor-pointer py-1"
            >
              {t.subnav.howItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('workspace')}
              className="hover:text-slate-950 transition-colors font-bold text-amber-600 cursor-pointer py-1"
            >
              {t.subnav.auditor}
            </button>
          </div>

          {/* Live System Indicator */}
          <div className="hidden xl:flex items-center gap-3 text-[11px] font-mono shrink-0 absolute right-0">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Database className="w-3 h-3 text-amber-500" aria-hidden="true" />
              <span>{knownFactsCount} {t.subnav.factsInMemory}</span>
            </span>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              {t.subnav.calibratedEngine}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

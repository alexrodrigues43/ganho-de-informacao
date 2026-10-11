import React, { useState, useRef, useEffect } from 'react';
import { ThemeMode, UserProfile } from '../types';
import { SemanticoIcon } from './SemanticoIcon';
import { 
  Terminal, 
  RotateCcw, 
  Sun, 
  Moon, 
  ChevronDown, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  Database,
  BookOpen,
  User,
  LogOut,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: (mode: ThemeMode) => void;
  knownFactsCount: number;
  onResetSession: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
  onResetAll?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  knownFactsCount,
  onResetSession,
  currentUser,
  onOpenAuth,
  onOpenAdmin,
  onLogout,
  onResetAll,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = theme === 'dark';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="app-header"
      className={`border-b sticky top-0 z-40 transition-colors backdrop-blur-md ${
        isDark
          ? 'border-slate-800 bg-slate-950/95 text-slate-100'
          : 'border-slate-200/90 bg-white/95 text-slate-800'
      }`}
    >
      {/* Top Main Navigation Bar matching reference image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand: Semântico - Significado e Sentido */}
        <div className="flex items-center gap-6">
          <a
            href="https://semantico.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center group cursor-pointer"
            id="brand-logo-container"
            title="Semântico — Significado e Sentido"
          >
            {/* Horizontal Brand Logo */}
            <div className={`transition-all rounded-xl p-1 flex items-center ${isDark ? 'bg-white/95 shadow-xs' : ''}`}>
              <img
                src="/logo-semantico-horizontal.png"
                alt="Logo Semântico SEO — Significado e Sentido"
                className="h-10 sm:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Navigation Links matching Graph Studio */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a
              href="https://semantico.com.br/servicos.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-amber-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Serviços
            </a>
            <a
              href="https://semantico.com.br/especiais.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-amber-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Ferramentas
            </a>
            <a
              href="https://semantico.com.br/blog"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-amber-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Blog
            </a>
            <a
              href="https://semantico.com.br/podcast-semantico.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-amber-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Podcasts
            </a>
            <a
              href="https://semantico.com.br/contato.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-amber-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Contato
            </a>
          </nav>
        </div>

        {/* Right Actions: Language, Golden Pill CTA, and Controls */}
        <div className="flex items-center gap-3">
          {/* Flag / Language */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                isDark ? 'border-slate-800 hover:bg-slate-900 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-sm">🇧🇷</span>
              <span className="text-xs font-semibold">PT</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {langMenuOpen && (
              <div
                className={`absolute right-0 top-full mt-1.5 w-32 rounded-xl border shadow-lg py-1 z-50 text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="px-3 py-1.5 font-medium flex items-center gap-2 bg-amber-50/20 text-amber-600 dark:text-amber-400">
                  <span>🇧🇷</span> Português
                </div>
                <div className="px-3 py-1.5 opacity-60 flex items-center gap-2 cursor-not-allowed">
                  <span>🇺🇸</span> English
                </div>
              </div>
            )}
          </div>

          {/* Golden Button "Solicitar Orçamento / Auditar Agora" */}
          <button
            type="button"
            onClick={() => scrollToSection('workspace')}
            id="btn-nav-primary-action"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-xs bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300 active:scale-95 cursor-pointer"
          >
            <span>Solicitar Análise</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Admin Panel Button (Exclusive for Alexandre/Admins) */}
          {currentUser?.role === 'admin' && (
            <button
              type="button"
              onClick={onOpenAdmin}
              id="btn-nav-admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300 cursor-pointer animate-in fade-in"
              title="Gerenciar Licenças e Clientes"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
          )}

          {/* If NOT logged in: quick login button */}
          {!currentUser && (
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Entrar</span>
            </button>
          )}

          {/* Light / Dark Mode Toggle */}
          <div
            className={`flex items-center p-0.5 rounded-full text-xs font-medium border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              id="btn-theme-light"
              onClick={() => onToggleTheme('light')}
              title="Modo Claro"
              className={`p-1.5 rounded-full transition-all ${
                !isDark ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </button>
            <button
              type="button"
              id="btn-theme-dark"
              onClick={() => onToggleTheme('dark')}
              title="Modo Escuro"
              className={`p-1.5 rounded-full transition-all ${
                isDark ? 'bg-amber-400 text-slate-950 shadow-xs font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User / Session Reset Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              id="btn-user-menu"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`flex items-center gap-1.5 p-1 rounded-full border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-slate-900 hover:bg-slate-800'
                  : 'border-slate-200 bg-white hover:bg-slate-50 shadow-xs'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentUser
                    ? currentUser.role === 'admin'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : currentUser.status === 'active'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-amber-500 text-white font-bold'
                    : isDark
                    ? 'bg-slate-950 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {currentUser ? (
                  currentUser.displayName?.charAt(0).toUpperCase() || currentUser.email.charAt(0).toUpperCase()
                ) : (
                  <User className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {userMenuOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-80 rounded-2xl border shadow-xl z-50 p-3 flex flex-col gap-2 text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {currentUser ? (
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block font-headline text-sm">
                          {currentUser.displayName || 'Assinante'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono block truncate max-w-[200px]">
                          {currentUser.email}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          currentUser.role === 'admin'
                            ? 'bg-amber-400 text-slate-950'
                            : currentUser.status === 'active'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : currentUser.status === 'pending'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {currentUser.role === 'admin'
                          ? 'ADMIN'
                          : currentUser.status === 'active'
                          ? 'ATIVO'
                          : currentUser.status === 'pending'
                          ? 'PENDENTE'
                          : 'INATIVO'}
                      </span>
                    </div>

                    {currentUser.role === 'admin' ? (
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenAdmin();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Abrir Gestão de Licenças</span>
                      </button>
                    ) : (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>
                          Plano: <strong className="capitalize">{currentUser.plan || 'Mensal'}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Área de Assinantes
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Faça login ou crie sua conta para liberar o auditor completo.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenAuth('login');
                        }}
                        className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-center cursor-pointer"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenAuth('register');
                        }}
                        className="py-1.5 px-3 rounded-lg bg-amber-400 text-slate-950 font-bold text-center cursor-pointer"
                      >
                        Cadastrar
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      Base ativa: {knownFactsCount} fatos
                    </span>
                  </div>
                </div>

                <a
                  href="https://patents.google.com/patent/US11354342B2/en"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Patente Google (US 11,354,342)
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                {onResetAll && (
                  <button
                    type="button"
                    onClick={() => {
                      onResetAll();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left cursor-pointer font-medium"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-500" />
                    <span>Limpar Tudo (Reset Geral)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onResetSession();
                    setUserMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restaurar Benchmark Inicial</span>
                </button>

                {currentUser && (
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair da Conta</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Ribbon Centralized */}
      <div
        className={`border-t px-4 sm:px-6 lg:px-8 py-2.5 text-xs font-medium transition-colors ${
          isDark ? 'border-slate-800/80 bg-slate-950/70 text-slate-400' : 'border-slate-100 bg-slate-50/80 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center relative">
          <div className="flex items-center justify-center gap-6 sm:gap-8 whitespace-nowrap overflow-x-auto custom-scroll py-0.5">
            <button
              onClick={() => scrollToSection('o-problema')}
              className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              O Problema
            </button>
            <button
              onClick={() => scrollToSection('graph-studio-canvas')}
              className="hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Graph Studio</span>
            </button>
            <button
              onClick={() => scrollToSection('beneficios')}
              className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection('workspace')}
              className="hover:text-slate-950 dark:hover:text-white transition-colors font-bold text-amber-600 dark:text-amber-400 cursor-pointer"
            >
              Auditor S-P-O
            </button>
          </div>

          {/* Live System Indicator */}
          <div className="hidden xl:flex items-center gap-3 text-[11px] font-mono shrink-0 absolute right-0">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Database className="w-3 h-3 text-amber-500" />
              <span>{knownFactsCount} fatos em memória</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Motor Calibrado
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

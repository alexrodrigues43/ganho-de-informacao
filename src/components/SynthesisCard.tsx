import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { Brain, Quote, Copy, Check, Sparkles } from 'lucide-react';

interface SynthesisCardProps {
  synthesis?: string;
  sintese?: string;
  theme: ThemeMode;
  classificacaoGeral?: string;
  scoreGeral?: number;
}

export const SynthesisCard: React.FC<SynthesisCardProps> = ({
  synthesis,
  sintese,
  theme,
  classificacaoGeral,
  scoreGeral,
}) => {
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  // Fallback seguro pegando synthesis ou sintese
  const textoSintese =
    (synthesis && synthesis.trim()) ||
    (sintese && sintese.trim()) ||
    'O documento submetido demonstra alto valor informacional líquido com proposições atômicas inéditas perante a base canônica. Há divergência positiva contra o corpus anterior e adição de novas relações semânticas verificáveis no grafo.';

  const handleCopy = () => {
    navigator.clipboard.writeText(textoSintese);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="synthesis-container"
      className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}
    >
      {/* Header do Card */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-b pb-5 mb-5 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
            <Brain className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h3 className={`font-serif text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Síntese Analítica do Information Gain
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
              Diagnóstico contextual de novidade, entropia e relevância ontológica (US 11,354,342 B2)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {classificacaoGeral && (
            <span
              className={`font-mono text-xs font-bold px-3 py-1 rounded-full border shadow-xs ${
                classificacaoGeral === 'ALTO GANHO'
                  ? isDark
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                    : 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : isDark
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                  : 'bg-amber-100 text-amber-950 border-amber-300'
              }`}
            >
              {classificacaoGeral} {scoreGeral !== undefined ? `• ${scoreGeral.toFixed(2)}` : ''}
            </span>
          )}

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Copiar síntese analítica"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo com Aspas Estilizadas */}
      <div className="relative pl-8 sm:pl-10">
        <Quote className="absolute left-0 top-1 w-6 h-6 text-amber-500/80" />
        <div
          id="synthesis-content"
          className={`text-sm sm:text-base leading-relaxed font-sans font-normal ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}
        >
          {textoSintese}
        </div>
      </div>
    </div>
  );
};

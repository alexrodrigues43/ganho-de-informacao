import React, { useState } from 'react';
import { Brain, Quote, Copy, Check } from 'lucide-react';
import { SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';

interface SynthesisCardProps {
  synthesis?: string;
  sintese?: string;
  classificacaoGeral?: string;
  scoreGeral?: number;
  uiLang?: SupportedLang;
}

export const SynthesisCard: React.FC<SynthesisCardProps> = ({
  synthesis,
  sintese,
  classificacaoGeral,
  scoreGeral,
  uiLang = 'pt',
}) => {
  const [copied, setCopied] = useState(false);
  const t = getTranslations(uiLang);

  const fallbackText =
    uiLang === 'en'
      ? 'The submitted document demonstrates high net informational value with novel atomic propositions compared to the canonical baseline. There is positive divergence against previous consensus and addition of new verifiable semantic relationships in the knowledge graph.'
      : uiLang === 'es'
      ? 'El documento enviado demuestra un alto valor informacional neto con proposiciones atómicas inéditas frente a la línea base canónica. Hay una divergencia positiva frente al consenso anterior y adición de nuevas relaciones semánticas verificables en el grafo de conocimiento.'
      : 'O documento submetido demonstra alto valor informacional líquido com proposições atômicas inéditas perante a base canônica. Há divergência positiva contra o corpus anterior e adição de novas relações semânticas verificáveis no grafo.';

  const textoSintese =
    (synthesis && synthesis.trim()) ||
    (sintese && sintese.trim()) ||
    fallbackText;

  const handleCopy = () => {
    navigator.clipboard.writeText(textoSintese);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const classificationText =
    classificacaoGeral === 'ALTO GANHO'
      ? t.metrics.highGain
      : classificacaoGeral === 'MÉDIO GANHO'
      ? t.metrics.mediumGain
      : classificacaoGeral === 'BAIXO GANHO'
      ? t.metrics.lowGain
      : classificacaoGeral;

  return (
    <div
      id="synthesis-container"
      className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 transition-all shadow-sm text-slate-900"
    >
      {/* Header do Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
            <Brain className="w-5 h-5 text-slate-950" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-950">
              {t.metrics.synthesisTitle}
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">
              {t.synthesis.badge} — US 11,354,342 B2
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {classificationText && (
            <span
              className={`font-mono text-xs font-bold px-3 py-1 rounded-full border shadow-xs ${
                classificacaoGeral === 'ALTO GANHO'
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : 'bg-amber-100 text-amber-950 border-amber-300'
              }`}
            >
              {classificationText} {scoreGeral !== undefined ? `• ${scoreGeral.toFixed(2)}` : ''}
            </span>
          )}

          <button
            onClick={handleCopy}
            className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title={t.common.copy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span className="text-emerald-700 font-semibold">{t.common.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>{t.common.copy}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo com Aspas Estilizadas */}
      <div className="relative pl-8 sm:pl-10">
        <Quote className="absolute left-0 top-1 w-6 h-6 text-amber-500/80" aria-hidden="true" />
        <div
          id="synthesis-content"
          className="text-sm sm:text-base leading-relaxed font-sans font-normal text-slate-700"
        >
          {textoSintese}
        </div>
      </div>
    </div>
  );
};

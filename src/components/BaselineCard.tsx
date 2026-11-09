import React, { useState, useRef } from 'react';
import { AtomicFact, SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';
import { Database, GitBranch, UploadCloud, Search, ShieldCheck, Loader2, Trash2 } from 'lucide-react';

interface BaselineCardProps {
  baselineText: string;
  onChangeBaselineText?: (text: string) => void;
  onTextChange?: (text: string) => void;
  knownFacts: AtomicFact[];
  onExtractBaseline: () => void;
  isExtracting: boolean;
  onFileUpload: (file: File) => void;
  onSelectFact?: (fact: AtomicFact) => void;
  onClear?: () => void;
  onClearBaseline?: () => void;
  uiLang?: SupportedLang;
}

export const BaselineCard: React.FC<BaselineCardProps> = ({
  baselineText,
  onChangeBaselineText,
  onTextChange,
  knownFacts,
  onExtractBaseline,
  isExtracting,
  onFileUpload,
  onSelectFact,
  onClear,
  onClearBaseline,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  const [activeTab, setActiveTab] = useState<'doc' | 'facts'>('doc');
  const [searchFilter, setSearchFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = onTextChange || onChangeBaselineText || (() => {});
  const handleClear = onClear || onClearBaseline;

  const filteredFacts = knownFacts.filter((fact) => {
    if (!searchFilter.trim()) return true;
    const term = searchFilter.toLowerCase();
    return (
      fact.id.toLowerCase().includes(term) ||
      fact.sujeito.toLowerCase().includes(term) ||
      fact.predicado.toLowerCase().includes(term) ||
      fact.objeto.toLowerCase().includes(term)
    );
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div
      id="card-baseline-knowledge"
      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header bar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Database className="w-4 h-4 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-slate-950">
                {t.baseline.title}
              </h3>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                {t.baseline.subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {baselineText.length > 0 && handleClear && (
              <button
                type="button"
                onClick={handleClear}
                title={t.baseline.clearBase}
                className="min-h-[44px] px-3 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.baseline.clearBase}</span>
              </button>
            )}

            <span className="font-mono text-[11px] px-3 py-1 rounded-full border text-slate-700 bg-white border-slate-200 shadow-2xs font-semibold">
              {t.baseline.ontologyBadge}
            </span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 rounded-full text-xs font-medium border bg-slate-200/70 border-slate-300/60" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'doc'}
            id="tab-btn-doc-base"
            onClick={() => setActiveTab('doc')}
            className={`flex-1 min-h-[44px] py-2 px-4 rounded-full transition-all font-semibold flex items-center justify-center cursor-pointer ${
              activeTab === 'doc'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.baseline.tabDoc}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'facts'}
            id="tab-btn-facts-base"
            onClick={() => setActiveTab('facts')}
            className={`flex-1 min-h-[44px] py-2 px-4 rounded-full transition-all flex items-center justify-center gap-2 font-semibold cursor-pointer ${
              activeTab === 'facts'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{t.baseline.tabFacts}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
              {knownFacts.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Inserir documento base */}
      {activeTab === 'doc' && (
        <div className="p-6 sm:p-7 flex flex-col gap-4" id="content-baseline-doc">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
              <span>{baselineText.length} {t.baseline.docCounter}</span>
            </span>
          </div>

          <textarea
            id="input-baseline-doc"
            value={baselineText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={t.baseline.placeholder}
            className="w-full font-sans text-base sm:text-xs leading-relaxed rounded-xl p-4 min-h-[170px] focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all resize-y custom-scroll border text-slate-800 bg-slate-50/70 border-slate-200/90 placeholder-slate-400"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".txt,.md"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              id="upload-baseline-file"
              onClick={() => fileInputRef.current?.click()}
              className="min-h-[44px] text-xs font-medium rounded-full px-4 py-2.5 border flex items-center gap-2 transition-all cursor-pointer text-slate-700 hover:text-slate-900 border-slate-300 bg-white hover:bg-slate-50 shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>{t.baseline.importFile}</span>
            </button>

            <button
              type="button"
              id="btn-extract-baseline"
              onClick={onExtractBaseline}
              disabled={isExtracting || !baselineText.trim()}
              className="min-h-[44px] text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-5 py-2.5 shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              {isExtracting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" aria-hidden="true" />
              ) : (
                <GitBranch className="w-3.5 h-3.5 text-slate-950" aria-hidden="true" />
              )}
              <span>{isExtracting ? t.baseline.btnExtracting : t.baseline.btnExtract}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Fatos já extraídos */}
      {activeTab === 'facts' && (
        <div className="p-6 sm:p-7 flex flex-col gap-4" id="content-baseline-facts">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="uppercase tracking-wider font-semibold text-slate-600">
              {t.baseline.indexedTriplets}
            </span>
            <span className="border px-2.5 py-0.5 rounded-full font-bold text-[11px] text-amber-800 bg-amber-50 border-amber-300">
              {knownFacts.length} {t.nav.knownFacts}
            </span>
          </div>

          {/* Search bar inside facts */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              placeholder={t.baseline.searchPlaceholder}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-base sm:text-xs pl-9 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-400 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
            />
          </div>

          <div
            id="known-facts-list"
            className="max-h-64 overflow-y-auto divide-y divide-slate-100 bg-slate-50/50 border border-slate-200 text-slate-700 text-xs p-3 rounded-xl space-y-2 custom-scroll"
          >
            {filteredFacts.map((fact) => (
              <div
                key={fact.id}
                onClick={() => onSelectFact?.(fact)}
                className="py-2 px-2 flex flex-col gap-1 rounded-lg cursor-pointer transition-all hover:bg-white shadow-2xs"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-400 font-bold">{fact.id}</span>
                  <span className="text-emerald-500 font-mono text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" aria-hidden="true" />
                    <span>{t.baseline.confidence} {fact.confianca ? `${(fact.confianca * 100).toFixed(1)}%` : '99.0%'}</span>
                  </span>
                </div>
                <div className="font-mono text-[11px] leading-tight">
                  <span className="font-semibold text-slate-950">
                    [{fact.sujeito}]
                  </span>{' '}
                  <span className="text-amber-600 font-medium">→ {fact.predicado} →</span>{' '}
                  <span className="font-semibold text-slate-950">
                    [{fact.objeto}]
                  </span>
                </div>
              </div>
            ))}
            {filteredFacts.length === 0 && (
              <p className="text-xs text-slate-400 py-6 text-center">{t.baseline.noFactsFound}</p>
            )}
          </div>

          <p className="text-[11px] text-slate-400 italic">
            {t.baseline.showingFacts.replace('{count}', String(filteredFacts.length)).replace('{total}', String(knownFacts.length))}
          </p>
        </div>
      )}
    </div>
  );
};

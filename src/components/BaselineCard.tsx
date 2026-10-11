import React, { useState, useRef } from 'react';
import { AtomicFact, ThemeMode } from '../types';
import { Database, GitBranch, UploadCloud, Search, ShieldCheck, Loader2, BookOpen, Trash2 } from 'lucide-react';

interface BaselineCardProps {
  theme: ThemeMode;
  baselineText: string;
  onChangeBaselineText: (text: string) => void;
  knownFacts: AtomicFact[];
  onExtractBaseline: () => void;
  isExtracting: boolean;
  onFileUpload: (file: File) => void;
  onSelectFact: (fact: AtomicFact) => void;
  onClearBaseline?: () => void;
}

export const BaselineCard: React.FC<BaselineCardProps> = ({
  theme,
  baselineText,
  onChangeBaselineText,
  knownFacts,
  onExtractBaseline,
  isExtracting,
  onFileUpload,
  onSelectFact,
  onClearBaseline,
}) => {
  const [activeTab, setActiveTab] = useState<'doc' | 'facts'>('doc');
  const [searchFilter, setSearchFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDark = theme === 'dark';

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
      className={`rounded-2xl border transition-all flex flex-col justify-between ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}
    >
      {/* Header bar */}
      <div
        className={`p-6 border-b flex flex-col gap-4 ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/70 border-slate-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Database className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h3 className={`font-serif text-lg font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Base de Conhecimento
              </h3>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                Corpus histórico canônico para comparação de novidade
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {baselineText.length > 0 && onClearBaseline && (
              <button
                type="button"
                onClick={onClearBaseline}
                title="Limpar texto base e fatos conhecidos"
                className="px-2.5 py-1 text-[11px] font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Limpar Base</span>
              </button>
            )}

            <span
              className={`font-mono text-[11px] px-3 py-1 rounded-full border font-semibold ${
                isDark
                  ? 'text-slate-300 bg-slate-800 border-slate-700'
                  : 'text-slate-700 bg-white border-slate-200 shadow-2xs'
              }`}
            >
              Ontologia #01
            </span>
          </div>
        </div>

        {/* Tab switchers */}
        <div
          className={`flex items-center p-1 rounded-full text-xs font-medium border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-200/70 border-slate-300/60'
          }`}
        >
          <button
            type="button"
            id="tab-btn-doc-base"
            onClick={() => setActiveTab('doc')}
            className={`flex-1 py-2 px-4 rounded-full transition-all font-semibold ${
              activeTab === 'doc'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-950 shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inserir documento base
          </button>

          <button
            type="button"
            id="tab-btn-facts-base"
            onClick={() => setActiveTab('facts')}
            className={`flex-1 py-2 px-4 rounded-full transition-all flex items-center justify-center gap-2 font-semibold ${
              activeTab === 'facts'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-950 shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Fatos indexados</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isDark
                  ? 'bg-amber-950 text-amber-300'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {knownFacts.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Inserir documento base */}
      {activeTab === 'doc' && (
        <div className="p-6 sm:p-7 flex flex-col gap-4" id="content-baseline-doc">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Texto Canônico de Referência
              </span>
            </span>
            <span id="baseline-counter">
              {baselineText.length.toLocaleString('pt-BR')} caracteres
            </span>
          </div>

          <textarea
            id="input-baseline-doc"
            value={baselineText}
            onChange={(e) => onChangeBaselineText(e.target.value)}
            placeholder="Insira o texto base ou corpus histórico para alimentar a ontologia e estabelecer a baseline..."
            className={`w-full font-mono text-xs rounded-xl p-4 min-h-[170px] focus:ring-2 focus:ring-amber-400 focus:outline-none leading-relaxed transition-all resize-y custom-scroll border ${
              isDark
                ? 'text-slate-200 bg-slate-950/80 border-slate-800 placeholder-slate-600'
                : 'text-slate-800 bg-slate-50/70 border-slate-200/90 placeholder-slate-400'
            }`}
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
              className={`text-xs font-medium rounded-full px-4 py-2.5 border flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'text-slate-300 hover:text-white border-slate-800 bg-slate-900 hover:bg-slate-800'
                  : 'text-slate-700 hover:text-slate-900 border-slate-300 bg-white hover:bg-slate-50 shadow-xs'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 text-amber-500" />
              <span>Importar .txt / .md</span>
            </button>

            <button
              type="button"
              id="btn-extract-baseline"
              onClick={onExtractBaseline}
              disabled={isExtracting || !baselineText.trim()}
              className="text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-5 py-2.5 shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              {isExtracting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
              ) : (
                <GitBranch className="w-3.5 h-3.5 text-slate-950" />
              )}
              <span>{isExtracting ? 'Extraindo tripletos S-P-O...' : 'Extrair fatos para a base'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Fatos já extraídos */}
      {activeTab === 'facts' && (
        <div className="p-6 sm:p-7 flex flex-col gap-4" id="content-baseline-facts">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={`uppercase tracking-wider font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Tripletos Canônicos Indexados
            </span>
            <span
              className={`border px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                isDark
                  ? 'text-amber-300 bg-amber-950/60 border-amber-500/40'
                  : 'text-amber-800 bg-amber-50 border-amber-300'
              }`}
            >
              {knownFacts.length} Fatos
            </span>
          </div>

          {/* Search bar inside facts */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por sujeito, predicado ou objeto..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className={`w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-600'
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          <div
            id="known-facts-list"
            className={`max-h-64 overflow-y-auto divide-y text-xs p-3 rounded-xl border space-y-2 custom-scroll ${
              isDark
                ? 'divide-slate-800 bg-slate-950/60 border-slate-800 text-slate-300'
                : 'divide-slate-100 bg-slate-50/50 border-slate-200 text-slate-700'
            }`}
          >
            {filteredFacts.map((fact) => (
              <div
                key={fact.id}
                onClick={() => onSelectFact(fact)}
                className={`py-2 px-2 flex flex-col gap-1 rounded-lg cursor-pointer transition-all ${
                  isDark ? 'hover:bg-slate-900' : 'hover:bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-400 font-bold">{fact.id}</span>
                  <span className="text-emerald-500 font-mono text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Confiança {fact.confianca ? `${(fact.confianca * 100).toFixed(1)}%` : '99.0%'}
                  </span>
                </div>
                <div className="font-mono text-[11px] leading-tight">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    [{fact.sujeito}]
                  </span>{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-medium">→ {fact.predicado} →</span>{' '}
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    [{fact.objeto}]
                  </span>
                </div>
              </div>
            ))}
            {filteredFacts.length === 0 && (
              <p className="text-xs text-slate-400 py-6 text-center">Nenhum fato encontrado com este filtro.</p>
            )}
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Exibindo {filteredFacts.length} de {knownFacts.length} fatos atômicos validados na ontologia.
          </p>
        </div>
      )}
    </div>
  );
};

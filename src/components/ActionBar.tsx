import React from 'react';
import { ThemeMode } from '../types';
import { CheckCheck, FileText, Code2, PlusCircle, Database } from 'lucide-react';

interface ActionBarProps {
  theme: ThemeMode;
  newFactsCount: number;
  totalConsolidatedCount: number;
  hasCommitted: boolean;
  onCommitFacts: () => void;
  onExportMarkdown: () => void;
  onExportJson: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  theme,
  newFactsCount,
  totalConsolidatedCount,
  hasCommitted,
  onCommitFacts,
  onExportMarkdown,
  onExportJson,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      id="action-bar-container"
      className={`rounded-2xl border p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4 transition-all ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          id="btn-commit-facts"
          onClick={onCommitFacts}
          disabled={hasCommitted || newFactsCount === 0}
          className={`inline-flex items-center gap-2.5 px-6 py-3 font-bold text-xs rounded-full shadow-md transition-all active:scale-[0.98] cursor-pointer ${
            hasCommitted
              ? isDark
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200'
              : isDark
              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20'
              : 'bg-slate-950 hover:bg-slate-800 text-white'
          }`}
        >
          {hasCommitted ? (
            <>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
              <span>Fatos integrados com sucesso na ontologia</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 text-amber-400 dark:text-slate-950" />
              <span>Adicionar {newFactsCount} fatos novos à base conhecida</span>
            </>
          )}
        </button>

        <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
          <Database className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {hasCommitted
              ? `Base de conhecimento consolidada em ${totalConsolidatedCount} fatos.`
              : `Eleva a base para ${totalConsolidatedCount} fatos após inclusão.`}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          id="btn-export-markdown"
          onClick={onExportMarkdown}
          className={`px-4 py-2.5 border text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer ${
            isDark
              ? 'border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white'
              : 'border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-950 shadow-2xs'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>Exportar Markdown</span>
        </button>

        <button
          type="button"
          id="btn-export-json"
          onClick={onExportJson}
          className={`px-4 py-2.5 border text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer ${
            isDark
              ? 'border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white'
              : 'border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-950 shadow-2xs'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Exportar JSON</span>
        </button>
      </div>
    </div>
  );
};

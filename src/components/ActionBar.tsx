import React from 'react';
import { CheckCheck, FileText, Code2, PlusCircle, Database } from 'lucide-react';
import { SupportedLang } from '../types';
import { getTranslations } from '../lib/i18n';

interface ActionBarProps {
  newFactsCount: number;
  totalConsolidatedCount: number;
  hasCommitted: boolean;
  onCommitFacts: () => void;
  onExportMarkdown: () => void;
  onExportJson: () => void;
  uiLang?: SupportedLang;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  newFactsCount,
  totalConsolidatedCount,
  hasCommitted,
  onCommitFacts,
  onExportMarkdown,
  onExportJson,
  uiLang = 'pt',
}) => {
  const t = getTranslations(uiLang);
  return (
    <div
      id="action-bar-container"
      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4 transition-all"
    >
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          id="btn-commit-facts"
          onClick={onCommitFacts}
          disabled={hasCommitted || newFactsCount === 0}
          className={`inline-flex items-center gap-2.5 px-6 py-3 min-h-[44px] font-bold text-xs rounded-full shadow-md transition-all active:scale-[0.98] cursor-pointer ${
            hasCommitted
              ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200'
              : 'bg-slate-950 hover:bg-slate-800 text-white'
          }`}
        >
          {hasCommitted ? (
            <>
              <CheckCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>{t.actionBar.btnCommitted}</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>{t.actionBar.btnCommit.replace('{count}', String(newFactsCount))}</span>
            </>
          )}
        </button>

        <span className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <Database className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span>
            {hasCommitted
              ? t.actionBar.statusCommitted.replace('{count}', String(totalConsolidatedCount))
              : t.actionBar.statusElevates.replace('{count}', String(totalConsolidatedCount))}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          id="btn-export-markdown"
          onClick={onExportMarkdown}
          className="min-h-[44px] px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-950 shadow-2xs text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span>{t.actionBar.exportMarkdown}</span>
        </button>

        <button
          type="button"
          id="btn-export-json"
          onClick={onExportJson}
          className="min-h-[44px] px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-950 shadow-2xs text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span>{t.actionBar.exportJson}</span>
        </button>
      </div>
    </div>
  );
};

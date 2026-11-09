import React, { useState } from 'react';
import { ThemeMode, AtomicFact } from '../types';
import { Compass, X, Search, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface ReferenceTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onBaselineGenerated: (termo: string, fatos: AtomicFact[], resumo: string) => void;
}

export const ReferenceTermsModal: React.FC<ReferenceTermsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onBaselineGenerated,
}) => {
  const [termo, setTermo] = useState('');
  const [concorrentesTexto, setConcorrentesTexto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const handleGenerate = async () => {
    if (!termo.trim() && !concorrentesTexto.trim()) {
      setError('Por favor, informe o termo principal ou cole o texto dos concorrentes.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/writer/benchmark-terms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          termo: termo.trim(),
          textosConcorrentes: concorrentesTexto.trim(),
        }),
      });

      const data = await res.json();
      if (data.fatos && Array.isArray(data.fatos)) {
        onBaselineGenerated(
          data.termo || termo || 'Termo Canônico',
          data.fatos,
          data.resumo_consenso || 'Base canônica consolidada com sucesso.'
        );
        onClose();
      } else {
        throw new Error(data.error || 'Falha ao gerar baseline canônica.');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao comunicar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Construtor de Base por Termo
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400">
                  Consenso da Web
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gere automaticamente a "régua canônica" de fatos conhecidos para qualquer termo ou texto concorrente.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 text-xs rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-700 dark:text-slate-300">
              Termo Alvo de Pesquisa
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Ex: grafos de conhecimento na web semântica, arquitetura rbac firebase..."
                className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border transition ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700 text-slate-100 focus:border-purple-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
                } focus:outline-none focus:ring-1 focus:ring-purple-500`}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              O motor simulará os fatos de consenso que os 10 primeiros resultados do Google já abordam sobre este termo.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-700 dark:text-slate-300">
              (Opcional) Texto Extraído dos Concorrentes
            </label>
            <textarea
              rows={5}
              value={concorrentesTexto}
              onChange={(e) => setConcorrentesTexto(e.target.value)}
              placeholder="Cole aqui trechos dos artigos concorrentes que você deseja usar como base comparativa..."
              className={`w-full p-3 text-xs rounded-xl border transition resize-none ${
                isDark
                  ? 'bg-slate-800/60 border-slate-700 text-slate-100 focus:border-purple-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
              } focus:outline-none focus:ring-1 focus:ring-purple-500`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium transition flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Extraindo Fatos Canônicos...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Construir Base Canônica
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { EditorialReportData } from '../types';
import { Award, X, ShieldCheck, Copy, CheckCircle } from 'lucide-react';

interface EditorialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: EditorialReportData;
}

export const EditorialReportModal: React.FC<EditorialReportModalProps> = ({
  isOpen,
  onClose,
  reportData,
}) => {
  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const md = `# 🏆 Certificado de Ganho de Informação & Ineditismo Editorial
**Documento Auditado:** ${reportData.titulo_documento}
**Termo Principal:** ${reportData.termo_principal}
**Data da Auditoria:** ${new Date(reportData.data_auditoria).toLocaleDateString('pt-BR')}
**Auditor Responsável:** ${reportData.auditor_nome}

---

## 📊 Indicadores Consolidados
- **Score Geral de Information Gain:** ${reportData.score_geral.toFixed(2)} / 1.00 (${reportData.classificacao_geral})
- **Taxa de Conteúdo Exclusivo / Inédito:** ${reportData.taxa_conteudo_exclusivo}%
- **Taxa de Consenso / Base Conhecida:** ${reportData.taxa_consenso_mercado}%
- **Total de Proposições Atômicas (S-P-O) Auditadas:** ${reportData.total_proposicoes_auditadas}

---

## 💎 Proposições de Alto Valor Agregado Identificadas:
${reportData.fatos_novos.map((f, i) => `${i + 1}. **[${f.sujeito}]** ${f.predicado} *${f.objeto}* (Score Marginal: ${f.score_marginal})`).join('\n')}

> *Certificação gerada nos moldes metodológicos da patente Google US 11,354,342 B2 pelo ecossistema Semântico.*
`;

    navigator.clipboard.writeText(md);
    alert('Relatório copiado em formato Markdown para a sua área de transferência!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl flex items-center gap-2">
                Certificado Editorial de Information Gain
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </h3>
              <p className="text-xs text-slate-500">
                Auditoria formal comprovando ineditismo sobre o consenso da web (Patente US 11,354,342 B2).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card Content */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1">
          {/* Badge Visual */}
          <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center space-y-3 relative overflow-hidden">
            <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-600">
              Selo Oficial de Ineditismo de Conteúdo
            </span>
            <div className="text-4xl font-black text-slate-900">
              {reportData.score_geral >= 0.7 ? 'ALTO GANHO EDITORIAL' : 'GANHO INCREMENTAL APROVADO'}
            </div>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              Este conteúdo foi auditado contra o índice ontológico de consenso da web para o termo{' '}
              <strong>"{reportData.termo_principal}"</strong> e comprovadamente introduz novas proposições factuais.
            </p>

            {/* Metrics Trio */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-500/20 max-w-md mx-auto">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  {reportData.taxa_conteudo_exclusivo}%
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-medium">Ineditismo Líquido</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {reportData.total_proposicoes_auditadas}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-medium">Fatos Auditados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {reportData.score_geral.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-medium">Score / 1.00</div>
              </div>
            </div>
          </div>

          {/* Destaques de Fatos Inéditos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Proposições Inéditas Auditadas que Agregam Valor ao Leitor:
            </h4>
            <div className="space-y-2">
              {reportData.fatos_novos.slice(0, 5).map((f, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs flex items-start gap-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">
                      [{f.sujeito}] {f.predicado} {f.objeto}
                    </div>
                    {f.trecho_origem && (
                      <div className="text-[11px] text-slate-500 mt-1 italic font-serif">
                        "{f.trecho_origem}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200 transition cursor-pointer"
          >
            Fechar
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            Copiar Laudo em Markdown para o Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

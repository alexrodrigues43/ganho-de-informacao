import React from 'react';
import { ThemeMode } from '../types';
import { SemanticoIcon } from './SemanticoIcon';
import { 
  AlertTriangle, 
  Layers, 
  TrendingDown, 
  Sparkles, 
  Cpu, 
  Compass, 
  Database,
  ArrowRight,
  CheckCircle2,
  FileText,
  Network
} from 'lucide-react';

interface EditorialSectionsProps {
  theme: ThemeMode;
  onStartAudit: () => void;
}

export const EditorialSections: React.FC<EditorialSectionsProps> = ({
  theme,
  onStartAudit,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-24 py-12">
      {/* SECTION: O PROBLEMA */}
      <section id="o-problema" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-mono">
            O Diagnóstico de Mercado
          </span>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mt-2 mb-4 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            O mar de conteúdo genérico e o filtro de novidade dos buscadores.
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Mais de 80% dos artigos publicados online apenas parafraseiam fatos já conhecidos. Os
            algoritmos modernos penalizam redundâncias e priorizam o Ganho de Informação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className={`p-7 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-5">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className={`font-serif text-lg font-medium mb-2.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Redundância Invisível
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Sem uma auditoria factual, você publica artigos que repetem 90% do corpus já indexado,
              resultando em pontuações mínimas de novidade perante o Google.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className={`p-7 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className={`font-serif text-lg font-medium mb-2.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Falta de Estrutura Atômica
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Textos longos sem decomposição em tripletos [Sujeito-Predicado-Objeto] são difíceis de
              serem assimilados por Large Language Models e geradores de respostas diretas.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className={`p-7 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-5">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className={`font-serif text-lg font-medium mb-2.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Desconexão com a Ontologia
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              O conteúdo não se comunica com a base histórica do seu domínio, perdendo a oportunidade de
              expandir relacionamentos conceituais no grafo semântico.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: PRINCIPAIS BENEFÍCIOS (Matching reference image) */}
      <section id="beneficios" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">
            Vantagem Competitiva
          </span>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mt-2 mb-4 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            Principais Benefícios do Information Gain
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            O modelo matemático da patente US 11,354,342 B2 aplicado à criação e auditoria de conteúdo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div
            className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40'
                : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
              01 • Inovação Factual
            </span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Novidade Mensurável
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Identifique imediatamente a porcentagem exata de proposições que trazem informações
              realmente novas ao público.
            </p>
          </div>

          {/* Benefit 2 */}
          <div
            className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="w-1.5 h-6 bg-amber-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mb-1">
              02 • Algoritmos Modernos
            </span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Diferenciação nos LLMs
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Buscadores com IA priorizam páginas que agregam fatos atômicos que ainda não constam nos
              documentos consultados.
            </p>
          </div>

          {/* Benefit 3 */}
          <div
            className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/40'
                : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="w-1.5 h-6 bg-blue-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold block mb-1">
              03 • Concisão & Densidade
            </span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Corte de "Encheção"
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Isole trechos com pontuação 0.0 de ganho e substitua por expansões contextuais e dados
              técnicos aprofundados.
            </p>
          </div>

          {/* Benefit 4 */}
          <div
            className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40'
                : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="w-1.5 h-6 bg-purple-500 rounded-full mb-4" />
            <span className="font-mono text-[11px] text-purple-600 dark:text-purple-400 font-semibold block mb-1">
              04 • Ativo Permanente
            </span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Ontologia Acumulativa
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Com um clique, transfira os novos fatos aprovados para a sua base de conhecimento canônica,
              enriquecendo seu grafo.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: COMO FUNCIONA (4 Steps from the reference image) */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
            Pipeline Analítico
          </span>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mt-2 mb-4 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            Como Funciona em 4 Passos
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Da inserção do documento à extração do grafo e cálculo matemático de dissimilaridade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div
            className={`p-6 rounded-2xl border flex flex-col items-start relative ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-4 font-mono shadow-sm">
              1
            </div>
            <span className="text-xs font-bold uppercase text-slate-400 font-mono mb-1">Entrada</span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              1. Envie
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Cole seu texto no painel ou faça upload de arquivos (.txt, .md) diretamente na área de
              trabalho.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className={`p-6 rounded-2xl border flex flex-col items-start relative ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-4 font-mono shadow-sm">
              2
            </div>
            <span className="text-xs font-bold uppercase text-slate-400 font-mono mb-1">Processamento</span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              2. Analise
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              O motor decompõe em proposições atômicas [S-P-O] e calcula distância cosseno com os fatos
              da base canônica.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className={`p-6 rounded-2xl border flex flex-col items-start relative ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-4 font-mono shadow-sm">
              3
            </div>
            <span className="text-xs font-bold uppercase text-slate-400 font-mono mb-1">Inspeção</span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              3. Refine
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Inspecione o texto com mapa de calor semântico, métricas consolidadas e tabela detalhada de
              tripletos.
            </p>
          </div>

          {/* Step 4 */}
          <div
            className={`p-6 rounded-2xl border flex flex-col items-start relative ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-4 font-mono shadow-sm">
              4
            </div>
            <span className="text-xs font-bold uppercase text-slate-400 font-mono mb-1">Consolidação</span>
            <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              4. Integre
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Exporte os dados estruturados em Markdown/JSON ou consolide os fatos novos no seu grafo
              permanente.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: CTA BANNER (Matching reference image) */}
      <section id="cta-banner" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 md:p-16 text-center shadow-xl border border-slate-800">
          {/* Faint Graph Grid in background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Eleve a autoridade factual do seu domínio</span>
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
              Pronto para elevar o nível do seu conteúdo?
            </h3>

            <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Pare de apenas escrever e comece a construir autoridade semântica sólida, garantindo
              relevância matemática nos algoritmos de busca e LLMs.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onStartAudit}
                className="px-8 py-3.5 rounded-full text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Auditar documento com IA agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FOOTER (Matching reference image) */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 pt-12 pb-16 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-4">
            <a
              href="https://semantico.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg p-1 transition-all ${isDark ? 'bg-white/95 shadow-xs' : ''}`}
            >
              <img
                src="/logo-semantico-horizontal.png"
                alt="Logo Semântico SEO"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block font-headline">
                Semântico — Significado e Sentido
              </span>
              <span>© 2026 Semântico SEO. Todos os direitos reservados.</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://semantico.com.br/servicos.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Serviços
            </a>
            <a
              href="https://semantico.com.br/especiais.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Ferramentas
            </a>
            <a
              href="https://semantico.com.br/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Blog
            </a>
            <a
              href="https://semantico.com.br/podcast-semantico.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Podcasts
            </a>
            <a
              href="https://semantico.com.br/contato.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Contato
            </a>
            <a
              href="https://www.linkedin.com/in/alexandre-rodrigues-seo/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300"
            >
              <span>Alexandre Rodrigues</span>
            </a>
            <a
              href="https://patents.google.com/patent/US11354342B2/en"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Patente US 11,354,342 B2
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

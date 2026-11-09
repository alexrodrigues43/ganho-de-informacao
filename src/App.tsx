import React, { useState, useEffect, useCallback } from 'react';
import {
  AtomicFact,
  GainAnalysisResponse,
  UserProfile,
  FluffItem,
  InformationGap,
  EditorialReportData,
  SupportedLang,
} from './types';
import {
  DEFAULT_BASELINE_DOC,
  DEFAULT_KNOWN_FACTS,
  DEFAULT_CANDIDATE_DOC,
  DEFAULT_ANALYSIS_RESULT,
} from './data/defaultBenchmark';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GraphCanvas } from './components/GraphCanvas';
import { BaselineCard } from './components/BaselineCard';
import { CandidateCard } from './components/CandidateCard';
import { MetricsCards } from './components/MetricsCards';
import { SynthesisCard } from './components/SynthesisCard';
import { ComparisonBalance } from './components/ComparisonBalance';
import { ResultsViewer } from './components/ResultsViewer';
import { ActionBar } from './components/ActionBar';
import { EditorialSections } from './components/EditorialSections';
import { FactDetailModal } from './components/FactDetailModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AccessRestrictedModal } from './components/AccessRestrictedModal';
import { WriterStudio } from './components/WriterStudio';
import { FluffCutterModal } from './components/FluffCutterModal';
import { ReferenceTermsModal } from './components/ReferenceTermsModal';
import { EditorialReportModal } from './components/EditorialReportModal';
import { getInitialUiLang, saveStoredUiLang, getTranslations } from './lib/i18n';
import {
  analyzeDocumentGainLocally,
  extractBaselineLocally,
  findInformationGapsLocally,
  detectFluffSegmentsLocally,
} from './lib/localAnalysis';
import {
  auth,
  syncUserProfile,
  subscribeUserProfile,
  logoutUser,
  testFirestoreConnection,
  recordUserAudit,
  deductCredits,
  updateUserUiLang,
} from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CheckCircle2, Sparkles, Layers, Lock, ArrowRight, PenTool, Globe } from 'lucide-react';

export default function App() {
  // Dual-control i18n
  const [uiLang, setUiLang] = useState<SupportedLang>(() => getInitialUiLang());
  const [contentLang, setContentLang] = useState<SupportedLang>(() => getInitialUiLang());
  const t = getTranslations(uiLang);

  const [baselineText, setBaselineText] = useState(DEFAULT_BASELINE_DOC);
  const [knownFacts, setKnownFacts] = useState<AtomicFact[]>(DEFAULT_KNOWN_FACTS);
  const [candidateText, setCandidateText] = useState(DEFAULT_CANDIDATE_DOC);
  const [analysisResult, setAnalysisResult] = useState<GainAnalysisResponse>(DEFAULT_ANALYSIS_RESULT);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasCommitted, setHasCommitted] = useState(false);
  const [selectedFact, setSelectedFact] = useState<AtomicFact | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Authentication & Access Control State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Sincronização de uiLang com perfil centralizado
  useEffect(() => {
    if (currentUser?.uiLang && ['pt', 'en', 'es'].includes(currentUser.uiLang)) {
      setUiLang(currentUser.uiLang);
      saveStoredUiLang(currentUser.uiLang);
    }
  }, [currentUser?.uiLang]);

  const handleLanguageChange = useCallback((newLang: SupportedLang) => {
    setUiLang(newLang);
    saveStoredUiLang(newLang);
    if (currentUser?.uid) {
      updateUserUiLang(currentUser.uid, newLang);
    }
  }, [currentUser?.uid]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authReason, setAuthReason] = useState<string | undefined>(undefined);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isRestrictedModalOpen, setIsRestrictedModalOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Writer Studio & Specialized Tools State
  // ---------------------------------------------------------------------------
  const [activeViewMode, setActiveViewMode] = useState<'analyzer' | 'writer'>('analyzer');
  const [currentTermo, setCurrentTermo] = useState<string>('Grafos de Conhecimento e SEO');
  const [fluffItems, setFluffItems] = useState<FluffItem[]>(() =>
    detectFluffSegmentsLocally(DEFAULT_ANALYSIS_RESULT.fatos_analisados)
  );
  const [informationGaps, setInformationGaps] = useState<InformationGap[]>(() =>
    findInformationGapsLocally(DEFAULT_CANDIDATE_DOC, DEFAULT_KNOWN_FACTS)
  );
  const [isLoadingGaps, setIsLoadingGaps] = useState(false);
  const [isFluffCutterOpen, setIsFluffCutterOpen] = useState(false);
  const [isTermsBuilderOpen, setIsTermsBuilderOpen] = useState(false);
  const [isEditorialReportOpen, setIsEditorialReportOpen] = useState(false);

  // Monitor Auth State and User Profile
  useEffect(() => {
    testFirestoreConnection();

    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await syncUserProfile(firebaseUser);
          setCurrentUser(profile);

          // Real-time listener for status changes (e.g. admin unlocks user in real-time)
          unsubscribeProfile = subscribeUserProfile(firebaseUser.uid, (updated) => {
            if (updated) {
              setCurrentUser(updated);
            }
          });
        } catch (err) {
          console.error('Error syncing user profile:', err);
        }
      } else {
        setCurrentUser(null);
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  // Garante interface sempre em modo claro sem classe dark residual
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const hasActiveAccess = currentUser?.status === 'active' || currentUser?.role === 'admin';

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register', reason?: string) => {
    setAuthModalMode(mode);
    setAuthReason(reason);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      showToast('Você saiu da sua conta.');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleExtractBaseline = async () => {
    if (!baselineText.trim()) {
      showToast('Insira um documento base antes de extrair.');
      return;
    }

    // Access & Credits check
    if (!currentUser) {
      setAuthReason('Para extrair proposições atômicas, faça login ou cadastre-se para receber 10 créditos de cortesia.');
      setIsRestrictedModalOpen(true);
      return;
    }

    if (currentUser.role !== 'admin') {
      if (currentUser.status !== 'active') {
        setAuthReason('Sua conta está aguardando liberação ou está pausada.');
        setIsRestrictedModalOpen(true);
        return;
      }
      if ((currentUser.creditsBalance ?? 0) < 1) {
        setAuthReason('A extração de fatos requer 1 crédito, mas o saldo da sua carteira é de 0 créditos.');
        setIsRestrictedModalOpen(true);
        return;
      }
    }

    setIsExtracting(true);
    showToast('Extraindo proposições atômicas no formato S-P-O...');

    try {
      const res = await fetch('/api/engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acao: 'extrair_baseline',
          documento: baselineText,
          language: contentLang,
        }),
      });

      const data = await res.json();
      if (data.fatos && Array.isArray(data.fatos)) {
        setKnownFacts(data.fatos);
        setHasCommitted(false);
        showToast(`${data.fatos.length} fatos atômicos validados e extraídos para o baseline.`);
        if (currentUser?.uid) {
          recordUserAudit(currentUser.uid);
          deductCredits(currentUser.uid, 1, 'Extração de Baseline (Fatos Atômicos)', currentUser.email);
        }
      } else {
        throw new Error(data.error || 'Falha na extração dos fatos');
      }
    } catch (err: any) {
      console.warn('Usando extração local de fallback:', err);
      const generatedFacts = extractBaselineLocally(baselineText);
      setKnownFacts(generatedFacts);
      showToast(`${generatedFacts.length} fatos atômicos extraídos para o baseline.`);
      if (currentUser?.uid) {
        recordUserAudit(currentUser.uid);
        deductCredits(currentUser.uid, 1, 'Extração de Baseline (Fatos Atômicos)', currentUser.email);
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAnalyzeGain = async () => {
    if (!candidateText.trim()) {
      showToast('Insira o documento para análise de ganho.');
      return;
    }

    // Access & Credits check
    if (!currentUser) {
      setAuthReason('Para calcular o Ganho de Informação, faça login ou cadastre-se para receber 10 créditos de cortesia.');
      setIsRestrictedModalOpen(true);
      return;
    }

    if (currentUser.role !== 'admin') {
      if (currentUser.status !== 'active') {
        setAuthReason('Sua conta está aguardando liberação ou está pausada.');
        setIsRestrictedModalOpen(true);
        return;
      }
      if ((currentUser.creditsBalance ?? 0) < 1) {
        setAuthReason('A análise de ganho requer 1 crédito, mas o saldo da sua carteira é de 0 créditos.');
        setIsRestrictedModalOpen(true);
        return;
      }
    }

    setIsAnalyzing(true);
    showToast('Calculando dissimilaridade semântica e ganho informacional...');

    try {
      const res = await fetch('/api/engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acao: 'analisar_ganho',
          fatos_conhecidos: knownFacts,
          novo_documento: candidateText,
          language: contentLang,
        }),
      });

      const data = await res.json();
      if (data.score_geral !== undefined && data.fatos_analisados) {
        if (currentUser?.uid) {
          deductCredits(currentUser.uid, 1, 'Cálculo de Ganho Marginal de Informação', currentUser.email);
        }
        const newResult: GainAnalysisResponse = {
          acao: 'analisar_ganho',
          score_geral: data.score_geral,
          classificacao_geral: data.classificacao_geral || 'ALTO GANHO',
          fatos_novos_count: data.fatos_novos_count || 0,
          fatos_novos_pct: data.fatos_novos_pct || 0,
          fatos_incrementais_count: data.fatos_incrementais_count || 0,
          fatos_incrementais_pct: data.fatos_incrementais_pct || 0,
          fatos_redundantes_count: data.fatos_redundantes_count || 0,
          fatos_redundantes_pct: data.fatos_redundantes_pct || 0,
          sintese_analitica: data.sintese_analitica || '',
          html_anotado: data.html_anotado || candidateText,
          fatos_analisados: data.fatos_analisados || [],
        };
        setAnalysisResult(newResult);
        setHasCommitted(false);

        // Atualizar ferramentas do redator
        setFluffItems(detectFluffSegmentsLocally(data.fatos_analisados));
        setInformationGaps(findInformationGapsLocally(candidateText, knownFacts));

        showToast(`Auditoria finalizada! Score calculado: ${data.score_geral} / 1.0 (${data.classificacao_geral})`);
        if (currentUser?.uid) recordUserAudit(currentUser.uid);

        if (activeViewMode === 'analyzer') {
          setTimeout(() => {
            document.getElementById('diagnostico-metricas')?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      } else {
        throw new Error(data.error || 'Falha na análise');
      }
    } catch (err: any) {
      console.warn('Usando motor analítico local de fallback para auditoria do texto do usuário:', err);
      const localResult = analyzeDocumentGainLocally(candidateText, knownFacts);
      setAnalysisResult(localResult);
      setHasCommitted(false);

      // Atualizar ferramentas do redator
      setFluffItems(detectFluffSegmentsLocally(localResult.fatos_analisados));
      setInformationGaps(findInformationGapsLocally(candidateText, knownFacts));

      showToast(`Auditoria finalizada! Score calculado: ${localResult.score_geral} / 1.0 (${localResult.classificacao_geral})`);
      if (currentUser?.uid) recordUserAudit(currentUser.uid);

      if (activeViewMode === 'analyzer') {
        setTimeout(() => {
          document.getElementById('diagnostico-metricas')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRefreshGaps = async () => {
    setIsLoadingGaps(true);
    try {
      const res = await fetch('/api/writer/gaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateDoc: candidateText,
          baselineFacts: knownFacts,
          termo: currentTermo,
        }),
      });

      const data = await res.json();
      if (data.gaps && Array.isArray(data.gaps)) {
        setInformationGaps(data.gaps);
        showToast(`${data.gaps.length} lacunas de informação mapeadas para o termo.`);
      } else {
        throw new Error(data.error || 'Falha ao buscar lacunas');
      }
    } catch (err) {
      const localGaps = findInformationGapsLocally(candidateText, knownFacts);
      setInformationGaps(localGaps);
      showToast(`${localGaps.length} lacunas de informação mapeadas.`);
    } finally {
      setIsLoadingGaps(false);
    }
  };

  const handleApplySynthesis = (original: string, synthesized: string) => {
    if (candidateText.includes(original)) {
      setCandidateText(candidateText.replace(original, synthesized));
      showToast('Trecho substituído com sucesso pela versão sintetizada!');
    } else {
      showToast('Trecho original não localizado com precisão no texto.');
    }
    // Remove o item da lista de fluff
    setFluffItems((prev) => prev.filter((i) => i.trecho_original !== original));
  };

  const handleBaselineGeneratedFromTerms = (termo: string, fatos: AtomicFact[], resumo: string) => {
    setCurrentTermo(termo);
    setKnownFacts(fatos);
    setBaselineText(resumo);
    setHasCommitted(false);
    showToast(`Base canônica atualizada para o termo "${termo}" com ${fatos.length} proposições!`);
    // Recalcular lacunas
    setInformationGaps(findInformationGapsLocally(candidateText, fatos));
  };

  const handleCommitNewFacts = () => {
    const newFacts = analysisResult.fatos_analisados.filter(
      (f) => f.classificacao === 'NOVO'
    );
    if (newFacts.length === 0) return;

    // Merge new facts into known facts, avoiding duplicate IDs
    const currentIds = new Set(knownFacts.map((f) => f.id));
    const toAdd: AtomicFact[] = [];

    newFacts.forEach((f, idx) => {
      const newId = `FACT-${String(knownFacts.length + idx + 1).padStart(3, '0')}`;
      if (!currentIds.has(f.id)) {
        toAdd.push({
          id: newId,
          sujeito: f.sujeito,
          predicado: f.predicado,
          objeto: f.objeto,
          confianca: 0.98,
          trecho_origem: f.trecho_origem,
        });
      }
    });

    setKnownFacts([...knownFacts, ...toAdd]);
    setHasCommitted(true);
    showToast(t.toasts.factsCommitted);
  };

  const handleExportMarkdown = () => {
    const md = `# Relatório de Auditoria de Information Gain
**Data:** ${new Date().toLocaleDateString(uiLang === 'en' ? 'en-US' : uiLang === 'es' ? 'es-ES' : 'pt-BR')}  
**Termo Principal:** ${currentTermo}  
**Patente de Referência:** US 11,354,342 B2 (Contextual Information Gain Estimation)  
**Status do Sistema:** Calibrado | Espaço Vetorial FTS-v4  

---

## 1. Métricas Consolidadas
- **Score Geral de Ganho:** ${analysisResult.score_geral.toFixed(2)} / 1.0 (${analysisResult.classificacao_geral})
- **Fatos Novos:** ${analysisResult.fatos_novos_count} (+${analysisResult.fatos_novos_pct}%)
- **Fatos Incrementais:** ${analysisResult.fatos_incrementais_count} (+${analysisResult.fatos_incrementais_pct}%)
- **Fatos Redundantes:** ${analysisResult.fatos_redundantes_count} (${analysisResult.fatos_redundantes_pct}%)

---

## 2. Síntese Analítica
${analysisResult.sintese_analitica}

---

## 3. Tabela de Proposições Atômicas Decompostas (S-P-O)
| ID | Sujeito | Predicado | Objeto | Classificação | Similaridade | Score Marginal | Justificativa |
|---|---|---|---|---|---|---|---|
${analysisResult.fatos_analisados
  .map(
    (f) =>
      `| ${f.id} | ${f.sujeito} | ${f.predicado} | ${f.objeto} | ${f.classificacao} | ${f.similaridade_cosseno || 'N/A'} | ${f.score_marginal?.toFixed(2) || '0.00'} | ${f.justificativa?.replace(/\n/g, ' ') || ''} |`
  )
  .join('\n')}

---
*Gerado por Semântico FTS - Atomic Fact & Information Gain Analyzer*
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `information-gain-audit-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(t.toasts.exportMdSuccess);
  };

  const handleExportJson = () => {
    const payload = {
      patente: 'US 11,354,342 B2',
      framework: 'FTS (Fato Triplo Semântico) v2.4',
      termo: currentTermo,
      timestamp: new Date().toISOString(),
      metricas_consolidadas: {
        score_geral: analysisResult.score_geral,
        classificacao_geral: analysisResult.classificacao_geral,
        fatos_novos_count: analysisResult.fatos_novos_count,
        fatos_novos_pct: analysisResult.fatos_novos_pct,
        fatos_incrementais_count: analysisResult.fatos_incrementais_count,
        fatos_incrementais_pct: analysisResult.fatos_incrementais_pct,
        fatos_redundantes_count: analysisResult.fatos_redundantes_count,
        fatos_redundantes_pct: analysisResult.fatos_redundantes_pct,
      },
      sintese_analitica: analysisResult.sintese_analitica,
      fatos_analisados: analysisResult.fatos_analisados,
      base_fatos_conhecidos: knownFacts,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `atomic-facts-gain-analysis-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(t.toasts.exportJsonSuccess);
  };

  const handleResetSession = () => {
    setBaselineText(DEFAULT_BASELINE_DOC);
    setKnownFacts(DEFAULT_KNOWN_FACTS);
    setCandidateText(DEFAULT_CANDIDATE_DOC);
    setAnalysisResult(DEFAULT_ANALYSIS_RESULT);
    setHasCommitted(false);
    setCurrentTermo('Grafos de Conhecimento e SEO');
    setFluffItems(detectFluffSegmentsLocally(DEFAULT_ANALYSIS_RESULT.fatos_analisados));
    setInformationGaps(findInformationGapsLocally(DEFAULT_CANDIDATE_DOC, DEFAULT_KNOWN_FACTS));
    showToast(t.toasts.sessionReset);
  };

  const handleResetAll = () => {
    setBaselineText('');
    setKnownFacts([]);
    setCandidateText('');
    setAnalysisResult({
      acao: 'analisar_ganho',
      score_geral: 0,
      classificacao_geral: 'BAIXO GANHO',
      fatos_novos_count: 0,
      fatos_novos_pct: 0,
      fatos_incrementais_count: 0,
      fatos_incrementais_pct: 0,
      fatos_redundantes_count: 0,
      fatos_redundantes_pct: 0,
      sintese_analitica: uiLang === 'en' ? 'No document audited yet. Insert a baseline corpus and candidate text to calculate gain.' : uiLang === 'es' ? 'Ningún documento auditado por ahora. Inserte un texto base y un nuevo documento para calcular ganancia.' : 'Nenhum documento auditado no momento. Insira um texto base e um novo documento para calcular o ganho.',
      html_anotado: '',
      fatos_analisados: [],
    });
    setHasCommitted(false);
    setSelectedFact(null);
    setFluffItems([]);
    setInformationGaps([]);
    showToast(t.toasts.allReset);
  };

  const handleClearBaseline = () => {
    setBaselineText('');
    setKnownFacts([]);
    showToast(uiLang === 'en' ? 'Knowledge baseline cleared.' : uiLang === 'es' ? 'Línea base de conocimiento limpiada.' : 'Base de conhecimento limpa.');
  };

  const handleClearCandidate = () => {
    setCandidateText('');
    showToast(uiLang === 'en' ? 'Candidate document text cleared.' : uiLang === 'es' ? 'Texto del documento candidato limpiado.' : 'Texto do novo documento limpo.');
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        setBaselineText(text);
        showToast(`Documento "${file.name}" carregado para o corpus de referência.`);
      }
    };
    reader.readAsText(file);
  };

  const newFactsCount = analysisResult.fatos_analisados.filter(
    (f) => f.classificacao === 'NOVO'
  ).length;
  const totalConsolidatedCount = knownFacts.length + (hasCommitted ? 0 : newFactsCount);

  // Relatório Editorial Montado para o Certificado
  const editorialReportData: EditorialReportData = {
    titulo_documento: 'Artigo Editorial em Criação',
    termo_principal: currentTermo || 'Termo em Avaliação',
    data_auditoria: new Date().toISOString(),
    auditor_nome: currentUser?.displayName || currentUser?.email || 'Redator Semântico',
    score_geral: analysisResult.score_geral,
    classificacao_geral: analysisResult.classificacao_geral,
    taxa_conteudo_exclusivo: analysisResult.fatos_novos_pct,
    taxa_consenso_mercado: analysisResult.fatos_redundantes_pct,
    total_proposicoes_auditadas: analysisResult.fatos_analisados.length,
    fatos_novos: analysisResult.fatos_analisados.filter((f) => f.classificacao === 'NOVO'),
    fatos_incrementais: analysisResult.fatos_analisados.filter((f) => f.classificacao === 'INCREMENTAL'),
    lacunas_atendidas: informationGaps.map((g) => g.termo_relacionado),
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-graph-grid-light text-slate-900">
      {/* Skip link for keyboard accessibility (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-950 focus:text-white focus:rounded-lg focus:shadow-xl focus:font-bold"
      >
        {uiLang === 'en' ? 'Skip to main content' : uiLang === 'es' ? 'Saltar al contenido principal' : 'Pular para o conteúdo principal'}
      </a>

      {/* 1. Header Navigation matching Graph Studio */}
      <Header
        knownFactsCount={knownFacts.length}
        onResetSession={handleResetSession}
        onResetAll={handleResetAll}
        currentUser={currentUser}
        onOpenAuth={(mode) => handleOpenAuth(mode)}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
        onOpenPaywall={() => {
          setAuthReason(undefined);
          setIsRestrictedModalOpen(true);
        }}
        onLogout={handleLogout}
        uiLang={uiLang}
        onLanguageChange={handleLanguageChange}
      />

      <main id="main-content" role="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* 2. Hero Section */}
        <HeroSection
          onAuditClick={() => scrollToSection('workspace')}
          onExploreKnowledgeBase={() => scrollToSection('card-baseline-knowledge')}
          uiLang={uiLang}
        />

        {/* Project Content Language Selector */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <div>
                <span className="text-xs font-bold text-slate-900">{t.projectLanguage.label}</span>
                <p className="text-[11px] text-slate-500">{t.projectLanguage.hint}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5" role="group" aria-label={t.projectLanguage.label}>
              {[
                { id: 'pt' as const, label: t.projectLanguage.pt, flag: '🇧🇷' },
                { id: 'en' as const, label: t.projectLanguage.en, flag: '🇺🇸' },
                { id: 'es' as const, label: t.projectLanguage.es, flag: '🇪🇸' },
              ].map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setContentLang(l.id)}
                  aria-pressed={contentLang === l.id}
                  className={`min-h-[44px] min-w-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    contentLang === l.id
                      ? 'bg-slate-950 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span aria-hidden="true">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Central Visual Graph Canvas */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 mb-12">
        <GraphCanvas
          facts={analysisResult.fatos_analisados}
          newFactsCount={analysisResult.fatos_novos_count}
          incrementalFactsCount={analysisResult.fatos_incrementais_count}
          redundantFactsCount={analysisResult.fatos_redundantes_count}
          onSelectFact={(f) => setSelectedFact(f)}
          uiLang={uiLang}
        />
      </div>

      {/* 4. Main Functional Workspace */}
      <section id="workspace" className="max-w-6xl mx-auto w-full px-4 sm:px-6 mb-20">
        {/* Seletor de Modo Principal (Destaque Visual Premium) */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-mono">
              {uiLang === 'en' ? 'Operating Environment' : uiLang === 'es' ? 'Ambiente Operativo' : 'Ambiente Operacional'}
            </span>
            <h3 className="text-base font-semibold mt-0.5 text-slate-800">
              {uiLang === 'en' ? 'Select Your Workspace Mode' : uiLang === 'es' ? 'Seleccione su Modo de Trabajo' : 'Selecione o seu Modo de Trabalho'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Botão / Card 1: Analisador Ontológico */}
            <button
              type="button"
              onClick={() => setActiveViewMode('analyzer')}
              className={`min-h-[44px] p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden cursor-pointer group flex flex-col justify-between ${
                activeViewMode === 'analyzer'
                  ? 'bg-amber-50/80 border-amber-500 shadow-lg shadow-amber-500/15 ring-2 ring-amber-400/40'
                  : 'bg-white border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all shadow-md ${
                    activeViewMode === 'analyzer'
                      ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 scale-105'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Layers className="w-6 h-6" aria-hidden="true" />
                </div>

                {activeViewMode === 'analyzer' ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-mono shadow-xs">
                    {uiLang === 'en' ? '✓ Active Mode' : uiLang === 'es' ? '✓ Modo Activo' : '✓ Modo Ativo'}
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition">
                    {uiLang === 'en' ? 'Click to Activate' : uiLang === 'es' ? 'Clic para Activar' : 'Clique para Ativar'}
                  </span>
                )}
              </div>

              <div>
                <h4 className={`text-base font-bold flex items-center gap-2 ${
                  activeViewMode === 'analyzer' ? 'text-amber-950' : 'text-slate-900'
                }`}>
                  {t.workspace.modeClassic}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {uiLang === 'en'
                    ? 'Decomposition into S-P-O atomic facts, entity graphs, and patent US 11,354,342 B2 comparative matrix.'
                    : uiLang === 'es'
                    ? 'Descomposición en hechos atómicos S-P-O, grafos de entidades y matriz de patente US 11,354,342 B2.'
                    : 'Decomposição em fatos atômicos S-P-O, grafos de entidades e matriz comparativa da patente US 11,354,342 B2.'}
                </p>
              </div>
            </button>

            {/* Botão / Card 2: Estúdio do Redator */}
            <button
              type="button"
              onClick={() => setActiveViewMode('writer')}
              className={`min-h-[44px] p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden cursor-pointer group flex flex-col justify-between ${
                activeViewMode === 'writer'
                  ? 'bg-emerald-50/80 border-emerald-500 shadow-lg shadow-emerald-500/15 ring-2 ring-emerald-400/40'
                  : 'bg-white border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all shadow-md ${
                    activeViewMode === 'writer'
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-105'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <PenTool className="w-6 h-6" aria-hidden="true" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 font-mono">
                    {uiLang === 'en' ? 'NEW' : uiLang === 'es' ? 'NUEVO' : 'NOVO'}
                  </span>
                  {activeViewMode === 'writer' ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono shadow-xs">
                      {uiLang === 'en' ? '✓ Active Mode' : uiLang === 'es' ? '✓ Modo Activo' : '✓ Modo Ativo'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition">
                      {uiLang === 'en' ? 'Click to Activate' : uiLang === 'es' ? 'Clic para Activar' : 'Clique para Ativar'}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className={`text-base font-bold flex items-center gap-2 ${
                  activeViewMode === 'writer' ? 'text-emerald-950' : 'text-slate-900'
                }`}>
                  {t.workspace.modeWriter}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {uiLang === 'en'
                    ? 'Real-time guidance, fluff detector, content gap finder, and proposition elevation.'
                    : uiLang === 'es'
                    ? 'Guía en tiempo real, detector de relleno (fluff), buscador de brechas y elevación de hechos.'
                    : 'Guia em tempo real, detector de redundâncias (fluff), buscador de lacunas e elevação de proposições.'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Access Banner (Shows if user is unauthenticated or not active) */}
        {!hasActiveAccess && (
          <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-amber-500/10 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Lock className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>
                    {!currentUser
                      ? t.workspace.lockTitle
                      : currentUser.status === 'pending'
                      ? (uiLang === 'en' ? 'Account Under Review — Pending Activation' : uiLang === 'es' ? 'Registro en Revisión — Pendiente de Activación' : 'Cadastro em Análise — Aguardando Ativação')
                      : (uiLang === 'en' ? 'Inactive or Paused Subscription' : uiLang === 'es' ? 'Suscripción Inactiva o Pausada' : 'Assinatura Inativa ou Pausada')}
                  </span>
                  {currentUser && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                      {currentUser.status.toUpperCase()}
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {!currentUser
                    ? t.workspace.lockDescGuest
                    : currentUser.status === 'pending'
                    ? t.workspace.lockDescPending
                    : t.workspace.lockDescExpired}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              {!currentUser ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleOpenAuth('login')}
                    className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {t.workspace.btnLogin}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenAuth('register')}
                    className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {t.workspace.btnRequestAccess}
                  </button>
                </>
              ) : (
                <a
                  href={t.navLinks.contact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.workspace.btnContactAlexandre}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* MODO 1: ESTÚDIO DO REDATOR */}
        {activeViewMode === 'writer' ? (
          <WriterStudio
            candidateText={candidateText}
            onUpdateCandidateText={setCandidateText}
            knownFacts={knownFacts}
            analysisResult={analysisResult}
            isAnalyzing={isAnalyzing}
            onRunAudit={handleAnalyzeGain}
            onOpenFluffCutter={() => setIsFluffCutterOpen(true)}
            onOpenTermsBuilder={() => setIsTermsBuilderOpen(true)}
            onOpenEditorialCertificate={() => setIsEditorialReportOpen(true)}
            fluffItems={fluffItems}
            informationGaps={informationGaps}
            isLoadingGaps={isLoadingGaps}
            onRefreshGaps={handleRefreshGaps}
            currentTermo={currentTermo}
            uiLang={uiLang}
          />
        ) : (
          /* MODO 2: ANALISADOR ONTOLÓGICO CLÁSSICO */
          <div>
            {/* Workspace Title & Description */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">
                {t.workspace.badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mt-2 mb-3 text-slate-950">
                {t.workspace.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {t.workspace.subtitle}
              </p>
            </div>

            {/* 2 Input Cards with generous space and breathability */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
              {/* Card 1: Base de Conhecimento */}
              <BaselineCard
                baselineText={baselineText}
                knownFacts={knownFacts}
                isExtracting={isExtracting}
                onTextChange={setBaselineText}
                onExtractBaseline={handleExtractBaseline}
                onClear={handleClearBaseline}
                onFileUpload={handleFileUpload}
                uiLang={uiLang}
              />

              {/* Card 2: Novo Documento */}
              <CandidateCard
                candidateText={candidateText}
                isAnalyzing={isAnalyzing}
                onTextChange={setCandidateText}
                onAnalyze={handleAnalyzeGain}
                onClear={handleClearCandidate}
                onResetAll={handleResetAll}
                uiLang={uiLang}
              />
            </div>

            {/* Diagnóstico Consolidado */}
            <div id="diagnostico-metricas" className="space-y-12">
              {/* Balanço Comparativo */}
              <ComparisonBalance
                baselineFactsCount={knownFacts.length}
                candidateTextLength={candidateText.length}
                candidateWordCount={candidateText.trim().split(/\s+/).filter(Boolean).length}
                metrics={{
                  score_geral: analysisResult.score_geral,
                  classificacao_geral: analysisResult.classificacao_geral,
                  fatos_novos_count: analysisResult.fatos_novos_count,
                  fatos_novos_pct: analysisResult.fatos_novos_pct,
                  fatos_incrementais_count: analysisResult.fatos_incrementais_count,
                  fatos_incrementais_pct: analysisResult.fatos_incrementais_pct,
                  fatos_redundantes_count: analysisResult.fatos_redundantes_count,
                  fatos_redundantes_pct: analysisResult.fatos_redundantes_pct,
                }}
                uiLang={uiLang}
              />

              {/* 3 Metric Summary Cards */}
              <MetricsCards
                metrics={analysisResult}
                scoreGeral={analysisResult.score_geral}
                classificacaoGeral={analysisResult.classificacao_geral}
                fatosNovosPct={analysisResult.fatos_novos_pct}
                fatosNovosCount={analysisResult.fatos_novos_count}
                fatosIncrementaisPct={analysisResult.fatos_incrementais_pct}
                fatosIncrementaisCount={analysisResult.fatos_incrementais_count}
                fatosRedundantesPct={analysisResult.fatos_redundantes_pct}
                fatosRedundantesCount={analysisResult.fatos_redundantes_count}
                uiLang={uiLang}
              />

              {/* Síntese Analítica */}
              <SynthesisCard
                synthesis={analysisResult.sintese_analitica}
                sintese={analysisResult.sintese_analitica}
                classificacaoGeral={analysisResult.classificacao_geral}
                scoreGeral={analysisResult.score_geral}
                uiLang={uiLang}
              />

              {/* Visualizador de Resultados (Highlighting e Tabela) */}
              <ResultsViewer
                annotatedHtml={analysisResult.html_anotado}
                facts={analysisResult.fatos_analisados}
                onSelectFact={(f) => setSelectedFact(f)}
                uiLang={uiLang}
              />

              {/* Action Bar for Commit and Exports */}
              <ActionBar
                newFactsCount={newFactsCount}
                totalConsolidatedCount={totalConsolidatedCount}
                hasCommitted={hasCommitted}
                onCommitFacts={handleCommitNewFacts}
                onExportMarkdown={handleExportMarkdown}
                onExportJson={handleExportJson}
                uiLang={uiLang}
              />
            </div>
          </div>
        )}
      </section>

      {/* 5. Editorial Explanatory Sections */}
      <EditorialSections
        onStartAudit={() => scrollToSection('workspace')}
        uiLang={uiLang}
      />
      </main>

      {/* Modais da Aplicação */}
      <FactDetailModal
        fact={selectedFact}
        onClose={() => setSelectedFact(null)}
        uiLang={uiLang}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthReason(undefined);
        }}
        initialMode={authModalMode}
        redirectReason={authReason}
        onSuccess={(profile) => {
          setCurrentUser(profile);
          showToast(`Bem-vindo, ${profile.displayName || profile.email}!`);
        }}
      />

      {currentUser && (
        <AdminPanelModal
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          currentUser={currentUser}
        />
      )}

      <AccessRestrictedModal
        isOpen={isRestrictedModalOpen}
        onClose={() => setIsRestrictedModalOpen(false)}
        currentUser={currentUser}
        onOpenAuth={(mode) => handleOpenAuth(mode, authReason)}
        reason={authReason}
      />

      {/* Novos Modais Especializados para Redatores */}
      <FluffCutterModal
        isOpen={isFluffCutterOpen}
        onClose={() => setIsFluffCutterOpen(false)}
        items={fluffItems}
        onApplySynthesis={handleApplySynthesis}
      />

      <ReferenceTermsModal
        isOpen={isTermsBuilderOpen}
        onClose={() => setIsTermsBuilderOpen(false)}
        onBaselineGenerated={handleBaselineGeneratedFromTerms}
      />

      <EditorialReportModal
        isOpen={isEditorialReportOpen}
        onClose={() => setIsEditorialReportOpen(false)}
        reportData={editorialReportData}
      />

      {/* Toast Feedback Notification */}
      {toast && (
        <div
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full shadow-2xl font-mono text-xs flex items-center gap-2 border bg-slate-950 text-white border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

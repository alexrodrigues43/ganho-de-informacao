export type SupportedLang = 'pt' | 'en' | 'es';

export interface Translations {
  navLinks: {
    services: string;
    suite: string;
    blog: string;
    podcasts: string;
    contact: string;
  };
  nav: {
    services: string;
    suite: string;
    blog: string;
    podcasts: string;
    contact: string;
    unlimitedCredits: string;
    credits: string;
    buyCredits: string;
    createAccount: string;
    subscription: string;
    superAdmin: string;
    login: string;
    logout: string;
    adminPanel: string;
    reloadSub: string;
    languageSelectAria: string;
    knownFacts: string;
    resetSession: string;
    resetAll: string;
    resetAllDesc: string;
    restoreInitialBenchmark: string;
    patentGoogle: string;
    status: string;
    balance: string;
    user: string;
  };
  subnav: {
    problem: string;
    graphStudio: string;
    benefits: string;
    howItWorks: string;
    auditor: string;
    factsInMemory: string;
    calibratedEngine: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    btnAudit: string;
    btnExploreKb: string;
    pills: {
      triplets: string;
      cosine: string;
      marginalScore: string;
    };
  };
  projectLanguage: {
    label: string;
    pt: string;
    en: string;
    es: string;
    hint: string;
  };
  workspace: {
    badge: string;
    title: string;
    subtitle: string;
    modeWriter: string;
    modeClassic: string;
    lockTitle: string;
    lockDescGuest: string;
    lockDescPending: string;
    lockDescExpired: string;
    btnLogin: string;
    btnRequestAccess: string;
    btnContactAlexandre: string;
  };
  baseline: {
    title: string;
    subtitle: string;
    clearBase: string;
    ontologyBadge: string;
    tabDoc: string;
    tabFacts: string;
    docCounter: string;
    placeholder: string;
    importFile: string;
    btnExtract: string;
    btnExtracting: string;
    extractedBadge: string;
    indexedTriplets: string;
    searchPlaceholder: string;
    confidence: string;
    noFactsFound: string;
    showingFacts: string;
  };
  candidate: {
    title: string;
    subtitle: string;
    clearBtn: string;
    statsChar: string;
    statsWord: string;
    placeholder: string;
    btnAnalyze: string;
    btnAnalyzing: string;
    resetAllQuick: string;
  };
  comparisonBalance: {
    title: string;
    subtitle: string;
    netScoreLabel: string;
    colBaselineTitle: string;
    colBaselineSub: string;
    colCandidateTitle: string;
    colCandidateSub: string;
    colNetTitle: string;
    colNetSub: string;
    factsMapped: string;
    totalEvaluated: string;
    redundancyRate: string;
    informationGainRate: string;
    marginalCoverage: string;
  };
  metrics: {
    generalScore: string;
    highGain: string;
    mediumGain: string;
    lowGain: string;
    newFacts: string;
    newFactsDesc: string;
    incrementalFacts: string;
    incrementalFactsDesc: string;
    redundantFacts: string;
    redundantFactsDesc: string;
    synthesisTitle: string;
    exclusivePropositionRate: string;
    depthGainRate: string;
    consensusOverlap: string;
  };
  synthesis: {
    title: string;
    badge: string;
    interpretationTitle: string;
  };
  resultsViewer: {
    tabAnnotated: string;
    tabTable: string;
    legendNew: string;
    legendIncremental: string;
    legendRedundant: string;
    interactiveHint: string;
    tableId: string;
    tableSubject: string;
    tablePredicate: string;
    tableObject: string;
    tableClassification: string;
    tableScore: string;
    tableSimilarity: string;
    inspectFact: string;
  };
  actionBar: {
    btnCommit: string;
    btnCommitted: string;
    statusCommitted: string;
    statusElevates: string;
    exportMarkdown: string;
    exportJson: string;
  };
  writerStudio: {
    badge: string;
    title: string;
    subtitle: string;
    tagRealtime: string;
    tagDescription: string;
    btnTerms: string;
    btnFluff: string;
    btnCert: string;
    draftTitle: string;
    draftTerms: string;
    draftChars: string;
    draftPlaceholder: string;
    tabGaps: string;
    tabElevate: string;
    tabFluffTab: string;
    tabBenchmark: string;
    tabReport: string;
    btnGenerateReport: string;
    btnElevate: string;
    btnElevating: string;
    elevateEmpty: string;
    originalSegment: string;
    suggestedRewrite: string;
    btnApplyElevation: string;
    gapFinderTitle: string;
    gapFinderSubtitle: string;
    btnApplyGapExample: string;
  };
  factDetail: {
    title: string;
    canonicalBadge: string;
    spoFormalization: string;
    subject: string;
    predicate: string;
    object: string;
    marginalScore: string;
    cosineSimilarity: string;
    originSnippet: string;
    justification: string;
    close: string;
  };
  editorialSections: {
    problem: {
      badge: string;
      title: string;
      subtitle: string;
      card1Title: string;
      card1Desc: string;
      card2Title: string;
      card2Desc: string;
      card3Title: string;
      card3Desc: string;
    };
    benefits: {
      badge: string;
      title: string;
      subtitle: string;
      b1Tag: string;
      b1Title: string;
      b1Desc: string;
      b2Tag: string;
      b2Title: string;
      b2Desc: string;
      b3Tag: string;
      b3Title: string;
      b3Desc: string;
      b4Tag: string;
      b4Title: string;
      b4Desc: string;
    };
    howItWorks: {
      badge: string;
      title: string;
      subtitle: string;
      s1Num: string;
      s1Title: string;
      s1Desc: string;
      s2Num: string;
      s2Title: string;
      s2Desc: string;
      s3Num: string;
      s3Title: string;
      s3Desc: string;
    };
    cta: {
      badge: string;
      title: string;
      subtitle: string;
      btnAudit: string;
    };
    footer: {
      brand: string;
      rights: string;
      patentLink: string;
      author: string;
    };
  };
  toasts: {
    welcome: string;
    sessionReset: string;
    factsCommitted: string;
    exportMdSuccess: string;
    exportJsonSuccess: string;
    errorAudit: string;
    loginRequired: string;
    quotaExceeded: string;
    allReset: string;
  };
  common: {
    loading: string;
    success: string;
    error: string;
    close: string;
    copy: string;
    copied: string;
    cancel: string;
    save: string;
  };
}

export const TRANSLATIONS: Record<SupportedLang, Translations> = {
  pt: {
    navLinks: {
      services: 'https://semantico.com.br/servicos.html',
      suite: 'https://semantico.com.br/suite-semantica.html',
      blog: 'https://semantico.com.br/blog',
      podcasts: 'https://semantico.com.br/podcast-semantico.html',
      contact: 'https://semantico.com.br/contato.html',
    },
    nav: {
      services: 'Serviços',
      suite: 'Suíte',
      blog: 'Blog',
      podcasts: 'Podcasts',
      contact: 'Contato',
      unlimitedCredits: 'Créditos Ilimitados',
      credits: 'créditos',
      buyCredits: 'Comprar Créditos',
      createAccount: 'Criar Conta',
      subscription: 'Assinatura',
      superAdmin: 'Super Admin',
      login: 'Entrar',
      logout: 'Sair da Conta',
      adminPanel: 'Painel Super Admin',
      reloadSub: 'Recarregar Assinatura',
      languageSelectAria: 'Selecionar idioma da interface',
      knownFacts: 'fatos conhecidos',
      resetSession: 'Limpar Sessão',
      resetAll: 'Limpar Tudo (Reset Geral)',
      resetAllDesc: 'Limpa todos os campos e reinicia a análise do zero',
      restoreInitialBenchmark: 'Restaurar Benchmark Inicial',
      patentGoogle: 'Patente Google (US 11,354,342 B2)',
      status: 'Status',
      balance: 'Saldo:',
      user: 'Usuário',
    },
    subnav: {
      problem: 'O Problema',
      graphStudio: 'Graph Studio',
      benefits: 'Benefícios',
      howItWorks: 'Como Funciona',
      auditor: 'Auditor S-P-O',
      factsInMemory: 'fatos em memória',
      calibratedEngine: 'Motor Calibrado',
    },
    hero: {
      badge: 'Patente Google US11762955B2 & IA Generativa',
      title: 'Analisador de Ganho de Informação',
      subtitle:
        'Audite a originalidade atômica do seu conteúdo contra os concorrentes da SERP. Identifique fatos novos, proposições incrementais e elimine redundâncias para autoridade máxima.',
      btnAudit: 'Quero auditar meu texto agora',
      btnExploreKb: 'Explorar base de conhecimento',
      pills: {
        triplets: 'Tripletos S-P-O',
        cosine: 'Distância Cosseno',
        marginalScore: 'Score Marginal',
      },
    },
    projectLanguage: {
      label: 'Idioma do Conteúdo:',
      pt: 'Português',
      en: 'Inglês',
      es: 'Espanhol',
      hint: 'Define o idioma para processamento das proposições atômicas e auditoria de originalidade.',
    },
    workspace: {
      badge: 'Estação de Trabalho Analítica',
      title: 'Auditor de Fatos Atômicos & Information Gain',
      subtitle:
        'Insira ou carregue seu corpus base à esquerda e analise o documento candidato à direita para calcular o ganho marginal de informação.',
      modeWriter: 'Estúdio do Redator',
      modeClassic: 'Auditor Clássico',
      lockTitle: 'Auditor Bloqueado para Contas sem Créditos Ativos',
      lockDescGuest: 'Faça login ou cadastre-se para auditar textos personalizados e salvar novos fatos atômicos.',
      lockDescPending: 'Seu cadastro foi salvo. Fale com Alexandre para liberação imediata do seu acesso.',
      lockDescExpired: 'Entre em contato para renovar seu plano de acesso ao Auditor S-P-O.',
      btnLogin: 'Fazer Login',
      btnRequestAccess: 'Solicitar Acesso',
      btnContactAlexandre: 'Liberar com Alexandre',
    },
    baseline: {
      title: 'Base de Conhecimento',
      subtitle: 'Corpus histórico canônico para comparação de novidade',
      clearBase: 'Limpar Base',
      ontologyBadge: 'Ontologia #01',
      tabDoc: 'Inserir documento base',
      tabFacts: 'Fatos indexados',
      docCounter: 'caracteres de corpus base',
      placeholder: 'Cole aqui o texto dos artigos concorrentes da SERP ou consenso de mercado sobre o tema...',
      importFile: 'Importar .txt / .md',
      btnExtract: 'Extrair fatos para a base',
      btnExtracting: 'Extraindo tripletos S-P-O...',
      extractedBadge: 'Fatos Atômicos Mapeados',
      indexedTriplets: 'Tripletos Canônicos Indexados',
      searchPlaceholder: 'Buscar por sujeito, predicado ou objeto...',
      confidence: 'Confiança',
      noFactsFound: 'Nenhum fato encontrado com este filtro.',
      showingFacts: 'Exibindo {count} de {total} fatos atômicos validados na ontologia.',
    },
    candidate: {
      title: 'Novo Documento para Auditoria',
      subtitle: 'Texto candidato à mensuração de novidade e ganho marginal',
      clearBtn: 'Limpar',
      statsChar: 'carac.',
      statsWord: 'pal.',
      placeholder: 'Cole aqui o artigo, post, documentação ou texto a ser auditado contra a base...',
      btnAnalyze: 'Calcular Ganho de Informação & Decompor Fatos',
      btnAnalyzing: 'Calculando divergência e ganho de informação...',
      resetAllQuick: 'Reset Geral',
    },
    comparisonBalance: {
      title: 'Balanço Comparativo de Information Gain',
      subtitle: 'Relação direta entre a Base Canônica de Conhecimento e o Novo Documento avaliado (Patente US 11,354,342 B2)',
      netScoreLabel: 'SCORE LÍQUIDO:',
      colBaselineTitle: 'Base de Conhecimento Conhecida',
      colBaselineSub: 'Régua factual preexistente no domínio',
      colCandidateTitle: 'Novo Documento Avaliado',
      colCandidateSub: 'Proposições extraídas no texto analisado',
      colNetTitle: 'Balanço Líquido de Ineditismo',
      colNetSub: 'Distribuição relativa de autoridade marginal',
      factsMapped: 'Fatos Atômicos Mapeados',
      totalEvaluated: 'Proposições no Artigo',
      redundancyRate: 'Índice de Redundância Factual',
      informationGainRate: 'Ganho Marginal Efetivo',
      marginalCoverage: 'Cobertura Factual Exclusiva',
    },
    metrics: {
      generalScore: 'Score Geral de Ganho de Informação',
      highGain: 'ALTO GANHO',
      mediumGain: 'MÉDIO GANHO',
      lowGain: 'BAIXO GANHO',
      newFacts: 'Fatos Novos (Exclusivos)',
      newFactsDesc: 'Proposições inéditas não encontradas no corpus de consenso dos concorrentes.',
      incrementalFacts: 'Fatos Incrementais (Aprofundamento)',
      incrementalFactsDesc: 'Proposições que qualificam, refinam ou adicionam contexto ao consenso existente.',
      redundantFacts: 'Fatos Redundantes (Consenso)',
      redundantFactsDesc: 'Afirmações que apenas repetem proposições já amplamente indexadas na SERP.',
      synthesisTitle: 'Síntese Analítica do Conteúdo',
      exclusivePropositionRate: 'Taxa de Proposições Exclusivas',
      depthGainRate: 'Taxa de Aprofundamento Incremental',
      consensusOverlap: 'Taxa de Repetição de Consenso',
    },
    synthesis: {
      title: 'Síntese Editorial & Recomendações',
      badge: 'Parecer Executivo',
      interpretationTitle: 'Interpretação Semântica da Auditoria',
    },
    resultsViewer: {
      tabAnnotated: 'Texto Anotado & Destaques',
      tabTable: 'Tabela de Proposições Atômicas',
      legendNew: 'Fatos Novos (Inéditos)',
      legendIncremental: 'Fatos Incrementais (Aprofundamento)',
      legendRedundant: 'Fatos Redundantes (Consenso)',
      interactiveHint: 'Clique em qualquer trecho destacado para inspecionar a decomposição S-P-O detalhada.',
      tableId: 'ID',
      tableSubject: 'Sujeito',
      tablePredicate: 'Predicado',
      tableObject: 'Objeto',
      tableClassification: 'Classificação',
      tableScore: 'Score',
      tableSimilarity: 'Similaridade Cosseno',
      inspectFact: 'Inspecionar',
    },
    actionBar: {
      btnCommit: 'Adicionar {count} fatos novos à base conhecida',
      btnCommitted: 'Fatos integrados com sucesso na ontologia',
      statusCommitted: 'Base de conhecimento consolidada em {count} fatos.',
      statusElevates: 'Eleva a base para {count} fatos após inclusão.',
      exportMarkdown: 'Exportar Markdown',
      exportJson: 'Exportar JSON',
    },
    writerStudio: {
      badge: 'Writer Studio — Ferramentas Especializadas para Redatores',
      title: 'Estúdio de Redação & Ineditismo',
      subtitle: 'Escreva sabendo exatamente se cada parágrafo acrescenta novidade ou repete o consenso da web sobre os conceitos.',
      tagRealtime: 'Guia em Tempo Real',
      tagDescription: 'Acompanhe métricas factuais enquanto redige',
      btnTerms: 'Régua por Conceito',
      btnFluff: 'Cirurgião de Fluff',
      btnCert: 'Laudo & Certificado',
      draftTitle: 'Seu Rascunho Editorial em Elaboração',
      draftTerms: 'termos',
      draftChars: 'caracteres',
      draftPlaceholder: 'Comece a digitar seu artigo ou cole aqui seu texto para auditar se ele agrega valor real sobre o consenso da web...',
      tabGaps: 'Localizador de Lacunas',
      tabElevate: 'Elevador de Fatos Redundantes',
      tabFluffTab: 'Cortador de Encheção de Linguiça',
      tabBenchmark: 'Termos de Referência',
      tabReport: 'Dossiê Editorial Executivo',
      btnGenerateReport: 'Gerar Relatório Executivo',
      btnElevate: 'Elevar para Fato Inédito',
      btnElevating: 'Elevando com IA...',
      elevateEmpty: 'Nenhum fato redundante detectado. Seu conteúdo apresenta excelente originalidade!',
      originalSegment: 'Trecho Redundante Detectado:',
      suggestedRewrite: 'Sugestão de Reescrita de Alto Ganho:',
      btnApplyElevation: 'Aplicar Reescrita no Documento',
      gapFinderTitle: 'Oportunidades de Conteúdo Inexplorado na SERP',
      gapFinderSubtitle: 'Ângulos e proposições que nenhum concorrente de topo abordou a fundo.',
      btnApplyGapExample: 'Inserir Exemplo no Artigo',
    },
    factDetail: {
      title: 'Detalhes da Proposição Atômica',
      canonicalBadge: 'ATÔMICO CANÔNICO',
      spoFormalization: 'Formalização FTS: Tripleto Atômico (S-P-O)',
      subject: 'Sujeito',
      predicate: 'Predicado',
      object: 'Objeto',
      marginalScore: 'Score de Ganho Marginal',
      cosineSimilarity: 'Similaridade Cosseno',
      originSnippet: 'Trecho de Origem no Documento',
      justification: 'Justificativa Semântica da IA',
      close: 'Fechar',
    },
    editorialSections: {
      problem: {
        badge: 'O Diagnóstico de Mercado',
        title: 'O mar de conteúdo genérico e o filtro de novidade dos buscadores.',
        subtitle:
          'Mais de 80% dos artigos publicados online apenas parafraseiam fatos já conhecidos. Os algoritmos modernos penalizam redundâncias e priorizam o Ganho de Informação.',
        card1Title: 'Redundância Invisível',
        card1Desc:
          'Sem uma auditoria factual, você publica artigos que repetem 90% do corpus já indexado, resultando em pontuações mínimas de novidade perante os motores de busca.',
        card2Title: 'Falta de Estrutura Atômica',
        card2Desc:
          'Textos longos sem decomposição em tripletos [Sujeito-Predicado-Objeto] são difíceis de serem assimilados por Large Language Models e geradores de respostas diretas.',
        card3Title: 'Desconexão com a Ontologia',
        card3Desc:
          'O conteúdo não se comunica com a base histórica do seu domínio, perdendo a oportunidade de expandir relacionamentos conceituais no grafo semântico.',
      },
      benefits: {
        badge: 'Vantagem Competitiva',
        title: 'Principais Benefícios do Information Gain',
        subtitle: 'O modelo matemático da patente US 11,354,342 B2 aplicado à criação e auditoria de conteúdo.',
        b1Tag: '01 • Inovação Factual',
        b1Title: 'Novidade Comprovável',
        b1Desc: 'Meça matematicamente o quanto seu artigo entrega de conhecimento novo em relação aos líderes da SERP.',
        b2Tag: '02 • Relevância Algorítmica',
        b2Title: 'Imunidade a Filtros HCU',
        b2Desc: 'Proteja seus sites de atualizações de conteúdo útil garantindo valor único e proposições proprietárias.',
        b3Tag: '03 • Eficiência Editorial',
        b3Title: 'Poda de Redundâncias',
        b3Desc: 'Identifique parágrafos inteiros que apenas ocupam espaço sem acrescentar informação substancial.',
        b4Tag: '04 • Expansão Ontológica',
        b4Title: 'Grafo Semântico Enriquecido',
        b4Desc: 'Alimente continuamente a base do seu domínio com novas conexões canônicas reutilizáveis.',
      },
      howItWorks: {
        badge: 'O Algoritmo de 3 Etapas',
        title: 'Como o Information Gain é Calculado',
        subtitle: 'Auditoria algorítmica rigorosa de originalidade e novidade factual marginal.',
        s1Num: '01',
        s1Title: 'Extração Atômica S-P-O',
        s1Desc: 'O texto é decomposto em proposições mínimas verificáveis no formato [Sujeito - Predicado - Objeto].',
        s2Num: '02',
        s2Title: 'Resolução Entitária & Alinhamento',
        s2Desc: 'Cada entidade é resolvida e mapeada contra a ontologia e o corpus de consenso dos concorrentes.',
        s3Num: '03',
        s3Title: 'Cálculo da Novidade Marginal',
        s3Desc: 'A distância cosseno vetorial e a probabilidade condicionada determinam o score de Ganho de Informação.',
      },
      cta: {
        badge: 'Eleve a autoridade factual do seu domínio',
        title: 'Pronto para elevar o nível do seu conteúdo?',
        subtitle:
          'Pare de apenas escrever e comece a construir autoridade semântica sólida, garantindo relevância matemática nos algoritmos de busca e LLMs.',
        btnAudit: 'Auditar documento com IA agora',
      },
      footer: {
        brand: 'Semântico — Significado e Sentido',
        rights: '© 2026 Semântico SEO. Todos os direitos reservados.',
        patentLink: 'Patente US 11,354,342 B2',
        author: 'Alexandre Rodrigues',
      },
    },
    toasts: {
      welcome: 'Bem-vindo de volta!',
      sessionReset: 'Sessão restaurada com sucesso.',
      factsCommitted: 'Novos fatos integrados à ontologia com sucesso!',
      exportMdSuccess: 'Exportação em Markdown concluída.',
      exportJsonSuccess: 'Exportação em JSON concluída.',
      errorAudit: 'Erro ao processar auditoria. Tente novamente.',
      loginRequired: 'Acesso restrito. Faça login para continuar.',
      quotaExceeded: 'Créditos insuficientes para nova auditoria.',
      allReset: 'Todos os campos foram reiniciados.',
    },
    common: {
      loading: 'Carregando...',
      success: 'Sucesso',
      error: 'Erro',
      close: 'Fechar',
      copy: 'Copiar',
      copied: 'Copiado!',
      cancel: 'Cancelar',
      save: 'Salvar',
    },
  },
  en: {
    navLinks: {
      services: 'https://semantico.com.br/en/services.html',
      suite: 'https://semantico.com.br/en/semantic-suite.html',
      blog: 'https://semantico.com.br/en/blog',
      podcasts: 'https://semantico.com.br/en/semantic-podcast.html',
      contact: 'https://semantico.com.br/en/contact.html',
    },
    nav: {
      services: 'Services',
      suite: 'Suite',
      blog: 'Blog',
      podcasts: 'Podcasts',
      contact: 'Contact',
      unlimitedCredits: 'Unlimited Credits',
      credits: 'credits',
      buyCredits: 'Buy Credits',
      createAccount: 'Create Account',
      subscription: 'Subscription',
      superAdmin: 'Super Admin',
      login: 'Sign In',
      logout: 'Sign Out',
      adminPanel: 'Super Admin Panel',
      reloadSub: 'Reload Subscription',
      languageSelectAria: 'Select interface language',
      knownFacts: 'known facts',
      resetSession: 'Reset Session',
      resetAll: 'Clear All (General Reset)',
      resetAllDesc: 'Clears all fields and restarts analysis from scratch',
      restoreInitialBenchmark: 'Restore Initial Benchmark',
      patentGoogle: 'Google Patent (US 11,354,342 B2)',
      status: 'Status',
      balance: 'Balance:',
      user: 'User',
    },
    subnav: {
      problem: 'The Problem',
      graphStudio: 'Graph Studio',
      benefits: 'Benefits',
      howItWorks: 'How It Works',
      auditor: 'S-P-O Auditor',
      factsInMemory: 'facts in memory',
      calibratedEngine: 'Calibrated Engine',
    },
    hero: {
      badge: 'Google Patent US11762955B2 & Generative AI',
      title: 'Information Gain Analyzer',
      subtitle:
        'Audit the atomic originality of your content against SERP competitors. Identify novel facts, incremental propositions, and eliminate redundancy for maximum topical authority.',
      btnAudit: 'Audit my content now',
      btnExploreKb: 'Explore knowledge baseline',
      pills: {
        triplets: 'S-P-O Triplets',
        cosine: 'Cosine Distance',
        marginalScore: 'Marginal Score',
      },
    },
    projectLanguage: {
      label: 'Content Language:',
      pt: 'Portuguese',
      en: 'English',
      es: 'Spanish',
      hint: 'Sets the language for atomic proposition processing and originality audit.',
    },
    workspace: {
      badge: 'Analytical Workstation',
      title: 'Atomic Facts & Information Gain Auditor',
      subtitle:
        'Insert or load your baseline corpus on the left and analyze the candidate document on the right to calculate marginal information gain.',
      modeWriter: 'Writer Studio',
      modeClassic: 'Classic Auditor',
      lockTitle: 'Auditor Locked for Accounts Without Active Credits',
      lockDescGuest: 'Sign in or register to audit custom texts and save new atomic facts.',
      lockDescPending: 'Your registration was saved. Contact Alexandre for immediate activation.',
      lockDescExpired: 'Contact us to renew your access plan to the S-P-O Auditor.',
      btnLogin: 'Sign In',
      btnRequestAccess: 'Request Access',
      btnContactAlexandre: 'Activate with Alexandre',
    },
    baseline: {
      title: 'Knowledge Baseline',
      subtitle: 'Canonical historical corpus for novelty benchmarking',
      clearBase: 'Clear Baseline',
      ontologyBadge: 'Ontology #01',
      tabDoc: 'Insert baseline document',
      tabFacts: 'Indexed facts',
      docCounter: 'baseline corpus characters',
      placeholder: 'Paste the content of top SERP competitors or market consensus here...',
      importFile: 'Import .txt / .md',
      btnExtract: 'Extract facts to baseline',
      btnExtracting: 'Extracting S-P-O triplets...',
      extractedBadge: 'Atomic Facts Mapped',
      indexedTriplets: 'Canonical Indexed Triplets',
      searchPlaceholder: 'Search by subject, predicate or object...',
      confidence: 'Confidence',
      noFactsFound: 'No facts found matching this filter.',
      showingFacts: 'Displaying {count} of {total} validated atomic facts in ontology.',
    },
    candidate: {
      title: 'New Document for Audit',
      subtitle: 'Candidate text for novelty and marginal gain measurement',
      clearBtn: 'Clear',
      statsChar: 'chars',
      statsWord: 'words',
      placeholder: 'Paste here your article, draft, documentation or content to audit against the baseline...',
      btnAnalyze: 'Calculate Information Gain & Decompose Facts',
      btnAnalyzing: 'Calculating divergence and information gain...',
      resetAllQuick: 'Reset All',
    },
    comparisonBalance: {
      title: 'Comparative Information Gain Balance',
      subtitle: 'Direct relationship between Canonical Knowledge Baseline and Evaluated Document (Patent US 11,354,342 B2)',
      netScoreLabel: 'NET SCORE:',
      colBaselineTitle: 'Known Knowledge Baseline',
      colBaselineSub: 'Pre-existing factual benchmark in domain',
      colCandidateTitle: 'Evaluated Candidate Document',
      colCandidateSub: 'Propositions extracted from candidate text',
      colNetTitle: 'Net Originality Balance',
      colNetSub: 'Relative distribution of marginal authority',
      factsMapped: 'Atomic Facts Mapped',
      totalEvaluated: 'Propositions in Article',
      redundancyRate: 'Factual Redundancy Rate',
      informationGainRate: 'Effective Marginal Gain',
      marginalCoverage: 'Exclusive Factual Coverage',
    },
    metrics: {
      generalScore: 'Overall Information Gain Score',
      highGain: 'HIGH GAIN',
      mediumGain: 'MEDIUM GAIN',
      lowGain: 'LOW GAIN',
      newFacts: 'Novel Facts (Exclusive)',
      newFactsDesc: 'Unprecedented propositions not found in the competitor consensus corpus.',
      incrementalFacts: 'Incremental Facts (Deepening)',
      incrementalFactsDesc: 'Propositions that qualify, refine or add new context to existing consensus.',
      redundantFacts: 'Redundant Facts (Consensus)',
      redundantFactsDesc: 'Statements that merely repeat propositions already indexed in SERP corpus.',
      synthesisTitle: 'Analytical Content Synthesis',
      exclusivePropositionRate: 'Exclusive Proposition Rate',
      depthGainRate: 'Incremental Depth Rate',
      consensusOverlap: 'Consensus Overlap Rate',
    },
    synthesis: {
      title: 'Editorial Synthesis & Recommendations',
      badge: 'Executive Assessment',
      interpretationTitle: 'Semantic Audit Interpretation',
    },
    resultsViewer: {
      tabAnnotated: 'Annotated Text & Highlights',
      tabTable: 'Atomic Propositions Table',
      legendNew: 'Novel Facts (Exclusive)',
      legendIncremental: 'Incremental Facts (Deepening)',
      legendRedundant: 'Redundant Facts (Consensus)',
      interactiveHint: 'Click any highlighted passage to inspect detailed S-P-O decomposition.',
      tableId: 'ID',
      tableSubject: 'Subject',
      tablePredicate: 'Predicate',
      tableObject: 'Object',
      tableClassification: 'Classification',
      tableScore: 'Score',
      tableSimilarity: 'Cosine Similarity',
      inspectFact: 'Inspect',
    },
    actionBar: {
      btnCommit: 'Add {count} novel facts to known baseline',
      btnCommitted: 'Facts successfully integrated into ontology',
      statusCommitted: 'Knowledge baseline consolidated at {count} facts.',
      statusElevates: 'Raises baseline to {count} facts upon inclusion.',
      exportMarkdown: 'Export Markdown',
      exportJson: 'Export JSON',
    },
    writerStudio: {
      badge: 'Writer Studio — Specialized Authoring Tools',
      title: 'Writing & Originality Studio',
      subtitle: 'Write knowing exactly whether each paragraph contributes new facts or merely repeats web consensus.',
      tagRealtime: 'Real-Time Guidance',
      tagDescription: 'Monitor factual metrics as you draft',
      btnTerms: 'Benchmark by Concept',
      btnFluff: 'Fluff Surgeon',
      btnCert: 'Dossier & Certificate',
      draftTitle: 'Your Editorial Draft in Progress',
      draftTerms: 'terms',
      draftChars: 'characters',
      draftPlaceholder: 'Start typing your article or paste text here to audit if it adds genuine value over web consensus...',
      tabGaps: 'Information Gap Finder',
      tabElevate: 'Redundant Fact Elevator',
      tabFluffTab: 'Fluff & Clutter Cutter',
      tabBenchmark: 'Reference Concepts',
      tabReport: 'Executive Editorial Dossier',
      btnGenerateReport: 'Generate Executive Report',
      btnElevate: 'Elevate to Novel Fact',
      btnElevating: 'Elevating with AI...',
      elevateEmpty: 'No redundant facts detected. Your content exhibits outstanding originality!',
      originalSegment: 'Detected Redundant Segment:',
      suggestedRewrite: 'High-Gain Rewrite Suggestion:',
      btnApplyElevation: 'Apply Rewrite to Document',
      gapFinderTitle: 'Unexplored Content Opportunities in SERP',
      gapFinderSubtitle: 'Angles and propositions that no top competitor covered in depth.',
      btnApplyGapExample: 'Insert Example into Article',
    },
    factDetail: {
      title: 'Atomic Proposition Details',
      canonicalBadge: 'CANONICAL ATOMIC',
      spoFormalization: 'FTS Formalization: Atomic Triplet (S-P-O)',
      subject: 'Subject',
      predicate: 'Predicate',
      object: 'Object',
      marginalScore: 'Marginal Gain Score',
      cosineSimilarity: 'Cosine Similarity',
      originSnippet: 'Source Snippet in Document',
      justification: 'AI Semantic Justification',
      close: 'Close',
    },
    editorialSections: {
      problem: {
        badge: 'Market Diagnosis',
        title: 'The ocean of generic content and search engine novelty filters.',
        subtitle:
          'Over 80% of online articles merely paraphrase known facts. Modern algorithms penalize redundancy and reward Information Gain.',
        card1Title: 'Invisible Redundancy',
        card1Desc:
          'Without factual auditing, articles repeat 90% of the indexed corpus, scoring poorly on search engine novelty benchmarks.',
        card2Title: 'Lack of Atomic Structure',
        card2Desc:
          'Long texts without [Subject-Predicate-Object] decomposition are difficult for Large Language Models and answer engines to ingest.',
        card3Title: 'Ontological Disconnection',
        card3Desc:
          'Content fails to communicate with your domain historical knowledge base, missing the opportunity to expand graph relationships.',
      },
      benefits: {
        badge: 'Competitive Advantage',
        title: 'Core Benefits of Information Gain',
        subtitle: 'The mathematical model of Patent US 11,354,342 B2 applied to content strategy and authority.',
        b1Tag: '01 • Factual Innovation',
        b1Title: 'Provable Novelty',
        b1Desc: 'Mathematically measure how much new knowledge your article introduces compared to top SERP competitors.',
        b2Tag: '02 • Algorithmic Resilience',
        b2Title: 'Helpful Content Protection',
        b2Desc: 'Shield your sites from algorithmic devaluations by securing genuine value and proprietary propositions.',
        b3Tag: '03 • Editorial Efficiency',
        b3Title: 'Redundancy Pruning',
        b3Desc: 'Identify entire paragraphs that waste reader time without providing substantial factual substance.',
        b4Tag: '04 • Ontological Expansion',
        b4Title: 'Enriched Semantic Graph',
        b4Desc: 'Continuously feed your domain knowledge base with new canonical connections for future reuse.',
      },
      howItWorks: {
        badge: 'The 3-Stage Algorithm',
        title: 'How Information Gain is Calculated',
        subtitle: 'Rigorous algorithmic audit of originality and marginal factual novelty.',
        s1Num: '01',
        s1Title: 'S-P-O Atomic Extraction',
        s1Desc: 'Text is decomposed into verifiable atomic propositions formatted as [Subject - Predicate - Object].',
        s2Num: '02',
        s2Title: 'Entity Resolution & Alignment',
        s2Desc: 'Each entity is resolved and aligned against the knowledge baseline and competitor consensus.',
        s3Num: '03',
        s3Title: 'Marginal Novelty Calculation',
        s3Desc: 'Vector cosine distance and conditional probability compute the final Information Gain score.',
      },
      cta: {
        badge: 'Elevate your domain factual authority',
        title: 'Ready to elevate the standard of your content?',
        subtitle:
          'Stop just writing words and start building solid semantic authority, ensuring mathematical relevance in search engines and LLMs.',
        btnAudit: 'Audit document with AI now',
      },
      footer: {
        brand: 'Semântico — Meaning and Sense',
        rights: '© 2026 Semântico SEO. All rights reserved.',
        patentLink: 'Patent US 11,354,342 B2',
        author: 'Alexandre Rodrigues',
      },
    },
    toasts: {
      welcome: 'Welcome back!',
      sessionReset: 'Session reset successfully.',
      factsCommitted: 'New facts successfully integrated into ontology!',
      exportMdSuccess: 'Markdown export completed.',
      exportJsonSuccess: 'JSON export completed.',
      errorAudit: 'Error running audit. Please try again.',
      loginRequired: 'Access restricted. Please sign in to proceed.',
      quotaExceeded: 'Insufficient credits for new audit.',
      allReset: 'All fields have been reset.',
    },
    common: {
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      close: 'Close',
      copy: 'Copy',
      copied: 'Copied!',
      cancel: 'Cancel',
      save: 'Save',
    },
  },
  es: {
    navLinks: {
      services: 'https://semantico.com.br/es/servicios.html',
      suite: 'https://semantico.com.br/es/suite-semantica.html',
      blog: 'https://semantico.com.br/es/blog',
      podcasts: 'https://semantico.com.br/es/podcast-semantico.html',
      contact: 'https://semantico.com.br/es/contacto.html',
    },
    nav: {
      services: 'Servicios',
      suite: 'Suite',
      blog: 'Blog',
      podcasts: 'Pódcasts',
      contact: 'Contacto',
      unlimitedCredits: 'Créditos Ilimitados',
      credits: 'créditos',
      buyCredits: 'Comprar Créditos',
      createAccount: 'Crear Cuenta',
      subscription: 'Suscripción',
      superAdmin: 'Super Admin',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      adminPanel: 'Panel Super Admin',
      reloadSub: 'Recargar Suscripción',
      languageSelectAria: 'Seleccionar idioma de la interfaz',
      knownFacts: 'hechos conocidos',
      resetSession: 'Limpiar Sesión',
      resetAll: 'Limpiar Todo (Reinicio General)',
      resetAllDesc: 'Limpia todos los campos y reinicia el análisis desde cero',
      restoreInitialBenchmark: 'Restaurar Benchmark Inicial',
      patentGoogle: 'Patente Google (US 11,354,342 B2)',
      status: 'Estado',
      balance: 'Saldo:',
      user: 'Usuario',
    },
    subnav: {
      problem: 'El Problema',
      graphStudio: 'Graph Studio',
      benefits: 'Beneficios',
      howItWorks: 'Cómo Funciona',
      auditor: 'Auditor S-P-O',
      factsInMemory: 'hechos en memoria',
      calibratedEngine: 'Motor Calibrado',
    },
    hero: {
      badge: 'Patente Google US11762955B2 & IA Generativa',
      title: 'Analizador de Ganancia de Información',
      subtitle:
        'Audite la originalidad atómica de su contenido frente a competidores de la SERP. Identifique hechos nuevos, proposiciones incrementales y elimine redundancias para una autoridad máxima.',
      btnAudit: 'Auditar mi contenido ahora',
      btnExploreKb: 'Explorar base de conocimiento',
      pills: {
        triplets: 'Tripletes S-P-O',
        cosine: 'Distancia Coseno',
        marginalScore: 'Puntaje Marginal',
      },
    },
    projectLanguage: {
      label: 'Idioma del Contenido:',
      pt: 'Portugués',
      en: 'Inglés',
      es: 'Español',
      hint: 'Define el idioma para procesamiento de proposiciones atómicas y auditoría de originalidad.',
    },
    workspace: {
      badge: 'Estación de Trabajo Analítica',
      title: 'Auditor de Hechos Atómicos & Information Gain',
      subtitle:
        'Inserte o cargue su corpus base a la izquierda y analice el documento candidato a la derecha para calcular la ganancia marginal de información.',
      modeWriter: 'Estudio del Redactor',
      modeClassic: 'Auditor Clásico',
      lockTitle: 'Auditor Bloqueado para Cuentas sin Créditos Activos',
      lockDescGuest: 'Inicie sesión o regístrese para auditar textos personalizados y guardar nuevos hechos atómicos.',
      lockDescPending: 'Su registro fue guardado. Hable con Alexandre para la activación inmediata de su cuenta.',
      lockDescExpired: 'Contáctenos para renovar su plan de acceso al Auditor S-P-O.',
      btnLogin: 'Iniciar Sesión',
      btnRequestAccess: 'Solicitar Acceso',
      btnContactAlexandre: 'Activar con Alexandre',
    },
    baseline: {
      title: 'Línea Base de Conocimiento',
      subtitle: 'Corpus histórico canónico para comparación de novedad',
      clearBase: 'Limpiar Base',
      ontologyBadge: 'Ontología #01',
      tabDoc: 'Insertar documento base',
      tabFacts: 'Hechos indexados',
      docCounter: 'caracteres de corpus base',
      placeholder: 'Pegue aquí el texto de los artículos competidores de la SERP o consenso de mercado...',
      importFile: 'Importar .txt / .md',
      btnExtract: 'Extraer hechos a la base',
      btnExtracting: 'Extrayendo tripletes S-P-O...',
      extractedBadge: 'Hechos Atómicos Mapeados',
      indexedTriplets: 'Tripletes Canónicos Indexados',
      searchPlaceholder: 'Buscar por sujeto, predicado u objeto...',
      confidence: 'Confianza',
      noFactsFound: 'No se encontraron hechos con este filtro.',
      showingFacts: 'Mostrando {count} de {total} hechos atómicos validados en la ontología.',
    },
    candidate: {
      title: 'Nuevo Documento para Auditoría',
      subtitle: 'Texto candidato para medición de novedad y ganancia marginal',
      clearBtn: 'Limpiar',
      statsChar: 'carac.',
      statsWord: 'pal.',
      placeholder: 'Pegue aquí el artículo, borrador, documentación o texto para auditar frente a la base...',
      btnAnalyze: 'Calcular Ganancia de Información & Descomponer Hechos',
      btnAnalyzing: 'Calculando divergencia y ganancia de información...',
      resetAllQuick: 'Reinicio General',
    },
    comparisonBalance: {
      title: 'Balance Comparativo de Information Gain',
      subtitle: 'Relación directa entre la Base Canónica de Conocimiento y el Documento Evaluado (Patente US 11,354,342 B2)',
      netScoreLabel: 'SCORE NETO:',
      colBaselineTitle: 'Base de Conocimiento Conocida',
      colBaselineSub: 'Regla factual preexistente en el dominio',
      colCandidateTitle: 'Nuevo Documento Evaluado',
      colCandidateSub: 'Proposiciones extraídas del texto analizado',
      colNetTitle: 'Balance Neto de Ineditismo',
      colNetSub: 'Distribución relativa de autoridad marginal',
      factsMapped: 'Hechos Atómicos Mapeados',
      totalEvaluated: 'Proposiciones en el Artículo',
      redundancyRate: 'Índice de Redundancia Factual',
      informationGainRate: 'Ganancia Marginal Efectiva',
      marginalCoverage: 'Cobertura Factual Exclusiva',
    },
    metrics: {
      generalScore: 'Puntaje General de Ganancia de Información',
      highGain: 'ALTA GANANCIA',
      mediumGain: 'MEDIA GANANCIA',
      lowGain: 'BAJA GANANCIA',
      newFacts: 'Hechos Nuevos (Exclusivos)',
      newFactsDesc: 'Proposiciones inéditas ausentes en el corpus de consenso de los competidores.',
      incrementalFacts: 'Hechos Incrementales (Profundización)',
      incrementalFactsDesc: 'Proposiciones que cualifican, refinan o agregan nuevo contexto al consenso existente.',
      redundantFacts: 'Hechos Redundantes (Consenso)',
      redundantFactsDesc: 'Afirmaciones que solo repiten proposiciones ya indexadas en la SERP.',
      synthesisTitle: 'Síntesis Analítica del Contenido',
      exclusivePropositionRate: 'Tasa de Proposiciones Exclusivas',
      depthGainRate: 'Tasa de Profundización Incremental',
      consensusOverlap: 'Tasa de Repetición de Consenso',
    },
    synthesis: {
      title: 'Síntesis Editorial & Recomendaciones',
      badge: 'Dictamen Ejecutivo',
      interpretationTitle: 'Interpretación Semántica de la Auditoría',
    },
    resultsViewer: {
      tabAnnotated: 'Texto Anotado & Destacados',
      tabTable: 'Tabla de Proposiciones Atómicas',
      legendNew: 'Hechos Nuevos (Inéditos)',
      legendIncremental: 'Hechos Incrementales (Profundización)',
      legendRedundant: 'Hechos Redundantes (Consenso)',
      interactiveHint: 'Haga clic en cualquier pasaje resaltado para inspeccionar la descomposición S-P-O detallada.',
      tableId: 'ID',
      tableSubject: 'Sujeto',
      tablePredicate: 'Predicado',
      tableObject: 'Objeto',
      tableClassification: 'Clasificación',
      tableScore: 'Puntaje',
      tableSimilarity: 'Similitud Coseno',
      inspectFact: 'Inspeccionar',
    },
    actionBar: {
      btnCommit: 'Agregar {count} hechos nuevos a la base conocida',
      btnCommitted: 'Hechos integrados con éxito en la ontología',
      statusCommitted: 'Base de conocimiento consolidada en {count} hechos.',
      statusElevates: 'Eleva la base a {count} hechos tras la inclusión.',
      exportMarkdown: 'Exportar Markdown',
      exportJson: 'Exportar JSON',
    },
    writerStudio: {
      badge: 'Writer Studio — Herramientas Especializadas para Redactores',
      title: 'Estudio de Redacción & Ineditismo',
      subtitle: 'Escriba sabiendo exactamente si cada párrafo añade novedad o repite el consenso de la web sobre los conceptos.',
      tagRealtime: 'Guía en Tiempo Real',
      tagDescription: 'Monitoree métricas factuales mientras redacta',
      btnTerms: 'Regla por Concepto',
      btnFluff: 'Cirujano de Relleno',
      btnCert: 'Dictamen & Certificado',
      draftTitle: 'Su Borrador Editorial en Elaboración',
      draftTerms: 'términos',
      draftChars: 'caracteres',
      draftPlaceholder: 'Comience a escribir su artículo o pegue su texto aquí para auditar si aporta valor real frente al consenso...',
      tabGaps: 'Buscador de Brechas',
      tabElevate: 'Elevador de Hechos Redundantes',
      tabFluffTab: 'Cortador de Relleno y Redundancia',
      tabBenchmark: 'Conceptos de Referencia',
      tabReport: 'Dossier Editorial Ejecutivo',
      btnGenerateReport: 'Generar Informe Ejecutivo',
      btnElevate: 'Elevar a Hecho Inédito',
      btnElevating: 'Elevando con IA...',
      elevateEmpty: '¡No se detectaron hechos redundantes! Su contenido presenta una originalidad sobresaliente.',
      originalSegment: 'Segmento Redundante Detectado:',
      suggestedRewrite: 'Sugerencia de Reescritura de Alta Ganancia:',
      btnApplyElevation: 'Aplicar Reescritura en el Documento',
      gapFinderTitle: 'Oportunidades de Contenido Inexplorado en la SERP',
      gapFinderSubtitle: 'Ángulos y proposiciones que ningún competidor abordó en profundidad.',
      btnApplyGapExample: 'Insertar Ejemplo en el Artículo',
    },
    factDetail: {
      title: 'Detalles de la Proposición Atómica',
      canonicalBadge: 'ATÓMICO CANÓNICO',
      spoFormalization: 'Formalización FTS: Triplete Atómico (S-P-O)',
      subject: 'Sujeto',
      predicate: 'Predicado',
      object: 'Objeto',
      marginalScore: 'Puntaje de Ganancia Marginal',
      cosineSimilarity: 'Similitud Coseno',
      originSnippet: 'Fragmento de Origen en el Documento',
      justification: 'Justificación Semántica de la IA',
      close: 'Cerrar',
    },
    editorialSections: {
      problem: {
        badge: 'El Diagnóstico de Mercado',
        title: 'El mar de contenido genérico y el filtro de novedad de los buscadores.',
        subtitle:
          'Más del 80% de los artículos publicados en línea solo parafrasean hechos conocidos. Los algoritmos modernos penalizan la redundancia y premian la Ganancia de Información.',
        card1Title: 'Redundancia Invisible',
        card1Desc:
          'Sin una auditoría factual, se publican artículos que repiten el 90% del corpus ya indexado, obteniendo puntajes mínimos de novedad.',
        card2Title: 'Falta de Estructura Atómica',
        card2Desc:
          'Los textos largos sin descomposición en tripletes [Sujeto-Predicado-Objeto] son difíciles de asimilar para Modelos de Lenguaje Grande y motores de respuesta.',
        card3Title: 'Desconexión con la Ontología',
        card3Desc:
          'El contenido no se comunica con la base histórica de su dominio, perdiendo la oportunidad de expandir relaciones en el grafo semántico.',
      },
      benefits: {
        badge: 'Ventaja Competitiva',
        title: 'Principales Beneficios de Information Gain',
        subtitle: 'El modelo matemático de la patente US 11,354,342 B2 aplicado a la creación y auditoría de contenido.',
        b1Tag: '01 • Innovación Factual',
        b1Title: 'Novedad Demostrable',
        b1Desc: 'Mida matemáticamente cuánto conocimiento nuevo entrega su artículo frente a los líderes de la SERP.',
        b2Tag: '02 • Resiliencia Algorítmica',
        b2Title: 'Protección ante Helpful Content',
        b2Desc: 'Proteja sus sitios de devaluaciones algorítmicas garantizando valor genuino y proposiciones propietarias.',
        b3Tag: '03 • Eficiencia Editorial',
        b3Title: 'Poda de Redundancias',
        b3Desc: 'Identifique párrafos enteros que consumen tiempo del lector sin aportar sustancia factual real.',
        b4Tag: '04 • Expansión Ontológica',
        b4Title: 'Grafo Semántico Enriquecido',
        b4Desc: 'Alimente continuamente la base de su dominio con nuevas conexiones canónicas para su reutilización.',
      },
      howItWorks: {
        badge: 'El Algoritmo de 3 Etapas',
        title: 'Cómo se Calcula el Information Gain',
        subtitle: 'Auditoría algorítmica rigurosa de originalidad y novedad factual marginal.',
        s1Num: '01',
        s1Title: 'Extracción Atómica S-P-O',
        s1Desc: 'El texto se descompone en proposiciones mínimas verificables en formato [Sujeto - Predicado - Objeto].',
        s2Num: '02',
        s2Title: 'Resolución Entitaria & Alineación',
        s2Desc: 'Cada entidad se resuelve y mapea frente a la base ontológica y el consenso de competidores.',
        s3Num: '03',
        s3Title: 'Cálculo de la Novedad Marginal',
        s3Desc: 'La distancia coseno vectorial y la probabilidad condicionada determinan el puntaje de Ganancia de Información.',
      },
      cta: {
        badge: 'Eleve la autoridad factual de su dominio',
        title: '¿Listo para elevar el estándar de su contenido?',
        subtitle:
          'Deje de simplemente escribir palabras y comience a construir una sólida autoridad semántica con relevancia matemática comprobable.',
        btnAudit: 'Auditar documento con IA ahora',
      },
      footer: {
        brand: 'Semântico — Significado y Sentido',
        rights: '© 2026 Semântico SEO. Todos los derechos reservados.',
        patentLink: 'Patente US 11,354,342 B2',
        author: 'Alexandre Rodrigues',
      },
    },
    toasts: {
      welcome: '¡Bienvenido de vuelta!',
      sessionReset: 'Sesión restaurada con éxito.',
      factsCommitted: '¡Nuevos hechos integrados en la ontología con éxito!',
      exportMdSuccess: 'Exportación a Markdown completada.',
      exportJsonSuccess: 'Exportación a JSON completada.',
      errorAudit: 'Error al procesar la auditoría. Intente nuevamente.',
      loginRequired: 'Acceso restringido. Inicie sesión para continuar.',
      quotaExceeded: 'Créditos insuficientes para una nueva auditoría.',
      allReset: 'Se han reiniciado todos los campos.',
    },
    common: {
      loading: 'Cargando...',
      success: 'Éxito',
      error: 'Error',
      close: 'Cerrar',
      copy: 'Copiar',
      copied: '¡Copiado!',
      cancel: 'Cancelar',
      save: 'Guardar',
    },
  },
};

const STORAGE_UI_LANG_KEY = 'semantico_ui_lang';

export function getInitialUiLang(): SupportedLang {
  try {
    const saved = localStorage.getItem(STORAGE_UI_LANG_KEY);
    if (saved === 'pt' || saved === 'en' || saved === 'es') {
      return saved;
    }
    const navLang = navigator.language?.toLowerCase() || '';
    if (navLang.startsWith('es')) return 'es';
    if (navLang.startsWith('en')) return 'en';
  } catch (e) {
    console.error('Erro ao obter uiLang inicial:', e);
  }
  return 'pt';
}

export function saveStoredUiLang(lang: SupportedLang): void {
  try {
    localStorage.setItem(STORAGE_UI_LANG_KEY, lang);
  } catch (e) {
    console.error('Erro ao salvar uiLang:', e);
  }
}

export function getTranslations(lang?: SupportedLang | string): Translations {
  if (lang === 'en') return TRANSLATIONS.en;
  if (lang === 'es') return TRANSLATIONS.es;
  return TRANSLATIONS.pt;
}

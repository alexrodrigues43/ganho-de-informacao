import { AtomicFact, GainAnalysisResponse } from '../types';

export const DEFAULT_BASELINE_DOC = `Uma ontologia formal de recuperação de informação define explicitamente classes, axiomas matemáticos e relações direcionadas entre conceitos em um domínio específico. Mecanismos de busca algorítmicos utilizam grafos de conhecimento estruturados para desambiguar intenções de pesquisa e mapear o relacionamento entre entidades nomeadas.

Fatos atômicos funcionam como proposições semânticas indivisíveis compostas estritamente pelo tripleto Sujeito-Predicado-Objeto (S-P-O). Quando múltiplos documentos abordam o mesmo tópico, a redundância ocorre se o predicado extraído compartilha o mesmo valor de verdade e referência dimensional com nós previamente indexados no índice canônico. O cálculo básico de relevância semântica utiliza divergência de Kullback-Leibler sobre distribuições de probabilidade de termos já conhecidos.`;

export const DEFAULT_KNOWN_FACTS: AtomicFact[] = [
  {
    id: 'FACT-001',
    sujeito: 'Ontologia formal',
    predicado: 'define',
    objeto: 'Classes e axiomas matemáticos',
    confianca: 0.992,
    trecho_origem: 'Uma ontologia formal de recuperação de informação define explicitamente classes, axiomas matemáticos...'
  },
  {
    id: 'FACT-002',
    sujeito: 'Mecanismos de busca',
    predicado: 'utilizam',
    objeto: 'Grafos de conhecimento para desambiguação',
    confianca: 0.987,
    trecho_origem: 'Mecanismos de busca algorítmicos utilizam grafos de conhecimento estruturados para desambiguar intenções...'
  },
  {
    id: 'FACT-003',
    sujeito: 'Fatos atômicos',
    predicado: 'consistem em',
    objeto: 'Tripletos indivisíveis S-P-O',
    confianca: 0.996,
    trecho_origem: 'Fatos atômicos funcionam como proposições semânticas indivisíveis compostas estritamente pelo tripleto Sujeito-Predicado-Objeto...'
  },
  {
    id: 'FACT-004',
    sujeito: 'Relevância semântica baseline',
    predicado: 'calcula',
    objeto: 'Divergência de Kullback-Leibler',
    confianca: 0.961,
    trecho_origem: 'O cálculo básico de relevância semântica utiliza divergência de Kullback-Leibler sobre distribuições...'
  },
  {
    id: 'FACT-005',
    sujeito: 'Redundância factual',
    predicado: 'emerge de',
    objeto: 'Predicado idêntico e mesmo valor canônico',
    confianca: 0.958,
    trecho_origem: 'a redundância ocorre se o predicado extraído compartilha o mesmo valor de verdade e referência dimensional...'
  },
  {
    id: 'FACT-006',
    sujeito: 'Classes ontológicas',
    predicado: 'estruturam',
    objeto: 'Relações direcionadas de domínio',
    confianca: 0.974,
    trecho_origem: 'relações direcionadas entre conceitos em um domínio específico'
  },
  {
    id: 'FACT-007',
    sujeito: 'Grafos de conhecimento',
    predicado: 'mapeiam',
    objeto: 'Relacionamento entre entidades nomeadas',
    confianca: 0.981,
    trecho_origem: 'mapear o relacionamento entre entidades nomeadas'
  },
  {
    id: 'FACT-008',
    sujeito: 'Proposições semânticas',
    predicado: 'possuem propriedade de',
    objeto: 'Indivisibilidade analítica',
    confianca: 0.965,
    trecho_origem: 'proposições semânticas indivisíveis'
  },
  {
    id: 'FACT-009',
    sujeito: 'Índice canônico',
    predicado: 'armazena',
    objeto: 'Nós conceituais pré-validados',
    confianca: 0.953,
    trecho_origem: 'nós previamente indexados no índice canônico'
  },
  {
    id: 'FACT-010',
    sujeito: 'Distribuições de probabilidade',
    predicado: 'representam',
    objeto: 'Ocorrência estatística de termos',
    confianca: 0.948,
    trecho_origem: 'distribuições de probabilidade de termos já conhecidos'
  },
  {
    id: 'FACT-011',
    sujeito: 'Intenções de pesquisa',
    predicado: 'são resolvidas por',
    objeto: 'Desambiguação contextual de grafos',
    confianca: 0.979,
    trecho_origem: 'desambiguar intenções de pesquisa'
  },
  {
    id: 'FACT-012',
    sujeito: 'Valor de verdade',
    predicado: 'determina',
    objeto: 'Validação da proposição atômica',
    confianca: 0.962,
    trecho_origem: 'compartilha o mesmo valor de verdade'
  },
  {
    id: 'FACT-013',
    sujeito: 'Domínio ontológico específico',
    predicado: 'delimita',
    objeto: 'Espaço de recuperação da informação',
    confianca: 0.971,
    trecho_origem: 'conceitos em um domínio específico'
  },
  {
    id: 'FACT-014',
    sujeito: 'Tripleto S-P-O',
    predicado: 'formaliza',
    objeto: 'Unidade mínima de conhecimento verificável',
    confianca: 0.995,
    trecho_origem: 'compostas estritamente pelo tripleto Sujeito-Predicado-Objeto (S-P-O)'
  }
];

export const DEFAULT_CANDIDATE_DOC = `Impacto de Modelos de Linguagem e Information Gain no SEO Moderno:

A transição de algoritmos puramente lexicais para mecanismos avaliadores de Ganho de Informação estabelece um novo padrão competitivo. Mecanismos de busca algorítmicos utilizam Knowledge Graph para desambiguação de entidades, mas hoje calculam adicionalmente o ganho marginal de cada URL perante a jornada cumulativa do usuário. A indexação vetorial de proposições atômicas permite mensurar a entropia condicional de um novo conteúdo sem depender de termos literais.

Modelos neurais particionam parágrafos densos em micro-fatos triplos. Se um artigo repete que uma ontologia formal define classes e axiomas computáveis, a recompensa do Information Gain Score é zero.

Em contrapartida, quando o documento introduz métricas quantificáveis de Jensen-Shannon Divergence e propõe o cálculo de compressão semântica via Kolmogorov Complexity aplicada a textos, o motor atribui prioridade de rankeamento pelo acréscimo de novidade estocástica factual real.`;

export const DEFAULT_ANALYSIS_RESULT: GainAnalysisResponse = {
  acao: 'analisar_ganho',
  score_geral: 0.78,
  classificacao_geral: 'ALTO GANHO',
  fatos_novos_count: 8,
  fatos_novos_pct: 57,
  fatos_incrementais_count: 4,
  fatos_incrementais_pct: 29,
  fatos_redundantes_count: 2,
  fatos_redundantes_pct: 14,
  sintese_analitica: 'O documento submetido demonstra alto valor informacional líquido com 57% de proposições atômicas inéditas perante a base canônica. Há forte divergência simétrica Jensen-Shannon contra o corpus anterior, especialmente no aprofundamento de indexação vetorial voltada à mensuração de entropia condicional e na introdução do framework de complexidade de Kolmogorov para punição de paráfrases. As redundâncias identificadas (14%) restringem-se à contextualização de axiomas formais, mantendo o ruído estrutural reduzido.',
  html_anotado: `<h3 class="font-headline font-bold text-base mb-4 not-italic font-sans">Impacto de Modelos de Linguagem e Information Gain no SEO Moderno</h3>
<p class="mb-4">A transição de algoritmos puramente lexicais para mecanismos avaliadores de Ganho de Informação estabelece um novo padrão competitivo. <span class="fact-redundant px-1 py-0.5 rounded cursor-pointer text-xs" data-fact-id="CAND-001" title="Fato Redundante: Ontologias e grafos para desambiguação | Já na base">Mecanismos de busca algorítmicos utilizam Knowledge Graph para desambiguação de entidades</span>, <span class="fact-incremental px-1.5 py-0.5 rounded cursor-pointer font-medium" data-fact-id="CAND-002" title="Fato Incremental: Avaliação do ganho marginal na jornada | Score: 0.65">mas hoje calculam adicionalmente o ganho marginal de cada URL perante a jornada cumulativa do usuário</span>.</p>
<p class="mb-4"><span class="fact-new px-1.5 py-0.5 rounded cursor-pointer font-medium" data-fact-id="CAND-003" title="Fato Novo: Indexação vetorial para entropia condicional | Score: 0.94">A indexação vetorial de proposições atômicas permite mensurar a entropia condicional de um novo conteúdo</span> sem depender de termos literais. <span class="fact-new px-1.5 py-0.5 rounded cursor-pointer font-medium" data-fact-id="CAND-004" title="Fato Novo: Modelos neurais particionando parágrafos em tripletos | Score: 0.88">Modelos neurais particionam parágrafos densos em micro-fatos triplos</span>. Se um artigo repete que <span class="fact-redundant px-1 py-0.5 rounded cursor-pointer text-xs" data-fact-id="CAND-005" title="Fato Redundante: Ontologia formal define classes e axiomas | Já na base">uma ontologia formal define classes e axiomas computáveis</span>, a recompensa do Information Gain Score é zero.</p>
<p>Em contrapartida, quando o documento <span class="fact-incremental px-1.5 py-0.5 rounded cursor-pointer font-medium" data-fact-id="CAND-006" title="Fato Incremental: Introdução de Jensen-Shannon Divergence | Score: 0.72">introduz métricas quantificáveis de Jensen-Shannon Divergence</span> e propõe <span class="fact-new px-1.5 py-0.5 rounded cursor-pointer font-medium" data-fact-id="CAND-007" title="Fato Novo: Kolmogorov Complexity para punição de paráfrases | Score: 0.99">o cálculo de compressão semântica via Kolmogorov Complexity aplicada a textos</span>, o motor atribui prioridade de rankeamento pelo acréscimo de novidade estocástica factual real.</p>`,
  fatos_analisados: [
    {
      id: 'CAND-003',
      sujeito: 'Indexação vetorial',
      predicado: 'mensura',
      objeto: 'Entropia condicional de conteúdo',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.19 (Distante)',
      score_marginal: 0.94,
      justificativa: 'Conceito de entropia aplicada a vetores de embedding não constava no baseline.',
      trecho_origem: 'A indexação vetorial de proposições atômicas permite mensurar a entropia condicional de um novo conteúdo'
    },
    {
      id: 'CAND-004',
      sujeito: 'Modelos neurais',
      predicado: 'particionam',
      objeto: 'Micro-fatos triplos indivisíveis',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.31 (Baixa)',
      score_marginal: 0.88,
      justificativa: 'Adiciona mecânica procedural de LLM dividindo parágrafos em tuplas indivisíveis.',
      trecho_origem: 'Modelos neurais particionam parágrafos densos em micro-fatos triplos.'
    },
    {
      id: 'CAND-007',
      sujeito: 'Compressão semântica',
      predicado: 'é avaliada por',
      objeto: 'Kolmogorov Complexity',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.12 (Nova)',
      score_marginal: 0.99,
      justificativa: 'Adição de modelo de complexidade algorítmica para punir paráfrases e recompensar novidade.',
      trecho_origem: 'o cálculo de compressão semântica via Kolmogorov Complexity aplicada a textos'
    },
    {
      id: 'CAND-008',
      sujeito: 'Motor de busca semântico',
      predicado: 'atribui prioridade por',
      objeto: 'Acréscimo de novidade estocástica factual',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.24 (Baixa)',
      score_marginal: 0.91,
      justificativa: 'Formalização de recompensa algorítmica baseada em ganho estocástico factual.',
      trecho_origem: 'o motor atribui prioridade de rankeamento pelo acréscimo de novidade estocástica factual real'
    },
    {
      id: 'CAND-009',
      sujeito: 'Transição algorítmica',
      predicado: 'substitui métodos puramente lexicais por',
      objeto: 'Mecanismos avaliadores de Information Gain',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.28 (Baixa)',
      score_marginal: 0.86,
      justificativa: 'Contraste paradigmático entre correspondência lexical e ganho informacional.',
      trecho_origem: 'A transição de algoritmos puramente lexicais para mecanismos avaliadores de Ganho de Informação estabelece um novo padrão'
    },
    {
      id: 'CAND-010',
      sujeito: 'Proposições atômicas',
      predicado: 'dispensam',
      objeto: 'Correspondência literal de termos',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.22 (Baixa)',
      score_marginal: 0.89,
      justificativa: 'Isolamento semântico contra restrições de termos literais.',
      trecho_origem: 'sem depender de termos literais'
    },
    {
      id: 'CAND-011',
      sujeito: 'Parágrafos densos',
      predicado: 'são decompostos em',
      objeto: 'Micro-proposições vetoriais discretas',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.29 (Baixa)',
      score_marginal: 0.87,
      justificativa: 'Detalhamento do particionamento estruturado pré-indexação.',
      trecho_origem: 'particionam parágrafos densos em micro-fatos triplos'
    },
    {
      id: 'CAND-012',
      sujeito: 'Recompensa de ganho informacional',
      predicado: 'resulta em zero para',
      objeto: 'Repetição de conceitos já conhecidos',
      classificacao: 'NOVO',
      similaridade_cosseno: '0.33 (Moderada)',
      score_marginal: 0.85,
      justificativa: 'Mapeamento explícito da penalidade de zero gain para tautologias.',
      trecho_origem: 'a recompensa do Information Gain Score é zero'
    },
    {
      id: 'CAND-002',
      sujeito: 'Algoritmos de busca',
      predicado: 'calculam adicionalmente',
      objeto: 'Ganho marginal por URL na jornada do usuário',
      classificacao: 'INCREMENTAL',
      similaridade_cosseno: '0.68 (Moderada)',
      score_marginal: 0.65,
      justificativa: 'Expande a noção conhecida de Knowledge Graph para incluir sessão dinâmica e jornada cumulativa.',
      trecho_origem: 'mas hoje calculam adicionalmente o ganho marginal de cada URL perante a jornada cumulativa do usuário'
    },
    {
      id: 'CAND-006',
      sujeito: 'Métrica de ganho semântico',
      predicado: 'emprega',
      objeto: 'Jensen-Shannon Divergence quantificável',
      classificacao: 'INCREMENTAL',
      similaridade_cosseno: '0.74 (Alta)',
      score_marginal: 0.72,
      justificativa: 'Substitui matematicamente a divergência Kullback-Leibler por forma simétrica e finita.',
      trecho_origem: 'introduz métricas quantificáveis de Jensen-Shannon Divergence'
    },
    {
      id: 'CAND-013',
      sujeito: 'Knowledge Graph',
      predicado: 'incorpora dimensão de',
      objeto: 'Histórico cumulativo de consultas do usuário',
      classificacao: 'INCREMENTAL',
      similaridade_cosseno: '0.62 (Moderada)',
      score_marginal: 0.58,
      justificativa: 'Evolui os nós de entidades estáticos para consideração de estado temporal.',
      trecho_origem: 'perante a jornada cumulativa do usuário'
    },
    {
      id: 'CAND-014',
      sujeito: 'Valoração de URLs',
      predicado: 'pondera',
      objeto: 'Taxa de novidade factual perante o corpus',
      classificacao: 'INCREMENTAL',
      similaridade_cosseno: '0.59 (Moderada)',
      score_marginal: 0.61,
      justificativa: 'Refinamento operacional do ranqueamento com base no ganho marginal.',
      trecho_origem: 'o motor atribui prioridade de rankeamento pelo acréscimo de novidade'
    },
    {
      id: 'CAND-001',
      sujeito: 'Mecanismos de busca',
      predicado: 'utilizam Knowledge Graph para',
      objeto: 'Desambiguação de entidades',
      classificacao: 'REDUNDANTE',
      similaridade_cosseno: '0.96 (Quase Idêntica)',
      score_marginal: 0.02,
      justificativa: 'Sobreposição estrita com #FACT-002 previamente cadastrado no sistema.',
      trecho_origem: 'Mecanismos de busca algorítmicos utilizam Knowledge Graph para desambiguação de entidades'
    },
    {
      id: 'CAND-005',
      sujeito: 'Ontologia formal',
      predicado: 'define',
      objeto: 'Classes e axiomas computáveis',
      classificacao: 'REDUNDANTE',
      similaridade_cosseno: '0.94 (Quase Idêntica)',
      score_marginal: 0.04,
      justificativa: 'Paráfrase direta de #FACT-001 presente no baseline canônico.',
      trecho_origem: 'uma ontologia formal define classes e axiomas computáveis'
    }
  ]
};

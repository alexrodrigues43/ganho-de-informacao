export type FactClassification = 'NOVO' | 'INCREMENTAL' | 'REDUNDANTE';

export interface AtomicFact {
  id: string;
  sujeito: string;
  predicado: string;
  objeto: string;
  confianca?: number;
  trecho_origem?: string;
  classificacao?: FactClassification;
  similaridade_cosseno?: string | number;
  score_marginal?: number;
  justificativa?: string;
}

export interface ConsolidatedMetrics {
  score_geral: number;
  classificacao_geral: 'ALTO GANHO' | 'MÉDIO GANHO' | 'BAIXO GANHO';
  fatos_novos_count: number;
  fatos_novos_pct: number;
  fatos_incrementais_count: number;
  fatos_incrementais_pct: number;
  fatos_redundantes_count: number;
  fatos_redundantes_pct: number;
}

export interface GainAnalysisResponse extends ConsolidatedMetrics {
  acao: 'analisar_ganho';
  sintese_analitica: string;
  html_anotado: string;
  fatos_analisados: AtomicFact[];
}

export interface BaselineExtractResponse {
  acao: 'extrair_baseline';
  total_fatos: number;
  fatos: AtomicFact[];
}

// -------------------------------------------------------------
// Interfaces Especializadas para Redatores e Criadores de Conteúdo
// -------------------------------------------------------------

export interface InformationGap {
  id: string;
  termo_relacionado: string;
  angulo_sugerido: string;
  tipo: 'LACUNA_CONCORRENTE' | 'ANGULO_INEDITO' | 'DADOS_QUANTITATIVOS';
  explicacao: string;
  exemplo_proposicao: string;
}

export interface ElevationSuggestion {
  factId: string;
  trecho_original: string;
  fato_original: {
    sujeito: string;
    predicado: string;
    objeto: string;
  };
  sugestao_reescrita: string;
  novo_predicado: string;
  novo_objeto: string;
  classificacao_esperada: 'INCREMENTAL' | 'NOVO';
  score_estimado: number;
  estrategia: string;
}

export interface FluffItem {
  id: string;
  trecho_original: string;
  total_termos: number;
  grau_redundancia: 'CRÍTICA' | 'MODERADA';
  motivo_corte: string;
  versao_sintetizada: string;
  economia_termos_pct: number;
}

export interface EditorialReportData {
  titulo_documento: string;
  termo_principal: string;
  data_auditoria: string;
  auditor_nome: string;
  score_geral: number;
  classificacao_geral: string;
  taxa_conteudo_exclusivo: number;
  taxa_consenso_mercado: number;
  total_proposicoes_auditadas: number;
  fatos_novos: AtomicFact[];
  fatos_incrementais: AtomicFact[];
  lacunas_atendidas: string[];
}

export interface SavedBaseline {
  id?: string;
  termo: string;
  titulo: string;
  total_fatos: number;
  fatos: AtomicFact[];
  documento_origem?: string;
  criado_em: string;
  autor_email?: string;
}

export type ThemeMode = 'dark' | 'light';

export type UserRole = 'admin' | 'client';
export type UserStatus = 'active' | 'pending' | 'blocked' | 'expired';
export type UserPlan = 'trial' | 'monthly' | 'annual' | 'lifetime';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  status: UserStatus;
  plan?: UserPlan;
  expiresAt?: string | null;
  createdAt: string;
  notes?: string;
  auditsCount?: number;
}

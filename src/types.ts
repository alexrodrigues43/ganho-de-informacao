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

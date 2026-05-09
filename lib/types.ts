export type LeadSource = "meta" | "google" | "organico" | "indicacao";

export type LeadStatus =
  | "novo"
  | "em_atendimento"
  | "qualificado"
  | "convertido"
  | "perdido";

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  source: LeadSource;
  campanha?: string;
  conjunto?: string;
  anuncio?: string;
  status: LeadStatus;
  valorConversao?: number;
  produto?: string;
  mensagemInicial?: string;
  agenteIA?: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface AdSpend {
  data: string; // ISO date YYYY-MM-DD
  meta: number;
  google: number;
}

export interface CampaignMetric {
  id: string;
  nome: string;
  plataforma: "meta" | "google";
  gasto: number;
  resultados: number;
  alcance: number;
  impressoes: number;
  cliques: number;
  cpl: number;
  cplMql: number;
}

export interface DashboardMetrics {
  gastoTotal: number;
  resultados: number;
  alcance: number;
  impressoes: number;
  cliques: number;
  cpm: number;
  ctr: number;
  cpc: number;
  cpl: number;
  cplMql: number;
  leadsTotal: number;
  leadsMeta: number;
  leadsGoogle: number;
  leadsOrganico: number;
  leadsIndicacao: number;
  qualificados: number;
  convertidos: number;
  perdidos: number;
  emAtendimento: number;
  taxaConversao: number;
  taxaQualificacao: number;
  ticketMedio: number;
  receitaTotal: number;
  roas: number;
}

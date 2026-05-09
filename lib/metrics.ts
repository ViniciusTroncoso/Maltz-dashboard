import type { CampaignMetric, DashboardMetrics, Lead } from "./types";

export function computeMetrics(
  leads: Lead[],
  campaigns: CampaignMetric[],
): DashboardMetrics {
  const totals = campaigns.reduce(
    (acc, c) => {
      acc.gasto += c.gasto;
      acc.resultados += c.resultados;
      acc.alcance += c.alcance;
      acc.impressoes += c.impressoes;
      acc.cliques += c.cliques;
      return acc;
    },
    { gasto: 0, resultados: 0, alcance: 0, impressoes: 0, cliques: 0 },
  );

  const leadsMeta = leads.filter((l) => l.source === "meta").length;
  const leadsGoogle = leads.filter((l) => l.source === "google").length;
  const leadsOrganico = leads.filter((l) => l.source === "organico").length;
  const leadsIndicacao = leads.filter((l) => l.source === "indicacao").length;

  const novos = leads.filter((l) => l.status === "novo").length;
  const emAtendimento = leads.filter((l) => l.status === "em_atendimento").length;
  const qualificados = leads.filter((l) => l.status === "qualificado").length;
  const convertidos = leads.filter((l) => l.status === "convertido").length;
  const perdidos = leads.filter((l) => l.status === "perdido").length;

  const receitaTotal = leads
    .filter((l) => l.status === "convertido" && l.valorConversao)
    .reduce((s, l) => s + (l.valorConversao || 0), 0);

  const ticketMedio = convertidos > 0 ? receitaTotal / convertidos : 0;
  const taxaConversao = leads.length > 0 ? convertidos / leads.length : 0;
  const taxaQualificacao =
    leads.length > 0 ? (qualificados + convertidos) / leads.length : 0;

  const cpm = totals.impressoes > 0 ? (totals.gasto / totals.impressoes) * 1000 : 0;
  const ctr = totals.impressoes > 0 ? totals.cliques / totals.impressoes : 0;
  const cpc = totals.cliques > 0 ? totals.gasto / totals.cliques : 0;
  const cpl = totals.resultados > 0 ? totals.gasto / totals.resultados : 0;
  const mqlCount = qualificados + convertidos;
  const cplMql = mqlCount > 0 ? totals.gasto / mqlCount : 0;
  const roas = totals.gasto > 0 ? receitaTotal / totals.gasto : 0;

  return {
    gastoTotal: totals.gasto,
    resultados: totals.resultados,
    alcance: totals.alcance,
    impressoes: totals.impressoes,
    cliques: totals.cliques,
    cpm,
    ctr,
    cpc,
    cpl,
    cplMql,
    leadsTotal: leads.length,
    leadsMeta,
    leadsGoogle,
    leadsOrganico,
    leadsIndicacao,
    qualificados,
    convertidos,
    perdidos,
    emAtendimento: emAtendimento + novos,
    taxaConversao,
    taxaQualificacao,
    ticketMedio,
    receitaTotal,
    roas,
  };
}

export function fmtBRL(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

export function fmtNumber(n: number) {
  return new Intl.NumberFormat("pt-BR").format(Math.round(n));
}

export function fmtPct(n: number, digits = 2) {
  return `${(n * 100).toFixed(digits)}%`;
}

export function fmtCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return fmtNumber(n);
}

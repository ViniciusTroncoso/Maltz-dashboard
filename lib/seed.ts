import type { AdSpend, CampaignMetric, Lead, LeadSource, LeadStatus } from "./types";

function daysAgoISO(days: number, hoursOffset = 0) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hoursOffset, Math.floor(Math.random() * 60), 0, 0);
  return d.toISOString();
}

const nomes = [
  "Lucas Pereira", "Marina Costa", "Rafael Almeida", "Beatriz Souza",
  "Pedro Henrique", "Juliana Ramos", "Thiago Mendes", "Camila Ferreira",
  "Bar do Léo", "Quiosque Praia Linda", "Restaurante Mareh", "Bruno Nogueira",
  "Aline Carvalho", "Diego Martins", "Letícia Barros", "Quiosque do Tota",
  "André Vasconcelos", "Patrícia Lima", "Felipe Rocha", "Carolina Dias",
  "Bar 25 Niterói", "Marcos Vinícius", "Renata Pacheco", "Restaurante Boteco do Mar",
];

const produtos = [
  "Chopeira Express 30L",
  "Chopeira Express 50L",
  "Barril Pilsen 30L",
  "Barril Pilsen 50L",
  "Barril de Vinho 30L",
  "Combo Festa (chopeira + 2 barris)",
  "Aluguel B2B mensal",
];

const campanhas = [
  "MALTZ_BR_Eventos_Conv",
  "MALTZ_BR_B2B_Lead",
  "MALTZ_BR_Festas_Conv",
  "MALTZ_BR_Search_Chopeira",
  "MALTZ_BR_Performance_Max",
];

const conjuntos = [
  "Niterói + 25km", "Praia + Eventos", "Donos de Bar 25-55", "Festas Particulares",
  "Lookalike Clientes", "Remarketing Site",
];

const anuncios = [
  "Video_Servimos_Festa_15s", "Carrossel_Combos", "Imagem_Chopeira_Pronta",
  "Video_Bastidores_Praia_30s", "Imagem_B2B_Bar", "Video_Depoimento_Cliente",
];

const sources: LeadSource[] = ["meta", "meta", "meta", "google", "google", "organico", "indicacao"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function seedLeads(): Lead[] {
  const leads: Lead[] = [];
  // Generate 60 leads spread across last 30 days
  for (let i = 0; i < 60; i++) {
    const source = pick(sources);
    const daysAgo = Math.floor(Math.random() * 30);
    const status = pickStatus(daysAgo);
    const valorConversao =
      status === "convertido"
        ? Math.round((300 + Math.random() * 1200) * 100) / 100
        : undefined;

    const fromMeta = source === "meta";
    const fromGoogle = source === "google";

    leads.push({
      id: `ld_${(1000 + i).toString(36)}_${Date.now() + i}`,
      nome: pick(nomes),
      telefone: `+5521${Math.floor(900000000 + Math.random() * 99999999)}`,
      source,
      campanha: fromMeta || fromGoogle ? pick(campanhas) : undefined,
      conjunto: fromMeta ? pick(conjuntos) : undefined,
      anuncio: fromMeta ? pick(anuncios) : undefined,
      status,
      valorConversao,
      produto: status !== "novo" ? pick(produtos) : undefined,
      mensagemInicial: pick([
        "Oi, quero alugar uma chopeira pro fim de semana",
        "Bom dia, atendem em São Gonçalo?",
        "Vocês entregam barril de chopp pilsen?",
        "Quero um orçamento pra evento de 80 pessoas",
        "Sou dono de bar, tem condição B2B?",
        "Chopp de vinho ainda tem disponível?",
        "Quanto fica chopeira + 2 barris?",
        "Preciso urgente pra hoje à noite, tem?",
      ]),
      agenteIA: Math.random() > 0.15,
      criadoEm: daysAgoISO(daysAgo, Math.floor(Math.random() * 12)),
      atualizadoEm: daysAgoISO(daysAgo, Math.floor(Math.random() * 6)),
    });
  }
  // Sort newest first
  leads.sort((a, b) => (a.criadoEm < b.criadoEm ? 1 : -1));
  return leads;
}

function pickStatus(daysAgo: number): LeadStatus {
  // Older leads more likely converted/lost
  const r = Math.random();
  if (daysAgo < 1) {
    if (r < 0.5) return "novo";
    if (r < 0.85) return "em_atendimento";
    return "qualificado";
  }
  if (daysAgo < 3) {
    if (r < 0.15) return "novo";
    if (r < 0.45) return "em_atendimento";
    if (r < 0.7) return "qualificado";
    if (r < 0.88) return "convertido";
    return "perdido";
  }
  if (r < 0.05) return "em_atendimento";
  if (r < 0.2) return "qualificado";
  if (r < 0.55) return "convertido";
  return "perdido";
}

export function seedAdSpend(): AdSpend[] {
  const arr: AdSpend[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    // Weekend bump
    const weekend = d.getDay() === 5 || d.getDay() === 6;
    const baseMeta = weekend ? 180 + Math.random() * 80 : 95 + Math.random() * 60;
    const baseGoogle = weekend ? 90 + Math.random() * 50 : 55 + Math.random() * 35;
    arr.push({
      data: date,
      meta: Math.round(baseMeta * 100) / 100,
      google: Math.round(baseGoogle * 100) / 100,
    });
  }
  return arr;
}

export function seedCampaigns(): CampaignMetric[] {
  return [
    {
      id: "cmp_1",
      nome: "MALTZ_BR_Eventos_Conv",
      plataforma: "meta",
      gasto: 1842.5,
      resultados: 67,
      alcance: 38420,
      impressoes: 92480,
      cliques: 1284,
      cpl: 27.5,
      cplMql: 41.86,
    },
    {
      id: "cmp_2",
      nome: "MALTZ_BR_B2B_Lead",
      plataforma: "meta",
      gasto: 920.3,
      resultados: 22,
      alcance: 14200,
      impressoes: 38900,
      cliques: 412,
      cpl: 41.83,
      cplMql: 65.74,
    },
    {
      id: "cmp_3",
      nome: "MALTZ_BR_Festas_Conv",
      plataforma: "meta",
      gasto: 1124.0,
      resultados: 48,
      alcance: 26800,
      impressoes: 71200,
      cliques: 982,
      cpl: 23.42,
      cplMql: 35.13,
    },
    {
      id: "cmp_4",
      nome: "MALTZ_BR_Search_Chopeira",
      plataforma: "google",
      gasto: 692.1,
      resultados: 34,
      alcance: 8200,
      impressoes: 15400,
      cliques: 521,
      cpl: 20.36,
      cplMql: 30.96,
    },
    {
      id: "cmp_5",
      nome: "MALTZ_BR_Performance_Max",
      plataforma: "google",
      gasto: 1085.4,
      resultados: 41,
      alcance: 32100,
      impressoes: 84200,
      cliques: 712,
      cpl: 26.47,
      cplMql: 39.83,
    },
  ];
}

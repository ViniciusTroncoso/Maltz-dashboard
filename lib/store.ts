import type { AdSpend, CampaignMetric, Lead } from "./types";
import { seedAdSpend, seedCampaigns, seedLeads } from "./seed";

// In-memory store.
// Vercel serverless functions têm FS read-only — só /tmp é gravável e mesmo
// assim por instância. Pra prototype isso resolve: o seed roda na primeira
// chamada de cada lambda e fica em memória até o cold restart.
//
// Pra produção real (n8n persistindo leads de verdade entre cold starts e
// entre múltiplas instâncias), trocar por Vercel KV, Upstash Redis ou
// Supabase. A interface do `store` foi mantida igual pra facilitar o swap.

let leadsState: Lead[] | null = null;
let spendState: AdSpend[] | null = null;
let campaignsState: CampaignMetric[] | null = null;

function ensureLeads(): Lead[] {
  if (!leadsState) leadsState = seedLeads();
  return leadsState;
}

export const store = {
  async getLeads(): Promise<Lead[]> {
    return ensureLeads();
  },
  async saveLeads(leads: Lead[]) {
    leadsState = leads;
  },
  async addLead(lead: Lead) {
    const leads = ensureLeads();
    leads.unshift(lead);
    return lead;
  },
  async updateLead(id: string, patch: Partial<Lead>): Promise<Lead | null> {
    const leads = ensureLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    leads[idx] = {
      ...leads[idx],
      ...patch,
      atualizadoEm: new Date().toISOString(),
    };
    return leads[idx];
  },
  async getAdSpend(): Promise<AdSpend[]> {
    if (!spendState) spendState = seedAdSpend();
    return spendState;
  },
  async getCampaigns(): Promise<CampaignMetric[]> {
    if (!campaignsState) campaignsState = seedCampaigns();
    return campaignsState;
  },
};

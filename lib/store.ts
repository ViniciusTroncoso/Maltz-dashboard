import { promises as fs } from "fs";
import path from "path";
import type { AdSpend, CampaignMetric, Lead } from "./types";
import { seedAdSpend, seedCampaigns, seedLeads } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SPEND_FILE = path.join(DATA_DIR, "ad-spend.json");
const CAMPAIGNS_FILE = path.join(DATA_DIR, "campaigns.json");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonOrSeed<T>(file: string, seed: T): Promise<T> {
  await ensureDir();
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(file, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
}

async function writeJson<T>(file: string, data: T) {
  await ensureDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export const store = {
  async getLeads(): Promise<Lead[]> {
    return readJsonOrSeed<Lead[]>(LEADS_FILE, seedLeads());
  },
  async saveLeads(leads: Lead[]) {
    await writeJson(LEADS_FILE, leads);
  },
  async addLead(lead: Lead) {
    const leads = await this.getLeads();
    leads.unshift(lead);
    await this.saveLeads(leads);
    return lead;
  },
  async updateLead(id: string, patch: Partial<Lead>): Promise<Lead | null> {
    const leads = await this.getLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    leads[idx] = {
      ...leads[idx],
      ...patch,
      atualizadoEm: new Date().toISOString(),
    };
    await this.saveLeads(leads);
    return leads[idx];
  },
  async getAdSpend(): Promise<AdSpend[]> {
    return readJsonOrSeed<AdSpend[]>(SPEND_FILE, seedAdSpend());
  },
  async getCampaigns(): Promise<CampaignMetric[]> {
    return readJsonOrSeed<CampaignMetric[]>(CAMPAIGNS_FILE, seedCampaigns());
  },
};

import {
  BarChart3,
  Coins,
  DollarSign,
  Eye,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { SectionTitle } from "@/components/SectionTitle";
import { LeadSourceChart } from "@/components/LeadSourceChart";
import { SpendChart } from "@/components/SpendChart";
import { ConversionFunnel } from "@/components/ConversionFunnel";
import { LeadsTable } from "@/components/LeadsTable";
import { CampaignTable } from "@/components/CampaignTable";
import { ApiPanel } from "@/components/ApiPanel";
import { store } from "@/lib/store";
import { computeMetrics, fmtBRL, fmtCompact, fmtNumber, fmtPct } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [leads, campaigns, adSpend] = await Promise.all([
    store.getLeads(),
    store.getCampaigns(),
    store.getAdSpend(),
  ]);
  const m = computeMetrics(leads, campaigns);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
        {/* Hero / Resumo */}
        <section className="fade-up mb-10">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">
                Painel principal · Últimos 30 dias
              </div>
              <h1 className="mt-2 font-display text-5xl tracking-tight text-cream lg:text-6xl">
                <span className="text-gradient-amber">Bora vender</span> mais chopp
              </h1>
              <p className="mt-3 max-w-xl text-sm text-cream/65">
                Acompanhe de onde vêm os leads (Meta vs Google), quanto cada
                campanha está custando, e como a IA do WhatsApp está convertendo
                os contatos em venda.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              <HeroStat
                label="Receita gerada"
                value={fmtBRL(m.receitaTotal)}
                hint={`${m.convertidos} vendas fechadas`}
                primary
              />
              <HeroStat
                label="ROAS"
                value={`${m.roas.toFixed(2)}x`}
                hint={`Retorno por R$ investido`}
              />
              <HeroStat
                label="Taxa de conversão"
                value={fmtPct(m.taxaConversao, 1)}
                hint={`Lead → venda`}
              />
              <HeroStat
                label="Ticket médio"
                value={fmtBRL(m.ticketMedio)}
                hint={`Receita / vendas`}
              />
            </div>
          </div>
        </section>

        {/* Métricas principais (do print, sem hook/body/connect) */}
        <section className="fade-up mb-10" style={{ animationDelay: "60ms" }}>
          <SectionTitle
            eyebrow="Performance de mídia"
            title="Métricas das campanhas"
            description="Visão geral somando Meta Ads + Google Ads. Os valores vêm das campanhas ativas no período selecionado."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <MetricCard
              label="Gasto total"
              value={fmtBRL(m.gastoTotal)}
              hint="Meta + Google"
              icon={DollarSign}
              accent="amber"
            />
            <MetricCard
              label="Resultados"
              value={fmtNumber(m.resultados)}
              hint="conversões reportadas"
              icon={Target}
              accent="amber"
            />
            <MetricCard
              label="Alcance"
              value={fmtCompact(m.alcance)}
              hint="pessoas únicas"
              icon={Eye}
              accent="amber"
            />
            <MetricCard
              label="Impressões"
              value={fmtCompact(m.impressoes)}
              hint="exibições totais"
              icon={BarChart3}
              accent="amber"
            />
            <MetricCard
              label="CPM"
              value={fmtBRL(m.cpm)}
              hint="por mil impressões"
              icon={Coins}
              accent="amber"
            />
            <MetricCard
              label="CTR"
              value={fmtPct(m.ctr, 2)}
              hint="cliques / impressões"
              icon={TrendingUp}
              accent="amber"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <MetricCard
              label="CPC"
              value={fmtBRL(m.cpc)}
              hint="custo por clique"
              icon={MousePointerClick}
              accent="ember"
            />
            <MetricCard
              label="CPL"
              value={fmtBRL(m.cpl)}
              hint="custo por lead"
              icon={Users}
              accent="ember"
            />
            <MetricCard
              label="CPL MQL"
              value={fmtBRL(m.cplMql)}
              hint="custo por lead qualificado"
              icon={Sparkles}
              accent="ember"
            />
            <MetricCard
              label="Cliques"
              value={fmtNumber(m.cliques)}
              hint="total de cliques"
              icon={Zap}
              accent="neutral"
            />
            <MetricCard
              label="Leads totais"
              value={fmtNumber(m.leadsTotal)}
              hint="entrada no WhatsApp"
              icon={MessageCircle}
              accent="neutral"
            />
            <MetricCard
              label="Vendas"
              value={fmtNumber(m.convertidos)}
              hint="fechadas no período"
              icon={Trophy}
              accent="neutral"
            />
          </div>
        </section>

        {/* Charts: Spend over time + Lead source */}
        <section className="fade-up mb-10 grid grid-cols-1 gap-5 lg:grid-cols-12" style={{ animationDelay: "120ms" }}>
          <div className="rounded-2xl border border-amber-400/15 bg-ink-800/60 p-6 lg:col-span-7">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/70">
                  Investimento diário
                </div>
                <h3 className="mt-1 font-display text-2xl tracking-wide text-cream">
                  Gasto · Meta vs Google
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <Legend color="#F5A623" label="Meta Ads" />
                <Legend color="#E63946" label="Google Ads" />
              </div>
            </div>
            <SpendChart data={adSpend} />
          </div>

          <div className="rounded-2xl border border-amber-400/15 bg-ink-800/60 p-6 lg:col-span-5">
            <div className="mb-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/70">
                Atribuição de leads
              </div>
              <h3 className="mt-1 font-display text-2xl tracking-wide text-cream">
                De onde vêm os clientes?
              </h3>
              <p className="text-xs text-cream/55">
                Cada lead que cai no WhatsApp é etiquetado pela origem antes do
                agente IA atender.
              </p>
            </div>
            <LeadSourceChart
              meta={m.leadsMeta}
              google={m.leadsGoogle}
              organico={m.leadsOrganico}
              indicacao={m.leadsIndicacao}
            />
          </div>
        </section>

        {/* Funnel + WhatsApp */}
        <section className="fade-up mb-10 grid grid-cols-1 gap-5 lg:grid-cols-12" style={{ animationDelay: "180ms" }}>
          <div className="rounded-2xl border border-amber-400/15 bg-ink-800/60 p-6 lg:col-span-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/70">
                  Funil de conversão
                </div>
                <h3 className="mt-1 font-display text-2xl tracking-wide text-cream">
                  Do anúncio até o brinde 🍻
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-[11px] font-mono text-amber-300">
                <MessageCircle className="h-3 w-3" />
                WhatsApp
              </div>
            </div>
            <ConversionFunnel m={m} />
          </div>

          <div className="rounded-2xl border border-amber-400/15 bg-ink-800/60 p-6 lg:col-span-5">
            <div className="mb-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/70">
                Atendimento
              </div>
              <h3 className="mt-1 font-display text-2xl tracking-wide text-cream">
                Agente IA · n8n
              </h3>
              <p className="text-xs text-cream/55">
                O agente recebe o lead, qualifica e dispara webhook quando vira
                MQL ou venda.
              </p>
            </div>

            <div className="space-y-3">
              <KpiRow
                label="Atendidos pela IA"
                value={fmtNumber(leads.filter((l) => l.agenteIA).length)}
                pct={
                  leads.length > 0
                    ? leads.filter((l) => l.agenteIA).length / leads.length
                    : 0
                }
              />
              <KpiRow
                label="Qualificados (MQL)"
                value={fmtNumber(m.qualificados + m.convertidos)}
                pct={m.taxaQualificacao}
              />
              <KpiRow
                label="Convertidos em venda"
                value={fmtNumber(m.convertidos)}
                pct={m.taxaConversao}
                highlight
              />
              <div className="mt-4 rounded-lg border border-amber-400/15 bg-ink-900/60 p-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-cream/45">
                  Status do agente
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 pulse-amber" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-sm font-medium text-cream">
                    Conectado · webhook pronto
                  </span>
                </div>
                <div className="mt-2 font-mono text-[11px] text-cream/55">
                  POST → /api/webhook/lead
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campanhas */}
        <section className="fade-up mb-10" style={{ animationDelay: "240ms" }}>
          <SectionTitle
            eyebrow="Drill-down"
            title="Campanhas ativas"
            description="Performance individual de cada campanha. CPL e CPL MQL são os dois números que importam de verdade pra decidir aonde colocar mais grana."
          />
          <CampaignTable campaigns={campaigns} />
        </section>

        {/* Leads table */}
        <section className="fade-up mb-10" style={{ animationDelay: "300ms" }}>
          <SectionTitle
            eyebrow="Pipeline"
            title="Leads recentes do WhatsApp"
            description="Os leads são criados automaticamente pelo agente IA via webhook. Status muda conforme a conversa avança."
          />
          <LeadsTable leads={leads} />
        </section>

        {/* API */}
        <section className="fade-up mb-12" style={{ animationDelay: "360ms" }}>
          <SectionTitle
            eyebrow="Integração"
            title="API · Conexão com n8n"
            description="Endpoints prontos pra qualquer automação no n8n consumir. Tudo JSON, sem auth pra prototype — em produção a gente coloca um token simples no header."
          />
          <ApiPanel />
        </section>

        <footer className="border-t border-amber-400/10 pt-6 pb-4 text-center text-[11px] uppercase tracking-[0.2em] text-cream/40">
          01 Maltz Niterói · Feito para brindar 🍺 · Dashboard v1.0
        </footer>
      </div>
    </main>
  );
}

function HeroStat({
  label,
  value,
  hint,
  primary,
}: {
  label: string;
  value: string;
  hint: string;
  primary?: boolean;
}) {
  return (
    <div
      className={
        primary
          ? "relative overflow-hidden rounded-xl border border-amber-400/40 bg-gradient-to-br from-amber-400/15 via-amber-400/5 to-transparent p-4 shadow-glow"
          : "relative overflow-hidden rounded-xl border border-amber-400/12 bg-ink-800/60 p-4"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
        {label}
      </div>
      <div className="mt-1.5 font-display text-2xl tracking-tight text-cream">
        {value}
      </div>
      <div className="mt-0.5 text-[11px] text-cream/55">{hint}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-cream/70">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color }}
      />
      {label}
    </div>
  );
}

function KpiRow({
  label,
  value,
  pct,
  highlight,
}: {
  label: string;
  value: string;
  pct: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-amber-400/10 bg-ink-700/40 p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-cream/80">{label}</span>
        <div className="flex items-baseline gap-2">
          <span
            className={
              highlight
                ? "font-display text-xl text-amber-300"
                : "font-display text-xl text-cream"
            }
          >
            {value}
          </span>
          <span className="font-mono text-[11px] text-cream/50">
            {fmtPct(pct, 1)}
          </span>
        </div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-900">
        <div
          className={
            highlight ? "h-full bg-amber-gradient" : "h-full bg-amber-400/50"
          }
          style={{ width: `${Math.min(Math.max(pct * 100, 2), 100)}%` }}
        />
      </div>
    </div>
  );
}

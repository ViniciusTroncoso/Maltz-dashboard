import type { Lead, LeadStatus } from "@/lib/types";
import { fmtBRL } from "@/lib/metrics";
import { timeAgo } from "@/lib/utils";
import { Bot, User } from "lucide-react";

const STATUS_LABEL: Record<LeadStatus, string> = {
  novo: "Novo",
  em_atendimento: "Em atendimento",
  qualificado: "Qualificado",
  convertido: "Convertido",
  perdido: "Perdido",
};

const STATUS_STYLE: Record<LeadStatus, string> = {
  novo: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  em_atendimento: "bg-amber-400/5 text-amber-200/80 border-amber-400/20",
  qualificado: "bg-cream/10 text-cream border-cream/20",
  convertido:
    "bg-amber-gradient text-ink-900 border-amber-400 font-semibold shadow-glow",
  perdido: "bg-ember-500/10 text-ember-400 border-ember-500/30",
};

const SOURCE_BADGE: Record<string, { label: string; cls: string }> = {
  meta: { label: "Meta", cls: "bg-amber-400/15 text-amber-300 border-amber-400/30" },
  google: {
    label: "Google",
    cls: "bg-ember-500/15 text-ember-400 border-ember-500/30",
  },
  organico: {
    label: "Orgânico",
    cls: "bg-cream/10 text-cream/70 border-cream/15",
  },
  indicacao: {
    label: "Indicação",
    cls: "bg-amber-700/20 text-amber-200/80 border-amber-700/40",
  },
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const recent = leads.slice(0, 12);
  return (
    <div className="overflow-hidden rounded-xl border border-amber-400/12 bg-ink-800/60">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-amber-400/10 text-[10px] uppercase tracking-[0.18em] text-cream/50">
              <th className="px-4 py-3 font-semibold">Lead</th>
              <th className="px-4 py-3 font-semibold">Origem</th>
              <th className="px-4 py-3 font-semibold">Campanha</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Atend.</th>
              <th className="px-4 py-3 text-right font-semibold">Ticket</th>
              <th className="px-4 py-3 text-right font-semibold">Quando</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((l) => {
              const src = SOURCE_BADGE[l.source];
              return (
                <tr
                  key={l.id}
                  className="border-b border-amber-400/5 transition-colors last:border-b-0 hover:bg-amber-400/[0.03]"
                >
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-cream">{l.nome}</div>
                    <div className="font-mono text-[11px] text-cream/45">
                      {l.telefone}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold ${src.cls}`}
                    >
                      {src.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono text-[11px] text-cream/70">
                      {l.campanha || "—"}
                    </div>
                    {l.anuncio && (
                      <div className="font-mono text-[10px] text-cream/40">
                        {l.anuncio}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] ${STATUS_STYLE[l.status]}`}
                    >
                      {STATUS_LABEL[l.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {l.agenteIA ? (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-md border border-amber-400/20 bg-ink-700 px-2 py-0.5 text-[11px] text-amber-200"
                        title="Atendido pelo agente IA via n8n"
                      >
                        <Bot className="h-3 w-3" />
                        IA
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-cream/15 bg-ink-700 px-2 py-0.5 text-[11px] text-cream/70">
                        <User className="h-3 w-3" />
                        Humano
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-cream/80">
                    {l.valorConversao ? fmtBRL(l.valorConversao) : "—"}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[11px] text-cream/55">
                    {timeAgo(l.criadoEm)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-amber-400/10 bg-ink-900/60 px-4 py-2.5 text-[11px] text-cream/50">
        <span>
          Mostrando {recent.length} de {leads.length} leads
        </span>
        <span className="font-mono">GET /api/leads</span>
      </div>
    </div>
  );
}

import { fmtNumber, fmtPct } from "@/lib/metrics";
import type { DashboardMetrics } from "@/lib/types";
import { MessageCircle, Sparkles, ThumbsUp, Trophy } from "lucide-react";

export function ConversionFunnel({ m }: { m: DashboardMetrics }) {
  const total = m.leadsTotal;
  const stages = [
    {
      label: "Lead chegou no WhatsApp",
      value: total,
      icon: MessageCircle,
      color: "from-amber-400/30 to-amber-400/10",
      barColor: "bg-amber-gradient",
    },
    {
      label: "Em atendimento (IA + humano)",
      value: m.emAtendimento + m.qualificados + m.convertidos,
      icon: Sparkles,
      color: "from-amber-400/25 to-amber-400/5",
      barColor: "bg-amber-gradient",
    },
    {
      label: "Qualificado (MQL)",
      value: m.qualificados + m.convertidos,
      icon: ThumbsUp,
      color: "from-amber-400/20 to-amber-400/5",
      barColor: "bg-amber-gradient",
    },
    {
      label: "Convertido (venda)",
      value: m.convertidos,
      icon: Trophy,
      color: "from-amber-400/40 to-ember-500/20",
      barColor: "bg-ember-gradient",
    },
  ];

  return (
    <div className="space-y-2.5">
      {stages.map((s, i) => {
        const pct = total > 0 ? (s.value / total) * 100 : 0;
        const dropFromPrev =
          i > 0 && stages[i - 1].value > 0
            ? ((stages[i - 1].value - s.value) / stages[i - 1].value) * 100
            : 0;
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-lg border border-amber-400/10 bg-ink-700/40"
          >
            <div
              className={`absolute inset-y-0 left-0 ${s.barColor} opacity-90`}
              style={{ width: `${Math.max(pct, 4)}%` }}
            />
            <div className="relative flex items-center justify-between gap-4 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-amber-400/30 bg-ink-900/70">
                  <Icon className="h-3.5 w-3.5 text-amber-300" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-cream">
                    {s.label}
                  </div>
                  {i > 0 && dropFromPrev > 0 && (
                    <div className="text-[10px] text-cream/45">
                      −{dropFromPrev.toFixed(1)}% vs etapa anterior
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-3 text-right">
                <span className="font-display text-xl text-cream">
                  {fmtNumber(s.value)}
                </span>
                <span className="font-mono text-xs text-amber-300/80">
                  {fmtPct(pct / 100, 1)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

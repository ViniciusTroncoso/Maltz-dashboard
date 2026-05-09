"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { fmtNumber } from "@/lib/metrics";

interface Props {
  meta: number;
  google: number;
  organico: number;
  indicacao: number;
}

const COLORS = {
  meta: "#F5A623",
  google: "#E63946",
  organico: "#fdebc4",
  indicacao: "#7a4c08",
};

export function LeadSourceChart({ meta, google, organico, indicacao }: Props) {
  const total = meta + google + organico + indicacao;
  const data = [
    { name: "Meta Ads", value: meta, color: COLORS.meta, key: "meta" },
    { name: "Google Ads", value: google, color: COLORS.google, key: "google" },
    { name: "Orgânico", value: organico, color: COLORS.organico, key: "organico" },
    { name: "Indicação", value: indicacao, color: COLORS.indicacao, key: "indicacao" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center">
      <div className="relative h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={100}
              paddingAngle={3}
              stroke="#0a0908"
              strokeWidth={2}
            >
              {data.map((d) => (
                <Cell key={d.key} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#121110",
                border: "1px solid rgba(245,166,35,0.25)",
                borderRadius: 8,
                color: "#f5e9d4",
                fontSize: 12,
              }}
              formatter={(v: number) => [fmtNumber(v), "leads"]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-3xl text-cream">{fmtNumber(total)}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-cream/50">
            leads totais
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((d) => {
          const pct = total > 0 ? (d.value / total) * 100 : 0;
          return (
            <div
              key={d.key}
              className="flex items-center justify-between gap-3 rounded-lg border border-amber-400/8 bg-ink-700/40 px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: d.color }}
                />
                <span className="text-sm text-cream/85">{d.name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-cream">
                  {fmtNumber(d.value)}
                </span>
                <span className="font-mono text-xs text-cream/50">
                  {pct.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

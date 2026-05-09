"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdSpend } from "@/lib/types";
import { fmtBRL } from "@/lib/metrics";

export function SpendChart({ data }: { data: AdSpend[] }) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.data + "T12:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formatted}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="metaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5A623" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#F5A623" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="googleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E63946" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#E63946" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(245,166,35,0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: "#f5e9d480", fontSize: 11 }}
            stroke="rgba(245,166,35,0.15)"
            tickMargin={8}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            tick={{ fill: "#f5e9d480", fontSize: 11 }}
            stroke="rgba(245,166,35,0.15)"
            tickFormatter={(v) => `R$${v}`}
            width={60}
          />
          <Tooltip
            contentStyle={{
              background: "#121110",
              border: "1px solid rgba(245,166,35,0.25)",
              borderRadius: 8,
              color: "#f5e9d4",
              fontSize: 12,
            }}
            labelStyle={{ color: "#F5A623", fontWeight: 600 }}
            formatter={(v: number, name: string) => [
              fmtBRL(v),
              name === "meta" ? "Meta Ads" : "Google Ads",
            ]}
          />
          <Area
            type="monotone"
            dataKey="meta"
            stroke="#F5A623"
            strokeWidth={2}
            fill="url(#metaGrad)"
          />
          <Area
            type="monotone"
            dataKey="google"
            stroke="#E63946"
            strokeWidth={2}
            fill="url(#googleGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

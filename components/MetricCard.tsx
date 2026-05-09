import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  delta?: { value: string; positive: boolean };
  icon?: LucideIcon;
  accent?: "amber" | "ember" | "neutral";
  size?: "sm" | "md" | "lg";
}

export function MetricCard({
  label,
  value,
  hint,
  delta,
  icon: Icon,
  accent = "amber",
  size = "md",
}: MetricCardProps) {
  const accentBar =
    accent === "amber"
      ? "bg-amber-gradient"
      : accent === "ember"
        ? "bg-ember-gradient"
        : "bg-cream/10";

  const accentText =
    accent === "amber"
      ? "text-amber-400"
      : accent === "ember"
        ? "text-ember-400"
        : "text-cream/70";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-amber-400/12 bg-ink-800/60 p-5 transition-all hover:border-amber-400/25 hover:bg-ink-800/80",
        size === "lg" && "p-6",
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-[2px]", accentBar)} />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-400/[0.04] blur-2xl transition-all group-hover:bg-amber-400/[0.08]" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("h-4 w-4", accentText)} strokeWidth={2} />}
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
            {label}
          </span>
        </div>
        {delta && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold",
              delta.positive
                ? "bg-amber-400/10 text-amber-300"
                : "bg-ember-500/10 text-ember-400",
            )}
          >
            {delta.positive ? "↑" : "↓"} {delta.value}
          </span>
        )}
      </div>

      <div className="relative mt-3">
        <div
          className={cn(
            "font-display tracking-tight text-cream",
            size === "lg" ? "text-4xl" : "text-3xl",
          )}
        >
          {value}
        </div>
        {hint && (
          <div className="mt-1 text-xs text-cream/50">{hint}</div>
        )}
      </div>
    </div>
  );
}

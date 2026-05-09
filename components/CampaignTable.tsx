import type { CampaignMetric } from "@/lib/types";
import { fmtBRL, fmtNumber, fmtPct } from "@/lib/metrics";

export function CampaignTable({ campaigns }: { campaigns: CampaignMetric[] }) {
  const sorted = [...campaigns].sort((a, b) => b.gasto - a.gasto);
  return (
    <div className="overflow-hidden rounded-xl border border-amber-400/12 bg-ink-800/60">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-amber-400/10 text-[10px] uppercase tracking-[0.18em] text-cream/50">
              <th className="px-4 py-3 font-semibold">Campanha</th>
              <th className="px-4 py-3 font-semibold">Plataforma</th>
              <th className="px-4 py-3 text-right font-semibold">Gasto</th>
              <th className="px-4 py-3 text-right font-semibold">Resultados</th>
              <th className="px-4 py-3 text-right font-semibold">Impressões</th>
              <th className="px-4 py-3 text-right font-semibold">CTR</th>
              <th className="px-4 py-3 text-right font-semibold">CPL</th>
              <th className="px-4 py-3 text-right font-semibold">CPL MQL</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const ctr = c.impressoes > 0 ? c.cliques / c.impressoes : 0;
              const isMeta = c.plataforma === "meta";
              return (
                <tr
                  key={c.id}
                  className="border-b border-amber-400/5 last:border-b-0 transition-colors hover:bg-amber-400/[0.03]"
                >
                  <td className="px-4 py-3.5 font-mono text-[12px] text-cream">
                    {c.nome}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={
                        isMeta
                          ? "inline-flex rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300"
                          : "inline-flex rounded-md border border-ember-500/30 bg-ember-500/10 px-2 py-0.5 text-[11px] font-semibold text-ember-400"
                      }
                    >
                      {isMeta ? "Meta" : "Google"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-cream/85">
                    {fmtBRL(c.gasto)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-cream/85">
                    {fmtNumber(c.resultados)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-cream/65">
                    {fmtNumber(c.impressoes)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-cream/65">
                    {fmtPct(ctr)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-amber-300">
                    {fmtBRL(c.cpl)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-amber-300">
                    {fmtBRL(c.cplMql)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

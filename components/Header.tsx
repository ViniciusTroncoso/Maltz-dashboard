import { MaltzLogo } from "./Logo";

export function Header() {
  return (
    <header className="relative border-b border-amber-400/15 bg-ink-900/80 backdrop-blur-md">
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="mx-auto max-w-[1600px] px-6 py-5 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/30 bg-ink-800 shadow-glow">
              <MaltzLogo size={36} />
            </div>
            <div>
              <div className="font-display text-2xl leading-none tracking-wider text-cream">
                MALTZ <span className="text-amber-400">DASHBOARD</span>
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-amber-200/60">
                Marketing & Leads · Niterói
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <PeriodPill label="Últimos 30 dias" active />
            <div className="hidden h-9 items-center gap-2 rounded-full border border-amber-400/20 bg-ink-800/80 px-4 text-xs font-medium text-amber-100/80 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 pulse-amber" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              Agente IA conectado
            </div>
            <div className="hidden h-9 items-center rounded-full border border-amber-400/20 bg-ink-800/80 px-4 text-xs font-mono text-amber-200/70 md:flex">
              n8n · webhook ativo
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function PeriodPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={
        active
          ? "h-9 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center"
          : "h-9 rounded-full border border-cream/10 bg-ink-800 px-4 text-xs font-semibold uppercase tracking-wider text-cream/60 flex items-center"
      }
    >
      {label}
    </div>
  );
}

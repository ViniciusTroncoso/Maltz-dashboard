import { Webhook, Code2, Activity } from "lucide-react";

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/webhook/lead",
    description: "Agente IA (n8n) cria um novo lead vindo do WhatsApp",
  },
  {
    method: "POST",
    path: "/api/webhook/conversion",
    description: "Atualiza status / marca conversão e valor da venda",
  },
  {
    method: "GET",
    path: "/api/leads",
    description: "Lista todos os leads (para sync ou enriquecimento)",
  },
  {
    method: "PATCH",
    path: "/api/leads/{id}",
    description: "Atualiza qualquer campo de um lead específico",
  },
  {
    method: "GET",
    path: "/api/metrics",
    description: "Métricas agregadas (campanhas + funil + receita)",
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Healthcheck — para o n8n monitorar uptime",
  },
];

export function ApiPanel() {
  return (
    <div className="rounded-xl border border-amber-400/15 bg-ink-800/60 p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/30 bg-ink-700">
            <Webhook className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-display text-xl tracking-wide text-cream">
              API · Integração n8n
            </h3>
            <p className="text-xs text-cream/55">
              Endpoints prontos pro agente de IA do WhatsApp registrar leads e conversões.
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 text-[11px] font-mono text-amber-300 lg:flex">
          <Activity className="h-3 w-3" />
          localhost:3001
        </div>
      </div>

      <div className="space-y-2">
        {ENDPOINTS.map((e) => (
          <div
            key={e.path + e.method}
            className="flex items-center gap-4 rounded-lg border border-amber-400/8 bg-ink-700/50 px-3 py-2.5 transition-colors hover:border-amber-400/20"
          >
            <span
              className={
                e.method === "GET"
                  ? "w-16 rounded-md border border-cream/20 bg-ink-800 px-2 py-1 text-center font-mono text-[10px] font-bold uppercase text-cream/80"
                  : e.method === "POST"
                    ? "w-16 rounded-md border border-amber-400/40 bg-amber-400/10 px-2 py-1 text-center font-mono text-[10px] font-bold uppercase text-amber-300"
                    : "w-16 rounded-md border border-ember-500/40 bg-ember-500/10 px-2 py-1 text-center font-mono text-[10px] font-bold uppercase text-ember-400"
              }
            >
              {e.method}
            </span>
            <code className="flex-shrink-0 font-mono text-[12px] text-cream">
              {e.path}
            </code>
            <span className="ml-auto truncate text-right text-[11px] text-cream/55">
              {e.description}
            </span>
          </div>
        ))}
      </div>

      <details className="mt-5 rounded-lg border border-amber-400/10 bg-ink-900/60">
        <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-amber-300">
          <Code2 className="h-3.5 w-3.5" />
          Exemplo de payload — POST /api/webhook/lead
        </summary>
        <pre className="overflow-x-auto px-4 pb-4 text-[11px] leading-relaxed text-cream/75">
{`curl -X POST http://localhost:3001/api/webhook/lead \\
  -H "Content-Type: application/json" \\
  -d '{
    "nome": "Lucas Pereira",
    "telefone": "+5521987654321",
    "source": "meta",
    "campanha": "MALTZ_BR_Eventos_Conv",
    "conjunto": "Niterói + 25km",
    "anuncio": "Video_Servimos_Festa_15s",
    "mensagemInicial": "Quero alugar uma chopeira pro fim de semana",
    "agenteIA": true
  }'`}
        </pre>
      </details>

      <details className="mt-2 rounded-lg border border-amber-400/10 bg-ink-900/60">
        <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-amber-300">
          <Code2 className="h-3.5 w-3.5" />
          Exemplo de payload — POST /api/webhook/conversion
        </summary>
        <pre className="overflow-x-auto px-4 pb-4 text-[11px] leading-relaxed text-cream/75">
{`curl -X POST http://localhost:3001/api/webhook/conversion \\
  -H "Content-Type: application/json" \\
  -d '{
    "leadId": "ld_abc123",
    "status": "convertido",
    "valorConversao": 580.00,
    "produto": "Chopeira Express 30L"
  }'`}
        </pre>
      </details>
    </div>
  );
}

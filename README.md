# Projeto Chopperia · Dashboard 01 Maltz Niterói

Dashboard de marketing pra Maltz Niterói — chopp e chopeiras. Mostra de onde
vêm os leads (Meta vs Google), quanto cada campanha tá custando, e como a IA
do WhatsApp tá convertendo os leads em venda. Tem API pronta pro agente do n8n.

## Stack

- **Next.js 14** (App Router) — UI + API na mesma stack
- **TypeScript + Tailwind CSS** — tipagem e design tokens da Maltz
- **Recharts** — gráficos
- **Lucide** — ícones
- **JSON file storage** em `data/` — pra prototype (depois migra pra Postgres/Supabase)

## Rodar

```bash
npm install
npm run dev
```

Abre em [http://localhost:3001](http://localhost:3001).

## API · Integração com n8n

### `POST /api/webhook/lead`
Cria lead novo. Esse é o endpoint que o agente IA do n8n chama quando alguém
manda mensagem no WhatsApp.

```bash
curl -X POST http://localhost:3001/api/webhook/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Lucas Pereira",
    "telefone": "+5521987654321",
    "source": "meta",
    "campanha": "MALTZ_BR_Eventos_Conv",
    "conjunto": "Niterói + 25km",
    "anuncio": "Video_Servimos_Festa_15s",
    "mensagemInicial": "Quero alugar uma chopeira",
    "agenteIA": true
  }'
```

`source` aceita: `meta`, `google`, `organico`, `indicacao`.

### `POST /api/webhook/conversion`
Atualiza status do lead — qualificado, convertido, perdido.

```bash
curl -X POST http://localhost:3001/api/webhook/conversion \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "ld_abc123",
    "status": "convertido",
    "valorConversao": 580.00,
    "produto": "Chopeira Express 30L"
  }'
```

`status` aceita: `novo`, `em_atendimento`, `qualificado`, `convertido`, `perdido`.

### `GET /api/leads`
Lista todos os leads.

### `PATCH /api/leads/{id}`
Atualiza qualquer campo de um lead específico.

### `GET /api/metrics`
Retorna métricas agregadas (campanhas + funil + receita).

### `GET /api/health`
Healthcheck — pro n8n monitorar uptime.

## Como conectar com o n8n

1. No fluxo do agente IA, depois de identificar a intenção do lead, adiciona
   um nó **HTTP Request** apontando pra `POST http://SEU_HOST:3001/api/webhook/lead`.
2. Mapeia `nome`, `telefone`, e `source` (Meta/Google) a partir do contexto da
   conversa ou dos parâmetros UTM da mensagem inicial do WhatsApp.
3. Salva o `lead.id` retornado em uma variável.
4. Quando o lead virar MQL ou venda, dispara `POST /api/webhook/conversion`
   com o `leadId` e o novo `status`.

## Identidade visual

- **Preto** (#000) — fundo predominante
- **Laranja/Âmbar** (#F5A623) — destaque principal (cor da Maltz digital)
- **Vermelho** (#E63946) — Google Ads e estados de erro
- **Creme** (#F5E9D4) — texto

## Estrutura

```
projeto chopperia/
├── app/
│   ├── page.tsx              # Dashboard principal
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       ├── leads/
│       ├── metrics/
│       ├── health/
│       └── webhook/
│           ├── lead/         # POST — criar lead (n8n)
│           └── conversion/   # POST — atualizar status (n8n)
├── components/
│   ├── Header.tsx
│   ├── MetricCard.tsx
│   ├── LeadSourceChart.tsx
│   ├── SpendChart.tsx
│   ├── ConversionFunnel.tsx
│   ├── LeadsTable.tsx
│   ├── CampaignTable.tsx
│   └── ApiPanel.tsx
├── lib/
│   ├── store.ts              # JSON file storage
│   ├── seed.ts               # mock data
│   ├── metrics.ts            # cálculo de métricas + formatadores
│   ├── types.ts
│   └── utils.ts
└── data/                     # leads.json, ad-spend.json, campaigns.json (gerados)
```

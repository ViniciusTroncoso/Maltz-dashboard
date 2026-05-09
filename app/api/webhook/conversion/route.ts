import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import type { LeadStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID_STATUS: LeadStatus[] = [
  "novo",
  "em_atendimento",
  "qualificado",
  "convertido",
  "perdido",
];

/**
 * POST /api/webhook/conversion
 * Endpoint pro agente de IA do n8n atualizar status / marcar conversão.
 *
 * Body esperado (JSON):
 * {
 *   "leadId": "ld_xxx",
 *   "status": "qualificado" | "convertido" | "perdido" | "em_atendimento",
 *   "valorConversao"?: 580.00,
 *   "produto"?: "Chopeira Express 30L"
 * }
 */
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { leadId, status } = body || {};
  if (!leadId || !status) {
    return NextResponse.json(
      { error: "Campos obrigatórios: leadId, status" },
      { status: 400 },
    );
  }
  if (!VALID_STATUS.includes(status)) {
    return NextResponse.json(
      { error: `status inválido. Use: ${VALID_STATUS.join(", ")}` },
      { status: 400 },
    );
  }

  const patch: Record<string, unknown> = { status };
  if (typeof body.valorConversao === "number") {
    patch.valorConversao = body.valorConversao;
  }
  if (typeof body.produto === "string") {
    patch.produto = body.produto;
  }

  const updated = await store.updateLead(leadId, patch);
  if (!updated) {
    return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, lead: updated });
}

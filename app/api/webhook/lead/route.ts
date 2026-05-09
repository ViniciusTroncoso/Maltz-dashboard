import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import type { Lead, LeadSource } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID_SOURCES: LeadSource[] = ["meta", "google", "organico", "indicacao"];

/**
 * POST /api/webhook/lead
 * Endpoint pro agente de IA do n8n criar leads novos.
 *
 * Body esperado (JSON):
 * {
 *   "nome": "Lucas Pereira",
 *   "telefone": "+5521987654321",
 *   "source": "meta" | "google" | "organico" | "indicacao",
 *   "campanha"?: "MALTZ_BR_Eventos_Conv",
 *   "conjunto"?: "Niterói + 25km",
 *   "anuncio"?: "Video_Servimos_Festa_15s",
 *   "mensagemInicial"?: "Quero alugar uma chopeira",
 *   "agenteIA"?: true
 * }
 */
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { nome, telefone, source } = body || {};
  if (!nome || !telefone || !source) {
    return NextResponse.json(
      { error: "Campos obrigatórios: nome, telefone, source" },
      { status: 400 },
    );
  }
  if (!VALID_SOURCES.includes(source)) {
    return NextResponse.json(
      { error: `source inválido. Use: ${VALID_SOURCES.join(", ")}` },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const lead: Lead = {
    id: `ld_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    nome,
    telefone,
    source,
    campanha: body.campanha,
    conjunto: body.conjunto,
    anuncio: body.anuncio,
    status: "novo",
    mensagemInicial: body.mensagemInicial,
    agenteIA: body.agenteIA ?? true,
    criadoEm: now,
    atualizadoEm: now,
  };

  await store.addLead(lead);
  return NextResponse.json({ ok: true, lead }, { status: 201 });
}

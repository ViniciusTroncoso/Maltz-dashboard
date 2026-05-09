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

export async function GET(
  _req: Request,
  ctx: { params: { id: string } },
) {
  const leads = await store.getLeads();
  const lead = leads.find((l) => l.id === ctx.params.id);
  if (!lead) {
    return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ lead });
}

export async function PATCH(
  req: Request,
  ctx: { params: { id: string } },
) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (
    typeof body.status === "string" &&
    !VALID_STATUS.includes(body.status as LeadStatus)
  ) {
    return NextResponse.json(
      { error: `status inválido. Use: ${VALID_STATUS.join(", ")}` },
      { status: 400 },
    );
  }

  const updated = await store.updateLead(ctx.params.id, body);
  if (!updated) {
    return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ lead: updated });
}

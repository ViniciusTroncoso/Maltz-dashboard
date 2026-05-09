import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const leads = await store.getLeads();
  return NextResponse.json({ leads });
}

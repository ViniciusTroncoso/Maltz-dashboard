import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { computeMetrics } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  const [leads, campaigns, adSpend] = await Promise.all([
    store.getLeads(),
    store.getCampaigns(),
    store.getAdSpend(),
  ]);
  const metrics = computeMetrics(leads, campaigns);
  return NextResponse.json({ metrics, campaigns, adSpend });
}

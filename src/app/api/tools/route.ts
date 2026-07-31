import { NextResponse } from "next/server";
import { getAllTools } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const tools = getAllTools();
  return NextResponse.json({ success: true, count: tools.length, data: tools });
}
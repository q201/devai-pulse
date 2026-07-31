import { NextResponse } from "next/server";
import { getAllTrendingHashtags } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const trending = getAllTrendingHashtags();
  return NextResponse.json({ success: true, count: trending.length, data: trending });
}
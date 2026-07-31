import { NextResponse } from "next/server";
import { getNewsFeed } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function GET() {
  const { items, isLive } = await getNewsFeed();

  return NextResponse.json({
    success: true,
    count: items.length,
    isLive,
    data: items
  });
}

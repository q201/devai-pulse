import { NextResponse } from "next/server";
import { deleteArticle, getAllArticles } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleted = deleteArticle(id);

    if (deleted) {
      return NextResponse.json({
        success: true,
        message: `Article ${id} deleted successfully.`
      });
    }

    return NextResponse.json(
      { success: false, error: "Article not found." },
      { status: 404 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete article";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const articles = getAllArticles();
  const article = articles.find((a) => a.id === params.id || a.slug === params.id);

  if (!article) {
    return NextResponse.json(
      { success: false, error: "Article not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: article });
}

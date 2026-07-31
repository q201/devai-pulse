import { NextResponse } from "next/server";
import { getAllArticles, saveArticle } from "@/lib/db";
import { Article } from "@/data/mockData";

export const dynamic = "force-dynamic";

export async function GET() {
  const articles = getAllArticles();
  return NextResponse.json({ success: true, count: articles.length, data: articles });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.category || !body.content) {
      return NextResponse.json(
        { success: false, error: "Title, Category, and Content are required fields." },
        { status: 400 }
      );
    }

    const slug = body.slug 
      ? body.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      : body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const newArticle: Article = {
      id: body.id || `art-${Date.now()}`,
      slug,
      title: body.title,
      summary: body.summary || body.content.slice(0, 160) + "...",
      content: body.content,
      category: body.category,
      tags: Array.isArray(body.tags) 
        ? body.tags 
        : typeof body.tags === "string" 
          ? body.tags.split(",").map((t: string) => t.trim()).filter(Boolean) 
          : ["AI & ML"],
      readTime: body.readTime || "5 min read",
      difficulty: body.difficulty || "Intermediate",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: {
        name: body.authorName || "Admin Publisher",
        role: body.authorRole || "DevAI Pulse Editor",
        avatar: body.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        handle: body.authorHandle || "@devai_editor"
      },
      techStack: Array.isArray(body.techStack) 
        ? body.techStack 
        : typeof body.techStack === "string" 
          ? body.techStack.split(",").map((t: string) => t.trim()).filter(Boolean) 
          : undefined,
      codeSnippet: body.codeSnippetLanguage && body.codeSnippetCode ? {
        language: body.codeSnippetLanguage,
        filename: body.codeSnippetFilename || "main.ts",
        code: body.codeSnippetCode
      } : undefined,
      views: 1,
      likes: 0,
      isFeatured: Boolean(body.isFeatured),
      isTrending: Boolean(body.isTrending)
    };

    const saved = saveArticle(newArticle);

    return NextResponse.json({
      success: true,
      message: "Article published successfully!",
      data: saved
    }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to publish article";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

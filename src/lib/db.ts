import fs from "fs";
import path from "path";
import { Article, AITool, PulseNews, TrendingHashtag, MOCK_ARTICLES, TOP_AI_TOOLS, MOCK_PULSE_NEWS, TRENDING_HASHTAGS } from "@/data/mockData";

export interface DBData {
  articles: Article[];
  tools: AITool[];
  news: PulseNews[];
  trendingHashtags: TrendingHashtag[];
}

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

function ensureDbExists(): DBData {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData: DBData = {
        articles: MOCK_ARTICLES,
        tools: TOP_AI_TOOLS,
        news: MOCK_PULSE_NEWS,
        trendingHashtags: TRENDING_HASHTAGS
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const content = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(content) as DBData;
    // Ensure backward compatibility if trendingHashtags is missing
    if (!parsed.trendingHashtags) {
      parsed.trendingHashtags = TRENDING_HASHTAGS;
    }
    return parsed;
  } catch (error) {
    console.error("Error reading db.json, falling back to mock data:", error);
    return {
      articles: MOCK_ARTICLES,
      tools: TOP_AI_TOOLS,
      news: MOCK_PULSE_NEWS,
      trendingHashtags: TRENDING_HASHTAGS
    };
  }
}

function saveDb(data: DBData): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing db.json:", error);
  }
}

// Articles API
export function getAllArticles(): Article[] {
  const db = ensureDbExists();
  return db.articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug);
}

export function saveArticle(article: Article): Article {
  const db = ensureDbExists();
  const index = db.articles.findIndex((a) => a.id === article.id || a.slug === article.slug);
  if (index >= 0) {
    db.articles[index] = { ...db.articles[index], ...article };
  } else {
    db.articles.unshift(article);
  }
  saveDb(db);
  return article;
}

export function deleteArticle(id: string): boolean {
  const db = ensureDbExists();
  const initialLength = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id);
  if (db.articles.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// AI Tools API
export function getAllTools(): AITool[] {
  const db = ensureDbExists();
  return db.tools;
}

export function saveTool(tool: AITool): AITool {
  const db = ensureDbExists();
  const index = db.tools.findIndex((t) => t.name.toLowerCase() === tool.name.toLowerCase());
  if (index >= 0) {
    db.tools[index] = tool;
  } else {
    db.tools.unshift(tool);
  }
  saveDb(db);
  return tool;
}

// Trending Hashtags API
export function getAllTrendingHashtags(): TrendingHashtag[] {
  const db = ensureDbExists();
  return db.trendingHashtags;
}

// News API
export function getAllNews(): PulseNews[] {
  const db = ensureDbExists();
  return db.news;
}

export function saveNewsItem(item: PulseNews): PulseNews {
  const db = ensureDbExists();
  db.news.unshift(item);
  saveDb(db);
  return item;
}

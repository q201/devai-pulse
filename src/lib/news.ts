import { MOCK_PULSE_NEWS, PulseNews } from "@/data/mockData";

interface HackerNewsHit {
  objectID: string;
  title?: string;
  url?: string;
  created_at: string;
  story_text?: string;
  points?: number;
}

interface DevToArticle {
  id: number;
  title: string;
  url: string;
  published_at: string;
  description?: string;
  positive_reactions_count?: number;
}

interface GitHubRepo {
  id: number;
  full_name: string;
  html_url: string;
  updated_at: string;
  description?: string;
  stargazers_count?: number;
}

function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (Number.isNaN(diffInMinutes) || diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  } catch {
    return "Recently";
  }
}

export async function getNewsFeed(): Promise<{ items: PulseNews[]; isLive: boolean }> {
  const newsItems: PulseNews[] = [];

  try {
    const hnRes = await fetch("https://hn.algolia.com/api/v1/search_by_date?query=AI&tags=story&hitsPerPage=6", {
      next: { revalidate: 300 }
    });
    if (hnRes.ok) {
      const hnData = await hnRes.json();
      if (Array.isArray(hnData.hits)) {
        hnData.hits.slice(0, 4).forEach((hit: HackerNewsHit, index: number) => {
          if (hit.title) {
            newsItems.push({
              id: `hn-${hit.objectID || index}`,
              title: hit.title,
              source: "Hacker News",
              url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
              timestamp: getRelativeTime(hit.created_at),
              category: "AI & Tech",
              summary: hit.story_text ? hit.story_text.replace(/<[^>]*>?/gm, "").slice(0, 150) + "..." : hit.title,
              upvotes: hit.points || Math.floor(Math.random() * 200) + 50
            });
          }
        });
      }
    }
  } catch {
    // Fallback to mock data below
  }

  try {
    const devRes = await fetch("https://dev.to/api/articles?tag=ai&per_page=6", {
      next: { revalidate: 300 }
    });
    if (devRes.ok) {
      const devData = await devRes.json();
      if (Array.isArray(devData)) {
        devData.slice(0, 4).forEach((item: DevToArticle) => {
          if (item.title) {
            newsItems.push({
              id: `devto-${item.id}`,
              title: item.title,
              source: "Dev.to",
              url: item.url,
              timestamp: getRelativeTime(item.published_at),
              category: "Open Source",
              summary: item.description || item.title,
              upvotes: item.positive_reactions_count || Math.floor(Math.random() * 100) + 20
            });
          }
        });
      }
    }
  } catch {
    // Fallback to mock data below
  }

  try {
    const ghRes = await fetch("https://api.github.com/search/repositories?q=topic:ai&sort=updated&order=desc&per_page=4", {
      headers: {
        "User-Agent": "DevAI-Pulse-App"
      },
      next: { revalidate: 300 }
    });
    if (ghRes.ok) {
      const ghData = await ghRes.json();
      if (Array.isArray(ghData.items)) {
        ghData.items.forEach((repo: GitHubRepo) => {
          newsItems.push({
            id: `gh-${repo.id}`,
            title: `${repo.full_name}: ${repo.description || "AI repository update"}`,
            source: "GitHub Trending",
            url: repo.html_url,
            timestamp: getRelativeTime(repo.updated_at),
            category: "Frameworks",
            summary: repo.description || "Open source AI repository tracking latest updates and tools.",
            upvotes: repo.stargazers_count || Math.floor(Math.random() * 500) + 100
          });
        });
      }
    }
  } catch {
    // Fallback to mock data below
  }

  const finalNews = newsItems.length > 0 ? [...newsItems, ...MOCK_PULSE_NEWS] : MOCK_PULSE_NEWS;
  const uniqueNews = Array.from(new Map(finalNews.map((item) => [item.title, item])).values());

  return {
    items: uniqueNews,
    isLive: newsItems.length > 0
  };
}

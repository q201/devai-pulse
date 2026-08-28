import { MOCK_ARTICLES } from "@/data/mockData";
import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <ArticleClient params={params} />;
}

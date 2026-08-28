import { MOCK_PULSE_NEWS } from "@/data/mockData";
import NewsClient from "./NewsClient";

export async function generateStaticParams() {
  return MOCK_PULSE_NEWS.map((item) => ({
    slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
  }));
}

export default function NewsPage() {
  return <NewsClient />;
}

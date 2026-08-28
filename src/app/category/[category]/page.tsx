import CategoryClient from "./CategoryClient";

export async function generateStaticParams() {
  return [
    { category: "ai-ml" },
    { category: "tutorials" },
    { category: "programming" },
    { category: "tech-news" },
    { category: "all" },
  ];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryClient params={params} />;
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_ARTICLES } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { ArticleCard } from "@/components/ArticleCard";
import { SidebarWidgets } from "@/components/SidebarWidgets";
import { Sparkles, Cpu, BookOpen, Code2, Newspaper, ArrowLeft } from "lucide-react";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categoryMap: Record<string, { title: string; desc: string; icon: React.ElementType }> = {
    "ai-ml": {
      title: "AI & Machine Learning",
      desc: "Deep dives into LLMs, Multimodal transformers, GPU scaling, and neural architectures.",
      icon: Cpu,
    },
    tutorials: {
      title: "Code Tutorials & Guides",
      desc: "Hands-on implementation walkthroughs, Next.js 14, Python, PyTorch, and Rust.",
      icon: BookOpen,
    },
    programming: {
      title: "Programming & Systems",
      desc: "Backend microservices, memory optimization, React 19, and full-stack engineering.",
      icon: Code2,
    },
    "tech-news": {
      title: "Breaking Tech News",
      desc: "Instant headlines, open source releases, research preprints, and ecosystem shifts.",
      icon: Newspaper,
    },
  };

  const currentCategory = categoryMap[params.category] || {
    title: "All Articles",
    desc: "Explore all technical articles, research papers, and tutorials.",
    icon: Sparkles,
  };

  const Icon = currentCategory.icon;

  const filteredArticles = MOCK_ARTICLES.filter((art) => {
    if (params.category === "ai-ml") return art.category === "AI & ML" || art.category === "Research";
    if (params.category === "tutorials") return art.category === "Tutorials";
    if (params.category === "programming") return art.category === "Programming";
    if (params.category === "tech-news") return art.category === "Tech News";
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-obsidian text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Category Header Banner */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="flex items-center space-x-3 text-cyan-500 mb-2">
            <Icon className="w-6 h-6" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">CATEGORY ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {currentCategory.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {currentCategory.desc}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Showing {filteredArticles.length} articles</span>
              <span>Sorted by Most Recent</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="lg:col-span-4">
            <SidebarWidgets />
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

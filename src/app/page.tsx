"use client";

import React, { useState, useEffect } from "react";
import { 
  Article,
  FEATURED_ARTICLE, 
  MOCK_ARTICLES 
} from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PulseStrip } from "@/components/PulseStrip";
import { ArticleCard } from "@/components/ArticleCard";
import { TutorialsSection } from "@/components/TutorialsSection";
import { SidebarWidgets } from "@/components/SidebarWidgets";
import { SearchModal } from "@/components/SearchModal";
import { Footer } from "@/components/Footer";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [articlesList, setArticlesList] = useState<Article[]>(MOCK_ARTICLES);
  const [tutorialsList, setTutorialsList] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setArticlesList(json.data);
            const tutorials = json.data.filter((a: Article) => a.category === "Tutorials");
            if (tutorials.length > 0) {
              setTutorialsList(tutorials);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic articles:", err);
      }
    }
    loadArticles();
  }, []);

  const categories = ["All", "AI & ML", "Programming", "Tutorials", "Tech News"];

  const featured = articlesList.find(a => a.isFeatured) || FEATURED_ARTICLE;

  // Filter articles based on active filter tab
  const feedArticles = selectedCategory === "All"
    ? articlesList.filter(a => a.id !== featured.id)
    : articlesList.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-obsidian text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Global Cmd+K Search Dialog Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 w-full">
        
        {/* 1. Hero Section: Featured Breaking Tech News */}
        <HeroSection article={featured} />

        {/* 2. Pulse Strip: Dynamic Multi-Source Tech & AI News Ticker */}
        <PulseStrip />

        {/* 3. Main Content Feed + Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main Article Stream (Col 1 to 8) */}
            <section className="lg:col-span-8 space-y-6">
              
              {/* Filter Tabs Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Latest Insights & Engineering Articles
                  </h2>
                </div>

                {/* Category Pill Buttons */}
                <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-cyan-500 text-white shadow-glow-sm"
                          : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

            </section>

            {/* Right Column: Sidebar Widgets (Col 9 to 12) */}
            <div className="lg:col-span-4 lg:sticky lg:top-20">
              <SidebarWidgets />
            </div>

          </div>

        </div>

        {/* 4. Tutorials Section (Interactive Code-First Guides) */}
        <div className="bg-slate-50/50 dark:bg-obsidian-200/40 border-t border-b border-slate-200/60 dark:border-slate-800/60">
          <TutorialsSection tutorials={tutorialsList} />
        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

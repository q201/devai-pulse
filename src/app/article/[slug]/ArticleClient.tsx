"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Article, MOCK_ARTICLES } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { 
  Clock, 
  Heart, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowLeft, 
  List, 
  Sparkles,
  Globe
} from "lucide-react";

export default function ArticleClient({ params }: { params: { slug: string } }) {
  const fallbackArticle = MOCK_ARTICLES.find((a) => a.slug === params.slug) || MOCK_ARTICLES[0];
  const [article, setArticle] = useState<Article>(fallbackArticle);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [likes, setLikes] = useState(fallbackArticle.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      try {
        const res = await fetch(`/api/articles/${params.slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setArticle(json.data);
            setLikes(json.data.likes || 0);
          }
        }
      } catch (err) {
        console.error("Failed to fetch article:", err);
      }
    }
    loadArticle();
  }, [params.slug]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyCodeSnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const relatedArticles = MOCK_ARTICLES.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-obsidian text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Feed & Articles</span>
          </Link>
        </div>

        {/* Article Reader Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Content (Col 1 to 8) */}
          <article className="lg:col-span-8 space-y-6">
            
            {/* Header Info */}
            <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold border border-cyan-500/20">
                  {article.category}
                </span>

                {article.difficulty && (
                  <span className="px-3 py-1 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 font-mono text-xs font-semibold border border-violet-500/20">
                    {article.difficulty}
                  </span>
                )}

                <span className="flex items-center space-x-1 text-xs font-mono text-slate-500 dark:text-slate-400 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {article.summary}
              </p>

              {/* Author & Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/50"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {article.author.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {article.author.role} • {article.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                      hasLiked
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-500 font-bold"
                        : "border-slate-200 dark:border-slate-800 hover:border-rose-500/40"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
                    <span>{likes}</span>
                  </button>

                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-2 rounded-xl border text-xs transition-all ${
                      bookmarked
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "border-slate-200 dark:border-slate-800 hover:border-cyan-500/40"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-xs transition-all"
                    title="Share article"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Source Citation Attribution Box if available */}
            {article.sourceAttribution && (
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/30 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                    <span>Source Citation & Attribution</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    This article synthesizes empirical benchmarks and technical data from:{" "}
                    <a
                      href={article.sourceAttribution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-cyan-500 hover:underline inline-flex items-center space-x-1"
                    >
                      <span>{article.sourceAttribution.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Main Article Body Render */}
            <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed font-sans text-base">
              
              {article.content ? (
                <div className="space-y-4 whitespace-pre-wrap leading-relaxed font-sans text-slate-700 dark:text-slate-200">
                  {article.content}
                </div>
              ) : (
                <div className="space-y-6 text-sm sm:text-base">
                  <h2 id="executive-summary" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                    1. Architectural Foundations & Benchmarks
                  </h2>

                  <p>
                    Frontier LLM development has shifted towards multi-stage Mixture-of-Experts (MoE) topologies combined with native 2D Rotary Positional Embeddings (RoPE).
                  </p>
                </div>
              )}

              {/* Code Snippet Block if published with one */}
              {article.codeSnippet && (
                <div className="mt-6 rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-200 relative group shadow-xl">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                    <span className="text-cyan-400 font-semibold">{article.codeSnippet.filename}</span>
                    <button
                      onClick={() => copyCodeSnippet(article.codeSnippet?.code || "")}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      {codeCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="overflow-x-auto text-xs leading-relaxed text-slate-200 font-mono">
                    <code>{article.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

            </div>

            {/* Tags & Social Share Footer */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono text-xs border border-slate-200 dark:border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-500">Share:</span>
                <button onClick={handleShare} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-cyan-400">
                  <Share2 className="w-4 h-4" />
                </button>
                <button onClick={handleShare} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-cyan-400">
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </div>

          </article>

          {/* Sticky Table of Contents & Related Sidebar (Col 9 to 12) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Table of Contents Card */}
            <div className="rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800/80 shadow-lg">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <List className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Table of Contents
                </h3>
              </div>

              {article.toc ? (
                <ul className="space-y-2 text-xs font-mono">
                  {article.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors block leading-relaxed"
                      >
                        • {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">Quick reading mode active.</p>
              )}
            </div>

            {/* Related Articles Widget */}
            <div className="rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800/80 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Related AI Articles</span>
              </h3>

              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/article/${rel.slug}`}
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors group"
                  >
                    <span className="text-[10px] font-mono text-cyan-500 font-semibold">{rel.category}</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-400 transition-colors mt-1 line-clamp-2">
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </main>

      <Footer />
    </div>
  );
}

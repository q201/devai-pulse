"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Article } from "@/data/mockData";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Wrench,
  Newspaper,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowLeft,
  Code2,
  BookOpen,
  Send,
  Zap,
  TrendingUp,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "create" | "tools" | "news">("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State for New Article / Tutorial / Blog
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "AI & ML" as Article["category"],
    summary: "",
    content: "",
    tags: "LLMs, AI Architecture, Python",
    readTime: "6 min read",
    difficulty: "Intermediate" as "Beginner" | "Intermediate" | "Advanced",
    authorName: "Dr. Elena Rostova",
    authorRole: "Lead AI Researcher & Systems Architect",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    authorHandle: "@elena_ai",
    techStack: "Python, PyTorch, Transformers",
    codeSnippetLanguage: "typescript",
    codeSnippetFilename: "main.ts",
    codeSnippetCode: "",
    isFeatured: false,
    isTrending: false
  });

  // Fetch articles on mount
  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      if (res.ok) {
        const json = await res.json();
        setArticles(json.data || []);
      }
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // Handle Article Title Change with Auto-Slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData(prev => ({ ...prev, title, slug }));
  };

  // Submit Article / Tutorial / Blog
  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setMessage({ type: "error", text: "Title and Content are required!" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (json.success) {
        setMessage({ type: "success", text: "Article published successfully to DevAI Pulse!" });
        setFormData({
          title: "",
          slug: "",
          category: "AI & ML",
          summary: "",
          content: "",
          tags: "LLMs, AI Architecture, Python",
          readTime: "6 min read",
          difficulty: "Intermediate",
          authorName: "Dr. Elena Rostova",
          authorRole: "Lead AI Researcher & Systems Architect",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
          authorHandle: "@elena_ai",
          techStack: "Python, PyTorch, Transformers",
          codeSnippetLanguage: "typescript",
          codeSnippetFilename: "main.ts",
          codeSnippetCode: "",
          isFeatured: false,
          isTrending: false
        });
        loadArticles();
        setTimeout(() => setActiveTab("articles"), 1200);
      } else {
        setMessage({ type: "error", text: json.error || "Failed to publish article" });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Server error publishing article";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Article
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
        setMessage({ type: "success", text: "Article removed from database." });
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const tutorialCount = articles.filter(a => a.category === "Tutorials").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
              title="Return to Main Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
                  <span>DevAI.Pulse</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    ADMIN CONTROL CENTER
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Publish articles, tutorials, AI news feeds, and tools to production database
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-all border border-slate-700"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Live Site Preview</span>
            </Link>
            <button
              onClick={loadArticles}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Reload Database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Status Alert Banner */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center justify-between shadow-lg font-mono text-sm ${
              message.type === "success"
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                : "bg-rose-950/60 border-rose-500/40 text-rose-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              )}
              <span>{message.text}</span>
            </div>
            <button onClick={() => setMessage(null)} className="text-xs opacity-70 hover:opacity-100">
              [Dismiss]
            </button>
          </div>
        )}

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-panel shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total Articles</p>
              <h3 className="text-2xl font-bold font-mono text-white mt-1">{articles.length}</h3>
              <p className="text-[11px] text-cyan-400 font-mono mt-1">Published to feed</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-panel shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Tutorials & Guides</p>
              <h3 className="text-2xl font-bold font-mono text-white mt-1">{tutorialCount}</h3>
              <p className="text-[11px] text-emerald-400 font-mono mt-1">Interactive code snippets</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-panel shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total Reads</p>
              <h3 className="text-2xl font-bold font-mono text-white mt-1">{totalViews.toLocaleString()}</h3>
              <p className="text-[11px] text-violet-400 font-mono mt-1">Aggregated engagement</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-panel shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Storage Engine</p>
              <h3 className="text-lg font-bold font-mono text-emerald-400 mt-1">Local JSON DB</h3>
              <p className="text-[11px] text-slate-400 font-mono mt-1">src/data/db.json persistent</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Zap className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center space-x-2 border-b border-slate-800 mb-8 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("articles")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-mono font-medium transition-all ${
              activeTab === "articles"
                ? "bg-cyan-500 text-white shadow-glow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Manage Content ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-mono font-medium transition-all ${
              activeTab === "create"
                ? "bg-cyan-500 text-white shadow-glow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create Article / Tutorial</span>
          </button>

          <button
            onClick={() => setActiveTab("tools")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-mono font-medium transition-all ${
              activeTab === "tools"
                ? "bg-cyan-500 text-white shadow-glow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>AI Tools Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-mono font-medium transition-all ${
              activeTab === "news"
                ? "bg-cyan-500 text-white shadow-glow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Pulse Flash Stream</span>
          </button>
        </div>

        {/* TAB 1: ARTICLES MANAGEMENT TABLE */}
        {activeTab === "articles" && (
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-2xl p-6 glass-panel">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>Published Articles & Masterclasses</span>
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  View, preview, or remove published articles from your persistent local backend
                </p>
              </div>
              <button
                onClick={() => setActiveTab("create")}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-mono font-bold transition-all shadow-glow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Article</span>
              </button>
            </div>

            {loading ? (
              <div className="py-16 text-center text-slate-400 font-mono text-sm animate-pulse">
                Loading database records...
              </div>
            ) : articles.length === 0 ? (
              <div className="py-16 text-center text-slate-400 font-mono">
                <p>No articles found in database.</p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs"
                >
                  Create your first article
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300 font-sans">
                  <thead className="bg-slate-950/80 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-4">Title & Slug</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Views</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 max-w-xs sm:max-w-md">
                          <div className="font-semibold text-slate-100 line-clamp-1">{art.title}</div>
                          <div className="text-[11px] text-cyan-400 line-clamp-1 mt-0.5">/article/{art.slug}</div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px]">
                            {art.category}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-slate-300">
                          {art.author.name}
                        </td>
                        <td className="p-4 whitespace-nowrap text-slate-400">
                          {art.date}
                        </td>
                        <td className="p-4 whitespace-nowrap text-slate-400">
                          {art.views?.toLocaleString()}
                        </td>
                        <td className="p-4 whitespace-nowrap text-right space-x-2">
                          <Link
                            href={`/article/${art.slug}`}
                            target="_blank"
                            className="inline-flex items-center space-x-1 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                            title="Preview Article"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(art.id)}
                            className="inline-flex items-center space-x-1 p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREATE ARTICLE / TUTORIAL FORM */}
        {activeTab === "create" && (
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 glass-panel">
            <div className="pb-6 border-b border-slate-800 mb-6">
              <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-cyan-400" />
                <span>Publish New Article or Interactive Tutorial</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Fill in details to instantly publish articles, technical masterclasses, or tutorials to DevAI Pulse
              </p>
            </div>

            <form onSubmit={handleArticleSubmit} className="space-y-6">
              
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Fine-Tuning Llama 3 with Unsloth & CUDA"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-sans focus:border-cyan-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="fine-tuning-llama-3-unsloth-cuda"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-sm focus:border-cyan-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Category, Read Time, Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Article["category"] }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-sm focus:border-cyan-500 outline-none"
                  >
                    <option value="AI & ML">AI & ML</option>
                    <option value="Tutorials">Tutorials</option>
                    <option value="Programming">Programming</option>
                    <option value="Tech News">Tech News</option>
                    <option value="Research">Research</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={e => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    placeholder="8 min read"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={e => setFormData(prev => ({ ...prev, difficulty: e.target.value as "Beginner" | "Intermediate" | "Advanced" }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-sm focus:border-cyan-500 outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Author Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={e => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-sans text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Author Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={e => setFormData(prev => ({ ...prev, authorRole: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-sans text-sm outline-none"
                  />
                </div>
              </div>

              {/* Tags & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="LLMs, PyTorch, LoRA, CUDA"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Tech Stack Badges (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={e => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
                    placeholder="Python, PyTorch, Transformers, vLLM"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                  Executive Summary / Brief Intro
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="A short 2-3 sentence overview explaining what the developer will learn..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-sans text-sm focus:border-cyan-500 outline-none"
                />
              </div>

              {/* Full Markdown Article Content */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                  Full Article Body (Supports Markdown) *
                </label>
                <textarea
                  rows={10}
                  required
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="## 1. Introduction & Setup&#10;&#10;In this masterclass, we will cover step-by-step implementation..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed focus:border-cyan-500 outline-none"
                />
              </div>

              {/* Code Snippet Box (Optional for Tutorials) */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Code2 className="w-4 h-4" />
                  <span>Code Snippet Block (Optional)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Language</label>
                    <input
                      type="text"
                      value={formData.codeSnippetLanguage}
                      onChange={e => setFormData(prev => ({ ...prev, codeSnippetLanguage: e.target.value }))}
                      placeholder="python / typescript / rust"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Filename</label>
                    <input
                      type="text"
                      value={formData.codeSnippetFilename}
                      onChange={e => setFormData(prev => ({ ...prev, codeSnippetFilename: e.target.value }))}
                      placeholder="app/api/chat/route.ts"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Code</label>
                  <textarea
                    rows={4}
                    value={formData.codeSnippetCode}
                    onChange={e => setFormData(prev => ({ ...prev, codeSnippetCode: e.target.value }))}
                    placeholder="import torch..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs outline-none"
                  />
                </div>
              </div>

              {/* Feature Flags */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 text-xs font-mono text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={e => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 rounded border-slate-800 text-cyan-500 focus:ring-0 bg-slate-950"
                  />
                  <span>Mark as Featured Article</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-mono text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={e => setFormData(prev => ({ ...prev, isTrending: e.target.checked }))}
                    className="w-4 h-4 rounded border-slate-800 text-cyan-500 focus:ring-0 bg-slate-950"
                  />
                  <span>Mark as Trending</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end space-x-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab("articles")}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-mono text-xs font-bold shadow-glow-sm hover:shadow-glow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Publishing..." : "Publish Article"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </main>
    </div>
  );
}

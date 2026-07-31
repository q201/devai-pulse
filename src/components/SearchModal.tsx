"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MOCK_ARTICLES } from "@/data/mockData";
import { Search, X, Terminal, Clock, ArrowRight, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const btn = document.querySelector('button[aria-label="Search articles"]') as HTMLButtonElement;
          btn?.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim() === ""
    ? MOCK_ARTICLES.slice(0, 4)
    : MOCK_ARTICLES.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md transition-all animate-fadeIn">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-obsidian-100 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10">
        
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-cyan-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI models, tutorials, benchmarks, Rust, Next.js..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm font-medium outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-200 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 px-2">
            <span>{query ? `Search Results (${results.length})` : "Suggested Articles"}</span>
            <span>Use ↑ ↓ to navigate</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-mono text-xs">
              <Terminal className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>No articles found for &quot;{query}&quot;.</p>
              <p className="text-[11px] text-slate-500 mt-1">Try searching for &quot;Claude&quot;, &quot;LLMs&quot;, &quot;Next.js&quot;, or &quot;Fine-Tuning&quot;.</p>
            </div>
          ) : (
            results.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                onClick={onClose}
                className="group flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all duration-200"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 text-[10px] font-mono font-bold">
                      {article.category}
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                    {article.summary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>DevAI Pulse Search Index</span>
          </span>
          <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800">ESC</kbd> to exit</span>
        </div>

      </div>

    </div>
  );
}

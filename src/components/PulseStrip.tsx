"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PulseNews, MOCK_PULSE_NEWS } from "@/data/mockData";
import { Radio, ExternalLink, ThumbsUp, RefreshCw, Zap } from "lucide-react";

export function PulseStrip() {
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [newsList, setNewsList] = useState<PulseNews[]>(MOCK_PULSE_NEWS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchLiveNews = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setNewsList(json.data);
          setIsLive(json.isLive ?? true);
        }
      }
    } catch (err) {
      console.error("Failed to fetch live news:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, []);

  const sources = ["All", "TechCrunch", "Hacker News", "arXiv AI", "Dev.to", "GitHub Trending"];

  const filteredNews = selectedSource === "All" 
    ? newsList 
    : newsList.filter(n => n.source === selectedSource);

  const handleRefresh = () => {
    fetchLiveNews();
  };

  const handleUpvote = (id: string) => {
    setNewsList(prev => prev.map(item => item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item));
  };

  return (
    <div className="my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Container Box */}
      <div className="rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800/80 shadow-xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
              <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Multi-Source AI & Tech Pulse</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${isLive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"}`}>
                  {isLive ? "LIVE API STREAM" : "NEWS STREAM"}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Aggregated tech headlines from arXiv, Hacker News, TechCrunch & Dev.to
              </p>
            </div>
          </div>

          {/* Controls: Source Filter + Manual Refresh */}
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              {sources.map(source => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedSource === source
                      ? "bg-cyan-500 text-white shadow-glow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-cyan-400 transition-transform ${
                isRefreshing ? "animate-spin text-cyan-400" : ""
              }`}
              title="Refresh News Stream"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live News Ticker Strip / Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="group relative rounded-xl bg-slate-50 dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    [Source: {news.source}]
                  </span>
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{news.timestamp}</span>
                  </span>
                </div>

                <Link
                  href={`/news/${encodeURIComponent(news.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""))}`}
                  className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors"
                >
                  {news.title}
                </Link>

                <div className="mt-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/10 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-cyan-600 dark:text-cyan-400">
                    Main takeaway
                  </p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer: Upvotes & External Link */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handleUpvote(news.id)}
                  className="flex items-center space-x-1.5 text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{news.upvotes}</span>
                </button>

                <Link
                  href={`/news/${encodeURIComponent(news.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""))}`}
                  className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <span>Open article</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

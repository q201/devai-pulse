"use client";

import React, { useState, useEffect } from "react";
import { TrendingHashtag, AITool } from "@/data/mockData";
import { 
  TrendingUp, 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Star, 
  Sparkles 
} from "lucide-react";

export function SidebarWidgets() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([]);
  const [aiTools, setAiTools] = useState<AITool[]>([]);

  useEffect(() => {
    async function loadSidebarData() {
      try {
        const [trendingRes, toolsRes] = await Promise.all([
          fetch("/api/trending"),
          fetch("/api/tools")
        ]);
        if (trendingRes.ok) {
          const trendingJson = await trendingRes.json();
          if (trendingJson.data && trendingJson.data.length > 0) {
            setTrendingHashtags(trendingJson.data);
          }
        }
        if (toolsRes.ok) {
          const toolsJson = await toolsRes.json();
          if (toolsJson.data && toolsJson.data.length > 0) {
            setAiTools(toolsJson.data);
          }
        }
      } catch (err) {
        console.error("Failed to load sidebar data:", err);
      }
    }
    loadSidebarData();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 600);
  };

  return (
    <aside className="space-y-6">
      
      {/* 1. Newsletter Signup Card */}
      <div id="newsletter" className="relative overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-br from-cyan-500 via-violet-600 to-purple-600 shadow-xl">
        <div className="rounded-[15px] bg-white dark:bg-obsidian-100 p-5 backdrop-blur-xl relative z-10">
          
          <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>DAILY AI & CODE DIGEST</span>
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Stay Ahead of the AI Curve
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Join 45,000+ developers receiving our curated daily breakdown of new papers, code architectures, and benchmark updates.
          </p>

          {subscribed ? (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center space-x-2 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Subscribed! Check your inbox for confirmation.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-medium text-xs shadow-glow-sm hover:shadow-glow transition-all duration-300"
              >
                {loading ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Get Free Daily Digest</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <span>✓ No spam ever</span>
            <span>✓ Unsubscribe anytime</span>
          </div>

        </div>
      </div>

      {/* 2. Trending Topics / Hashtags */}
      <div className="rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800/80 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-cyan-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Trending AI Topics
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-500 font-semibold uppercase">
            Realtime
          </span>
        </div>

        <div className="space-y-2">
          {(trendingHashtags.length > 0 ? trendingHashtags : []).map((tag) => (
            <div
              key={tag.name}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors cursor-pointer group"
            >
              <div>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {tag.name}
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {tag.category} • {tag.count}
                </p>
              </div>

              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {tag.growth}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Featured AI Tools Directory */}
      <div className="rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800/80 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Tools Spotlight
            </h3>
          </div>
          <span className="text-[10px] font-mono text-violet-400">Curated</span>
        </div>

        <div className="space-y-3">
          {(aiTools.length > 0 ? aiTools : []).map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-violet-500/40 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-400 transition-colors">
                  {tool.name}
                </span>
                {tool.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {tool.description}
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{tool.rating}</span>
                </span>
                <span className="flex items-center space-x-1 text-slate-400 group-hover:text-violet-400">
                  <span>Visit</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

    </aside>
  );
}

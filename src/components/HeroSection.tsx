"use client";

import React from "react";
import Link from "next/link";
import { Article } from "@/data/mockData";
import { 
  Flame, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Zap,
  TrendingUp
} from "lucide-react";

interface HeroSectionProps {
  article: Article;
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-8 lg:py-12">
      {/* Background Neon ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breaking News Header Pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider">FEATURED AI BREAKTHROUGH</span>
          </div>

          <div className="hidden sm:flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>14.2k Active Readers</span>
            </span>
            <span>•</span>
            <span>Verified Technical Paper</span>
          </div>
        </div>

        {/* Hero Highlight Card with Animated Gradient Border */}
        <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-r from-cyan-500 via-violet-600 to-purple-600 shadow-2xl transition-all duration-300">
          <div className="relative rounded-[15px] bg-white dark:bg-obsidian-100 p-6 sm:p-8 lg:p-10 backdrop-blur-xl overflow-hidden">
            
            {/* Structural Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-5 dark:opacity-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Text & Meta Details */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* Category & Source Attribution Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/20">
                    {article.category}
                  </span>
                  
                  {article.sourceAttribution && (
                    <a
                      href={article.sourceAttribution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs hover:border-cyan-500/40 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>[Source: {article.sourceAttribution.name}]</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  <span className="inline-flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-xs font-mono ml-auto">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Main Headline */}
                <Link href={`/article/${article.slug}`}>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors leading-tight">
                    {article.title}
                  </h1>
                </Link>

                {/* Article Summary */}
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Tech Stack Pills & Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 text-xs font-mono border border-slate-200 dark:border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author Info & CTA Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center space-x-3">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full ring-2 ring-cyan-500/50 object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {article.author.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {article.author.role} • {article.date}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/article/${article.slug}`}
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow transition-all duration-300 group"
                  >
                    <span>Read Deep Dive Analysis</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Code Snippet / Architectural Preview Box */}
              <div className="lg:col-span-4 bg-slate-950/90 rounded-xl p-4 border border-slate-800 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="text-slate-400 font-bold ml-2">claude_vs_gpt4o.py</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                    Live Code
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-300 overflow-x-auto leading-relaxed">
                  <p className="text-pink-400"><span className="text-purple-400">class</span> <span className="text-cyan-300">FrontierLLMClient</span>:</p>
                  <p className="pl-4 text-slate-400">&quot;&quot;&quot; High-throughput streaming client &quot;&quot;&quot;</p>
                  <p className="pl-4"><span className="text-purple-400">async def</span> <span className="text-cyan-400">stream_completion</span>(self, prompt: str):</p>
                  <p className="pl-8 text-emerald-400"># End-to-end unified multimodal processing</p>
                  <p className="pl-8 text-amber-300">payload = &#123;&quot;model&quot;: &quot;claude-3-5-sonnet&quot;&#125;</p>
                  <p className="pl-8 text-slate-300">async with session.post(url, json=payload) as resp:</p>
                  <p className="pl-12 text-cyan-300">yield await resp.json()</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1 text-cyan-400">
                    <Zap className="w-3 h-3" />
                    <span>TTFT: 120ms</span>
                  </span>
                  <span>Tokens: 105/s</span>
                  <span className="text-emerald-400">92.0% HumanEval</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

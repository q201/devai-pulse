"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Rss, Heart, Share2, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-obsidian-300 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                DevAI<span className="text-cyan-500">.Pulse</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              The modern destination for engineers, AI researchers, and developers looking for high-signal articles, architecture breakdowns, and production tutorials.
            </p>
            <div className="flex items-center space-x-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-cyan-400 transition-colors" title="GitHub">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-cyan-400 transition-colors" title="X / Twitter">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="/rss.xml" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-amber-400 transition-colors" title="RSS Feed">
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/category/ai-ml" className="hover:text-cyan-400 transition-colors">AI & Machine Learning</Link></li>
              <li><Link href="/category/tutorials" className="hover:text-cyan-400 transition-colors">Code Tutorials</Link></li>
              <li><Link href="/category/programming" className="hover:text-cyan-400 transition-colors">Systems & Web Dev</Link></li>
              <li><Link href="/category/tech-news" className="hover:text-cyan-400 transition-colors">Breaking Tech News</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#newsletter" className="hover:text-cyan-400 transition-colors">Daily AI Digest</a></li>
              <li><a href="https://github.com" className="hover:text-cyan-400 transition-colors">Open Source Repos</a></li>
              <li><a href="https://arxiv.org" className="hover:text-cyan-400 transition-colors">arXiv AI Preprints</a></li>
              <li><a href="https://huggingface.co" className="hover:text-cyan-400 transition-colors">Hugging Face Models</a></li>
            </ul>
          </div>

          {/* Col 4: Platform Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Tech Stack
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] font-mono space-y-1.5">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Framework:</span>
                <span className="text-cyan-400 font-bold">Next.js 14 App Router</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Styling:</span>
                <span className="text-violet-400 font-bold">Tailwind CSS + Glass</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Design System:</span>
                <span className="text-emerald-400 font-bold">Cyber-Clean Dark</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© 2026 DevAI Pulse. Open Source Tech & AI Community platform.</p>
          <p className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for Developers & AI Researchers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

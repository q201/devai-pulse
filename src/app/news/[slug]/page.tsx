"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { MOCK_PULSE_NEWS, PulseNews } from "@/data/mockData";
import { ArrowLeft, ExternalLink, Radio, Sparkles, ThumbsUp } from "lucide-react";

export default function NewsReaderPage() {
  const params = useParams<{ slug: string }>();
  const [newsItem, setNewsItem] = useState<PulseNews | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const json = await res.json();
          const found = (json.data || []).find((item: PulseNews) => {
            const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            return slug === params.slug;
          });
          if (found) {
            setNewsItem(found);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to load news item", error);
      }

      const fallback = MOCK_PULSE_NEWS.find((item) => {
        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        return slug === params.slug;
      });
      setNewsItem(fallback || MOCK_PULSE_NEWS[0]);
    }

    loadNews();
  }, [params.slug]);

  const articleSummary = useMemo(() => {
    if (!newsItem) return "";

    const sourceContext = `${newsItem.source} is the original publisher of this update. The summary below is structured to help readers quickly understand the main claim, the likely impact, and why the topic matters.`;

    const breakdown = [
      {
        title: "What happened",
        body: newsItem.summary
      },
      {
        title: "Why it matters",
        body: `This update is relevant because it signals momentum in the broader AI, developer tools, or open-source ecosystem and can influence how teams plan shipping, adoption, and product strategy.`
      },
      {
        title: "Who should care",
        body: "Developers, founders, product teams, and technical readers who want a clear signal on where the market is moving without reading the entire source article." 
      }
    ];

    return `${sourceContext}\n\n${breakdown.map((section) => `${section.title}: ${section.body}`).join("\n\n")}`;
  }, [newsItem]);

  if (!newsItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-obsidian text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to the feed</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold border border-cyan-500/20">
                  {newsItem.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-mono font-semibold border border-violet-500/20">
                  {newsItem.source}
                </span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {newsItem.title}
              </h1>

              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {newsItem.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Radio className="w-4 h-4 text-cyan-500" />
                    <span>{newsItem.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4 text-amber-500" />
                    <span>{newsItem.upvotes}</span>
                  </div>
                </div>

                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 transition-colors"
                >
                  <span>Read full source</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">Story preview</span>
              </div>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                {articleSummary.split("\n\n").map((section, index) => {
                  const [heading, ...rest] = section.split(": ");
                  const content = rest.join(": ");
                  const isIntro = index === 0;

                  return (
                    <div
                      key={`${heading}-${index}`}
                      className={`rounded-2xl border p-4 ${isIntro ? "border-cyan-500/20 bg-cyan-500/5" : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60"}`}
                    >
                      <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-cyan-600 dark:text-cyan-400">
                        {heading}
                      </p>
                      <p className="mt-2 text-sm sm:text-base leading-7 text-slate-700 dark:text-slate-300">
                        {content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Why this view exists</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                This page gives readers a polished preview of the external story, keeps the experience inside your product, and preserves a direct path to the original source.
              </p>
              <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-cyan-700 dark:text-cyan-400">Best for:</p>
                <ul className="mt-2 space-y-2">
                  <li>• curated tech news</li>
                  <li>• premium editorial summaries</li>
                  <li>• monetisation-friendly content experiences</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

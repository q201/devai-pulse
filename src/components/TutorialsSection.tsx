"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/data/mockData";
import { 
  Code2, 
  Copy, 
  Check, 
  Clock, 
  ArrowRight
} from "lucide-react";

interface TutorialsSectionProps {
  tutorials: Article[];
}

export function TutorialsSection({ tutorials }: TutorialsSectionProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredTutorials = selectedDifficulty === "All"
    ? tutorials
    : tutorials.filter(t => t.difficulty === selectedDifficulty);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 text-xs font-mono font-semibold mb-2">
            <Code2 className="w-3.5 h-3.5 text-violet-400" />
            <span>INTERACTIVE TUTORIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Premium Programming Playbooks for Modern Product Teams
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Monetization-ready tutorials for SaaS products, subscription flows, APIs, and creator platforms that need to convert and scale.
          </p>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedDifficulty === diff
                  ? "bg-violet-600 text-white shadow-glow-violet"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tut) => (
          <div
            key={tut.id}
            className="group relative rounded-2xl glass-panel p-6 border border-slate-200 dark:border-slate-800/80 hover:border-violet-500/50 hover:shadow-glow-violet transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Meta Top */}
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="px-2.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-semibold">
                  {tut.difficulty || "Intermediate"}
                </span>

                <span className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tut.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <Link href={`/article/${tut.slug}`}>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                  {tut.title}
                </h3>
              </Link>

              {/* Summary */}
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {tut.summary}
              </p>

              {/* Tech Stack Pills */}
              {tut.techStack && (
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {tut.techStack.map(stack => (
                    <span
                      key={stack}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[11px] font-mono border border-slate-200 dark:border-slate-800"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              )}

              {/* Code Snippet Box with Copy Code Button */}
              {tut.codeSnippet && (
                <div className="mt-4 rounded-xl bg-slate-950 p-3.5 border border-slate-800 font-mono text-xs text-slate-300 relative group/code">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="text-cyan-400 font-semibold">{tut.codeSnippet.filename}</span>
                    <button
                      onClick={() => copyCode(tut.codeSnippet!.code, tut.id)}
                      className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedId === tut.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="overflow-x-auto max-h-36 text-[11px] leading-relaxed text-slate-200">
                    <code>{tut.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Card Footer Link */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <img
                  src={tut.author.avatar}
                  alt={tut.author.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-violet-500/40"
                />
                <span className="text-slate-600 dark:text-slate-400">{tut.author.name}</span>
              </div>

              <Link
                href={`/article/${tut.slug}`}
                className="flex items-center space-x-1 text-violet-600 dark:text-violet-400 font-semibold hover:translate-x-0.5 transition-transform"
              >
                <span>Full Tutorial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

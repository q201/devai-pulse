"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/data/mockData";
import { 
  Clock, 
  Heart, 
  Bookmark, 
  Share2, 
  Check, 
  ShieldCheck
} from "lucide-react";

interface ArticleCardProps {
  article: Article;
  layout?: "grid" | "list";
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      setLikesCount(prev => prev - 1);
      setLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/article/${article.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Intermediate":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "Advanced":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="group relative rounded-2xl glass-panel p-5 sm:p-6 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold border border-cyan-500/20">
              {article.category}
            </span>

            {article.difficulty && (
              <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-semibold border ${getDifficultyColor(article.difficulty)}`}>
                {article.difficulty}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>

        {/* Article Title */}
        <Link href={`/article/${article.slug}`}>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h2>
        </Link>

        {/* Article Summary */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>

        {/* Source Citation badge if present */}
        {article.sourceAttribution && (
          <div className="mt-3 inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Attr: {article.sourceAttribution.name}</span>
          </div>
        )}

        {/* Tech Stack Pills */}
        {article.techStack && article.techStack.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {article.techStack.map(stack => (
              <span
                key={stack}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[11px] font-mono border border-slate-200 dark:border-slate-800"
              >
                {stack}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Meta & Interaction Actions */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
        
        {/* Author Info */}
        <div className="flex items-center space-x-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-500/40"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {article.author.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              {article.date}
            </span>
          </div>
        </div>

        {/* Actions: Bookmark, Share, Likes */}
        <div className="flex items-center space-x-2 text-slate-400">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-mono transition-colors ${
              liked ? "text-rose-500 bg-rose-500/10" : "hover:text-rose-400"
            }`}
            title="Like article"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              bookmarked ? "text-cyan-400 bg-cyan-400/10" : "hover:text-cyan-400"
            }`}
            title="Bookmark article"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-xs hover:text-cyan-400 transition-colors"
            title="Copy link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

    </div>
  );
}

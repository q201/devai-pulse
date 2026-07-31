"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { 
  Terminal, 
  Search, 
  Sun, 
  Moon, 
  Sparkles, 
  Menu, 
  X, 
  Cpu, 
  BookOpen, 
  Newspaper, 
  Code2, 
  Zap,
  ShieldCheck
} from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Feed", href: "/", icon: Sparkles },
    { name: "AI & ML", href: "/category/ai-ml", icon: Cpu },
    { name: "Tutorials", href: "/category/tutorials", icon: BookOpen },
    { name: "Programming", href: "/category/programming", icon: Code2 },
    { name: "Tech News", href: "/category/tech-news", icon: Newspaper },
    { name: "Admin", href: "/admin", icon: ShieldCheck },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? "glass-nav border-b border-slate-200 dark:border-slate-800/80 shadow-lg shadow-black/5" 
        : "bg-white/80 dark:bg-obsidian/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-violet-600 to-purple-600 p-[1.5px] shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
                    DevAI<span className="text-cyan-500 dark:text-cyan-400">.Pulse</span>
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 dark:text-slate-400 font-mono -mt-0.5">
                  Tech & AI Digest
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30"
                      : "text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Global Search Bar Trigger (Cmd + K) */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs hover:border-cyan-500/50 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200 group"
              aria-label="Search articles"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 transition-colors" />
              <span className="hidden sm:inline-block font-medium">Search code & AI topics...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold border border-slate-300 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Subscribe Action Button */}
            <a
              href="#newsletter"
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-medium text-xs shadow-glow-sm hover:shadow-glow transition-all duration-300"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Digest</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-obsidian-100 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "text-cyan-500 bg-cyan-500/10 border border-cyan-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Search Tech & AI Topics</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

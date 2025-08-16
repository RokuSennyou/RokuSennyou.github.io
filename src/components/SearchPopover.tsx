"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function SearchPopover() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchTags = async () => {
        try {
          const response = await fetch('/api/tags');
          if (response.ok) {
            const tags = await response.json();
            setAvailableTags(tags);
          } else {
            setAvailableTags(['日常']);
          }
        } catch (error) {
          setAvailableTags(['日常']);
        }
      };
      fetchTags();
    }
  }, []);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (
        e.key === "/" &&
        !open &&
        (e.target as HTMLElement)?.tagName !== "INPUT" &&
        (e.target as HTMLElement)?.tagName !== "TEXTAREA" &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function onTagClick(tag: string) {
    setOpen(false);
    router.push(`/search?tag=${encodeURIComponent(tag)}`);
  }

  return (
    <>
      <button
        ref={btnRef}
        aria-label="Search"
        onClick={toggle}
        className="p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
          <path
            d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          <div className="relative w-full max-w-4xl mx-4 mt-16 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-[#1a1f2e]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <form onSubmit={onSubmit} className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-white/70 flex-shrink-0">
                    <path
                      d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="搜尋文章、內容、年份…"
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/50 text-2xl py-3"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="p-3 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-base text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 rounded bg-white/10 text-sm font-mono">/</span>
                      <span>開啟搜尋</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 rounded bg-white/10 text-sm font-mono">Esc</span>
                      <span>關閉</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {value && (
                      <button
                        type="button"
                        onClick={() => setValue("")}
                        className="px-4 py-2 text-base rounded-lg bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                      >
                        清除
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2 text-base rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors disabled:opacity-50"
                      disabled={!value.trim()}
                    >
                      搜尋
                    </button>
                  </div>
                </div>
              </form>

              <div className="border-t border-white/10"></div>

              <div className="p-8">
                <div className="text-lg text-white/80 mb-6 font-medium">選擇標籤</div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {availableTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick(tag)}
                      className="px-4 py-3 text-sm rounded-xl bg-white/10 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/50 text-white/80 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        {tag}
                      </div>
                    </button>
                  ))}
                </div>

                {availableTags.length === 0 && (
                  <div className="text-center py-8 text-white/50">
                    載入標籤中...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
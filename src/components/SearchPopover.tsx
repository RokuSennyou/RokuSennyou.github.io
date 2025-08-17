"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  snippet: string;
  date: string;
  tags: string[];
  url: string;
  matchType: 'title' | 'tag' | 'content';
}

export default function SearchPopover() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const performSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setSelectedIndex(-1);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(newValue);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchResults.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => prev < searchResults.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedResult = searchResults[selectedIndex];
      if (selectedResult) {
        setOpen(false);
        router.push(selectedResult.url);
      }
    }
  };

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    } else {
      setSearchResults([]);
      setSelectedIndex(-1);
      setValue("");
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
    setValue(tag);
    setSelectedIndex(-1);
    performSearch(tag);
  }

  function onResultClick(result: SearchResult) {
    setOpen(false);
    router.push(result.url);
  }

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-400 text-black px-1 rounded">{part}</mark> : 
        part
    );
  };

  return (
    <>
      <button
        ref={btnRef}
        aria-label="Search"
        onClick={toggle}
        className="p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
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
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setOpen(false)}
          />
          
          <div className={`relative w-full max-w-4xl mx-4 mt-32 transform transition-all duration-500 ease-out ${
            open 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className="bg-[#1a1f2e]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-float-up">
              <form onSubmit={onSubmit} className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={`h-8 w-8 text-white/70 flex-shrink-0 transform transition-all duration-300 delay-100 ${
                      open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                    }`}
                  >
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
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="搜尋文章、內容、標籤…"
                    className={`flex-1 bg-transparent outline-none text-white placeholder:text-white/50 text-2xl py-3 
                              transform transition-all duration-300 delay-200 ${
                                open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                              }`}
                  />
                  {isSearching && (
                    <div className="animate-spin h-6 w-6 border-2 border-white/20 border-t-white/70 rounded-full"></div>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className={`p-3 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 
                              hover:scale-105 transform ${
                                open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                              }`}
                    style={{ transitionDelay: '300ms' }}
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                {/* 搜尋結果 */}
                {value.length >= 2 && (
                  <div className={`mb-6 transform transition-all duration-400 delay-300 ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {searchResults.length > 0 ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                        <div className="text-sm text-white/60 mb-3">
                          找到 {searchResults.length} 個結果
                        </div>
                        {searchResults.map((result, index) => (
                          <div
                            key={result.id}
                            onClick={() => onResultClick(result)}
                            className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 transform hover:scale-[1.02] ${
                              index === selectedIndex
                                ? 'bg-sky-500/20 border-sky-500/50 scale-[1.02]'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-white font-medium text-lg">
                                {highlightText(result.title, value)}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-white/50">
                                {result.matchType === 'title' && (
                                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">標題</span>
                                )}
                                {result.matchType === 'tag' && (
                                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">標籤</span>
                                )}
                                {result.matchType === 'content' && (
                                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs">內容</span>
                                )}
                              </div>
                            </div>
                            
                            {result.summary && (
                              <p className="text-white/70 text-sm mb-2">
                                {highlightText(result.summary, value)}
                              </p>
                            )}
                            
                            {result.snippet && (
                              <p className="text-white/60 text-sm mb-3">
                                {highlightText(result.snippet, value)}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              {result.tags.length > 0 && (
                                <div className="flex gap-2">
                                  {result.tags.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {result.date && (
                                <span className="text-white/50 text-xs">
                                  {new Date(result.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : !isSearching && (
                      <div className="text-center py-8 text-white/50">
                        沒有找到符合的結果
                      </div>
                    )}
                  </div>
                )}

                <div className={`flex items-center justify-between transform transition-all duration-400 delay-400 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="flex items-center gap-6 text-base text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 rounded bg-white/10 text-sm font-mono">/</span>
                      <span>開啟搜尋</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 rounded bg-white/10 text-sm font-mono">Esc</span>
                      <span>關閉</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 rounded bg-white/10 text-sm font-mono">↑↓</span>
                      <span>選擇</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {value && (
                      <button
                        type="button"
                        onClick={() => {
                          setValue("");
                          setSearchResults([]);
                        }}
                        className="px-4 py-2 text-base rounded-lg bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
                      >
                        清除
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* tag OUO */}
              {value.length < 2 && (
                <>
                  <div className="border-t border-white/10"></div>
                  <div className="p-8">
                    <div className={`text-lg text-white/80 mb-6 font-medium transform transition-all duration-400 delay-300 ${
                      open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}>
                      選擇標籤
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {availableTags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => onTagClick(tag)}
                          className={`px-4 py-3 text-sm rounded-xl bg-white/10 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/50 text-white/80 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-lg transform ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                          style={{ transitionDelay: `${400 + index * 50}ms` }}
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
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .animate-float-up {
          animation: float-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
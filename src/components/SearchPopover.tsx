"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPopover() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = () => setOpen((v) => !v);

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
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(t) &&
        btnRef.current &&
        !btnRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="relative">
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
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-[22rem] max-w-[90vw] rounded-2xl border border-white/10 bg-[#0f1528]/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5"
        >
          <form onSubmit={onSubmit} className="p-3">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white/70">
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
                placeholder="搜尋文章、標籤、年份…（按 Esc 關閉）"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => setValue("")}
                  className="px-2 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/15 text-white/70"
                  aria-label="Clear"
                >
                  清除
                </button>
              )}
              <button
                type="submit"
                className="px-3 py-1.5 text-xs rounded-lg bg-white/90 hover:bg-white text-black font-medium"
              >
                搜尋
              </button>
            </div>
            <div className="mt-2 text-[10px] text-white/40">
              快捷鍵：按 <span className="px-1 rounded bg-white/10">/</span> 開啟、<span className="px-1 rounded bg-white/10">Esc</span> 關閉
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

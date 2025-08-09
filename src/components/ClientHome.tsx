"use client";
import { Typewriter } from "react-simple-typewriter";
import ShootingStar from "./ShootingStar";
import BackgroundStars from "./BackgroundStars";
import { useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Post {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  summary?: string;
}
interface ClientHomeProps {
  allPostsData: Post[];
}

const PAGE_SIZE = 5;

export default function ClientHome({ allPostsData }: ClientHomeProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const totalPages = Math.max(1, Math.ceil(allPostsData.length / PAGE_SIZE));

  const pagePosts = useMemo(() => {
    const start = (current - 1) * PAGE_SIZE;
    return allPostsData.slice(start, start + PAGE_SIZE);
  }, [allPostsData, current]);

useEffect(() => {
  if (searchParams.get("page")) {
    const el = document.getElementById("posts");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}, [current, searchParams])

  const goto = (p: number) => {
    const clamped = Math.min(totalPages, Math.max(1, p));
    router.push(`/?page=${clamped}#posts`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-x-hidden overflow-y-auto">
      <div className="cosmic-bg" />
      <BackgroundStars />
      <ShootingStar />

      {/* 封面 */}
      <section className="h-screen flex flex-col items-center justify-center relative z-10 w-full">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          <Typewriter
            words={["Welcome to my universe"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Hi! My name is Roku, nice to meet you.
        </p>
        <a
          href="#posts"
          className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce text-white text-3xl opacity-70 select-none"
        >
          ↓
        </a>
      </section>

      {/* 文章列表 */}
      <section id="posts" className="w-full px-4 pb-20 pt-20">
        <ul className="space-y-8">
          {pagePosts.map(({ id, date, title, tags, summary }) => (
            <li
              key={id}
              className="w-full max-w-[900px] mx-auto bg-[#22253a]/80 border border-white/10 rounded-2xl shadow-lg px-16 py-8 transition hover:scale-105 hover:shadow-2xl"
              style={{ minHeight: "140px" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-base text-gray-400">{date}</span>
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#373e5b] text-sm text-blue-300 rounded px-3 py-1 ml-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <a
                href={`/posts/${id}`}
                className="block text-2xl font-bold text-white hover:underline mb-2 text-left"
              >
                {title}
              </a>
              {summary && (
                <p className="text-lg text-gray-300 text-left">{summary}</p>
              )}
            </li>
          ))}
        </ul>

        <Pagination
          current={current}
          total={totalPages}
          onJump={goto}
        />
      </section>
    </div>
  );
}

function Pagination({
  current,
  total,
  onJump,
}: {
  current: number;
  total: number;
  onJump: (p: number) => void;
}) {
  //if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onJump(current - 1)}
        disabled={current === 1}
        className={`px-3 py-2 rounded-xl border border-white/10 text-sm ${
          current === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/5"
        }`}
      >
        ‹
      </button>

      {pages.map((p) => {
        const active = p === current;
        return (
          <button
            key={p}
            onClick={() => onJump(p)}
            aria-current={active ? "page" : undefined}
            className={`w-9 h-9 rounded-xl grid place-items-center text-sm transition border border-white/10
              ${
                active
                  ? "bg-sky-500/30 text-sky-200 ring-2 ring-sky-400/40"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => onJump(current + 1)}
        disabled={current === total}
        className={`px-3 py-2 rounded-xl border border-white/10 text-sm ${
          current === total
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-white/5"
        }`}
      >
        ›
      </button>
    </nav>
  );
}
"use client";
import { Typewriter } from "react-simple-typewriter";
import ShootingStar from "./ShootingStar";
import BackgroundStars from "./BackgroundStars";

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

export default function ClientHome({ allPostsData }: ClientHomeProps) {
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
        {/* 箭頭 */}
        <a href="#posts" className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce text-white text-3xl opacity-70 select-none">
          ↓
        </a>
      </section>

      {/* 文章 */}
      <section id="posts" className="w-full max-w-2xl mx-auto pb-20 pt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">文章列表</h2>
        <ul className="space-y-8">
  {allPostsData.map(({ id, date, title, tags, summary }) => (
    <li
      key={id}
      className="bg-[#22253a]/80 border border-white/10 rounded-2xl shadow-lg p-8 transition hover:scale-105 hover:shadow-2xl"
    >
      <div className="text-sm text-gray-400 mb-2">{date}</div>
      <a
        href={`/posts/${id}`}
        className="block text-2xl sm:text-3xl font-bold text-white hover:underline mb-2 text-left"
      >
        {title}
      </a>
      {summary && (
        <p className="text-base text-gray-300 mb-4 text-left">{summary}</p>
      )}
      <div className="flex gap-2 flex-wrap text-left">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="bg-[#373e5b] text-xs text-blue-300 rounded px-2 py-1"
          >
            #{tag}
          </span>
        ))}
      </div>
    </li>
  ))}
</ul>

      </section>
    </div>
  );
}
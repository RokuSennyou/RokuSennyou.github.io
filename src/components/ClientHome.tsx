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

      {/* 文章列表 */}
      <section id="posts" className="w-full px-4 pb-20 pt-20">
        <ul className="space-y-8">
          {allPostsData.map(({ id, date, title, tags, summary }) => (
            <li
              key={id}
              className="w-full max-w-[1000px] mx-auto bg-[#22253a]/80 border border-white/10 rounded-2xl shadow-lg px-16 py-8 transition hover:scale-105 hover:shadow-2xl"
              style={{ minHeight: '140px' }}
            >
              {/* 日期＋Tag */}
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
              {/* 標題 */}
              <a
                href={`/posts/${id}`}
                className="block text-2xl font-bold text-white hover:underline mb-2 text-left"
              >
                {title}
              </a>
              {/* 摘要 */}
              {summary && (
                <p className="text-lg text-gray-300 text-left">{summary}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
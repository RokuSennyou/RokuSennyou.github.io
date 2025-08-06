"use client";
import { Typewriter } from "react-simple-typewriter";
import ShootingStar from "./ShootingStar";
import BackgroundStars from "./BackgroundStars";

interface Post {
  id: string;
  date: string;
  title: string;
  tags?: string[];
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
      <section className="h-screen flex flex-col items-center justify-center relative z-10">
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white text-3xl opacity-70 select-none">
          ↓
        </div>
      </section>

      {/* 文章 */}
      <section id="posts" className="w-full max-w-2xl mx-auto pb-20 pt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">文章列表</h2>
        <ul className="space-y-6">
          {allPostsData.map(({ id, date, title, tags }) => (
            <li
              key={id}
              className="bg-[#22253a]/80 border border-white/10 rounded-2xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl"
            >
              <a
                href={`/posts/${id}`}
                className="text-2xl font-bold text-white hover:underline"
              >
                {title}
              </a>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-400">{date}</div>
                <div className="flex gap-2 flex-wrap">
                  {tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#373e5b] text-xs text-blue-300 rounded px-2 py-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* 摘要 */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

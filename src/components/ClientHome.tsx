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
    <div className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="cosmic-bg" />
      <BackgroundStars />
      <ShootingStar />
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
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">文章列表</h1>
        <ul>
          {allPostsData.map(({ id, date, title, tags }) => (
            <li key={id} className="mb-4">
              <a href={`/posts/${id}`} className="text-xl font-semibold hover:underline">{title}</a>
              <div className="text-sm text-gray-400">{date}</div>
              <div className="text-xs text-gray-600">{tags?.join(', ')}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

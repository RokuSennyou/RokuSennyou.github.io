"use client";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-center text-center px-4">
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
        A passionate developer sharing insights, experiences, and creative projects
      </p>
      <div className="space-x-4">
        <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
          Explore My Work
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          Get In Touch
        </button>
      </div>
    </div>
  );
}

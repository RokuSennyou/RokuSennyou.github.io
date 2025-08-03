"use client";
import { Typewriter } from "react-simple-typewriter";
import ShootingStar from "../components/ShootingStar";
import BackgroundStars from "../components/BackgroundStars";

export default function Home() {
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
    </div>
  );
}

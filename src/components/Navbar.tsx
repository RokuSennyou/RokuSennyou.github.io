"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isExpanded = hovered || !scrolled;
  
  const sizeClass = isExpanded
    ? "h-16 text-xl shadow-md"
    : "h-10 text-base shadow-sm opacity-90 backdrop-blur";

  const buttonClass = isExpanded
    ? "px-4 py-2 text-lg"
    : "px-2 py-1 text-sm";

  return (
    <nav
      className={
        "fixed top-0 left-0 w-full z-40 px-8 flex items-center transition-all duration-300 " +
        "bg-[#181e33cc] backdrop-blur-lg shadow-lg border-b border-white/10 " +
        sizeClass
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href="/" className="font-bold text-white-200 tracking-wide mr-auto select-none">
        🪐 Roku&apos;s Universe
      </a>
      <ul className="flex space-x-4 items-center font-medium">
        <li>
          <a
            href="/"
            className={`flex items-center gap-2 rounded-xl transition-all duration-300 ${buttonClass}
              ${pathname === "/" 
                ? "border-2 border-cyan-400 bg-cyan-900/30 text-cyan-300 shadow-[0_0_8px_2px_rgba(6,182,212,0.3)]" 
                : "text-gray-300 hover:text-white hover:bg-white/10"}`}
          >
            <span role="img" aria-label="Home">🌌</span> Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className={`flex items-center gap-2 rounded-xl transition-all duration-300 ${buttonClass}
              ${pathname.startsWith("/about")
                ? "border-2 border-cyan-400 bg-cyan-900/30 text-cyan-300 shadow-[0_0_8px_2px_rgba(6,182,212,0.3)]"
                : "text-gray-300 hover:text-white hover:bg-white/10"}`}
          >
            <span role="img" aria-label="About">🌙</span> About
          </a>
        </li>
        <li>
          {/*<a
            href="/blog"
            className={`flex items-center gap-2 rounded-xl transition-all duration-300 ${buttonClass}
              ${pathname.startsWith("/blog")
                ? "border-2 border-cyan-400 bg-cyan-900/30 text-cyan-300 shadow-[0_0_8px_2px_rgba(6,182,212,0.3)]"
                : "text-gray-300 hover:text-white hover:bg-white/10"}`}
          >
            <span role="img" aria-label="Blog">🌠</span> Blog
          </a>*/}
        </li>
      </ul>
    </nav>
  );
}

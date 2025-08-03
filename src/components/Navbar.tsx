"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sizeClass =
    hovered || !scrolled
      ? "h-16 text-xl shadow-md"
      : "h-10 text-base shadow-sm opacity-90 backdrop-blur";

  return (
    <nav
      className={
        "fixed top-0 left-0 w-full bg-gray-900/90 flex items-center transition-all duration-300 z-40 px-8 " +
        sizeClass
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href="/" className="font-bold text-yellow-200 tracking-wide mr-auto select-none">
        Roku&apos;s Universe
      </a>
      <div className="flex gap-8 font-medium">
        <Link href="/" className="text-gray-100 hover:text-yellow-200 transition">Home</Link>
        <Link href="/about" className="text-gray-100 hover:text-yellow-200 transition">About</Link>
        <Link href="/blog" className="text-gray-100 hover:text-yellow-200 transition">Blog</Link>
        <Link href="/contact" className="text-gray-100 hover:text-yellow-200 transition">Contact me</Link>
      </div>
    </nav>
  );
}

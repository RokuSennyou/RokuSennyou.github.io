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
        "fixed top-0 left-0 w-full bg-[rgba(10,10,20,0.85)] flex items-center justify-center transition-all duration-300 z-40 " +
        sizeClass
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex gap-8 font-bold tracking-wide transition-all duration-300">
        <Link href="/" className="hover:text-sky-300 transition">Home</Link>
        <Link href="/about" className="hover:text-sky-300 transition">About</Link>
        <Link href="/blog" className="hover:text-sky-300 transition">Blog</Link>
        <Link href="/contact" className="hover:text-sky-300 transition">Contact me</Link>
      </div>
    </nav>
  );
}

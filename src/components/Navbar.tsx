"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchPopover from "./SearchPopover";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isExpanded = hovered || !scrolled;
  
  const sizeClass = isExpanded
    ? "h-14 sm:h-16 text-base sm:text-xl shadow-md"
    : "h-10 text-sm sm:text-base shadow-sm opacity-90 backdrop-blur";

  const buttonClass = isExpanded
    ? "px-3 sm:px-4 py-2 text-sm sm:text-lg"
    : "px-2 py-1 text-xs sm:text-sm";

  const linkBase = `flex items-center gap-2 rounded-xl transition-all duration-300 ${buttonClass}`;

  return (
    <>
      <nav
        className={
          "fixed top-0 left-0 w-full z-40 px-3 sm:px-6 md:px-8 flex items-center transition-all duration-300 " +
          "bg-[#181e33cc] backdrop-blur-lg shadow-lg border-b border-white/10 " +
          sizeClass
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href="/" className="font-bold text-white-200 tracking-wide mr-auto select-none text-sm sm:text-base">
          <span className="inline sm:hidden">🪐 Roku</span>
          <span className="hidden sm:inline">🪐 Roku&apos;s Universe</span>
        </Link>

        <ul className="hidden md:flex space-x-2 lg:space-x-4 items-center font-medium">
          <li>
            <Link
              href="/"
              className={`${linkBase}
                ${pathname === "/" 
                  ? "border-2 border-cyan-400 bg-cyan-900/30 text-cyan-300 shadow-[0_0_8px_2px_rgba(6,182,212,0.3)]" 
                  : "text-gray-300 hover:text-white hover:bg-white/10"}`}
            >
              <span role="img" aria-label="Home">🌌</span> Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${linkBase}
                ${pathname.startsWith("/about")
                  ? "border-2 border-cyan-400 bg-cyan-900/30 text-cyan-300 shadow-[0_0_8px_2px_rgba(6,182,212,0.3)]"
                  : "text-gray-300 hover:text-white hover:bg-white/10"}`}
            >
              <span role="img" aria-label="About">🌙</span> About
            </Link>
          </li>
          <li>
            <SearchPopover />
          </li>
        </ul>

        <div className="md:hidden flex items-center gap-1">
          <SearchPopover />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-14 left-0 right-0 z-30 md:hidden px-3 pt-2">
          <div className="rounded-2xl border border-white/10 bg-[#181e33f2] backdrop-blur-lg p-2 shadow-xl">
            <Link
              href="/"
              className={`w-full ${linkBase} ${pathname === "/" 
                ? "border-2 border-cyan-400 bg-cyan-900/30 text-cyan-300 shadow-[0_0_8px_2px_rgba(6,182,212,0.3)]" 
                : "text-gray-300 hover:text-white hover:bg-white/10"}`}
            >
              <span role="img" aria-label="Home">🌌</span> Home
            </Link>
            <Link
              href="/about"
              className={`mt-2 w-full ${linkBase} ${pathname.startsWith("/about")
                ? "border-2 border-cyan-400 bg-cyan-900/30 text-cyan-300 shadow-[0_0_8px_2px_rgba(6,182,212,0.3)]"
                : "text-gray-300 hover:text-white hover:bg-white/10"}`}
            >
              <span role="img" aria-label="About">🌙</span> About
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
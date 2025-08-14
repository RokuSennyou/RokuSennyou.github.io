"use client";

import { useEffect, useState } from "react";

type Props = {
  height?: number;  
  color?: string;   
  zIndex?: number;   
  glow?: boolean;   
};

export default function ScrollProgress({
  height = 3,
  color = "#0ea5e9",
  zIndex = 60,   
  glow = true,
}: Props) {
  const [w, setW] = useState(0);

  useEffect(() => {
    const compute = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0));
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      setW(pct);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute(); 

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        zIndex,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: `${w}%`,
          height: "100%",
          background: color,
          transition: "width 60ms linear",
          boxShadow: glow
            ? `0 0 10px ${color}80, 0 0 4px ${color}80`
            : "none",
        }}
      />
    </div>
  );
}
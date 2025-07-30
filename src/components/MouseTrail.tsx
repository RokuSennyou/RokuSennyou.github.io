"use client";
import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number; //ms
  color: string;
};

const COLORS = [
  "white",
  "#a3bffa", 
  "#c2a2f5",
  "#ffe7aa", 
  "#f8fafc",
];

export default function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      setParticles((prev) => [
        ...prev,
        {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          size: 3 + Math.random() * 3,
          life: 600 + Math.random() * 300,
          color,
        },
      ]);
    }
    window.addEventListener("mousemove", handleMove);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 60 }))
          .filter((p) => p.life > 0)
      );
    }, 60);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: Math.max(0, p.life / 800),
            borderRadius: "50%",
            boxShadow: `0 0 8px 4px ${p.color}, 0 0 16px 4px #fff8`,
            pointerEvents: "none",
            transition: "opacity 0.2s linear",
          }}
        />
      ))}
    </div>
  );
}

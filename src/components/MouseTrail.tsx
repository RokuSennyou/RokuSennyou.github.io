"use client";
import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number;
};

export default function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setParticles((prev) => [
        ...prev,
        {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          size: 1.2 + Math.random() * 0.7, // 超細！1.2~1.9px
          life: 400 + Math.random() * 220,
        },
      ]);
    }
    window.addEventListener("mousemove", handleMove);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 40 }))
          .filter((p) => p.life > 0)
      );
    }, 40);

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
            background: "white",
            opacity: Math.max(0, p.life / 400),
            borderRadius: "50%",
            boxShadow: `0 0 4px 1.5px #fff, 0 0 8px 0.5px #fff`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}

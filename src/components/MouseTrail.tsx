"use client";
import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number;
};

function randomAround(x: number, y: number, radius = 14) {
  const theta = Math.random() * 2 * Math.PI;
  const r = Math.random() * radius;
  return {
    x: x + Math.cos(theta) * r,
    y: y + Math.sin(theta) * r,
  };
}

export default function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const particleId = useRef(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setMouse({ x: e.clientX, y: e.clientY });
      const now = Date.now();
      if (now - lastEmit.current > 40) {
        lastEmit.current = now;
        const offset = randomAround(e.clientX, e.clientY, 14);
        setParticles((prev) => [
          ...prev,
          {
            id: particleId.current++,
            x: offset.x,
            y: offset.y,
            size: 1.2 + Math.random() * 0.7,
            life: 150 + Math.random() * 50,
          },
        ]);
      }
    }
    window.addEventListener("mousemove", handleMove);

    // 靜止時持續閃爍
    const staticStarInterval = setInterval(() => {
      if (mouse) {
        const offset = randomAround(mouse.x, mouse.y, 14);
        setParticles((prev) => [
          ...prev,
          {
            id: particleId.current++,
            x: offset.x,
            y: offset.y,
            size: 1.2 + Math.random() * 0.7,
            life: 150 + Math.random() * 50,
          },
        ]);
      }
    }, 180);

    const decay = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 30 }))
          .filter((p) => p.life > 0)
      );
    }, 30);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(staticStarInterval);
      clearInterval(decay);
    };
  }, [mouse]);

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
            opacity: Math.max(0, p.life / 150),
            borderRadius: "50%",
            boxShadow: `0 0 4px 1.5px #fff, 0 0 8px 0.5px #fff`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}

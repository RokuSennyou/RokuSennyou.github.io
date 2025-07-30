"use client";
import { useEffect, useState } from "react";

const STAR_COUNT = 80;

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

export default function BackgroundStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // 初始化時產生固定數量的星星
    const s: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      s.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 1.8 + Math.random() * 2.2,
      });
    }
    setStars(s);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.85,
            animation: `star-blink ${star.duration}s infinite alternate`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 4px 2px white, 0 0 12px 1px #fff7`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes star-blink {
          from {
            opacity: 0.6;
            filter: brightness(1.2);
          }
          to {
            opacity: 1;
            filter: brightness(2.5) blur(1px);
          }
        }
      `}</style>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

type Meteor = {
  id: number;
  top: number;
  left: number;
  duration: number;
};

export default function ShootingStar() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMeteors((prev) => {
        const count = Math.floor(Math.random() * 2) + 1;
        const newMeteors: Meteor[] = [];
        for (let i = 0; i < count; i++) {
          newMeteors.push({
            id: Date.now() + i,
            top: Math.random() * 80,
            left: Math.random() * 80,
            duration: 1 + Math.random() * 0.7,
          });
        }
        return [...prev, ...newMeteors].slice(-30);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute w-[2px] h-20 bg-white opacity-80"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animation: `meteor-move-45deg-${m.id} ${m.duration}s linear forwards`,
          }}
        />
      ))}
      <style jsx>{`
        ${meteors
          .map(
            (m) => `
            @keyframes meteor-move-45deg-${m.id} {
              0% {
                transform: rotate(-45deg) translate(0, 0);
                opacity: 1;
              }
              100% {
                transform: rotate(-45deg) translate(0, 200px);
                opacity: 0;
              }
            }
          `
          )
          .join("\n")}
      `}</style>
    </div>
  );
}

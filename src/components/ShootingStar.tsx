"use client";
import { useEffect, useState } from "react";

export default function ShootingStar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    visible && (
      <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none z-0">
        <div className="shooting-star" />
        <style jsx>{`
          .shooting-star {
            position: absolute;
            top: 10%;
            left: 10%;
            width: 150px;
            height: 2px;
            background: linear-gradient(90deg, white, transparent);
            animation: shoot 1s linear;
          }

          @keyframes shoot {
            0% {
              transform: translate(0, 0) rotate(45deg);
              opacity: 1;
            }
            100% {
              transform: translate(500px, 500px) rotate(45deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  );
}

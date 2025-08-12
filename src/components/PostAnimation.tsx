"use client";
import { useEffect, useState, ReactNode } from "react";

interface PostAnimationProps {
  children: ReactNode;
}

export default function PostAnimation({ children }: PostAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
  <div
    className={`w-full transition-all duration-1000 ease-out transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}
  >
    {children}
  </div>
);

}
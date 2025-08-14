import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MouseTrail from "@/components/MouseTrail";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import SocialBar from "@/components/SocialBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roku's Universe",
  description: "A place to explore Roku's creative universe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollProgress height={3} color="#0ea5e9" zIndex={60} />
        <MouseTrail />
        <Navbar />
        <main className="pt-16">{children}</main>
        <footer className="relative bg-[#181e33] text-gray-400 p-6">
          <div className="text-center text-sm">
            © 2025 RokuSennyou. All rights reserved.
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <SocialBar />
          </div>
        </footer>
      </body>
    </html>
  );
}

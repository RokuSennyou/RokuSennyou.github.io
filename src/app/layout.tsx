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
  icons: {
    icon: '/icon.png',
  },
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
        <main className="pt-14 sm:pt-16">{children}</main>
        <footer className="relative bg-[#181e33] text-gray-400 p-4 sm:p-6">
          <div className="text-center text-xs sm:text-sm">
            © 2026 RokuSennyou. All rights reserved.
          </div>
          <div className="mt-3 md:mt-0 flex justify-center md:block md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
            <SocialBar />
          </div>
        </footer>
      </body>
    </html>
  );
}

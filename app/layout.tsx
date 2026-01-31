import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Terminal from "@/components/Terminal";
import MouseFollower from "@/components/MouseFollower";
import AIChatbot from "@/components/AIChatbot";
import { BackgroundBeams } from "@/components/ui/background-beams";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devin - Platform Developer & Motorsport Enthusiast",
  description: "Portfolio of Devin, a 16-year-old Platform Developer apprentice at PwC Switzerland, passionate about motorsport, sim racing, and building innovative digital experiences.",
  keywords: ["Platform Developer", "PwC", "Next.js", "Motorsport", "Formula 1", "Web Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-black text-white md:cursor-none`}>
        <MouseFollower />
        <ScrollProgress />
        <Navbar />
        <Terminal />
        <AIChatbot />
        <main className="relative">
          {children}
          <BackgroundBeams className="fixed inset-0 z-0 pointer-events-none opacity-50" />
        </main>
      </body>
    </html>
  );
}

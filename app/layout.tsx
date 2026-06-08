import type { Metadata, Viewport } from "next";
import { anton, geistSans, geistMono } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PerfProvider } from "@/components/providers/PerfProvider";

export const viewport: Viewport = {
  themeColor: '#080B14',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devin-voegele.vercel.app"),
  title: {
    default: "Devin Vögele — Developer & Creative Technologist",
    template: "%s | Devin Vögele"
  },
  description: "Developer and creative technologist based in Switzerland, building premium web experiences, motorsport media platforms, and interactive tools.",
  keywords: [
    "Devin Vögele",
    "Devin Voegele",
    "Developer",
    "Creative Technologist",
    "Platform Development",
    "PwC Switzerland",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Zürich",
    "Switzerland",
    "Formula 1",
    "Motorsport"
  ],
  authors: [{ name: "Devin Vögele", url: "https://devin-voegele.vercel.app" }],
  creator: "Devin Vögele",
  publisher: "Devin Vögele",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devin-voegele.vercel.app",
    siteName: "Devin Vögele",
    title: "Devin Vögele — Developer & Creative Technologist",
    description: "Developer and creative technologist based in Switzerland, building premium web experiences, motorsport media platforms, and interactive tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devin Vögele - Developer & Creative Technologist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devin Vögele — Developer & Creative Technologist",
    description: "Developer and creative technologist based in Switzerland, building premium web experiences, motorsport media platforms, and interactive tools.",
    images: ["/og-image.png"],
    creator: "@devinvoegele",
  },
  alternates: {
    canonical: "https://devin-voegele.vercel.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${anton.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {/* Site-wide ambient radial glow — very faint, keeps sections from pure black */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 80% 50% at 15% 20%, rgba(37,99,235,0.05) 0%, transparent 60%),' +
              'radial-gradient(ellipse 70% 50% at 85% 80%, rgba(16,185,129,0.04) 0%, transparent 60%),' +
              'radial-gradient(ellipse 60% 40% at 50% 55%, rgba(139,92,246,0.04) 0%, transparent 60%)',
          }}
        />
        <PerfProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </PerfProvider>
      </body>
    </html>
  );
}

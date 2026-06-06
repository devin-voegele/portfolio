import type { Metadata, Viewport } from "next";
import { anton, geistSans, geistMono } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { TrailCursor } from "@/components/cursor/TrailCursor";

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
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
        <SmoothScroll>{children}</SmoothScroll>
        <TrailCursor />
      </body>
    </html>
  );
}

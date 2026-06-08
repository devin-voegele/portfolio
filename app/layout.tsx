import type { Metadata, Viewport } from "next";
import { anton, geistSans, geistMono, caveat } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PerfProvider } from "@/components/providers/PerfProvider";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { MountainBackdrop } from "@/components/effects/MountainBackdrop";

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Devin Vögele — Developer & Creative Technologist",
    description: "Developer and creative technologist based in Switzerland, building premium web experiences, motorsport media platforms, and interactive tools.",
    creator: "@devinvoegele",
  },
  alternates: {
    canonical: "https://devin-voegele.vercel.app",
  },
  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Devin Vögele",
  "jobTitle": "Developer & Creative Technologist",
  "url": "https://devin-voegele.vercel.app",
  "worksFor": { "@type": "Organization", "name": "PwC Switzerland" },
  "address": { "@type": "PostalAddress", "addressLocality": "Würenlos", "addressCountry": "CH" },
  "sameAs": [
    "https://github.com/devin-voegele/",
    "https://www.linkedin.com/in/devin-voegele-2a5989293"
  ],
  "knowsAbout": [
    "Web Development", "Next.js", "TypeScript", "Cloud", "DevOps",
    "Kubernetes", "Identity & Access Management"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${anton.variable} ${geistSans.variable} ${geistMono.variable} ${caveat.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollProgress />
        {/* Mountain silhouette backdrop — fixed, behind all content, parallax-scrolled */}
        <MountainBackdrop />
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

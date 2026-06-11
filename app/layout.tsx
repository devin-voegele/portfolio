import type { Metadata, Viewport } from "next";
import { anton, geistSans, geistMono, caveat } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PerfProvider } from "@/components/providers/PerfProvider";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { MountainBackdrop } from "@/components/effects/MountainBackdrop";
import { Nav } from "@/components/sections/Nav";

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://voegele.dev"),
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
    "Platform Developer",
    "PwC Switzerland",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Cloud",
    "DevOps",
    "Zürich",
    "Switzerland",
    "Motorsport"
  ],
  authors: [{ name: "Devin Vögele", url: "https://voegele.dev" }],
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
    type: "profile",
    locale: "en_US",
    url: "https://voegele.dev",
    siteName: "Devin Vögele",
    title: "Devin Vögele — Developer & Creative Technologist",
    description: "Developer and creative technologist based in Switzerland, building premium web experiences, motorsport media platforms, and interactive tools.",
    firstName: "Devin",
    lastName: "Vögele",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devin Vögele — Developer & Creative Technologist",
    description: "Developer and creative technologist based in Switzerland, building premium web experiences, motorsport media platforms, and interactive tools.",
    creator: "@devinvoegele",
  },
  alternates: {
    canonical: "./",
  },
  category: "technology",
};

// Person + WebSite entity graph. The Person node is the signal Google's
// Knowledge Graph reconciles against — keep name, jobTitle, sameAs and
// url consistent with LinkedIn/GitHub so the panel picks up "Developer",
// not stale third-party labels.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://voegele.dev/#person",
      "name": "Devin Vögele",
      "alternateName": "Devin Voegele",
      "givenName": "Devin",
      "familyName": "Vögele",
      "jobTitle": "Developer & Creative Technologist",
      "description":
        "Developer and creative technologist based in Switzerland, working in platform development at PwC Switzerland — web experiences, cloud, automation and identity.",
      "url": "https://voegele.dev",
      "image": "https://voegele.dev/opengraph-image",
      "email": "mailto:devin.voegele@microsun.ch",
      "worksFor": {
        "@type": "Organization",
        "name": "PwC Switzerland",
        "url": "https://www.pwc.ch"
      },
      "address": { "@type": "PostalAddress", "addressLocality": "Würenlos", "addressCountry": "CH" },
      "nationality": { "@type": "Country", "name": "Switzerland" },
      "sameAs": [
        "https://github.com/devin-voegele/",
        "https://www.linkedin.com/in/devin-voegele-2a5989293"
      ],
      "knowsAbout": [
        "Web Development", "Next.js", "TypeScript", "React", "Cloud Computing",
        "DevOps", "Kubernetes", "CI/CD", "Identity & Access Management",
        "Motion Design", "Motorsport Media"
      ],
      "mainEntityOfPage": { "@id": "https://voegele.dev/#website" }
    },
    {
      "@type": "WebSite",
      "@id": "https://voegele.dev/#website",
      "url": "https://voegele.dev",
      "name": "Devin Vögele — Portfolio",
      "publisher": { "@id": "https://voegele.dev/#person" },
      "inLanguage": "en"
    },
    {
      "@type": "ProfilePage",
      "@id": "https://voegele.dev/#profilepage",
      "url": "https://voegele.dev",
      "mainEntity": { "@id": "https://voegele.dev/#person" },
      "isPartOf": { "@id": "https://voegele.dev/#website" }
    }
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <Nav />
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

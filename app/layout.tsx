import type { Metadata, Viewport } from "next";
import { geistSans, geistMono, calSans } from "./fonts";
import "./globals.css";
import { PerfProvider } from "@/components/providers/PerfProvider";
import { Nav } from "@/components/fg/Nav";

export const viewport: Viewport = {
  themeColor: "#000000",
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
      "email": "devin.voegele@microsun.ch",
      "worksFor": {
        "@type": "Organization",
        "name": "PwC Switzerland",
        "url": "https://www.pwc.ch"
      },
      "address": { "@type": "PostalAddress", "addressLocality": "Würenlos", "addressCountry": "CH" },
      "nationality": { "@type": "Country", "name": "Switzerland" },
      "sameAs": [
        "https://github.com/devin-voegele/",
        "https://www.linkedin.com/in/devin-voegele-2a5989293",
        "https://www.wikidata.org/wiki/Q137946248"
      ],
      "knowsAbout": [
        "Web Development", "Next.js", "TypeScript", "React", "Cloud Computing",
        "DevOps", "Kubernetes", "CI/CD", "Identity & Access Management",
        "Motion Design", "Motorsport Media"
      ],
      "mainEntityOfPage": { "@id": "https://voegele.dev/#profilepage" }
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${calSans.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Nav />
        <PerfProvider>{children}</PerfProvider>
      </body>
    </html>
  );
}

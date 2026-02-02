import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Terminal from "@/components/Terminal";
import MouseFollower from "@/components/MouseFollower";
import AIChatbot from "@/components/AIChatbot";
import { BackgroundBeams } from "@/components/ui/background-beams-static";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://devin-voegele.vercel.app"),
  title: {
    default: "Devin Vögele | IAM Developer & Graphic Designer | PwC Switzerland",
    template: "%s | Devin Vögele"
  },
  description: "Devin Vögele is a 17-year-old IAM Developer at PwC Switzerland specializing in Identity & Access Management, web development, penetration testing, and motion graphics design with 40M+ views. Based in Zürich, Switzerland.",
  keywords: [
    "Devin Vögele",
    "Devin Voegele", 
    "IAM Developer",
    "Identity Access Management",
    "PwC Switzerland",
    "Web Developer",
    "Penetration Testing",
    "Cybersecurity",
    "Graphic Designer",
    "Motion Graphics",
    "After Effects",
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
    siteName: "Devin Vögele Portfolio",
    title: "Devin Vögele | IAM Developer & Graphic Designer",
    description: "17-year-old IAM Developer at PwC Switzerland. Specializing in Identity & Access Management, web development, penetration testing, and motion graphics with 40M+ views.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devin Vögele - IAM Developer & Graphic Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devin Vögele | IAM Developer & Graphic Designer",
    description: "17-year-old IAM Developer at PwC Switzerland. Web development, penetration testing, and motion graphics with 40M+ views.",
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
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white md:cursor-none`}>
        <MouseFollower />
        <ScrollProgress />
        <Navbar />
        <Terminal />
        <AIChatbot />
        <main className="relative">
          {children}
          <BackgroundBeams className="fixed inset-0 z-0 pointer-events-none opacity-30" />
        </main>
      </body>
    </html>
  );
}

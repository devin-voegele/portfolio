import Hero from "@/components/Hero";
import HeroHighlightSection from "@/components/HeroHighlightSection";
import PointerHighlightSection from "@/components/PointerHighlightSection";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import StatsCounter from "@/components/StatsCounter";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroHighlightSection />
      <PointerHighlightSection />
      <StatsCounter />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

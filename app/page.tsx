import Hero from "@/components/Hero";
import HeroScroll from "@/components/HeroScroll";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import StatsCounter from "@/components/StatsCounter";
import MovingLine from "@/components/ui/MovingLine";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroScroll />
      <StatsCounter />
      <MovingLine>
        <About />
        <Projects />
        <Skills />
      </MovingLine>
      <Contact />
    </>
  );
}

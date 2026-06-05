"use client";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function PointerHighlightSection() {
  return (
    <section className="bg-black py-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-2xl font-bold tracking-tight md:text-4xl text-white text-center leading-relaxed">
        The best way to grow is to{" "}
        <PointerHighlight
          rectangleClassName="border-accent"
          pointerClassName="text-accent"
        >
          <span>collaborate.</span>
        </PointerHighlight>
      </div>
    </section>
  );
}

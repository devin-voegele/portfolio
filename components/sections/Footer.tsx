export function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-10 px-6 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg text-white tracking-wider">
          DEVIN<span className="text-zinc-300">VÖGELE</span>
        </span>
        <p className="text-xs text-zinc-600 font-sans">
          © {new Date().getFullYear()}{" "}Devin Vögele · Developer &amp; Creative Technologist
        </p>
        <a
          href="mailto:devin.voegele@microsun.ch"
          className="text-xs text-zinc-500 hover:text-white transition-colors font-sans"
        >
          devin.voegele@microsun.ch
        </a>
      </div>
    </footer>
  )
}

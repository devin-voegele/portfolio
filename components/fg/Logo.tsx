/**
 * DV monogram: a D outline with a V set inside its bowl, and three violet
 * nodes at the vertices — the same node-and-edge language as the hero network.
 * Inherits `currentColor` for the strokes, so it works on any background.
 */
export function Logo({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Devin Vögele"
      className={className}
    >
      <path
        d="M10 8h13c9.4 0 16 6.3 16 16s-6.6 16-16 16H10z"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 17.5 23 30l5.5-12.5"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8" r="3.6" fill="#7043EC" />
      <circle cx="39" cy="24" r="3.6" fill="#7043EC" />
      <circle cx="23" cy="30" r="3.6" fill="#7043EC" />
    </svg>
  )
}

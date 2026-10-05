/**
 * Logo: a heavy V with an umlaut — the "ö" in Vögele. The two violet dots are
 * the same node language as the hero network. Strokes use `currentColor`, so
 * the V follows the surrounding text colour.
 */
export function Logo({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Devin Vögele"
      className={className}
    >
      <path fill="currentColor" d="M5 15.5h10.8L24 34.8l8.2-19.3H43L29.6 44H18.4z" />
      <circle cx="16.5" cy="6.8" r="4" fill="#7043EC" />
      <circle cx="31.5" cy="6.8" r="4" fill="#7043EC" />
    </svg>
  )
}

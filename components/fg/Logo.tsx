/**
 * DV monogram: a solid D with a V cut out of its bowl and a violet node at the
 * V's vertex (the same node language as the hero network). Strokes inherit
 * `currentColor`, so it works on any background; the cut-out is true negative
 * space (evenodd), not a painted colour.
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
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M5 5h17c11.6 0 21 8.4 21 19s-9.4 19-21 19H5zM12.5 14h8.8l2.7 9 2.7-9h8.8l-8 21h-7z"
      />
      <circle cx="24" cy="35" r="3.4" fill="#7043EC" />
    </svg>
  )
}

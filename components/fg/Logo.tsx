/**
 * Logo: a V made of two slanted blades — one follows the text colour, the other
 * is the violet accent. Reads as a V, a speed mark and a pair of nodes in one.
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
      <path fill="currentColor" d="M3 6h11l9 27-6 9z" />
      <path fill="#7043EC" d="M45 6H34l-9 27 6 9z" />
    </svg>
  )
}

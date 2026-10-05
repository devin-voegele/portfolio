import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// The DV monogram (same geometry as components/fg/Logo.tsx) on black.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          borderRadius: '14px',
        }}
      >
        <svg width="50" height="50" viewBox="0 0 48 48" fill="none">
          <path
            d="M10 8h13c9.4 0 16 6.3 16 16s-6.6 16-16 16H10z"
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 17.5 23 30l5.5-12.5"
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="8" r="3.6" fill="#7043EC" />
          <circle cx="39" cy="24" r="3.6" fill="#7043EC" />
          <circle cx="23" cy="30" r="3.6" fill="#7043EC" />
        </svg>
      </div>
    ),
    { ...size }
  )
}

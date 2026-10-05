import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// The umlaut-V logo (same geometry as components/fg/Logo.tsx) on black.
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
        <svg width="48" height="48" viewBox="0 0 48 48">
          <path fill="#ffffff" d="M5 15.5h10.8L24 34.8l8.2-19.3H43L29.6 44H18.4z" />
          <circle cx="16.5" cy="6.8" r="4" fill="#7043EC" />
          <circle cx="31.5" cy="6.8" r="4" fill="#7043EC" />
        </svg>
      </div>
    ),
    { ...size }
  )
}

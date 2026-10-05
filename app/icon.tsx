import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// The two-blade V logo (same geometry as components/fg/Logo.tsx) on black.
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
          <path fill="#ffffff" d="M3 6h11l9 27-6 9z" />
          <path fill="#7043EC" d="M45 6H34l-9 27 6 9z" />
        </svg>
      </div>
    ),
    { ...size }
  )
}

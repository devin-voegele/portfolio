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
        <svg width="48" height="48" viewBox="0 0 48 48">
          <path
            fillRule="evenodd"
            fill="#ffffff"
            d="M5 5h17c11.6 0 21 8.4 21 19s-9.4 19-21 19H5zM12.5 14h8.8l2.7 9 2.7-9h8.8l-8 21h-7z"
          />
          <circle cx="24" cy="35" r="3.4" fill="#7043EC" />
        </svg>
      </div>
    ),
    { ...size }
  )
}

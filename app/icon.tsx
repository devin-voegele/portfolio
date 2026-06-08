import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

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
          background: '#0a0a0a',
          borderRadius: '14px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 40% 40%, rgba(37,99,235,0.35) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#ededed',
            zIndex: 1,
            lineHeight: 1,
          }}
        >
          DV
        </div>
      </div>
    ),
    { ...size }
  )
}

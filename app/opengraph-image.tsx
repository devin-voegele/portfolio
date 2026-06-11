import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Devin Vögele — Developer & Creative Technologist'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: '#0a0a0a',
          padding: '64px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blue radial glow — top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.30) 0%, transparent 65%)',
            display: 'flex',
          }}
        />
        {/* Green radial glow — bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 65%)',
            display: 'flex',
          }}
        />
        {/* Purple radial glow — center */}
        <div
          style={{
            position: 'absolute',
            top: '200px',
            left: '500px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2563eb 0%, #10b981 50%, #8b5cf6 100%)',
            display: 'flex',
          }}
        />

        {/* DV monogram top-right */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            right: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: 'rgba(37,99,235,0.15)',
            border: '1px solid rgba(37,99,235,0.35)',
            color: '#3b82f6',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          DV
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 1 }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#ededed',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            Devin Vögele
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#a1a1aa',
              letterSpacing: '0.01em',
            }}
          >
            Developer &amp; Creative Technologist
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: '#10b981',
                fontWeight: 500,
              }}
            >
              Würenlos, Switzerland
            </div>
            <div style={{ color: '#4b5563', fontSize: '16px' }}>·</div>
            <div style={{ fontSize: '16px', color: '#71717a' }}>
              Platform Development @ PwC
            </div>
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '72px',
            fontSize: '15px',
            color: '#4b5563',
            letterSpacing: '0.05em',
          }}
        >
          voegele.dev
        </div>
      </div>
    ),
    { ...size }
  )
}

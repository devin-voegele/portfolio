'use client'

import { Lock } from 'lucide-react'

export interface ProjectPlateProps {
  index: number
  name: string
  redacted?: boolean
}

export default function ProjectPlate({ index, name, redacted }: ProjectPlateProps) {
  const idx = String(index).padStart(2, '0')

  return (
    <div
      className="ontrack-plate"
      style={{
        aspectRatio: '4 / 3',
        width: '100%',
        background: 'var(--bg-surface)',
        border: '1px solid var(--navy-line)',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        cursor: redacted ? 'default' : undefined,
      }}
    >
      {/* Accent sweep line — revealed on hover via CSS */}
      <div
        className="plate-accent-line"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '20px',
          top: 0,
          width: '1px',
          height: '0%',
          background: 'var(--accent)',
          transition: 'height 0.4s var(--ease-out-expo)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative content (blurred on redacted) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: redacted ? 'blur(8px)' : undefined,
          opacity: redacted ? 0.35 : 1,
          transition: 'opacity 0.3s',
        }}
        aria-hidden={redacted ? 'true' : undefined}
      >
        {/* Ghost index number */}
        <span
          className="font-display"
          style={{
            position: 'absolute',
            bottom: '-0.1em',
            right: '0.05em',
            fontSize: 'clamp(8rem, 18vw, 15rem)',
            color: 'rgba(234,238,245,0.04)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {idx}
        </span>

        {/* Thin vertical accent geometry near right */}
        <div
          style={{
            position: 'absolute',
            right: '40px',
            top: '24px',
            bottom: '24px',
            width: '1px',
            background: 'var(--accent)',
            opacity: 0.18,
          }}
        />

        {/* Small plus mark */}
        <div style={{ position: 'absolute', right: '36px', top: '50%', transform: 'translateY(-50%)' }}>
          <div style={{ width: '9px', height: '1px', background: 'var(--accent)', opacity: 0.3 }} />
          <div style={{
            width: '1px',
            height: '9px',
            background: 'var(--accent)',
            opacity: 0.3,
            position: 'absolute',
            top: '-4px',
            left: '4px',
          }} />
        </div>

        {/* Corner label top-left */}
        <span
          className="font-mono"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          {name}
        </span>

        {/* Index top-right */}
        <span
          className="font-mono"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
          }}
        >
          // {idx}
        </span>
      </div>

      {/* Redacted overlay */}
      {redacted && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            zIndex: 4,
          }}
        >
          {/* Censorship bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {[68, 55, 45].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}%`,
                  height: '14px',
                  background: 'rgba(0,0,0,0.85)',
                  borderRadius: '2px',
                  alignSelf: 'center',
                  marginLeft: `${(100 - w) / 2}%`,
                }}
              />
            ))}
          </div>

          <Lock size={20} color="var(--text-secondary)" aria-hidden="true" />

          <span
            className="font-mono"
            style={{
              border: '1px solid var(--navy-line)',
              borderRadius: '9999px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            CLASSIFIED
          </span>

          <span
            className="font-mono"
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}
          >
            // ACCESS DENIED
          </span>
        </div>
      )}
    </div>
  )
}

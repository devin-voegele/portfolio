'use client'

import { Lock } from 'lucide-react'

export interface ProjectPlateProps {
  index: number
  name: string
  redacted?: boolean
}

export default function ProjectPlate({ index, name, redacted }: ProjectPlateProps) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <div
      className="work-plate"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '420px',
        aspectRatio: '4 / 3',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: redacted ? 'default' : 'inherit',
      }}
    >
      {/* Accent edge line — reveals on row hover via CSS */}
      <div
        className="plate-accent-line"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '2px',
          height: '0%',
          background: 'var(--accent)',
          zIndex: 3,
          transition: 'height 0.5s var(--ease-out-expo)',
        }}
      />

      {/* Decorative content — blurred when redacted */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: redacted ? 'blur(8px)' : 'none',
          opacity: redacted ? 0.4 : 1,
          transition: 'filter 0.3s',
          pointerEvents: 'none',
        }}
      >
        {/* Ghost index number */}
        <span
          style={{
            position: 'absolute',
            bottom: '-0.1em',
            right: '-0.05em',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(8rem, 18vw, 16rem)',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.04)',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {initial}
        </span>

        {/* Swiss accent geometry: thin horizontal line */}
        <div
          style={{
            position: 'absolute',
            bottom: '28%',
            left: '24px',
            right: '24px',
            height: '1px',
            background: 'var(--accent)',
            opacity: 0.18,
            zIndex: 1,
          }}
        />
        {/* Small plus mark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            zIndex: 1,
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--accent)', opacity: 0.22, transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'var(--accent)', opacity: 0.22, transform: 'translateX(-50%)' }} />
        </div>
      </div>

      {/* Project name label — top left */}
      {!redacted && (
        <span
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
            fontVariant: 'small-caps',
            zIndex: 4,
          }}
        >
          {name}
        </span>
      )}

      {/* Redaction overlay */}
      {redacted && (
        <>
          {/* Censored bars */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              zIndex: 4,
            }}
          >
            <div style={{ width: '60%', height: '14px', background: 'var(--bg-primary)', borderRadius: '2px' }} />
            <div style={{ width: '45%', height: '14px', background: 'var(--bg-primary)', borderRadius: '2px' }} />
            <div style={{ width: '70%', height: '14px', background: 'var(--bg-primary)', borderRadius: '2px' }} />
          </div>

          {/* Lock + CLASSIFIED badge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '28px',
              gap: '10px',
              zIndex: 5,
            }}
          >
            <Lock size={20} color="var(--text-secondary)" />
            <span
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontVariant: 'small-caps',
              }}
            >
              CLASSIFIED
            </span>
          </div>
        </>
      )}

      {/* Index number — bottom right corner label */}
      <span
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.15)',
          letterSpacing: '0.05em',
          zIndex: 4,
          userSelect: 'none',
        }}
      >
        {String(index).padStart(2, '0')}
      </span>
    </div>
  )
}

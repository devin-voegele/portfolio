import React from 'react'

interface SectionHeaderProps {
  index?: string
  eyebrow: string
  title: React.ReactNode
  className?: string
}

export function SectionHeader({ index, eyebrow, title, className }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-10 ${className ?? ''}`}>
      {index && (
        <p
          className="font-mono mb-2"
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            color: 'var(--accent-2)',
          }}
        >
          {`// ${index}`}
        </p>
      )}

      <span
        className="inline-block px-4 py-1 rounded-full text-sm font-medium"
        style={{
          background: 'var(--accent-subtle)',
          color: 'var(--accent)',
          border: '1px solid rgba(37,99,235,0.2)',
        }}
      >
        {eyebrow}
      </span>

      <h2
        className="font-geist-sans"
        style={{
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginTop: '1rem',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          width: '3.5rem',
          height: '4px',
          borderRadius: '9999px',
          margin: '1rem auto 0',
          background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
        }}
      />
    </div>
  )
}

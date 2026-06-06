import React from 'react'

type Props = {
  label: string
  value: React.ReactNode
  highlight?: boolean
  className?: string
}

export default function DataRow({ label, value, highlight = false, className }: Props) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBlock: '12px',
        borderTop: '1px solid var(--navy-line)',
      }}
    >
      <span
        className="font-mono"
        style={{
          textTransform: 'uppercase',
          fontSize: '0.72rem',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '0.95rem',
          color: highlight ? 'var(--accent)' : 'var(--text-primary)',
        }}
      >
        {value}
      </span>
    </div>
  )
}

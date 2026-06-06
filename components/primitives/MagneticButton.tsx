'use client'

import React, { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

type Props = {
  children: React.ReactNode
  href?: string
  variant?: 'solid' | 'ghost'
  onClick?: () => void
  className?: string
}

const solidStyle: React.CSSProperties = {
  background: 'var(--accent)',
  color: 'var(--bg-primary)',
  border: '1px solid transparent',
}

const ghostStyle: React.CSSProperties = {
  background: 'transparent',
  color: 'var(--accent-bright)',
  border: '1px solid var(--accent)',
}

const baseStyle: React.CSSProperties = {
  padding: '16px 32px',
  borderRadius: '9999px',
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
  textDecoration: 'none',
  lineHeight: 1,
}

export default function MagneticButton({
  children,
  href,
  variant = 'solid',
  onClick,
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.4, ease: 'power2.out' })
  }

  function handleMouseLeave() {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.3)' })
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    if (variant === 'solid') {
      el.style.background = 'var(--accent-bright)'
      el.style.boxShadow = '0 0 24px var(--accent-glow)'
    } else {
      el.style.borderColor = 'var(--accent-bright)'
      el.style.boxShadow = '0 0 20px var(--accent-glow)'
    }
  }

  function handleMouseLeaveHover() {
    const el = ref.current
    if (!el) return
    if (variant === 'solid') {
      el.style.background = 'var(--accent)'
      el.style.boxShadow = ''
    } else {
      el.style.borderColor = 'var(--accent)'
      el.style.boxShadow = ''
    }
    handleMouseLeave()
  }

  const variantStyle = variant === 'solid' ? solidStyle : ghostStyle
  const combinedStyle = { ...baseStyle, ...variantStyle }

  const eventHandlers = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeaveHover,
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        style={combinedStyle}
        className={className}
        {...eventHandlers}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      style={combinedStyle}
      className={className}
      onClick={onClick}
      {...eventHandlers}
    >
      {children}
    </button>
  )
}

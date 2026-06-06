'use client'

import React, { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'solid' | 'ghost'
  onClick?: () => void
  className?: string
}

const solidStyle: React.CSSProperties = {
  background: 'var(--text-primary)',
  color: 'var(--bg-primary)',
  border: 'none',
}

const ghostStyle: React.CSSProperties = {
  background: 'transparent',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
}

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '16px 32px',
  borderRadius: '9999px',
  fontSize: '0.85rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
  fontFamily: 'inherit',
  fontWeight: 500,
}

export default function MagneticButton({
  children,
  href,
  variant = 'solid',
  onClick,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) * 0.3
    const dy = (e.clientY - centerY) * 0.3
    gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' })
  }

  const variantStyle = variant === 'solid' ? solidStyle : ghostStyle
  const combinedStyle = { ...baseStyle, ...variantStyle }

  const eventProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: combinedStyle,
    className,
  }

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...eventProps}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type="button" {...eventProps}>
      {children}
    </button>
  )
}

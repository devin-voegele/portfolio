'use client'

import React, { useEffect, useRef, useState } from 'react'

type Props = {
  roles: string[]
  className?: string
}

export default function TypingRoles({ roles, className }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Check prefers-reduced-motion (SSR-safe: defaults to false on server)
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    if (!roles.length) return

    const currentRole = roles[roleIndex]

    if (phase === 'typing') {
      if (displayed.length < currentRole.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1))
        }, 90)
      } else {
        timerRef.current = setTimeout(() => {
          setPhase('pausing')
        }, 1800)
      }
    } else if (phase === 'pausing') {
      timerRef.current = setTimeout(() => {
        setPhase('deleting')
      }, 200)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 45)
      } else {
        const nextIndex = (roleIndex + 1) % roles.length
        setRoleIndex(nextIndex)
        setPhase('typing')
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [displayed, phase, roleIndex, roles, reducedMotion])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (reducedMotion) {
    return (
      <span
        className={`font-mono${className ? ' ' + className : ''}`}
        style={{ color: 'var(--accent-2)' }}
      >
        {roles[0]}
      </span>
    )
  }

  return (
    <span
      className={`font-mono${className ? ' ' + className : ''}`}
      style={{ color: 'var(--accent-2)' }}
    >
      {displayed}
      <span
        className="animate-blink"
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          borderRight: '2px solid var(--accent-2)',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
        }}
      />
    </span>
  )
}

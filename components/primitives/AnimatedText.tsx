'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AnimatedTextProps {
  text: string
  accent?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  className?: string
  style?: React.CSSProperties
  staggerMs?: number
}

export function AnimatedText({
  text,
  accent,
  as: Tag = 'span',
  className,
  style,
  staggerMs = 45,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)

  // Respect prefers-reduced-motion: start revealed if user prefers no motion
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const [revealed, setRevealed] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const textWords = text.split(' ').filter(Boolean)
  const accentWords = accent ? accent.split(' ').filter(Boolean) : []
  const allWords = [...textWords, ...accentWords]
  const textWordCount = textWords.length

  return (
    // @ts-expect-error: dynamic tag with ref — valid at runtime
    <Tag ref={ref} className={className} style={style}>
      {allWords.map((word, i) => {
        const isAccent = i >= textWordCount
        const delay = i * staggerMs

        return (
          <span
            key={i}
            className={isAccent ? 'gradient-text' : undefined}
            style={{
              display: 'inline-block',
              // Hidden initial state (only when not yet revealed and not reduced-motion)
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(0.5em) translateX(-0.18em)',
              // Only apply transition + will-change when animating (revealed state adds will-change briefly via transition)
              transition: prefersReduced
                ? 'none'
                : revealed
                  ? `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
                  : 'none',
              willChange: revealed && !prefersReduced ? 'transform, opacity' : 'auto',
            }}
          >
            {word}
            {/* Add trailing space after every word except the last */}
            {i < allWords.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}

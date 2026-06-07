'use client'

import { useEffect, useRef, useState } from 'react'

type Line =
  | { type: 'cmd'; text: string }
  | { type: 'out'; text: string; color?: string }

const SEQUENCE: Line[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Devin Vögele — Developer & Creative Technologist' },
  { type: 'cmd', text: 'cat stack.txt' },
  { type: 'out', text: 'Next.js · TypeScript · React · Docker · AWS · Python' },
  { type: 'cmd', text: 'location' },
  { type: 'out', text: 'Würenlos, Switzerland · 47.4373° N' },
  { type: 'cmd', text: 'status' },
  { type: 'out', text: '● Available for work', color: 'var(--accent-2)' },
]

const CHAR_DELAY = 38    // ms per character when typing a cmd
const OUT_DELAY  = 40    // ms per character for output lines
const LINE_PAUSE = 320   // ms pause before next line starts
const END_PAUSE  = 4800  // ms before loop restarts

export function LiveTerminal() {
  // reducedMotion: render all lines statically
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // Each entry: { line: Line; displayText: string; done: boolean }
  const [rendered, setRendered] = useState<
    { line: Line; displayText: string; done: boolean }[]
  >([])
  // Index of the line currently being typed (null = done/pausing)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  // Show the blinking caret
  const [showCaret, setShowCaret] = useState(true)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function scheduleTimeout(fn: () => void, delay: number) {
    const id = setTimeout(fn, delay)
    timers.current.push(id)
    return id
  }

  function runSequence() {
    setRendered([])
    setActiveIdx(null)
    setShowCaret(true)

    let offset = 0

    SEQUENCE.forEach((line, idx) => {
      const charDelay = line.type === 'cmd' ? CHAR_DELAY : OUT_DELAY
      const lineStart = offset

      // Add blank skeleton for the line when it starts
      scheduleTimeout(() => {
        setRendered(prev => [
          ...prev,
          { line, displayText: '', done: false },
        ])
        setActiveIdx(idx)
      }, lineStart)

      // Type each character
      const chars = [...line.text] // Unicode-safe split
      chars.forEach((_, ci) => {
        scheduleTimeout(() => {
          setRendered(prev => {
            const next = [...prev]
            const entry = next[idx]
            if (entry) {
              next[idx] = {
                ...entry,
                displayText: chars.slice(0, ci + 1).join(''),
              }
            }
            return next
          })
        }, lineStart + (ci + 1) * charDelay)
      })

      // Mark done + pause before next
      const lineEnd = lineStart + chars.length * charDelay
      scheduleTimeout(() => {
        setRendered(prev => {
          const next = [...prev]
          if (next[idx]) next[idx] = { ...next[idx], done: true }
          return next
        })
        if (idx < SEQUENCE.length - 1) {
          setActiveIdx(null)
        } else {
          // last line: show final prompt caret
          setActiveIdx(SEQUENCE.length) // sentinel: "after last"
        }
      }, lineEnd)

      offset = lineEnd + LINE_PAUSE
    })

    // Loop
    scheduleTimeout(() => {
      clearTimers()
      runSequence()
    }, offset + END_PAUSE)
  }

  useEffect(() => {
    if (prefersReduced) return
    runSequence()
    return () => clearTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Static reduced-motion render
  if (prefersReduced) {
    return (
      <div
        className="glass font-mono"
        style={{
          borderRadius: 12,
          maxWidth: '30rem',
          width: '100%',
          fontSize: '0.85rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          overflow: 'hidden',
          margin: '0 auto',
        }}
      >
        <TitleBar />
        <div style={{ padding: '16px', minHeight: 180 }}>
          {SEQUENCE.map((line, i) => (
            <LineRow key={i} line={line} displayText={line.text} done isActive={false} />
          ))}
          <PromptLine showCaret={false} />
        </div>
      </div>
    )
  }

  return (
    <div
      className="glass font-mono"
      style={{
        borderRadius: 12,
        maxWidth: '30rem',
        width: '100%',
        fontSize: '0.85rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <TitleBar />
      <div style={{ padding: '16px', minHeight: 180 }}>
        {rendered.map((entry, i) => (
          <LineRow
            key={i}
            line={entry.line}
            displayText={entry.displayText}
            done={entry.done}
            isActive={activeIdx === i}
          />
        ))}
        {/* Final prompt line with caret after sequence completes */}
        {activeIdx === SEQUENCE.length && (
          <PromptLine showCaret={showCaret} />
        )}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TitleBar() {
  return (
    <div
      style={{
        height: 32,
        borderBottom: '1px solid var(--border)',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block', flexShrink: 0 }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block', flexShrink: 0 }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block', flexShrink: 0 }} />
      <span style={{ marginLeft: 8, color: 'var(--text-secondary)', fontSize: '0.75rem', userSelect: 'none' }}>
        devin@portfolio:~
      </span>
    </div>
  )
}

function LineRow({
  line,
  displayText,
  done,
  isActive,
}: {
  line: Line
  displayText: string
  done: boolean
  isActive: boolean
}) {
  if (line.type === 'cmd') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem', minHeight: '1.4em' }}>
        <span style={{ color: 'var(--accent-2)', marginRight: 6, flexShrink: 0 }}>$</span>
        <span style={{ color: 'var(--text-primary)' }}>{displayText}</span>
        {isActive && !done && <Caret />}
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.6rem', minHeight: '1.4em', paddingLeft: 16 }}>
      <span style={{ color: line.color ?? 'var(--text-secondary)' }}>{displayText}</span>
      {isActive && !done && <Caret />}
    </div>
  )
}

function PromptLine({ showCaret }: { showCaret: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '1.4em' }}>
      <span style={{ color: 'var(--accent-2)', marginRight: 6 }}>$</span>
      {showCaret && <Caret />}
    </div>
  )
}

function Caret() {
  return (
    <span
      className="animate-blink"
      style={{
        display: 'inline-block',
        width: 2,
        height: '1em',
        background: 'var(--accent-2)',
        marginLeft: 2,
        verticalAlign: 'text-bottom',
        flexShrink: 0,
      }}
    />
  )
}

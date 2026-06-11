'use client'

import { memo, useEffect, useState } from 'react'

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

const CHAR_DELAY = 38   // ms per character when typing a cmd
const OUT_DELAY = 40    // ms per character for output lines
const LINE_PAUSE = 320  // ms pause before next line starts
const START_DELAY = 350 // ms before the first keystroke

interface Entry {
  line: Line
  displayText: string
  done: boolean
}

export function LiveTerminal() {
  // reducedMotion: render all lines statically
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const [rendered, setRendered] = useState<Entry[]>([])
  const [finished, setFinished] = useState(false)

  // One self-scheduling timer walks through the sequence character by
  // character — types once on load, then rests with the final caret.
  // (No perpetual loop, and no pile of pre-scheduled timeouts.)
  useEffect(() => {
    if (prefersReduced) return

    let lineIdx = 0
    let charIdx = 0
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const line = SEQUENCE[lineIdx]
      if (!line) {
        setFinished(true)
        return
      }
      const chars = [...line.text] // Unicode-safe split

      if (charIdx === 0) {
        setRendered((prev) => [...prev, { line, displayText: '', done: false }])
      }

      charIdx++
      // Freeze the slot index for the async state updater — lineIdx is
      // mutated below before React applies it.
      const idx = lineIdx
      const text = chars.slice(0, charIdx).join('')
      const lineDone = charIdx >= chars.length
      setRendered((prev) => {
        const next = [...prev]
        next[idx] = { line, displayText: text, done: lineDone }
        return next
      })

      if (lineDone) {
        lineIdx++
        charIdx = 0
        timer = setTimeout(tick, LINE_PAUSE)
      } else {
        timer = setTimeout(tick, line.type === 'cmd' ? CHAR_DELAY : OUT_DELAY)
      }
    }

    timer = setTimeout(tick, START_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const entries: Entry[] = prefersReduced
    ? SEQUENCE.map((line) => ({ line, displayText: line.text, done: true }))
    : rendered
  const activeIdx = prefersReduced ? -1 : entries.length - 1

  return (
    <div
      className="font-mono lq lq-glare"
      style={{
        maxWidth: '30rem',
        width: '100%',
        fontSize: 'clamp(0.72rem, 3vw, 0.85rem)',
        overflow: 'hidden',
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
      <TitleBar />
      <div style={{ padding: '16px', minHeight: 180, overflowX: 'hidden', wordBreak: 'break-word' }}>
        {entries.map((entry, i) => (
          <LineRow
            key={i}
            line={entry.line}
            displayText={entry.displayText}
            done={entry.done}
            isActive={!finished && i === activeIdx}
          />
        ))}
        {/* Final prompt line with caret after sequence completes */}
        {(finished || prefersReduced) && <PromptLine showCaret={!prefersReduced} />}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TitleBar() {
  return (
    <div
      style={{
        height: 34,
        borderBottom: '1px solid var(--glass-border)',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.045), rgba(255,255,255,0.01))',
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block', flexShrink: 0 }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block', flexShrink: 0 }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block', flexShrink: 0 }} />
      <span style={{ marginLeft: 8, color: 'var(--text-secondary)', fontSize: '0.75rem', userSelect: 'none' }}>
        devin@portfolio:~
      </span>
      <span
        style={{
          marginLeft: 'auto',
          color: 'var(--text-muted)',
          fontSize: '0.62rem',
          letterSpacing: '0.14em',
          userSelect: 'none',
        }}
      >
        zsh
      </span>
    </div>
  )
}

const LineRow = memo(function LineRow({
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
})

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

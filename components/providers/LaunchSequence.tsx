'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

const LIGHT_COUNT = 5;
const LIGHT_INTERVAL = 0.18; // seconds between each light
const HOLD_AFTER_LIT = 0.15;
const EXIT_DURATION = 0.45;

export function LaunchSequence() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statusRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // SSR guard — all window/localStorage/matchMedia access is here
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyLaunched = localStorage.getItem('dv_launched') === '1';

    if (prefersReduced || alreadyLaunched) {
      setDone(true);
      return;
    }

    // Mark as launched immediately so a hard refresh still shows it once
    localStorage.setItem('dv_launched', '1');

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });
    tlRef.current = tl;

    const overlay = overlayRef.current;
    const lights = lightsRef.current;
    const status = statusRef.current;

    if (!overlay || !status) return;

    // Start state: overlay visible, all lights off
    gsap.set(overlay, { yPercent: 0, opacity: 1, filter: 'blur(0px)' });
    gsap.set(lights.filter(Boolean), {
      backgroundColor: 'var(--bg-surface)',
      boxShadow: 'none',
    });

    // Light up one by one
    lights.forEach((light, i) => {
      if (!light) return;
      tl.to(
        light,
        {
          backgroundColor: 'var(--accent)',
          boxShadow: '0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow)',
          duration: 0.08,
          ease: 'power2.out',
        },
        i * LIGHT_INTERVAL
      );
    });

    // Flip status text to LIGHTS OUT
    const allLitTime = (LIGHT_COUNT - 1) * LIGHT_INTERVAL + 0.08;
    tl.add(() => {
      if (status) {
        status.textContent = '// LIGHTS OUT';
        status.style.color = 'var(--accent)';
      }
    }, allLitTime);

    // Hold briefly, then lights cut instantly
    const lightsOutTime = allLitTime + HOLD_AFTER_LIT;
    tl.add(() => {
      lights.forEach((light) => {
        if (!light) return;
        gsap.set(light, {
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'none',
        });
      });
    }, lightsOutTime);

    // Overlay launches upward with speed-streak feel
    const exitProps = isMobile
      ? {
          yPercent: -100,
          duration: EXIT_DURATION,
          ease: 'power3.in',
        }
      : {
          yPercent: -100,
          filter: 'blur(8px)',
          scaleY: 0.97,
          duration: EXIT_DURATION,
          ease: 'power3.in',
          transformOrigin: 'top center',
        };

    tl.to(overlay, exitProps, lightsOutTime + 0.05);

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10001,
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        pointerEvents: 'none',
        willChange: 'transform, filter',
      }}
    >
      {/* Five start lights */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {Array.from({ length: LIGHT_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              lightsRef.current[i] = el;
            }}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--navy-line)',
              transition: 'none',
            }}
          />
        ))}
      </div>

      {/* Status text */}
      <span
        ref={statusRef}
        className="font-mono"
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}
      >
        INITIALIZING...
      </span>
    </div>
  );
}

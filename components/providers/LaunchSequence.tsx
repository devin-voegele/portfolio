'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

const LIGHT_COUNT = 5;
const MIN_DISPLAY_MS = 900;       // minimum preloader visibility
const SAFETY_TIMEOUT_MS = 3500;   // force-finish cap if fonts.ready stalls
const EXIT_DURATION = 0.45;

// Progress milestone % at which each light illuminates (1-indexed)
const LIGHT_MILESTONES = [20, 40, 60, 80, 100] as const;

export function LaunchSequence() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statusRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Track which lights have been lit to avoid re-firing gsap sets
  const litRef = useRef<boolean[]>(Array(LIGHT_COUNT).fill(false));

  useEffect(() => {
    // ── SSR / skip guards ──────────────────────────────────────────────────
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyLaunched = localStorage.getItem('dv_launched') === '1';

    if (prefersReduced || alreadyLaunched) {
      setDone(true);
      return;
    }

    // Mark launched so hard-refresh still shows it once per new visit
    localStorage.setItem('dv_launched', '1');

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    // ── Mounted guard ──────────────────────────────────────────────────────
    let mounted = true;

    // ── Readiness state ────────────────────────────────────────────────────
    let fontsReady = false;
    let minTimeElapsed = false;
    let rafFired = false;
    let readyTriggered = false;   // debounce: only call triggerReady() once
    let progressValue = 0;        // shadow of the React state for the interval cb
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    // ── Set initial overlay state ──────────────────────────────────────────
    const overlay = overlayRef.current;
    const lights = lightsRef.current;
    const status = statusRef.current;

    if (overlay) {
      gsap.set(overlay, { yPercent: 0, opacity: 1, filter: 'blur(0px)' });
    }
    if (lights) {
      lights.filter(Boolean).forEach((l) => {
        gsap.set(l!, {
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'none',
        });
      });
    }

    // ── Reveal animation (fires when ready) ────────────────────────────────
    function runReveal() {
      if (!mounted || !overlay) return;

      const tl = gsap.timeline({ onComplete: () => { if (mounted) setDone(true); } });
      tlRef.current = tl;

      // Lights cut instantly
      lights.forEach((light) => {
        if (!light) return;
        gsap.set(light, { backgroundColor: 'var(--bg-surface)', boxShadow: 'none' });
      });

      // Overlay launches upward
      const exitProps = isMobile
        ? { yPercent: -100, duration: EXIT_DURATION, ease: 'power3.in' }
        : {
            yPercent: -100,
            filter: 'blur(8px)',
            scaleY: 0.97,
            duration: EXIT_DURATION,
            ease: 'power3.in',
            transformOrigin: 'top center',
          };

      tl.to(overlay, exitProps, 0.05);
    }

    // ── Light a single bulb ────────────────────────────────────────────────
    function lightBulb(index: number) {
      if (litRef.current[index]) return;
      litRef.current[index] = true;
      const light = lights[index];
      if (!light) return;
      gsap.to(light, {
        backgroundColor: 'var(--accent)',
        boxShadow: '0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow)',
        duration: 0.08,
        ease: 'power2.out',
      });
    }

    // ── Trigger finish ─────────────────────────────────────────────────────
    function triggerReady() {
      if (readyTriggered || !mounted) return;
      readyTriggered = true;

      // Stop interval
      if (intervalId !== null) clearInterval(intervalId);
      if (safetyTimer !== null) clearTimeout(safetyTimer);

      // Light any remaining unlit bulbs
      LIGHT_MILESTONES.forEach((_, i) => lightBulb(i));

      // Snap progress to 100 and update status
      setProgress(100);
      if (status) {
        status.textContent = '// LIGHTS OUT';
        status.style.color = 'var(--accent)';
      }

      // Tiny pause so "100%" + LIGHTS OUT text is visible, then reveal
      setTimeout(() => { if (mounted) runReveal(); }, 160);
    }

    // ── Readiness check ────────────────────────────────────────────────────
    function checkReady() {
      if (fontsReady && minTimeElapsed && rafFired) {
        triggerReady();
      }
    }

    // ── Safety timeout: force-finish after cap ─────────────────────────────
    safetyTimer = setTimeout(() => {
      fontsReady = true;
      minTimeElapsed = true;
      rafFired = true;
      checkReady();
    }, SAFETY_TIMEOUT_MS);

    // ── Minimum display time ───────────────────────────────────────────────
    setTimeout(() => {
      if (!mounted) return;
      minTimeElapsed = true;
      checkReady();
    }, MIN_DISPLAY_MS);

    // ── First rAF (lets first paint / WebGL begin warming) ─────────────────
    requestAnimationFrame(() => {
      if (!mounted) return;
      rafFired = true;
      checkReady();
    });

    // ── document.fonts.ready (with safety via Promise.race) ───────────────
    const fontsPromise = document.fonts.ready;
    const fontsTimeout = new Promise<void>((resolve) =>
      setTimeout(resolve, SAFETY_TIMEOUT_MS)
    );
    Promise.race([fontsPromise, fontsTimeout]).then(() => {
      if (!mounted) return;
      fontsReady = true;
      checkReady();
    });

    // ── Progress tween (interval-driven, clamps at 90 until ready) ────────
    // Advances fast early, slows as it approaches 90%
    intervalId = setInterval(() => {
      if (!mounted) return;
      if (readyTriggered) return;

      const cap = 90; // won't cross 90 until readiness confirmed
      const remaining = cap - progressValue;
      // Ease: step size shrinks as we approach cap (min step 0.4 to keep moving)
      const step = Math.max(0.4, remaining * 0.045);
      progressValue = Math.min(cap, progressValue + step);

      const rounded = Math.round(progressValue);
      setProgress(rounded);

      // Light milestones
      LIGHT_MILESTONES.forEach((milestone, idx) => {
        if (rounded >= milestone) lightBulb(idx);
      });
    }, 40); // ~25fps update

    return () => {
      mounted = false;
      if (intervalId !== null) clearInterval(intervalId);
      if (safetyTimer !== null) clearTimeout(safetyTimer);
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
    };
  }, []);

  if (done) return null;

  const progressStr = String(progress).padStart(2, '0');

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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {Array.from({ length: LIGHT_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { lightsRef.current[i] = el; }}
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

      {/* Status / progress text */}
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
        {`INITIALIZING // ${progressStr}%`}
      </span>
    </div>
  );
}

'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useTheme, applyTheme, type EffectiveTheme } from '@/hooks/useTheme'
import { useCursor } from '@/hooks/useCursor'

export default function ThemeToggle() {
  const { setting, effectiveTheme, setTheme } = useTheme()
  const { setCursorType } = useCursor()

  const letterARef = useRef<HTMLSpanElement>(null)
  const letterKRef = useRef<HTMLSpanElement>(null)
  const isBusyRef = useRef<boolean>(false)

  const isDark = effectiveTheme === 'dark'
  const caption = setting === 'system' ? 'AUTO' : isDark ? 'DAY' : 'NIGHT'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isBusyRef.current) return

    const nextTheme: EffectiveTheme = isDark ? 'light' : 'dark'

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const hasViewTransition =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      typeof (document as unknown as { startViewTransition?: unknown }).startViewTransition === 'function'

    // (1) Reduced motion or no View Transitions: instant swap, no animation
    if (prefersReducedMotion || !hasViewTransition) {
      setTheme(nextTheme)
      return
    }

    isBusyRef.current = true
    const safetyTimer = setTimeout(() => {
      isBusyRef.current = false
    }, 900)

    // (2) Capture click coordinates (fallback to button center)
    let x = e.clientX
    let y = e.clientY
    if ((!x && x !== 0) || (!y && y !== 0) || (x === 0 && y === 0)) {
      const rect = e.currentTarget.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    // (3) Letter split with GSAP: two single-target tweens chained with '<'
    const tl = gsap.timeline({
      onComplete: () => {
        if (letterARef.current) gsap.set(letterARef.current, { y: 0 })
        if (letterKRef.current) gsap.set(letterKRef.current, { y: 0 })
      },
    })
    tl.to(letterARef.current, {
      y: 7,
      duration: 0.55,
      ease: 'power3.inOut',
      yoyo: true,
      repeat: 1,
    })
    tl.to(
      letterKRef.current,
      {
        y: -7,
        duration: 0.55,
        ease: 'power3.inOut',
        yoyo: true,
        repeat: 1,
      },
      '<'
    )

    // (4) View Transitions circle reveal expanding from click point
    const w = window.innerWidth
    const h = window.innerHeight
    const R = Math.max(
      Math.hypot(x, y),
      Math.hypot(w - x, y),
      Math.hypot(x, h - y),
      Math.hypot(w - x, h - y)
    )

    try {
      const docWithVT = document as unknown as {
        startViewTransition: (cb: () => void) => {
          ready: Promise<void>
          finished: Promise<void>
        }
      }

      const transition = docWithVT.startViewTransition(() => {
        applyTheme(nextTheme)
        setTheme(nextTheme)
      })

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${R}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 600,
              easing: 'ease-in-out',
              pseudoElement: '::view-transition-new(root)',
            }
          )
        })
        .catch(() => {})

      transition.finished
        .finally(() => {
          clearTimeout(safetyTimer)
          isBusyRef.current = false
        })
        .catch(() => {
          clearTimeout(safetyTimer)
          isBusyRef.current = false
        })
    } catch {
      clearTimeout(safetyTimer)
      isBusyRef.current = false
      applyTheme(nextTheme)
      setTheme(nextTheme)
    }
  }

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={
        setting === 'system'
          ? 'Theme: Auto (following OS)'
          : isDark
          ? 'Theme: Dark'
          : 'Theme: Light'
      }
      onClick={handleClick}
      onMouseEnter={() => setCursorType('link')}
      onMouseLeave={() => setCursorType('default')}
      suppressHydrationWarning
      className="relative inline-flex items-center gap-1.5 min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper-alt)] text-[var(--color-ink)] hover:border-[var(--color-accent)] active:scale-[0.97] transition-all duration-200 select-none group focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
    >
      <span className="font-display font-extrabold text-sm tracking-tighter inline-flex items-center leading-none">
        <span ref={letterARef} className="inline-block will-change-transform">
          A
        </span>
        <span ref={letterKRef} className="inline-block will-change-transform">
          K
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] inline-block ml-0.5" />
      </span>
      <span
        suppressHydrationWarning
        className="font-mono text-[10px] tracking-widest text-[var(--color-muted)] uppercase leading-none group-hover:text-[var(--color-ink)] transition-colors"
      >
        {caption}
      </span>
    </button>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const letterARef = useRef<HTMLSpanElement>(null)
  const letterKRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onComplete()
      setIsDone(true)
      return
    }

    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden'

    const counterObj = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setIsDone(true)
        onComplete()
      },
    })

    // Progress counter 0 -> 100 over 1.1s
    tl.to(counterObj, {
      val: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(counterObj.val))
      },
    })

    // At 100 percent the monogram splits: A drops, K rises, dot and counter fade
    tl.to(
      letterARef.current,
      {
        yPercent: 120,
        duration: 0.6,
        ease: 'power3.inOut',
      },
      '+=0.1'
    )

    tl.to(
      letterKRef.current,
      {
        yPercent: -120,
        duration: 0.6,
        ease: 'power3.inOut',
      },
      '<'
    )

    tl.to(
      dotRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      },
      '<'
    )

    tl.to(
      counterRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      },
      '<'
    )

    // Split curtain exit
    tl.to(
      topPanelRef.current,
      {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
      },
      '-=0.2'
    )

    tl.to(
      bottomPanelRef.current,
      {
        yPercent: 100,
        duration: 0.85,
        ease: 'power4.inOut',
      },
      '<'
    )

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onComplete])

  if (isDone) return null

  return (
    <div
      className="fixed inset-0 z-[9990] pointer-events-auto select-none"
      aria-label="Loading site"
      aria-live="polite"
    >
      {/* Top half curtain */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-paper)] border-b border-[var(--color-line)]"
      />

      {/* Bottom half curtain */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--color-paper)] border-t border-[var(--color-line)]"
      />

      {/* Center content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="font-display font-extrabold text-7xl md:text-9xl tracking-tighter text-[var(--color-ink)] mb-4">
          <span className="inline-block overflow-hidden">
            <span ref={letterARef} className="inline-block will-change-transform">
              A
            </span>
          </span>
          <span className="inline-block overflow-hidden">
            <span ref={letterKRef} className="inline-block will-change-transform">
              K
            </span>
          </span>
          <span ref={dotRef} className="text-[var(--color-accent)]">
            .
          </span>
        </div>
        <div ref={counterRef} className="font-mono text-sm md:text-base tabular text-[var(--color-ink-soft)] tracking-widest">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  )
}

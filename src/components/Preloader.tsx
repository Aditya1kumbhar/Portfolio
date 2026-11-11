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

    // Fade out text content
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -16,
        duration: 0.3,
        ease: 'power2.in',
      },
      '+=0.15'
    )

    // Split curtain exit
    tl.to(
      topPanelRef.current,
      {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
      },
      '-=0.05'
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
          AK<span className="text-[var(--color-accent)]">.</span>
        </div>
        <div className="font-mono text-sm md:text-base tabular text-[var(--color-ink-soft)] tracking-widest">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  )
}

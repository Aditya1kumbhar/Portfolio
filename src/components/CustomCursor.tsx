'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useCursor } from '@/hooks/useCursor'

export default function CustomCursor() {
  const { cursorType } = useCursor()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClientFinePointer, setIsClientFinePointer] = useState(false)

  useEffect(() => {
    const fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!fineQuery.matches || reducedQuery.matches) {
      return
    }

    setIsClientFinePointer(true)

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // GSAP quickTo for zero-lag smooth tracking
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })

    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' })
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      dotXTo(e.clientX)
      dotYTo(e.clientY)
      ringXTo(e.clientX)
      ringYTo(e.clientY)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible])

  // Scale and state transitions
  useEffect(() => {
    const ring = ringRef.current
    if (!ring || !isClientFinePointer) return

    if (cursorType === 'view') {
      gsap.to(ring, {
        width: 68,
        height: 68,
        backgroundColor: 'var(--color-ink)',
        borderColor: 'var(--color-ink)',
        duration: 0.25,
        ease: 'power3.out',
      })
    } else if (cursorType === 'link') {
      gsap.to(ring, {
        width: 48,
        height: 48,
        backgroundColor: 'transparent',
        borderColor: 'var(--color-accent)',
        duration: 0.25,
        ease: 'power3.out',
      })
    } else {
      gsap.to(ring, {
        width: 36,
        height: 36,
        backgroundColor: 'transparent',
        borderColor: 'var(--color-ink)',
        duration: 0.25,
        ease: 'power3.out',
      })
    }
  }, [cursorType, isClientFinePointer])

  if (!isClientFinePointer) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 12px ink dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[var(--color-ink)] transition-opacity duration-200 ${
          cursorType === 'view' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-[18px] -mt-[18px] rounded-full border border-[var(--color-ink)] flex items-center justify-center transition-colors duration-200"
        style={{ width: 36, height: 36 }}
      >
        {cursorType === 'view' && (
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--color-paper)] select-none">
            VIEW
          </span>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useSplitText(active = true) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = container.querySelectorAll<HTMLElement>('.split-line-inner')

    if (prefersReducedMotion) {
      gsap.set(lines, { y: '0%', opacity: 1 })
      return
    }

    gsap.set(lines, { y: '115%', opacity: 0.8 })

    const tween = gsap.to(lines, {
      y: '0%',
      opacity: 1,
      duration: 1.1,
      stagger: 0.09,
      ease: 'power4.out',
      delay: 0.2,
    })

    return () => {
      tween.kill()
    }
  }, [active])

  return containerRef
}

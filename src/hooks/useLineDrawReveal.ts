'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useLineDrawReveal<T extends HTMLElement = HTMLDivElement>() {
  const lineRef = useRef<T>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(line, { scaleX: 1 })
      return
    }

    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

    const anim = gsap.to(line, {
      scaleX: 1,
      duration: 1.1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: line,
        start: 'top 92%',
        once: true,
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  return lineRef
}

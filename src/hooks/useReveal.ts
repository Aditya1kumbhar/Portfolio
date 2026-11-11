'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]')
    if (elements.length === 0) return

    const triggers: ScrollTrigger[] = []

    elements.forEach((el) => {
      const delayAttr = el.getAttribute('data-reveal-delay')
      const delay = delayAttr ? parseFloat(delayAttr) : 0

      gsap.set(el, { opacity: 0, y: 28 })

      const anim = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })

      if (anim.scrollTrigger) {
        triggers.push(anim.scrollTrigger)
      }
    })

    return () => {
      triggers.forEach((t) => t.kill())
      elements.forEach((el) => gsap.killTweensOf(el))
    }
  }, [])

  return containerRef
}

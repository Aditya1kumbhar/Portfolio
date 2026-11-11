'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useImageClipReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      container.style.clipPath = 'none'
      return
    }

    const innerImg = container.querySelector('img') || container.querySelector('.inner-image')

    gsap.set(container, {
      clipPath: 'inset(12% 6% 12% 6%)',
    })

    if (innerImg) {
      gsap.set(innerImg, { scale: 1.15 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      },
    })

    tl.to(container, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power3.out',
    })

    if (innerImg) {
      tl.to(
        innerImg,
        {
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        0
      )
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return containerRef
}

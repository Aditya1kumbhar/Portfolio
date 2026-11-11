'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MotionContextType {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void
}

const MotionContext = createContext<MotionContextType>({
  lenis: null,
  scrollTo: () => {},
})

export const useMotion = () => useContext(MotionContext)

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    })
    lenisRef.current = lenis

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    // Sync Lenis with GSAP ticker
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    // Sync ScrollTrigger on Lenis scroll
    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    // Rebuild ScrollTriggers only on crossing 1024px breakpoint
    let wasDesktop = window.innerWidth >= 1024
    const onResize = () => {
      const isDesktop = window.innerWidth >= 1024
      if (isDesktop !== wasDesktop) {
        wasDesktop = isDesktop
        ScrollTrigger.refresh()
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <MotionContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </MotionContext.Provider>
  )
}

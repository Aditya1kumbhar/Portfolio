'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

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

    ScrollTrigger.config({ ignoreMobileResize: true })

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

    const onLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', onLoad)

    let cancelled = false
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          ScrollTrigger.refresh()
        }
      })
    }

    return () => {
      cancelled = true
      gsap.ticker.remove(updateLenis)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onLoad)
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

'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { statsMarquee } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

export default function StatsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Infinite marquee loop: -50% moves exactly one full duplicate list
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 30,
        repeat: -1,
      })

      // Dynamic velocity reaction: skew and accelerate on scroll
      const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.35, ease: 'power3' })

      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-5, 5, self.getVelocity() / -350)
          skewTo(v * 0.6)
          loop.timeScale(1 + Math.min(Math.abs(v), 3))
        },
      })

      // Lerp timeScale back toward normal 1 each frame
      const onTick = () => {
        loop.timeScale(gsap.utils.interpolate(loop.timeScale(), 1, 0.06))
      }
      gsap.ticker.add(onTick)

      return () => {
        loop.kill()
        trigger.kill()
        gsap.ticker.remove(onTick)
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div
      className="w-full border-t border-b border-[var(--color-line)] bg-[var(--color-paper-alt)] py-3 overflow-hidden select-none"
      aria-label="Key Highlights Marquee"
    >
      <div ref={trackRef} className="flex items-center">
        {/* First copy */}
        <div className="flex items-center gap-8 px-4 shrink-0">
          {statsMarquee.map((stat, i) => (
            <React.Fragment key={`stat-1-${i}`}>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] font-semibold">
                {stat}
              </span>
              <span className="font-mono text-xs text-[var(--color-muted)] opacity-60">
                /
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate copy for infinite loop */}
        <div className="flex items-center gap-8 px-4 shrink-0" aria-hidden="true">
          {statsMarquee.map((stat, i) => (
            <React.Fragment key={`stat-2-${i}`}>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] font-semibold">
                {stat}
              </span>
              <span className="font-mono text-xs text-[var(--color-muted)] opacity-60">
                /
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

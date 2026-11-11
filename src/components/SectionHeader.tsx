'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLineDrawReveal } from '@/hooks/useLineDrawReveal'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface SectionHeaderProps {
  label: string
  title: string
  className?: string
}

export default function SectionHeader({ label, title, className = '' }: SectionHeaderProps) {
  const lineRef = useLineDrawReveal<HTMLDivElement>()
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let mounted = true
    let split: SplitText | null = null
    let tween: gsap.core.Tween | null = null

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const initSplit = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready
        }
        if (!mounted || !titleRef.current) return

        split = SplitText.create(titleRef.current, {
          type: 'lines',
          mask: 'lines',
        })

        if (split && split.lines && split.lines.length > 0) {
          tween = gsap.from(split.lines, {
            yPercent: 115,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 88%',
              once: true,
            },
          })
          ScrollTrigger.refresh()
        }
      } catch (err) {
        // If SplitText throws for any reason, leave the title as plain text
        console.warn('SplitText initialization skipped:', err)
      }
    }

    initSplit()

    return () => {
      mounted = false
      if (tween) {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill()
        }
        tween.kill()
      }
      if (split) {
        split.revert()
      }
    }
  }, [])

  return (
    <div className={`mb-12 md:mb-16 ${className}`} data-reveal>
      <div className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">
        {label}
      </div>
      <h2
        ref={titleRef}
        className="font-display font-bold text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] mb-8"
      >
        {title}
      </h2>
      <div
        ref={lineRef}
        className="w-full h-[1px] bg-[var(--color-line)] origin-left"
        aria-hidden="true"
      />
    </div>
  )
}

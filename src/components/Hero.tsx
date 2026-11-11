'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WaveCanvas from './WaveCanvas'
import StatsMarquee from './StatsMarquee'
import PlaceholderImage from './PlaceholderImage'
import { profile } from '@/data/content'
import { useMotion } from '@/providers/MotionProvider'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCursor } from '@/hooks/useCursor'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollTo } = useMotion()
  const magneticWorkRef = useMagnetic<HTMLButtonElement>()
  const magneticResumeRef = useMagnetic<HTMLAnchorElement>()
  const { setCursorType } = useCursor()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    // Condition 1: Intro sequence (runs whenever reduced motion is not requested)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const nameLines = section.querySelectorAll('.hero-name-line')
      const topbar = section.querySelector('.hero-topbar')
      const lower = section.querySelector('.hero-lower')

      // Set initial states via gsap.set before defining timeline (no CSS/SSR hidden states)
      gsap.set(nameLines, { yPercent: 110 })
      gsap.set([topbar, lower], { opacity: 0, y: 24 })

      const introTl = gsap.timeline({ paused: true })
      introTl
        .to(nameLines, {
          yPercent: 0,
          duration: 1.0,
          ease: 'power4.out',
          stagger: 0.12,
        })
        .to(
          [topbar, lower],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.4'
        )

      let played = false
      const playIntro = () => {
        if (played) return
        played = true
        introTl.play()
      }

      window.addEventListener('ak:intro', playIntro, { once: true })
      const fallbackTimer = window.setTimeout(playIntro, 3200)

      return () => {
        window.removeEventListener('ak:intro', playIntro)
        window.clearTimeout(fallbackTimer)
      }
    })

    // Condition 2: Natural exit with parallax (desktop only)
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const canvasEl = section.querySelector('canvas')
        const marqueeWrap = section.querySelector('.hero-stats-wrap')
        const contentEl = contentRef.current

        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })

        if (contentEl) {
          exitTl.fromTo(
            contentEl,
            { yPercent: 0, scale: 1, opacity: 1 },
            {
              yPercent: -4,
              scale: 0.98,
              opacity: 0,
              duration: 0.65,
              ease: 'none',
              transformOrigin: '50% 0%',
            },
            0.35
          )
        }
        if (canvasEl) {
          exitTl.fromTo(
            canvasEl,
            { yPercent: 0 },
            { yPercent: 12, duration: 1, ease: 'none' },
            0
          )
        }
        if (marqueeWrap) {
          exitTl.fromTo(
            marqueeWrap,
            { opacity: 1 },
            { opacity: 0, duration: 0.4, ease: 'none' },
            0.6
          )
        }
      }
    )

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen pt-28 md:pt-36 flex flex-col justify-between overflow-hidden bg-[var(--color-paper)]"
    >
      {/* Background Sine Wave Canvas */}
      <WaveCanvas />

      {/* Main Content Area */}
      <div ref={contentRef} className="container-wide relative z-10 w-full my-auto py-8">
        {/* Top Info Bar */}
        <div className="hero-topbar flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-8 border-b border-[var(--color-line)]">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
            / {profile.role}
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-ink-soft)]">
            Based in {profile.location}
          </div>
        </div>

        {/* Giant Stacked Typography */}
        <div className="my-8 md:my-14 select-none">
          <div className="overflow-hidden">
            <h1 className="hero-name-line font-display font-extrabold text-[clamp(4.2rem,16vw,14rem)] leading-[0.85] tracking-[-0.03em] text-[var(--color-ink)] uppercase">
              {profile.hero_line_1}
            </h1>
          </div>
          <div className="overflow-hidden flex justify-start sm:justify-end">
            <h1 className="hero-name-line font-display font-extrabold text-[clamp(4.2rem,16vw,14rem)] leading-[0.85] tracking-[-0.03em] text-[var(--color-ink)] uppercase">
              {profile.hero_line_2}
              <span className="text-[var(--color-accent)]">.</span>
            </h1>
          </div>
        </div>

        {/* Narrative & Portrait Dual Column */}
        <div className="hero-lower grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
          {/* Tagline, Bio & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--color-ink)] tracking-tight">
              {profile.tagline}
            </h2>
            <p className="font-body text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
              {profile.bio_short}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                ref={magneticWorkRef}
                onClick={() => scrollTo('#work', { offset: -80 })}
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
                className="px-7 py-3.5 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] font-body text-sm font-semibold tracking-wide shadow-md active:scale-[0.97] hover:bg-[var(--color-accent)] transition-all duration-300"
              >
                See Selected Work
              </button>

              <a
                ref={magneticResumeRef}
                href={profile.resume_file}
                download="Aditya_Kumbhar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
                className="px-7 py-3.5 rounded-full border border-[var(--color-ink)] text-[var(--color-ink)] font-body text-sm font-semibold tracking-wide active:scale-[0.97] hover:bg-[var(--color-paper-alt)] transition-all duration-300"
              >
                {profile.resume_button_label}
              </a>
            </div>
          </div>

          {/* Portrait Column (5 cols) */}
          <div className="hero-portrait lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <PlaceholderImage
                aspectRatio="4/5"
                title={profile.portrait_alt}
                className="rounded-sm shadow-sm hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker Marquee */}
      <div className="hero-stats-wrap relative z-10 w-full mt-12">
        <StatsMarquee />
      </div>
    </section>
  )
}

'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '@/data/content'
import { useMotion } from '@/providers/MotionProvider'
import { usePuneClock } from '@/hooks/usePuneClock'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCursor } from '@/hooks/useCursor'

gsap.registerPlugin(ScrollTrigger)

export default function ContactFooter() {
  const statementRef = useRef<HTMLDivElement>(null)
  const { scrollTo } = useMotion()
  const puneClock = usePuneClock()
  const magneticButtonRef = useMagnetic<HTMLAnchorElement>()
  const { setCursorType } = useCursor()

  useEffect(() => {
    const el = statementRef.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const anim = gsap.fromTo(
        el,
        { y: 56, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      )

      return () => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill()
        anim.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="relative bg-[var(--color-paper-alt)] border-t border-[var(--color-line)] pt-20 md:pt-32 pb-12 overflow-hidden"
    >
      <div className="container-wide">
        {/* Section Label */}
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-8">
          / 05 - CONTACT
        </div>

        {/* Giant Statement & Magnetic Action */}
        <div
          ref={statementRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 md:mb-24"
        >
          <div>
            <h2 className="font-display font-extrabold text-[clamp(2.8rem,8.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em] text-[var(--color-ink)] uppercase">
              Let us build
            </h2>
            <h2 className="font-display font-extrabold text-[clamp(2.8rem,8.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em] text-[var(--color-ink)] uppercase">
              something <span className="text-[var(--color-accent)]">real.</span>
            </h2>
          </div>

          {/* Magnetic Circular "Get in Touch" Button */}
          <div className="flex items-center">
            <a
              ref={magneticButtonRef}
              href={`mailto:${profile.email}`}
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] flex flex-col items-center justify-center p-4 text-center font-display font-bold text-sm uppercase tracking-wider shadow-xl active:scale-[0.97] hover:bg-[var(--color-accent)] transition-all duration-300"
              aria-label="Get in touch via email"
            >
              <span>Get in</span>
              <span>Touch ↗</span>
            </a>
          </div>
        </div>

        {/* Large Underlined Email Display */}
        <div className="mb-16 md:mb-20 pb-12 border-b border-[var(--color-line)]">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Direct Dispatch
          </div>
          <a
            href={`mailto:${profile.email}`}
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
            className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-8 decoration-[var(--color-line)] hover:decoration-[var(--color-accent)] break-all"
          >
            {profile.email}
          </a>
        </div>

        {/* Social Matrix & Secondary Pune Clock */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pb-12 border-b border-[var(--color-line)]">
          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {profile.socials.map((social) => {
              const isEmail = social.url.startsWith('mailto:')
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  onMouseEnter={() => setCursorType('link')}
                  onMouseLeave={() => setCursorType('default')}
                  className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1 group"
                >
                  <span>{social.label}</span>
                  {!isEmail && (
                    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  )}
                </a>
              )
            })}
          </div>

          {/* Secondary Live Pune Clock */}
          <div className="flex items-center gap-2 font-mono text-xs tabular text-[var(--color-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>Local Time: {puneClock}</span>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--color-muted)]">
          <div>
            © {currentYear} {profile.first_name} {profile.last_name}. All rights reserved.
          </div>

          <div>{profile.location}</div>

          <button
            onClick={() => scrollTo(0)}
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
            className="hover:text-[var(--color-ink)] active:scale-[0.97] transition-all flex items-center gap-1 uppercase tracking-wider"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

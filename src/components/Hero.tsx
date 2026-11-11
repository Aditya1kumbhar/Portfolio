'use client'

import React from 'react'
import WaveCanvas from './WaveCanvas'
import StatsMarquee from './StatsMarquee'
import PlaceholderImage from './PlaceholderImage'
import { profile } from '@/data/content'
import { useMotion } from '@/providers/MotionProvider'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCursor } from '@/hooks/useCursor'

export default function Hero() {
  const { scrollTo } = useMotion()
  const magneticWorkRef = useMagnetic<HTMLButtonElement>()
  const magneticResumeRef = useMagnetic<HTMLAnchorElement>()
  const { setCursorType } = useCursor()

  return (
    <section className="relative w-full min-h-screen pt-28 md:pt-36 flex flex-col justify-between overflow-hidden bg-[var(--color-paper)]">
      {/* Background Sine Wave Canvas */}
      <WaveCanvas />

      {/* Main Content Area */}
      <div className="container-wide relative z-10 w-full my-auto py-8">
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-8 border-b border-[var(--color-line)]">
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
            <h1 className="font-display font-extrabold text-[clamp(4.2rem,16vw,14rem)] leading-[0.85] tracking-[-0.03em] text-[var(--color-ink)] uppercase">
              {profile.hero_line_1}
            </h1>
          </div>
          <div className="overflow-hidden flex justify-start sm:justify-end">
            <h1 className="font-display font-extrabold text-[clamp(4.2rem,16vw,14rem)] leading-[0.85] tracking-[-0.03em] text-[var(--color-ink)] uppercase">
              {profile.hero_line_2}
              <span className="text-[var(--color-accent)]">.</span>
            </h1>
          </div>
        </div>

        {/* Narrative & Portrait Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
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
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
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
      <div className="relative z-10 w-full mt-12">
        <StatsMarquee />
      </div>
    </section>
  )
}

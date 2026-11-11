'use client'

import React from 'react'
import SectionHeader from './SectionHeader'
import PlaceholderImage from './PlaceholderImage'
import { profile, education, languages } from '@/data/content'
import { useReveal } from '@/hooks/useReveal'

export default function About() {
  const containerRef = useReveal<HTMLElement>()

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding bg-[var(--color-paper)] relative border-b border-[var(--color-line)]"
    >
      <div className="container-wide">
        <SectionHeader label="/ 03 - ABOUT" title="Builder, at the core" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Rotating Circular Badge (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center" data-reveal>
            <div className="w-full max-w-md relative">
              <PlaceholderImage
                aspectRatio="4/5"
                title="Aditya Kumbhar - About"
                className="rounded-sm shadow-md"
              />

              {/* Rotating Circular Text Badge */}
              <div
                className="absolute -bottom-8 -right-8 w-36 h-36 md:w-44 md:h-44 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)] shadow-xl flex items-center justify-center p-2 select-none pointer-events-none"
                aria-hidden="true"
              >
                {/* SVG Circular Text Path */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full animate-[spin_18s_linear_infinite]"
                  style={{ animationPlayState: 'running' }}
                >
                  <defs>
                    <path
                      id="circleTextPath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="font-mono text-[7px] uppercase tracking-[0.2em] fill-[var(--color-ink)] font-semibold">
                    <textPath href="#circleTextPath" startOffset="0%">
                      {profile.tagline.toUpperCase()} •
                    </textPath>
                  </text>
                </svg>

                {/* Center Accent Wave Glyph */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-extrabold text-xl text-[var(--color-accent)]">
                    ≈
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Education, Languages (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10" data-reveal data-reveal-delay={0.15}>
            {/* Long Narrative Bio */}
            <div>
              <p className="font-body text-lg sm:text-xl text-[var(--color-ink-soft)] leading-relaxed">
                {profile.bio_long}
              </p>
            </div>

            {/* Education Card */}
            <div className="p-6 sm:p-8 rounded-sm bg-[var(--color-paper-alt)] border border-[var(--color-line)] shadow-2xs">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2">
                Education
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h4 className="font-display font-bold text-xl text-[var(--color-ink)]">
                  {education.degree}
                </h4>
                <span className="font-mono text-xs text-[var(--color-muted)] shrink-0">
                  {education.period}
                </span>
              </div>
              <div className="font-body text-sm font-medium text-[var(--color-ink-soft)] mb-3">
                {education.institution}
              </div>
              <p className="font-body text-xs sm:text-sm text-[var(--color-muted)] leading-normal">
                {education.detail}
              </p>
            </div>

            {/* Spoken Languages Matrix */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
                Spoken Languages
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3 border border-[var(--color-line)] rounded-sm bg-[var(--color-paper)] flex flex-col gap-1"
                  >
                    <span className="font-body text-sm font-bold text-[var(--color-ink)]">
                      {lang.name}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--color-muted)]">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

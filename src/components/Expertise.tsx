'use client'

import React from 'react'
import SectionHeader from './SectionHeader'
import { expertise } from '@/data/content'
import { useReveal } from '@/hooks/useReveal'
import { useCursor } from '@/hooks/useCursor'

export default function Expertise() {
  const containerRef = useReveal<HTMLElement>()
  const { setCursorType } = useCursor()

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="section-padding bg-[var(--color-paper)] relative border-b border-[var(--color-line)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <SectionHeader label="/ 01 - EXPERTISE" title="What I do best" />

        {/* Interactive Rows */}
        <div className="divide-y divide-[var(--color-line)]">
          {expertise.map((item, index) => (
            <div
              key={item.index}
              data-reveal
              data-reveal-delay={index * 0.1}
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
              className="group py-10 md:py-14 px-4 -mx-4 transition-colors duration-400 ease-out hover:bg-[var(--color-paper-alt)] rounded-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Index + Tag (3 cols) */}
                <div className="lg:col-span-3 flex items-baseline gap-4">
                  <span className="font-display font-bold text-3xl md:text-5xl text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {item.index}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink-soft)]">
                    {item.tag}
                  </span>
                </div>

                {/* Title + Description (5 cols) */}
                <div className="lg:col-span-5">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-ink)] mb-3 transition-transform duration-300 group-hover:translate-x-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-base text-[var(--color-ink-soft)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tool Pills (4 cols) */}
                <div className="lg:col-span-4 flex flex-wrap gap-2 pt-2">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink-soft)] shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

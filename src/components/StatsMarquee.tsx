'use client'

import React from 'react'
import { statsMarquee } from '@/data/content'

export default function StatsMarquee() {
  return (
    <div
      className="w-full border-t border-b border-[var(--color-line)] bg-[var(--color-paper-alt)] py-3 overflow-hidden select-none"
      aria-label="Key Highlights Marquee"
    >
      <div className="animate-marquee flex items-center">
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

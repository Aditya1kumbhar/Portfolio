'use client'

import React from 'react'
import { useLineDrawReveal } from '@/hooks/useLineDrawReveal'

interface SectionHeaderProps {
  label: string
  title: string
  className?: string
}

export default function SectionHeader({ label, title, className = '' }: SectionHeaderProps) {
  const lineRef = useLineDrawReveal<HTMLDivElement>()

  return (
    <div className={`mb-12 md:mb-16 ${className}`} data-reveal>
      <div className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">
        {label}
      </div>
      <h2 className="font-display font-bold text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] mb-8">
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

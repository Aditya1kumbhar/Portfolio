'use client'

import React from 'react'

interface PlaceholderImageProps {
  aspectRatio?: string // e.g. '16/10', '4/5', '4/3'
  title?: string
  className?: string
}

export default function PlaceholderImage({
  aspectRatio = '16/10',
  title = 'Image placeholder',
  className = '',
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--color-paper-alt)] border border-[var(--color-line)] flex flex-col items-center justify-center p-6 select-none ${className}`}
      style={{ aspectRatio }}
      aria-label={title}
    >
      {/* Subtle geometric grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Decorative hairline corner marks */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--color-muted)] opacity-30" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--color-muted)] opacity-30" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--color-muted)] opacity-30" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--color-muted)] opacity-30" />

      {/* Monogram */}
      <div className="font-display font-extrabold text-4xl md:text-6xl text-[var(--color-muted)] opacity-40 tracking-tight mb-2">
        AK
      </div>

      {/* Label */}
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-muted)] opacity-70">
        {title}
      </div>
    </div>
  )
}

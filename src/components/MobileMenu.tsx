'use client'

import React, { useEffect } from 'react'
import { useMotion } from '@/providers/MotionProvider'
import { profile } from '@/data/content'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'Expertise', href: '#expertise', index: '01' },
  { label: 'Work', href: '#work', index: '02' },
  { label: 'About', href: '#about', index: '03' },
  { label: 'Journey', href: '#journey', index: '04' },
  { label: 'Contact', href: '#contact', index: '05' },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { scrollTo } = useMotion()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleLinkClick = (href: string) => {
    onClose()
    setTimeout(() => {
      scrollTo(href, { offset: -60 })
    }, 150)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-[9980] bg-[var(--color-paper)] flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-6">
        <span className="font-display font-extrabold text-2xl tracking-tighter text-[var(--color-ink)]">
          AK<span className="text-[var(--color-accent)]">.</span>
        </span>
        <button
          onClick={onClose}
          className="font-mono text-sm uppercase tracking-widest px-4 py-2.5 min-h-[44px] border border-[var(--color-line)] rounded-full text-[var(--color-ink)] active:scale-[0.97] transition-transform"
          aria-label="Close menu"
        >
          Close
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="my-auto py-10 flex flex-col gap-6">
        {navLinks.map((item) => (
          <button
            key={item.href}
            onClick={() => handleLinkClick(item.href)}
            className="group flex items-baseline gap-4 text-left active:scale-[0.98] transition-transform"
          >
            <span className="font-mono text-sm text-[var(--color-accent)] font-semibold tracking-wider">
              {item.index}
            </span>
            <span className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-ink)] tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom Footer Info */}
      <div className="border-t border-[var(--color-line)] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-[var(--color-ink-soft)] uppercase tracking-wider">
            {profile.availability}
          </span>
        </div>
        <div className="font-mono text-xs text-[var(--color-muted)]">
          {profile.location}
        </div>
      </div>
    </div>
  )
}

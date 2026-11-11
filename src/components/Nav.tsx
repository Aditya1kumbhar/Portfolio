'use client'

import React, { useEffect, useState } from 'react'
import { useMotion } from '@/providers/MotionProvider'
import { usePuneClock } from '@/hooks/usePuneClock'
import { useCursor } from '@/hooks/useCursor'
import { profile } from '@/data/content'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollTo } = useMotion()
  const puneClock = usePuneClock()
  const { setCursorType } = useCursor()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollTo(href, { offset: -80 })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-paper)] border-b border-[var(--color-line)] py-3 shadow-[0_4px_24px_rgba(16,21,29,0.03)]'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Left: Brand Monogram */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(0)
            }}
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
            className="group flex items-baseline gap-1 text-[var(--color-ink)] active:scale-[0.97] transition-transform"
            aria-label="Aditya Kumbhar - Return to top"
          >
            <span className="font-display font-extrabold text-2xl tracking-tighter">
              AK
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block transition-transform group-hover:scale-125" />
          </a>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
                className="font-body text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--color-accent)] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Live Clock & Availability Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Live Pune Clock (Hidden on very small screens) */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs tabular text-[var(--color-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-60" />
              <span>{puneClock}</span>
            </div>

            {/* Availability Pill */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-line)] bg-[var(--color-paper-alt)] text-[var(--color-ink-soft)] font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-tight">{profile.availability}</span>
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md border border-[var(--color-line)] text-[var(--color-ink)] active:scale-[0.95] transition-transform"
              aria-label="Open navigation menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        {/* Scroll-edge dissolve: content fades into paper under the header (mask fade, no blur, no glass). */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-full -z-10 h-8 md:h-11 transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundColor: 'var(--color-paper)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        />
      </header>

      {/* Full-Screen Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}

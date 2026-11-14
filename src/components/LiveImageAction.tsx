'use client'

import React, { useState, useRef, useEffect } from 'react'

export interface LiveImageActionProps {
  projectName: string
  liveUrl: string
  liveLabel: string
  filmUrl?: string
  chipText: string
}

export default function LiveImageAction({
  projectName,
  liveUrl,
  liveLabel,
  filmUrl,
  chipText,
}: LiveImageActionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (e: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      {filmUrl ? (
        <>
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label={`Open ${projectName}: choose the live app or watch the film`}
            onClick={() => setIsOpen((open) => !open)}
            className="absolute inset-0 z-20 block w-full h-full cursor-pointer focus-visible:outline-offset-[-2px]"
          />
          {isOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-label={`${projectName} options`}
              className="absolute right-3 bottom-14 z-30 min-w-[220px] max-w-[calc(100%-24px)] bg-[var(--color-paper)] border border-[var(--color-line)] shadow-lg rounded-sm py-1"
            >
              <a
                role="menuitem"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                aria-label={`Open ${projectName} live app in a new tab`}
                className="flex items-center justify-between gap-6 min-h-[44px] px-4 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-paper-alt)] hover:text-[var(--color-accent)] focus-visible:outline-offset-[-2px] focus-visible:bg-[var(--color-paper-alt)] focus-visible:text-[var(--color-accent)] transition-colors"
              >
                <span>Try it live</span>
                <span>↗</span>
              </a>
              <a
                role="menuitem"
                href={filmUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                aria-label={`Watch the ${projectName} film on YouTube in a new tab`}
                className="flex items-center justify-between gap-6 min-h-[44px] px-4 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-paper-alt)] hover:text-[var(--color-accent)] focus-visible:outline-offset-[-2px] focus-visible:bg-[var(--color-paper-alt)] focus-visible:text-[var(--color-accent)] transition-colors"
              >
                <span>Watch the film</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </>
      ) : (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${projectName}, ${liveLabel}, in a new tab`}
          className="absolute inset-0 z-20 block cursor-pointer focus-visible:outline-offset-[-2px]"
        />
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 bottom-3 z-10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest bg-[var(--color-paper)]/90 backdrop-blur-sm border border-[var(--color-line)] text-[var(--color-ink)] rounded-sm"
      >
        {chipText}
      </span>
    </>
  )
}

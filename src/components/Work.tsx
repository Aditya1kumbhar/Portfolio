'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import SectionHeader from './SectionHeader'
import { projects } from '@/data/content'
import Link from 'next/link'
import { useCursor } from '@/hooks/useCursor'
import { useReveal } from '@/hooks/useReveal'
import { useImageClipReveal } from '@/hooks/useImageClipReveal'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface ProjectCardProps {
  project: (typeof projects)[0]
  isEven: boolean
}

function ProjectCard({ project, isEven }: ProjectCardProps) {
  const { setCursorType } = useCursor()
  const imageClipRef = useImageClipReveal<HTMLDivElement>()

  return (
    <div
      className="project-card py-12 md:py-20 border-b border-[var(--color-line)] last:border-b-0"
    >
      <div
        className={`flex flex-col ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } items-center gap-8 lg:gap-0`}
      >
        {/* Project Image Frame (62% desktop width) */}
        <div
          ref={imageClipRef}
          onMouseEnter={() => setCursorType('view')}
          onMouseLeave={() => setCursorType('default')}
          className="w-full lg:w-[62%] relative overflow-hidden rounded-sm group cursor-pointer"
        >
          <div className="project-zoom w-full will-change-transform">
            <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <div
                className="relative w-full overflow-hidden border border-[var(--color-line)] bg-[var(--color-paper-alt)]"
                style={{ aspectRatio: '16/10' }}
              >
                <img
                  src={project.image}
                  alt={`${project.name} - ${project.subtitle}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Metadata & Narrative (overlaps image on desktop) */}
        <div
          className={`project-meta w-full lg:w-[48%] relative z-10 bg-[var(--color-paper)] p-6 sm:p-10 border border-[var(--color-line)] shadow-lg rounded-sm ${
            isEven ? 'lg:-ml-16' : 'lg:-mr-16'
          }`}
        >
          {/* Top Category & Year */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[var(--color-line)]">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[var(--color-muted)]">
              {project.year}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-ink)] mb-1">
            {project.name}
          </h3>
          <p className="font-body text-sm text-[var(--color-muted)] mb-4 italic">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="font-body text-sm sm:text-base text-[var(--color-ink-soft)] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-1 rounded bg-[var(--color-paper-alt)] border border-[var(--color-line)] text-[var(--color-ink-soft)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link Matrix */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <Link
              href={`/work/${project.slug}`}
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
              className="group flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[var(--color-accent-ink)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4 decoration-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
            >
              <span>Case Study</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
                className="group flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4 decoration-[var(--color-line)] hover:decoration-[var(--color-accent)]"
              >
                <span>{link.label}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const containerRef = useReveal<HTMLElement>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const mm = gsap.matchMedia()
    const cards = container.querySelectorAll<HTMLElement>('.project-card')
    if (cards.length === 0) return

    // Unified unpinned motion for all viewport widths
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let alive = true
      const splits: SplitText[] = []

      cards.forEach((card) => {
        // (a) Image zoom scrub
        const zoomEl = card.querySelector<HTMLElement>('.project-zoom')
        if (zoomEl) {
          gsap.fromTo(
            zoomEl,
            { scale: 1.08 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top 25%',
                scrub: 0.4,
              },
            }
          )
        }

        // (c) The meta panel's direct children except the h3
        const metaEl = card.querySelector<HTMLElement>('.project-meta')
        if (metaEl) {
          const metaChildren = Array.from(metaEl.children).filter(
            (child) => child.tagName.toLowerCase() !== 'h3'
          )
          if (metaChildren.length > 0) {
            gsap.fromTo(
              metaChildren,
              { y: 26, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.07,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 74%',
                  once: true,
                },
              }
            )
          }
        }
      })

      // (b) The h3 title split after fonts are ready
      const initSplits = () => {
        if (!alive) return

        cards.forEach((card) => {
          const h3 = card.querySelector<HTMLHeadingElement>('h3')
          if (h3) {
            try {
              const split = SplitText.create(h3, { type: 'chars', mask: 'chars' })
              splits.push(split)
              if (split.chars && split.chars.length > 0) {
                gsap.from(split.chars, {
                  yPercent: 120,
                  duration: 0.7,
                  ease: 'power3.out',
                  stagger: 0.015,
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 78%',
                    once: true,
                  },
                })
              }
            } catch (err) {
              console.warn('Work SplitText char split failed:', err)
            }
          }
        })
      }

      if (typeof document !== 'undefined' && document.fonts) {
        document.fonts.ready.then(initSplits)
      } else {
        initSplits()
      }

      return () => {
        alive = false
        splits.forEach((s) => s.revert())
      }
    })

    // Condition 3: Reduced motion - neither condition matches, cards remain fully visible

    return () => {
      mm.revert()
    }
  }, [containerRef])

  return (
    <section
      id="work"
      ref={containerRef}
      className="section-padding bg-[var(--color-paper-alt)] relative border-b border-[var(--color-line)]"
    >
      <div className="container-wide">
        <SectionHeader label="/ 02 - SELECTED WORK" title="Selected Work" />

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.index}
              project={project}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

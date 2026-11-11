'use client'

import React from 'react'
import SectionHeader from './SectionHeader'
import PlaceholderImage from './PlaceholderImage'
import { projects } from '@/data/content'
import { useCursor } from '@/hooks/useCursor'
import { useReveal } from '@/hooks/useReveal'
import { useImageClipReveal } from '@/hooks/useImageClipReveal'

interface ProjectCardProps {
  project: (typeof projects)[0]
  isEven: boolean
}

function ProjectCard({ project, isEven }: ProjectCardProps) {
  const { setCursorType } = useCursor()
  const imageClipRef = useImageClipReveal<HTMLDivElement>()

  return (
    <div
      data-reveal
      className="py-12 md:py-20 border-b border-[var(--color-line)] last:border-b-0"
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
          <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <PlaceholderImage
              aspectRatio="16/10"
              title={`${project.name} - ${project.subtitle}`}
              className="w-full"
            />
          </div>
        </div>

        {/* Project Metadata & Narrative (overlaps image on desktop) */}
        <div
          className={`w-full lg:w-[48%] relative z-10 bg-[var(--color-paper)] p-6 sm:p-10 border border-[var(--color-line)] shadow-lg rounded-sm ${
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

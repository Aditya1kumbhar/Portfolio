'use client'

import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import { experience, achievements, certificates } from '@/data/content'
import { useReveal } from '@/hooks/useReveal'
import { useCursor } from '@/hooks/useCursor'

export default function Journey() {
  const containerRef = useReveal<HTMLElement>()
  const { setCursorType } = useCursor()
  const [selectedCert, setSelectedCert] = useState<string | null>(null)

  return (
    <section
      id="journey"
      ref={containerRef}
      className="section-padding bg-[var(--color-paper-alt)] relative border-b border-[var(--color-line)]"
    >
      <div className="container-wide">
        <SectionHeader label="/ 04 - JOURNEY" title="Experience and Recognition" />

        {/* 1. Experience Table */}
        <div className="mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-6">
            / 01 - Career Milestones
          </div>

          <div className="divide-y divide-[var(--color-line)] border-t border-b border-[var(--color-line)]">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                data-reveal
                className="py-8 px-4 -mx-4 transition-colors duration-300 hover:bg-[var(--color-paper)] rounded-sm group flex flex-col md:flex-row md:items-baseline justify-between gap-4"
              >
                <div>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {exp.role}
                  </h4>
                  <div className="font-body text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
                    {exp.organisation}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[var(--color-muted)] max-w-xl">
                    {exp.note}
                  </p>
                </div>

                <div className="font-mono text-xs text-[var(--color-muted)] shrink-0 self-start md:self-auto">
                  {exp.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Achievements Table */}
        <div className="mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-6">
            / 02 - Key Achievements
          </div>

          <div className="divide-y divide-[var(--color-line)] border-t border-b border-[var(--color-line)]">
            {achievements.map((item) => (
              <div
                key={item.index}
                data-reveal
                className="py-6 px-4 -mx-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline hover:bg-[var(--color-paper)] transition-colors rounded-sm"
              >
                <div className="sm:col-span-1 font-mono text-xs font-bold text-[var(--color-accent)]">
                  {item.index}
                </div>
                <div className="sm:col-span-5 font-display font-bold text-lg text-[var(--color-ink)]">
                  {item.title}
                </div>
                <div className="sm:col-span-4 font-body text-sm text-[var(--color-ink-soft)]">
                  {item.body}
                </div>
                <div className="sm:col-span-2 font-mono text-xs text-[var(--color-muted)] sm:text-right">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Certificates Showcase */}
        {certificates.items.length > 0 && (
          <div data-reveal data-reveal-delay={0.2}>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-6">
              / 03 - Verified Research & Certifications
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.items.map((cert, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-sm overflow-hidden shadow-xs flex flex-col justify-between group hover:border-[var(--color-accent)] transition-all duration-300"
                >
                  {/* Certificate Image Frame */}
                  <div
                    onClick={() => setSelectedCert(cert.image)}
                    onMouseEnter={() => setCursorType('link')}
                    onMouseLeave={() => setCursorType('default')}
                    className="relative aspect-4/3 overflow-hidden bg-[var(--color-paper-alt)] cursor-pointer border-b border-[var(--color-line)]"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 themed-img"
                    />
                    <div className="absolute inset-0 bg-[var(--color-ink)] opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="absolute bottom-2 right-2 font-mono text-[10px] bg-[var(--color-paper)] text-[var(--color-ink)] px-2 py-0.5 rounded rounded-br-none shadow-xs uppercase tracking-wider">
                      Click to expand
                    </span>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-[var(--color-muted)]">
                        <span>Verified</span>
                        <span>{cert.year}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[var(--color-ink)] mb-3 leading-snug">
                        {cert.title}
                      </h4>
                      <p className="font-body text-xs text-[var(--color-ink-soft)] leading-normal mb-4">
                        {cert.issuer}
                      </p>
                    </div>

                    {cert.verify_url && (
                      <a
                        href={cert.verify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 mt-auto"
                      >
                        Verify Credential ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for viewing certificate image */}
        {selectedCert && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9995] bg-[rgba(16,21,29,0.9)] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--color-paper)] p-2 rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 font-mono text-xs uppercase tracking-widest text-[var(--color-paper)] border border-[var(--color-line)] px-4 py-1.5 rounded-full hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition-colors"
              >
                Close ✕
              </button>
              <img
                src={selectedCert}
                alt="Enlarged Certificate View"
                className="w-full h-auto max-h-[85vh] object-contain mx-auto rounded-none themed-img"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContactFooter from '@/components/ContactFooter'
import { projects } from '@/data/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const title = `${project.name} Case Study`
  return {
    title,
    description: project.caseStudy.lede,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title,
      description: project.caseStudy.lede,
      url: `/work/${project.slug}`,
      images: [
        {
          url: project.image.replace('.webp', '.jpg'),
          width: 1920,
          height: 1200,
          alt: `${project.name} - ${project.subtitle}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.caseStudy.lede,
      images: [project.image.replace('.webp', '.jpg')],
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const cs = project.caseStudy

  return (
    <>
      <header className="border-b border-[var(--color-line)] bg-[var(--color-paper)]">
        <div className="container-wide flex items-center justify-between py-5 md:py-6">
          <Link
            href="/"
            className="font-display font-bold text-2xl tracking-[-0.02em] text-[var(--color-ink)]"
          >
            AK<span className="text-[var(--color-accent)]">.</span>
          </Link>
          <Link
            href="/#work"
            className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            ← All Work
          </Link>
        </div>
      </header>

      <main className="relative w-full bg-[var(--color-paper)]">
        <article className="container-wide pt-12 pb-20 md:pt-20 md:pb-28">
          {/* Title block */}
          <div className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">
            {project.category} · {project.year}
          </div>
          <h1 className="font-display font-bold text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
            {project.name}
          </h1>
          <p className="font-body italic text-xl md:text-2xl text-[var(--color-ink-soft)] mt-4">
            {project.subtitle}
          </p>
          <p className="font-body text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)] max-w-3xl mt-6">
            {cs.lede}
          </p>

          {/* Hero image */}
          <div
            className="relative w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-paper-alt)] mt-10 md:mt-14"
            style={{ aspectRatio: '16/10' }}
          >
            <img
              src={project.image}
              alt={`${project.name} - ${project.subtitle}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[var(--color-line)] py-8 md:py-10">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)] mb-2">
                Role
              </div>
              <div className="font-body text-sm md:text-base text-[var(--color-ink)]">
                {cs.role}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)] mb-2">
                Stack
              </div>
              <div className="font-body text-sm md:text-base text-[var(--color-ink)]">
                {project.stack.join(' · ')}
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)] mb-2">
                Links
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] underline underline-offset-4 decoration-[var(--color-line)] transition-colors hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* The problem */}
          <section className="mt-16 md:mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  / The Problem
                </div>
              </div>
              <div className="lg:col-span-8 space-y-5">
                {cs.problem.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="font-body text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* What I built */}
          <section className="mt-16 md:mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  / What I Built
                </div>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-5">
                  {cs.built.map((item) => (
                    <li key={item.slice(0, 24)} className="flex gap-4">
                      <span
                        className="mt-[0.6em] h-2 w-2 shrink-0 bg-[var(--color-accent)]"
                        aria-hidden="true"
                      />
                      <p className="font-body text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Proof strip */}
          <section className="mt-16 md:mt-24 border-y border-[var(--color-line)] py-10 md:py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {cs.proof.map((item) => (
                <div key={item.label}>
                  <div className="font-display font-bold text-4xl md:text-5xl text-[var(--color-ink)]">
                    {item.value}
                  </div>
                  <div className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-[var(--color-muted)] mt-2">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Field visit (optional, only when the project carries fieldVisit data) */}
          {cs.fieldVisit && (
            <section className="mt-16 md:mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-4">
                  <div className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    / Field Visit
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <p className="font-body text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
                    {cs.fieldVisit.intro}
                  </p>
                  <ul className="space-y-5 mt-8">
                    {cs.fieldVisit.findings.map((item) => (
                      <li key={item.slice(0, 24)} className="flex gap-4">
                        <span
                          className="mt-[0.6em] h-2 w-2 shrink-0 bg-[var(--color-accent)]"
                          aria-hidden="true"
                        />
                        <p className="font-body text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    {cs.fieldVisit.photos.map((photo) => (
                      <figure key={photo.src}>
                        <div className="relative w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-paper-alt)]">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="block h-auto w-full"
                          />
                        </div>
                        <figcaption className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)] mt-3">
                          {photo.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Next project */}
          <nav className="mt-16 md:mt-24">
            <div className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">
              Next Project
            </div>
            <Link
              href={`/work/${next.slug}`}
              className="group inline-flex items-baseline gap-3 text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
            >
              <span className="font-display font-bold text-3xl md:text-5xl tracking-[-0.02em]">
                {next.name}
              </span>
              <span className="font-display font-bold text-3xl md:text-5xl text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </nav>
        </article>
      </main>

      <ContactFooter />
    </>
  )
}

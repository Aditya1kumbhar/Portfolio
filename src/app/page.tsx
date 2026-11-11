'use client'

import React, { useState } from 'react'
import Preloader from '@/components/Preloader'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import Expertise from '@/components/Expertise'
import About from '@/components/About'
import Journey from '@/components/Journey'
import ContactFooter from '@/components/ContactFooter'

export default function Home() {
  const [preloaderFinished, setPreloaderFinished] = useState(false)

  return (
    <>
      {/* Initial Screen Preloader */}
      <Preloader
        onComplete={() => {
          setPreloaderFinished(true)
          window.dispatchEvent(new Event('ak:intro'))
        }}
      />

      {/* Floating Navigation */}
      <Nav />

      {/* Single-Page Scroll Architecture */}
      <main id="main-content" className="relative w-full">
        <Hero />
        <Expertise />
        <Work />
        <About />
        <Journey />
      </main>

      {/* Contact Colophon & Footer */}
      <ContactFooter />
    </>
  )
}

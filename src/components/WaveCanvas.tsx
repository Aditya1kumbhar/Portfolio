'use client'

import React, { useEffect, useRef } from 'react'

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let isVisible = true
    let width = 0
    let height = 0

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallScreen = window.innerWidth < 768

    // Cap DPR at 1.5 for performance budget
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (prefersReducedMotion || isSmallScreen) {
        drawFrame(0)
      }
    }

    // 3 sine wave specifications (accent, soft ink, accent)
    const waves = [
      {
        color: 'rgba(176, 138, 38, 0.16)', // Accent gold
        lineWidth: 1.5,
        amplitude: 28,
        frequency: 0.0035,
        speed: 0.0008,
        verticalOffset: 0.52,
      },
      {
        color: 'rgba(60, 70, 84, 0.12)', // Soft ink
        lineWidth: 1.2,
        amplitude: 36,
        frequency: 0.0028,
        speed: -0.0006,
        verticalOffset: 0.48,
      },
      {
        color: 'rgba(176, 138, 38, 0.11)', // Accent gold subtle
        lineWidth: 1.0,
        amplitude: 22,
        frequency: 0.0042,
        speed: 0.0011,
        verticalOffset: 0.56,
      },
    ]

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      waves.forEach((w) => {
        ctx.beginPath()
        ctx.strokeStyle = w.color
        ctx.lineWidth = w.lineWidth

        const baseY = height * w.verticalOffset
        const phase = time * w.speed

        ctx.moveTo(0, baseY + Math.sin(phase) * w.amplitude)

        // Step by 4px for smooth curve without excessive vertex calculation
        for (let x = 0; x <= width; x += 4) {
          const y = baseY + Math.sin(x * w.frequency + phase) * w.amplitude
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      })
    }

    const loop = (timestamp: number) => {
      if (!isVisible) return
      drawFrame(timestamp)
      animationFrameId = requestAnimationFrame(loop)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Run animation loop only if allowed
    if (!prefersReducedMotion && !isSmallScreen) {
      animationFrameId = requestAnimationFrame(loop)
    }

    // IntersectionObserver: pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !prefersReducedMotion && !isSmallScreen) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = requestAnimationFrame(loop)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    // Document visibility change listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false
      } else {
        isVisible = true
        if (!prefersReducedMotion && !isSmallScreen) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = requestAnimationFrame(loop)
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  )
}

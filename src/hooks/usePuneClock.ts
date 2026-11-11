'use client'

import { useState, useEffect } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export function usePuneClock(): string {
  const [timeStr, setTimeStr] = useState<string>('--:--:-- IST')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(`${formatter.format(now)} IST`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return timeStr
}

'use client'

import { useSyncExternalStore } from 'react'

export type ThemeSetting = 'light' | 'dark' | 'system'
export type EffectiveTheme = 'light' | 'dark'

export interface ThemeState {
  setting: ThemeSetting
  effectiveTheme: EffectiveTheme
}

/**
 * Module-level helper to toggle the 'dark' class on documentElement
 * and set style.colorScheme. Callable directly inside document.startViewTransition.
 */
export function applyTheme(effective: EffectiveTheme) {
  if (typeof document === 'undefined') return
  const isDark = effective === 'dark'
  if (isDark) {
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = 'light'
  }
}

export function getSystemTheme(): EffectiveTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getStoredSetting(): ThemeSetting {
  if (typeof window === 'undefined') return 'system'
  try {
    const val = localStorage.getItem('theme')
    if (val === 'light' || val === 'dark' || val === 'system') return val
  } catch {}
  return 'system'
}

export function resolveEffective(setting: ThemeSetting): EffectiveTheme {
  if (setting === 'light') return 'light'
  if (setting === 'dark') return 'dark'
  return getSystemTheme()
}

// Module store & listeners for cross-component and live-OS sync
const listeners = new Set<() => void>()
let mql: MediaQueryList | null = null

function onMediaChange(e: MediaQueryListEvent) {
  if (currentStoreState.setting === 'system') {
    const effectiveTheme: EffectiveTheme = e.matches ? 'dark' : 'light'
    applyTheme(effectiveTheme)
    currentStoreState = {
      setting: 'system',
      effectiveTheme,
    }
    emitChange()
  }
}

function updateMediaSubscription() {
  if (typeof window === 'undefined' || !window.matchMedia) return
  if (!mql) {
    mql = window.matchMedia('(prefers-color-scheme: dark)')
  }
  mql.removeEventListener('change', onMediaChange)
  if (currentStoreState.setting === 'system') {
    mql.addEventListener('change', onMediaChange)
  }
}

function emitChange() {
  listeners.forEach((listener) => listener())
}

function getInitialClientState(): ThemeState {
  if (typeof window === 'undefined') {
    return { setting: 'system', effectiveTheme: 'light' }
  }
  const isDarkClass = document.documentElement.classList.contains('dark')
  const stored = getStoredSetting()
  const effectiveTheme: EffectiveTheme = isDarkClass
    ? 'dark'
    : resolveEffective(stored)

  return {
    setting: stored,
    effectiveTheme,
  }
}

const SERVER_SNAPSHOT: ThemeState = {
  setting: 'system',
  effectiveTheme: 'light',
}

let currentStoreState: ThemeState = getInitialClientState()

if (typeof window !== 'undefined') {
  updateMediaSubscription()
}

export function setThemeState(newSetting: ThemeSetting) {
  if (typeof window === 'undefined') return

  try {
    if (newSetting === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', newSetting)
    }
  } catch {}

  const effectiveTheme = resolveEffective(newSetting)
  applyTheme(effectiveTheme)

  currentStoreState = {
    setting: newSetting,
    effectiveTheme,
  }
  updateMediaSubscription()
  emitChange()
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function getSnapshot(): ThemeState {
  return currentStoreState
}

function getServerSnapshot(): ThemeState {
  return SERVER_SNAPSHOT
}

export function useTheme() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return {
    setting: state.setting,
    effectiveTheme: state.effectiveTheme,
    setTheme: setThemeState,
  }
}

'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  // Read preference synchronously on first render — no loading flash.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      const saved = localStorage.getItem('darkMode')
      return saved === 'true'
    } catch {
      return false
    }
  })

  // Apply the class immediately after paint (no "isLoading" gate needed).
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      document.body.style.setProperty('--scroll-bg', '#1f2937')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
      document.body.style.setProperty('--scroll-bg', '#f1f1f1')
    }
    document.body.style.setProperty('--scroll-thumb', 'linear-gradient(to bottom, #ec4899, #a855f7)')
    document.body.style.setProperty('--scroll-thumb-hover', 'linear-gradient(to bottom, #d946aa, #9333ea)')

    try {
      localStorage.setItem('darkMode', isDarkMode.toString())
    } catch { /* ignore */ }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(prev => !prev)

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, isLoading: false }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}

export default useDarkMode
// Made By Krishna Patil
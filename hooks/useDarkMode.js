'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('darkMode')
      if (saved === 'true') {
        setIsDarkMode(true)
      }
    } catch {
      // ignore
    }
    setIsLoading(false)
  }, [])

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
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, isLoading }}>
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
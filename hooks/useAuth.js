'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Custom hook for authentication management.
 * Reads sessionStorage synchronously on first render to avoid
 * the "isLoading: true" blocking flash that caused pages to appear
 * unresponsive on first click.
 */
export function useAuth() {
  const router = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('birthday_authenticated') === 'true'
      setIsAuthenticated(auth)
      setIsLoading(false)
    }
  }, [])

  // Redirect unauthenticated users once on mount (no repeated calls).
  const redirected = useRef(false)
  useEffect(() => {
    if (!isAuthenticated && !redirected.current) {
      redirected.current = true
      router.replace('/')
    }
  }, [isAuthenticated, router])

  const login = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('birthday_authenticated', 'true')
      // Full reload so useState initialiser picks up the new value
      window.location.href = '/birthday'
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('birthday_authenticated')
      window.location.href = '/'
    }
  }

  return { isAuthenticated, isLoading, login, logout }
}
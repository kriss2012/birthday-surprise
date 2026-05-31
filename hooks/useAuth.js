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

  // Read auth state synchronously on first render (no async delay).
  // sessionStorage is always available on the client, so we can safely
  // initialise state directly without waiting for a useEffect.
  const [isAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('birthday_authenticated') === 'true'
  })

  // No longer "loading" — we know the answer immediately.
  const [isLoading] = useState(false)

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
// Made By Krishna Patil
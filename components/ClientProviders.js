'use client'
import { useState, useEffect } from 'react'
import ParticleSystem from './ParticleSystem'
import DiscoveryTracker from './DiscoveryTracker'
import ClientOnlyDarkModeToggle from './ClientOnlyDarkModeToggle'
import { DarkModeProvider } from '../hooks/useDarkMode'

// All client-only, interactive shell components live here.
// This component is the boundary between the server layout and client world.
export default function ClientProviders({ children }) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Avoid rendering anything until the client has hydrated.
  // This completely eliminates hydration mismatches caused by synchronous localStorage/sessionStorage reads.
  if (!isMounted) return null

  return (
    <DarkModeProvider>
      <ClientOnlyDarkModeToggle />
      <ParticleSystem />
      <DiscoveryTracker />
      {children}
    </DarkModeProvider>
  )
}

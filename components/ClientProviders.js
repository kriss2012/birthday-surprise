'use client'
import ParticleSystem from './ParticleSystem'
import DiscoveryTracker from './DiscoveryTracker'
import ClientOnlyDarkModeToggle from './ClientOnlyDarkModeToggle'
import { DarkModeProvider } from '../hooks/useDarkMode'

// All client-only, interactive shell components live here.
// This component is the boundary between the server layout and client world.
export default function ClientProviders({ children }) {
  return (
    <DarkModeProvider>
      <ClientOnlyDarkModeToggle />
      <ParticleSystem />
      <DiscoveryTracker />
      {children}
    </DarkModeProvider>
  )
}

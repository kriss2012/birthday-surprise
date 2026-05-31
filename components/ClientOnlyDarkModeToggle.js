'use client'
import { useEffect, useState } from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function ClientOnlyDarkModeToggle() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 animate-pulse"></div>
      </div>
    )
  }

  return <DarkModeToggle />
}
// Made By Krishna Patil
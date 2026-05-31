'use client'
import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing game statistics
 * Centralizes localStorage operations and eliminates duplicate code
 */
export function useGameStats() {
  const [gameStats, setGameStats] = useState({
    quickHearts: 0,
    memoryMatch: 0,
    heartsDistance: 0,
    heartsDistanceTime: 0
  })

  // Load stats from localStorage
  const loadStats = useCallback(() => {
    if (typeof window !== 'undefined') {
      const quickHeartsScore = localStorage.getItem('quickHearts_highScore')
      const memoryMatchScore = localStorage.getItem('memoryMatch_bestScore')
      const heartsDistanceScore = localStorage.getItem('heartsDistance_highScore')
      const heartsDistanceTime = localStorage.getItem('heartsDistance_bestTime')

      setGameStats({
        quickHearts: quickHeartsScore ? parseInt(quickHeartsScore) : 0,
        memoryMatch: memoryMatchScore ? parseInt(memoryMatchScore) : 0,
        heartsDistance: heartsDistanceScore ? parseInt(heartsDistanceScore) : 0,
        heartsDistanceTime: heartsDistanceTime ? parseInt(heartsDistanceTime) : 0
      })
    }
  }, [])

  // Refresh stats - can be called from components
  const refreshStats = useCallback(() => {
    loadStats()
  }, [loadStats])

  // Load stats on mount
  useEffect(() => {
    loadStats()
  }, [loadStats])

  // Listen for storage changes (when user switches tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && (e.key.includes('Score') || e.key.includes('Time'))) {
        loadStats()
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadStats()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [loadStats])

  return {
    gameStats,
    refreshStats,
    // Individual game scores for easy access
    quickHeartsScore: gameStats.quickHearts,
    memoryMatchScore: gameStats.memoryMatch,
    heartsDistanceScore: gameStats.heartsDistance,
    heartsDistanceTime: gameStats.heartsDistanceTime
  }
}
// Made By Krishna Patil
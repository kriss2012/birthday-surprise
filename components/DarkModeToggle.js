'use client'
import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode, isLoading } = useDarkMode()

  if (isLoading) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className={`w-12 h-12 ${isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/20'} backdrop-blur-sm rounded-full shadow-lg animate-pulse`}></div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 left-4 z-50 group"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`relative w-12 h-12 ${isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/20'} backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 flex items-center justify-center`}>
        {/* Light mode icon */}
        <Sun
          size={20}
          className={`absolute text-yellow-500 transition-all duration-500 ${isDarkMode
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
            }`}
        />

        {/* Dark mode icon */}
        <Moon
          size={20}
          className={`absolute text-blue-400 transition-all duration-500 ${isDarkMode
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
            }`}
        />

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </button>
  )
}
// Made By Krishna Patil
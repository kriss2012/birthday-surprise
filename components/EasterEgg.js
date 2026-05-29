'use client'
import React, { useState, useEffect, useCallback, memo } from 'react'
import { Heart, Gift, Sparkles, Star, Crown, Gem, X } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

const EasterEgg = memo(function EasterEgg({ 
  id, 
  position = 'fixed', 
  top, 
  left, 
  right, 
  bottom,
  icon: IconComponent = Gift,
  message = "You found a hidden surprise! 💕",
  specialMessage = "",
  size = 'small'
}) {
  const { isDarkMode } = useDarkMode()
  const [isFound, setIsFound] = useState(false)
  
  // Check localStorage after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsFound(localStorage.getItem(`easter-egg-${id}`) === 'true')
    }
  }, [id])
  const [showMessage, setShowMessage] = useState(false)

  const handleClick = useCallback(() => {
    if (!isFound) {
      setIsFound(true)
      setShowMessage(true)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(`easter-egg-${id}`, 'true')
      }
      
      // Track discoveries and dispatch event for DiscoveryTracker
      if (typeof window !== 'undefined') {
        const currentDiscoveries = JSON.parse(localStorage.getItem('easter-eggs-found') || '[]')
        if (!currentDiscoveries.includes(id)) {
          currentDiscoveries.push(id)
          localStorage.setItem('easter-eggs-found', JSON.stringify(currentDiscoveries))
          
          // Dispatch custom event for efficient tracking
          window.dispatchEvent(new CustomEvent('easterEggFound', { detail: id }))
        }
      }

      // Auto-hide message after 4 seconds
      setTimeout(() => setShowMessage(false), 4000)
    }
  }, [isFound, id])

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16'
  }

  const positionStyle = {
    position,
    top,
    left,
    right, 
    bottom,
    zIndex: 100
  }

  if (isFound && !showMessage) {
    return null // Hide after discovery unless showing message
  }

  return (
    <>
      <div
        className={`${sizeClasses[size]} cursor-pointer transition-all duration-300 ${
          isFound 
            ? 'opacity-100 animate-bounce text-yellow-400' 
            : 'opacity-50 hover:opacity-80 text-purple-400 hover:text-purple-600'
        }`}
        style={positionStyle}
        onClick={handleClick}
        title={isFound ? "Already discovered!" : "Something's here... 👀"}
      >
        <IconComponent 
          size="100%" 
          className={`${
            isFound 
              ? 'animate-pulse' 
              : 'hover:scale-110 transition-transform animate-wink drop-shadow-sm'
          }`}
          fill={isFound ? "currentColor" : "currentColor"}
        />
      </div>

      {/* Discovery message */}
      {showMessage && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className={`${isDarkMode ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md mx-4 text-center animate-scale-in pointer-events-auto relative`}>
            {/* Close button */}
            <button
              onClick={() => setShowMessage(false)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <IconComponent size={32} className="text-white" fill="currentColor" />
              </div>
            </div>
            
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>Easter Egg Found!</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{message}</p>
            
            {specialMessage && (
              <div className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-purple-100 to-pink-100'} rounded-2xl p-4 mb-4`}>
                <p className={`${isDarkMode ? 'text-purple-300' : 'text-purple-800'} font-medium italic`}>{specialMessage}</p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={() => setShowMessage(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transform transition-all hover:-translate-y-1"
              >
                Continue Exploring! ✨
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes wink {
          0%, 90% { opacity: 1; transform: scale(1); }
          95% { opacity: 0.3; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-wink {
          animation: wink 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
})

export default EasterEgg
'use client'
import React, { useState, useEffect, useCallback, memo } from 'react'
import { Search, Trophy, Lock, RotateCcw, X } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'
import ConfirmationModal from './ConfirmationModal'

const TOTAL_EASTER_EGGS = 8

const DiscoveryTracker = memo(function DiscoveryTracker() {
  const { isDarkMode } = useDarkMode()
  const [discoveries, setDiscoveries] = useState([])
  const [showTracker, setShowTracker] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  useEffect(() => {
    const loadDiscoveries = () => {
      const found = JSON.parse(localStorage.getItem('easter-eggs-found') || '[]')
      setDiscoveries(found)
    }

    loadDiscoveries()

    const handleStorageChange = (e) => {
      if (e.key === 'easter-eggs-found') {
        loadDiscoveries()
      }
    }

    const handleEasterEggFound = () => {
      loadDiscoveries()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('easterEggFound', handleEasterEggFound)

    let interval
    if (showTracker) {
      interval = setInterval(loadDiscoveries, 5000)
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('easterEggFound', handleEasterEggFound)
      if (interval) clearInterval(interval)
    }
  }, [showTracker])

  const progress = Math.round((discoveries.length / TOTAL_EASTER_EGGS) * 100)
  
  const toggleTracker = useCallback(() => {
    setShowTracker(prev => !prev)
  }, [])

  const closeTracker = useCallback(() => {
    setShowTracker(false)
  }, [])

  const handleResetEasterEggs = useCallback(() => {
    setShowResetModal(true)
  }, [])

  const confirmReset = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Clear all easter egg discoveries
      const eggIds = ['egg-1', 'egg-2', 'egg-3', 'egg-4', 'egg-5', 'egg-6', 'egg-7', 'egg-8']
      eggIds.forEach(id => {
        localStorage.removeItem(`easter-egg-${id}`)
      })
      localStorage.removeItem('easter-eggs-found')
      
      // Update state immediately
      setDiscoveries([])
      
      // Reload page to reflect changes
      window.location.reload()
    }
  }, [])

  const imageUrls = [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=4',
    'https://picsum.photos/200/200?random=5',
    'https://picsum.photos/200/200?random=6',
    'https://picsum.photos/200/200?random=7',
    'https://picsum.photos/200/200?random=8',
  ]

  const tooltips = [
    'Beautiful sunset moment!',
    'Sweet embrace captured!',
    'Cheers to good times!',
    'Adventure day memories!',
    'Fun times together!',
    'Celebrating special moments!',
    'Cooking together memories!',
    'Candid happy moments!',
  ]

  return (
    <>
      {/* Floating discovery button */}
      <div 
        className="fixed bottom-6 right-6 z-40 cursor-pointer"
        onClick={toggleTracker}
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform transition-all hover:scale-110">
            <Search className="text-white" size={24} />
          </div>
          
          {discoveries.length > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-800 animate-bounce">
              {discoveries.length}
            </div>
          )}

          {/* Progress ring */}
          <svg className="absolute inset-0 w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-300"
              strokeDasharray="100, 100"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeWidth="2"
              fill="transparent"
              stroke="currentColor"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-yellow-400"
              strokeDasharray={`${progress}, 100`}
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeWidth="2"
              fill="transparent"
              stroke="currentColor"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>

      {/* Discovery tracker modal */}
      {showTracker && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeTracker}
        >
          <div 
            className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeTracker}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
              aria-label="Close easter egg tracker"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Search className="text-purple-500 w-12 h-12" />
              </div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>Easter Egg Hunt</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Find hidden surprises throughout the site!</p>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Progress</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{discoveries.length}/{TOTAL_EASTER_EGGS}</span>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3`}>
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{progress}% complete</p>
            </div>

            {/* Found eggs */}
            <div className="mb-6">
              <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-3`}>Discoveries ({discoveries.length})</h3>
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: TOTAL_EASTER_EGGS }, (_, i) => {
                  const eggId = `egg-${i + 1}`
                  const isFound = discoveries.includes(eggId)

                  return (
                    <div 
                      key={eggId}
                      className={`relative group aspect-square rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      {isFound ? (
                        <div className="absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center">
                          <img
                            src={imageUrls[i]}
                            alt={tooltips[i]}
                            title={tooltips[i]}
                            className="w-full h-full object-cover fade-in"
                            onLoad={(e) => e.currentTarget.classList.add('loaded')}
                          />
                        </div>
                      ) : (
                        <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          <Lock className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* All found message */}
            {discoveries.length === TOTAL_EASTER_EGGS && (
              <div className={`${isDarkMode ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30' : 'bg-gradient-to-r from-yellow-100 to-orange-100'} rounded-2xl p-4 mb-4 text-center`}>
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className={`font-bold ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>Congratulations! 🎉</p>
                <p className={`${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'} text-sm`}>You found all the hidden surprises!</p>
              </div>
            )}

            {/* Hints */}
            <div className="text-center mb-4">
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                💡 Tip: Explore each section closely to catch those subtle blinking icons!
              </p>
            </div>

            {/* Reset button */}
            {discoveries.length > 0 && (
              <div className="text-center">
                <button
                  onClick={handleResetEasterEggs}
                  className={`inline-flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-red-900/20 hover:bg-red-900/30 border-red-800 text-red-400' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600'} rounded-xl transition-colors text-sm`}
                >
                  <RotateCcw size={16} />
                  Reset Discoveries
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        /* Fade-in animation for images */
        .fade-in {
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
        }
        .fade-in.loaded {
          opacity: 1;
        }
      `}</style>
      
      {/* Custom confirmation modal */}
      <ConfirmationModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={confirmReset}
        title="Reset Easter Egg Discoveries"
        message="Are you sure you want to reset all Easter Egg discoveries? This will clear all progress and cannot be undone."
        confirmText="Reset All"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  )
})

export default DiscoveryTracker

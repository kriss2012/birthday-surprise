'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Gamepad2, Heart, Zap, Brain, Trophy, Star, Play, RotateCcw, Crown, Gift, Sparkles, X } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth'
import { useGameStats } from '../../../hooks/useGameStats'
import GameCard from '../../../components/GameCard'
import EasterEgg from '../../../components/EasterEgg'
import { useDarkMode } from '../../../hooks/useDarkMode'


export default function GamesPage() {
  const router = useRouter()
  const [activeGame, setActiveGame] = useState(null)
  
  const { isAuthenticated } = useAuth()
  const { gameStats, refreshStats } = useGameStats()
  const { isDarkMode } = useDarkMode()

  const handleGameSelect = useCallback((gameId) => {
    setActiveGame(gameId)
  }, [])

  const handleBackToGames = useCallback(() => {
    setActiveGame(null)
    refreshStats()
  }, [refreshStats])

  useEffect(() => {
    if (!isAuthenticated) router.replace('/')
  }, [isAuthenticated, router])

  const games = [
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Match pairs of our special moments',
      icon: Brain,
      gradient: 'from-purple-400 to-indigo-600',
      component: 'MemoryMatch'
    },
    {
      id: 'hearts-distance',
      title: 'Hearts Across Distance',
      description: '3D adventure with a special surprise!',
      icon: Heart,
      gradient: 'from-pink-400 to-rose-600', 
      component: 'HeartsDistance'
    },
    {
      id: 'reflex-game',
      title: 'Quick Hearts',
      description: 'Catch the floating hearts!',
      icon: Zap,
      gradient: 'from-yellow-400 to-orange-600',
      component: 'ReflexGame'
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'} overflow-hidden relative`}>
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-pink-300 opacity-70">
            <Heart size={15} fill="currentColor" className="animate-gentle-float" />
          </div>
          <div className="absolute top-20 right-16 text-purple-400 opacity-60">
            <Gamepad2 size={18} className="animate-gentle-float-alt" />
          </div>
          <div className="absolute bottom-32 left-16 text-yellow-400 opacity-50">
            <Star size={14} fill="currentColor" className="animate-gentle-pulse" />
          </div>
          <div className="absolute top-1/3 left-1/4 text-blue-300 opacity-40">
            <Trophy size={16} className="animate-gentle-spin" />
          </div>
          <div className="absolute bottom-40 right-20 text-pink-400 opacity-60">
            <Zap size={12} className="animate-gentle-bounce" />
          </div>
          <div className="absolute top-1/2 right-1/3 text-purple-300 opacity-50">
            <Brain size={20} className="animate-gentle-float-slow" />
          </div>
        </div>

        <div className="text-center z-10">
          {/* Main loading animation */}
          <div className="relative mb-8">
            {/* Outer rotating ring */}
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
              
              {/* Inner pulsing circle */}
              <div className="absolute inset-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-gentle-pulse flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-white animate-gentle-float" />
              </div>
              
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-gentle-spin">
                <div className="absolute -top-2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full transform -translate-x-1/2 animate-gentle-pulse"></div>
                <div className="absolute -right-2 top-1/2 w-3 h-3 bg-pink-400 rounded-full transform -translate-y-1/2 animate-gentle-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-blue-400 rounded-full transform -translate-x-1/2 animate-gentle-pulse" style={{ animationDelay: '0.7s' }}></div>
                <div className="absolute -left-2 top-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-y-1/2 animate-gentle-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>

          {/* Loading text with typewriter effect */}
          <div className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gentle-glow">
              Loading Games
            </span>
          </div>
          <div className="text-purple-600 animate-gentle-pulse mb-6">
            Preparing your fun experience...
          </div>

          {/* Progress indicator */}
          <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg mb-6 max-w-sm mx-auto`}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-gentle-pulse"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading Fun Games</span>
            </div>
            <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mb-2`}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-games-progress"></div>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get ready for some amazing games!</p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-gentle-pulse"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-gentle-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-gentle-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-gentle-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes gentle-float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.7;
            }
            50% { 
              transform: translateY(-12px) rotate(3deg); 
              opacity: 1;
            }
          }
          
          @keyframes gentle-float-alt {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.6;
            }
            33% {
              transform: translateY(-8px) rotate(-2deg);
              opacity: 0.9;
            }
            66% {
              transform: translateY(-4px) rotate(1deg);
              opacity: 0.8;
            }
          }
          
          @keyframes gentle-float-slow {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
              opacity: 0.5;
            }
            50% { 
              transform: translateY(-15px) translateX(5px) rotate(2deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes gentle-bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          
          @keyframes gentle-pulse {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(1); 
            }
            50% { 
              opacity: 0.7; 
              transform: scale(1.05); 
            }
          }
          
          @keyframes gentle-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-gentle-float { 
            animation: gentle-float 4s ease-in-out infinite; 
            will-change: transform, opacity;
          }
          .animate-gentle-float-alt { 
            animation: gentle-float-alt 5s ease-in-out infinite; 
            will-change: transform, opacity;
          }
          .animate-gentle-float-slow { 
            animation: gentle-float-slow 6s ease-in-out infinite; 
            will-change: transform, opacity;
          }
          .animate-gentle-bounce { 
            animation: gentle-bounce 2.5s ease-in-out infinite; 
            will-change: transform;
          }
          .animate-gentle-pulse { 
            animation: gentle-pulse 3s ease-in-out infinite; 
            will-change: transform, opacity;
          }
          .animate-gentle-spin { 
            animation: gentle-spin 12s linear infinite; 
            will-change: transform;
          }
          
          @keyframes games-progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          .animate-games-progress {
            animation: games-progress 1.5s ease-out;
          }
        `}</style>
      </div>
    )
  }

  if (activeGame) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
        <div className="container center-content mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={handleBackToGames}
              className={`inline-flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-800/50' : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'} transition-colors px-4 py-3 rounded-xl font-medium`}
            >
              <ArrowLeft size={20} className="mr-3" />
              Back to Games
            </button>
            <Link 
              href="/birthday"
              className={`inline-flex items-center ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'} transition-colors px-4 py-3 rounded-xl`}
            >
              Birthday Hub
            </Link>
          </div>
          
          {/* Game content will be rendered here */}
          <div className="w-full max-w-6xl mx-auto min-h-[70vh]">
            {activeGame === 'memory-match' && <MemoryMatchGame />}
            {activeGame === 'hearts-distance' && <HeartsDistanceGame />}
            {activeGame === 'reflex-game' && <ReflexGame />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-300 opacity-60 animate-gentle-float-slow">
          <Gamepad2 size={25} />
        </div>
        <div className="absolute top-1/3 right-20 text-purple-400 opacity-50">
          <Heart size={20} className="animate-gentle-spin" fill="currentColor" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-blue-300 opacity-60">
          <Star size={22} className="animate-gentle-pulse" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 right-1/4 text-yellow-400 opacity-40">
          <Trophy size={18} className="animate-gentle-bounce" />
        </div>
      </div>

      <div className="center-content container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/birthday" 
            className={`inline-flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-800/50' : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'} transition-colors px-4 py-3 rounded-xl font-medium mb-8`}
          >
            <ArrowLeft size={20} className="mr-3" />
            Back to Birthday Hub
          </Link>
          
          <div className="inline-flex items-center justify-center mb-6">
            <Gamepad2 className="text-purple-500 w-12 h-12 mr-3" />
            <Heart className="text-yellow-500 w-8 h-8" fill="currentColor" />
            <Star className="text-yellow-400 w-10 h-10 ml-3" fill="currentColor" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Fun & Games
            </span>
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Quick games to make your birthday extra special! 🎮
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              index={index}
              onGameSelect={handleGameSelect}
              gameStats={gameStats}
            />
          ))}
        </div>

        {/* Game Statistics */}
        {(gameStats.quickHearts > 0 || gameStats.memoryMatch > 0 || gameStats.heartsDistance > 0 || gameStats.heartsDistanceTime > 0) && (
          <div className={`text-center mt-12 mb-8 ${isDarkMode ? 'bg-gray-800/95 border-gray-700/20' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant p-6 max-w-4xl mx-auto`}>
            <Trophy className="text-yellow-500 mx-auto mb-4 w-8 h-8" />
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Your Best Scores 🏆</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {gameStats.quickHearts > 0 && (
                <div className={`${isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} rounded-xl p-4`}>
                  <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <div className={`font-bold ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>Quick Hearts</div>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{gameStats.quickHearts}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>points</div>
                </div>
              )}
              {gameStats.memoryMatch > 0 && (
                <div className={`${isDarkMode ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200'} rounded-xl p-4`}>
                  <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className={`font-bold ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>Memory Match</div>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{gameStats.memoryMatch}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>moves</div>
                </div>
              )}
              {(gameStats.heartsDistance > 0 || gameStats.heartsDistanceTime > 0) && (
                <div className={`${isDarkMode ? 'bg-pink-900/30 border-pink-700' : 'bg-pink-50 border-pink-200'} rounded-xl p-4`}>
                  <Heart className="w-6 h-6 text-pink-600 mx-auto mb-2" fill="currentColor" />
                  <div className={`font-bold ${isDarkMode ? 'text-pink-200' : 'text-pink-800'}`}>Hearts Distance</div>
                  {gameStats.heartsDistanceTime > 0 ? (
                    <>
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>⏱️ {gameStats.heartsDistanceTime}s</div>
                      <div className={`text-xs ${isDarkMode ? 'text-pink-300' : 'text-pink-700'}`}>to collect 30 hearts</div>
                    </>
                  ) : (
                    <>
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>{gameStats.heartsDistance}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-pink-300' : 'text-pink-700'}`}>hearts</div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-8 ${isDarkMode ? 'bg-gray-800/95 border-gray-700/20' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant p-6 max-w-2xl mx-auto`}>
          <Heart className="text-yellow-500 mx-auto mb-3 w-8 h-8" fill="currentColor" />
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
            Made with love for the most amazing person in my world
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            Every game is a new way to celebrate you! 🎉
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gentle-glow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
            filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.3));
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
            filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.5));
          }
        }
        
        .animate-fade-in { 
          animation: fade-in 0.6s ease-out; 
        }
        .animate-gentle-glow { 
          animation: gentle-glow 3s ease-in-out infinite; 
          will-change: transform, opacity, filter;
        }
      `}</style>
    </div>
  )
}

// Mini-game components will be implemented here
function MemoryMatchGame() {
  const { isDarkMode } = useDarkMode()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [bestScore, setBestScore] = useState(null)

  // Love-themed icons for cards
  const cardIcons = [
    { icon: Heart, color: 'text-pink-500' },
    { icon: Star, color: 'text-yellow-500' },
    { icon: Crown, color: 'text-purple-500' },
    { icon: Trophy, color: 'text-orange-500' },
    { icon: Gift, color: 'text-blue-500' },
    { icon: Sparkles, color: 'text-green-500' }
  ]

  // Load best score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('memoryMatch_bestScore')
      if (saved) setBestScore(parseInt(saved))
    }
  }, [])

  const initializeGame = () => {
    // Create pairs of cards
    const pairs = cardIcons.flatMap((iconData, index) => [
      { id: index * 2, iconData, pairId: index },
      { id: index * 2 + 1, iconData, pairId: index }
    ])
    
    // Shuffle cards
    const shuffled = pairs.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameWon(false)
    setGameStarted(true)
  }

  const handleCardClick = (cardId) => {
    if (flippedCards.includes(cardId) || matchedCards.includes(cardId) || flippedCards.length === 2) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [first, second] = newFlippedCards
      const firstCard = cards.find(card => card.id === first)
      const secondCard = cards.find(card => card.id === second)

      if (firstCard.pairId === secondCard.pairId) {
        // Match found!
        setTimeout(() => {
          setMatchedCards(prev => {
            const newMatched = [...prev, first, second]
            
            // Check if game is won with the new matched count
            if (newMatched.length === cards.length) {
              setTimeout(() => {
                setGameWon(true)
                // Save best score
                if (!bestScore || moves + 1 < bestScore) {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('memoryMatch_bestScore', (moves + 1).toString())
                    setBestScore(moves + 1)
                  }
                }
              }, 500)
            }
            
            return newMatched
          })
          setFlippedCards([])
        }, 1000)
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedCards([])
        }, 1500)
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCards([])
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameWon(false)
  }

  if (!gameStarted) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-gentle-glow" />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Memory Match</h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Match pairs of love-themed cards! Test your memory skills! 💕</p>
        
        <div className={`${isDarkMode ? 'bg-pink-900/30' : 'bg-pink-50'} rounded-2xl p-4 mb-6`}>
          <h3 className={`font-bold ${isDarkMode ? 'text-pink-200' : 'text-pink-800'} mb-2`}>How to Play:</h3>
          <div className={`text-sm ${isDarkMode ? 'text-pink-300' : 'text-pink-700'} space-y-1`}>
            <p>• Click cards to flip them over</p>
            <p>• Find matching pairs of identical cards</p>
            <p>• Match all pairs with the fewest moves!</p>
            <p>• Cards stay flipped for 1 second if they match</p>
          </div>
        </div>

        {bestScore && (
          <div className={`mb-4 p-3 ${isDarkMode ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200'} rounded-xl`}>
            <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-800'} font-semibold`}>🏆 Best Score: {bestScore} {bestScore === 1 ? 'move' : 'moves'}</p>
          </div>
        )}
        
        <button
          onClick={initializeGame}
          className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 text-lg"
        >
          <Play className="inline w-6 h-6 mr-2" />
          Start Game
        </button>
      </div>
    )
  }

  if (gameWon) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-gentle-glow" />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Congratulations!</h2>
        <div className={`text-3xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-2`}>{moves} Moves</div>
        
        {moves === bestScore && (
          <div className={`${isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} rounded-xl p-4 mb-4`}>
            <p className={`${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'} font-bold`}>🎉 New Best Score!</p>
          </div>
        )}

        {/* Victory Video - Memory Match */}
        <div className="flex justify-center mb-4">
          <div className="bg-black rounded-xl overflow-hidden shadow-lg max-w-sm w-full">
            <video 
              controls 
              className="w-full h-full rounded-xl"
              style={{ aspectRatio: '16/9' }}
              preload="metadata"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Fallback placeholder when video fails */}
            <div className="aspect-video items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white hidden">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-semibold mb-1">🎉 Victory Video</p>
                <p className="text-xs text-gray-300">Video temporarily unavailable</p>
              </div>
            </div>
          </div>
        </div>

        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          {moves <= 8 ? "Perfect memory! You're amazing! 🧠💕" :
           moves <= 12 ? "Great job, my smart cookie! 🌟" :
           moves <= 16 ? "Well done! Your memory is impressive! 💖" :
           "Good effort! Practice makes perfect! 😊"}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={initializeGame}
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <Play className="inline w-5 h-5 mr-2" />
            Play Again
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <ArrowLeft className="inline w-5 h-5 mr-2" />
            Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden`}>
      {/* Game Header */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Moves: {moves}</div>
          <div className="text-sm">Matches: {matchedCards.length / 2} / {cardIcons.length}</div>
        </div>
        {bestScore && (
          <div className="text-center text-sm opacity-90 mt-1">Best: {bestScore} moves</div>
        )}
      </div>

      {/* Game Board */}
      <div className="p-6 flex justify-center">
        <div className="grid grid-cols-4 gap-3 w-fit">
          {cards.map(card => {
            const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id)
            const isMatched = matchedCards.includes(card.id)
            const IconComponent = card.iconData.icon
            
            return (
              <div
                key={card.id}
                className={`relative w-16 h-16 cursor-pointer transform transition-all duration-300 ${
                  isMatched ? 'scale-105' : 'hover:scale-105'
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className={`absolute inset-0 rounded-xl shadow-lg transition-all duration-500 transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}>
                  {/* Card Back */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center ${
                    isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}>
                    <Heart className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  
                  {/* Card Front */}
                  <div className={`absolute inset-0 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border-2 ${
                    isMatched ? (isDarkMode ? 'border-yellow-600 bg-yellow-800/30' : 'border-yellow-300 bg-yellow-50') : (isDarkMode ? 'border-gray-600' : 'border-gray-200')
                  } flex items-center justify-center transform rotate-y-180 ${
                    isFlipped ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <IconComponent 
                      className={`w-8 h-8 ${card.iconData.color} ${isMatched ? 'animate-gentle-glow' : ''}`} 
                      fill="currentColor" 
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center pb-6 py-4">
        <div className={`${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'} rounded-xl px-4 py-4 inline-block`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
            Find all matching pairs! Click cards to flip them over 💕
          </p>
        </div>
      </div>

      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}

function HeartsDistanceGame() {
  const { isDarkMode } = useDarkMode()
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 })
  const [hearts, setHearts] = useState([])
  const [collectedHearts, setCollectedHearts] = useState([])
  const [obstacles, setObstacles] = useState([])
  const [monster, setMonster] = useState({ x: 10, y: 10 })
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [completionTime, setCompletionTime] = useState(0)
  const [bestTime, setBestTime] = useState(0)
  const gameAreaRef = useRef(null)
  const keysPressed = useRef({})
  const playerPositionRef = useRef({ x: 50, y: 50 })
  const monsterRef = useRef({ x: 10, y: 10 })
  const animationFrameRef = useRef(null)

  // Load high score and best time
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('heartsDistance_highScore')
      if (saved) setHighScore(parseInt(saved))
      
      const savedTime = localStorage.getItem('heartsDistance_bestTime')
      if (savedTime) setBestTime(parseInt(savedTime))
    }
  }, [])

  // Generate hearts and obstacles
  const generateGameElements = useCallback(() => {
    // Generate 30 hearts
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      collected: false,
      pulse: Math.random() * Math.PI * 2
    }))

    // Generate 8 obstacles (more for 30 hearts)
    const newObstacles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 70 + 15,
      y: Math.random() * 70 + 15,
      width: 8,
      height: 8,
      rotation: Math.random() * 360
    }))

    setHearts(newHearts)
    setObstacles(newObstacles)
  }, [])

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Pause/Resume with spacebar or Escape
      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault()
        if (gameStarted && !gameWon && !gameOver) {
          setGamePaused(prev => !prev)
        }
        return
      }
      if (!gameStarted || gamePaused) return
      
      keysPressed.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e) => {
      if (!gameStarted || gamePaused) return
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameStarted, gameWon, gameOver, gamePaused])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameWon || gameOver || gamePaused) return

    const gameLoop = () => {
      // Smooth movement using current ref values
      let newX = playerPositionRef.current.x
      let newY = playerPositionRef.current.y
      const speed = 0.8

      // Check multiple keys for diagonal movement
      if (keysPressed.current['w'] || keysPressed.current['arrowup']) {
        newY = Math.max(2, newY - speed)
      }
      if (keysPressed.current['s'] || keysPressed.current['arrowdown']) {
        newY = Math.min(96, newY + speed)
      }
      if (keysPressed.current['a'] || keysPressed.current['arrowleft']) {
        newX = Math.max(2, newX - speed)
      }
      if (keysPressed.current['d'] || keysPressed.current['arrowright']) {
        newX = Math.min(96, newX + speed)
      }

      // Check obstacle collisions
      let hitObstacle = false
      obstacles.forEach(obstacle => {
        const distanceSquared = Math.pow(newX - obstacle.x, 2) + Math.pow(newY - obstacle.y, 2)
        if (distanceSquared < 36) { // 6^2 = 36
          hitObstacle = true
        }
      })

      // Update player position
      if (!hitObstacle) {
        const newPosition = { x: newX, y: newY }
        playerPositionRef.current = newPosition
        setPlayerPosition(newPosition)
      }
      
      // Move monster towards player
      const deltaX = playerPositionRef.current.x - monsterRef.current.x
      const deltaY = playerPositionRef.current.y - monsterRef.current.y
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      if (distance > 0) {
        const monsterSpeed = 0.4
        const moveX = (deltaX / distance) * monsterSpeed
        const moveY = (deltaY / distance) * monsterSpeed
        
        const newMonsterPos = {
          x: Math.max(2, Math.min(96, monsterRef.current.x + moveX)),
          y: Math.max(2, Math.min(96, monsterRef.current.y + moveY))
        }
        monsterRef.current = newMonsterPos
        setMonster(newMonsterPos)
      }

      // Check heart collisions with magnetic attraction
      setHearts(prevHearts => {
        let newCollectedHearts = []
        let scoreIncrease = 0
        const processedHeartIds = new Set() // Track hearts processed in this frame
        
        const updatedHearts = prevHearts.map(heart => {
          let updatedHeart = { ...heart, pulse: heart.pulse + 0.1 }
          
          // Skip if heart is already collected or already processed this frame
          if (!heart.collected && !processedHeartIds.has(heart.id)) {
            const distanceSquared = Math.pow(newX - heart.x, 2) + Math.pow(newY - heart.y, 2)
            const distance = Math.sqrt(distanceSquared)
            
            // Magnetic attraction when player is within range
            const magneticRange = 8 // Range where hearts get attracted (reduced for better control)
            const collectionRange = 2.5 // Range where hearts get collected (much smaller for precise collection)
            
            if (distance <= magneticRange && distance > collectionRange) {
              // Calculate magnetic pull towards player with acceleration effect
              const pullStrength = Math.max(1.2, 2.5 - (distance / magneticRange * 1.5)) // Stronger pull when closer
              const deltaX = newX - heart.x
              const deltaY = newY - heart.y
              
              // Move heart towards player with some momentum
              const moveX = (deltaX / distance) * pullStrength
              const moveY = (deltaY / distance) * pullStrength
              
              updatedHeart = {
                ...updatedHeart,
                x: Math.max(2, Math.min(96, heart.x + moveX)),
                y: Math.max(2, Math.min(96, heart.y + moveY)),
                // Add magnetic state for visual effects
                isBeingAttracted: true,
                attractionStrength: Math.min(1, (magneticRange - distance) / magneticRange)
              }
            } else if (distance <= collectionRange && !heart.collected) {
              // Collect the heart when very close to center - only if not already collected
              processedHeartIds.add(heart.id) // Mark as processed
              newCollectedHearts.push(heart.id)
              scoreIncrease += 1 // 1 point per heart
              return { ...updatedHeart, collected: true }
            } else {
              // Clear magnetic state when not in range
              updatedHeart = {
                ...updatedHeart,
                isBeingAttracted: false,
                attractionStrength: 0
              }
            }
          }
          return updatedHeart
        })

        if (newCollectedHearts.length > 0) {
          setCollectedHearts(prev => [...prev, ...newCollectedHearts])
          setScore(prev => prev + scoreIncrease)
        }

        return updatedHearts
      })
    }

    let animationFrameId
    let lastFrameTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const rafGameLoop = (currentTime) => {
      // Frame rate limiting to 60 FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(rafGameLoop)
        return
      }
      lastFrameTime = currentTime

      gameLoop()
      animationFrameId = requestAnimationFrame(rafGameLoop)
    }

    animationFrameId = requestAnimationFrame(rafGameLoop)
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [gameStarted, gameOver, gameWon, gamePaused, obstacles])

  // Timer
  useEffect(() => {
    if (!gameStarted || gameOver || gamePaused) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameStarted(false)
          setGameOver(true)
          // Save high score
          if (collectedHearts.length > highScore && typeof window !== 'undefined') {
            localStorage.setItem('heartsDistance_highScore', collectedHearts.length.toString())
            setHighScore(collectedHearts.length)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver, gamePaused, collectedHearts.length, highScore])

  // Monster collision detection
  useEffect(() => {
    if (!gameStarted || gameWon || gameOver || gamePaused) return

    const checkCollision = () => {
      const collisionDistanceSquared = 
        Math.pow(playerPositionRef.current.x - monsterRef.current.x, 2) + 
        Math.pow(playerPositionRef.current.y - monsterRef.current.y, 2)
      
      if (collisionDistanceSquared < 9) { // 3^2 = 9
        setGameOver(true)
        setGameStarted(false)
      }
    }

    const collisionTimer = setInterval(checkCollision, 50)
    return () => clearInterval(collisionTimer)
  }, [gameStarted, gameWon, gameOver, gamePaused])

  // Check victory - need to collect all 30 hearts
  useEffect(() => {
    if (collectedHearts.length >= 30) {
      setGameStarted(false)
      setGameWon(true)
      
      // Calculate completion time (60 - timeLeft)
      const finalCompletionTime = 60 - timeLeft
      setCompletionTime(finalCompletionTime)
      
      setTimeout(() => setShowVictoryModal(true), 1000)
      
      // Save completion time if it's a new best time (faster = better)
      if (typeof window !== 'undefined') {
        localStorage.setItem('heartsDistance_highScore', collectedHearts.length.toString())
        setHighScore(collectedHearts.length)
        
        // Save best time (lower is better, or first completion)
        if (finalCompletionTime < bestTime || bestTime === 0) {
          localStorage.setItem('heartsDistance_bestTime', finalCompletionTime.toString())
          setBestTime(finalCompletionTime)
        }
      }
    }
  }, [collectedHearts.length, timeLeft, bestTime])

  const startGame = () => {
    // Reset all game state
    setGameStarted(false) // Set to false first to stop any running game loops
    setGameOver(false)
    setGameWon(false)
    setGamePaused(false)
    setCollectedHearts([])
    setScore(0)
    setTimeLeft(60)
    setCompletionTime(0)
    setShowVictoryModal(false)
    
    // Reset positions
    const playerPos = { x: 50, y: 50 }
    const monsterPos = { x: 10, y: 10 }
    setPlayerPosition(playerPos)
    setMonster(monsterPos)
    playerPositionRef.current = playerPos
    monsterRef.current = monsterPos
    
    // Clear any existing key states
    keysPressed.current = {}
    
    // Generate new game elements
    generateGameElements()
    
    // Start the game after all state is reset
    setTimeout(() => setGameStarted(true), 100)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setGameWon(false)
    setGamePaused(false)
    setShowVictoryModal(false)
    setPlayerPosition({ x: 50, y: 50 })
    setMonster({ x: 10, y: 10 })
    setHearts([])
    setCollectedHearts([])
    setObstacles([])
    setScore(0)
    setTimeLeft(60)
    setCompletionTime(0)
    playerPositionRef.current = { x: 50, y: 50 }
    monsterRef.current = { x: 10, y: 10 }
    
    // Clear key states
    keysPressed.current = {}
  }

  if (!gameStarted && !gameOver && !gameWon) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        <Heart className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-gentle-glow" fill="currentColor" />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Hearts Across Distance</h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Navigate through space and collect all the hearts! A 3D adventure of love! 💕</p>
        
        <div className={`${isDarkMode ? 'bg-pink-900/30' : 'bg-pink-50'} rounded-2xl p-4 mb-6`}>
          <h3 className={`font-bold ${isDarkMode ? 'text-pink-200' : 'text-pink-800'} mb-2`}>How to Play:</h3>
          <div className={`text-sm ${isDarkMode ? 'text-pink-300' : 'text-pink-700'} space-y-1`}>
            <p>• Use WASD or Arrow keys to move</p>
            <p>• Hearts are magnetically attracted to you! 🧲✨</p>
            <p>• Collect all 30 hearts floating in space</p>
            <p>• Press Space or Escape to pause/resume</p>
            <p>• Complete within 60 seconds for the best score!</p>
            <p>• A special surprise awaits when you win! ✨</p>
          </div>
        </div>

        {highScore > 0 && (
          <div className={`mb-4 p-3 ${isDarkMode ? 'bg-pink-900/30 border-pink-700' : 'bg-pink-50 border-pink-200'} rounded-xl`}>
            <p className={`${isDarkMode ? 'text-pink-200' : 'text-pink-800'} font-semibold`}>🏆 Best Score: {highScore} {highScore === 1 ? 'heart' : 'hearts'}</p>
          </div>
        )}
        
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 text-lg"
        >
          <Play className="inline w-6 h-6 mr-2" />
          Start Adventure
        </button>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-gentle-glow" />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Time's Up!</h2>
        <div className={`text-3xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} mb-2`}>{collectedHearts.length} Hearts</div>
        
        {collectedHearts.length === highScore && collectedHearts.length > 0 && (
          <div className={`${isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} rounded-xl p-4 mb-4`}>
            <p className={`${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'} font-bold`}>🎉 New Best Score!</p>
          </div>
        )}

        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          {collectedHearts.length >= 30 ? "Perfect! All hearts collected! 💕" :
           collectedHearts.length >= 20 ? "Amazing! Most hearts collected! 🌟" :
           collectedHearts.length >= 10 ? "Good effort! Keep trying! 💖" :
           "Every heart counts! Try again! 😊"}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <Play className="inline w-5 h-5 mr-2" />
            Try Again
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <ArrowLeft className="inline w-5 h-5 mr-2" />
            Menu
          </button>
        </div>
      </div>
    )
  }

  if (gameWon) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        <div className="relative mb-6">
          <Heart className="w-16 h-16 text-pink-500 mx-auto animate-gentle-glow" fill="currentColor" />
          <div className="absolute inset-0 animate-gentle-pulse">
            <Heart className="w-16 h-16 text-pink-300 mx-auto opacity-20" fill="currentColor" />
          </div>
        </div>
        
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Victory! 🎉</h2>
        <div className={`text-3xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} mb-4`}>All Hearts Collected!</div>
        
        {/* Victory Video - Hearts Across Distance Main Victory */}
        <div className="flex justify-center mb-4">
          <div className="bg-black rounded-xl overflow-hidden shadow-lg max-w-sm w-full">
            <video 
              controls 
              className="w-full h-full rounded-xl"
              style={{ aspectRatio: '16/9' }}
              preload="metadata"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Fallback placeholder when video fails */}
            <div className="aspect-video items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white hidden">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-semibold mb-1">🎉 Victory Video</p>
                <p className="text-xs text-gray-300">Video temporarily unavailable</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
          <p className="text-purple-800 font-medium italic text-lg">
            "Just like in this game, no distance can keep our hearts apart. 
            Every challenge we face only makes our love stronger. 
            You completed this adventure, and together we'll complete our real-life adventure too! 💕"
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <Play className="inline w-5 h-5 mr-2" />
            Play Again
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <ArrowLeft className="inline w-5 h-5 mr-2" />
            Menu
          </button>
        </div>
      </div>
    )
  }

  if (gameStarted) {
    return (
      <>
        <div 
          ref={gameAreaRef}
          className="relative w-full aspect-square bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-3xl border-4 border-white/30 shadow-2xl overflow-hidden"
          style={{ height: '70vh', maxHeight: '500px' }}
        >
          {/* Player */}
          <div
            className="absolute w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg transition-all duration-100 ease-out z-20 animate-gentle-pulse"
            style={{
              left: `${playerPosition.x}%`,
              top: `${playerPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.8)'
            }}
          >
            {/* Magnetic field visualization - outer range */}
            <div 
              className="absolute animate-pulse opacity-20"
              style={{
                width: '64px', // 8 units magnetic range (8 * 8px per unit)
                height: '64px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
              }}
            >
              <div className="w-full h-full border-2 border-dashed border-yellow-400 rounded-full"></div>
            </div>
            
            {/* Magnetic field visualization - collection range */}
            <div 
              className="absolute animate-pulse opacity-30"
              style={{
                width: '20px', // 2.5 units collection range (2.5 * 8px per unit)
                height: '20px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                animationDelay: '0.5s'
              }}
            >
              <div className="w-full h-full border border-yellow-300 rounded-full bg-yellow-200/20"></div>
            </div>
            
            {/* Player initial */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-full animate-gentle-pulse"></div>
          </div>

          {/* Hearts */}
          {hearts.map(heart => {
            if (heart.collected) return null;
            
            const isBeingAttracted = heart.isBeingAttracted || false
            const attractionStrength = heart.attractionStrength || 0
            
            return (
              <div
                key={heart.id}
                className={`absolute z-10 transition-all duration-100 ${
                  isBeingAttracted ? 'animate-pulse' : ''
                }`}
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  transform: `translate(-50%, -50%) ${isBeingAttracted ? `scale(${1 + attractionStrength * 0.3})` : 'scale(1)'}`,
                }}
              >
                {/* Multiple magnetic effects */}
                {isBeingAttracted && (
                  <>
                    {/* Outer glow ring */}
                    <div 
                      className="absolute animate-ping"
                      style={{
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%',
                        opacity: attractionStrength * 0.8
                      }}
                    >
                      <div 
                        className="bg-yellow-400/40 rounded-full blur-md"
                        style={{
                          width: `${20 + attractionStrength * 15}px`,
                          height: `${20 + attractionStrength * 15}px`
                        }}
                      ></div>
                    </div>
                    
                    {/* Inner intense glow */}
                    <div 
                      className="absolute animate-pulse"
                      style={{
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%',
                        opacity: attractionStrength
                      }}
                    >
                      <div 
                        className="bg-yellow-300/60 rounded-full blur-sm"
                        style={{
                          width: `${12 + attractionStrength * 8}px`,
                          height: `${12 + attractionStrength * 8}px`
                        }}
                      ></div>
                    </div>
                    
                    {/* Sparkling particles effect */}
                    {attractionStrength > 0.5 && (
                      <>
                        <div 
                          className="absolute animate-bounce"
                          style={{
                            transform: 'translate(-50%, -50%)',
                            left: '30%',
                            top: '30%'
                          }}
                        >
                          <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        </div>
                        <div 
                          className="absolute animate-bounce"
                          style={{
                            transform: 'translate(-50%, -50%)',
                            left: '70%',
                            top: '70%',
                            animationDelay: '0.1s'
                          }}
                        >
                          <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        </div>
                        <div 
                          className="absolute animate-bounce"
                          style={{
                            transform: 'translate(-50%, -50%)',
                            left: '70%',
                            top: '30%',
                            animationDelay: '0.2s'
                          }}
                        >
                          <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        </div>
                      </>
                    )}
                  </>
                )}
                
                <Heart 
                  className={`text-yellow-500 drop-shadow-lg ${
                    isBeingAttracted ? 'animate-bounce' : 'animate-gentle-float'
                  }`}
                  size={24 + Math.sin(heart.pulse) * 4 + (isBeingAttracted ? attractionStrength * 6 : 0)}
                  fill="currentColor"
                  style={{
                    filter: isBeingAttracted 
                      ? `drop-shadow(0 0 ${15 + attractionStrength * 10}px rgba(234, 179, 8, ${0.7 + attractionStrength * 0.3}))` 
                      : 'drop-shadow(0 0 10px rgba(234, 179, 8, 0.6))',
                    transform: isBeingAttracted ? `rotate(${Math.sin(heart.pulse * 2) * attractionStrength * 15}deg)` : 'rotate(0deg)'
                  }}
                />
              </div>
            )
          })}

          {/* Obstacles */}
          {obstacles.map(obstacle => (
            <div
              key={obstacle.id}
              className="absolute z-10"
              style={{
                left: `${obstacle.x}%`,
                top: `${obstacle.y}%`,
                width: `${obstacle.width}%`,
                height: `${obstacle.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div 
                className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-lg"
                style={{
                  animation: gamePaused ? 'none' : 'spin 3s linear infinite',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)'
                }}
              />
            </div>
          ))}

          {/* Monster */}
          <div
            className="absolute z-15 transition-all duration-100 ease-out"
            style={{
              left: `${monster.x}%`,
              top: `${monster.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              {/* Monster body */}
              <div 
                className="w-12 h-12 bg-gradient-to-br from-red-800 to-black rounded-full shadow-lg animate-gentle-pulse"
                style={{
                  boxShadow: '0 0 25px rgba(153, 27, 27, 0.9)'
                }}
              >
                {/* Angry monster eyes */}
                <div className="absolute top-2 left-1.5 w-3 h-2 bg-red-400 transform -rotate-12 animate-gentle-pulse"></div>
                <div className="absolute top-2 right-1.5 w-3 h-2 bg-red-400 transform rotate-12 animate-gentle-pulse"></div>
                
                {/* Angry eyebrows */}
                <div className="absolute top-1 left-2 w-2 h-0.5 bg-black transform -rotate-45"></div>
                <div className="absolute top-1 right-2 w-2 h-0.5 bg-black transform rotate-45"></div>
                
                {/* Monster mouth */}
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-1.5 bg-black rounded-sm"></div>
                  {/* Sharp teeth */}
                  <div className="absolute top-0 left-1 w-0.5 h-1.5 bg-white"></div>
                  <div className="absolute top-0 left-2 w-0.5 h-1.5 bg-white"></div>
                  <div className="absolute top-0 right-2 w-0.5 h-1.5 bg-white"></div>
                  <div className="absolute top-0 right-1 w-0.5 h-1.5 bg-white"></div>
                </div>
              </div>
              
              {/* Monster aura effect */}
              <div className="absolute inset-0 bg-red-600/30 rounded-full animate-gentle-pulse scale-150"></div>
            </div>
          </div>

          {/* Game Status */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
            <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg`}>
              <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Hearts: {collectedHearts.length}/30</div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg`}>
              <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Time: {timeLeft}s</div>
            </div>
            <button 
              onClick={() => setGamePaused(prev => !prev)}
              className={`${isDarkMode ? 'bg-gray-800/90 hover:bg-gray-800/100' : 'bg-white/90 hover:bg-white/100'} backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg transition-all`}
            >
              <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {gamePaused ? '▶️' : '⏸️'}
              </div>
            </button>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-6 py-3 inline-block shadow-lg`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Use WASD or Arrow keys • Hearts are magnetically attracted! 🧲 • Avoid obstacles & monster • Space/Esc to pause!
              </p>
            </div>
          </div>
        </div>

        {/* Pause Overlay */}
        {gamePaused && gameStarted && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4`}>
              <div className="text-6xl mb-4">⏸️</div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Game Paused</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                Press <kbd className={`px-2 py-1 ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200'} rounded text-sm`}>Space</kbd> or <kbd className={`px-2 py-1 ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200'} rounded text-sm`}>Esc</kbd> to resume
              </p>
              <button 
                onClick={() => setGamePaused(false)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
              >
                ▶️ Resume Game
              </button>
            </div>
          </div>
        )}

        {/* Victory Modal */}
        {showVictoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center animate-scale-in relative`}>
              {/* Close button */}
              <button
                onClick={() => setShowVictoryModal(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
                aria-label="Close victory modal"
              >
                <X size={20} />
              </button>
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-gentle-glow" />
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>Congratulations!</h2>
                
                {/* Completion Stats */}
                <div className={`${isDarkMode ? 'bg-gray-700 border-yellow-600' : 'bg-white border-yellow-200'} rounded-xl p-4 mb-4`}>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-2`}>⏱️ {completionTime}s</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Completion Time</div>
                  
                  {completionTime === bestTime && (
                    <div className={`mt-2 ${isDarkMode ? 'bg-yellow-900/30 text-yellow-200' : 'bg-yellow-50 text-yellow-800'} px-3 py-1 rounded-full text-xs font-bold`}>
                      🎉 New Best Time!
                    </div>
                  )}
                  
                  {bestTime > 0 && completionTime !== bestTime && (
                    <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Best: {bestTime}s
                    </div>
                  )}
                </div>
                
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  You found and collected every single heart in {completionTime} seconds! Just like how you've captured my heart completely. 💕
                </p>
              </div>
              
              {/* Video message section */}
              <div className={`${isDarkMode ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-br from-purple-100 to-pink-100'} rounded-2xl p-8 mb-6`}>
                <Heart className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-gentle-glow" fill="currentColor" />
                
                {/* Victory Video - Hearts Across Distance */}
                <div className="bg-black rounded-xl mb-4 overflow-hidden shadow-lg max-w-sm mx-auto">
                  <video 
                    controls 
                    className="w-full h-full rounded-xl"
                    style={{ aspectRatio: '16/9' }}
                    preload="metadata"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Fallback placeholder when video fails */}
                  <div className="aspect-video items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white hidden">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold mb-1">🎥 Personal Video Message</p>
                      <p className="text-xs text-gray-300">Video temporarily unavailable</p>
                    </div>
                  </div>
                </div>
                
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic text-lg leading-relaxed`}>
                  "You've just completed a journey to collect hearts! 
                  Every heart in this game represents something special. 
                  Congratulations on completing this adventure! Happy Birthday! 
                  Even miles apart, my love for you knows no bounds. 💜"
                </p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowVictoryModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowVictoryModal(false)
                    resetGame()
                  }}
                  className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
                >
                  <RotateCcw className="inline w-4 h-4 mr-2" />
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center w-full">
      <div className="inline-flex items-center justify-center mb-6">
        <Gamepad2 className="text-purple-500 w-12 h-12 mr-3" />
        <Heart className="text-yellow-500 w-8 h-8" fill="currentColor" />
        <Sparkles className="text-yellow-500 w-10 h-10 ml-3" />
      </div>
      
      <h1 className="text-3xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Hearts Across Distance
        </span>
      </h1>

      {gameOver && !gameWon && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
          <p className="text-red-700 font-semibold">
            {timeLeft === 0 ? "Time's up!" : "The monster caught you!"} Try again, my love 💕
          </p>
          <p className="text-sm text-red-600 mt-1">You collected {collectedHearts.length} hearts</p>
        </div>
      )}
      
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Navigate through the game area and find all the floating hearts while avoiding the red obstacles 
        and a chasing monster! Each heart represents a reason why I love you! 💕
      </p>
      
      <div className="bg-purple-50 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-purple-800 mb-4">How to Play:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-purple-700">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-purple-200 px-2 py-1 rounded">WASD</span>
            <span>or Arrow Keys to move</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>Collect all yellow hearts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Avoid red obstacles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-red-800 to-black rounded-full"></div>
            <span>Escape the angry monster</span>
          </div>
        </div>
      </div>

      {highScore > 0 && (
        <div className="mb-4 p-3 bg-pink-50 rounded-xl border border-pink-200">
          <p className="text-pink-800 font-semibold">🏆 Best Score: {highScore} {highScore === 1 ? 'heart' : 'hearts'}</p>
        </div>
      )}
      
      <div className="flex gap-4 justify-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 text-lg"
        >
          <Play className="inline w-6 h-6 mr-2" />
          {gameOver ? 'Try Again' : 'Start Adventure'}
        </button>
        {(gameWon || gameOver || collectedHearts.length > 0) && (
          <button
            onClick={resetGame}
            className="px-6 py-4 bg-gray-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <RotateCcw className="inline w-5 h-5 mr-2" />
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

function WordAssociationGameOriginal() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [bestScore, setBestScore] = useState(null)

  // Love and relationship questions
  const questions = [
    {
      question: "What's the most important thing in a relationship?",
      options: ["Trust", "Communication", "Love", "All of the above"],
      correct: 3,
      explanation: "Every healthy relationship needs trust, communication, and love working together! 💕"
    },
    {
      question: "Complete: 'Distance means nothing when...'",
      options: ["someone means everything", "you have wifi", "it's temporary", "you can travel"],
      correct: 0,
      explanation: "Distance means nothing when someone means everything to your heart! 💝"
    },
    {
      question: "What makes someone special?",
      options: ["Their looks", "Their achievements", "How they make you feel", "Their wealth"],
      correct: 2,
      explanation: "The most special people are those who make your heart feel at home! 🏠💖"
    },
    {
      question: "True love is about...",
      options: ["Finding the perfect person", "Being with someone popular", "Growing together", "Never fighting"],
      correct: 2,
      explanation: "True love is about growing together, supporting each other's dreams! 🌱💕"
    },
    {
      question: "What's the best way to show you care?",
      options: ["Expensive gifts", "Small daily gestures", "Social media posts", "Big surprises only"],
      correct: 1,
      explanation: "Small daily gestures show consistent love and care - like this website! 😊💝"
    },
    {
      question: "In a long-distance relationship, what matters most?",
      options: ["Daily calls", "Surprise visits", "Trust and commitment", "Counting days"],
      correct: 2,
      explanation: "Trust and commitment are the foundation that keeps love strong across any distance! 🌉💖"
    }
  ]

  // Load best score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ourWords_bestScore')
      if (saved) setBestScore(parseInt(saved))
    }
  }, [])

  const startGame = () => {
    setGameStarted(true)
    setGameFinished(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Game finished
        setGameFinished(true)
        const finalScore = score + (answerIndex === questions[currentQuestion].correct ? 1 : 0)
        if (!bestScore || finalScore > bestScore) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('ourWords_bestScore', finalScore.toString())
            setBestScore(finalScore)
          }
        }
      }
    }, 2500)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameFinished(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  if (!gameStarted || gameFinished) {
    const finalScore = gameFinished ? score : 0

    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        {gameFinished ? (
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-gentle-glow" />
        ) : (
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" fill="currentColor" />
        )}
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {gameFinished ? 'Quiz Complete!' : 'Our Words'}
        </h2>
        
        {gameFinished ? (
          <>
            <div className="text-3xl font-bold text-pink-600 mb-2">{finalScore} / {questions.length}</div>
            
            {finalScore === bestScore && finalScore > 0 && (
              <div className={`${isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} rounded-xl p-4 mb-4`}>
                <p className={`${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'} font-bold`}>🎉 New Best Score!</p>
              </div>
            )}

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              {finalScore === questions.length ? "Perfect! You understand love beautifully! 💕" :
               finalScore >= questions.length - 1 ? "Amazing! You really get relationships! 🌟" :
               finalScore >= Math.floor(questions.length / 2) ? "Great job! Love is in your heart! 💖" :
               "Keep learning about love! Every day brings new wisdom! 😊"}
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
              >
                <Play className="inline w-5 h-5 mr-2" />
                Play Again
              </button>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
              >
                <ArrowLeft className="inline w-5 h-5 mr-2" />
                Menu
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Test your knowledge about love and relationships! Answer questions about what makes love special! 💝</p>
            
            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-blue-800 mb-2">How to Play:</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Answer {questions.length} questions about love & relationships</p>
                <p>• Each question has one best answer</p>
                <p>• Learn something sweet with each question!</p>
                <p>• Get the highest score possible!</p>
              </div>
            </div>

            {bestScore !== null && (
              <div className="mb-4 p-3 bg-pink-50 rounded-xl border border-pink-200">
                <p className="text-pink-800 font-semibold">🏆 Best Score: {bestScore} / {questions.length}</p>
              </div>
            )}
            
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 text-lg"
            >
              <Play className="inline w-6 h-6 mr-2" />
              Start Quiz
            </button>
          </>
        )}
      </div>
    )
  }

  const question = questions[currentQuestion]
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Question {currentQuestion + 1} / {questions.length}</div>
          <div className="text-lg font-bold">Score: {score}</div>
        </div>
        {bestScore !== null && (
          <div className="text-center text-sm opacity-90 mt-1">Best: {bestScore} / {questions.length}</div>
        )}
      </div>

      {/* Question Area */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
          {question.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium "
            
            if (showResult) {
              if (index === question.correct) {
                buttonClass += "bg-green-100 border-green-400 text-green-800"
              } else if (index === selectedAnswer && index !== question.correct) {
                buttonClass += "bg-red-100 border-red-400 text-red-800"
              } else {
                buttonClass += "bg-gray-50 border-gray-200 text-gray-600"
              }
            } else {
              buttonClass += "bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-700"
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerClick(index)}
                disabled={showResult}
              >
                <span className="inline-flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 text-sm font-bold flex items-center justify-center mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 animate-fade-in">
            <div className="flex items-center mb-2">
              {selectedAnswer === question.correct ? (
                <Heart className="w-6 h-6 text-green-600 mr-2" fill="currentColor" />
              ) : (
                <Heart className="w-6 h-6 text-purple-600 mr-2" fill="currentColor" />
              )}
              <span className="font-bold text-purple-800">
                {selectedAnswer === question.correct ? "Correct! 💕" : "Good try! 💝"}
              </span>
            </div>
            <p className="text-purple-700 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ReflexGame() {
  const { isDarkMode } = useDarkMode()
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [hearts, setHearts] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const gameAreaRef = React.useRef(null)
  const heartIdRef = React.useRef(0)

  // Load high score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quickHearts_highScore')
      if (saved) setHighScore(parseInt(saved))
    }
  }, [])

  // Game timer
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameStarted(false)
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, timeLeft])

  // Separate effect to save high score when game ends
  useEffect(() => {
    if (gameOver && score > highScore && typeof window !== 'undefined') {
      localStorage.setItem('quickHearts_highScore', score.toString())
      setHighScore(score)
    }
  }, [gameOver, score, highScore])

  // Spawn hearts
  useEffect(() => {
    if (!gameStarted) return

    const spawnHeart = () => {
      const heartId = heartIdRef.current++
      const newHeart = {
        id: heartId,
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 70 + 10, // 10% to 80% of container height
        type: Math.random() > 0.8 ? 'golden' : 'normal', // 20% chance for golden heart
        clicked: false,
        fadeOut: false
      }

      setHearts(prev => [...prev, newHeart])

      // Remove heart after 2.5 seconds if not clicked
      setTimeout(() => {
        setHearts(prev => 
          prev.map(h => h.id === heartId ? { ...h, fadeOut: true } : h)
        )
        // Remove from array after fade animation
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== heartId))
        }, 500)
      }, 2500)
    }

    const spawnInterval = setInterval(spawnHeart, 800) // Spawn every 800ms
    return () => clearInterval(spawnInterval)
  }, [gameStarted])

  const handleHeartClick = (heartId, heartType) => {
    setHearts(prev => 
      prev.map(h => 
        h.id === heartId ? { ...h, clicked: true } : h
      )
    )

    // Add score based on heart type
    const points = heartType === 'golden' ? 50 : 10
    setScore(prev => prev + points)

    // Remove clicked heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== heartId))
    }, 300)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(20)
    setHearts([])
    heartIdRef.current = 0
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setTimeLeft(20)
    setHearts([])
    heartIdRef.current = 0
  }

  if (!gameStarted && !gameOver) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-gentle-glow" />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Quick Hearts</h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Catch the falling hearts as fast as you can! Golden hearts are worth 50 points! 💛</p>
        
        <div className={`${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'} rounded-2xl p-4 mb-6`}>
          <h3 className={`font-bold ${isDarkMode ? 'text-purple-200' : 'text-purple-800'} mb-2`}>How to Play:</h3>
          <div className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-700'} space-y-1`}>
            <p>• Click hearts before they disappear (2.5 seconds)</p>
            <p>• Normal hearts: 10 points 💖</p>
            <p>• Golden hearts: 50 points 💛</p>
            <p>• 20 seconds to get the highest score!</p>
          </div>
        </div>

        {highScore > 0 && (
          <div className={`mb-4 p-3 ${isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} rounded-xl`}>
            <p className={`${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'} font-semibold`}>🏆 High Score: {highScore}</p>
          </div>
        )}
        
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 text-lg"
        >
          <Play className="inline w-6 h-6 mr-2" />
          Start Game
        </button>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center`}>
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-gentle-glow" />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Game Over!</h2>
        <div className={`text-3xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-2`}>{score} Points</div>
        
        {score === highScore && score > 0 && (
          <div className={`${isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} rounded-xl p-4 mb-4`}>
            <p className={`${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'} font-bold`}>🎉 New High Score!</p>
          </div>
        )}

        {/* Victory Video - Quick Hearts */}
        <div className="flex justify-center mb-4">
          <div className="bg-black rounded-xl overflow-hidden shadow-lg max-w-sm w-full">
            <video 
              controls 
              className="w-full h-full rounded-xl"
              style={{ aspectRatio: '16/9' }}
              preload="metadata"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Fallback placeholder when video fails */}
            <div className="aspect-video items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white hidden">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-semibold mb-1">⚡ Victory Video</p>
                <p className="text-xs text-gray-300">Video temporarily unavailable</p>
              </div>
            </div>
          </div>
        </div>

        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          {score >= 200 ? "Amazing reflexes! You're incredible! 💕" :
           score >= 150 ? "Great job, my love! 🌟" :
           score >= 100 ? "Not bad! Practice makes perfect! 💖" :
           score >= 50 ? "Good effort! Keep practicing! 😊" :
           "Every heart you catch is special! 💕"}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <Play className="inline w-5 h-5 mr-2" />
            Play Again
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            <ArrowLeft className="inline w-5 h-5 mr-2" />
            Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden`}>
      {/* Game Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Score: {score}</div>
          <div className="text-xl font-bold">Time: {timeLeft}s</div>
        </div>
        {highScore > 0 && (
          <div className="text-center text-sm opacity-90 mt-1">High Score: {highScore}</div>
        )}
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className={`relative ${isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-pink-50 to-purple-50'} h-96 overflow-hidden cursor-pointer select-none`}
      >
        {hearts.map(heart => (
          <div
            key={heart.id}
            className={`absolute transition-all duration-300 cursor-pointer ${
              heart.clicked ? 'animate-bounce scale-150 opacity-0' :
              heart.fadeOut ? 'opacity-0 scale-50' : 
              'hover:scale-110'
            }`}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform, opacity'
            }}
            onClick={() => !heart.clicked && !heart.fadeOut && handleHeartClick(heart.id, heart.type)}
          >
            <Heart
              size={heart.type === 'golden' ? 36 : 32}
              className={`drop-shadow-lg animate-gentle-glow ${
                heart.type === 'golden' 
                  ? 'text-yellow-400' 
                  : 'text-pink-500'
              }`}
              fill="currentColor"
            />
            {heart.type === 'golden' && (
              <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-30 animate-gentle-pulse scale-150"></div>
            )}
          </div>
        ))}

        {/* Game Instructions */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <div className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-xl px-4 py-2 inline-block shadow-md`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Click the hearts before they disappear! Golden hearts = 50 pts! 💛
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Easter Egg */}
      <EasterEgg 
        id="egg-7"
        bottom="25%"
        left="12%"
        message="Ready to play some birthday games? 🎮🎂"
        size="medium"
      />
    </div>
  )
}
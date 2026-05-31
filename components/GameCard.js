'use client'
import React, { memo } from 'react'
import { Play, Trophy } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

const GameCard = memo(function GameCard({
  game,
  index,
  onGameSelect,
  gameStats
}) {
  const IconComponent = game.icon
  const { isDarkMode } = useDarkMode()

  // Get high score for this game
  const getHighScore = () => {
    switch (game.id) {
      case 'reflex-game':
        return gameStats.quickHearts
      case 'memory-match':
        return gameStats.memoryMatch
      case 'hearts-distance':
        return gameStats.heartsDistanceTime
      default:
        return 0
    }
  }

  const highScore = getHighScore()

  // Format high score if it's the hearts-distance game
  const renderHighScore = () => {
    if (game.id === 'hearts-distance' && highScore > 0) {
      return `⏱️ ${highScore}s`
    }
    return highScore
  }

  return (
    <div
      className="group cursor-pointer animate-slide-up-smooth"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onGameSelect(game.id)}
    >
      <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/30' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant overflow-hidden hover:shadow-floating transform transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1`}>
        {/* Icon Header */}
        <div className={`h-24 bg-gradient-to-br ${game.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative h-full flex items-center justify-center">
            <IconComponent size={40} className="text-white drop-shadow-lg" />
          </div>
          <div className="absolute top-4 right-4">
            <Play className="text-white/70 w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-2 group-hover:text-purple-600 transition-colors`}>
            {game.title}
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-4`}>
            {game.description}
          </p>

          {/* High Score Display */}
          {highScore > 0 && (
            <div className={`flex items-center justify-between pt-3 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className={`flex items-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Trophy size={14} className="mr-1 text-yellow-500" />
                Best: {renderHighScore()}
              </div>
              <div className={`text-xs ${isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'} px-2 py-1 rounded-full`}>
                Played
              </div>
            </div>
          )}

          {highScore === 0 && (
            <div className={`pt-3 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className={`text-xs ${isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'} px-2 py-1 rounded-full inline-flex items-center`}>
                <Play size={10} className="mr-1" />
                Try me!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default GameCard
// Made By Krishna Patil
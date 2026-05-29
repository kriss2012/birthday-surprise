'use client'
import React from 'react'
import { Heart, Calendar } from 'lucide-react'

// Enhanced 2D Photo Gallery Component

// Main Enhanced3DViewer Component
export default function Enhanced3DViewer({ memories, onSelectMemory }) {
  // Fallback 2D view while debugging 3D issues
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl overflow-hidden shadow-2xl border border-white/30">
      {/* Temporary fallback - enhanced 2D gallery */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-full overflow-y-auto">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => onSelectMemory(memory)}
              style={{
                transform: `perspective(1000px) rotateY(${Math.sin(index * 0.5) * 5}deg) rotateX(${Math.cos(index * 0.3) * 3}deg)`,
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-200 to-pink-200 relative overflow-hidden">
                  {memory.photo_url ? (
                    <img 
                      src={memory.photo_url} 
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="text-purple-400 w-8 h-8 opacity-50" fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-1 truncate">
                    {memory.title}
                  </h3>
                  <div className="flex items-center text-xs text-purple-600">
                    <Calendar size={10} className="mr-1" />
                    {new Date(memory.date_taken).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status message */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2">
        <p className="text-purple-600">Enhanced Gallery: {memories.length} {memories.length === 1 ? 'memory' : 'memories'}</p>
        <p className="text-xs text-gray-500">CSS 3D perspective view</p>
      </div>
    </div>
  )
}
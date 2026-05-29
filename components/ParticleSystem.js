'use client'
import React, { memo } from 'react'
import { Heart } from 'lucide-react'

// Pure CSS particle system - no JS animation loops, no setState, zero lag
const ParticleSystem = memo(function ParticleSystem() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Ambient floating hearts - pure CSS, no JS */}
      <div className="particle-heart" style={{ left: '8%', top: '15%', animationDelay: '0s', animationDuration: '12s' }}>
        <Heart size={12} className="text-pink-300" fill="currentColor" />
      </div>
      <div className="particle-heart" style={{ left: '22%', top: '60%', animationDelay: '2s', animationDuration: '15s' }}>
        <Heart size={10} className="text-pink-200" fill="currentColor" />
      </div>
      <div className="particle-heart" style={{ left: '75%', top: '25%', animationDelay: '4s', animationDuration: '11s' }}>
        <Heart size={14} className="text-pink-400" fill="currentColor" />
      </div>
      <div className="particle-heart" style={{ left: '88%', top: '70%', animationDelay: '1s', animationDuration: '14s' }}>
        <Heart size={10} className="text-pink-200" fill="currentColor" />
      </div>
      <div className="particle-heart" style={{ left: '50%', top: '80%', animationDelay: '6s', animationDuration: '13s' }}>
        <Heart size={12} className="text-pink-300" fill="currentColor" />
      </div>
      <div className="particle-heart" style={{ left: '35%', top: '10%', animationDelay: '3s', animationDuration: '16s' }}>
        <Heart size={8} className="text-pink-200" fill="currentColor" />
      </div>

      <style>{`
        .particle-heart {
          position: absolute;
          opacity: 0;
          animation: ambient-float linear infinite;
          will-change: transform, opacity;
        }
        @keyframes ambient-float {
          0% { transform: translateY(0px) scale(1); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-60px) scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  )
})

export default ParticleSystem
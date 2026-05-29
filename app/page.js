'use client'
import { useState, useEffect } from 'react'

export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { Heart, Lock, Calendar, Sparkles, Star } from 'lucide-react'
import EasterEgg from '../components/EasterEgg'
import { useDarkMode } from '../hooks/useDarkMode'


export default function LandingPage() {
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessLoading, setShowSuccessLoading] = useState(false)
  const [hint, setHint] = useState(false)
  const router = useRouter()
  const { isDarkMode, isLoading: darkModeLoading } = useDarkMode()

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem('birthday_authenticated')
      if (authenticated === 'true') {
        router.push('/birthday')
      }
    }
    checkAuth()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // The password - you can change this!
    // Using a demo password
    const SECRET_PASSWORD = 'demo123' // Change this to your desired password

    if (password === SECRET_PASSWORD) {
      // Log access to Supabase
      try {
        await supabase.from('access_logs').insert({})
      } catch (err) {
        console.log('Failed to log access:', err)
      }

      // Set authentication
      sessionStorage.setItem('birthday_authenticated', 'true')
      
      // Show success loading screen for 1.5 seconds
      setIsLoading(false)
      setShowSuccessLoading(true)
      
      setTimeout(() => {
        router.push('/birthday')
      }, 1500)
    } else {
      setError('Wrong password! Try again 💕')
      setIsLoading(false)
    }
  }

  // Show loading screen while dark mode is loading
  if (darkModeLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100'} overflow-hidden relative`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Success loading screen
  if (showSuccessLoading) {
    const backgroundClasses = isDarkMode 
      ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900" 
      : "bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100"
    
    return (
      <div className={`min-h-screen flex items-center justify-center ${backgroundClasses} overflow-hidden relative`}>
        {/* Celebratory background elements */}
        <div className="absolute inset-0">
          {/* Floating birthday elements */}
          <div className="absolute top-20 left-[15%] text-pink-400 opacity-40 animate-birthday-float-1">
            🎂
          </div>
          <div className="absolute top-32 right-[20%] text-purple-400 opacity-35 animate-birthday-float-2">
            🎉
          </div>
          <div className="absolute bottom-32 left-[25%] text-yellow-400 opacity-45 animate-birthday-float-3">
            🎈
          </div>
          <div className="absolute top-1/3 left-[10%] text-pink-300 opacity-30 animate-birthday-float-4">
            ✨
          </div>
          <div className="absolute bottom-40 right-[15%] text-purple-300 opacity-40 animate-birthday-float-5">
            🎁
          </div>
          <div className="absolute top-1/2 right-[35%] text-yellow-300 opacity-35 animate-birthday-float-6">
            🌟
          </div>
          
          {/* Hearts floating around */}
          <div className="absolute top-16 right-[10%] text-pink-400 opacity-50 animate-heart-float-1">
            <Heart size={32} fill="currentColor" />
          </div>
          <div className="absolute bottom-24 left-[12%] text-purple-400 opacity-45 animate-heart-float-2">
            <Heart size={28} fill="currentColor" />
          </div>
          <div className="absolute top-1/4 left-[8%] text-pink-300 opacity-40 animate-heart-float-3">
            <Heart size={24} fill="currentColor" />
          </div>
        </div>

        <div className="text-center z-10 max-w-lg mx-auto px-6">
          {/* Main celebration animation */}
          <div className="relative mb-8">
            {/* Central celebration icon with glow */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-birthday-pulse"></div>
              <div className={`absolute inset-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center justify-center`}>
                <div className="text-3xl animate-birthday-bounce">🎂</div>
              </div>
              {/* Orbiting party elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl animate-party-bounce">🎉</div>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-xl animate-party-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-2xl animate-party-bounce" style={{ animationDelay: '1s' }}>✨</div>
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-xl animate-party-bounce" style={{ animationDelay: '1.5s' }}>🎁</div>
              </div>
            </div>

            {/* Success message animation */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-success-glow">
                  Welcome In! 🎉
                </span>
              </h1>
              <p className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} text-lg animate-gentle-pulse mb-4`}>
                Preparing your magical surprise...
              </p>
              
              {/* Animated celebration dots */}
              <div className="flex justify-center items-center gap-3">
                <span className="text-2xl animate-celebration-1">🎂</span>
                <span className="text-2xl animate-celebration-2">🎈</span>
                <span className="text-2xl animate-celebration-3">🎉</span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg`}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-gentle-pulse"></div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Unlocking Birthday Magic</span>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mb-2`}>
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full animate-progress-fill"></div>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get ready for the sweetest surprise!</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes birthday-float-1 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1); 
              opacity: 0.4;
            }
            33% {
              transform: translateY(-20px) rotate(15deg) scale(1.1);
              opacity: 0.7;
            }
            66% {
              transform: translateY(-35px) rotate(-10deg) scale(0.9);
              opacity: 0.5;
            }
          }
          
          @keyframes birthday-float-2 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.35;
            }
            50% { 
              transform: translateY(-25px) rotate(20deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes birthday-float-3 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.45;
            }
            25% {
              transform: translateY(-15px) scale(1.2);
              opacity: 0.7;
            }
            75% {
              transform: translateY(-30px) scale(0.8);
              opacity: 0.6;
            }
          }
          
          @keyframes birthday-float-4 {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-22px) translateX(10px) rotate(-20deg); 
              opacity: 0.7;
            }
          }
          
          @keyframes birthday-float-5 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.4;
            }
            40% {
              transform: translateY(-18px) rotate(25deg);
              opacity: 0.8;
            }
            80% {
              transform: translateY(-8px) rotate(-15deg);
              opacity: 0.6;
            }
          }
          
          @keyframes birthday-float-6 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.35;
            }
            60% { 
              transform: translateY(-28px) scale(1.3); 
              opacity: 0.9;
            }
          }
          
          @keyframes heart-float-1 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.5;
            }
            50% { 
              transform: translateY(-20px) rotate(10deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes heart-float-2 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.45;
            }
            50% { 
              transform: translateY(-25px) scale(1.1); 
              opacity: 0.7;
            }
          }
          
          @keyframes heart-float-3 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.4;
            }
            33% {
              transform: translateY(-12px) rotate(-8deg);
              opacity: 0.6;
            }
            66% {
              transform: translateY(-18px) rotate(12deg);
              opacity: 0.8;
            }
          }
          
          @keyframes birthday-pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 25px rgba(236, 72, 153, 0.4);
            }
            50% {
              transform: scale(1.1);
              box-shadow: 0 0 40px rgba(236, 72, 153, 0.8);
            }
          }
          
          @keyframes birthday-bounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.2); }
          }
          
          @keyframes party-bounce {
            0%, 100% { 
              transform: translateY(0px) scale(1) rotate(0deg); 
            }
            50% { 
              transform: translateY(-12px) scale(1.3) rotate(10deg); 
            }
          }
          
          @keyframes success-glow {
            0%, 100% {
              opacity: 1;
              filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.3));
            }
            50% {
              opacity: 1;
              filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.6));
            }
          }
          
          @keyframes celebration-1 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.7;
            }
            33% { 
              transform: translateY(-8px) rotate(15deg); 
              opacity: 1;
            }
            66% { 
              transform: translateY(-4px) rotate(-10deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes celebration-2 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-10px) scale(1.4); 
              opacity: 1;
            }
          }
          
          @keyframes celebration-3 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.7;
            }
            40% { 
              transform: translateY(-6px) rotate(-12deg); 
              opacity: 0.9;
            }
            80% { 
              transform: translateY(-9px) rotate(8deg); 
              opacity: 1;
            }
          }
          
          @keyframes progress-fill {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          @keyframes gentle-pulse {
            0%, 100% { 
              opacity: 0.7; 
              transform: scale(1); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.05); 
            }
          }
          
          .animate-birthday-float-1 { 
            animation: birthday-float-1 4s ease-in-out infinite; 
            font-size: 28px;
          }
          .animate-birthday-float-2 { 
            animation: birthday-float-2 5s ease-in-out infinite; 
            font-size: 24px;
          }
          .animate-birthday-float-3 { 
            animation: birthday-float-3 6s ease-in-out infinite; 
            font-size: 32px;
          }
          .animate-birthday-float-4 { 
            animation: birthday-float-4 4.5s ease-in-out infinite; 
            font-size: 26px;
          }
          .animate-birthday-float-5 { 
            animation: birthday-float-5 5.5s ease-in-out infinite; 
            font-size: 30px;
          }
          .animate-birthday-float-6 { 
            animation: birthday-float-6 3.5s ease-in-out infinite; 
            font-size: 24px;
          }
          .animate-heart-float-1 { 
            animation: heart-float-1 6s ease-in-out infinite; 
          }
          .animate-heart-float-2 { 
            animation: heart-float-2 7s ease-in-out infinite; 
          }
          .animate-heart-float-3 { 
            animation: heart-float-3 5s ease-in-out infinite; 
          }
          .animate-birthday-pulse { 
            animation: birthday-pulse 2s ease-in-out infinite; 
          }
          .animate-birthday-bounce { 
            animation: birthday-bounce 1.5s ease-in-out infinite; 
          }
          .animate-party-bounce { 
            animation: party-bounce 1.8s ease-in-out infinite; 
          }
          .animate-success-glow { 
            animation: success-glow 3s ease-in-out infinite; 
          }
          .animate-celebration-1 { 
            animation: celebration-1 2s ease-in-out infinite; 
          }
          .animate-celebration-2 { 
            animation: celebration-2 2.2s ease-in-out infinite 0.3s; 
          }
          .animate-celebration-3 { 
            animation: celebration-3 1.8s ease-in-out infinite 0.6s; 
          }
          .animate-progress-fill { 
            animation: progress-fill 1.5s ease-out; 
          }
          .animate-gentle-pulse { 
            animation: gentle-pulse 3s ease-in-out infinite; 
          }
          .animate-spin-slow { 
            animation: spin 15s linear infinite; 
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  const backgroundClasses = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900" 
    : "bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100"

  return (
    <div className={`center-container ${backgroundClasses}`}>
      <div className="max-w-md w-full">
        {/* Floating hearts animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="animate-float-slow absolute top-20 left-10 text-pink-300 opacity-70">
            <Heart size={30} fill="currentColor" />
          </div>
          <div className="animate-float-medium absolute top-40 right-20 text-purple-300 opacity-60">
            <Heart size={25} fill="currentColor" />
          </div>
          <div className="animate-float-fast absolute bottom-20 left-1/3 text-pink-400 opacity-50">
            <Heart size={20} fill="currentColor" />
          </div>
          <div className="animate-float-slow absolute top-1/2 right-1/3 text-purple-400 opacity-60">
            <Sparkles size={25} />
          </div>
        </div>

        {/* Main card */}
        <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-floating p-8 sm:p-10 space-y-8 transform transition-elegant hover:scale-[1.02] my-8`}>
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="icon-container-lg bg-gradient-to-br from-pink-400 to-purple-400 rounded-full shadow-lg">
                <Lock className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
              Special Day Incoming! 🎉
            </h1>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Enter the magic password to unlock your surprise
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative login-input-group">
              <input
                type="password"
                value="demo123"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter our special word..."
                className={`w-full px-5 py-4 rounded-xl border-2 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-500' : 'border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-purple-400'} focus:outline-none transition-colors min-h-[48px]`}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center animate-shake mt-4 mb-4">
                {error}
              </div>
            )}

            <div className="login-button-group">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed min-h-[48px]"
              >
                {isLoading ? 'Unlocking magic...' : 'Unlock Birthday Surprise 🎂'}
              </button>
            </div>
          </form>

          {/* Hint button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setHint(!hint)}
              className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-purple-400 hover:bg-gray-800' : 'text-gray-500 hover:text-purple-600 hover:bg-gray-50'} transition-colors py-2 px-4 rounded-lg min-h-[40px] cursor-pointer`}
            >
              Need a hint? 💭
            </button>
            {hint && (
              <p className={`mt-4 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} animate-fade-in`}>
                Think about the demo password... 🎵💛
              </p>
            )}
          </div>

          {/* Footer */}
          <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'} pt-6 mt-8 border-t`}>
            Made with <Heart className="inline text-yellow-500 animate-pulse" size={14} fill="currentColor" /> for Birthday Person
          </div>
        </div>

        {/* Hidden Easter Egg */}
        <EasterEgg 
          id="egg-8"
          top="15%"
          right="10%"
          icon={Star}
          message="The first secret revealed! ⭐"
          specialMessage="This is just the beginning of all the surprises I have for you!"
          size="small"
        />
      </div>
    </div>
  )
}

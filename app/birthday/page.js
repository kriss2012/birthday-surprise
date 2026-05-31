'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Camera, MessageCircle, Gamepad2, Music, Calendar, Sparkles, Gift, Crown, Star, Brain, Joystick, Globe, Plane } from 'lucide-react'
import EasterEgg from '../../components/EasterEgg'
import { useDarkMode } from '../../hooks/useDarkMode'

export default function BirthdayPage() {
  const router = useRouter()
  const [timeUntil, setTimeUntil] = useState('')
  const { isDarkMode } = useDarkMode()

  // Instant auth check — no delay, no loading screen
  const isAuthenticated = typeof window !== 'undefined'
    ? sessionStorage.getItem('birthday_authenticated') === 'true'
    : false

  const handleLogout = () => {
    sessionStorage.removeItem('birthday_authenticated')
    router.replace('/')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, router])

  // Countdown timer
  useEffect(() => {
    const calculateTime = () => {
      // Get current year and set birthday to current or next year
      const now = new Date()
      const currentYear = now.getFullYear()
      let birthday = new Date(`${currentYear}-09-03T00:00:00+10:00`) // Melbourne time

      // If birthday has passed this year, use next year
      if (birthday < now) {
        birthday = new Date(`${currentYear + 1}-09-03T00:00:00+10:00`)
      }

      const diff = birthday - now

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          setTimeUntil(`${days} ${days === 1 ? 'day' : 'days'} and ${hours} ${hours === 1 ? 'hour' : 'hours'} until your special day!`)
        } else if (hours > 0) {
          setTimeUntil(`${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} until your birthday! 🎉`)
        } else {
          setTimeUntil(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} until your birthday! 🎂✨`)
        }
      } else {
        setTimeUntil("IT'S YOUR BIRTHDAY TODAY! 🎉🎂🎈")
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000 * 60) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      title: 'Our Memories',
      description: 'A collection of our favorite moments together',
      icon: Camera,
      link: '/birthday/memories',
      gradient: 'from-pink-400 to-rose-600',
      delay: '0ms'
    },
    {
      title: 'Love Quiz',
      description: 'How well do I know you? Test time!',
      icon: Brain,
      link: '/birthday/quiz',
      gradient: 'from-orange-400 to-red-600',
      delay: '100ms'
    },
    {
      title: 'Birthday Messages',
      description: 'Heartfelt messages from the ones who love you',
      icon: MessageCircle,
      link: '/birthday/messages',
      gradient: 'from-blue-400 to-cyan-600',
      delay: '200ms'
    },
    {
      title: 'Our Playlist',
      description: 'Songs that remind me of you',
      icon: Music,
      link: '/birthday/playlist',
      gradient: 'from-green-400 to-emerald-600',
      delay: '300ms'
    },
    {
      title: 'Mini Games',
      description: 'Fun little games, each one tailored from my love for you',
      icon: Gamepad2,
      link: '/birthday/games',
      gradient: 'from-violet-400 to-purple-600',
      delay: '400ms'
    },
    {
      title: 'Journey to You',
      description: 'Interactive 3D globe showing our path to reunion',
      icon: Globe,
      link: '/birthday/journey',
      gradient: 'from-indigo-400 to-blue-600',
      delay: '500ms'
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'} overflow-hidden relative`}>
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-pink-300 opacity-70">
            <Heart size={15} fill="currentColor" className="animate-gentle-float" />
          </div>
          <div className="absolute top-20 right-16 text-purple-400 opacity-60">
            <Calendar size={18} className="animate-gentle-float-alt" />
          </div>
          <div className="absolute bottom-32 left-16 text-yellow-400 opacity-50">
            <Star size={14} fill="currentColor" className="animate-gentle-pulse" />
          </div>
          <div className="absolute top-1/3 left-1/4 text-blue-300 opacity-40">
            <Gift size={16} className="animate-gentle-spin" />
          </div>
          <div className="absolute bottom-40 right-20 text-pink-400 opacity-60">
            <Sparkles size={12} className="animate-gentle-bounce" />
          </div>
          <div className="absolute top-1/2 right-1/3 text-purple-300 opacity-50">
            <Crown size={20} className="animate-gentle-float-slow" />
          </div>
        </div>

        <div className="text-center z-10">
          {/* Main loading animation */}
          <div className="relative mb-8">
            {/* Outer rotating ring */}
            <div className="w-24 h-24 mx-auto relative">
              <div className={`absolute inset-0 border-4 ${isDarkMode ? 'border-gray-600' : 'border-purple-200'} rounded-full`}></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>

              {/* Inner pulsing circle */}
              <div className="absolute inset-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-gentle-pulse flex items-center justify-center">
                <Heart className="w-8 h-8 text-white animate-gentle-float" fill="currentColor" />
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

          {/* Loading text with animated gradient */}
          <div className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-birthday-glow">
              Loading Birthday Magic
            </span>
          </div>

          {/* Progress indicator */}
          <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg`}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-gentle-pulse"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preparing Your Special Day</span>
            </div>
            <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mb-2`}>
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full animate-progress-fill"></div>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Almost ready...</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes birthday-glow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2) drop-shadow(0 0 10px rgba(147, 51, 234, 0.5)); }
          }
          .animate-birthday-glow { animation: birthday-glow 2s ease-in-out infinite; }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`center-container ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
      {/* Static background decoration - no animation to avoid scroll jank */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300 rounded-full opacity-10"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-purple-300 rounded-full opacity-10"></div>
        <div className="absolute bottom-10 left-20 w-36 h-36 bg-blue-300 rounded-full opacity-10"></div>
      </div>

      {/* Top Navigation */}
      <div className="fixed top-4 left-4 right-4 flex justify-between items-center z-50">
        <button onClick={handleLogout} className={`fixed top-4 right-4 z-50 ${isDarkMode ? 'bg-gray-800/90 border-gray-700/50 text-gray-300 hover:bg-red-900/20 hover:text-red-400' : 'bg-white/90 border-white/20 text-gray-600 hover:bg-red-50 hover:text-red-600'} backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300`}>
          ← Back to Login
        </button>

      </div>

      <div className="center-content relative z-10">
        {/* Header */}
        <div className="text-center header-section animate-fade-in max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
            <Gift className="text-purple-500 mx-3 w-8 h-8 sm:w-10 sm:h-10" />
            <Sparkles className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 px-2">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Happy Birthday!
            </span>
          </h1>

          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 px-2`}>
            Welcome to your special surprise! 💕
          </p>

          <div className={`inline-flex items-center gap-2 px-4 py-4 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-full shadow-md`}>
            <Calendar className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" />
            <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{timeUntil}</p>
          </div>
        </div>

        {/* Feature Cards - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 section-spacing max-w-5xl mx-auto w-full">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              prefetch={false}
              className="group block animate-slide-up-smooth"
              style={{
                animationDelay: feature.delay,
                willChange: 'transform, opacity'
              }}
            >
              <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant overflow-hidden hover:shadow-floating h-full transform transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1`}>
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                <div className="p-6 sm:p-7 md:p-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-3 sm:p-4 bg-gradient-to-br ${feature.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 ease-out flex-shrink-0`}>
                      <feature.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-1`}>
                        {feature.title}
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Special Message - Full Width */}
        <div className={`text-center ${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-floating p-8 sm:p-10 animate-slide-up-smooth max-w-5xl mx-auto section-spacing`} style={{ animationDelay: '500ms' }}>
          <div className="relative mb-6">
            <Heart className="text-yellow-500 mx-auto w-10 h-10 sm:w-12 sm:h-12 animate-gentle-glow" fill="currentColor" />
            <div className="absolute inset-0 animate-gentle-pulse">
              <Heart className="text-yellow-300 mx-auto w-10 h-10 sm:w-12 sm:h-12 opacity-20" fill="currentColor" />
            </div>
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>
            A Special Message For You
          </h2>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed max-w-2xl mx-auto px-2 sm:px-0`}>
            Even though we&apos;re miles apart on your special day, my love for you knows no distance.
            This little corner of the internet is my way of being there with you, celebrating you,
            and reminding you how incredibly special you are. Every pixel here was placed with love,
            every feature built while thinking of your beautiful smile. Happy Birthday! 🎂💛
          </p>
        </div>

        {/* Hidden Easter Eggs */}
        <EasterEgg
          id="egg-1"
          top="10%"
          left="5%"
          icon={Crown}
          message="You found the birthday crown! 👑"
          specialMessage="You're the queen of my heart, today and always!"
          size="medium"
        />

        <EasterEgg
          id="egg-2"
          bottom="15%"
          right="8%"
          icon={Star}
          message="A shining star, just like you! ⭐"
          specialMessage="You light up my world in ways you can't even imagine"
          size="medium"
        />

        <EasterEgg
          id="egg-3"
          top="50%"
          left="2%"
          icon={Gift}
          message="A special gift waiting to be unwrapped! 🎁"
          specialMessage="The best gift you've given me is your love"
          size="large"
        />
      </div>
    </div>
  )
}
// Made By Krishna Patil
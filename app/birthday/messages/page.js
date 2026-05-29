'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { ArrowLeft, Heart, Star, Sparkles, MessageCircle, User } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth'
import { useDarkMode } from '../../../hooks/useDarkMode'

export default function MessagesPage() {
  const router = useRouter()
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const { isDarkMode } = useDarkMode()
  const { isAuthenticated } = useAuth()

  // Helper function to detect and convert video URLs
  const getVideoEmbedInfo = (url) => {
    if (!url) return null
    const googleDriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/
    const driveMatch = url.match(googleDriveRegex)
    if (driveMatch) {
      return { type: 'googledrive', embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`, fileId: driveMatch[1] }
    }
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const youtubeMatch = url.match(youtubeRegex)
    if (youtubeMatch) {
      return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`, videoId: youtubeMatch[1] }
    }
    const videoExtensions = /\.(mp4|webm|ogg|mov)(\?.*)?$/i
    if (videoExtensions.test(url)) return { type: 'direct', url }
    return { type: 'direct', url }
  }

  const getDefaultMessages = () => [
    { id: '1', author: 'Your Love', message: "From the moment I saw you, I knew my life would never be the same. Your smile lit up the room, and your laugh became my favorite sound. Happy birthday to the person who changed everything for me. ❤️", created_at: new Date().toISOString() },
    { id: '2', author: 'Your Admirer', message: "You have the most beautiful soul I've ever encountered. Your kindness, your compassion, the way you see the world - it makes me fall in love with you more every single day. You inspire me to be better. ✨", created_at: new Date().toISOString() },
    { id: '3', author: 'Your Partner', message: "Even though we're apart right now, you're always in my heart and thoughts. Distance is just a number when love is this strong. I can't wait until we're together again. Until then, know that you're loved beyond measure. 💙", created_at: new Date().toISOString() }
  ]

  const fetchMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false })
      // eslint-disable-next-line no-console
      if (error) { setMessages(getDefaultMessages()) }
      else { setMessages(data || getDefaultMessages()) }
    } catch { setMessages(getDefaultMessages()) }
    finally { setLoading(false) }
  }, [])

  // Redirect if not authenticated, otherwise fetch immediately
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/')
    } else {
      fetchMessages()
    }
  }, [isAuthenticated, router, fetchMessages])

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-pink-900 to-red-900' : 'bg-gradient-to-br from-pink-100 via-purple-50 to-red-100'} overflow-hidden relative`}>
        {/* Floating love elements */}
        <div className="absolute inset-0">
          {/* Hearts and love symbols */}
          <div className="absolute top-20 left-[15%] text-pink-400 opacity-45 animate-love-float-1">
            💕
          </div>
          <div className="absolute top-32 right-[20%] text-red-400 opacity-40 animate-love-float-2">
            <Heart size={28} fill="currentColor" />
          </div>
          <div className="absolute bottom-32 left-[25%] text-purple-400 opacity-50 animate-love-float-3">
            💖
          </div>
          <div className="absolute top-1/3 left-[10%] text-pink-300 opacity-35 animate-love-float-4">
            <MessageCircle size={26} />
          </div>
          <div className="absolute bottom-40 right-[15%] text-red-300 opacity-45 animate-love-float-5">
            💌
          </div>
          <div className="absolute top-1/2 right-[35%] text-purple-300 opacity-40 animate-love-float-6">
            ✨
          </div>
          
          {/* Additional romantic elements */}
          <div className="absolute top-16 right-[10%] text-pink-400 opacity-50 animate-romantic-float">
            <Heart size={32} fill="currentColor" />
          </div>
          <div className="absolute bottom-24 left-[12%] text-red-400 opacity-45 animate-romantic-float-2">
            💝
          </div>
        </div>

        <div className="text-center z-10 max-w-lg mx-auto px-6">
          {/* Main love letter animation */}
          <div className="relative mb-8">
            {/* Central love letter with glow */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl animate-letter-pulse transform rotate-3"></div>
              <div className={`absolute inset-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl flex items-center justify-center`}>
                <div className="text-3xl animate-letter-bounce">💕</div>
              </div>
              {/* Orbiting love elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-pink-500 animate-love-bounce">
                  <MessageCircle size={20} />
                </div>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-red-500 animate-love-bounce" style={{ animationDelay: '0.5s' }}>
                  <Heart size={18} fill="currentColor" />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-pink-400 animate-love-bounce" style={{ animationDelay: '1s' }}>
                  ✨
                </div>
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-red-400 animate-love-bounce" style={{ animationDelay: '1.5s' }}>
                  <Star size={18} fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Loading message */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-500 via-red-600 to-purple-500 bg-clip-text text-transparent animate-love-glow">
                  Reading Love Letters 💌
                </span>
              </h1>
              <p className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} text-lg animate-gentle-pulse mb-4`}>
                Preparing heartfelt messages for you...
              </p>
              
              {/* Animated love dots */}
              <div className="flex justify-center items-center gap-3">
                <span className="text-2xl animate-love-icon-1">💕</span>
                <span className="text-2xl animate-love-icon-2">💖</span>
                <span className="text-2xl animate-love-icon-3">💌</span>
              </div>
            </div>

            {/* Love Progress indicator */}
            <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg`}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-gentle-pulse"></div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading Sweet Messages</span>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mb-2`}>
                <div className="bg-gradient-to-r from-pink-500 to-red-600 h-2 rounded-full animate-love-progress"></div>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Words from the heart just for you!</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes love-float-1 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1); 
              opacity: 0.45;
            }
            33% {
              transform: translateY(-18px) rotate(12deg) scale(1.1);
              opacity: 0.8;
            }
            66% {
              transform: translateY(-30px) rotate(-8deg) scale(0.9);
              opacity: 0.6;
            }
          }
          
          @keyframes love-float-2 {
            0%, 100% { 
              transform: translateY(0px) rotateX(0deg); 
              opacity: 0.4;
            }
            50% { 
              transform: translateY(-22px) rotateX(180deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes love-float-3 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.5;
            }
            25% {
              transform: translateY(-12px) scale(1.2);
              opacity: 0.8;
            }
            75% {
              transform: translateY(-25px) scale(0.8);
              opacity: 0.7;
            }
          }
          
          @keyframes love-float-4 {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
              opacity: 0.35;
            }
            50% { 
              transform: translateY(-20px) translateX(8px) rotate(-15deg); 
              opacity: 0.7;
            }
          }
          
          @keyframes love-float-5 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.45;
            }
            40% {
              transform: translateY(-16px) rotate(25deg);
              opacity: 0.9;
            }
            80% {
              transform: translateY(-8px) rotate(-20deg);
              opacity: 0.6;
            }
          }
          
          @keyframes love-float-6 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.4;
            }
            60% { 
              transform: translateY(-24px) scale(1.3); 
              opacity: 0.8;
            }
          }
          
          @keyframes romantic-float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.5;
            }
            50% { 
              transform: translateY(-18px) rotate(12deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes romantic-float-2 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.45;
            }
            50% { 
              transform: translateY(-22px) scale(1.2); 
              opacity: 0.7;
            }
          }
          
          @keyframes letter-pulse {
            0%, 100% {
              transform: scale(1) rotate(3deg);
              box-shadow: 0 0 25px rgba(236, 72, 153, 0.4);
            }
            50% {
              transform: scale(1.1) rotate(3deg);
              box-shadow: 0 0 40px rgba(236, 72, 153, 0.8);
            }
          }
          
          @keyframes letter-bounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-8px) scale(1.2); }
          }
          
          @keyframes love-bounce {
            0%, 100% { 
              transform: translateY(0px) scale(1) rotate(0deg); 
            }
            50% { 
              transform: translateY(-10px) scale(1.3) rotate(15deg); 
            }
          }
          
          @keyframes love-glow {
            0%, 100% {
              opacity: 1;
              filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.3));
            }
            50% {
              opacity: 1;
              filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.6));
            }
          }
          
          @keyframes love-icon-1 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.7;
            }
            33% { 
              transform: translateY(-6px) rotate(12deg); 
              opacity: 1;
            }
            66% { 
              transform: translateY(-3px) rotate(-8deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes love-icon-2 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-8px) scale(1.4); 
              opacity: 1;
            }
          }
          
          @keyframes love-icon-3 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.7;
            }
            40% { 
              transform: translateY(-5px) rotate(-10deg); 
              opacity: 0.9;
            }
            80% { 
              transform: translateY(-7px) rotate(8deg); 
              opacity: 1;
            }
          }
          
          @keyframes love-progress {
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
          
          .animate-love-float-1 { 
            animation: love-float-1 4s ease-in-out infinite; 
            font-size: 28px;
          }
          .animate-love-float-2 { 
            animation: love-float-2 5s ease-in-out infinite; 
          }
          .animate-love-float-3 { 
            animation: love-float-3 6s ease-in-out infinite; 
            font-size: 32px;
          }
          .animate-love-float-4 { 
            animation: love-float-4 4.5s ease-in-out infinite; 
          }
          .animate-love-float-5 { 
            animation: love-float-5 5.5s ease-in-out infinite; 
            font-size: 30px;
          }
          .animate-love-float-6 { 
            animation: love-float-6 3.5s ease-in-out infinite; 
            font-size: 24px;
          }
          .animate-romantic-float { 
            animation: romantic-float 6s ease-in-out infinite; 
          }
          .animate-romantic-float-2 { 
            animation: romantic-float-2 7s ease-in-out infinite; 
            font-size: 28px;
          }
          .animate-letter-pulse { 
            animation: letter-pulse 2s ease-in-out infinite; 
          }
          .animate-letter-bounce { 
            animation: letter-bounce 1.5s ease-in-out infinite; 
          }
          .animate-love-bounce { 
            animation: love-bounce 1.8s ease-in-out infinite; 
          }
          .animate-love-glow { 
            animation: love-glow 3s ease-in-out infinite; 
          }
          .animate-love-icon-1 { 
            animation: love-icon-1 2s ease-in-out infinite; 
          }
          .animate-love-icon-2 { 
            animation: love-icon-2 2.2s ease-in-out infinite 0.3s; 
          }
          .animate-love-icon-3 { 
            animation: love-icon-3 1.8s ease-in-out infinite 0.6s; 
          }
          .animate-love-progress { 
            animation: love-progress 1.5s ease-out; 
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

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'} overflow-hidden relative`}>
        {/* Floating message elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-12 text-pink-400 opacity-60">
            <MessageCircle size={20} className="animate-message-pop" />
          </div>
          <div className="absolute top-1/4 right-16 text-purple-400 opacity-50">
            <Heart size={18} fill="currentColor" className="animate-heart-beat" />
          </div>
          <div className="absolute bottom-28 left-20 text-yellow-400 opacity-70">
            <Star size={16} fill="currentColor" className="animate-star-shine" />
          </div>
          <div className="absolute top-1/3 right-1/4 text-blue-300 opacity-40">
            <Sparkles size={14} className="animate-sparkle-dance" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-green-400 opacity-60">
            <MessageCircle size={12} className="animate-bubble-float" />
          </div>
        </div>

        <div className="text-center z-10">
          {/* Message envelope loading animation */}
          <div className="relative mb-8">
            <div className="w-28 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg shadow-xl relative animate-envelope-bounce">
              {/* Envelope flap */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-14 border-r-14 border-b-10 border-transparent border-b-purple-300"></div>
              
              {/* Envelope body */}
              <div className={`absolute inset-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded flex items-center justify-center`}>
                <MessageCircle className="w-8 h-8 text-purple-500 animate-pulse" />
              </div>
              
              {/* Love letter hearts */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <Heart size={8} className="text-pink-300" fill="currentColor" />
                  <Heart size={6} className="text-red-300" fill="currentColor" />
                  <Heart size={8} className="text-pink-300" fill="currentColor" />
                </div>
              </div>
              
              {/* Flying hearts */}
              <div className="absolute -top-6 -right-4 text-pink-400 animate-heart-fly">
                <Heart size={14} fill="currentColor" />
              </div>
              <div className="absolute -top-4 -left-3 text-purple-400 animate-heart-fly delay-500">
                <Heart size={12} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Loading Messages
            </span>
          </div>
          <div className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-6`}>
            Reading your love letters...
          </div>

          {/* Message dots animation */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-message-wave"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-message-wave delay-200"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-message-wave delay-400"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-message-wave delay-600"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-message-wave delay-800"></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes message-pop {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(10deg); }
          }
          @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
          @keyframes star-shine {
            0%, 100% { opacity: 0.7; transform: rotate(0deg); }
            50% { opacity: 1; transform: rotate(180deg); }
          }
          @keyframes sparkle-dance {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
            50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
          }
          @keyframes bubble-float {
            0%, 100% { transform: translateY(0px); opacity: 0.6; }
            50% { transform: translateY(-20px); opacity: 1; }
          }
          @keyframes envelope-bounce {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
          }
          @keyframes heart-fly {
            0% { transform: translateY(0px) translateX(0px); opacity: 1; }
            100% { transform: translateY(-40px) translateX(20px); opacity: 0; }
          }
          @keyframes message-wave {
            0%, 100% { transform: translateY(0px); opacity: 1; }
            50% { transform: translateY(-12px); opacity: 0.7; }
          }
          .animate-message-pop { animation: message-pop 2.5s ease-in-out infinite; }
          .animate-heart-beat { animation: heart-beat 1.8s ease-in-out infinite; }
          .animate-star-shine { animation: star-shine 3s ease-in-out infinite; }
          .animate-sparkle-dance { animation: sparkle-dance 2.2s ease-in-out infinite; }
          .animate-bubble-float { animation: bubble-float 3.5s ease-in-out infinite; }
          .animate-envelope-bounce { animation: envelope-bounce 2s ease-in-out infinite; }
          .animate-heart-fly { animation: heart-fly 4s ease-in-out infinite; }
          .animate-message-wave { animation: message-wave 1.5s ease-in-out infinite; }
        `}</style>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
        <div className="container mx-auto px-4 py-8">
          <Link 
            href="/birthday" 
            className={`inline-flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-900/20' : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'} transition-colors px-4 py-3 rounded-xl font-medium mb-6`}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Birthday Hub
          </Link>
          <div className="text-center mt-12">
            <MessageCircle className="text-purple-300 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No messages yet</h2>
            <p className="text-gray-500">Messages will appear here when they&apos;re added to the database.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`center-container ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-300 opacity-60 animate-bounce">
          <Heart size={20} fill="currentColor" />
        </div>
        <div className="absolute top-1/3 right-20 text-purple-400 opacity-50">
          <Sparkles size={25} className="animate-spin-slow" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-blue-300 opacity-60">
          <Star size={18} fill="currentColor" className="animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-1/4 text-pink-400 opacity-40">
          <Heart size={15} fill="currentColor" className="animate-bounce" />
        </div>
      </div>

      <div className="center-content relative z-10">
        {/* Header */}
        <div className="header-section">
          <Link 
            href="/birthday" 
            className={`inline-flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-800/50' : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'} transition-colors px-4 py-3 rounded-xl font-medium`}
          >
            <ArrowLeft size={20} className="mr-3" />
            Back to Birthday Hub
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <MessageCircle className="text-purple-500 w-8 h-8 mr-3" />
              <Heart className="text-yellow-500 w-6 h-6" fill="currentColor" />
              <MessageCircle className="text-purple-500 w-8 h-8 ml-3" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Messages from the Heart
              </span>
            </h1>
            <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Special words written just for you 💕
            </p>
          </div>
        </div>

        {/* Message Navigation */}
        {!showAll && (
          <div className="flex justify-center items-center gap-4 section-spacing">
            <button
              onClick={() => setCurrentMessage(Math.max(0, currentMessage - 1))}
              disabled={currentMessage === 0}
              className={`px-6 py-3 ${isDarkMode ? 'bg-gray-800/80 text-gray-300' : 'bg-white/80 text-gray-700'} backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed min-h-[44px]`}
            >
              ← Previous
            </button>
            <div className="flex gap-2">
              {messages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMessage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentMessage 
                      ? 'bg-purple-500 w-8' 
                      : 'bg-purple-200 hover:bg-purple-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentMessage(Math.min(messages.length - 1, currentMessage + 1))}
              disabled={currentMessage === messages.length - 1}
              className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800/80 text-gray-300' : 'bg-white/80 text-gray-700'} backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next →
            </button>
          </div>
        )}

        {/* Toggle View Button */}
        <div className="text-center card-spacing">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-0.5 min-h-[48px] font-medium cursor-pointer"
          >
            {showAll ? 'Show One at a Time' : 'Show All Messages'}
          </button>
        </div>

        {/* Messages Display */}
        {showAll ? (
          // All messages view
          <div className="grid gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
            {messages.map((msg, index) => {
              const gradients = [
                'from-pink-400 to-rose-600',
                'from-purple-400 to-indigo-600',
                'from-blue-400 to-cyan-600',
                'from-green-400 to-emerald-600',
                'from-orange-400 to-red-600',
                'from-teal-400 to-blue-600'
              ]
              const gradient = gradients[index % gradients.length]
              
              return (
                <div
                  key={msg.id}
                  className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
                        <User className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{msg.author}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(msg.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base sm:text-lg leading-relaxed`}>
                      {msg.message}
                    </p>
                    {msg.video_url && (() => {
                      const videoInfo = getVideoEmbedInfo(msg.video_url)
                      if (!videoInfo) return null
                      
                      return (
                        <div className="mt-6">
                          <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} p-2`}>
                            {videoInfo.type === 'youtube' ? (
                              <iframe
                                src={videoInfo.embedUrl}
                                className="w-full max-w-md mx-auto rounded-lg"
                                style={{ height: '200px', aspectRatio: '16/9' }}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube video"
                              />
                            ) : videoInfo.type === 'googledrive' ? (
                              <iframe
                                src={videoInfo.embedUrl}
                                className="w-full max-w-md mx-auto rounded-lg"
                                style={{ height: '200px', aspectRatio: '16/9' }}
                                frameBorder="0"
                                allow="autoplay"
                                title="Google Drive video"
                              />
                            ) : (
                              <video 
                                controls 
                                className="w-full max-w-md mx-auto rounded-lg"
                                style={{ maxHeight: '300px' }}
                                preload="metadata"
                              >
                                <source src={videoInfo.url} type="video/mp4" />
                                <source src={videoInfo.url} type="video/webm" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Single message view
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            {(() => {
              const gradients = [
                'from-pink-400 to-rose-600',
                'from-purple-400 to-indigo-600',
                'from-blue-400 to-cyan-600',
                'from-green-400 to-emerald-600',
                'from-orange-400 to-red-600',
                'from-teal-400 to-blue-600'
              ]
              const currentGradient = gradients[currentMessage % gradients.length]
              const currentMsg = messages[currentMessage]
              
              return (
                <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden animate-fade-in`}>
                  <div className={`h-2 bg-gradient-to-r ${currentGradient}`}></div>
                  <div className="p-6 sm:p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`icon-container-lg bg-gradient-to-br ${currentGradient} rounded-xl shadow-lg`}>
                        <User className="text-white w-8 h-8" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{currentMsg.author}</h3>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(currentMsg.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentMsg.message}</p>
                    {currentMsg.video_url && (() => {
                      const videoInfo = getVideoEmbedInfo(currentMsg.video_url)
                      if (!videoInfo) return null
                      
                      return (
                        <div className="mb-8">
                          <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} p-3`}>
                            {videoInfo.type === 'youtube' ? (
                              <iframe
                                src={videoInfo.embedUrl}
                                className="w-full max-w-lg mx-auto rounded-lg"
                                style={{ height: '300px', aspectRatio: '16/9' }}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube video"
                              />
                            ) : videoInfo.type === 'googledrive' ? (
                              <iframe
                                src={videoInfo.embedUrl}
                                className="w-full max-w-lg mx-auto rounded-lg"
                                style={{ height: '300px', aspectRatio: '16/9' }}
                                frameBorder="0"
                                allow="autoplay"
                                title="Google Drive video"
                              />
                            ) : (
                              <video 
                                controls 
                                className="w-full max-w-lg mx-auto rounded-lg"
                                style={{ maxHeight: '400px' }}
                                preload="metadata"
                              >
                                <source src={videoInfo.url} type="video/mp4" />
                                <source src={videoInfo.url} type="video/webm" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        </div>
                      )
                    })()}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
                        <Heart className="text-pink-500 w-4 h-4" fill="currentColor" />
                        <span className="text-sm text-pink-700 font-medium">
                          Message {currentMessage + 1} of {messages.length}
                        </span>
                        <Heart className="text-pink-500 w-4 h-4" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-12 mb-8 backdrop-blur-sm rounded-3xl shadow-elegant p-6 max-w-2xl mx-auto ${
    isDarkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/95 border border-white/20'}`}>
          <Heart className="text-yellow-500 mx-auto mb-3 w-8 h-8" fill="currentColor" />
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Every word written with love, every message crafted for you
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Happy Birthday! 🎂✨
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scale-in {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  )
}
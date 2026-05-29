'use client'
import React, { useState, useEffect, useCallback, Suspense } from 'react'
import dynamicImport from 'next/dynamic'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { ArrowLeft, Camera, Heart, Calendar, Image, Grid, List, Sparkles, Box, Gem, Crown, Star, MessageCircle, ChevronUp, X } from 'lucide-react'
import EasterEgg from '../../../components/EasterEgg'
import { useAuth } from '../../../hooks/useAuth'
import { useDarkMode } from '../../../hooks/useDarkMode'


export default function MemoriesPage() {
  const router = useRouter()
  const [memories, setMemories] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [visibleItems, setVisibleItems] = useState(new Set())
  const { isDarkMode } = useDarkMode()
  const { isAuthenticated } = useAuth()

  const getDefaultMemories = () => [
    { id: '1', title: 'Our First Date', description: 'The day everything changed. Coffee, laughter, and the beginning of our beautiful story.', photo_url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80', date_taken: '2024-03-09', order_index: 1 },
    { id: '2', title: 'Sunset at the Beach', description: 'Walking hand in hand as the sun painted the sky in our favorite colors.', photo_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', date_taken: '2024-04-15', order_index: 2 },
    { id: '3', title: 'Cooking Together', description: 'Making a mess in the kitchen but creating perfect memories.', photo_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', date_taken: '2024-05-20', order_index: 3 },
    { id: '4', title: 'Starlit Picnic', description: 'A quiet evening under the stars, just you, me, and endless conversations.', photo_url: 'https://images.unsplash.com/photo-1499540633125-484965b60031?auto=format&fit=crop&w=800&q=80', date_taken: '2024-06-12', order_index: 4 }
  ]

  const fetchMemories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('date_taken', { ascending: false })
      if (error) { setMemories(getDefaultMemories()) }
      else { setMemories(data || getDefaultMemories()) }
    } catch { setMemories(getDefaultMemories()) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) { router.replace('/') }
    else { fetchMemories() }
  }, [isAuthenticated, router, fetchMemories])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (viewMode !== 'timeline') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-memory-id')
            if (itemId) setVisibleItems(prev => new Set([...prev, itemId]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )
    const timelineItems = document.querySelectorAll('[data-memory-id]')
    timelineItems.forEach(item => observer.observe(item))
    return () => timelineItems.forEach(item => observer.unobserve(item))
  }, [viewMode, memories])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'} overflow-hidden relative`}>
        {/* Floating memory elements */}
        <div className="absolute inset-0">
          {/* Memory icons */}
          <div className="absolute top-20 left-[15%] text-purple-400 opacity-45 animate-love-float-1">
            📸
          </div>
          <div className="absolute top-32 right-[20%] text-pink-400 opacity-40 animate-love-float-2">
            <Heart size={28} fill="currentColor" />
          </div>
          <div className="absolute bottom-32 left-[25%] text-blue-400 opacity-50 animate-love-float-3">
            🎞️
          </div>
          <div className="absolute top-1/3 left-[10%] text-pink-300 opacity-35 animate-love-float-4">
            <MessageCircle size={26} />
          </div>
          <div className="absolute bottom-40 right-[15%] text-purple-300 opacity-45 animate-love-float-5">
            🖼️
          </div>
          <div className="absolute top-1/2 right-[35%] text-indigo-400 opacity-40 animate-love-float-6">
            <Sparkles size={24} />
          </div>
        </div>

        <div className="text-center z-10 max-w-lg mx-auto px-6">
          {/* Main loading animation */}
          <div className="relative mb-8">
            {/* Central memory with glow */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl animate-love-pulse transform rotate-12"></div>
              <div className={`absolute inset-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl flex items-center justify-center`}>
                <Camera className="w-8 h-8 text-purple-500 animate-love-spin" />
              </div>
              {/* Orbiting memory elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-purple-500 animate-love-bounce">
                  <Heart size={16} fill="currentColor" />
                </div>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-pink-500 animate-love-bounce" style={{ animationDelay: '0.5s' }}>
                  📷
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-blue-500 animate-love-bounce" style={{ animationDelay: '1s' }}>
                  🎞️
                </div>
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-purple-400 animate-love-bounce" style={{ animationDelay: '1.5s' }}>
                  <Star size={16} />
                </div>
              </div>
            </div>

            {/* Loading message */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-blue-500 bg-clip-text text-transparent animate-love-glow">
                  Loading Our Memories 📷
                </span>
              </h1>
              <p className="text-purple-600 text-lg animate-gentle-pulse mb-4">
                Preparing your beautiful memories...
              </p>
              
              {/* Animated memory dots */}
              <div className="flex justify-center items-center gap-3">
                <span className="text-2xl animate-love-icon-1">📸</span>
                <span className="text-2xl animate-love-icon-2">🎞️</span>
                <span className="text-2xl animate-love-icon-3">🖼️</span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg`}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-gentle-pulse"></div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading Sweet Memories</span>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mb-2`}>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full animate-love-progress"></div>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get ready to relive our beautiful moments!</p>
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
          
          @keyframes love-pulse {
            0%, 100% {
              transform: scale(1) rotate(12deg);
              box-shadow: 0 0 25px rgba(236, 72, 153, 0.4);
            }
            50% {
              transform: scale(1.1) rotate(12deg);
              box-shadow: 0 0 40px rgba(236, 72, 153, 0.8);
            }
          }
          
          @keyframes love-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
          }
          .animate-love-pulse { 
            animation: love-pulse 2s ease-in-out infinite; 
          }
          .animate-love-spin { 
            animation: love-spin 3s linear infinite; 
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
        {/* Floating memory icons */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-12 text-pink-300 opacity-60">
            <Camera size={20} className="animate-float-gentle" />
          </div>
          <div className="absolute top-1/4 right-20 text-purple-400 opacity-50">
            <Image size={16} className="animate-bob-slow" />
          </div>
          <div className="absolute bottom-28 left-20 text-yellow-400 opacity-70">
            <Heart size={18} fill="currentColor" className="animate-pulse-gentle" />
          </div>
          <div className="absolute top-1/3 left-1/3 text-blue-300 opacity-40">
            <Sparkles size={14} className="animate-twinkle" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 text-pink-400 opacity-60">
            <Star size={12} fill="currentColor" className="animate-glow" />
          </div>
        </div>

        <div className="text-center z-10">
          {/* Memory photo loading animation */}
          <div className="relative mb-8">
            <div className={`w-32 h-24 mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg relative overflow-hidden`}>
              {/* Photo frame */}
              <div className="absolute inset-2 bg-gradient-to-br from-purple-200 to-pink-200 rounded flex items-center justify-center">
                <Camera className="w-8 h-8 text-purple-500 animate-pulse" />
              </div>
              
              {/* Loading bars */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-loading-bar"></div>
              </div>
            </div>

            {/* Floating hearts around the photo */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-2 -left-2 text-pink-400 animate-float-up">
                <Heart size={16} fill="currentColor" />
              </div>
              <div className="absolute -top-1 -right-3 text-purple-400 animate-float-up delay-500">
                <Heart size={14} fill="currentColor" />
              </div>
              <div className="absolute -bottom-1 -left-1 text-yellow-400 animate-float-up delay-1000">
                <Heart size={12} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Loading Memories
            </span>
          </div>
          <div className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-6`}>
            Gathering your special moments...
          </div>

          {/* Photo strip animation */}
          <div className="flex justify-center space-x-1">
            <div className="w-8 h-10 bg-gradient-to-b from-purple-300 to-purple-400 rounded animate-slide-up"></div>
            <div className="w-8 h-10 bg-gradient-to-b from-pink-300 to-pink-400 rounded animate-slide-up delay-200"></div>
            <div className="w-8 h-10 bg-gradient-to-b from-blue-300 to-blue-400 rounded animate-slide-up delay-400"></div>
            <div className="w-8 h-10 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded animate-slide-up delay-600"></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float-gentle {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-12px) rotate(5deg); opacity: 1; }
          }
          @keyframes bob-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pulse-gentle {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
          }
          @keyframes glow {
            0%, 100% { opacity: 0.6; box-shadow: 0 0 10px currentColor; }
            50% { opacity: 1; box-shadow: 0 0 20px currentColor; }
          }
          @keyframes loading-bar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes float-up {
            0% { transform: translateY(0px); opacity: 1; }
            100% { transform: translateY(-30px); opacity: 0; }
          }
          @keyframes slide-up {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0px); opacity: 1; }
          }
          .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
          .animate-bob-slow { animation: bob-slow 3s ease-in-out infinite; }
          .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
          .animate-twinkle { animation: twinkle 2.5s ease-in-out infinite; }
          .animate-glow { animation: glow 3s ease-in-out infinite; }
          .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
          .animate-float-up { animation: float-up 3s ease-in-out infinite; }
          .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        `}</style>
      </div>
    )
  }

  if (memories.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
        <div className="container mx-auto px-4 py-8">
          <Link 
            href="/birthday" 
            className={`inline-flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'} transition-colors mb-6`}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Birthday Hub
          </Link>
          <div className="text-center mt-12">
            <Camera className="text-purple-300 w-16 h-16 mx-auto mb-4" />
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>No memories yet</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memories will appear here when they&apos;re added to the database.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`center-container ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-300 opacity-60 animate-float-slow">
          <Heart size={25} fill="currentColor" />
        </div>
        <div className="absolute top-1/3 right-20 text-purple-400 opacity-50">
          <Sparkles size={20} className="animate-spin-slow" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-blue-300 opacity-60">
          <Camera size={22} className="animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-1/4 text-pink-400 opacity-40">
          <Heart size={18} fill="currentColor" className="animate-bounce" />
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
              <Camera className="text-purple-500 w-8 h-8 mr-3" />
              <Heart className="text-yellow-500 w-6 h-6" fill="currentColor" />
              <Camera className="text-purple-500 w-8 h-8 ml-3" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Our Beautiful Memories
              </span>
            </h1>
            <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Every moment captured with love 📸
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center items-center gap-4 card-spacing">
          <div className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-full p-1 shadow-lg`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-full transition-all min-h-[44px] ${
                viewMode === 'grid'
                  ? 'bg-purple-500 text-white shadow-md'
                  : `${isDarkMode ? 'text-purple-400 hover:bg-gray-700' : 'text-purple-600 hover:bg-purple-100'}`
              }`}
            >
              <Grid size={18} className="inline mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-6 py-3 rounded-full transition-all min-h-[44px] ${
                viewMode === 'timeline'
                  ? 'bg-purple-500 text-white shadow-md'
                  : `${isDarkMode ? 'text-purple-400 hover:bg-gray-700' : 'text-purple-600 hover:bg-purple-100'}`
              }`}
            >
              <List size={18} className="inline mr-2" />
              Timeline
            </button>
          </div>
        </div>

        {/* Memories Display */}
        {viewMode === 'grid' ? (
          // Grid view
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto w-full">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedMemory(memory)}
              >
                <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant overflow-hidden hover:shadow-floating transition-elegant`}>
                  {/* Photo placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-200 to-pink-200 relative overflow-hidden">
                    {memory.photo_url ? (
                      <img 
                        src={memory.photo_url} 
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="text-purple-400 w-16 h-16 opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-gray-200 group-hover:text-purple-400' : 'text-gray-800 group-hover:text-purple-600'} transition-colors`}>
                        {memory.title}
                      </h3>
                      {memory.date_taken && (
                        <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar size={14} className="mr-1" />
                          {new Date(memory.date_taken).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      )}
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                      {memory.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Timeline view
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-purple-300 to-pink-300"></div>
              
              {memories.map((memory, index) => (
                <div
                  key={memory.id}
                  data-memory-id={memory.id}
                  className={`relative mb-12 transition-all duration-700 transform ${
                    visibleItems.has(memory.id) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  } ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'} shadow-lg z-10`}></div>
                  
                  {/* Content card */}
                  <div 
                    className={`inline-block w-full md:w-2/5 cursor-pointer group ${
                      index % 2 === 0 ? 'md:ml-0' : 'md:ml-auto'
                    }`}
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group-hover:shadow-2xl transform transition-all duration-300 group-hover:scale-[1.02]`}>
                      {/* Photo */}
                      <div className="aspect-[16/9] bg-gradient-to-br from-purple-200 to-pink-200 relative overflow-hidden">
                        {memory.photo_url ? (
                          <img 
                            src={memory.photo_url} 
                            alt={memory.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="text-purple-400 w-12 h-12 opacity-50" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 sm:p-6 text-left">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-200 group-hover:text-purple-400' : 'text-gray-800 group-hover:text-purple-600'} transition-colors`}>
                            {memory.title}
                          </h3>
                          {memory.date_taken && (
                            <div className={`flex items-center text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                              <Calendar size={14} className="mr-1" />
                              {new Date(memory.date_taken).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          )}
                        </div>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                          {memory.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-12 mb-8 ${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant p-6 max-w-2xl mx-auto`}>
          <Heart className="text-yellow-500 mx-auto mb-3 w-8 h-8" fill="currentColor" />
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
            Every photo tells our story, every memory holds our love
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            Creating precious moments, one memory at a time 📷✨
          </p>
        </div>
      </div>

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo */}
            <div className="aspect-[16/9] bg-gradient-to-br from-purple-200 to-pink-200 relative overflow-hidden rounded-t-3xl">
              {selectedMemory.photo_url ? (
                <img 
                  src={selectedMemory.photo_url} 
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="text-purple-400 w-20 h-20 opacity-50" />
                </div>
              )}
              <button
                onClick={() => setSelectedMemory(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700 text-gray-300 hover:text-white' : 'bg-white/90 hover:bg-gray-100 text-gray-600 hover:text-gray-800'} backdrop-blur-sm`}
                aria-label="Close memory detail"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{selectedMemory.title}</h2>
                {selectedMemory.date_taken && (
                  <div className={`flex items-center ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                    <Calendar size={16} className="mr-2" />
                    {new Date(selectedMemory.date_taken).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-base sm:text-lg`}>
                {selectedMemory.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Easter Eggs */}
      <EasterEgg 
        id="egg-4"
        top="25%"
        right="3%"
        icon={Gem}
        message="A precious memory gem! 💎"
        specialMessage="Every moment with you is a treasure I keep close to my heart"
        size="small"
      />

      <EasterEgg 
        id="egg-5"
        bottom="20%"
        left="10%"
        icon={Camera}
        message="Captured a secret moment! 📸"
        specialMessage="I wish I could capture every smile, every laugh, every beautiful moment we share"
        size="medium"
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transform transition-all duration-300 hover:scale-110 animate-bounce-gentle"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        @keyframes bounce-gentle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
          60% { transform: translateY(-2px); }
        }
      `}</style>
    </div>
  )
}
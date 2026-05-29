'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Music, Heart, Play, Pause, Volume2, ExternalLink, Clock, Sparkles, Headphones } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth'
import { useDarkMode } from '../../../hooks/useDarkMode'

export default function PlaylistPage() {
  const router = useRouter()
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [playlistInfo, setPlaylistInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [audioRef, setAudioRef] = useState(null)
  const { isDarkMode } = useDarkMode()
  const { isAuthenticated } = useAuth()

  // Initialize audio
  useEffect(() => {
    const audio = new Audio()
    audio.volume = 0.7
    audio.addEventListener('ended', () => { setIsPlaying(false); setCurrentSong(null) })
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('play', () => setIsPlaying(true))
    setAudioRef(audio)
    return () => { audio.pause() }
  }, [])

  // Instant auth check + immediate fetch
  useEffect(() => {
    if (!isAuthenticated) { router.replace('/') }
    else { fetchSpotifyPlaylist() }
  }, [isAuthenticated, router])

  const fetchSpotifyPlaylist = async () => {
    try {
      const response = await fetch('/api/playlist')
      if (!response.ok) {
        // Spotify credentials not configured — use fallback silently
        setPlaylist(getFallbackPlaylist())
        setLoading(false)
        return
      }
      const data = await response.json()
      if (data.error) {
        setPlaylist(getFallbackPlaylist())
        setLoading(false)
        return
      }
      setPlaylist(data.tracks)
      setPlaylistInfo({
        name: data.name,
        description: data.description,
        image: data.image
      })
    } catch {
      // Network error — use fallback silently
      setPlaylist(getFallbackPlaylist())
    } finally {
      setLoading(false)
    }
  }

  const getFallbackPlaylist = () => [
    {
      id: 1,
      title: "Dilaw",
      artist: "Maki",
      album: "Dilaw",
      duration: "3:12",
      reason: "This amazing Filipino song reminds me of the golden moments we share together, my cutie ganda. Your smile lights up my world just like this melody.",
      spotify_url: "https://open.spotify.com/track/2ADSh3Mp744n2586tpUtIW",
      preview_url: "https://p.scdn.co/mp3-preview/6c6207cea32368c94e5ca1bbec7f86aeff1d3846?cid=3f398ac31e9548e993b18b641d8667e0",
      gradient: "from-yellow-400 to-orange-500",
      mood: "Uplifting"
    },
    {
      id: 2,
      title: "Off My Face",
      artist: "Justin Bieber",
      album: "Justice",
      duration: "2:36",
      reason: "This song captures how I feel when I'm with you - completely lost in happiness. You make me feel like I'm floating on air.",
      spotify_url: "https://open.spotify.com/track/3T03rPwlL8NVk1yIaxeD8U",
      preview_url: "https://p.scdn.co/mp3-preview/84a0f4fc43b14b81b0a4c37e9d8fbc3fc5b6a90b?cid=3f398ac31e9548e993b18b641d8667e0",
      gradient: "from-purple-400 to-pink-500",
      mood: "Romantic"
    },
    {
      id: 3,
      title: "With You",
      artist: "Chris Brown",
      album: "Exclusive",
      duration: "4:12",
      reason: "Every time I hear this song, I imagine us dancing together. It perfectly describes how I want to spend every moment with you.",
      spotify_url: "https://open.spotify.com/track/5Lgcn7u07bHuqbOtXkN62u",
      preview_url: "https://p.scdn.co/mp3-preview/cd33a11a2a045dcb58969e49e9b976ed30c1bad8?cid=3f398ac31e9548e993b18b641d8667e0",
      gradient: "from-blue-400 to-indigo-500",
      mood: "Romantic"
    },
    {
      id: 4,
      title: "Enchanted (Taylor's Version)",
      artist: "Taylor Swift",
      album: "Speak Now (Taylor's Version)",
      duration: "5:53",
      reason: "This song tells the story of our first meeting - I was enchanted to meet you, and that magic never fades. You still enchant me every day.",
      spotify_url: "https://open.spotify.com/track/3sW3oSbzsfecv9XoUdGs7h",
      preview_url: "https://p.scdn.co/mp3-preview/3e67d6b24b6efa5e7c7d77e2ab94c9d6d7e27a68?cid=3f398ac31e9548e993b18b641d8667e0",
      gradient: "from-purple-400 to-indigo-600",
      mood: "Dreamy"
    },
    {
      id: 5,
      title: "Beautiful In White",
      artist: "Shane Filan",
      album: "Love Always",
      duration: "3:52",
      reason: "This song makes me dream of our future together. I can picture you in white, and my heart fills with so much hope and joy.",
      spotify_url: "https://open.spotify.com/track/43wROOsAEK0F3Fu46Vjn7W",
      preview_url: "https://p.scdn.co/mp3-preview/a8b4b0f7e0c94f5c86f78f906c0a6f27a9d5d1be?cid=3f398ac31e9548e993b18b641d8667e0",
      gradient: "from-red-400 to-pink-500",
      mood: "Romantic"
    }
  ]

  const getMoodColors = (mood) => {
    const moodColorMap = {
      "Romantic": isDarkMode ? "text-red-300 bg-red-900/30" : "text-red-600 bg-red-100",
      "Soulful": isDarkMode ? "text-purple-300 bg-purple-900/30" : "text-purple-600 bg-purple-100",
      "Fun": isDarkMode ? "text-orange-300 bg-orange-900/30" : "text-orange-600 bg-orange-100",
      "Uplifting": isDarkMode ? "text-yellow-300 bg-yellow-900/30" : "text-yellow-600 bg-yellow-100",
      "Emotional": isDarkMode ? "text-indigo-300 bg-indigo-900/30" : "text-indigo-600 bg-indigo-100",
      "Classic": isDarkMode ? "text-gray-300 bg-gray-700/50" : "text-gray-600 bg-gray-100",
      "Happy": isDarkMode ? "text-green-300 bg-green-900/30" : "text-green-600 bg-green-100",
      "Dreamy": isDarkMode ? "text-purple-300 bg-purple-900/30" : "text-purple-600 bg-purple-100"
    }
    return moodColorMap[mood] || (isDarkMode ? "text-gray-300 bg-gray-700/50" : "text-gray-600 bg-gray-100")
  }

  const handleSongClick = (song) => {
    if (!audioRef) {
      console.log('Audio ref not ready')
      return
    }
    
    if (currentSong?.id === song.id) {
      // Same song - toggle play/pause
      if (isPlaying) {
        audioRef.pause()
      } else {
        audioRef.play().catch(error => {
          console.error('Error playing audio:', error)
          setError('Failed to play audio. This might be due to browser autoplay restrictions.')
        })
      }
    } else {
      // New song - load and play
      if (song.preview_url) {
        console.log('Loading song:', song.title, 'Preview URL:', song.preview_url)
        audioRef.src = song.preview_url
        audioRef.load()
        setCurrentSong(song)
        audioRef.play().catch(error => {
          console.error('Error playing audio:', error)
          setError('Failed to play audio. Try clicking play again or check your audio settings.')
        })
      } else {
        // No preview available - just show the song info
        console.log('No preview available for:', song.title)
        setCurrentSong(song)
        setIsPlaying(false)
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'} overflow-hidden relative`}>
        {/* Animated musical background elements */}
        <div className="absolute inset-0">
          {/* Floating musical notes */}
          <div className="absolute top-20 left-[15%] text-purple-400 opacity-30 animate-musical-float-1">
            ♪
          </div>
          <div className="absolute top-32 right-[20%] text-pink-400 opacity-25 animate-musical-float-2">
            ♫
          </div>
          <div className="absolute bottom-32 left-[25%] text-blue-400 opacity-35 animate-musical-float-3">
            ♩
          </div>
          <div className="absolute top-1/3 left-[10%] text-purple-300 opacity-20 animate-musical-float-4">
            ♬
          </div>
          <div className="absolute bottom-40 right-[15%] text-pink-300 opacity-30 animate-musical-float-5">
            ♪
          </div>
          <div className="absolute top-1/2 right-[35%] text-indigo-400 opacity-25 animate-musical-float-6">
            ♫
          </div>
          
          {/* Headphones and music icons */}
          <div className="absolute top-16 right-[10%] text-purple-300 opacity-40 animate-gentle-float">
            <Headphones size={28} />
          </div>
          <div className="absolute bottom-24 left-[12%] text-pink-300 opacity-35 animate-gentle-float-alt">
            <Music size={24} />
          </div>
        </div>

        <div className="text-center z-10 max-w-md mx-auto px-6">
          {/* Main loading animation - Audio Visualizer */}
          <div className="relative mb-8">
            {/* Central music icon with glow */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-musical-pulse"></div>
              <div className={`absolute inset-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center justify-center`}>
                <Music className="w-8 h-8 text-purple-500 animate-gentle-pulse" />
              </div>
              {/* Orbiting musical notes */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-purple-500 text-lg animate-gentle-pulse">♪</div>
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-pink-500 text-sm animate-gentle-pulse" style={{ animationDelay: '0.5s' }}>♫</div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-blue-500 text-lg animate-gentle-pulse" style={{ animationDelay: '1s' }}>♩</div>
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-purple-400 text-sm animate-gentle-pulse" style={{ animationDelay: '1.5s' }}>♬</div>
              </div>
            </div>

            {/* Audio wave visualizer */}
            <div className="flex items-end justify-center gap-1 mb-6 h-16">
              <div className="w-2 bg-gradient-to-t from-purple-400 to-purple-600 rounded-full animate-audio-wave-1" style={{ height: '16px' }}></div>
              <div className="w-2 bg-gradient-to-t from-pink-400 to-pink-600 rounded-full animate-audio-wave-2" style={{ height: '24px' }}></div>
              <div className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full animate-audio-wave-3" style={{ height: '32px' }}></div>
              <div className="w-2 bg-gradient-to-t from-purple-400 to-purple-600 rounded-full animate-audio-wave-4" style={{ height: '20px' }}></div>
              <div className="w-2 bg-gradient-to-t from-pink-400 to-pink-600 rounded-full animate-audio-wave-5" style={{ height: '28px' }}></div>
              <div className="w-2 bg-gradient-to-t from-indigo-400 to-indigo-600 rounded-full animate-audio-wave-6" style={{ height: '36px' }}></div>
              <div className="w-2 bg-gradient-to-t from-purple-500 to-purple-700 rounded-full animate-audio-wave-7" style={{ height: '24px' }}></div>
              <div className="w-2 bg-gradient-to-t from-pink-400 to-pink-600 rounded-full animate-audio-wave-8" style={{ height: '18px' }}></div>
              <div className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full animate-audio-wave-9" style={{ height: '30px' }}></div>
            </div>
          </div>

          {/* Loading text with musical theme */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gentle-glow">
                Loading Your Playlist
              </span>
            </h2>
            <p className="text-purple-600 animate-gentle-pulse mb-4">
              Preparing the perfect mix for you...
            </p>
            
            {/* Musical loading dots */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <span className="text-purple-500 text-lg animate-musical-note-1">♪</span>
              <span className="text-pink-500 text-lg animate-musical-note-2">♫</span>
              <span className="text-blue-500 text-lg animate-musical-note-3">♪</span>
            </div>
          </div>

          {/* Progress indicator */}
          <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg`}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-gentle-pulse"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Connecting to Spotify</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-music-progress"></div>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fetching your curated love songs...</p>
          </div>

          {error && (
            <div className="mt-6 text-sm text-orange-600 bg-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-orange-500">⚠</span>
                <span className="font-medium">Loading Notice</span>
              </div>
              {error}
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes musical-float-1 {
            0%, 100% { 
              transform: rotate(0deg) scale(1); 
              opacity: 0.3;
            }
            50% { 
              transform: rotate(10deg) scale(1.1); 
              opacity: 0.6;
            }
          }
          
          @keyframes musical-float-2 {
            0%, 100% { 
              transform: rotate(0deg) scale(1); 
              opacity: 0.25;
            }
            33% {
              transform: rotate(-8deg) scale(1.05);
              opacity: 0.5;
            }
            66% {
              transform: rotate(5deg) scale(1.1);
              opacity: 0.7;
            }
          }
          
          @keyframes musical-float-3 {
            0%, 100% { 
              transform: rotate(0deg) scale(1); 
              opacity: 0.35;
            }
            40% {
              transform: rotate(12deg) scale(1.1);
              opacity: 0.6;
            }
            80% {
              transform: rotate(-6deg) scale(0.9);
              opacity: 0.8;
            }
          }
          
          @keyframes musical-float-4 {
            0%, 100% { 
              transform: rotate(0deg) scale(1); 
              opacity: 0.2;
            }
            50% { 
              transform: rotate(-15deg) scale(1.05); 
              opacity: 0.5;
            }
          }
          
          @keyframes musical-float-5 {
            0%, 100% { 
              transform: rotate(0deg) scale(1); 
              opacity: 0.3;
            }
            25% {
              transform: rotate(8deg) scale(1.2);
              opacity: 0.6;
            }
            75% {
              transform: rotate(-12deg) scale(0.8);
              opacity: 0.4;
            }
          }
          
          @keyframes musical-float-6 {
            0%, 100% { 
              transform: rotate(0deg) scale(1); 
              opacity: 0.25;
            }
            60% { 
              transform: rotate(20deg) scale(1.1); 
              opacity: 0.7;
            }
          }
          
          @keyframes musical-pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
            }
            50% {
              transform: scale(1.1);
              box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
            }
          }
          
          @keyframes musical-bounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-8px) scale(1.2); }
          }
          
          @keyframes audio-wave-1 {
            0%, 100% { height: 16px; }
            50% { height: 32px; }
          }
          
          @keyframes audio-wave-2 {
            0%, 100% { height: 24px; }
            50% { height: 16px; }
          }
          
          @keyframes audio-wave-3 {
            0%, 100% { height: 32px; }
            50% { height: 48px; }
          }
          
          @keyframes audio-wave-4 {
            0%, 100% { height: 20px; }
            50% { height: 40px; }
          }
          
          @keyframes audio-wave-5 {
            0%, 100% { height: 28px; }
            50% { height: 20px; }
          }
          
          @keyframes audio-wave-6 {
            0%, 100% { height: 36px; }
            50% { height: 52px; }
          }
          
          @keyframes audio-wave-7 {
            0%, 100% { height: 24px; }
            50% { height: 36px; }
          }
          
          @keyframes audio-wave-8 {
            0%, 100% { height: 18px; }
            50% { height: 28px; }
          }
          
          @keyframes audio-wave-9 {
            0%, 100% { height: 30px; }
            50% { height: 22px; }
          }
          
          @keyframes musical-note-1 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.6;
            }
            33% { 
              transform: translateY(-6px) rotate(10deg); 
              opacity: 1;
            }
            66% { 
              transform: translateY(-3px) rotate(-5deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes musical-note-2 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.7;
            }
            50% { 
              transform: translateY(-8px) scale(1.3); 
              opacity: 1;
            }
          }
          
          @keyframes musical-note-3 {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.6;
            }
            40% { 
              transform: translateY(-4px) rotate(-8deg); 
              opacity: 0.9;
            }
            80% { 
              transform: translateY(-7px) rotate(3deg); 
              opacity: 1;
            }
          }
          
          .animate-musical-float-1 { 
            animation: musical-float-1 4s ease-in-out infinite; 
            will-change: transform, opacity;
            font-size: 24px;
            font-weight: bold;
          }
          .animate-musical-float-2 { 
            animation: musical-float-2 5s ease-in-out infinite; 
            will-change: transform, opacity;
            font-size: 20px;
            font-weight: bold;
          }
          .animate-musical-float-3 { 
            animation: musical-float-3 6s ease-in-out infinite; 
            will-change: transform, opacity;
            font-size: 26px;
            font-weight: bold;
          }
          .animate-musical-float-4 { 
            animation: musical-float-4 4.5s ease-in-out infinite; 
            will-change: transform, opacity;
            font-size: 22px;
            font-weight: bold;
          }
          .animate-musical-float-5 { 
            animation: musical-float-5 5.5s ease-in-out infinite; 
            will-change: transform, opacity;
            font-size: 18px;
            font-weight: bold;
          }
          .animate-musical-float-6 { 
            animation: musical-float-6 3.5s ease-in-out infinite; 
            will-change: transform, opacity;
            font-size: 20px;
            font-weight: bold;
          }
          .animate-musical-pulse { 
            animation: musical-pulse 2s ease-in-out infinite; 
            will-change: transform, box-shadow;
          }
          .animate-musical-bounce { 
            animation: musical-bounce 1.5s ease-in-out infinite; 
            will-change: transform;
          }
          .animate-audio-wave-1 { 
            animation: audio-wave-1 0.8s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-2 { 
            animation: audio-wave-2 1.2s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-3 { 
            animation: audio-wave-3 0.9s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-4 { 
            animation: audio-wave-4 1.1s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-5 { 
            animation: audio-wave-5 0.7s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-6 { 
            animation: audio-wave-6 1.0s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-7 { 
            animation: audio-wave-7 1.3s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-8 { 
            animation: audio-wave-8 0.8s ease-in-out infinite; 
            will-change: height;
          }
          .animate-audio-wave-9 { 
            animation: audio-wave-9 1.1s ease-in-out infinite; 
            will-change: height;
          }
          .animate-musical-note-1 { 
            animation: musical-note-1 2s ease-in-out infinite; 
            will-change: transform, opacity;
          }
          .animate-musical-note-2 { 
            animation: musical-note-2 2.2s ease-in-out infinite 0.3s; 
            will-change: transform, opacity;
          }
          .animate-musical-note-3 { 
            animation: musical-note-3 1.8s ease-in-out infinite 0.6s; 
            will-change: transform, opacity;
          }
          
          .animate-gentle-float {
            animation: gentle-float 6s ease-in-out infinite;
            will-change: transform, opacity;
          }
          
          .animate-gentle-float-alt {
            animation: gentle-float-alt 7s ease-in-out infinite;
            will-change: transform, opacity;
          }
          
          .animate-gentle-bounce {
            animation: gentle-bounce 2s ease-in-out infinite;
            will-change: transform;
          }
          
          .animate-gentle-pulse {
            animation: gentle-pulse 3s ease-in-out infinite;
            will-change: transform, opacity;
          }
          
          .animate-gentle-glow {
            animation: gentle-glow 4s ease-in-out infinite;
            will-change: transform, opacity, filter;
          }
          
          .animate-gentle-spin {
            animation: gentle-spin 12s linear infinite;
            will-change: transform;
          }
          
          .animate-music-progress {
            animation: music-progress 1.5s ease-out;
          }
          
          @keyframes gentle-float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.4;
            }
            50% { 
              transform: translateY(-15px) rotate(5deg); 
              opacity: 0.7;
            }
          }
          
          @keyframes gentle-float-alt {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
              opacity: 0.35;
            }
            33% {
              transform: translateY(-12px) translateX(4px) rotate(-3deg);
              opacity: 0.6;
            }
            66% {
              transform: translateY(-20px) translateX(-2px) rotate(8deg);
              opacity: 0.8;
            }
          }
          
          @keyframes gentle-bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          @keyframes gentle-pulse {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(1); 
            }
            50% { 
              opacity: 0.8; 
              transform: scale(1.1); 
            }
          }
          
          @keyframes gentle-glow {
            0%, 100% {
              opacity: 0.8;
              transform: scale(1);
              filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.3));
            }
            50% {
              opacity: 1;
              transform: scale(1.02);
              filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.5));
            }
          }
          
          @keyframes music-progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          @keyframes gentle-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }


  const totalDuration = playlist.reduce((total, song) => {
    const [minutes, seconds] = song.duration.split(':').map(Number)
    return total + minutes * 60 + seconds
  }, 0)

  const formatTotalDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`center-container ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-300 opacity-60 animate-gentle-float">
          <Music size={25} />
        </div>
        <div className="absolute top-1/3 right-20 text-purple-400 opacity-50">
          <Sparkles size={20} className="animate-gentle-spin" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-blue-300 opacity-60">
          <Headphones size={22} className="animate-gentle-pulse" />
        </div>
        <div className="absolute top-1/2 right-1/4 text-pink-400 opacity-40">
          <Heart size={18} fill="currentColor" className="animate-gentle-pulse" />
        </div>
      </div>

      <div className="center-content relative z-10">
        {/* Header */}
        <div className="header-section">
          <Link 
            href="/birthday" 
            className={`inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors px-4 py-3 rounded-xl ${isDarkMode ? 'hover:bg-purple-900/50' : 'hover:bg-purple-50'} font-medium`}
          >
            <ArrowLeft size={20} className="mr-3" />
            Back to Birthday Hub
          </Link>
          
          <div className="text-center content-section">
            <div className="inline-flex items-center justify-center mb-4">
              <Music className="text-purple-500 w-8 h-8 mr-3" />
              <Heart className="text-yellow-500 w-6 h-6" fill="currentColor" />
              <Music className="text-purple-500 w-8 h-8 ml-3" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {playlistInfo?.name || "Songs That Remind Me of You"}
              </span>
            </h1>
            <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
              {playlistInfo?.description || "Every melody tells our story, my Looove 🎵"}
            </p>
            
            {/* Preview availability notice */}
            <div className="max-w-2xl mx-auto audio-preview px-2 sm:px-0">
              <div className={`${isDarkMode ? 'bg-blue-900/30 border-blue-700 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800'} rounded-lg p-4 text-sm`}>
                <span className="font-medium">🎵 Audio Previews:</span> Most songs show "No preview" - this is normal with Spotify's free tier. 
                Click the Spotify links to listen to full songs on Spotify! Songs with previews will play 30-second clips.
              </div>
            </div>
            
            {/* Playlist stats */}
            <div className={`inline-flex items-center gap-6 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg`}>
              <div className="flex items-center gap-2">
                <Music className="text-purple-500 w-4 h-4" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {playlist.length} {playlist.length === 1 ? 'song' : 'songs'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-purple-500 w-4 h-4" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {formatTotalDuration(totalDuration)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current playing */}
        {currentSong && (
          <div className="mb-8 animate-slide-in">
            <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-floating overflow-hidden card-spacing`}>
              <div className={`h-2 bg-gradient-to-r ${currentSong.gradient}`}></div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`icon-container-lg bg-gradient-to-br ${currentSong.gradient} rounded-2xl shadow-lg`}>
                    {isPlaying ? (
                      <Pause className="text-white w-8 h-8" />
                    ) : (
                      <Play className="text-white w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{currentSong.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentSong.artist}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-4 py-2 rounded-full text-xs font-medium ${getMoodColors(currentSong.mood)}`}>
                        {currentSong.mood}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentSong.duration}</span>
                      {!currentSong.preview_url && (
                        <span className={`text-xs ${isDarkMode ? 'text-orange-300 bg-orange-900/30' : 'text-orange-600 bg-orange-100'} px-4 py-2 rounded-full font-medium`}>
                          No preview
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic leading-relaxed`}>
                  &ldquo;{currentSong.reason}&rdquo;
                </p>
                <div className="flex gap-3 mt-4">
                  <a
                    href={currentSong.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Spotify
                  </a>
                  <a
                    href={currentSong.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Playlist */}
        <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-floating overflow-hidden max-w-5xl mx-auto w-full`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} flex items-center playlist-header`}>
              <Volume2 className="mr-3 text-purple-500" />
              Our Love Playlist
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Click any song to see why it reminds me of you</p>
          </div>
          
          <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
            {playlist.map((song, index) => (
              <div
                key={song.id}
                onClick={() => handleSongClick(song)}
                className={`p-4 sm:p-6 ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-purple-50'} transition-all cursor-pointer group ${
                  currentSong?.id === song.id ? (isDarkMode ? 'bg-gray-700/50 border-l-4 border-purple-400' : 'bg-purple-50 border-l-4 border-purple-500') : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                      {currentSong?.id === song.id && isPlaying ? (
                        <Pause className="w-5 h-5 text-purple-600" />
                      ) : currentSong?.id === song.id ? (
                        <Play className="w-5 h-5 text-purple-600" />
                      ) : (
                        <span className="group-hover:hidden">{index + 1}</span>
                      )}
                      {currentSong?.id !== song.id && (
                        <Play className="w-5 h-5 text-purple-600 hidden group-hover:block" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} group-hover:text-purple-600 transition-colors`}>
                        {song.title}
                      </h3>
                      <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>{song.artist}</span>
                        <span>•</span>
                        <span>{song.album}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-xs font-medium ${getMoodColors(song.mood)}`}>
                      {song.mood}
                    </span>
                    {!song.preview_url && (
                      <span className="text-xs text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full font-medium">
                        No preview
                      </span>
                    )}
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {song.duration}
                    </span>
                  </div>
                </div>
                
                {currentSong?.id === song.id && (
                  <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-purple-200'} animate-fade-in`}>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic leading-relaxed mb-4`}>
                      &ldquo;{song.reason}&rdquo;
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={song.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Spotify
                      </a>
                      <a
                        href={song.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        YouTube
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-12 mb-8 ${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant p-6 max-w-2xl mx-auto`}>
          <Heart className="text-yellow-500 mx-auto mb-3 w-8 h-8" fill="currentColor" />
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium mb-2`}>
            Music is the language of love, and these songs speak my heart
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Every time I hear these songs, I think of you and smile 🎵💕
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }
      `}</style>
    </div>
  )
}
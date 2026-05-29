'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Globe, Plane, Heart, Clock, MapPin } from 'lucide-react'
import EasterEgg from '../../../components/EasterEgg'
import { useDarkMode } from '../../../hooks/useDarkMode'


export default function JourneyPage() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [countdown, setCountdown] = useState('')
  const [togetherCountdown, setTogetherCountdown] = useState('')
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Instant auth check — no delay
  const isAuthenticated = typeof window !== 'undefined'
    ? sessionStorage.getItem('birthday_authenticated') === 'true'
    : false

  useEffect(() => {
    if (!isAuthenticated) router.replace('/')
  }, [isAuthenticated, router])

  // Countdown to departure and time together
  useEffect(() => {
    const calculateCountdowns = () => {
      const now = new Date()
      
      // Departure: June 15, 2025, 8:30 AM Manila time (UTC+8)
      const departure = new Date('2025-06-15T08:30:00+08:00')
      
      // Return: June 30, 2025, 11:15 PM Manila time (UTC+8)
      const returnFlight = new Date('2025-06-30T23:15:00+08:00')
      
      // Time until departure
      const diffToDeparture = departure - now
      
      if (diffToDeparture > 0) {
        const days = Math.floor(diffToDeparture / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diffToDeparture % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diffToDeparture % (1000 * 60 * 60)) / (1000 * 60))
        
        setCountdown(`${days} ${days === 1 ? 'day' : 'days'}, ${hours} ${hours === 1 ? 'hour' : 'hours'}, ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`)
      } else if (now < returnFlight) {
        setCountdown("We're together! ✈️💕")
      } else {
        setCountdown("Until our next adventure...")
      }
      
      // Time together (15 days)
      const arrival = new Date('2025-06-15T20:30:00+10:00') // Melbourne time
      const timeTogetherMs = returnFlight - arrival
      const daysTogether = Math.floor(timeTogetherMs / (1000 * 60 * 60 * 24))
      
      if (now < departure) {
        setTogetherCountdown(`${daysTogether} ${daysTogether === 1 ? 'day' : 'days'} together waiting for us!`)
      } else if (now >= departure && now < returnFlight) {
        const remainingTogether = Math.floor((returnFlight - now) / (1000 * 60 * 60 * 24))
        setTogetherCountdown(`${remainingTogether} ${remainingTogether === 1 ? 'day' : 'days'} left together!`)
      } else {
        setTogetherCountdown(`${daysTogether} beautiful ${daysTogether === 1 ? 'day' : 'days'} we had together 💕`)
      }
    }

    calculateCountdowns()
    const timer = setInterval(calculateCountdowns, 1000 * 60) // Update every minute
    return () => clearInterval(timer)
  }, [])

  // Initialize Three.js globe - simplified approach to avoid version conflicts
  useEffect(() => {
    if (!isAuthenticated || !canvasRef.current) return

    const initGlobe = async () => {
      try {
        // Dynamic imports to avoid SSR issues
        const THREE = await import('three')

        // Create scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000011)
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 10)
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true
        })
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6)
        renderer.setPixelRatio(window.devicePixelRatio)
        
        // Create Earth sphere with realistic texture
        const earthGeometry = new THREE.SphereGeometry(5, 64, 32)
        
        // Create fallback Earth texture
        const createFallbackTexture = () => {
          const canvas = document.createElement('canvas')
          canvas.width = 2048
          canvas.height = 1024
          const ctx = canvas.getContext('2d')
          
          // Create realistic ocean gradient
          const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          oceanGradient.addColorStop(0, '#4682B4')    // Steel blue at poles
          oceanGradient.addColorStop(0.2, '#1E90FF')  // Dodger blue
          oceanGradient.addColorStop(0.5, '#0066CC')  // Deep ocean blue
          oceanGradient.addColorStop(0.8, '#1E90FF')  // Dodger blue
          oceanGradient.addColorStop(1, '#4682B4')    // Steel blue at poles
          
          ctx.fillStyle = oceanGradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          
          // Draw recognizable continents
          const drawContinent = (points, color) => {
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.moveTo(points[0][0], points[0][1])
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i][0], points[i][1])
            }
            ctx.closePath()
            ctx.fill()
          }
          
          // North America
          drawContinent([
            [300, 150], [500, 100], [650, 150], [700, 250], [680, 350], 
            [600, 400], [500, 420], [400, 400], [350, 350], [300, 250]
          ], '#228B22')
          
          // South America
          drawContinent([
            [500, 450], [580, 420], [620, 500], [640, 600], [620, 750], 
            [580, 820], [520, 850], [480, 800], [470, 700], [480, 550]
          ], '#32CD32')
          
          // Europe
          drawContinent([
            [950, 180], [1100, 150], [1150, 200], [1120, 280], [1050, 300], [950, 250]
          ], '#90EE90')
          
          // Africa
          drawContinent([
            [950, 300], [1100, 320], [1150, 380], [1180, 500], [1160, 650], 
            [1120, 750], [1080, 800], [1020, 780], [980, 700], [960, 600], 
            [950, 450], [940, 350]
          ], '#228B22')
          
          // Asia
          drawContinent([
            [1150, 100], [1600, 80], [1800, 150], [1850, 250], [1800, 350], 
            [1700, 400], [1500, 420], [1300, 400], [1150, 300], [1120, 200]
          ], '#32CD32')
          
          // Australia
          drawContinent([
            [1600, 650], [1750, 630], [1800, 680], [1780, 750], [1720, 780], [1650, 760]
          ], '#90EE90')
          
          // Greenland
          drawContinent([
            [700, 50], [800, 60], [820, 150], [780, 200], [720, 180], [700, 100]
          ], '#F0F8FF')
          
          // Philippines (highlighted)
          ctx.fillStyle = '#FFD700'
          ctx.beginPath()
          ctx.arc(1620, 350, 15, 0, 2 * Math.PI)
          ctx.fill()
          
          // Major islands
          ctx.fillStyle = '#228B22'
          ctx.fillRect(1150, 550, 30, 80) // Madagascar
          ctx.fillRect(1750, 250, 25, 60) // Japan
          ctx.fillRect(950, 170, 20, 25)  // UK
          ctx.fillRect(1850, 750, 25, 40) // New Zealand
          
          // Ice caps
          ctx.fillStyle = '#F0F8FF'
          ctx.fillRect(0, 0, canvas.width, 50) // Arctic
          ctx.fillRect(0, canvas.height - 60, canvas.width, 60) // Antarctic
          
          return new THREE.CanvasTexture(canvas)
        }
        
        // Create material and try to load real Earth texture
        const earthMaterial = new THREE.MeshPhongMaterial({
          shininess: 10,
          specular: 0x111111,
          transparent: false
        })
        
        // Create texture loader
        const textureLoader = new THREE.TextureLoader()
        
        // Try multiple Earth texture sources
        const earthTextureSources = [
          'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_atmos_2048.jpg',
          'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
        ]
        
        let textureLoaded = false
        
        const tryLoadTexture = (index = 0) => {
          if (index >= earthTextureSources.length || textureLoaded) {
            // Use fallback if all sources fail
            if (!textureLoaded) {
              console.log('Using fallback Earth texture')
              earthMaterial.map = createFallbackTexture()
              earthMaterial.needsUpdate = true
            }
            return
          }
          
          textureLoader.load(
            earthTextureSources[index],
            (texture) => {
              console.log(`Successfully loaded Earth texture from source ${index + 1}`)
              textureLoaded = true
              earthMaterial.map = texture
              earthMaterial.needsUpdate = true
            },
            undefined,
            (error) => {
              console.warn(`Failed to load texture from source ${index + 1}:`, error)
              // Try next source
              tryLoadTexture(index + 1)
            }
          )
        }
        
        // Start trying to load textures
        tryLoadTexture()
        
        const earth = new THREE.Mesh(earthGeometry, earthMaterial)
        scene.add(earth)
        
        // Add starfield background
        const createStars = () => {
          const starsGeometry = new THREE.BufferGeometry()
          const starPositions = []
          
          for (let i = 0; i < 5000; i++) {
            const radius = 100
            const x = (Math.random() - 0.5) * radius
            const y = (Math.random() - 0.5) * radius
            const z = (Math.random() - 0.5) * radius
            starPositions.push(x, y, z)
          }
          
          starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
          
          const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            sizeAttenuation: false
          })
          
          return new THREE.Points(starsGeometry, starsMaterial)
        }
        
        const stars = createStars()
        scene.add(stars)
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
        directionalLight.position.set(10, 5, 10)
        scene.add(directionalLight)
        
        // Convert lat/lon to 3D coordinates
        const latLonToVector3 = (lat, lon, radius) => {
          const phi = (90 - lat) * (Math.PI / 180)
          const theta = (lon + 180) * (Math.PI / 180)
          
          return new THREE.Vector3(
            -((radius) * Math.sin(phi) * Math.cos(theta)),
            (radius) * Math.cos(phi),
            (radius) * Math.sin(phi) * Math.sin(theta)
          )
        }
        
        // Add city markers as children of earth so they rotate together
        const manilaPos = latLonToVector3(14.5995, 120.9842, 5.1)
        const melbournePos = latLonToVector3(-37.8136, 144.9631, 5.1)
        
        // Manila marker
        const manilaMarker = new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xff4444 })
        )
        manilaMarker.position.copy(manilaPos)
        earth.add(manilaMarker) // Add to earth instead of scene
        
        // Melbourne marker  
        const melbourneMarker = new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0x44ff88 })
        )
        melbourneMarker.position.copy(melbournePos)
        earth.add(melbourneMarker) // Add to earth instead of scene
        
        // Create flight path as child of earth so it rotates together
        const midPoint = new THREE.Vector3()
        midPoint.addVectors(manilaPos, melbournePos).multiplyScalar(0.5)
        midPoint.normalize().multiplyScalar(7) // Higher arc over the Pacific
        
        const curve = new THREE.QuadraticBezierCurve3(manilaPos, midPoint, melbournePos)
        const points = curve.getPoints(100)
        const pathGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const pathMaterial = new THREE.LineBasicMaterial({ 
          color: 0xffd700, 
          linewidth: 5,
          transparent: true,
          opacity: 1.0
        })
        
        const flightPath = new THREE.Line(pathGeometry, pathMaterial)
        earth.add(flightPath) // Add to earth instead of scene
        
        // Store all references for updating during rotation
        
        // Interactive controls
        let isDragging = false
        let previousMouse = { x: 0, y: 0 }
        
        const handleMouseDown = (event) => {
          isDragging = true
          previousMouse = { x: event.clientX, y: event.clientY }
        }
        
        const handleMouseMove = (event) => {
          if (!isDragging) return
          
          const deltaX = event.clientX - previousMouse.x
          const deltaY = event.clientY - previousMouse.y
          
          earth.rotation.y += deltaX * 0.005
          earth.rotation.x += deltaY * 0.005
          
          // Constrain x rotation
          earth.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, earth.rotation.x))
          
          // Markers and flight path will rotate with the earth automatically since they're children
          
          previousMouse = { x: event.clientX, y: event.clientY }
        }
        
        const handleMouseUp = () => {
          isDragging = false
        }
        
        // Add event listeners
        const canvas = canvasRef.current
        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove) 
        canvas.addEventListener('mouseup', handleMouseUp)
        canvas.addEventListener('mouseleave', handleMouseUp)
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
          e.preventDefault()
          const touch = e.touches[0]
          handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY })
        })
        
        canvas.addEventListener('touchmove', (e) => {
          e.preventDefault()
          const touch = e.touches[0]
          handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
        })
        
        canvas.addEventListener('touchend', (e) => {
          e.preventDefault()
          handleMouseUp()
        })
        
        // Store references
        sceneRef.current = { scene, camera, renderer, earth, flightPath, manilaMarker, melbourneMarker }
        rendererRef.current = renderer
        
        // Animation loop
        const animate = () => {
          animationFrameRef.current = requestAnimationFrame(animate)
          
          // Gentle auto-rotation when not being dragged
          if (!isDragging) {
            earth.rotation.y += 0.002
            // Markers and flight path rotate automatically with earth
          }
          
          // Animate markers
          const time = Date.now() * 0.001
          manilaMarker.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
          melbourneMarker.scale.setScalar(1 + Math.sin(time * 2 + Math.PI) * 0.1)
          
          // Render the scene
          renderer.render(scene, camera)
        }
        
        animate()
        
        // Handle window resize
        const handleResize = () => {
          const width = window.innerWidth * 0.8
          const height = window.innerHeight * 0.6
          
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
        
        window.addEventListener('resize', handleResize)
        
        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize)
          if (canvas) {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseup', handleMouseUp)
            canvas.removeEventListener('mouseleave', handleMouseUp)
            canvas.removeEventListener('touchstart', handleMouseDown)
            canvas.removeEventListener('touchmove', handleMouseMove)
            canvas.removeEventListener('touchend', handleMouseUp)
          }
        }
        
      } catch (error) {
        console.error('Error initializing globe:', error)
        // Show fallback message if Three.js fails to load
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#1e40af'
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            ctx.fillStyle = 'white'
            ctx.font = '20px Arial'
            ctx.textAlign = 'center'
            ctx.fillText('Loading Globe...', canvasRef.current.width / 2, canvasRef.current.height / 2)
          }
        }
      }
    }

    initGlobe()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAuthenticated])

  // Enhanced loading screen with journey theme
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900' : 'bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100'} overflow-hidden relative`}>
        {/* Floating travel elements */}
        <div className="absolute inset-0">
          {/* Airplanes and travel symbols */}
          <div className="absolute top-20 left-[15%] text-blue-400 opacity-50 animate-journey-float-1">
            <Plane size={24} />
          </div>
          <div className="absolute top-32 right-[20%] text-indigo-400 opacity-45 animate-journey-float-2">
            <Globe size={28} />
          </div>
          <div className="absolute bottom-32 left-[25%] text-purple-400 opacity-55 animate-journey-float-3">
            ✈️
          </div>
          <div className="absolute top-1/3 left-[10%] text-blue-300 opacity-40 animate-journey-float-4">
            🌏
          </div>
          <div className="absolute bottom-40 right-[15%] text-indigo-300 opacity-50 animate-journey-float-5">
            <Plane size={20} />
          </div>
          <div className="absolute top-1/2 right-[35%] text-purple-300 opacity-45 animate-journey-float-6">
            ⭐
          </div>
          
          {/* Additional travel elements */}
          <div className="absolute top-16 right-[10%] text-blue-400 opacity-55 animate-travel-float">
            <Globe size={32} />
          </div>
          <div className="absolute bottom-24 left-[12%] text-indigo-400 opacity-50 animate-travel-float-2">
            🛫
          </div>
          <div className="absolute top-3/4 right-[25%] text-purple-400 opacity-40 animate-travel-float-3">
            🌍
          </div>
        </div>

        <div className="text-center z-10 max-w-lg mx-auto px-6">
          {/* Main globe animation */}
          <div className="relative mb-8">
            {/* Central globe with glow */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full animate-globe-pulse"></div>
              <div className={`absolute inset-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center justify-center`}>
                <div className="text-2xl animate-globe-bounce">🌏</div>
              </div>
              {/* Orbiting travel elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-blue-500 animate-travel-bounce">
                  <Plane size={18} />
                </div>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-indigo-500 animate-travel-bounce" style={{ animationDelay: '0.5s' }}>
                  ✈️
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-purple-400 animate-travel-bounce" style={{ animationDelay: '1s' }}>
                  ⭐
                </div>
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-blue-400 animate-travel-bounce" style={{ animationDelay: '1.5s' }}>
                  <Heart className="w-4 h-4" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Loading message */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 bg-clip-text text-transparent animate-journey-glow">
                  Plotting Our Journey ✈️
                </span>
              </h1>
              <p className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} text-lg animate-gentle-pulse mb-4`}>
                Mapping the path to your heart across the globe...
              </p>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg`}>
              <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-indigo-200'} rounded-full h-2 mb-2`}>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-journey-progress"></div>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`}>Loading flight path: Manila → Melbourne</p>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes journey-float-1 { 
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); } 
            33% { transform: translate(30px, -30px) rotate(120deg); } 
            66% { transform: translate(-20px, 20px) rotate(240deg); } 
          }
          @keyframes journey-float-2 { 
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); } 
            33% { transform: translate(-30px, -20px) rotate(-120deg); } 
            66% { transform: translate(25px, 30px) rotate(-240deg); } 
          }
          @keyframes journey-float-3 { 
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); } 
            50% { transform: translate(-25px, -35px) rotate(180deg); } 
          }
          @keyframes journey-float-4 { 
            0%, 100% { transform: translate(0px, 0px); } 
            50% { transform: translate(20px, -25px); } 
          }
          @keyframes journey-float-5 { 
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); } 
            50% { transform: translate(-30px, 20px) rotate(180deg); } 
          }
          @keyframes journey-float-6 { 
            0%, 100% { transform: translate(0px, 0px); } 
            50% { transform: translate(15px, 25px); } 
          }
          @keyframes travel-float { 
            0%, 100% { transform: translateY(0px) rotate(0deg); } 
            50% { transform: translateY(-20px) rotate(360deg); } 
          }
          @keyframes travel-float-2 { 
            0%, 100% { transform: translateY(0px) rotate(0deg); } 
            50% { transform: translateY(-15px) rotate(-180deg); } 
          }
          @keyframes travel-float-3 { 
            0%, 100% { transform: translateY(0px); } 
            50% { transform: translateY(-25px); } 
          }
          @keyframes globe-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(59, 130, 246, 0.4); }
            50% { transform: scale(1.1); box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
          }
          @keyframes globe-bounce { 
            0%, 100% { transform: translateY(0px); } 
            50% { transform: translateY(-8px); } 
          }
          @keyframes travel-bounce { 
            0%, 100% { transform: translateY(0px) scale(1); } 
            50% { transform: translateY(-5px) scale(1.1); } 
          }
          @keyframes journey-glow { 
            0%, 100% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3)); } 
            50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)); } 
          }
          @keyframes journey-progress { 
            0% { width: 0%; } 
            100% { width: 100%; } 
          }
          @keyframes gentle-pulse { 
            0%, 100% { opacity: 0.7; } 
            50% { opacity: 1; } 
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-journey-float-1 { animation: journey-float-1 8s ease-in-out infinite; }
          .animate-journey-float-2 { animation: journey-float-2 6s ease-in-out infinite; }
          .animate-journey-float-3 { animation: journey-float-3 10s ease-in-out infinite; }
          .animate-journey-float-4 { animation: journey-float-4 7s ease-in-out infinite; }
          .animate-journey-float-5 { animation: journey-float-5 9s ease-in-out infinite; }
          .animate-journey-float-6 { animation: journey-float-6 11s ease-in-out infinite; }
          .animate-travel-float { animation: travel-float 5s ease-in-out infinite; }
          .animate-travel-float-2 { animation: travel-float-2 6s ease-in-out infinite; }
          .animate-travel-float-3 { animation: travel-float-3 4s ease-in-out infinite; }
          .animate-globe-pulse { animation: globe-pulse 2s ease-in-out infinite; }
          .animate-globe-bounce { animation: globe-bounce 1.5s ease-in-out infinite; }
          .animate-travel-bounce { animation: travel-bounce 2s ease-in-out infinite; }
          .animate-journey-glow { animation: journey-glow 3s ease-in-out infinite; }
          .animate-journey-progress { animation: journey-progress 2s ease-out; }
          .animate-gentle-pulse { animation: gentle-pulse 3s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900' : 'bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100'} relative overflow-hidden`}>
      {/* Static background stars - no Math.random in render to avoid re-renders */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {[
          { top: '5%', left: '12%', delay: '0s', dur: '3s' },
          { top: '15%', left: '35%', delay: '0.5s', dur: '2.5s' },
          { top: '8%', left: '68%', delay: '1s', dur: '4s' },
          { top: '22%', left: '82%', delay: '0.3s', dur: '3.5s' },
          { top: '38%', left: '5%', delay: '1.5s', dur: '2s' },
          { top: '45%', left: '50%', delay: '0.8s', dur: '3s' },
          { top: '60%', left: '25%', delay: '2s', dur: '2.5s' },
          { top: '72%', left: '75%', delay: '1.2s', dur: '4s' },
          { top: '85%', left: '42%', delay: '0.4s', dur: '3s' },
          { top: '90%', left: '10%', delay: '1.8s', dur: '2s' },
        ].map((star, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-gray-400' : 'bg-indigo-200'} rounded-full animate-pulse`}
            style={{ top: star.top, left: star.left, animationDelay: star.delay, animationDuration: star.dur }}
          />
        ))}
      </div>


      {/* Main Content */}
      <div className="center-content relative z-10">
        <div className="header-section">
          <Link 
            href="/birthday" 
            className={`inline-flex items-center ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300 hover:bg-gray-800/50' : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'} transition-colors px-4 py-3 rounded-xl font-medium`}
          >
            <ArrowLeft size={20} className="mr-3" />
            Back to Birthday Hub
          </Link>
        </div>
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <Globe className="text-indigo-500 w-12 h-12 mr-3" />
            <Plane className="text-blue-500 w-8 h-8" />
            <Heart className="text-yellow-500 w-10 h-10 ml-3" fill="currentColor" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Journey to You
            </span>
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
            An interactive experience showing our path to reunion across the globe 🌏✈️💕
          </p>
        </div>

        {/* Journey Information Container */}
        <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 max-w-6xl mx-auto`}>
          {/* Top Row - Countdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`${isDarkMode ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-100'} rounded-2xl p-6 text-center`}>
              <Clock className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>Until We're Together</h3>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-2`}>{countdown}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Philippine Airlines PR 123 • June 15, 2025 • 8:30 AM
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-pink-900/30 border-pink-700' : 'bg-pink-50 border-pink-100'} rounded-2xl p-6 text-center`}>
              <Heart className="w-8 h-8 text-yellow-500 mx-auto mb-3" fill="currentColor" />
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>Time Together</h3>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} mb-2`}>{togetherCountdown}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                15 precious days in Melbourne
              </div>
            </div>
          </div>

          {/* Bottom Row - Flight Details (Full Width) */}
          <div className={`${isDarkMode ? 'bg-gradient-to-r from-indigo-900/30 to-pink-900/30 border-gray-700' : 'bg-gradient-to-r from-indigo-50 to-pink-50 border-gray-100'} rounded-2xl p-6`}>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-6 text-center flex items-center justify-center gap-2`}>
              <Plane className="w-6 h-6 text-indigo-500" />
              Flight Details
              <Plane className="w-6 h-6 text-pink-500 transform rotate-180" />
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Outbound */}
              <div className={`${isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'} rounded-xl p-4 border-l-4 border-indigo-500`}>
                <div className="flex items-center mb-3">
                  <Plane className="w-6 h-6 text-indigo-500 mr-3" />
                  <span className={`font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} text-lg`}>MNL → MEL</span>
                </div>
                <div className="space-y-2">
                  <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Philippine Airlines PR 123</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>📅 June 15, 2025</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>🛫 8:30 AM - NAIA Terminal 1</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>🛬 8:30 PM - Melbourne Tullamarine T1</div>
                </div>
              </div>
              
              {/* Return */}
              <div className={`${isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'} rounded-xl p-4 border-l-4 border-pink-500`}>
                <div className="flex items-center mb-3">
                  <Plane className="w-6 h-6 text-pink-500 mr-3 transform rotate-180" />
                  <span className={`font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} text-lg`}>MEL → MNL</span>
                </div>
                <div className="space-y-2">
                  <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Philippine Airlines PR 456</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>📅 June 30, 2025</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>🛫 11:15 PM - Melbourne Tullamarine T1</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>🛬 5:45 AM+1 - NAIA Terminal 1</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Globe */}
        <div className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto`}>
          <h3 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-6`}>
            Our Flight Path Across The World 🌏
          </h3>
          
          <div className="flex justify-center">
            <canvas 
              ref={canvasRef}
              className="rounded-2xl shadow-lg max-w-full h-auto"
              style={{ maxHeight: '60vh' }}
            />
          </div>
          
          {/* Interactive Instructions */}
          <div className={`mt-4 ${isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'} rounded-xl p-4 text-center`}>
            <div className={`text-sm ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'} font-medium mb-2`}>
              🖱️ <strong>Interactive Globe:</strong> Drag to rotate • Explore our path across the world!
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              Red marker: Manila 🇵🇭 • Green marker: Melbourne 🇦🇺 • Golden line: Your flight path ✈️
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className={`${isDarkMode ? 'bg-red-900/30' : 'bg-red-50'} rounded-xl p-4`}>
              <MapPin className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className={`font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Manila, Philippines</div>
              <div className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>Where our hearts began</div>
            </div>
            <div className={`${isDarkMode ? 'bg-teal-900/30' : 'bg-teal-50'} rounded-xl p-4`}>
              <MapPin className="w-6 h-6 text-teal-500 mx-auto mb-2" />
              <div className={`font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Melbourne, Australia</div>
              <div className={`text-sm ${isDarkMode ? 'text-teal-300' : 'text-teal-700'}`}>Where we'll be reunited</div>
            </div>
          </div>
        </div>

        {/* Love Message */}
        <div className={`text-center mt-12 ${isDarkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-purple-100 to-pink-100'} rounded-3xl p-8 mb-4 max-w-4xl mx-auto`}>
          <Heart className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" fill="currentColor" />
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic leading-relaxed`}>
            "I know you're excited about traveling together! I made this page so we can visualize our journey and plan for when we'll be together again.
            This shows some sample travel details - you can customize it with your own plans. Can't wait to see you soon! 💕"
          </p>
          <div className={`mt-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} font-semibold`}>
            13,026 kilometers of love connecting our hearts ✈️💝
          </div>
        </div>
      </div>

      {/* Hidden Easter Egg */}
      <EasterEgg 
        id="egg-6"
        top="30%"
        right="15%"
        message="Look who's planning our reunion! 🌍✈️"
        size="small"
      />
    </div>
  )
}
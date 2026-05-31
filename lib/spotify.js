// lib/spotify.js
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID || 'your_playlist_id_here' // Replace with your playlist ID

/**
 * Get Spotify access token using client credentials flow
 */
async function getSpotifyAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    body: 'grant_type=client_credentials'
  })

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token')
  }

  const data = await response.json()
  return data.access_token
}

/**
 * Fetch playlist data from Spotify API
 */
export async function getPlaylistData() {
  try {
    const accessToken = await getSpotifyAccessToken()

    const response = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch playlist data')
    }

    const playlist = await response.json()

    // Transform the data to match your existing structure
    const transformedTracks = playlist.tracks.items.map((item, index) => {
      const track = item.track
      const durationMs = track.duration_ms
      const minutes = Math.floor(durationMs / 60000)
      const seconds = Math.floor((durationMs % 60000) / 1000).toString().padStart(2, '0')

      return {
        id: index + 1,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        duration: `${minutes}:${seconds}`,
        spotify_url: track.external_urls.spotify,
        preview_url: track.preview_url || getAlternativePreview(track.name, track.artists[0]?.name),
        image: track.album.images[0]?.url,
        reason: getPersonalReason(track.name, track.artists[0]?.name), // We'll add personal reasons
        gradient: getGradientForTrack(index), // Generate gradients
        mood: getMoodForTrack(track.name, track.artists[0]?.name) // Assign moods
      }
    })

    return {
      name: playlist.name,
      description: playlist.description,
      tracks: transformedTracks,
      total_tracks: playlist.tracks.total,
      image: playlist.images[0]?.url
    }
  } catch (error) {
    console.error('Error fetching playlist:', error)
    return null
  }
}

/**
 * Get alternative preview URLs for tracks that don't have Spotify previews
 * Since most songs don't have previews on free tier, we return null
 * and handle this gracefully in the UI by showing "No preview" badges
 */
function getAlternativePreview(trackName, artistName) {
  // Most songs won't have previews available - this is completely normal
  // with Spotify's free tier and many tracks simply don't have preview URLs
  return null
}

/**
 * Get personal reason for each track (you can customize these)
 */
function getPersonalReason(trackName, artistName) {
  // Add your personal reasons here based on track names
  const reasons = {
    'Perfect': "Because you are perfect to me in every way. This song plays in my head every time I see you smile.",
    'All of Me': "You have all of me - my heart, my soul, my everything. This song captures how completely I love you.",
    "Can't Help Myself": "I can't help myself when it comes to you! This classic always makes me think of dancing with you.",
    'Golden': "You're golden like sunshine, brightening every day. This song feels like pure joy - just like being with you.",
    'Make You Feel My Love': "I'd do anything to make you feel my love. This version gives me chills every time.",
    'At Last': "At last, I found you! This timeless classic perfectly captures how I felt when we first met.",
    'Thinking Out Loud': "When we're old and grey, I'll still love you the same. This song is our future together.",
    'Here Comes the Sun': "You are my sunshine after every storm. This Beatles classic reminds me that everything is better with you."
  }

  return reasons[trackName] || `This song reminds me of you and brings a smile to my face every time I hear it. ${artistName} really knows how to capture emotions in music.`
}

/**
 * Generate gradient colors for tracks
 */
function getGradientForTrack(index) {
  const gradients = [
    "from-green-400 to-blue-500",
    "from-red-400 to-pink-500",
    "from-orange-400 to-red-500",
    "from-yellow-400 to-orange-500",
    "from-purple-400 to-indigo-600",
    "from-indigo-400 to-purple-600",
    "from-teal-400 to-green-500",
    "from-yellow-300 to-yellow-600",
    "from-pink-400 to-purple-500",
    "from-blue-400 to-indigo-500"
  ]

  return gradients[index % gradients.length]
}

/**
 * Assign mood based on track characteristics
 */
function getMoodForTrack(trackName, artistName) {
  const moods = ["Romantic", "Soulful", "Fun", "Uplifting", "Emotional", "Classic", "Happy", "Dreamy", "Energetic", "Peaceful"]

  // You can customize this logic based on the actual tracks
  if (trackName.toLowerCase().includes('love') || trackName.toLowerCase().includes('perfect')) return "Romantic"
  if (artistName.toLowerCase().includes('adele') || artistName.toLowerCase().includes('legend')) return "Soulful"
  if (trackName.toLowerCase().includes('dance') || trackName.toLowerCase().includes('happy')) return "Fun"
  if (trackName.toLowerCase().includes('sun') || trackName.toLowerCase().includes('golden')) return "Uplifting"
  if (artistName.toLowerCase().includes('beatles') || artistName.toLowerCase().includes('etta')) return "Classic"

  return moods[Math.floor(Math.random() * moods.length)]
}
// Made By Krishna Patil
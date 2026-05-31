# 🎉 Birthday Surprise - Interactive Web Experience

A personalized, interactive web application for celebrating special occasions. Built with Next.js and featuring 3D games, multimedia experiences, and heartfelt content designed to create memorable moments.

<div align="center">
  <a href="https://kriss2012.github.io/birthday-surprise/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Click%20Here-pink?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</div>

## 🔐 Demo Access

**Try it now:** Visit the [Live Demo](https://kriss2012.github.io/birthday-surprise/) or run the app locally, visit `http://localhost:3000` and use password **`demo123`** to access the experience.

> **⚠️ Important:** Change this password in `app/page.js` before deploying to production!

![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.160.0-green)
![Supabase](https://img.shields.io/badge/Supabase-2.56.0-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-blue)

## ✨ Features

### 🎮 **Interactive Mini Games**
- **Hearts Across Distance** - 3D adventure game with heart collection mechanics
- **Memory Match** - Love-themed card matching game with scoring
- **Quick Hearts** - Fast-paced reflex game with falling hearts
- Game statistics tracking and high score persistence

### 💌 **Multimedia Messages**
- **Birthday Messages** - Heartfelt messages with integrated video support
- **Multi-format Video Support**:
  - YouTube embeds
  - Google Drive video integration
  - Direct video files (MP4, WebM, MOV)
  - Supabase signed URLs
- Responsive video players with fallback handling

### 🎵 **Musical Experience**
- **Our Playlist** - Curated songs with Spotify integration
- Audio visualizations and interactive controls
- Personal music journey with meaningful tracks

### 📸 **Memory Gallery**
- **Photo Gallery** - Grid and timeline view options
- Interactive gallery with smooth transitions
- Cherished moments showcase with fallback demo content

### 🌍 **Journey Visualization**
- **Interactive 3D Globe** - Visualizing paths and connections
- Geographic storytelling with Three.js
- Beautiful orbital animations

### 🧠 **Love Quiz**
- Personalized relationship questions
- Score tracking and fun insights
- Educational relationship content

### 🎨 **User Experience**
- **Dark/Light Mode Toggle** - Seamless theme switching
- **Responsive Design** - Perfect on all devices
- **Smooth Animations** - Framer Motion powered transitions
- **Easter Eggs** - Hidden interactive surprises
- **Discovery Tracking** - Progress monitoring system

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for data storage - optional)
- Spotify Developer Account (for playlist feature - optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/birthday-surprise.git
   cd birthday-surprise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file and configure your settings:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Required for database features
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Optional for playlist feature
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_PLAYLIST_ID=your_spotify_playlist_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Access & Authentication

### Landing Page
The application starts with a password-protected landing page. Users must enter the correct password to access the birthday experience.

**Default Flow:**
1. Visit the landing page
2. Enter the authentication password (default: demo123)
3. Access granted to the birthday hub
4. Navigate through various interactive sections

### Navigation Structure
```
/ (Landing Page - Password Protected)
├── /birthday (Main Hub)
│   ├── /birthday/messages (Video Messages)
│   ├── /birthday/memories (Photo Gallery)
│   ├── /birthday/games (Mini Games)
│   ├── /birthday/playlist (Music Player)
│   ├── /birthday/quiz (Love Quiz)
│   └── /birthday/journey (3D Globe)
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.x** - Type-safe development
- **TailwindCSS 4.x** - Modern utility-first CSS framework

### 3D & Animation
- **Three.js 0.160.0** - 3D graphics and WebGL
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components for R3F
- **three-globe** - 3D globe visualizations
- **Framer Motion** - Advanced animations and gestures

### Backend & Storage
- **Supabase** - Backend as a Service
- **PostgreSQL** - Relational database (via Supabase)
- **Real-time subscriptions** - Live data updates

### UI & Icons
- **Lucide React** - Beautiful, customizable icons
- **Custom Components** - Reusable UI components
- **Responsive Design** - Mobile-first approach

### Development Tools
- **ESLint** - Code linting and quality
- **Turbopack** - Next.js build optimization
- **PostCSS** - CSS processing

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 **Mobile devices** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktops** (1024px+)
- 🖥️ **Large screens** (1440px+)

### Key Responsive Features
- Adaptive layouts for all screen sizes
- Touch-friendly game controls
- Optimized video playback
- Mobile-first navigation
- Performance optimizations for lower-end devices

## 🎯 Performance Optimizations

### React Performance
- **Custom Hooks** - Reusable logic extraction (`useAuth`, `useGameStats`, `useDarkMode`)
- **Component Memoization** - React.memo for expensive renders
- **Hook Optimization** - useCallback and useMemo for optimal re-renders

### Game Performance  
- **60fps Gameplay** - RequestAnimationFrame optimization
- **GPU Acceleration** - CSS transforms and will-change hints
- **Memory Management** - Proper cleanup for Three.js scenes

### Loading Optimization
- **Lazy Loading** - Dynamic imports for heavy components
- **Progressive Loading** - Skeleton screens and loading states
- **Image Optimization** - Next.js Image component with WebP support

### Bundle Optimization
- **Code Splitting** - Route-based and component-based splitting
- **Tree Shaking** - Remove unused code
- **Asset Optimization** - Compressed images and optimized fonts

## 🔧 Custom Hooks

### `useAuth()`
Manages authentication state and session handling.

```javascript
const { isAuthenticated, isLoading } = useAuth()
```

### `useGameStats()`
Centralizes game statistics and high score management.

```javascript
const { gameStats, refreshStats } = useGameStats()
```

### `useDarkMode()`
Handles theme switching with system preference detection.

```javascript
const { isDarkMode, toggleDarkMode, isLoading } = useDarkMode()
```

## 🎮 Games Architecture

### Hearts Across Distance
- **3D Movement System** - WASD/Arrow key controls
- **Collision Detection** - Physics-based heart collection
- **Progressive Difficulty** - Adaptive challenge system
- **Victory Rewards** - Video messages on completion

### Memory Match
- **Card Flip Animation** - Smooth CSS transitions
- **Scoring Algorithm** - Move-based performance tracking
- **Pattern Recognition** - Love-themed icon matching

### Quick Hearts
- **Real-time Spawning** - Dynamic heart generation
- **Reflex Training** - Fast-paced clicking mechanics
- **Score Persistence** - LocalStorage high score tracking

## 📊 Data Management

### Supabase Integration
- **Real-time Database** - PostgreSQL with live updates
- **Authentication** - Row Level Security (RLS)
- **Storage** - File uploads and signed URLs
- **API** - RESTful and real-time subscriptions

### State Management
- **React Hooks** - Local component state
- **Context API** - Theme and auth state
- **LocalStorage** - Game scores and user preferences
- **SessionStorage** - Temporary session data

### Database Schema (Optional)
If you want to integrate with Supabase for dynamic content, here are the table schemas:

```sql
-- Memories table for photo gallery
CREATE TABLE public.memories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NULL,
  photo_url text NULL,
  date_taken date NULL,
  order_index integer NULL,
  created_at timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT memories_pkey PRIMARY KEY (id)
);

-- Messages table for birthday messages
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  author text NOT NULL,
  message text NOT NULL,
  is_visible boolean NULL DEFAULT true,
  created_at timestamp without time zone NULL DEFAULT now(),
  video_url text NULL,
  CONSTRAINT messages_pkey PRIMARY KEY (id)
);

-- Quiz attempts tracking
CREATE TABLE public.quiz_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  score integer NOT NULL,
  total integer NOT NULL,
  answers jsonb NULL,
  created_at timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT quiz_attempts_pkey PRIMARY KEY (id)
);

-- Access logging
CREATE TABLE public.access_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  accessed_at timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT access_logs_pkey PRIMARY KEY (id)
);
```

**Note**: The application works with or without these tables. If tables don't exist, it falls back to static/demo content.

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Start production server
npm start
```

### Environment Variables
Required environment variables for production:
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

### Platform Deployment
- **Vercel** - Recommended (automatic deployments)
- **Netlify** - Static site hosting
- **Docker** - Containerized deployment
- **Self-hosted** - Custom server deployment

## 🔮 Future Enhancements

### Planned Features
- [ ] **Mobile Touch Controls** - Enhanced mobile game experience
- [ ] **PWA Features** - Offline capabilities and app installation
- [ ] **Multiplayer Games** - Real-time multiplayer functionality
- [ ] **Voice Messages** - Audio message integration
- [ ] **Social Sharing** - Share memories and achievements

### Performance Goals
- 🎯 **60fps** consistent gameplay across all devices
- ⚡ **50-70%** faster loading times
- 📱 **Enhanced mobile** performance and battery optimization
- 🧠 **40-60%** memory usage reduction

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity
- Write meaningful commit messages
- Test across different devices
- Optimize for performance

## 🔧 Customization

### Personalizing the Experience

1. **Change the Password**: Update the `SECRET_PASSWORD` in `app/page.js`
2. **Update Personal Content**: 
   - Modify quiz questions in `app/birthday/quiz/page.js`
   - Replace placeholder messages in `app/birthday/messages/page.js`
   - Update personal references throughout the application
3. **Configure Spotify Playlist**: Add your playlist ID to the environment variables
4. **Database Setup**: Configure your own Supabase instance for dynamic content

### Environment Variables

Required for full functionality:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_PLAYLIST_ID=your_spotify_playlist_id
```

## 🔒 Security Notes

- Change the default password (`demo123`) before deployment
- Keep your environment variables secure and never commit them to version control
- Regenerate any API keys if you fork this project
- Consider using environment-specific configurations for production

## 📄 License

This project is open source and available under the MIT License. Feel free to use it for your own special occasions!

## 🎨 Design Philosophy

This project embodies the concept of **"Digital Love Language"** - using technology to express emotions, create connections, and celebrate relationships across distances. Every interaction, animation, and feature is designed to convey care, thoughtfulness, and personal connection.

### Key Design Principles
- **Emotional Resonance** - Every feature tells a story
- **Interactive Storytelling** - User engagement drives narrative
- **Performance Excellence** - Smooth, responsive experiences
- **Accessibility** - Inclusive design for all users
- **Personal Touch** - Customized, meaningful content

---

Built with ❤️ using Next.js, Three.js, and lots of creative energy.

*"Technology can help us create meaningful connections and celebrate the people we care about."*

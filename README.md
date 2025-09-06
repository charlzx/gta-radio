# GTA Radio - Live Radio Experience

A professional-grade radio streaming app that recreates the authentic GTA radio experience with real-time synchronized playback, advanced user features, and modern design. Features Spotify-style navigation, volume controls, favorites, and much more.

![GTA Radio Preview](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.13-cyan)

## ✨ Features

### 🎵 **Core Radio Experience**
- **🔴 Live Synchronized Playback** - All users hear the same content at the same time
- **🎵 Real-time Track Detection** - Shows current song/DJ segments with timestamps
- **🎛️ Volume Control** - Slider and mute controls with persistent settings
- **⏯️ Player Controls** - Next/previous track navigation with multiple button sizes

### 🎯 **User Experience**
- **🔍 Real-time Search** - Search stations by name with instant filtering
- **❤️ Favorites System** - Save and manage favorite radio stations
- **📻 Recently Played** - Track and revisit your last 5 played stations
- **🎵 Mini Player** - Persistent player that appears when scrolling
- **🎯 Focus Mode** - Fullscreen immersive listening experience

### 🎨 **Modern Interface**
- **📱 Responsive Design** - Seamless experience on desktop, tablet, and mobile
- **🎨 Glassmorphism UI** - Modern frosted glass design with smooth animations
- **� Game Navigation** - Browse between different GTA games and their stations
- **📋 Spotify-style Lists** - Familiar interface for browsing stations

### 🏗️ **Technical Excellence**
- **� Modular Architecture** - Clean component separation and reusability
- **⚡ Performance Optimized** - Efficient state management and rendering
- **🔧 Developer Experience** - Modern tooling with hot reloading and linting

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/charlzx/gta-radio.git
cd gta-radio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

### Synchronized Radio System
The app uses a "radio epoch" timestamp to ensure all users hear synchronized content:

```javascript
const radioEpoch = new Date('2024-01-01T00:00:00Z').getTime();
const elapsed = now - radioEpoch;
const currentTime = (elapsed % (station.duration * 1000)) / 1000;
```

### Component Architecture
- **Modular Design** - Separated components for maintainability and reusability
- **State Management** - React hooks with comprehensive audio and UI state
- **Data Separation** - Games and station data in dedicated modules

## 📁 Project Structure

```
gta-radio/
├── public/              # Static assets (favicons, manifest)
├── src/
│   ├── components/      # Modular React components
│   │   ├── GameCard.jsx           # Game selection cards
│   │   ├── StationCard.jsx        # Station display cards
│   │   ├── StationListItem.jsx    # Spotify-style station rows
│   │   ├── NowPlayingCard.jsx     # Sidebar player interface
│   │   ├── FocusMode.jsx          # Fullscreen player
│   │   ├── VolumeControl.jsx      # Volume slider and mute
│   │   ├── SearchFilter.jsx       # Real-time search and filtering
│   │   ├── RecentlyPlayedCard.jsx # Recently played stations
│   │   ├── MiniPlayer.jsx         # Scroll-triggered mini player
│   │   └── PlayPauseButton.jsx    # Reusable play/pause button
│   ├── data/
│   │   └── games.js     # Game and station data structure
│   ├── App.jsx          # Main application component
│   ├── index.css        # Tailwind CSS imports
│   └── main.jsx         # React entry point
├── index.html           # HTML template
└── vite.config.js       # Vite configuration
```

## 🎵 Adding Radio Stations

### 1. Update Game Data
Add station data to `src/data/games.js`:

```javascript
export const games = {
  vcs: {
    stations: [
      {
        id: 'station-id',
        name: 'Station Name',
        logo: 'https://example.com/logo.png',
        audioUrl: 'https://example.com/audio.mp3',
        duration: 3600, // seconds - CRITICAL for sync
        tracklist: [
          { type: 'DJ', artist: 'DJ Name', title: 'Intro', startTime: 0, endTime: 15 },
          { type: 'Song', artist: 'Artist', title: 'Track', startTime: 15, endTime: 180 }
        ]
      }
    ]
  }
}
```

### 2. Audio Requirements
- **Format**: MP3 (optimal browser compatibility)
- **CORS**: Must allow cross-origin requests
- **Duration**: Accurate to the second for sync calculations
- **Looping**: Should loop seamlessly for continuous playback

### 3. Component Integration
New stations automatically appear in:
- ✅ Game selection interface
- ✅ Station grid and list views
- ✅ Search and filtering
- ✅ Recently played tracking
- ✅ Favorites system

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Latest React with modern hooks and enhanced performance
- **Vite 7** - Lightning-fast development server and optimized builds
- **Tailwind CSS 4** - Utility-first styling with glassmorphism design

### Key Libraries
- **react-icons** - Comprehensive icon library with consistent styling
- **HTML5 Audio API** - Native audio playback with synchronization control

### Development Tools
- **ESLint** - Modern linting with React 19 support
- **VS Code** - Optimized development environment
- **Hot Module Replacement** - Instant updates during development

## 🎨 Design System

### Glassmorphism Components
- **Glass panels**: `bg-white/15 backdrop-blur-xl border border-white/20`
- **Pink accents**: `bg-pink-500`, `text-pink-400` for interactive elements
- **Live indicators**: Animated red dots with `animate-blink` CSS animation
- **Hover effects**: `hover:scale-105 transition-all duration-300`

### Component Patterns
- **Button sizes**: Small, medium, large variants for different contexts
- **Selection states**: Ring overlays and opacity changes for active items
- **Loading states**: Opacity and pointer-events for disabled states
- **Responsive grids**: Mobile-first design with breakpoint scaling

### Layout Structure
```
├── Background Layer (game-specific imagery)
├── Glassmorphism Overlay (backdrop blur)
├── Grid Layout (responsive columns)
│   ├── Sidebar (Now Playing + Recently Played)
│   └── Main Content (Games/Stations + Search)
└── Floating Elements (Mini Player, Focus Mode)
```

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start dev server with HMR
npm run build    # Production build
npm run lint     # ESLint checking
npm run preview  # Preview production build
```

### Key Dependencies
- `react-icons` - Comprehensive icon library for UI consistency
- `@tailwindcss/vite` - Tailwind CSS integration with Vite
- Modern ESLint configuration with React 19 support and best practices

## 📸 Screenshots

*Coming soon - Screenshots of the modern interface, game selection, and player controls*

## 🎮 Currently Available

### **Vice City Stories (Fully Implemented)**
- Flash FM - Classic hits and upbeat tracks
- V-Rock - Rock and metal music
- Emotion 98.3 - R&B and soul music  
- The Wave 103 - New wave and electronic
- VCFL - Classical and orchestral music
- Paradise FM - Reggae and Caribbean music
- VCPR - Talk radio and comedy shows
- *(More stations coming soon)*

### **Other Games (Architecture Ready)**
- Grand Theft Auto: Vice City
- Grand Theft Auto: San Andreas  
- Grand Theft Auto IV
- Grand Theft Auto V

## 🚧 Roadmap

### 🎯 **Current Features (Implemented)**
- ✅ Synchronized radio playback across users
- ✅ Volume control with mute functionality
- ✅ Real-time search and filtering
- ✅ Favorites system with persistent state
- ✅ Recently played tracking
- ✅ Mini player with scroll detection
- ✅ Focus mode for immersive experience
- ✅ Spotify-style station navigation
- ✅ Modular component architecture
- ✅ Mobile-responsive design

### 🔮 **Upcoming Features**
- [ ] **Enhanced Audio Features**
  - [ ] Crossfade transitions between tracks
  - [ ] Equalizer controls
  - [ ] Audio quality selection
- [ ] **Expanded Game Library**
  - [ ] GTA San Andreas radio stations
  - [ ] GTA V radio stations  
  - [ ] GTA III classic stations
- [ ] **User Personalization**
  - [ ] User accounts and profiles
  - [ ] Playlist creation
  - [ ] Listening history analytics
- [ ] **Technical Enhancements**
  - [ ] PWA (Progressive Web App) support
  - [ ] Offline mode for downloaded content
  - [ ] Real-time chat during listening
- [ ] **Platform Expansion**
  - [ ] React Native mobile app
  - [ ] Desktop app with Electron
  - [ ] Browser extension for quick access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎮 Game Credits

Grand Theft Auto series © Rockstar Games. This is a fan project for educational purposes.

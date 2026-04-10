# GTA Radio - Live Radio Experience

A modern web application that recreates the authentic Grand Theft Auto radio experience with real-time synchronized playback across all users. Built with React, Vite, and Tailwind CSS, featuring glassmorphism design, responsive interfaces, and advanced audio management.

![GTA Radio Preview](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### **Core Radio Experience**
- **Live Synchronized Playback** - All users hear the same content at the same time
- **Real-time Track Detection** - Shows current song/DJ segments with timestamps
- **Volume Control** - Slider and mute controls with persistent settings
- **Player Controls** - Next/previous track navigation with multiple button sizes
- **Dynamic Title Updates** - Browser tab title changes based on what's currently playing

### **User Experience**
- **Real-time Search** - Search stations by name with instant filtering
- **Favorites System** - Save and manage favorite radio stations with localStorage persistence
- **Recently Played** - Track and revisit your last 5 played stations
- **Mini Player** - Persistent player that appears when scrolling
- **Focus Mode** - Fullscreen immersive listening experience
- **Smart Station Display** - Shows only active stations in quick access, with "Coming Soon" for others

### **Modern Interface**
- **Responsive Design** - Seamless experience on desktop, tablet, and mobile
- **Glassmorphism UI** - Modern frosted glass design with smooth animations and enhanced overlays
- **Game Navigation** - Browse between different GTA games with banner backgrounds and smart fallbacks
- **Spotify-style Lists** - Familiar interface for browsing stations
- **Banner Integration** - Choose your era cards now use game banners as full background images with subtle overlays
- **Particle Backdrop** - Subtle, animated particles with parallax for a living dark background (respects reduced motion)
- ** Mobile Polish** - Tighter section spacing on phones, responsive grids, improved footer layout

### **Technical Excellence**
- ** Modular Architecture** - Clean component separation and reusability
- **Performance Optimized** - Efficient state management and rendering
- **Developer Experience** - Modern tooling with hot reloading and linting

## Quick Start

### **Prerequisites**
- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser with HTML5 Audio support
- Internet connection for external audio streams

### **Installation & Setup**
```bash
# 1. Clone the repository
git clone https://github.com/charlzx/gta-radio.git
cd gta-radio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:5173 (opens automatically)
```

### **Production Deployment**
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel (recommended)
npx vercel --prod
```

### **First Run Experience**
1. **Home Page** - Choose your GTA era from the game selection cards
2. **Radio Interface** - Browse stations in grid or list view
3. **Audio Playback** - Click any station to start synchronized streaming
4. **Features** - Try search, favorites, focus mode, and mobile layouts

## Architecture

### Synchronized Radio System
The app uses a "radio epoch" timestamp to ensure all users hear synchronized content:

```javascript
const radioEpoch = new Date('2024-01-01T00:00:00Z').getTime();
const elapsed = now - radioEpoch;
const currentTime = (elapsed % (station.duration * 1000)) / 1000;
```

### Dynamic Title Updates
The browser tab title updates in real-time based on the current playback state:

```javascript
// Examples of dynamic title formats:
" Hall & Oates - Out of Touch | Flash FM"     // Currently playing song
" Welcome to Flash | Flash FM"               // DJ segment
"Flash FM - GTA Radio"                          // Station selected but paused
"GTA Radio"                                     // Default state
```

### Component Architecture
- **Modular Design** - Separated components for maintainability and reusability
- **State Management** - React hooks with comprehensive audio and UI state
- **Data Separation** - Games and station data in dedicated modules

### Asset Organization
Assets are organized by game for better maintainability and scalability:

```javascript
// Each game has its own asset folder
src/assets/games/
├── vcs/     # Vice City Stories - logos, banners, backgrounds
├── vc/      # Vice City - ready for future assets
├── sa/      # San Andreas - ready for future assets
├── gta3/    # GTA III - ready for future assets
├── gtaiv/   # GTA IV - ready for future assets
└── gtav/    # GTA V - ready for future assets

// Import example in src/data/games/vcs.js
import vcsLogo from '../assets/games/vcs/vcs-logo.png';
import vcsBanner from '../assets/games/vcs/vcs-banner.png';
```

## Adding Radio Stations

### 1. Organize Game Assets
Add assets to the appropriate game folder:

```bash
# For a new game (e.g., Vice City)
src/assets/games/vc/
├── vc-logo.png          # Game logo
├── vc-banner.png        # Game banner for cards
└── vc-bg.png           # Background image

# Import in src/data/games/vc.js
import vcLogo from '../assets/games/vc/vc-logo.png';
import vcBanner from '../assets/games/vc/vc-banner.png';
import vcBackground from '../assets/games/vc/vc-bg.png';
```

### 2. Update Game Data
Add station data to the game module in `src/data/games/` (for example `src/data/games/vcs.js`):

```javascript
export const vcsGame = {
    logo: vcsLogo,        // Use imported assets
    banner: vcsBanner,    // For game card backgrounds
    background: vcsBackground, // For page backgrounds
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
```

### 3. Audio Requirements
- **Format**: MP3 (optimal browser compatibility)
- **CORS**: Must allow cross-origin requests
- **Duration**: Accurate to the second for sync calculations
- **Looping**: Should loop seamlessly for continuous playback

### 4. Component Integration
New stations automatically appear in:
- Game selection interface
- Station grid and list views
- Search and filtering
- Recently played tracking
- Favorites system

## Tech Stack

### **Core Framework**
- **React 19** - Latest React with modern hooks, enhanced performance, and improved concurrent features
- **Vite** - Lightning-fast development server with hot module replacement and optimized production builds
- **Tailwind CSS 4** - Utility-first CSS framework with custom glassmorphism design system

### **Key Libraries & APIs**
- **react-icons** - Comprehensive icon library providing consistent visual elements across components
- **HTML5 Audio API** - Native browser audio controls with cross-origin support for external streams
- **React Router** - Client-side routing for seamless single-page application navigation

### **Development Tools & Configuration**
- **ESLint** - Modern JavaScript/React linting with React 19 compatibility and best practices
- **Vercel** - Deployment platform with automatic builds and global CDN distribution
- **VS Code** - Optimized development environment with workspace-specific settings
- **Git Hooks** - Pre-commit linting and formatting for code quality consistency

### **Architecture Patterns**
- **Custom Hooks** - Specialized hooks for radio player state, mobile detection, and audio management
- **Component Composition** - Modular design with reusable components and consistent prop interfaces
- **Local Storage** - Persistent user preferences for favorites, volume, and recently played stations
- **Radio Epoch System** - Synchronized playback timing ensuring all users hear identical content

## Design System

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

## Development

### **Available Scripts**
```bash
# Development
npm run dev        # Start development server with hot reload on http://localhost:5173
npm run build      # Create optimized production build in dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint to check code quality and React best practices

# Quick Setup
npm install        # Install all dependencies
npm run dev        # Start developing immediately
```

### **Development Features**
- **Hot Module Replacement** - Instant updates without losing application state
- **Source Maps** - Accurate debugging with original source code references
- **Mobile Testing** - Responsive design testing across device sizes
- **Live CSS Updates** - Real-time Tailwind class changes without page refresh
- **ESLint Integration** - Automatic code quality checks with React 19 rules

### **Local Development Tips**
- Use browser dev tools to test audio synchronization
- Test mobile responsiveness with device simulation
- Check console for audio loading errors with external URLs
- Use React Developer Tools for component state inspection

### Key Dependencies
- `react-icons` - Comprehensive icon library for UI consistency
- `@tailwindcss/vite` - Tailwind CSS integration with Vite
- Modern ESLint configuration with React 19 support and best practices

## Screenshots

*Coming soon - Screenshots of the modern interface, game selection, and player controls*

## Currently Available

### **Vice City Stories (Fully Implemented - 9 Stations)**
- **Flash FM** - Classic hits and upbeat tracks with Hall & Oates, Out of Touch
- **V-Rock** - Rock and metal music featuring Dio, Holy Diver
- **Emotion 98.3** - R&B and soul music for smooth listening
- **The Wave 103** - New wave and electronic beats
- **Paradise FM** - Reggae and Caribbean vibes
- **VCFL** - Classical and orchestral music for refined tastes
- **Fresh FM** - Hip-hop and urban contemporary
- **Espantoso** - Latin music and Spanish-language content
- **VCPR** - Talk radio with comedy shows and discussions

### **Other GTA Games (Assets Ready, Stations Coming Soon)**
- **Grand Theft Auto: Vice City** - Assets configured, awaiting station implementation
- **Grand Theft Auto: San Andreas** - Assets configured, awaiting station implementation
- **Grand Theft Auto III** - Assets configured, awaiting station implementation
- **Grand Theft Auto IV** - Assets configured, awaiting station implementation  
- **Grand Theft Auto V** - Assets configured, awaiting station implementation

*Each game has dedicated asset folders with logos, banners, and backgrounds ready for quick implementation*

## Recent Updates

- Homepage
  - Animated particle background with slow parallax drift
  - “Choose your era” uses game banners as full card backgrounds with overlays
  - Section dividers and tighter mobile spacing
  - Live Now: “Open full player” becomes a prominent button below 500px
  - Footer: “Built with” on its own line on mobile; chips wrap nicely
  - Tuner panel: optimized for small screens (padding/height/typography)
- Radio
  - Game cards switched to square logo tiles with theme colors
  - Focus Mode background made fully opaque

## Roadmap

### **Current Features (Implemented)**
- Synchronized radio playback across users
- Volume control with mute functionality
- Real-time search and filtering
- Favorites system with localStorage persistence
- Recently played tracking
- Mini player with scroll detection
- Focus mode for immersive experience
- Spotify-style station navigation
- Modular component architecture
- Mobile-responsive design
- Dynamic browser title updates based on current track
- Smart station display (active stations only in quick access)
- Banner integration with dark overlays for game cards
- Local asset management for logos and banners
- Enhanced glassmorphism UI with gradient overlays
- Organized asset structure by game for scalability

### **Upcoming Features**
- [ ] **Enhanced Audio Features**
  - [ ] Crossfade transitions between tracks
  - [ ] Audio quality selection
- [ ] **Expanded Game Library**
  - [ ] GTA San Andreas radio stations
  - [ ] GTA V radio stations  
  - [ ] GTA III classic stations

## Contributing

We welcome contributions to make GTA Radio even better! Here's how you can help:

### **Getting Started**
1. **Fork** the repository on GitHub
2. **Clone** your fork: `git clone https://github.com/yourusername/gta-radio.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Install** dependencies: `npm install`
5. **Start** development: `npm run dev`

### **Development Guidelines**
- Follow existing code style and component patterns
- Test your changes across different screen sizes
- Ensure audio synchronization works properly
- Add appropriate comments for complex logic
- Update documentation for new features

### **Types of Contributions**
- **New Radio Stations** - Add stations with proper tracklist data
- **Game Support** - Implement new GTA game radio collections  
- **Bug Fixes** - Fix issues with audio, UI, or synchronization
- **Feature Enhancements** - Improve existing functionality
- **Mobile Improvements** - Enhance mobile user experience
- **UI/UX Improvements** - Refine design and user interactions

### **Submission Process**
1. **Commit** changes: `git commit -m 'feat: add amazing feature'`
2. **Push** to branch: `git push origin feature/amazing-feature`
3. **Create** a Pull Request with clear description
4. **Wait** for review and address any feedback

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **Usage Rights**
- Commercial use
- Modification  
- Distribution
- Private use

*Attribution is appreciated but not required.*

## Credits & Acknowledgments

### **Game Content**
- **Grand Theft Auto Series**  Rockstar Games
- This is a fan-made educational project celebrating the iconic radio experiences
- No copyrighted audio content is distributed with this application
- Users must provide their own legally obtained audio files

### **Open Source Credits**
- **React Team** - Amazing framework and developer experience
- **Tailwind CSS** - Beautiful utility-first CSS framework
- **Vite Team** - Lightning-fast build tooling
- **React Icons** - Comprehensive icon library
- **Vercel** - Seamless deployment platform

### **Community**
Special thanks to all GTA fans who inspired this project and everyone who contributes to keeping the nostalgic radio experience alive!

---

<div align="center">
<strong>Built with love for GTA Radio fans worldwide</strong>
<br>
<em>Relive the nostalgia, one station at a time</em>
</div>

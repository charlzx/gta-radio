# GTA Radio App - AI Coding Agent Instructions

## Project Architecture

This is a React + Vite + Tailwind CSS app that simulates synchronized GTA radio stations with real-time audio streaming. The entire app is a single-page application (`src/App.jsx`) with no routing - think Spotify-like interface for GTA radio stations.

### Core Concept: Synchronized Radio Streams
The app uses a **"radio epoch"** system for synchronized playback across users:
```javascript
const radioEpoch = new Date('2024-01-01T00:00:00Z').getTime();
const elapsed = now - radioEpoch;
const currentPlaybackTimeSeconds = (elapsed % (currentStation.duration * 1000)) / 1000;
```
This ensures all users hear the same part of a radio station at the same time, like real radio.

## Data Structure Patterns

### Game/Station Hierarchy
```javascript
// Each game contains multiple radio stations
const games = {
  vcs: {
    id: 'vcs',
    name: 'Grand Theft Auto - Vice City Stories',
    stations: [
      {
        id: 'vcs-flash',
        audioUrl: 'path/to/audio.mp3',
        duration: 3891, // seconds - CRITICAL for sync calculations
        tracklist: [
          { type: 'DJ|Song', artist: 'Artist', title: 'Title', startTime: 0, endTime: 15 }
        ]
      }
    ]
  }
}
```

### Critical Fields
- `duration`: Audio file length in seconds - used for looping calculations
- `tracklist`: Maps audio timestamps to track metadata for "Now Playing" display
- `audioUrl: null`: Stations without audio are shown as "Coming Soon"

## Component Architecture

### Single-File Approach
- All components in `src/App.jsx` (no separate files)
- Inline SVG icons (custom or react-icons)
- CSS-in-JS via `<style>` tag for animations

### Layout Structure
```
├── Background Layer (game.background image)
├── Grid Layout (responsive)
│   ├── Now Playing Panel (glassmorphism sidebar)
│   └── Main Content (station grid + game selector)
└── Focus Mode Overlay (fullscreen player)
```

## UI/UX Patterns

### Glassmorphism Design System
- `bg-white/15 backdrop-blur-xl border border-white/20` for glass panels
- Pink accent color (`bg-pink-500`, `text-pink-400`) throughout
- Custom scrollbars with gradient styling

### Interactive States
- Hover animations: `hover:scale-105 transition-all duration-300`
- Selection rings: `ring-2 ring-pink-500` for active stations
- Disabled states: `opacity-50 pointer-events-none` for coming soon items

### Live Indicators
Animated red dots for active playback:
```javascript
const LiveIndicator = () => (
  <div className="bg-red-500/90 ...">
    <span className="animate-blink">●</span> LIVE
  </div>
);
```

## Audio Management

### HTML5 Audio with Refs
```javascript
const audioRef = useRef(null);
// Cross-origin required for external audio files
<audio ref={audioRef} src={currentStation?.audioUrl} crossOrigin="anonymous"></audio>
```

### Playback Logic
1. Calculate current position based on radio epoch
2. Set `currentTime` to sync with "live" stream
3. Use `timeupdate` event to track progress and update "Now Playing"

### Track Detection
```javascript
const currentTrack = station.tracklist.find(t => 
  audioElement.currentTime >= t.startTime && 
  audioElement.currentTime < t.endTime
);
```

## Development Workflow

### Local Development
```bash
npm run dev    # Start Vite dev server
npm run build  # Production build
npm run lint   # ESLint check
```

### Key Dependencies
- **React 19** with modern hooks
- **Tailwind CSS 4** (new version) via Vite plugin
- **react-icons** for consistent iconography
- **Vite** for fast development and building

### Asset Management
- Static assets in `/public/` (favicons, manifest)
- Images referenced via placeholder URLs (replace in production)
- Audio files from external CDN (Google Cloud Storage in examples)

## Common Patterns & Conventions

### State Management
- Single `useState` hooks, no external state management
- Audio ref patterns for media control
- Effect cleanup for event listeners

### Styling Conventions
- Responsive grid: `grid-cols-1 md:grid-cols-3 lg:grid-cols-4`
- Consistent spacing: `gap-4`, `p-6`, `mb-6`
- Animation classes: `animate-fade-in-up`, `animate-blink`

### Component Props
- Consistent naming: `isSelected`, `isPlaying`, `onSelect`, `onToggle`
- Size variants: `size = 'md'|'lg'` for scalable components
- Disabled states handled at component level

## Adding New Features

### New Radio Stations
1. Add to `games.{gameId}.stations` array
2. Include `duration` (get from audio file metadata)
3. Create `tracklist` array with timestamp mappings
4. Provide `audioUrl` or set to `null` for "Coming Soon"

### New Games
1. Add to `games` object with same structure as `vcs`
2. Update `GameCard` to handle new game
3. Implement game switching logic (currently VCS only)

### UI Components
- Follow glassmorphism patterns
- Include hover/focus states
- Add responsive breakpoints
- Use consistent color scheme (pink accents, white/gray text)

## Audio File Requirements
- **Duration**: Must be accurate for sync calculations
- **Format**: MP3 recommended for browser compatibility
- **CORS**: Files must allow cross-origin requests
- **Looping**: Files should be designed to loop seamlessly

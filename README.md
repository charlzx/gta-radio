# GTA Radio - Vice City Stories

A synchronized radio streaming app that recreates the authentic GTA radio experience with real-time audio streaming across all users. Think Spotify meets GTA radio stations with live synchronization.

![GTA Radio Preview](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.13-cyan)

## ✨ Features

- **🔴 Live Synchronized Playback** - All users hear the same content at the same time
- **🎵 Real-time Track Detection** - Shows current song/DJ segments with timestamps
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎨 Glassmorphism UI** - Modern frosted glass design with smooth animations
- **🎯 Focus Mode** - Fullscreen player for immersive listening
- **🎮 Multi-Game Support** - Architecture ready for Vice City Stories, San Andreas, and GTA V

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

### Single-Page Architecture
- **`src/App.jsx`** - Complete application in one file
- **Grid Layout** - Responsive sidebar (now playing) + main content
- **State Management** - React hooks with audio refs for media control

## 📁 Project Structure

```
gta-radio/
├── public/           # Static assets (favicons, manifest)
├── src/
│   ├── App.jsx      # Main application component
│   ├── index.css    # Tailwind CSS imports
│   └── main.jsx     # React entry point
├── index.html       # HTML template
└── vite.config.js   # Vite configuration
```

## 🎵 Adding Radio Stations

1. **Add station data** to the `games.vcs.stations` array:
```javascript
{
  id: 'station-id',
  name: 'Station Name',
  logo: 'https://example.com/logo.png',
  audioUrl: 'https://example.com/audio.mp3',
  duration: 3600, // seconds - CRITICAL for sync
  tracklist: [
    { type: 'Song', artist: 'Artist', title: 'Track', startTime: 0, endTime: 180 }
  ]
}
```

2. **Audio Requirements**:
   - Format: MP3 (browser compatibility)
   - CORS: Must allow cross-origin requests
   - Duration: Accurate to the second for sync calculations
   - Looping: Should loop seamlessly

## 🛠️ Tech Stack

- **React 19** - Latest React with modern hooks
- **Vite 7** - Fast development and building
- **Tailwind CSS 4** - Utility-first styling with glassmorphism
- **HTML5 Audio** - Native audio playback with sync control

## 🎨 Design System

### Glassmorphism Components
- Glass panels: `bg-white/15 backdrop-blur-xl border border-white/20`
- Pink accents: `bg-pink-500`, `text-pink-400`
- Live indicators: Animated red dots with `animate-blink`

### Responsive Grid
- Mobile: Single column layout
- Tablet: `md:grid-cols-3` 
- Desktop: `lg:grid-cols-4`

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start dev server with HMR
npm run build    # Production build
npm run lint     # ESLint checking
npm run preview  # Preview production build
```

### Key Dependencies
- `react-icons` - Consistent iconography
- `@tailwindcss/vite` - Tailwind CSS integration
- Modern ESLint config with React 19 support

## 🚧 Roadmap

- [ ] **San Andreas Radio Stations** - Expand to GTA San Andreas
- [ ] **GTA V Integration** - Modern radio stations
- [ ] **User Preferences** - Volume control, favorites
- [ ] **Mobile App** - React Native version
- [ ] **Real Assets** - Replace placeholder images with authentic logos

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

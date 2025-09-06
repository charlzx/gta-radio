import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaStepBackward, FaStepForward } from 'react-icons/fa';

// --- Data ---
// TODO: Replace placeholder URLs with your actual asset URLs.
const games = {
    vcs: {
      id: 'vcs',
      name: 'Grand Theft Auto - Vice City Stories',
      logo: 'https://placehold.co/400x150/000000/ffffff?text=VCS+Logo', // TODO: Replace with your game logo URL
      background: 'https://placehold.co/1920x1080/000000/ffffff?text=VCS+Background', // Default background
      stations: [
        {
          id: 'vcs-flash',
          name: 'Flash FM',
          logo: 'https://placehold.co/200x200/E91E63/ffffff?text=Flash', // TODO: Replace logo URL
          audioUrl: 'https://storage.googleapis.com/gtaradio-test/VCS_Flash_FM.mp3', // TODO: Replace with your audio file URL
          duration: 3891, // IMPORTANT: Update with your audio file duration
          tracklist: [
            { type: 'DJ', artist: 'Teri & Toni', title: 'Welcome to Flash', startTime: 0, endTime: 15 },
            { type: 'Song', artist: 'Hall & Oates', title: 'Out of Touch', startTime: 15, endTime: 246 },
          ],
        },
        {
          id: 'vcs-vrock',
          name: 'V-Rock',
          logo: 'https://placehold.co/200x200/f44336/ffffff?text=V-Rock', // TODO: Replace logo URL
          audioUrl: 'https://storage.googleapis.com/gtaradio-test/VCS_VRock.mp3', // TODO: Replace with your audio file URL
          duration: 3581, // IMPORTANT: Update with your audio file duration
          tracklist: [
            { type: 'DJ', artist: 'Cousin Ed & Lazlow', title: 'Rockin Out', startTime: 0, endTime: 12 },
            { type: 'Song', artist: 'Dio', title: 'Holy Diver', startTime: 12, endTime: 250 },
          ],
        },
        { 
          id: 'vcs-emotion', 
          name: 'Emotion 98.3', 
          logo: 'https://placehold.co/200x200/FF4081/ffffff?text=Emotion', 
          audioUrl: null, 
          duration: 0, 
          tracklist: [
            { type: 'DJ', artist: 'Lionel Makepeace', title: 'Emotion 98.3', startTime: 0, endTime: 10 }
          ] 
        },
        { 
          id: 'vcs-wave', 
          name: 'The Wave 103', 
          logo: 'https://placehold.co/200x200/2196F3/ffffff?text=Wave', 
          audioUrl: null, 
          duration: 0, 
          tracklist: [
            { type: 'DJ', artist: 'Trish Camden & Adam First', title: 'The Wave 103', startTime: 0, endTime: 10 }
          ] 
        },
        { 
          id: 'vcs-paradise', 
          name: 'Paradise FM', 
          logo: 'https://placehold.co/200x200/4CAF50/ffffff?text=Paradise', 
          audioUrl: null, 
          duration: 0, 
          tracklist: [
            { type: 'DJ', artist: 'Leslie "Big Lez" Segar', title: 'Paradise FM', startTime: 0, endTime: 10 }
          ] 
        },
        { 
          id: 'vcs-vcfl', 
          name: 'VCFL', 
          logo: 'https://placehold.co/200x200/795548/ffffff?text=VCFL', 
          audioUrl: null, 
          duration: 0, 
          tracklist: [
            { type: 'DJ', artist: 'Tina Jane', title: 'VCFL', startTime: 0, endTime: 10 }
          ] 
        },
        { 
          id: 'vcs-fresh', 
          name: 'Fresh 105 FM', 
          logo: 'https://placehold.co/200x200/8BC34A/000000?text=Fresh', 
          audioUrl: null, 
          duration: 0, 
          tracklist: [
            { type: 'DJ', artist: 'Luke', title: 'Fresh 105 FM', startTime: 0, endTime: 10 }
          ] 
        },
        { 
          id: 'vcs-espantoso', 
          name: 'Espantoso', 
          logo: 'https://placehold.co/200x200/FF5722/ffffff?text=Espantoso', 
          audioUrl: null, 
          duration: 0, 
          tracklist: [
            { type: 'DJ', artist: 'Hector Hernandez', title: 'Espantoso', startTime: 0, endTime: 10 }
          ] 
        },
        { 
          id: 'vcs-vcpr', 
          name: 'VCPR', 
          logo: 'https://placehold.co/200x200/9C27B0/ffffff?text=VCPR', 
          audioUrl: null, 
          duration: 0, 
          tracklist: [
            { type: 'DJ', artist: 'Maurice Chavez', title: 'Pressing Issues', startTime: 0, endTime: 10 }
          ] 
        },
      ],
    },
    gtav: { id: 'gtav', name: 'Grand Theft Auto V', logo: '', background: '', stations: [] },
    sa: { id: 'sa', name: 'Grand Theft Auto - San Andreas', logo: '', background: '', stations: [] },
};


// --- Helper Components ---

const PlayPauseButton = ({ isPlaying, onToggle, size = 'md' }) => {
  const sizes = { md: 'w-14 h-14', lg: 'w-20 h-20' };
  const iconSizes = { md: 'text-3xl', lg: 'text-4xl' };
  return (
      <button onClick={onToggle} className={`${sizes[size]} rounded-full bg-pink-500 text-white flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white`}>
        {isPlaying ? <FaPause className={iconSizes[size]} /> : <FaPlay className={`${iconSizes[size]} ml-1`} />}
      </button>
  );
};

const StationCard = ({ station, onSelect, isSelected, isPlaying }) => (
    <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out group cursor-pointer ${isSelected ? 'ring-2 ring-pink-500' : ''}`} onClick={() => station.audioUrl && onSelect(station)}>
        <img src={station.logo} alt={station.name} draggable="false" className="w-full h-full object-cover aspect-square"/>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 ${!station.audioUrl ? 'bg-black/70' : ''}`}>
           <h3 className="font-bold text-white text-sm">{station.name}</h3>
        </div>
        {station.audioUrl && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                { isSelected && isPlaying ? <FaPause className="w-8 h-8 text-white" /> : <FaPlay className="w-8 h-8 ml-1 text-white" /> }
            </div>
        )}
    </div>
);

const GameCard = ({ game, isDisabled }) => (
    <div className={`relative rounded-lg h-24 flex items-center justify-center p-4 ${isDisabled ? 'bg-white/5 cursor-not-allowed' : 'bg-white/10'}`}>
        <h3 className={`font-bold text-lg ${isDisabled ? 'text-gray-600' : 'text-white'}`}>{game.name}</h3>
        {isDisabled && <div className="absolute top-2 right-2 text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">SOON</div>}
    </div>
);

// --- Main App Component ---

export default function App() {
  const [gameData, setGameData] = useState(games);
  const [currentGame, setCurrentGame] = useState(gameData.vcs);
  const [currentStation, setCurrentStation] = useState(null);
  const [nowPlaying, setNowPlaying] = useState({ type: '', artist: 'GTA Live Radio', title: 'Select a station to begin' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const radioEpoch = new Date('2024-01-01T00:00:00Z').getTime();

  // Helper function to format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStationSelect = (station) => {
    if (station.id === currentStation?.id) {
        togglePlayPause();
        return;
    }
    if (audioRef.current) audioRef.current.pause();
    setCurrentStation(station);
    setNowPlaying({ type: 'Info', artist: station.name, title: 'Press Play to Sync' });
    setTimeout(() => {
        if(audioRef.current && !isPlaying) {
            togglePlayPause();
        }
    }, 100);
  };

  const togglePlayPause = () => {
    if (!currentStation || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const now = new Date().getTime();
      const elapsed = now - radioEpoch;
      const currentPlaybackTimeSeconds = (elapsed % (currentStation.duration * 1000)) / 1000;
      audioRef.current.currentTime = currentPlaybackTimeSeconds;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio playback failed:", e));
    }
  };

  const goToNextTrack = () => {
    if (!currentStation?.tracklist || !audioRef.current) return;
    const currentTrack = currentStation.tracklist.find(t => 
      audioRef.current.currentTime >= t.startTime && 
      audioRef.current.currentTime < t.endTime
    );
    if (currentTrack) {
      const currentIndex = currentStation.tracklist.indexOf(currentTrack);
      const nextTrack = currentStation.tracklist[currentIndex + 1];
      if (nextTrack) {
        audioRef.current.currentTime = nextTrack.startTime;
      }
    }
  };

  const goToPreviousTrack = () => {
    if (!currentStation?.tracklist || !audioRef.current) return;
    const currentTrack = currentStation.tracklist.find(t => 
      audioRef.current.currentTime >= t.startTime && 
      audioRef.current.currentTime < t.endTime
    );
    if (currentTrack) {
      const currentIndex = currentStation.tracklist.indexOf(currentTrack);
      if (currentIndex > 0) {
        const prevTrack = currentStation.tracklist[currentIndex - 1];
        audioRef.current.currentTime = prevTrack.startTime;
      } else {
        // Go to beginning of current track if already at first track
        audioRef.current.currentTime = currentTrack.startTime;
      }
    }
  };
  
  useEffect(() => {
    const audioElement = audioRef.current;
    const updateNowPlaying = () => {
        if (!audioElement || !currentStation?.tracklist) return;
        setCurrentTime(audioElement.currentTime);
        const currentTrack = currentStation.tracklist.find(t => audioElement.currentTime >= t.startTime && audioElement.currentTime < t.endTime);
        if (currentTrack && currentTrack.title !== nowPlaying.title) setNowPlaying(currentTrack);
    };
    
    const updateDuration = () => {
      if (audioElement && currentStation) {
        setDuration(currentStation.duration);
      }
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateNowPlaying);
      audioElement.addEventListener('loadedmetadata', updateDuration);
      audioElement.addEventListener('durationchange', updateDuration);
    }
    
    return () => { 
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateNowPlaying);
        audioElement.removeEventListener('loadedmetadata', updateDuration);
        audioElement.removeEventListener('durationchange', updateDuration);
      }
    };
  }, [currentStation, nowPlaying.title]);

  const LiveIndicator = ({ className = '' }) => isPlaying && (
    <div className={`flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${className}`}>
        <span className="w-2 h-2 bg-white rounded-full animate-blink"></span>
        <span>LIVE</span>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${currentGame.background})`, zIndex: -2 }} />
      <div className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-md" style={{ zIndex: -1 }} />

      <div className="h-screen text-white font-sans grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        
        {/* Left Panel: Now Playing (Glassmorphism) */}
        <aside className="md:col-span-1 lg:col-span-1">
            <div className="bg-pink-900/10 backdrop-blur-2xl border border-white/10 rounded-lg p-6 text-center relative">
                {/* Expand button at top right */}
                <button 
                  onClick={() => setIsFocusMode(true)} 
                  disabled={!currentStation} 
                  className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaExpand className="w-4 h-4" />
                </button>
                
                <div>
                     <div className="flex items-center justify-center gap-2 mb-4">
                       <h2 className="font-bold text-lg text-gray-400">Now Playing</h2>
                       <LiveIndicator className="" />
                     </div>
                     <img src={currentStation?.logo || currentGame.logo} alt="" draggable="false" className="w-40 h-40 mx-auto rounded-lg shadow-lg aspect-square object-contain"/>
                     <h3 className="text-xl font-bold mt-4 truncate">{nowPlaying.title}</h3>
                     <p className="text-pink-400 truncate">{nowPlaying.artist}</p>
                     
                     {/* Time display and progress bar */}
                     {currentStation && (
                       <div className="mt-4">
                         <div className="flex justify-between text-xs text-gray-400 mb-1">
                           <span>{formatTime(currentTime)}</span>
                           <span>{formatTime(duration)}</span>
                         </div>
                         <div className="w-full bg-white/10 rounded-full h-1">
                           <div 
                             className="bg-pink-500 h-1 rounded-full transition-all duration-300" 
                             style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                           ></div>
                         </div>
                       </div>
                     )}
                </div>
                <div className="mt-6 flex items-center justify-center space-x-4">
                    {currentStation && (
                      <>
                        <button 
                          onClick={goToPreviousTrack}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                          <FaStepBackward className="w-4 h-4" />
                        </button>
                        <PlayPauseButton isPlaying={isPlaying} onToggle={togglePlayPause} />
                        <button 
                          onClick={goToNextTrack}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                          <FaStepForward className="w-4 h-4" />
                        </button>
                      </>
                    )}
                </div>
            </div>
        </aside>

        {/* Right Panel: Main Content */}
        <main className="md:col-span-2 lg:col-span-3 bg-black/30 backdrop-blur-lg border border-white/10 rounded-lg p-6 overflow-y-auto custom-scrollbar">
            <header>
                <h1 className="text-4xl font-extrabold text-white">GTA Radio Stations</h1>
                <p className="text-gray-400 mt-1">Live, synchronized radio from across the series.</p>
            </header>
            
            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">All Games</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <GameCard game={gameData.gtav} isDisabled={true} />
                    <GameCard game={gameData.sa} isDisabled={true} />
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">{currentGame.name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                     {currentGame.stations.map(station => (
                        <StationCard key={station.id} station={station} onSelect={handleStationSelect} isSelected={currentStation?.id === station.id} isPlaying={isPlaying} />
                    ))}
                </div>
            </section>
        </main>
      </div>
      
      {/* Focus Mode Overlay - Overhauled UI */}
      {isFocusMode && currentStation && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in-up"
        >
          {/* Dynamic Blurred Background */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 scale-110 blur-3xl opacity-40"
            style={{ backgroundImage: `url(${currentStation.logo})` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/90 to-black" />

          {/* Close Button */}
          <button 
            onClick={() => setIsFocusMode(false)} 
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all z-10"
          >
            <FaCompress className="w-7 h-7" />
          </button>

          {/* Main Content Grid */}
          <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Side: Album Art */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute -inset-4 bg-pink-500/20 rounded-3xl blur-3xl animate-pulse-slow" />
                <img 
                  src={currentStation.logo} 
                  alt={currentStation.name}
                  draggable="false" 
                  className="relative w-full h-full rounded-3xl shadow-2xl border-2 border-white/10 object-cover"
                />
              </div>
            </div>

            {/* Right Side: Player UI */}
            <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
              <LiveIndicator className="mb-4" />
              
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                {nowPlaying.title}
              </h1>
              <p className="text-2xl sm:text-3xl text-pink-400 font-medium mt-2">
                {nowPlaying.artist}
              </p>
              <p className="text-lg text-gray-400 mt-4 font-medium">
                on <span className="font-bold text-gray-300">{currentStation.name}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                from {currentGame.name}
              </p>

              {/* Progress Bar */}
              <div className="w-full max-w-lg mt-8">
                <div className="w-full bg-white/10 rounded-full h-2 group">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-pink-400 h-2 rounded-full relative" 
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-6 mt-8">
                <button className="text-white/70 hover:text-white transition-colors">
                  <FaStepBackward className="w-7 h-7" onClick={goToPreviousTrack} />
                </button>
                <PlayPauseButton isPlaying={isPlaying} onToggle={togglePlayPause} size="lg"/>
                <button className="text-white/70 hover:text-white transition-colors">
                  <FaStepForward className="w-7 h-7" onClick={goToNextTrack} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <audio ref={audioRef} src={currentStation?.audioUrl} crossOrigin="anonymous"></audio>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #0c0c0c; overflow: hidden; }
        .text-shadow-glow { text-shadow: 0 0 12px rgba(255, 255, 255, 0.4); }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-blink { animation: blink 1.2s linear infinite; }
        @keyframes blink { 50% { opacity: 0.2; } }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background-color: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.4);
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>
    </>
  );
}


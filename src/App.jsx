import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { games } from './data/games';
import GameCard from './components/GameCard';
import StationCard from './components/StationCard';
import StationListItem from './components/StationListItem';
import NowPlayingCard from './components/NowPlayingCard';
import FocusMode from './components/FocusMode';
import SearchFilter from './components/SearchFilter';
import RecentlyPlayedCard from './components/RecentlyPlayedCard';
import MiniPlayer from './components/MiniPlayer';

// --- Main App Component ---

export default function App() {
  const [gameData, setGameData] = useState(games);
  const [currentGame, setCurrentGame] = useState(gameData.vcs);
  const [selectedGameView, setSelectedGameView] = useState(null); // New state for game selection view
  const [currentStation, setCurrentStation] = useState(null);
  const [nowPlaying, setNowPlaying] = useState({ type: '', artist: 'GTA Live Radio', title: 'Select a station to begin' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // New feature states
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  const audioRef = useRef(null);
  const radioEpoch = new Date('2024-01-01T00:00:00Z').getTime();

  // Helper function to format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // New feature handlers
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleToggleFavorite = (stationId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(stationId)) {
      newFavorites.delete(stationId);
    } else {
      newFavorites.add(stationId);
    }
    setFavorites(newFavorites);
  };

  const addToRecentlyPlayed = (station) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== station.id);
      return [station, ...filtered].slice(0, 5); // Keep only 5 recent stations
    });
  };

  // Filter stations based on search and genre
  const getFilteredStations = (stations) => {
    return stations.filter(station => {
      const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           station.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || station.genre.toLowerCase() === selectedGenre.toLowerCase();
      return matchesSearch && matchesGenre;
    });
  };

  const handleGameSelect = (game) => {
    setSelectedGameView(game);
    setCurrentGame(game);
    // Reset station when switching games
    if (audioRef.current) audioRef.current.pause();
    setCurrentStation(null);
    setIsPlaying(false);
    setNowPlaying({ type: '', artist: 'GTA Live Radio', title: `Select a ${game.name} station` });
  };

  const handleBackToGames = () => {
    setSelectedGameView(null);
  };

  const handleStationSelect = (station) => {
    if (station.id === currentStation?.id) {
        togglePlayPause();
        return;
    }
    if (audioRef.current) audioRef.current.pause();
    setCurrentStation(station);
    setNowPlaying({ type: 'Info', artist: station.name, title: 'Press Play to Sync' });
    addToRecentlyPlayed(station);
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
      // Set initial volume and mute state
      audioElement.volume = volume;
      audioElement.muted = isMuted;
      
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
  }, [currentStation, nowPlaying.title, volume, isMuted]);

  // Mini player scroll effect
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      if (currentStation && !isFocusMode) {
        setShowMiniPlayer(scrollTop > 100);
      } else {
        setShowMiniPlayer(false);
      }
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, [currentStation, isFocusMode]);

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
        
        {/* Left Panel: Now Playing */}
        <aside className="md:col-span-1 lg:col-span-1">
          <NowPlayingCard
            currentStation={currentStation}
            currentGame={currentGame}
            nowPlaying={nowPlaying}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
            onTogglePlayPause={togglePlayPause}
            onPreviousTrack={goToPreviousTrack}
            onNextTrack={goToNextTrack}
            onOpenFocusMode={() => setIsFocusMode(true)}
            LiveIndicator={LiveIndicator}
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onToggleMute={handleToggleMute}
          />
          
          {/* Recently Played Card */}
          {recentlyPlayed.length > 0 && (
            <div className="mt-4">
              <RecentlyPlayedCard
                recentStations={recentlyPlayed}
                onStationSelect={handleStationSelect}
                currentStationId={currentStation?.id}
              />
            </div>
          )}
        </aside>

        {/* Right Panel: Main Content */}
        <main className="md:col-span-2 lg:col-span-3 bg-black/30 backdrop-blur-lg border border-white/10 rounded-lg p-6 overflow-y-auto custom-scrollbar">
          {selectedGameView ? (
            // Single Game View - Spotify Style List
            <>
              <header className="flex items-center gap-4 mb-8">
                <button 
                  onClick={handleBackToGames}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">{selectedGameView.name}</h1>
                  <p className="text-gray-400 mt-1">
                    {getFilteredStations(selectedGameView.stations).length} of {selectedGameView.stations.length} radio stations
                  </p>
                </div>
              </header>
              
              {/* Search and Filter */}
              <div className="mb-6">
                <SearchFilter
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedGenre={selectedGenre}
                  onGenreChange={setSelectedGenre}
                  stations={selectedGameView.stations}
                />
              </div>
              
              {selectedGameView.stations.length > 0 ? (
                (() => {
                  const filteredStations = getFilteredStations(selectedGameView.stations);
                  return filteredStations.length > 0 ? (
                    <div className="space-y-1">
                      {/* List Header */}
                      <div className="flex items-center gap-4 px-3 py-2 text-sm text-gray-400 border-b border-white/10 mb-2">
                        <div className="w-8 text-center">#</div>
                        <div className="w-12"></div>
                        <div className="flex-1">Station</div>
                        <div className="w-16 text-center">♡</div>
                        <div className="w-20 text-center">Duration</div>
                      </div>
                      
                      {/* Station List */}
                      {filteredStations.map((station, index) => (
                        <StationListItem
                          key={station.id}
                          station={station}
                          index={index}
                          onSelect={handleStationSelect}
                          isSelected={currentStation?.id === station.id}
                          isPlaying={isPlaying}
                          isFavorite={favorites.has(station.id)}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <h3 className="text-2xl font-bold text-gray-400 mb-2">No stations found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">Coming Soon</h3>
                  <p className="text-gray-500">Radio stations for {selectedGameView.name} will be added soon!</p>
                </div>
              )}
            </>
          ) : (
            // All Games View
            <>
              <header>
                <h1 className="text-4xl font-extrabold text-white">GTA Radio Stations</h1>
                <p className="text-gray-400 mt-1">Live, synchronized radio from across the series.</p>
              </header>
              
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Choose Your Game</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <GameCard 
                    game={gameData.vcs} 
                    isDisabled={false} 
                    onSelect={handleGameSelect}
                    isSelected={currentGame.id === gameData.vcs.id}
                  />
                  <GameCard 
                    game={gameData.vc} 
                    isDisabled={true} 
                    onSelect={handleGameSelect}
                    isSelected={false}
                  />
                  <GameCard 
                    game={gameData.sa} 
                    isDisabled={true} 
                    onSelect={handleGameSelect}
                    isSelected={false}
                  />
                  <GameCard 
                    game={gameData.gtaiv} 
                    isDisabled={true} 
                    onSelect={handleGameSelect}
                    isSelected={false}
                  />
                  <GameCard 
                    game={gameData.gtav} 
                    isDisabled={true} 
                    onSelect={handleGameSelect}
                    isSelected={false}
                  />
                  <GameCard 
                    game={gameData.gta3} 
                    isDisabled={true} 
                    onSelect={handleGameSelect}
                    isSelected={false}
                  />
                </div>
              </section>

              {/* Quick Access to Current Game Stations */}
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">{currentGame.name} - Quick Access</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {currentGame.stations.slice(0, 6).map(station => (
                    <StationCard 
                      key={station.id} 
                      station={station} 
                      onSelect={handleStationSelect} 
                      isSelected={currentStation?.id === station.id} 
                      isPlaying={isPlaying} 
                    />
                  ))}
                </div>
                {currentGame.stations.length > 6 && (
                  <button 
                    onClick={() => handleGameSelect(currentGame)}
                    className="mt-4 px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg transition-colors text-pink-300"
                  >
                    View All {currentGame.stations.length} Stations →
                  </button>
                )}
              </section>
            </>
          )}
        </main>
      </div>
      
      {/* Focus Mode Overlay */}
      {isFocusMode && currentStation && (
        <FocusMode
          currentStation={currentStation}
          currentGame={currentGame}
          nowPlaying={nowPlaying}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
          onTogglePlayPause={togglePlayPause}
          onPreviousTrack={goToPreviousTrack}
          onNextTrack={goToNextTrack}
          onCloseFocusMode={() => setIsFocusMode(false)}
          LiveIndicator={LiveIndicator}
        />
      )}

      {/* Mini Player */}
      {showMiniPlayer && currentStation && (
        <MiniPlayer
          currentStation={currentStation}
          nowPlaying={nowPlaying}
          isPlaying={isPlaying}
          onTogglePlayPause={togglePlayPause}
          onOpenFocusMode={() => setIsFocusMode(true)}
          onClose={() => setShowMiniPlayer(false)}
        />
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


import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import StationCard from '../components/StationCard';
import StationListItem from '../components/StationListItem';
import NowPlayingCard from '../components/NowPlayingCard';
import MobileNowPlayingCard from '../components/MobileNowPlayingCard';
import FloatingBottomPlayer from '../components/FloatingBottomPlayer';
import FocusMode from '../components/FocusMode';
import SearchFilter from '../components/SearchFilter';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';
import PlaylistView from '../components/PlaylistView';
import StationDetails from './StationDetails';
import { useYouTubeRadioPlayer } from '../hooks/useYouTubeRadioPlayer';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Radio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [gameData] = useState(games);
  const [currentGame, setCurrentGame] = useState(gameData.vcs);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedGameView, setSelectedGameView] = useState(null); // New state for game selection view
  const [currentStation, setCurrentStation] = useState(null);
  const [nowPlaying, setNowPlaying] = useState({ type: '', artist: 'GTA Live Radio', title: 'Select a station to begin' });
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSynced, setIsSynced] = useState(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [loopOnEnd, setLoopOnEnd] = useState(() => localStorage.getItem('gta-radio-loop-on-end') === 'true');
  const [shuffleOnEnd, setShuffleOnEnd] = useState(() => localStorage.getItem('gta-radio-shuffle-on-end') === 'true');

  // Mobile-specific states
  const isMobile = useIsMobile();
  const [isMobilePlayerExpanded, setIsMobilePlayerExpanded] = useState(false);

  // New feature states
  // volume and mute managed by useRadioPlayer hook
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  // Mobile sidebar state removed as toggle button was removed per feedback
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('gta-radio-favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem('gta-radio-recently-played');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [pendingTrackStart, setPendingTrackStart] = useState(null);

  const {
    playerMountRef,
    audioRef,
    isPlayerReady,
    isPlaying,
    volume,
    isMuted,
    setVol,
    toggleMute,
    playAtEpoch,
    playFrom,
    pause,
    syncToEpoch,
    setActiveDuration,
    attachMediaSession,
    loadFromUrl,
    seekTo,
    getCurrentTime,
    getDuration,
    lastEndedAt,
  } = useYouTubeRadioPlayer();
  const mainRef = useRef(null);
  const wasPlayingBeforeHideRef = useRef(false);
  const lastAppliedQueryRef = useRef('');

  const detailsMatch = location.pathname.match(/^\/radio\/([^/]+)\/([^/]+)$/);
  const detailsGameId = detailsMatch?.[1] || null;
  const detailsStationId = detailsMatch?.[2] || null;
  const isDetailsRoute = Boolean(detailsMatch);
  // Leave single-game view when searching globally
  useEffect(() => {
    if (searchQuery && selectedGameView) {
      setSelectedGameView(null);
    }
  }, [searchQuery, selectedGameView]);
  
  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.view === 'main' || !event.state) {
        setSelectedGameView(null);
      } else if (event.state?.view === 'game' && event.state?.gameId) {
        const game = Object.values(gameData).find(g => g.id === event.state.gameId);
        if (game) {
          setSelectedGameView(game);
          setCurrentGame(game);
        }
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [gameData]);

  // Helper function to format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // New feature handlers
  const handleVolumeChange = (newVolume) => setVol(newVolume);

  const handleToggleMute = useCallback(() => toggleMute(), [toggleMute]);

  const handleToggleLoopOnEnd = useCallback(() => {
    setLoopOnEnd((prev) => {
      const next = !prev;
      localStorage.setItem('gta-radio-loop-on-end', next.toString());
      if (next) {
        setShuffleOnEnd(false);
        localStorage.setItem('gta-radio-shuffle-on-end', 'false');
      }
      return next;
    });
  }, []);

  const handleToggleShuffleOnEnd = useCallback(() => {
    setShuffleOnEnd((prev) => {
      const next = !prev;
      localStorage.setItem('gta-radio-shuffle-on-end', next.toString());
      if (next) {
        setLoopOnEnd(false);
        localStorage.setItem('gta-radio-loop-on-end', 'false');
      }
      return next;
    });
  }, []);

  const handleToggleFavorite = (stationId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(stationId)) {
      newFavorites.delete(stationId);
    } else {
      newFavorites.add(stationId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('gta-radio-favorites', JSON.stringify([...newFavorites]));
  };

  const addToRecentlyPlayed = useCallback((station) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== station.id);
      return [station, ...filtered].slice(0, 5); // Keep only 5 recent stations
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('gta-radio-recently-played', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Filter stations based on search and genre (currently unused; will be re-enabled with full search UI)
  // const getFilteredStations = (stations) => {
  //   return stations.filter(station => {
  //     const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchesGenre = selectedGenre === 'all';
  //     return matchesSearch && matchesGenre;
  //   });
  // };

  // Get active stations (those with audio available)
  const getStationSourceUrl = useCallback((station) => station?.audioUrl || station?.youtubeUrl || null, []);

  // Get active stations (those with a playable source URL)
  const getActiveStations = (stations) => {
    return stations.filter(station => !!getStationSourceUrl(station));
  };

  // Cross-game genre groups using station metadata
  const genreGroups = useMemo(() => {
    const groups = new Map();

    Object.values(gameData).forEach((game) => {
      (game.stations || []).forEach((station) => {
        if (!getStationSourceUrl(station)) return;

        const rawGenre = station?.stationMeta?.info?.genre;
        if (!rawGenre) return;

        const tokens = rawGenre
          .split('/')
          .flatMap((part) => part.split(','))
          .map((part) => part.trim())
          .filter(Boolean);

        const stationWithGame = { ...station, game };

        tokens.forEach((token) => {
          const key = token.toLowerCase();
          if (!groups.has(key)) {
            groups.set(key, {
              key,
              label: token,
              stations: [],
              stationIds: new Set(),
            });
          }

          const bucket = groups.get(key);
          if (!bucket.stationIds.has(station.id)) {
            bucket.stationIds.add(station.id);
            bucket.stations.push(stationWithGame);
          }
        });
      });
    });

    return [...groups.values()]
      .map((group) => ({ key: group.key, label: group.label, stations: group.stations }))
      .filter((group) => group.stations.length > 0)
      .sort((a, b) => b.stations.length - a.stations.length);
  }, [gameData, getStationSourceUrl]);

  // Get liked stations from all games
  const getLikedStations = () => {
    const allStations = [];
    Object.values(gameData).forEach(game => {
      game.stations.forEach(station => {
        if (favorites.has(station.id)) {
          allStations.push({ ...station, gameName: game.name });
        }
      });
    });
    return allStations;
  };

  const handleGameSelect = (game) => {
    setSelectedGameView(game);

    setCurrentGame(game);
    
    // Push state to browser history for proper back button navigation
    window.history.pushState({ view: 'game', gameId: game.id }, '', `#${game.id}`);
  };
  
  const handleBackToMain = () => {
    setSelectedGameView(null);
    // Push state for main view
    window.history.pushState({ view: 'main' }, '', '#');
  };

  const goLive = () => {
    if (currentStation && isPlayerReady) {
      setIsSynced(true);
      playAtEpoch(currentStation.duration);
    }
  };
  
  const handleTrackClick = (startTime) => {
    if (Number.isFinite(startTime)) {
      setIsSynced(false); // Disable sync when manually jumping to track
      seekTo(startTime);
      setIsPlaylistOpen(false); // Close playlist after selection
    }
  };

  const handleStationSelect = (station) => {
    const stationSourceUrl = getStationSourceUrl(station);
    if (!stationSourceUrl) {
      return;
    }

    if (station.id === currentStation?.id) {
        togglePlayPause();
        return;
    }
    pause();
    setIsSynced(true); // Re-enable sync when switching stations
    // If station came from a global result with a game reference, switch context
    if (station.game) {
      setCurrentGame(station.game);
    }
    setCurrentStation(station);
    setNowPlaying({ type: 'Info', artist: station.name, title: 'Loading...' });
    addToRecentlyPlayed(station);
  };

  useEffect(() => {
    const queryGameId = searchParams.get('game');
    const queryStationId = searchParams.get('station');
    const queryStart = searchParams.get('start');
    if (!queryGameId || !queryStationId) return;

    const queryKey = `${queryGameId}|${queryStationId}|${queryStart ?? ''}`;
    if (lastAppliedQueryRef.current === queryKey) return;

    const game = gameData[queryGameId];
    if (!game) return;

    const station = (game.stations || []).find((s) => s.id === queryStationId);
    if (!station || !getStationSourceUrl(station)) return;

    lastAppliedQueryRef.current = queryKey;
    setCurrentGame(game);
    setSelectedGameView(game);
    pause();
    setIsSynced(true);
    setCurrentStation(station);
    setNowPlaying({ type: 'Info', artist: station.name, title: 'Loading...' });
    addToRecentlyPlayed(station);
    if (queryStart !== null && Number.isFinite(Number(queryStart))) {
      setPendingTrackStart({ stationId: station.id, startTime: Math.max(0, Number(queryStart)) });
    }
    if (!isDetailsRoute) {
      window.history.replaceState({ view: 'game', gameId: game.id }, '', `#${game.id}`);
    }
  }, [searchParams, gameData, getStationSourceUrl, pause, addToRecentlyPlayed, isDetailsRoute]);

  const handleSearchStationSelect = (station) => {
    const gameForRoute = station.game || Object.values(gameData).find((g) => g.stations.some((s) => s.id === station.id));
    if (!gameForRoute) return;

    setShowSearchDropdown(false);
    setSearchQuery('');
    navigate(`/radio/${gameForRoute.id}/${station.id}`);
  };

  useEffect(() => {
    if (!pendingTrackStart || !currentStation || !isPlayerReady) return;
    if (currentStation.id !== pendingTrackStart.stationId) return;

    setIsSynced(false);
    playFrom(pendingTrackStart.startTime);
    setPendingTrackStart(null);
  }, [pendingTrackStart, currentStation, isPlayerReady, playFrom]);

  // Load YouTube video when station changes.
  useEffect(() => {
    const stationSourceUrl = getStationSourceUrl(currentStation);
    if (!stationSourceUrl || !currentStation) return;
    loadFromUrl(stationSourceUrl, { autoPlayDuration: currentStation.duration });
  }, [currentStation, getStationSourceUrl, loadFromUrl]);

  // Mobile-specific handlers
  const handleMobilePlayerExpand = () => {
    setIsMobilePlayerExpanded(true);
  };

  const handleMobilePlayerCollapse = () => {
    setIsMobilePlayerExpanded(false);
  };

  const handleOpenFocusMode = () => {
    if (isMobile) {
      // On mobile, expand the bottom player instead of focus mode
      setIsMobilePlayerExpanded(true);
    } else {
      setIsFocusMode(true);
    }
  };

  // Turn off initial loading after first mount to avoid showing skeletons on dynamic updates
  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!currentStation || !isPlayerReady) return;
    if (isPlaying) return pause();
    playAtEpoch(currentStation.duration);
  }, [currentStation, isPlayerReady, isPlaying, pause, playAtEpoch]);

  const goToNextTrack = useCallback(() => {
    if (!currentStation?.tracklist) return;
    setIsSynced(false); // Disable sync when user manually navigates
    const playerTime = getCurrentTime();
    const currentTrack = currentStation.tracklist.find(t => 
      playerTime >= t.startTime && 
      playerTime < t.endTime
    );
    if (currentTrack) {
      const currentIndex = currentStation.tracklist.indexOf(currentTrack);
      const nextTrack = currentStation.tracklist[currentIndex + 1];
      if (nextTrack) {
        seekTo(nextTrack.startTime);
      }
    }
  }, [currentStation, getCurrentTime, seekTo]);

  const goToPreviousTrack = useCallback(() => {
    if (!currentStation?.tracklist) return;
    setIsSynced(false); // Disable sync when user manually navigates
    const playerTime = getCurrentTime();
    const currentTrack = currentStation.tracklist.find(t => 
      playerTime >= t.startTime && 
      playerTime < t.endTime
    );
    if (currentTrack) {
      const currentIndex = currentStation.tracklist.indexOf(currentTrack);
      if (currentIndex > 0) {
        const prevTrack = currentStation.tracklist[currentIndex - 1];
        seekTo(prevTrack.startTime);
      } else {
        // Go to beginning of current track if already at first track
        seekTo(currentTrack.startTime);
      }
    }
  }, [currentStation, getCurrentTime, seekTo]);

  useEffect(() => {
    if (!lastEndedAt || !currentStation) return;

    if (loopOnEnd) {
      setIsSynced(false);
      playFrom(0);
      return;
    }

    if (!shuffleOnEnd) return;

    const activeStations = (currentGame?.stations || []).filter(
      (s) => !!getStationSourceUrl(s) && s.id !== currentStation.id
    );
    if (!activeStations.length) return;

    const randomStation = activeStations[Math.floor(Math.random() * activeStations.length)];
    pause();
    setIsSynced(true);
    setCurrentStation(randomStation);
    setNowPlaying({ type: 'Info', artist: randomStation.name, title: 'Loading...' });
    addToRecentlyPlayed(randomStation);
  }, [
    lastEndedAt,
    currentStation,
    loopOnEnd,
    shuffleOnEnd,
    playFrom,
    currentGame,
    getStationSourceUrl,
    pause,
    addToRecentlyPlayed,
  ]);
  
  useEffect(() => {
    if (!currentStation) {
      setCurrentTime(0);
      setDuration(0);
      return undefined;
    }

    const updateNowPlaying = () => {
      const playerTime = getCurrentTime();
      setCurrentTime(playerTime);

      const stationDuration = Number(currentStation.duration) || getDuration() || 0;
      setDuration(stationDuration);
      setActiveDuration(stationDuration);

      if (!currentStation?.tracklist) return;
      const currentTrack = currentStation.tracklist.find(
        (t) => playerTime >= t.startTime && playerTime < t.endTime
      );
      if (currentTrack && currentTrack.title !== nowPlaying.title) {
        setNowPlaying(currentTrack);
      }
    };

    updateNowPlaying();
    const id = setInterval(updateNowPlaying, 1000);
    return () => clearInterval(id);
  }, [currentStation, nowPlaying.title, setActiveDuration, getCurrentTime, getDuration]);

  // Periodic drift correction only while in synced mode
  useEffect(() => {
    if (!isPlaying || !isSynced || !currentStation?.duration) return undefined;
    const id = setInterval(() => {
      syncToEpoch(currentStation.duration);
    }, 30000);
    return () => clearInterval(id);
  }, [isPlaying, isSynced, currentStation, syncToEpoch]);

  // Media Session
  useEffect(() => {
    attachMediaSession({
      currentStation,
      nowPlaying,
      currentGame,
      togglePlayPause,
      prev: () => goToPreviousTrack(),
      next: () => goToNextTrack(),
    });
  }, [attachMediaSession, currentStation, nowPlaying, currentGame, togglePlayPause, goToPreviousTrack, goToNextTrack]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.code === 'Space') { e.preventDefault(); togglePlayPause(); }
      if (e.key === 'm' || e.key === 'M') handleToggleMute();
      if (e.key === 'k' || e.key === 'K') togglePlayPause();
      if (e.key === 'j' || e.key === 'J') goToPreviousTrack();
      if (e.key === 'l' || e.key === 'L') goToNextTrack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlayPause, handleToggleMute, goToPreviousTrack, goToNextTrack]);

  // Some browsers throttle/pause media in background tabs; restore live playback when visible again.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        wasPlayingBeforeHideRef.current = isPlaying;
        return;
      }

      if (!wasPlayingBeforeHideRef.current) return;
      if (!currentStation || !isPlayerReady) return;

      if (isSynced) {
        playAtEpoch(currentStation.duration);
      } else {
        playFrom(getCurrentTime());
      }
      wasPlayingBeforeHideRef.current = false;
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [isPlaying, currentStation, isPlayerReady, isSynced, playAtEpoch, playFrom, getCurrentTime]);

  // Dynamic title update based on what's playing
  useEffect(() => {
    const updateTitle = () => {
      if (!currentStation) {
        document.title = 'GTA Radio';
        return;
      }

      if (!isPlaying) {
        document.title = `${currentStation.name} - GTA Radio`;
        return;
      }

      if (nowPlaying.type === 'Song' && nowPlaying.artist && nowPlaying.title) {
        document.title = `♫ ${nowPlaying.artist} - ${nowPlaying.title} | ${currentStation.name}`;
      } else if (nowPlaying.type === 'DJ' && nowPlaying.title) {
        document.title = `🎙️ ${nowPlaying.title} | ${currentStation.name}`;
      } else if (nowPlaying.artist && nowPlaying.title) {
        document.title = `${nowPlaying.artist} - ${nowPlaying.title} | ${currentStation.name}`;
      } else {
        document.title = `${currentStation.name} - GTA Radio`;
      }
    };

    updateTitle();

    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = 'GTA Radio';
    };
  }, [currentStation, isPlaying, nowPlaying]);

  const LiveIndicator = ({ className = '' }) => isPlaying && (
    <div className={`flex items-center space-x-1.5 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${className}`}>
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-blink"></span>
        <span>LIVE</span>
    </div>
  );

  return (
    <>
      {(() => {
        const bg = currentGame.background;
        const isColor = typeof bg === 'string' && bg.startsWith('#');
        return isColor ? (
          <div className="fixed inset-0 w-full h-full transition-all duration-1000" style={{ backgroundColor: bg, zIndex: -2 }} />
        ) : (
          <div className="fixed inset-0 w-full h-full bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${bg})`, zIndex: -2 }} />
        );
      })()}
      <div className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-md" style={{ zIndex: -1 }} />

      {/* Sticky Header with centered search */}
      <header className="sticky top-0 z-20 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-xl border-b border-white/5 text-white">
        <div className="relative px-3 py-2">
          {/* Centered search bar */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <SearchFilter
                className="mb-0"
                searchQuery={searchQuery}
                onSearchChange={(v) => { setSearchQuery(v); setShowSearchDropdown(true); }}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => { setShowSearchDropdown(false); setSearchQuery(''); }, 120)}
                placeholder="Search stations across all games..."
              />
              {/* Anchored dropdown */}
              {showSearchDropdown && searchQuery.trim() && (
                <div className="absolute left-0 top-full mt-1 w-full bg-black border border-white/5 rounded-lg shadow-2xl p-0 max-h-[50vh] overflow-auto">
                  {(() => {
                    const results = Object.values(gameData).flatMap(game =>
                      game.stations
                        .filter(st => st.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(st => ({ ...st, game }))
                    );
                    return results.length > 0 ? (
                      <ul className="divide-y divide-white/5">
                        {results.slice(0, 20).map(station => (
                          <li key={`${station.game.id}-${station.id}`}>
                            <button
                              type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleSearchStationSelect(station);
                                }}
                                className="w-full px-2 py-1.5 flex items-center gap-2 hover:bg-gray-800"
                            >
                              <img src={station.logo} alt={station.name} className="w-8 h-8 rounded object-cover" />
                              <div className="flex-1 min-w-0 text-left">
                                <div className="text-white text-sm font-medium truncate">{station.name}</div>
                                <div className="text-xs text-gray-400 truncate">{station.game.name}</div>
                              </div>
                                {!getStationSourceUrl(station) ? (
                                <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-200">Coming Soon</span>
                              ) : (
                                currentStation?.id === station.id && isPlaying ? (
                                  <span className="text-xs text-pink-400 font-semibold">LIVE</span>
                                ) : null
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-400 text-center py-8">No stations match "{searchQuery}".</div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar toggle removed on mobile per feedback */}
        </div>
      </header>

      <div className={`h-[calc(100vh-80px)] text-white font-sans flex flex-col ${isMobile && currentStation ? 'pb-20' : ''}`}>
        <div className={`flex-1 ${isMobile ? 'block' : 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'} gap-3 p-3 min-h-0`}>
        
        {/* Left Panel: Now Playing - Hidden on mobile */}
        {!isMobile && (
          <aside className={`md:col-span-1 lg:col-span-1 md:block overflow-y-auto ${isMobile ? 'scrollbar-hide' : 'custom-scrollbar'}`}>
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
              onOpenFocusMode={handleOpenFocusMode}
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={handleVolumeChange}
              onToggleMute={handleToggleMute}
              isSynced={isSynced}
              onGoLive={goLive}
              onOpenPlaylist={() => setIsPlaylistOpen(true)}
              loopOnEnd={loopOnEnd}
              shuffleOnEnd={shuffleOnEnd}
              onToggleLoopOnEnd={handleToggleLoopOnEnd}
              onToggleShuffleOnEnd={handleToggleShuffleOnEnd}
            />
            
            {/* Recently Played Card */}
            {recentlyPlayed.length > 0 && (
              <div className="mt-3">
                <RecentlyPlayedCard
                  recentStations={recentlyPlayed}
                  onStationSelect={handleStationSelect}
                  currentStationId={currentStation?.id}
                />
              </div>
            )}
          </aside>
        )}

        {/* Right Panel: Main Content */}
  <main ref={mainRef} className={`${isMobile ? 'w-full pb-safe overflow-x-hidden' : 'md:col-span-2 lg:col-span-3'} bg-black/30 backdrop-blur-lg rounded-lg overflow-y-auto ${isMobile ? 'scrollbar-hide' : 'custom-scrollbar'} min-h-0 shadow-inner shadow-white/5`}>
          <div className="p-0 sm:p-4">
          {isDetailsRoute ? (
            <StationDetails gameIdParam={detailsGameId} stationIdParam={detailsStationId} embedded />
          ) : selectedGameView ? (
            // Single Game View - Mobile-optimized List
            <>
              <header className={`flex items-center gap-3 mb-4 ${isMobile ? 'px-0' : ''}`}>
                <button 
                  onClick={handleBackToMain}
                  className="p-0 bg-transparent hover:bg-white/20 rounded-full transition-all duration-200 border-0 sm:bg-white/10 sm:border sm:border-white/10 hover:border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Back"
                >
                  <FaArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedGameView.name}</h2>
                  <p className="text-gray-400 mt-0.5 text-xs">
                    {selectedGameView.stations.length} stations
                  </p>
                </div>
              </header>
              
              {selectedGameView.stations.length > 0 ? (
                <div>
                  {/* Mobile: Single column, full-width list with 16px horizontal padding */}
                  {isMobile ? (
                    <div className="space-y-3">
                      {selectedGameView.stations.map((station, index) => (
                        <StationListItem
                          key={station.id}
                          station={station}
                          index={index}
                          onSelect={handleStationSelect}
                          isSelected={currentStation?.id === station.id}
                          isFavorite={favorites.has(station.id)}
                          onToggleFavorite={handleToggleFavorite}
                          isMobile={true}
                        />
                      ))}
                    </div>
                  ) : (
                    /* Desktop: Table-style layout */
                    <div className="space-y-1">
                      {/* List Header */}
                      <div className="flex items-center gap-4 px-3 py-2 text-sm text-gray-400 border-b border-white/5 mb-2">
                        <div className="w-8 text-center">#</div>
                        <div className="w-12"></div>
                        <div className="flex-1">Station</div>
                        <div className="w-16 text-center">♡</div>
                        <div className="w-20 text-center">Duration</div>
                      </div>
                      
                      {/* Station List */}
                      {selectedGameView.stations.map((station, index) => (
                        <StationListItem
                          key={station.id}
                          station={station}
                          index={index}
                          onSelect={handleStationSelect}
                          isSelected={currentStation?.id === station.id}
                          isFavorite={favorites.has(station.id)}
                          onToggleFavorite={handleToggleFavorite}
                          isMobile={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
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
              <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/5 z-20 -mx-4 px-4 py-3 mb-4">
                <h2 className="text-3xl sm:text-2xl xs:text-xl font-extrabold text-white">GTA Radio Stations</h2>
                <p className="text-gray-400 sm:text-sm xs:text-xs mt-0.5">Live, synchronized radio from across the series.</p>
              </div>

              <section className="mt-6">
                <h2 className="text-xl sm:text-lg xs:text-base font-bold mb-3">Choose Your Game</h2>
                <div className={isMobile 
                  ? "flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4" 
                  : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                }>
                  {Object.values(gameData).map(game => (
                    <GameCard 
                      key={game.id}
                      game={game} 
                      isDisabled={!game.stations || game.stations.length === 0}
                      onSelect={handleGameSelect}
                      isSelected={currentGame.id === game.id && !selectedGameView}
                      initialLoading={initialLoading}
                    />
                  ))}
                </div>
              </section>

              {genreGroups.length > 0 && (
                <section className="mt-6">
                  <h2 className="text-xl sm:text-lg xs:text-base font-bold mb-3">Browse by Genre</h2>
                  <div className="space-y-5">
                    {genreGroups.slice(0, 8).map((group) => (
                      <div key={group.key}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-semibold text-white">{group.label}</h3>
                          <span className="text-xs text-gray-400">{group.stations.length} stations</span>
                        </div>
                        {isMobile ? (
                          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {group.stations.slice(0, 10).map((station) => (
                              <div key={`${group.key}-${station.id}`} className="relative w-[120px] flex-shrink-0">
                                <StationCard
                                  station={station}
                                  onSelect={handleStationSelect}
                                  isSelected={currentStation?.id === station.id}
                                  isPlaying={isPlaying}
                                  size="compact"
                                  initialLoading={initialLoading}
                                />
                                <div className="absolute top-2 left-2 text-[10px] bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full z-10">
                                  {station.game.name.split(' - ')[1] || station.game.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                            {group.stations.slice(0, 8).map((station) => (
                              <div key={`${group.key}-${station.id}`} className="relative">
                                <StationCard
                                  station={station}
                                  onSelect={handleStationSelect}
                                  isSelected={currentStation?.id === station.id}
                                  isPlaying={isPlaying}
                                  initialLoading={initialLoading}
                                />
                                <div className="absolute top-2 left-2 text-xs bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10">
                                  {station.game.name.split(' - ')[1] || station.game.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Liked Channels Section */}
              {getLikedStations().length > 0 && (
                <section className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaHeart className="text-pink-500 w-4 h-4" />
                    <h2 className="text-xl font-bold">Liked Channels</h2>
                  </div>
                  {isMobile ? (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {getLikedStations().slice(0, 10).map(station => (
                        <div key={station.id} className="relative min-w-[120px]">
                          <StationCard 
                            station={station} 
                            onSelect={handleStationSelect} 
                            isSelected={currentStation?.id === station.id} 
                            isPlaying={isPlaying}
                              size="compact"
                              initialLoading={initialLoading}
                          />
                          <div className="absolute top-2 left-2 text-xs bg-pink-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full z-10">
                            {station.gameName.split(' - ')[1] || station.gameName}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {getLikedStations().slice(0, 6).map(station => (
                        <div key={station.id} className="relative">
                          <StationCard 
                            station={station} 
                            onSelect={handleStationSelect} 
                            isSelected={currentStation?.id === station.id} 
                            isPlaying={isPlaying} 
                            initialLoading={initialLoading}
                          />
                          <div className="absolute top-2 left-2 text-xs bg-pink-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10">
                            {station.gameName.split(' - ')[1] || station.gameName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {getLikedStations().length > (isMobile ? 10 : 6) && (
                    <p className="mt-4 text-gray-400 text-sm">
                      +{getLikedStations().length - (isMobile ? 10 : 6)} more liked stations
                    </p>
                  )}
                </section>
              )}
                {/* Recently Played */}
                {recentlyPlayed.length > 0 && (
                  <section className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 bg-pink-500 rounded-full" />
                      <h2 className="text-xl font-bold">Recently Played</h2>
                    </div>
                    {isMobile ? (
                      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                        {recentlyPlayed.map(station => (
                          <div key={station.id} className="w-[104px] flex-shrink-0">
                            <StationCard 
                              station={station}
                              onSelect={handleStationSelect}
                              isSelected={currentStation?.id === station.id}
                              isPlaying={isPlaying}
                              size="compact"
                              compactMinWidth={104}
                              initialLoading={initialLoading}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                        {recentlyPlayed.map(station => (
                          <StationCard 
                            key={station.id}
                            station={station}
                            onSelect={handleStationSelect}
                            isSelected={currentStation?.id === station.id}
                            isPlaying={isPlaying}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                )}

              <section className="active-stations mt-6">
                <h2 className="text-xl font-bold mb-3">{currentGame.name} - Active Stations</h2>
                {(() => {
                  const activeStations = getActiveStations(currentGame.stations);
                  return activeStations.length > 0 ? (
                    <>
                      {isMobile ? (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {activeStations.map(station => (
                            <div key={station.id} className="w-[120px] flex-shrink-0">
                              <StationCard 
                                station={station} 
                                onSelect={handleStationSelect} 
                                isSelected={currentStation?.id === station.id} 
                                isPlaying={isPlaying}
                                size="compact"
                                initialLoading={initialLoading}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                          {activeStations.map(station => (
                            <StationCard 
                              key={station.id} 
                              station={station} 
                              onSelect={handleStationSelect} 
                              isSelected={currentStation?.id === station.id} 
                              isPlaying={isPlaying} 
                              initialLoading={initialLoading}
                            />
                          ))}
                        </div>
                      )}
                      {currentGame.stations.length > activeStations.length && (
                        <p className="mt-2 text-gray-400 text-sm">
                          {currentGame.stations.length - activeStations.length} stations coming soon
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-xl font-bold text-gray-400 mb-2">No Active Stations</h3>
                      <p className="text-gray-500">All stations for {currentGame.name} are coming soon!</p>
                    </div>
                  );
                })()}
              </section>
            </>
          )}
      </div>
        </main>
        </div>

  {/* No full-screen overlay; dropdown is anchored to the search input */}
      </div>
      
      {/* Focus Mode Overlay - Desktop only */}
      {!isMobile && isFocusMode && currentStation && (
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
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={handleVolumeChange}
          onToggleMute={handleToggleMute}
          onSeek={(t) => {
            if (Number.isFinite(t)) {
              setIsSynced(false);
              seekTo(Math.max(0, Math.min(duration || 0, t)));
            }
          }}
          isSynced={isSynced}
          onGoLive={goLive}
          onOpenPlaylist={() => setIsPlaylistOpen(true)}
          loopOnEnd={loopOnEnd}
          shuffleOnEnd={shuffleOnEnd}
          onToggleLoopOnEnd={handleToggleLoopOnEnd}
          onToggleShuffleOnEnd={handleToggleShuffleOnEnd}
        />
      )}

      {/* Mobile Bottom Player */}
      {isMobile && currentStation && !isMobilePlayerExpanded && (
        <FloatingBottomPlayer
          currentStation={currentStation}
          nowPlaying={nowPlaying}
          isPlaying={isPlaying}
          onTogglePlayPause={togglePlayPause}
          onExpand={handleMobilePlayerExpand}
          currentTime={currentTime}
          duration={duration}
        />
      )}

      {/* Mobile Expanded Player Overlay */}
      {isMobile && isMobilePlayerExpanded && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl pb-safe">
          <MobileNowPlayingCard
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
            onCollapse={handleMobilePlayerCollapse}
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onToggleMute={handleToggleMute}
            isSynced={isSynced}
            onGoLive={goLive}
            onOpenPlaylist={() => setIsPlaylistOpen(true)}
            onTrackClick={handleTrackClick}
          />
        </div>
      )}
      
      <div ref={playerMountRef} className="fixed -left-[9999px] top-0 w-px h-px overflow-hidden pointer-events-none" aria-hidden="true" />
      <audio ref={audioRef} className="hidden" preload="auto" crossOrigin="anonymous" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #0c0c0c; }
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
        .hover\\:scale-102:hover { transform: scale(1.02); }
        .hover\\:scale-105:hover { transform: scale(1.05); }

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

        /* Mobile horizontal scrollbar hiding */
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Mobile safe area */
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }

        /* Better touch targets on mobile */
        @media (max-width: 768px) {
          button, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>

      {/* Playlist View Modal */}
      <PlaylistView
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        tracklist={currentStation?.tracklist || []}
        currentTime={currentTime}
        formatTime={formatTime}
        onTrackClick={handleTrackClick}
        isMobile={isMobile}
      />
    </>
  );
}
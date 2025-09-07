import React from 'react';
import { FaChevronUp } from 'react-icons/fa';
import PlayPauseButton from './PlayPauseButton';

const FloatingBottomPlayer = ({ 
  currentStation, 
  nowPlaying, 
  isPlaying, 
  onTogglePlayPause, 
  onExpand,
  currentTime,
  duration
}) => {
  if (!currentStation) return null;

  const progressPct = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 bg-black/95 backdrop-blur-xl border-t border-white/20 px-4 py-2 pb-1 animate-fade-in-up rounded-lg border border-white/10">
      {/* Progress bar at the very top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-lg">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-300 rounded-t-lg"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex items-center gap-3">
        {/* Station logo */}
        <img 
          src={currentStation.logo} 
          alt={currentStation.name}
          className="w-12 h-12 rounded-lg object-cover aspect-square flex-shrink-0 border border-white/10" 
        />
        
        {/* Track info - tappable area */}
        <button
          onClick={onExpand}
          className="flex-1 min-w-0 text-left"
          aria-label="Expand player"
        >
          <div className="text-white font-medium text-sm truncate">
            {nowPlaying?.type === 'Song' && nowPlaying.artist 
              ? `${nowPlaying.artist} — ${nowPlaying.title}` 
              : nowPlaying?.title || 'Tuned'
            }
          </div>
          <div className="text-gray-400 text-xs truncate">{currentStation.name}</div>
        </button>
        
        {/* Play/pause button */}
        <PlayPauseButton 
          isPlaying={isPlaying} 
          onToggle={onTogglePlayPause} 
          size="md" 
        />
        
        {/* Expand button */}
        <button 
          onClick={onExpand}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
          aria-label="Expand player"
        >
          <FaChevronUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FloatingBottomPlayer;
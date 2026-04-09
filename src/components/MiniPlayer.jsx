import React from 'react';
import { Maximize2, X } from 'lucide-react';
import PlayPauseButton from './PlayPauseButton';

const MiniPlayer = ({ 
  currentStation, 
  nowPlaying, 
  isPlaying, 
  onTogglePlayPause, 
  onExpand, 
  onClose,
  isVisible,
  currentTime,
  duration,
}) => {
  if (!isVisible || !currentStation) return null;

  const progressPct = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-black/95 backdrop-blur-xl rounded-xl p-4 border border-white/20 z-40 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img 
            src={currentStation.logo} 
            alt={currentStation.name}
            className="w-12 h-12 rounded-lg object-cover aspect-square flex-shrink-0" 
          />
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium text-sm truncate">{nowPlaying.title}</p>
            <p className="text-gray-400 text-xs truncate">{nowPlaying.artist}</p>
            <p className="text-gray-500 text-xs truncate">{currentStation.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <PlayPauseButton 
            isPlaying={isPlaying} 
            onToggle={onTogglePlayPause} 
            size="sm" 
          />
          <button 
            onClick={onExpand}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Maximize2 size={16} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Mini progress bar */}
      <div className="mt-3">
        <div className="w-full bg-white/10 rounded-full h-1">
          <div 
            className="bg-pink-500 h-1 rounded-full transition-all duration-300" 
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;

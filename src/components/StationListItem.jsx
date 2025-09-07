import React from 'react';
import { FaPlay, FaPause, FaClock, FaHeart, FaRegHeart } from 'react-icons/fa';

const StationListItem = ({ 
  station, 
  onSelect, 
  isSelected, 
  isPlaying, 
  index, 
  isFavorite, 
  onToggleFavorite,
  isMobile = false
}) => {
  const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`group flex items-center ${isMobile ? 'gap-3 p-4' : 'gap-4 p-3'} rounded-lg transition-all duration-200 cursor-pointer hover:bg-white/5 
        ${isSelected ? 'bg-pink-500/10 border border-pink-500/20' : ''}
        ${!station.audioUrl ? 'opacity-60' : ''}
        ${isMobile ? 'min-h-[56px] bg-white/5 border border-white/10' : ''}`}
      onClick={() => station.audioUrl && onSelect(station)}
    >
      {/* Track Number / Play Button - Hidden on mobile to save space */}
      {!isMobile && (
        <div className="w-8 h-8 flex items-center justify-center text-sm text-gray-400 group-hover:text-white">
          {isSelected && isPlaying ? (
            <FaPause className="w-4 h-4 text-pink-400" />
          ) : isSelected ? (
            <FaPlay className="w-4 h-4 text-pink-400" />
          ) : (
            <span className="group-hover:hidden">{index + 1}</span>
          )}
          {!isSelected && station.audioUrl && (
            <FaPlay className="w-4 h-4 hidden group-hover:block" />
          )}
        </div>
      )}

      {/* Station Logo - larger on mobile */}
      <div className={`${isMobile ? 'w-14 h-14' : 'w-12 h-12'} rounded-lg overflow-hidden flex-shrink-0`}>
        <img 
          src={station.logo} 
          alt={station.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Station Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${isSelected ? 'text-pink-400' : 'text-white group-hover:text-white'} ${isMobile ? 'text-base' : ''}`}>
          {station.name}
        </h3>
        <p className={`text-gray-400 truncate ${isMobile ? 'text-sm' : 'text-sm'}`}>
          {station.tracklist?.[0]?.artist || 'Radio Station'}
        </p>
        {/* Show play button on mobile when selected */}
        {isMobile && isSelected && (
          <div className="flex items-center gap-1 mt-1">
            {isPlaying ? (
              <FaPause className="w-3 h-3 text-pink-400" />
            ) : (
              <FaPlay className="w-3 h-3 text-pink-400" />
            )}
            <span className="text-pink-400 text-xs font-medium">NOW PLAYING</span>
          </div>
        )}
      </div>

      {/* Status / Duration - Compact on mobile */}
      <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'} text-sm text-gray-400`}>
        {/* Favorite Button - larger touch target on mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(station.id);
          }}
          className={`${isMobile ? 'p-2' : 'p-1'} hover:text-pink-400 transition-colors ${isMobile ? 'min-w-[44px] min-h-[44px] flex items-center justify-center' : ''}`}
        >
          {isFavorite ? (
            <FaHeart className="w-4 h-4 text-pink-400" />
          ) : (
            <FaRegHeart className="w-4 h-4 hover:text-pink-400" />
          )}
        </button>

        {!station.audioUrl ? (
          <span className={`px-2 py-1 bg-gray-700 text-gray-300 rounded ${isMobile ? 'text-xs' : 'text-xs'}`}>Coming Soon</span>
        ) : isSelected ? (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="text-pink-400 text-xs font-medium">LIVE</span>
          </div>
        ) : !isMobile ? (
          <div className="flex items-center gap-2">
            <FaClock className="w-3 h-3" />
            <span>{formatDuration(station.duration)}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StationListItem;

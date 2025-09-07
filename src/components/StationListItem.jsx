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
      className={`group flex items-center gap-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-white/5 relative
        ${isSelected ? 'bg-pink-500/10' : ''}
        ${!station.audioUrl ? 'opacity-60' : ''}
        ${isMobile ? 'p-2 xs:p-1.5 min-h-[56px] xs:min-h-[48px] border border-white/5 bg-white/5' : 'p-3'}`}
      onClick={() => station.audioUrl && onSelect(station)}
    >
      {/* Track Number / Play Button */}
      <div className={`flex items-center justify-center text-sm text-gray-400 group-hover:text-white pl-1 ${isMobile ? 'h-10 xs:h-8' : 'w-8 h-8'}`}>
        {isSelected ? (
          <span className={`text-pink-400 font-medium ${isMobile ? 'text-base xs:text-sm' : 'text-sm'}`}>{index + 1}</span>
        ) : (
          <span className="group-hover:hidden">{index + 1}</span>
        )}
        {!isSelected && station.audioUrl && (
          <FaPlay className={`hidden group-hover:block ${isMobile ? 'w-4 h-4 xs:w-3 xs:h-3' : 'w-4 h-4'}`} />
        )}
      </div>

      {/* Station Logo */}
      <div className={`rounded-lg overflow-hidden flex-shrink-0 ${isMobile ? 'w-12 h-12 xs:w-10 xs:h-10' : 'w-12 h-12'}`}>
        <img 
          src={station.logo} 
          alt={station.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Station Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${isSelected ? 'text-pink-400' : 'text-white group-hover:text-white'} ${isMobile ? 'text-base xs:text-sm' : 'text-sm'}`}>
          {station.name}
        </h3>
        <p className={`text-gray-400 truncate ${isMobile ? 'text-sm xs:text-xs' : 'text-xs'}`}>
          {station.tracklist?.[0]?.artist || 'Radio Station'}
        </p>
      </div>

      {/* Status / Duration */}
      <div className={`flex items-center gap-4 text-gray-400 ${isMobile ? 'text-base xs:text-sm' : 'text-sm'}`}>
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(station.id);
          }}
          className={`hover:text-pink-400 transition-colors ${isMobile ? 'p-2 xs:p-1.5 min-w-[44px] xs:min-w-[36px] min-h-[44px] xs:min-h-[36px] flex items-center justify-center' : 'p-1'}`}
        >
          {isFavorite ? (
            <FaHeart className={`text-pink-400 ${isMobile ? 'w-4 h-4 xs:w-3 xs:h-3' : 'w-4 h-4'}`} />
          ) : (
            <FaRegHeart className={`hover:text-pink-400 ${isMobile ? 'w-4 h-4 xs:w-3 xs:h-3' : 'w-4 h-4'}`} />
          )}
        </button>

        {!isMobile && !station.audioUrl ? (
          <span className="bg-gray-700 text-gray-300 rounded px-2 py-1 text-xs">Coming Soon</span>
        ) : !isMobile && isSelected ? (
          <div className="flex items-center gap-1">
            <div className="bg-pink-500 rounded-full animate-pulse w-2 h-2"></div>
            <span className="text-pink-400 font-medium text-xs">LIVE</span>
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

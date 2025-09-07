import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';

const StationCard = ({ station, onSelect, isSelected, isPlaying, size = 'default', compactMinWidth = 120 }) => {
  const isMobile = useIsMobile();
  const isCompact = size === 'compact';
  
  return (
    <div 
      className={`relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out group cursor-pointer border border-white/10
        ${isSelected ? '' : 'hover:border-white/20'}
        ${!station.audioUrl ? 'opacity-60' : 'hover:scale-[1.01]'}
        ${isCompact ? 'flex-shrink-0' : ''}`} 
      style={isCompact ? { minWidth: typeof compactMinWidth === 'number' ? `${compactMinWidth}px` : compactMinWidth } : undefined}
      onClick={() => station.audioUrl && onSelect(station)}
    >
      {/* Pink Active Dot */}
      {isSelected && isPlaying && (
        <div className="absolute top-2 left-2 xs:top-1.5 xs:left-1.5 w-3 h-3 xs:w-2.5 xs:h-2.5 bg-pink-500 rounded-full border-2 border-white/20 z-20 animate-subtle-blink"></div>
      )}
      
      <img 
        src={station.logo} 
        alt={station.name} 
        draggable="false" 
        className={`w-full h-full object-cover ${isCompact ? 'aspect-square' : 'aspect-square'}`}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end 
        ${isCompact || isMobile ? 'p-2 xs:p-1.5' : 'p-3'} 
        ${!station.audioUrl ? 'bg-black/70' : ''}`}>
        <h3 className={`font-bold text-white 
          ${isCompact || isMobile ? 'text-xs xs:text-[10px]' : 'text-sm'}`}>{station.name}</h3>
        {!station.audioUrl && (
          <span className={`text-gray-400 mt-1 
            ${isCompact || isMobile ? 'text-[10px] xs:text-[8px]' : 'text-xs'}`}>Coming Soon</span>
        )}
      </div>
      {station.audioUrl && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isSelected && isPlaying ? (
            <FaPause className={`text-white 
              ${isCompact || isMobile ? 'w-4 h-4 xs:w-3 xs:h-3' : 'w-8 h-8'}`} />
          ) : (
            <FaPlay className={`ml-1 text-white 
              ${isCompact || isMobile ? 'w-4 h-4 xs:w-3 xs:h-3' : 'w-8 h-8'}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default StationCard;

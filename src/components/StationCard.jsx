import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';
import LoadingSkeleton from './LoadingSkeleton';

const StationCard = ({ station, onSelect, isSelected, isPlaying, size = 'default', compactMinWidth = 120, initialLoading = false }) => {
  const isMobile = useIsMobile();
  const isCompact = size === 'compact';
  const isPlayable = !!(station?.youtubeUrl || station?.audioUrl);
  
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(initialLoading);
  const minDisplayRef = useRef(null);
  useEffect(() => {
    // If we're not in initial loading phase and image hasn't loaded, don't show skeleton
    if (!initialLoading && !imgLoaded) {
      setShowSkeleton(false);
      return;
    }

    // Ensure skeleton shows at least briefly to avoid flicker when images are cached
    if (!imgLoaded) {
      setShowSkeleton(true);
      return;
    }

    // When image loaded, wait a minimum before hiding skeleton (5s to keep skeleton visible)
    const MIN_MS = 5000;
    clearTimeout(minDisplayRef.current);
    minDisplayRef.current = setTimeout(() => setShowSkeleton(false), MIN_MS);

    return () => clearTimeout(minDisplayRef.current);
  }, [imgLoaded, initialLoading]);

  return (
    <div 
      className={`station-card relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out group cursor-pointer border border-white/10
        ${isSelected ? '' : 'hover:border-white/20'}
        ${!isPlayable ? 'opacity-60' : 'hover:scale-[1.01]'}
        ${isCompact ? 'flex-shrink-0 w-full aspect-square' : ''}
        ${showSkeleton ? 'pointer-events-none select-none' : ''}`} 
      style={isCompact ? { minWidth: typeof compactMinWidth === 'number' ? `${compactMinWidth}px` : compactMinWidth } : undefined}
      onClick={() => { if (showSkeleton) return; if (isPlayable) onSelect(station); }}
      aria-disabled={showSkeleton}
    >
      {/* Pink Active Dot (hide while skeleton showing) */}
      {!showSkeleton && isSelected && isPlaying && (
        <div className="absolute top-2 left-2 xs:top-1.5 xs:left-1.5 w-3 h-3 xs:w-2.5 xs:h-2.5 bg-pink-500 rounded-full border-2 border-white/20 z-20 animate-subtle-blink"></div>
      )}
      
      {/* Image with skeleton while loading */}
      <div className="w-full h-full relative">
        {showSkeleton && (
          <LoadingSkeleton className="w-full h-full" />
        )}
        <img 
          src={station.logo} 
          alt={station.name} 
          draggable="false" 
          className={`w-full h-full object-cover aspect-square ${showSkeleton ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />
      </div>
      {/* Overlay content (hidden while skeleton shows) */}
      {!showSkeleton && (
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end 
          ${isCompact || isMobile ? 'p-2 xs:p-1.5' : 'p-3'} 
          ${!isPlayable ? 'bg-black/70' : ''}`}>
          <h3 className={`font-bold text-white 
            ${isCompact || isMobile ? 'text-xs xs:text-[10px]' : 'text-sm'}`}>{station.name}</h3>
          {!isPlayable && (
            <span className={`text-gray-400 mt-1 
              ${isCompact || isMobile ? 'text-[10px] xs:text-[8px]' : 'text-xs'}`}>Coming Soon</span>
          )}
        </div>
      )}
      {isPlayable && !showSkeleton && (
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

import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const GameCard = ({ game, isDisabled, onSelect, isSelected }) => {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Small delay to prevent initial mount animations
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile) {
    return (
      <div
        className={`relative rounded-xl overflow-hidden border border-white/10 w-[200px] xs:w-[160px] h-[112px] xs:h-[90px] flex-shrink-0 group
          ${isDisabled ? 'opacity-70 grayscale-[50%]' : 'cursor-pointer hover:border-white/30'} ${isMounted ? 'transition-all duration-300' : ''}`
        }
        onClick={() => !isDisabled && onSelect(game)}
      >
        {/* Pink Active Dot */}
        {isSelected && (
          <div className="absolute top-2 left-2 xs:top-1.5 xs:left-1.5 w-3 h-3 xs:w-2.5 xs:h-2.5 bg-pink-500 rounded-full border-2 border-white/20 z-20 animate-subtle-blink"></div>
        )}
        
        {/* Background Banner */}
        <img src={game.banner} alt={game.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="relative w-full h-full flex flex-col justify-end p-3 xs:p-2">
          <img src={game.logo} alt={`${game.name} logo`} className="max-h-10 xs:max-h-8 max-w-[140px] xs:max-w-[100px] object-contain self-start drop-shadow-lg" />
        </div>
        
        {/* Status Badge */}
        {isDisabled && (
          <div className="absolute top-2 right-2 xs:top-1 xs:right-1 text-xs xs:text-[10px] bg-black/60 backdrop-blur-md text-gray-200 px-2 py-1 xs:px-1.5 xs:py-0.5 rounded-full z-10 font-medium">
            SOON
          </div>
        )}
         {!isDisabled && (
          <div className="absolute top-2 right-2 xs:top-1 xs:right-1 text-xs xs:text-[10px] bg-pink-600/80 backdrop-blur-md text-white px-2 py-1 xs:px-1.5 xs:py-0.5 rounded-full z-10 font-bold">
            PLAY
          </div>
        )}
      </div>
    );
  }

  // Theme colors for each GTA game
  const getGameThemeColor = (gameId) => {
    const themes = {
      'vcs': 'bg-gradient-to-br from-pink-900/40 to-purple-900/40', // Vice City Stories - neon pink/purple
      'vc': 'bg-gradient-to-br from-pink-800/40 to-cyan-800/40',    // Vice City - 80s neon
      'sa': 'bg-gradient-to-br from-orange-900/40 to-yellow-900/40', // San Andreas - California sunset
      'gtaiv': 'bg-gradient-to-br from-gray-800/40 to-blue-900/40',  // GTA IV - dark urban
      'gtav': 'bg-gradient-to-br from-green-900/40 to-blue-900/40',  // GTA V - Los Santos green/blue
      'gta3': 'bg-gradient-to-br from-gray-900/40 to-slate-800/40'   // GTA III - dark gritty
    };
    return themes[gameId] || 'bg-gradient-to-br from-white/10 to-white/5';
  };

  const themeColor = getGameThemeColor(game.id);
  
  return (
    <div 
      className={`relative rounded-lg aspect-square flex items-center justify-center cursor-pointer overflow-hidden border border-white/10 ${themeColor}
        ${isSelected ? '' : 'hover:border-white/20'} 
        ${isMobile ? 'p-2' : 'p-4'} ${isMounted ? 'transition-all duration-300' : ''}`}
      onClick={() => !isDisabled && onSelect(game)}
    >
    {/* Pink Active Dot */}
    {isSelected && (
      <div className="absolute top-2 left-2 w-3 h-3 bg-pink-500 rounded-full border-2 border-white/20 z-20 animate-subtle-blink"></div>
    )}
    
    {/* Game logo */}
    {game.logo ? (
      <img 
        src={game.logo} 
        alt={game.name}
        className={`max-w-full max-h-full object-contain
          ${isDisabled ? 'opacity-50 grayscale' : 'opacity-90'}`}
      />
    ) : (
      /* Fallback for games without logo */
      <div className={`rounded-full flex items-center justify-center font-bold
        ${isMobile ? 'w-12 h-12 text-lg' : 'w-16 h-16 text-2xl'}
        ${isSelected ? 'bg-pink-500/30 text-pink-300' : 
          isDisabled ? 'bg-white/10 text-gray-400' : 'bg-white/20 text-white'}`}>
        {game.name.split(' ').pop().charAt(0)}
      </div>
    )}
    
    {/* Status badges */}
    {isDisabled && (
      <div className={`absolute top-2 right-2 text-xs bg-gray-700/90 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-full z-10 ${isMobile ? 'text-[10px] px-1.5 py-0.5' : ''}`}>
        SOON
      </div>
    )}
    {!isDisabled && !isSelected && (
      <div className={`absolute top-2 right-2 text-xs bg-pink-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10 ${isMobile ? 'text-[10px] px-1.5 py-0.5' : ''}`}>
        ACTIVE
      </div>
    )}
    {isSelected && !isMobile && (
      <div className="absolute top-2 right-2 text-xs bg-pink-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10">
        SELECTED
      </div>
    )}
  </div>
  );
};

export default GameCard;

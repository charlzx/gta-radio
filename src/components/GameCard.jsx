import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import LoadingSkeleton from './LoadingSkeleton';

const GameCard = ({ game, isDisabled, onSelect, isSelected, initialLoading = false }) => {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(initialLoading);
  const minDisplayRef = useRef(null);

  const MIN_MS = 5000;

  // If initialLoading is enabled on mount, ensure skeleton stays visible for MIN_MS
  useEffect(() => {
    if (!initialLoading) return;
    setShowSkeleton(true);
    clearTimeout(minDisplayRef.current);
    minDisplayRef.current = setTimeout(() => setShowSkeleton(false), MIN_MS);
    return () => clearTimeout(minDisplayRef.current);
  }, [initialLoading]);

  useEffect(() => {
    // Determine required images and their loaded state
    // Banner is only rendered on mobile, so only require it when `isMobile`.
    const bannerRequired = isMobile && !!game.banner;
    const logoRequired = !!game.logo;
    const bannerOk = bannerRequired ? bannerLoaded : true;
    const logoOk = logoRequired ? logoLoaded : true;
    const allLoaded = bannerOk && logoOk;

    // If not in initial loading phase and not all images are ready, don't show skeleton
    if (!initialLoading && !allLoaded) {
      setShowSkeleton(false);
      return;
    }

    // If any image still loading, show skeleton
    if (!allLoaded) {
      setShowSkeleton(true);
      return;
    }

    // When all images reported loaded, keep skeleton visible for a minimum time (match StationCard = 5000ms)
    const MIN_MS = 5000;
    clearTimeout(minDisplayRef.current);
    minDisplayRef.current = setTimeout(() => setShowSkeleton(false), MIN_MS);

    return () => clearTimeout(minDisplayRef.current);
  }, [bannerLoaded, logoLoaded, game.banner, game.logo, initialLoading, isMobile]);

  useEffect(() => {
    // Small delay to prevent initial mount animations
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile) {
    return (
      <div
        className={`relative rounded-xl overflow-hidden border border-white/10 w-[200px] xs:w-[160px] h-[112px] xs:h-[90px] flex-shrink-0 group
          ${isDisabled ? 'opacity-70 grayscale-[50%] cursor-not-allowed' : 'cursor-pointer hover:border-white/30'} ${isMounted ? 'transition-all duration-300' : ''} ${showSkeleton ? 'pointer-events-none select-none' : ''}`
        }
        onClick={() => { if (showSkeleton) return; if (!isDisabled) onSelect(game); }}
        aria-disabled={showSkeleton || isDisabled}
      >
        {/* Background Banner */}
        <div className="absolute inset-0 w-full h-full">
          {!bannerLoaded && <LoadingSkeleton className="w-full h-full" />}
          <img src={game.banner} alt={game.name} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${bannerLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setBannerLoaded(true)} onError={() => setBannerLoaded(true)} />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content (hidden while skeleton shows) */}
        {!showSkeleton && (
          <div className="relative w-full h-full flex flex-col justify-end p-3 xs:p-2">
            {!logoLoaded && <LoadingSkeleton className="max-h-10 xs:max-h-8 max-w-[140px] xs:max-w-[100px] object-contain self-start" rounded={false} />}
            <img src={game.logo} alt={`${game.name} logo`} className={`max-h-10 xs:max-h-8 max-w-[140px] xs:max-w-[100px] object-contain self-start drop-shadow-lg ${logoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`} onLoad={() => setLogoLoaded(true)} onError={() => setLogoLoaded(true)} />
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
      className={`relative rounded-lg aspect-square flex items-center justify-center overflow-hidden border border-white/10 ${themeColor}
        ${isSelected ? '' : 'hover:border-white/20'} 
        ${isMobile ? 'p-2' : 'p-4'} ${isMounted ? 'transition-all duration-300' : ''} ${showSkeleton ? 'pointer-events-none select-none' : isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => { if (showSkeleton || isDisabled) return; onSelect(game); }}
      aria-disabled={showSkeleton || isDisabled}
    >
    {/* Full-card skeleton overlay (covers padding, badges and content) */}
    {showSkeleton && (
      <div className="absolute inset-0 z-40 pointer-events-none">
        {/* Use an opaque background so the skeleton fully covers the card */}
        <LoadingSkeleton className="w-full h-full rounded-lg" bgClass="bg-gray-900" />
      </div>
    )}

    {/* Game logo (under the skeleton while loading) */}
    <div className="w-full h-full flex items-center justify-center relative">
      {game.logo ? (
        <img 
          src={game.logo} 
          alt={game.name}
          className={`max-w-full max-h-full object-contain relative z-10
            ${isDisabled ? 'opacity-50 grayscale' : 'opacity-90'} ${showSkeleton ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 ${showSkeleton && !isMobile ? 'invisible' : 'visible'}`}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoLoaded(true)}
        />
      ) : (
        /* Fallback for games without logo */
        <div className={`rounded-full flex items-center justify-center font-bold relative z-10
          ${isMobile ? 'w-12 h-12 text-lg' : 'w-16 h-16 text-2xl'}
          ${isSelected ? 'bg-pink-500/30 text-pink-300' : 
            isDisabled ? 'bg-white/10 text-gray-400' : 'bg-white/20 text-white'}`}>
          {game.name.split(' ').pop().charAt(0)}
        </div>
      )}
    </div>

  </div>
  );
};

export default GameCard;

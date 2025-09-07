import React from 'react';

const GameCard = ({ game, isDisabled, onSelect, isSelected }) => (
  <div 
    className={`relative rounded-lg h-28 flex items-center justify-center p-2 transition-all duration-300 cursor-pointer overflow-hidden border border-white/10
      ${isSelected ? 'ring-1 ring-pink-500/50 border-pink-500/30' : 'hover:border-white/20'} 
      ${isDisabled ? 'hover:scale-[1.01]' : 'hover:scale-[1.01]'}`}
    onClick={() => !isDisabled && onSelect(game)}
  >
    {/* Banner image with alt text fallback */}
    {game.banner ? (
      <img 
        src={game.banner} 
        alt={game.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      /* Fallback background for games without banner */
      <div className={`absolute inset-0 
        ${isSelected ? 'bg-pink-500/20' : 
          isDisabled ? 'bg-white/5' : 'bg-white/10'}`}></div>
    )}

    {/* Dark overlay for better visibility */}
    <div className={`absolute inset-0 
      ${isSelected ? 'bg-gradient-to-t from-pink-900/70 to-pink-900/0' : 
        isDisabled ? 'bg-black/80' : 'bg-gradient-to-t from-black/80 to-black/60 hover:from-black/70 hover:to-black/50'} 
      transition-all duration-300`}></div>
    
    {/* Show text only when there's no banner image */}
    {!game.banner && (
      <h3 className={`relative z-10 font-bold text-lg text-center 
        ${isDisabled ? 'text-gray-300' : 'text-white'} 
        drop-shadow-2xl shadow-black/80`}
        style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)'
        }}>
        {game.name}
      </h3>
    )}
    
    {isDisabled && (
      <div className="absolute top-2 right-2 text-xs bg-gray-700/90 backdrop-blur-sm text-gray-300 px-1.5 py-0.5 rounded-full z-10">
        SOON
      </div>
    )}
    {!isDisabled && !isSelected && (
      <div className="absolute top-2 right-2 text-xs bg-pink-600/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full z-10">
        ACTIVE
      </div>
    )}
    {isSelected && (
      <div className="absolute top-2 right-2 text-xs bg-pink-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full z-10">
        SELECTED
      </div>
    )}
  </div>
);

export default GameCard;

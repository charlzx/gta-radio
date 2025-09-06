import React from 'react';

const GameCard = ({ game, isDisabled, onSelect, isSelected }) => (
  <div 
    className={`relative rounded-lg h-32 flex items-center justify-center p-4 transition-all duration-300 cursor-pointer overflow-hidden
      ${isSelected ? 'ring-2 ring-pink-500' : ''} 
      ${isDisabled ? 'hover:scale-102' : 'hover:scale-102'}`}
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
      <div className="absolute top-3 right-3 text-xs bg-gray-700/90 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-full z-10">
        SOON
      </div>
    )}
    {!isDisabled && !isSelected && (
      <div className="absolute top-3 right-3 text-xs bg-pink-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10">
        ACTIVE
      </div>
    )}
    {isSelected && (
      <div className="absolute top-3 right-3 text-xs bg-pink-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10">
        SELECTED
      </div>
    )}
  </div>
);

export default GameCard;

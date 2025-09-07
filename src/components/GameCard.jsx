import React from 'react';

const GameCard = ({ game, isDisabled, onSelect, isSelected }) => {
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
      className={`relative rounded-lg aspect-square flex items-center justify-center p-4 transition-all duration-300 cursor-pointer overflow-hidden border border-white/10 ${themeColor}
        ${isSelected ? 'ring-2 ring-pink-500/50 border-pink-500/30' : 'hover:border-white/20'} 
        ${isDisabled ? 'hover:scale-[1.02]' : 'hover:scale-[1.02]'}`}
      onClick={() => !isDisabled && onSelect(game)}
    >
    {/* Game logo */}
    {game.logo ? (
      <img 
        src={game.logo} 
        alt={game.name}
        className={`max-w-full max-h-full object-contain transition-all duration-300
          ${isDisabled ? 'opacity-50 grayscale' : 'opacity-90 hover:opacity-100'}`}
      />
    ) : (
      /* Fallback for games without logo */
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
        ${isSelected ? 'bg-pink-500/30 text-pink-300' : 
          isDisabled ? 'bg-white/10 text-gray-400' : 'bg-white/20 text-white'}`}>
        {game.name.split(' ').pop().charAt(0)}
      </div>
    )}
    
    {/* Status badges */}
    {isDisabled && (
      <div className="absolute top-2 right-2 text-xs bg-gray-700/90 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-full z-10">
        SOON
      </div>
    )}
    {!isDisabled && !isSelected && (
      <div className="absolute top-2 right-2 text-xs bg-pink-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10">
        ACTIVE
      </div>
    )}
    {isSelected && (
      <div className="absolute top-2 right-2 text-xs bg-pink-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full z-10">
        SELECTED
      </div>
    )}
  </div>
  );
};

export default GameCard;

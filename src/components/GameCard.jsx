import React from 'react';

const GameCard = ({ game, isDisabled, onSelect, isSelected }) => (
  <div 
    className={`relative rounded-lg h-24 flex items-center justify-center p-4 transition-all duration-300 cursor-pointer
      ${isSelected ? 'bg-pink-500/20 ring-2 ring-pink-500' : 
        isDisabled ? 'bg-white/5 hover:bg-white/8' : 'bg-white/10 hover:bg-white/15'}`}
    onClick={() => !isDisabled && onSelect(game)}
  >
    <h3 className={`font-bold text-lg text-center ${isDisabled ? 'text-gray-600' : 'text-white'}`}>
      {game.name}
    </h3>
    {isDisabled && (
      <div className="absolute top-2 right-2 text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
        SOON
      </div>
    )}
    {!isDisabled && !isSelected && (
      <div className="absolute top-2 right-2 text-xs bg-pink-600 text-white px-2 py-0.5 rounded-full">
        ACTIVE
      </div>
    )}
    {isSelected && (
      <div className="absolute top-2 right-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">
        SELECTED
      </div>
    )}
  </div>
);

export default GameCard;

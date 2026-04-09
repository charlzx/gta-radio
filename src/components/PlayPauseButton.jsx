import React from 'react';
import { Play, Pause } from 'lucide-react';

const PlayPauseButton = ({ isPlaying, onToggle, size = 'md' }) => {
  const sizes = { 
    sm: 'w-8 h-8', 
    md: 'w-14 h-14', 
    lg: 'w-20 h-20' 
  };
  const iconSizes = { 
    sm: 16, 
    md: 32, 
    lg: 40 
  };
  
  return (
    <button 
      onClick={onToggle} 
      className={`${sizes[size]} rounded-full bg-transparent text-white flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none`}
    >
      {isPlaying ? (
        <Pause size={iconSizes[size]} fill="white" />
      ) : (
        <Play size={iconSizes[size]} fill="white" className="ml-0.5" />
      )}
    </button>
  );
};

export default PlayPauseButton;

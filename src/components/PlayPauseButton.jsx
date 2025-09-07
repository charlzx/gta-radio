import React from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

const PlayPauseButton = ({ isPlaying, onToggle, size = 'md' }) => {
  const sizes = { 
    sm: 'w-8 h-8', 
    md: 'w-14 h-14', 
    lg: 'w-20 h-20' 
  };
  const iconSizes = { 
    sm: 'text-sm', 
    md: 'text-3xl', 
    lg: 'text-4xl' 
  };
  
  return (
    <button 
      onClick={onToggle} 
      className={`${sizes[size]} rounded-full bg-transparent text-white flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white`}
    >
      {isPlaying ? (
        <FaPause className={iconSizes[size]} />
      ) : (
        <FaPlay className={`${iconSizes[size]} ml-1`} />
      )}
    </button>
  );
};

export default PlayPauseButton;

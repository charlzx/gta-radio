import React from 'react';
import { FaVolumeDown, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const VolumeControl = ({ volume, isMuted, onVolumeChange, onToggleMute }) => {
  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={onToggleMute}
        className="text-gray-400 hover:text-white transition-colors"
      >
        {isMuted || volume === 0 ? (
          <FaVolumeMute className="w-4 h-4" />
        ) : volume < 0.5 ? (
          <FaVolumeDown className="w-4 h-4" />
        ) : (
          <FaVolumeUp className="w-4 h-4" />
        )}
      </button>
      
      <div className="relative flex-1 max-w-24">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05" 
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer volume-slider"
        />
      </div>
    </div>
  );
};

export default VolumeControl;

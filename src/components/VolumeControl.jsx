import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

const VolumeControl = ({ volume, isMuted, onVolumeChange, onToggleMute }) => {
  const volumePercentage = isMuted ? 0 : volume * 100;
  
  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={onToggleMute}
        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || volume === 0 ? (
          <VolumeX size={18} />
        ) : volume < 0.5 ? (
          <Volume1 size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>
      
      <div className="relative flex-1 h-1.5 flex items-center">
        {/* Track background */}
        <div className="absolute inset-0 h-1.5 rounded-full bg-white/10"></div>
        
        {/* Filled track with gradient */}
        <div 
          className="absolute left-0 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-150 pointer-events-none"
          style={{ width: `${volumePercentage}%` }}
        ></div>
        
        {/* Input slider */}
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-1.5 bg-transparent rounded-full appearance-none cursor-pointer z-10"
          style={{
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
          aria-label="Volume"
        />
      </div>
      
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: transform 0.15s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: none;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: transform 0.15s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default VolumeControl;

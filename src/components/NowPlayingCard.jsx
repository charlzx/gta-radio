import React from 'react';
import { FaExpand, FaStepBackward, FaStepForward } from 'react-icons/fa';
import PlayPauseButton from './PlayPauseButton';
import VolumeControl from './VolumeControl';

const NowPlayingCard = ({ 
  currentStation, 
  currentGame, 
  nowPlaying, 
  isPlaying, 
  currentTime, 
  duration, 
  formatTime,
  onTogglePlayPause,
  onPreviousTrack,
  onNextTrack,
  onOpenFocusMode,
  LiveIndicator,
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute 
}) => {
  return (
    <div className="bg-pink-900/10 backdrop-blur-2xl border border-white/10 rounded-lg p-6 text-center relative">
      {/* Expand button at top right */}
      <button 
        onClick={onOpenFocusMode} 
        disabled={!currentStation} 
        className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FaExpand className="w-4 h-4" />
      </button>
      
      <div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="font-bold text-lg text-gray-400">Now Playing</h2>
          <LiveIndicator className="" />
        </div>
        <img 
          src={currentStation?.logo || currentGame.logo} 
          alt="" 
          draggable="false" 
          className="w-40 h-40 mx-auto rounded-lg shadow-lg aspect-square object-contain"
        />
        <h3 className="text-xl font-bold mt-4 truncate">{nowPlaying.title}</h3>
        <p className="text-pink-400 truncate">{nowPlaying.artist}</p>
        
        {/* Time display and progress bar */}
        {currentStation && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1">
              <div 
                className="bg-pink-500 h-1 rounded-full transition-all duration-300" 
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-4">
        {currentStation && (
          <>
            <button 
              onClick={onPreviousTrack}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <FaStepBackward className="w-4 h-4" />
            </button>
            <PlayPauseButton isPlaying={isPlaying} onToggle={onTogglePlayPause} />
            <button 
              onClick={onNextTrack}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <FaStepForward className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Volume Control */}
      {currentStation && (
        <div className="mt-4">
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
        </div>
      )}
    </div>
  );
};

export default NowPlayingCard;

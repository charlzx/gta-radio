import React from 'react';
import { FaCompress, FaStepBackward, FaStepForward } from 'react-icons/fa';
import PlayPauseButton from './PlayPauseButton';

const FocusMode = ({ 
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
  onCloseFocusMode
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in-up"
    >
      {/* Dynamic Blurred Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 scale-110 blur-3xl opacity-40"
        style={{ backgroundImage: `url(${currentStation.logo})` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/90 to-black" />

      {/* Close Button */}
      <button 
        onClick={onCloseFocusMode} 
        className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all z-10"
      >
        <FaCompress className="w-7 h-7" />
      </button>

      {/* Main Content Grid */}
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Side: Album Art */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            <div className="absolute -inset-4 bg-pink-500/20 rounded-3xl blur-3xl animate-pulse-slow" />
            <img 
              src={currentStation.logo} 
              alt={currentStation.name}
              draggable="false" 
              className="relative w-full h-full rounded-3xl shadow-2xl border-2 border-white/10 object-cover"
            />
          </div>
        </div>

        {/* Right Side: Player UI */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {nowPlaying.title}
          </h1>
          <p className="text-2xl sm:text-3xl text-pink-400 font-medium mt-2">
            {nowPlaying.artist}
          </p>
          <p className="text-lg text-gray-400 mt-4 font-medium">
            on <span className="font-bold text-gray-300">{currentStation.name}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            from {currentGame.name}
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-lg mt-8">
            <div className="w-full bg-white/10 rounded-full h-2 group">
              <div 
                className="bg-gradient-to-r from-pink-500 to-pink-400 h-2 rounded-full relative" 
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6 mt-8">
            <button className="text-white/70 hover:text-white transition-colors">
              <FaStepBackward className="w-7 h-7" onClick={onPreviousTrack} />
            </button>
            <PlayPauseButton isPlaying={isPlaying} onToggle={onTogglePlayPause} size="lg"/>
            <button className="text-white/70 hover:text-white transition-colors">
              <FaStepForward className="w-7 h-7" onClick={onNextTrack} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;

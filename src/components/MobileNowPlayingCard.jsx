import React, { useMemo } from 'react';
import { FaStepBackward, FaStepForward, FaChevronDown } from 'react-icons/fa';
import PlayPauseButton from './PlayPauseButton';
import VolumeControl from './VolumeControl';

const MobileNowPlayingCard = ({
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
  onCollapse,
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}) => {
  const progressPct = useMemo(() => {
    if (!duration || duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  const { nextTrack } = useMemo(() => {
    const fallback = { nextTrack: null };
    const tl = currentStation?.tracklist;
    if (!tl || !Array.isArray(tl) || !Number.isFinite(currentTime)) return fallback;
    const idx = tl.findIndex(
      (t) => currentTime >= t.startTime && currentTime < t.endTime
    );
    if (idx === -1) return fallback;
    return {
      nextTrack: tl[idx + 1] || null,
    };
  }, [currentStation?.tracklist, currentTime]);

  if (!currentStation) {
    return (
      <div className="bg-black/95 backdrop-blur-xl border-t border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-white">Now Playing</div>
          <button
            onClick={onCollapse}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Collapse player"
          >
            <FaChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No station selected</div>
          <div className="text-sm text-gray-500">Pick a station to start listening</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/95 backdrop-blur-xl border-t border-white/20 p-4 max-h-[80vh] overflow-y-auto">
      {/* Header with collapse button */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-bold text-white">Now Playing</div>
        <button
          onClick={onCollapse}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Collapse player"
        >
          <FaChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Station Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={currentStation.logo || currentGame.logo}
          alt={currentStation.name}
          className="w-16 h-16 rounded-lg object-contain bg-black/30 border border-white/10"
          draggable="false"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-bold tracking-wide">
              LIVE
            </span>
          </div>
          <div className="text-white font-bold text-lg mb-1">{currentStation.name}</div>
          <div className="text-xs text-gray-400 mb-2">{currentGame.name}</div>
          <div className="text-pink-300 text-sm">
            {nowPlaying?.type === 'Song' && nowPlaying.artist 
              ? `${nowPlaying.artist} — ${nowPlaying.title}` 
              : nowPlaying?.title || 'Tuned'
            }
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={onPreviousTrack}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
          aria-label="Previous"
        >
          <FaStepBackward className="w-5 h-5" />
        </button>
        <PlayPauseButton isPlaying={isPlaying} onToggle={onTogglePlayPause} size="lg" />
        <button
          onClick={onNextTrack}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
          aria-label="Next"
        >
          <FaStepForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-300 font-medium">Volume</div>
          <div className="text-xs text-gray-400">
            {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
          </div>
        </div>
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={onVolumeChange}
          onToggleMute={onToggleMute}
        />
      </div>

      {/* Up Next */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="text-sm font-semibold text-white mb-2">Up Next</div>
        {nextTrack ? (
          <div>
            <div className="text-sm text-pink-300 mb-1">
              {nextTrack.type === 'Song' && nextTrack.artist 
                ? `${nextTrack.artist} — ${nextTrack.title}` 
                : nextTrack.title
              }
            </div>
            <div className="text-xs text-gray-500">
              {formatTime(nextTrack.startTime)} • {formatTime(nextTrack.endTime)}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400">No upcoming item</div>
        )}
      </div>
    </div>
  );
};

export default MobileNowPlayingCard;
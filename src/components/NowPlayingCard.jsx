import React, { useMemo } from 'react';
import { FaExpand, FaStepBackward, FaStepForward } from 'react-icons/fa';
import PlayPauseButton from './PlayPauseButton';
import VolumeControl from './VolumeControl';

// Fresh multi-card Now Playing panel
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
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}) => {
  const progressPct = useMemo(() => {
    if (!duration || duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  const { nextTrack, laterTrack } = useMemo(() => {
    const fallback = { nextTrack: null, laterTrack: null };
    const tl = currentStation?.tracklist;
    if (!tl || !Array.isArray(tl) || !Number.isFinite(currentTime)) return fallback;
    const idx = tl.findIndex(
      (t) => currentTime >= t.startTime && currentTime < t.endTime
    );
    if (idx === -1) return fallback;
    return {
      nextTrack: tl[idx + 1] || null,
      laterTrack: tl[idx + 2] || null,
    };
  }, [currentStation?.tracklist, currentTime]);

  const Placeholder = (
    <div className="bg-white/5 border border-white/10 rounded-lg p-5 text-center">
      <div className="text-sm text-gray-400">Now Playing</div>
      <div className="mt-2 text-lg font-bold text-white">No station selected</div>
      <p className="text-gray-400 text-sm mt-1">Pick a station to start listening</p>
    </div>
  );

  if (!currentStation) {
    return (
      <div className="space-y-3">
        {Placeholder}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Controls</div>
            <button
              className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10 text-gray-300 cursor-not-allowed"
              disabled
            >
              Focus
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-3 opacity-50">
            <button className="p-2 rounded-full bg-white/10" disabled>
              <FaStepBackward className="w-4 h-4" />
            </button>
            <PlayPauseButton isPlaying={false} onToggle={() => {}} />
            <button className="p-2 rounded-full bg-white/10" disabled>
              <FaStepForward className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-3">Volume</div>
          <div className="opacity-50">
            <VolumeControl
              volume={0}
              isMuted={true}
              onVolumeChange={() => {}}
              onToggleMute={() => {}}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Card 1: Station + Live + Expand */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-lg p-4 overflow-hidden">
        <button
          onClick={onOpenFocusMode}
          className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors"
          aria-label="Open focus mode"
        >
          <FaExpand className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 pr-12">
          <img
            src={currentStation.logo || currentGame.logo}
            alt={currentStation.name}
            className="w-14 h-14 rounded-lg object-cover aspect-square bg-black/30 border border-white/10"
            draggable="false"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-bold tracking-wide">
                LIVE
              </span>
            </div>
            <div className="mt-1 text-white font-bold truncate">{currentStation.name}</div>
            <div className="text-[11px] text-gray-400">{currentGame.name}</div>
            <div className="text-pink-300 text-sm truncate mt-0.5">
              {nowPlaying?.type === 'Song' && nowPlaying.artist ? `${nowPlaying.artist} — ${nowPlaying.title}` : nowPlaying?.title || 'Tuned' }
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Progress + Transport */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            onClick={onPreviousTrack}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            aria-label="Previous"
          >
            <FaStepBackward className="w-4 h-4" />
          </button>
          <PlayPauseButton isPlaying={isPlaying} onToggle={onTogglePlayPause} />
          <button
            onClick={onNextTrack}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            aria-label="Next"
          >
            <FaStepForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card 3: Volume */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300 font-medium">Volume</div>
          <div className="text-[11px] text-gray-400">{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</div>
        </div>
        <div className="mt-3">
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
        </div>
      </div>

      {/* Card 4: Up Next */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="text-sm font-semibold text-white">Up Next</div>
        {nextTrack ? (
          <div className="mt-2">
            <div className="text-xs text-gray-400">Next</div>
            <div className="text-sm text-pink-300 truncate">
              {nextTrack.type === 'Song' && nextTrack.artist ? `${nextTrack.artist} — ${nextTrack.title}` : nextTrack.title}
            </div>
            <div className="text-[11px] text-gray-500">{formatTime(nextTrack.startTime)} • {formatTime(nextTrack.endTime)}</div>
          </div>
        ) : (
          <div className="mt-2 text-sm text-gray-400">No upcoming item</div>
        )}
        {laterTrack && (
          <div className="mt-3">
            <div className="text-xs text-gray-400">Later</div>
            <div className="text-sm text-gray-300 truncate">
              {laterTrack.type === 'Song' && laterTrack.artist ? `${laterTrack.artist} — ${laterTrack.title}` : laterTrack.title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NowPlayingCard;

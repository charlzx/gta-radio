import React, { useMemo } from 'react';
import { Maximize2, SkipBack, SkipForward, ListMusic, Repeat, Shuffle } from 'lucide-react';
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
  isSynced,
  onGoLive,
  onOpenPlaylist,
  loopOnEnd,
  shuffleOnEnd,
  onToggleLoopOnEnd,
  onToggleShuffleOnEnd,
}) => {
  const progressPct = useMemo(() => {
    if (!duration || duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  const stationMeta = currentStation?.stationMeta || null;

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
            <button className="rounded-full bg-transparent text-white" disabled>
              <SkipBack size={32} strokeWidth={2} fill="white" />
            </button>
            <PlayPauseButton isPlaying={false} onToggle={() => {}} />
            <button className="rounded-full bg-transparent text-white" disabled>
              <SkipForward size={32} strokeWidth={2} fill="white" />
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
      {/* Card 1: Station Info with Sync Status */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-lg p-4 overflow-hidden">
        {/* Sync status bar at top */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold tracking-wide flex items-center gap-1 whitespace-nowrap ${
              isSynced ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isSynced ? 'bg-white animate-blink' : 'bg-gray-400'
              }`}></span>
              {isSynced ? 'LIVE' : 'OUT OF SYNC'}
            </span>
            {!isSynced && (
              <button
                onClick={onGoLive}
                className="text-xs px-3 py-1 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-colors whitespace-nowrap"
              >
                Go Live
              </button>
            )}
          </div>
          <button
            onClick={onOpenFocusMode}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors flex-shrink-0"
            aria-label="Open focus mode"
          >
            <Maximize2 size={16} />
          </button>
        </div>
        
        {/* Station info below */}
        <div className="flex items-center gap-3">
          <img
            src={currentStation.logo || currentGame.logo}
            alt={currentStation.name}
            className="w-14 h-14 rounded-lg object-cover aspect-square bg-black/30 border border-white/10"
            draggable="false"
          />
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold truncate">{currentStation.name}</div>
            <div className="text-[11px] text-gray-400">{currentGame.name}</div>
          </div>
        </div>

      </div>

      {/* Card 2: Live Now Playing */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-2">Live Now Playing</div>
        <div className="text-sm text-pink-300 truncate">
          {nowPlaying?.type === 'Song' && nowPlaying.artist ? `${nowPlaying.artist} — ${nowPlaying.title}` : nowPlaying?.title || 'Tuned'}
        </div>
        <div className="text-xs text-gray-400 mt-0.5 mb-2">{nowPlaying?.type || 'Info'}</div>
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
            className="rounded-full bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
            aria-label="Previous"
          >
            <SkipBack size={32} strokeWidth={2} fill="white" />
          </button>
          <PlayPauseButton isPlaying={isPlaying} onToggle={onTogglePlayPause} />
          <button
            onClick={onNextTrack}
            className="rounded-full bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
            aria-label="Next"
          >
            <SkipForward size={32} strokeWidth={2} fill="white" />
          </button>
        </div>
      </div>

      {/* Card 3: Host */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Host</div>
        <div className="text-sm text-white font-semibold">
          {stationMeta?.host?.name || 'Unknown host'}
        </div>
        {stationMeta?.host?.style && (
          <div className="text-xs text-gray-300 mt-0.5">{stationMeta.host.style}</div>
        )}
      </div>

      {/* Card 4: Volume */}
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

      {/* Card 5: Playback Modes */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-300 font-medium">Playback Modes</div>
          <div className="text-[11px] text-gray-400">When station ends</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onToggleLoopOnEnd}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              loopOnEnd
                ? 'bg-pink-600 text-white border-pink-500'
                : 'bg-white/5 text-gray-300 border-white/15 hover:bg-white/10'
            }`}
            aria-pressed={loopOnEnd}
            aria-label="Loop current station when it ends"
          >
            <Repeat size={14} /> Loop End
          </button>
          <button
            onClick={onToggleShuffleOnEnd}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              shuffleOnEnd
                ? 'bg-pink-600 text-white border-pink-500'
                : 'bg-white/5 text-gray-300 border-white/15 hover:bg-white/10'
            }`}
            aria-pressed={shuffleOnEnd}
            aria-label="Shuffle to a different station when this one ends"
          >
            <Shuffle size={14} /> Shuffle End
          </button>
        </div>
      </div>

      {/* Card 6: Up Next */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-semibold text-white">Up Next</div>
          <button
            onClick={onOpenPlaylist}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="View playlist"
          >
            <ListMusic size={16} />
          </button>
        </div>
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

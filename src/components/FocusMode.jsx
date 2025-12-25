import React, { useEffect, useMemo, useRef } from 'react';
import { SkipBack, SkipForward, Power, Volume2, Radio } from 'lucide-react';
import PlayPauseButton from './PlayPauseButton';
import VolumeControl from './VolumeControl';

// Modern digital car radio UI for Focus Mode
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
  onCloseFocusMode,
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  onSeek,
}) => {
  const progressPct = useMemo(() => {
    if (!duration || duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  const { nextTrack } = useMemo(() => {
    const tl = currentStation?.tracklist;
    if (!tl || !Array.isArray(tl) || !Number.isFinite(currentTime)) return { nextTrack: null };
    const idx = tl.findIndex((t) => currentTime >= t.startTime && currentTime < t.endTime);
    return { nextTrack: idx >= 0 ? tl[idx + 1] || null : null };
  }, [currentStation?.tracklist, currentTime]);

  // Removed unused bgImage variable

  // Keyboard shortcuts (Escape to close, arrows/Home/End to seek)
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'Escape') { e.preventDefault(); onCloseFocusMode(); }
      if (e.key === 'ArrowRight' && onSeek && duration) { e.preventDefault(); onSeek(Math.min(duration, currentTime + 5)); }
      if (e.key === 'ArrowLeft' && onSeek) { e.preventDefault(); onSeek(Math.max(0, currentTime - 5)); }
      if (e.key === 'Home' && onSeek) { e.preventDefault(); onSeek(0); }
      if (e.key === 'End' && onSeek && duration) { e.preventDefault(); onSeek(Math.max(0, duration - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCloseFocusMode, onSeek, duration, currentTime]);

  // Timeline click seek
  const timelineRef = useRef(null);
  const onTimelineClick = (e) => {
    if (!onSeek || !duration || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    onSeek(Math.floor(duration * pct));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Glassy radio frame */}
      <div className="relative w-full max-w-3xl mx-auto aspect-[16/7] rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-2xl flex flex-col items-center justify-center p-0 md:p-6">
        {/* Power/exit button */}
        <button
          onClick={onCloseFocusMode}
          className="absolute top-4 right-4 z-40 p-3 rounded-full bg-white/10 hover:bg-red-600/80 border border-white/10 text-white shadow-lg transition-colors"
          aria-label="Exit focus mode"
        >
          <Power size={20} />
        </button>

        {/* Main display */}
        <div className="flex-1 w-full flex flex-col items-center justify-center px-4 md:px-8">
          {/* Station info row */}
          <div className="flex items-center gap-3 mb-2">
            <Radio size={20} className="text-pink-400 animate-pulse" />
            <span className="text-xs md:text-sm font-bold text-pink-400 uppercase tracking-widest">LIVE</span>
            <span className="text-white/70 text-xs md:text-sm">{currentGame.name}</span>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold text-xs md:text-sm">{currentStation.name}</span>
            <img src={currentStation.logo || currentGame.logo} alt="logo" className="ml-2 w-7 h-7 rounded bg-white/10 border border-white/10 object-contain" />
          </div>

          {/* Track info */}
          <div className="w-full text-center">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-1 truncate radio-glow">{nowPlaying?.title || currentStation.name}</h1>
            {nowPlaying?.artist && (
              <div className="text-pink-300 text-lg md:text-xl font-semibold truncate mb-2">{nowPlaying.artist}</div>
            )}
          </div>

          {/* Timeline */}
          <div className="w-full flex items-center gap-3 text-xs text-gray-300 font-mono mb-2">
            <span className="tabular-nums">{formatTime(currentTime)}</span>
            <div
              ref={timelineRef}
              onClick={onTimelineClick}
              className="relative flex-1 h-2 rounded-full bg-white/10 border border-white/10 cursor-pointer group overflow-hidden"
              role="slider"
              aria-label="Seek timeline"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={Math.floor(currentTime || 0)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (!onSeek || !duration) return;
                if (e.key === 'ArrowRight') { e.preventDefault(); onSeek(Math.min(duration, currentTime + 5)); }
                if (e.key === 'ArrowLeft') { e.preventDefault(); onSeek(Math.max(0, currentTime - 5)); }
              }}
            >
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-200" style={{ width: `${progressPct}%` }} />
              {Array.isArray(currentStation?.tracklist) && duration && currentStation.tracklist.map((t) => {
                const left = `${(t.startTime / duration) * 100}%`;
                return (
                  <div
                    key={`${t.title}-${t.startTime}`}
                    className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/30 group-hover:bg-white/50"
                    style={{ left }}
                    title={`${t.type === 'Song' && t.artist ? `${t.artist} — ${t.title}` : t.title} (${formatTime(t.startTime)})`}
                    onClick={(e) => { e.stopPropagation(); onSeek?.(t.startTime); }}
                    role="button"
                    aria-label={`Jump to ${t.title}`}
                  />
                );
              })}
            </div>
            <span className="tabular-nums">{formatTime(duration)}</span>
          </div>

          {/* EQ bar */}
          <div className="w-full flex items-center justify-center gap-1 h-8 mb-2">
            {Array.from({ length: 16 }).map((_, i) => {
              const speed = 900 + (i % 5) * 180;
              const delay = (i % 8) * 60;
              return (
                <div
                  key={i}
                  className={`rounded bg-pink-400/80 ${isPlaying ? 'eq-bar' : ''}`}
                  style={{
                    height: isPlaying ? undefined : `${30 + (i % 5) * 10}%`,
                    ['--eq-speed']: `${speed}ms`,
                    animationDelay: `${delay}ms`,
                  }}
                />
              );
            })}
          </div>

          {/* Controls row */}
          <div className="w-full flex items-center justify-between mt-2 mb-2 px-2 md:px-6">
            {/* Transport */}
            <div className="flex items-center gap-3">
              <button
                onClick={onPreviousTrack}
                className="rounded-full bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
                aria-label="Previous"
              >
                <SkipBack size={40} strokeWidth={2} fill="white" />
              </button>
              <PlayPauseButton isPlaying={isPlaying} onToggle={onTogglePlayPause} size="lg" />
              <button
                onClick={onNextTrack}
                className="rounded-full bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
                aria-label="Next"
              >
                <SkipForward size={40} strokeWidth={2} fill="white" />
              </button>
            </div>
            {/* Volume */}
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3" style={{ minWidth: '240px' }}>
              <VolumeControl
                volume={volume ?? 0}
                isMuted={!!isMuted}
                onVolumeChange={onVolumeChange}
                onToggleMute={onToggleMute}
              />
            </div>
          </div>

          {/* Up Next */}
          {nextTrack && (
            <div className="w-full mt-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 mt-10">
              <span className="text-[10px] text-gray-400 shrink-0">Up Next</span>
              <span className="text-sm text-white truncate">
                {nextTrack.type === 'Song' && nextTrack.artist ? `${nextTrack.artist} — ${nextTrack.title}` : nextTrack.title}
              </span>
              <span className="ml-auto text-[10px] text-gray-400 shrink-0">{formatTime(nextTrack.startTime)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusMode;

// Inject radio UI CSS helpers
(() => {
  if (typeof document !== 'undefined' && !document.getElementById('focusmode-radio-style')) {
    const style = document.createElement('style');
    style.id = 'focusmode-radio-style';
    style.textContent = `
      @keyframes eq-bounce {
        0% { height: 30%; }
        20% { height: 90%; }
        40% { height: 40%; }
        60% { height: 80%; }
        80% { height: 50%; }
        100% { height: 30%; }
      }
      .eq-bar { animation-name: eq-bounce; animation-duration: var(--eq-speed, 1200ms); animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
      .radio-glow { text-shadow: 0 0 18px rgba(255, 105, 180, 0.35); }
      @media (prefers-reduced-motion: reduce) {
        .eq-bar { animation: none !important; }
      }
    `;
    document.head.appendChild(style);
  }
})();

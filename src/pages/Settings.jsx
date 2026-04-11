import React from 'react';
import { Repeat, Shuffle, Heart, Clock3, Trash2, Radio } from 'lucide-react';

const qualityOptions = [
  {
    value: 'auto',
    label: 'Auto',
    description: 'Choose the best source automatically.',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Prefer direct audio for best quality.',
  },
  {
    value: 'data-saver',
    label: 'Data Saver',
    description: 'Prefer lighter source to reduce bandwidth.',
  },
];

export default function Settings({
  playbackEndMode,
  onPlaybackEndModeChange,
  qualityPreference,
  onQualityChange,
  likedCount,
  recentlyPlayedCount,
  onClearLiked,
  onClearRecentlyPlayed,
}) {
  return (
    <div className="px-1 sm:px-0 pb-4">
      <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/5 z-20 -mx-4 px-4 py-3 mb-4">
        <h2 className="text-3xl sm:text-2xl xs:text-xl font-extrabold text-white">Settings</h2>
        <p className="text-gray-400 sm:text-sm xs:text-xs mt-0.5">Playback behavior and data preferences.</p>
      </div>

      <div className="space-y-4">
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-300 font-medium mb-1">Playback End Behavior</div>
          <div className="text-[11px] text-gray-400 mb-3">Choose what happens when a station reaches the end.</div>
          <fieldset className="space-y-2" aria-label="Playback end mode">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 cursor-pointer">
              <input
                type="radio"
                name="playback-end-mode"
                value="off"
                checked={playbackEndMode === 'off'}
                onChange={(e) => onPlaybackEndModeChange?.(e.target.value)}
                className="mt-0.5 accent-pink-500"
              />
              <span>
                <span className="block text-sm font-semibold text-white inline-flex items-center gap-1.5"><Radio size={14} /> Off</span>
                <span className="block text-xs text-gray-400">Do nothing special when a station ends.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 cursor-pointer">
              <input
                type="radio"
                name="playback-end-mode"
                value="loop"
                checked={playbackEndMode === 'loop'}
                onChange={(e) => onPlaybackEndModeChange?.(e.target.value)}
                className="mt-0.5 accent-pink-500"
              />
              <span>
                <span className="block text-sm font-semibold text-white inline-flex items-center gap-1.5"><Repeat size={14} /> Loop current station</span>
                <span className="block text-xs text-gray-400">Restart the same station from the beginning.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 cursor-pointer">
              <input
                type="radio"
                name="playback-end-mode"
                value="shuffle"
                checked={playbackEndMode === 'shuffle'}
                onChange={(e) => onPlaybackEndModeChange?.(e.target.value)}
                className="mt-0.5 accent-pink-500"
              />
              <span>
                <span className="block text-sm font-semibold text-white inline-flex items-center gap-1.5"><Shuffle size={14} /> Shuffle next station</span>
                <span className="block text-xs text-gray-400">Jump to a random active station in the current game.</span>
              </span>
            </label>
          </fieldset>
        </section>

        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-300 font-medium mb-1">Stream Quality</div>
          <div className="text-[11px] text-gray-400 mb-3">Applied for both desktop and mobile playback.</div>
          <fieldset className="space-y-2" aria-label="Stream quality">
            {qualityOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 cursor-pointer"
              >
                <input
                  type="radio"
                  name="stream-quality"
                  value={option.value}
                  checked={(qualityPreference || 'auto') === option.value}
                  onChange={(e) => onQualityChange?.(e.target.value)}
                  className="mt-0.5 accent-pink-500"
                />
                <span>
                  <span className="block text-sm font-semibold text-white">{option.label}</span>
                  <span className="block text-xs text-gray-400">{option.description}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </section>

        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-300 font-medium mb-3">Library Data</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={14} className="text-pink-400" />
                <div className="text-sm text-white">Liked Stations</div>
              </div>
              <div className="text-xs text-gray-400 mb-3">{likedCount} saved</div>
              <button
                onClick={onClearLiked}
                disabled={!likedCount}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 size={12} /> Clear liked stations
              </button>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock3 size={14} className="text-pink-400" />
                <div className="text-sm text-white">Recently Played</div>
              </div>
              <div className="text-xs text-gray-400 mb-3">{recentlyPlayedCount} saved</div>
              <button
                onClick={onClearRecentlyPlayed}
                disabled={!recentlyPlayedCount}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 size={12} /> Clear recently played
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

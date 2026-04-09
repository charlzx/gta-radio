import { useCallback, useEffect, useRef, useState } from 'react';

export function useRadioPlayer({ radioEpoch = '2024-01-01T00:00:00Z' } = {}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Load volume and mute state from localStorage
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('gta-radio-volume');
    return saved ? parseFloat(saved) : 1.0;
  });
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('gta-radio-muted');
    return saved === 'true';
  });
  
  const epochMsRef = useRef(new Date(radioEpoch).getTime());
  const activeDurationRef = useRef(0);

  const setActiveDuration = useCallback((d) => {
    activeDurationRef.current = Number(d) || 0;
  }, []);

  const syncToEpoch = useCallback((durationSeconds) => {
    const a = audioRef.current;
    const d = durationSeconds ?? activeDurationRef.current;
    if (!a || !d) return;
    const now = Date.now();
    const elapsed = now - epochMsRef.current;
    a.currentTime = ((elapsed % (d * 1000)) / 1000);
  }, []);

  const playAtEpoch = useCallback(async (durationSeconds) => {
    const a = audioRef.current;
    if (!a) return;
    syncToEpoch(durationSeconds);
    try {
      await a.play();
      setIsPlaying(true);
    } catch (e) {
      console.error('Playback failed:', e);
      setIsPlaying(false);
    }
  }, [syncToEpoch]);

  const pause = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setIsPlaying(false);
  }, []);

  // Reflect volume/mute to audio element
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.muted = isMuted;
  }, [volume, isMuted]);

  const setVol = useCallback((v) => {
    setVolume(v);
    localStorage.setItem('gta-radio-volume', v.toString());
  }, []);
  
  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      const newMuted = !m;
      localStorage.setItem('gta-radio-muted', newMuted.toString());
      return newMuted;
    });
  }, []);

  const attachMediaSession = useCallback(({ currentStation, nowPlaying, currentGame, togglePlayPause, prev, next }) => {
  if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: nowPlaying?.title || currentStation?.name || 'GTA Radio',
          artist: nowPlaying?.artist || 'GTA Radio',
          album: currentGame?.name || 'GTA',
          artwork: currentGame?.logo ? [{ src: currentGame.logo, sizes: '512x512', type: 'image/png' }] : [],
        });
        navigator.mediaSession.setActionHandler('play', togglePlayPause);
        navigator.mediaSession.setActionHandler('pause', togglePlayPause);
        navigator.mediaSession.setActionHandler('previoustrack', prev);
        navigator.mediaSession.setActionHandler('nexttrack', next);
      } catch {
        // Ignore
      }
    }
  }, []);

  return {
    audioRef,
    isPlaying,
    volume,
    isMuted,
    setVol,
    toggleMute,
    playAtEpoch,
    pause,
    syncToEpoch,
    setActiveDuration,
    attachMediaSession,
  };
}

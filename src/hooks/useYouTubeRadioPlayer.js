import { useCallback, useEffect, useRef, useState } from 'react';

const YT_API_SRC = 'https://www.youtube.com/iframe_api';

function loadYouTubeApi() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube API requires a browser environment.'));
  }

  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }

  if (window.__ytApiPromise) {
    return window.__ytApiPromise;
  }

  window.__ytApiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${YT_API_SRC}"]`);
    if (!existing) {
      const script = document.createElement('script');
      script.src = YT_API_SRC;
      script.async = true;
      script.onerror = () => reject(new Error('Failed to load YouTube IFrame API.'));
      document.head.appendChild(script);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') {
        previousReady();
      }
      resolve(window.YT);
    };
  });

  return window.__ytApiPromise;
}

function extractYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  const directId = trimmed.match(/^[a-zA-Z0-9_-]{11}$/);
  if (directId) return directId[0];

  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '');
      return id || null;
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }
      const parts = parsed.pathname.split('/').filter(Boolean);
      const idx = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'live');
      if (idx >= 0 && parts[idx + 1]) {
        return parts[idx + 1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function useYouTubeRadioPlayer({ radioEpoch = '2024-01-01T00:00:00Z' } = {}) {
  const playerMountRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
  const currentVideoIdRef = useRef(null);
  const durationRef = useRef(0);

  const setActiveDuration = useCallback((d) => {
    activeDurationRef.current = Number(d) || 0;
  }, []);

  const getCurrentTime = useCallback(() => {
    const p = playerRef.current;
    if (!p || typeof p.getCurrentTime !== 'function') return 0;
    return Number(p.getCurrentTime()) || 0;
  }, []);

  const getDuration = useCallback(() => {
    const p = playerRef.current;
    if (!p || typeof p.getDuration !== 'function') return 0;
    return Number(p.getDuration()) || 0;
  }, []);

  const seekTo = useCallback((seconds) => {
    const p = playerRef.current;
    if (!p || typeof p.seekTo !== 'function') return;
    p.seekTo(Math.max(0, Number(seconds) || 0), true);
  }, []);

  const syncToEpoch = useCallback((durationSeconds) => {
    const d = Number(durationSeconds ?? activeDurationRef.current ?? durationRef.current) || 0;
    if (!d) return;
    const elapsed = Date.now() - epochMsRef.current;
    const target = ((elapsed % (d * 1000)) / 1000);
    seekTo(target);
  }, [seekTo]);

  const playAtEpoch = useCallback(async (durationSeconds) => {
    const p = playerRef.current;
    if (!p || !isPlayerReady) return;
    syncToEpoch(durationSeconds);
    if (typeof p.playVideo === 'function') {
      p.playVideo();
      setIsPlaying(true);
    }
  }, [isPlayerReady, syncToEpoch]);

  const pause = useCallback(() => {
    const p = playerRef.current;
    if (!p || typeof p.pauseVideo !== 'function') return;
    p.pauseVideo();
    setIsPlaying(false);
  }, []);

  const setVol = useCallback((v) => {
    const next = Math.max(0, Math.min(1, Number(v) || 0));
    setVolume(next);
    localStorage.setItem('gta-radio-volume', next.toString());

    const p = playerRef.current;
    if (p && typeof p.setVolume === 'function') {
      p.setVolume(Math.round(next * 100));
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      const next = !m;
      localStorage.setItem('gta-radio-muted', next.toString());

      const p = playerRef.current;
      if (p) {
        if (next && typeof p.mute === 'function') p.mute();
        if (!next && typeof p.unMute === 'function') p.unMute();
      }

      return next;
    });
  }, []);

  const applyPlayerAudioSettings = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;

    if (typeof p.setVolume === 'function') {
      p.setVolume(Math.round(volume * 100));
    }

    if (isMuted && typeof p.mute === 'function') {
      p.mute();
    } else if (!isMuted && typeof p.unMute === 'function') {
      p.unMute();
    }
  }, [volume, isMuted]);

  const loadFromUrl = useCallback(async (url) => {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId || !playerMountRef.current) {
      return false;
    }

    await loadYouTubeApi();

    if (playerRef.current && currentVideoIdRef.current === videoId) {
      return true;
    }

    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      playerRef.current.destroy();
    }

    setIsPlaying(false);
    setIsPlayerReady(false);

    playerRef.current = new window.YT.Player(playerMountRef.current, {
      videoId,
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          currentVideoIdRef.current = videoId;
          setIsPlayerReady(true);
          durationRef.current = getDuration();
          applyPlayerAudioSettings();
        },
        onStateChange: (event) => {
          const YT = window.YT;
          if (!YT) return;
          if (event.data === YT.PlayerState.PLAYING) {
            durationRef.current = getDuration();
            setIsPlaying(true);
          } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
      },
    });

    return true;
  }, [applyPlayerAudioSettings, getDuration]);

  useEffect(() => {
    applyPlayerAudioSettings();
  }, [applyPlayerAudioSettings]);

  useEffect(() => {
    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      playerRef.current = null;
    };
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
        // Ignore media session setup failures.
      }
    }
  }, []);

  return {
    playerMountRef,
    isPlayerReady,
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
    loadFromUrl,
    seekTo,
    getCurrentTime,
    getDuration,
  };
}

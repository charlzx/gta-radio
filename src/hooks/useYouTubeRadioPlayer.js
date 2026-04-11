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
  const ytHostRef = useRef(null);
  const playerRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastEndedAt, setLastEndedAt] = useState(0);

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
  const modeRef = useRef('none');
  const loadRequestIdRef = useRef(0);
  const playRequestIdRef = useRef(0);
  const currentSourceUrlRef = useRef('');

  const setActiveDuration = useCallback((d) => {
    activeDurationRef.current = Number(d) || 0;
  }, []);

  const ensureYouTubeHost = useCallback(() => {
    const mount = playerMountRef.current;
    if (!mount) return null;

    if (!ytHostRef.current || !mount.contains(ytHostRef.current)) {
      mount.textContent = '';
      const host = document.createElement('div');
      host.className = 'yt-player-host';
      mount.appendChild(host);
      ytHostRef.current = host;
    }

    return ytHostRef.current;
  }, []);

  const getCurrentTime = useCallback(() => {
    if (modeRef.current === 'audio') {
      return Number(audioRef.current?.currentTime) || 0;
    }

    const p = playerRef.current;
    if (!p || typeof p.getCurrentTime !== 'function') return 0;
    return Number(p.getCurrentTime()) || 0;
  }, []);

  const getDuration = useCallback(() => {
    if (modeRef.current === 'audio') {
      return Number(audioRef.current?.duration) || 0;
    }

    const p = playerRef.current;
    if (!p || typeof p.getDuration !== 'function') return 0;
    return Number(p.getDuration()) || 0;
  }, []);

  const seekTo = useCallback((seconds) => {
    const target = Math.max(0, Number(seconds) || 0);

    if (modeRef.current === 'audio') {
      const a = audioRef.current;
      if (!a) return;
      a.currentTime = target;
      return;
    }

    const p = playerRef.current;
    if (!p || typeof p.seekTo !== 'function') return;
    p.seekTo(target, true);
  }, []);

  const syncToEpoch = useCallback((durationSeconds) => {
    const d = Number(durationSeconds ?? activeDurationRef.current ?? durationRef.current) || 0;
    if (!d) return;
    const elapsed = Date.now() - epochMsRef.current;
    const target = ((elapsed % (d * 1000)) / 1000);
    seekTo(target);
  }, [seekTo]);

  const playAtEpoch = useCallback(async (durationSeconds) => {
    if (!isPlayerReady) return;

    playRequestIdRef.current += 1;
    const requestId = playRequestIdRef.current;
    syncToEpoch(durationSeconds);

    if (modeRef.current === 'audio') {
      const a = audioRef.current;
      if (!a) return;
      try {
        await a.play();
        if (requestId !== playRequestIdRef.current) return;
        setIsPlaying(true);
      } catch (e) {
        if (e?.name !== 'AbortError') {
          console.error('Playback failed:', e);
        }
        setIsPlaying(false);
      }
      return;
    }

    const p = playerRef.current;
    if (p && typeof p.playVideo === 'function') {
      p.playVideo();
      setIsPlaying(true);
    }
  }, [isPlayerReady, syncToEpoch]);

  const playFrom = useCallback(async (seconds = 0) => {
    if (!isPlayerReady) return;

    playRequestIdRef.current += 1;
    const requestId = playRequestIdRef.current;
    seekTo(seconds);

    if (modeRef.current === 'audio') {
      const a = audioRef.current;
      if (!a) return;
      try {
        await a.play();
        if (requestId !== playRequestIdRef.current) return;
        setIsPlaying(true);
      } catch (e) {
        if (e?.name !== 'AbortError') {
          console.error('Playback failed:', e);
        }
        setIsPlaying(false);
      }
      return;
    }

    const p = playerRef.current;
    if (p && typeof p.playVideo === 'function') {
      p.playVideo();
      setIsPlaying(true);
    }
  }, [isPlayerReady, seekTo]);

  const pause = useCallback(() => {
    playRequestIdRef.current += 1;

    if (modeRef.current === 'audio') {
      const a = audioRef.current;
      if (!a) return;
      a.pause();
      setIsPlaying(false);
      return;
    }

    const p = playerRef.current;
    if (!p || typeof p.pauseVideo !== 'function') return;
    p.pauseVideo();
    setIsPlaying(false);
  }, []);

  const applyPlayerAudioSettings = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.volume = volume;
      a.muted = isMuted;
    }

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

  const setVol = useCallback((v) => {
    const next = Math.max(0, Math.min(1, Number(v) || 0));
    setVolume(next);
    localStorage.setItem('gta-radio-volume', next.toString());

    if (modeRef.current === 'audio') {
      const a = audioRef.current;
      if (a) a.volume = next;
      return;
    }

    const p = playerRef.current;
    if (p && typeof p.setVolume === 'function') {
      p.setVolume(Math.round(next * 100));
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      const next = !m;
      localStorage.setItem('gta-radio-muted', next.toString());

      const a = audioRef.current;
      if (a) {
        a.muted = next;
      }

      const p = playerRef.current;
      if (p) {
        if (next && typeof p.mute === 'function') p.mute();
        if (!next && typeof p.unMute === 'function') p.unMute();
      }

      return next;
    });
  }, []);

  const loadFromUrl = useCallback(async (url, options = {}) => {
    const requestId = ++loadRequestIdRef.current;
    const autoPlayDuration = Number(options?.autoPlayDuration) || 0;
    const sourceUrl = typeof url === 'string' ? url.trim() : '';
    if (!sourceUrl) return false;

    // Avoid reloading the same source on re-renders/effect retries.
    if (currentSourceUrlRef.current === sourceUrl) {
      if (autoPlayDuration && isPlayerReady) {
        await playAtEpoch(autoPlayDuration);
      }
      return true;
    }

    currentSourceUrlRef.current = sourceUrl;

    const videoId = extractYouTubeVideoId(sourceUrl);
    const audioElement = audioRef.current;

    setIsPlaying(false);
    setIsPlayerReady(false);

    const ytHost = videoId ? ensureYouTubeHost() : null;

    if (videoId && ytHost) {
      modeRef.current = 'youtube';

      if (audioElement) {
        audioElement.pause();
      }

      try {
        await loadYouTubeApi();
      } catch (err) {
        console.error('YouTube API load failed:', err);
        return false;
      }

      if (requestId !== loadRequestIdRef.current) {
        return false;
      }

      if (playerRef.current && currentVideoIdRef.current === videoId) {
        setIsPlayerReady(true);
        if (autoPlayDuration) {
          await playAtEpoch(autoPlayDuration);
        }
        return true;
      }

      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore teardown errors from detached iframe nodes.
        }
      }

      playerRef.current = new window.YT.Player(ytHost, {
        videoId,
        height: '1',
        width: '1',
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
          onReady: async () => {
            if (requestId !== loadRequestIdRef.current) return;
            currentVideoIdRef.current = videoId;
            setIsPlayerReady(true);
            durationRef.current = getDuration();
            applyPlayerAudioSettings();

            if (autoPlayDuration) {
              await playAtEpoch(autoPlayDuration);
            }
          },
          onStateChange: (event) => {
            const YT = window.YT;
            if (!YT) return;
            if (event.data === YT.PlayerState.PLAYING) {
              durationRef.current = getDuration();
              setIsPlaying(true);
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
              setIsPlaying(false);
              if (event.data === YT.PlayerState.ENDED) {
                setLastEndedAt(Date.now());
              }
            }
          },
        },
      });

      return true;
    }

    if (!audioElement) {
      return false;
    }

    modeRef.current = 'audio';
    currentVideoIdRef.current = null;

    let initialized = false;

    const onReady = async () => {
      if (initialized) return;
      initialized = true;
      if (requestId !== loadRequestIdRef.current) return;
      setIsPlayerReady(true);
      durationRef.current = Number(audioElement.duration) || 0;
      audioElement.onloadedmetadata = null;
      audioElement.oncanplay = null;
      if (autoPlayDuration) {
        await playAtEpoch(autoPlayDuration);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setLastEndedAt(Date.now());
    };

    audioElement.onloadedmetadata = onReady;
    audioElement.oncanplay = onReady;
    audioElement.onplay = onPlay;
    audioElement.onpause = onPause;
    audioElement.onended = onEnded;

    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      try {
        playerRef.current.pauseVideo();
      } catch {
        // Ignore pause errors from tearing-down players.
      }
    }

    audioElement.pause();
    audioElement.src = sourceUrl;
    audioElement.load();
    applyPlayerAudioSettings();

    return true;
  }, [applyPlayerAudioSettings, ensureYouTubeHost, getDuration, isPlayerReady, playAtEpoch]);

  useEffect(() => {
    applyPlayerAudioSettings();
  }, [applyPlayerAudioSettings]);

  useEffect(() => {
    const audioElement = audioRef.current;
    const mountElement = playerMountRef.current;

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore teardown errors from detached iframe nodes.
        }
      }
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
      if (mountElement) {
        mountElement.textContent = '';
      }
      ytHostRef.current = null;
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
    audioRef,
    isPlayerReady,
    isPlaying,
    volume,
    isMuted,
    setVol,
    toggleMute,
    playAtEpoch,
    playFrom,
    pause,
    syncToEpoch,
    setActiveDuration,
    attachMediaSession,
    loadFromUrl,
    seekTo,
    getCurrentTime,
    getDuration,
    lastEndedAt,
  };
}

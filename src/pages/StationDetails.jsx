import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock3, ListMusic, Radio } from 'lucide-react';
import { games } from '../data/games';

const RADIO_EPOCH_MS = new Date('2024-01-01T00:00:00Z').getTime();

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function StationDetails({ gameIdParam, stationIdParam, embedded = false }) {
  const { gameId: routeGameId, stationId: routeStationId } = useParams();
  const gameId = gameIdParam || routeGameId;
  const stationId = stationIdParam || routeStationId;
  const [nowTs, setNowTs] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const game = useMemo(() => games[gameId], [gameId]);
  const station = useMemo(
    () => game?.stations?.find((s) => s.id === stationId),
    [game, stationId]
  );
  const stationMeta = station?.stationMeta || null;
  const infoText = stationMeta?.info?.about || stationMeta?.info?.shortDescription || 'Station description coming soon.';

  const currentTime = useMemo(() => {
    if (!station?.duration) return 0;
    const elapsed = nowTs - RADIO_EPOCH_MS;
    return ((elapsed % (station.duration * 1000)) / 1000);
  }, [station?.duration, nowTs]);

  const currentTrack = useMemo(() => {
    if (!station?.tracklist?.length) return null;
    return (
      station.tracklist.find(
        (t) => currentTime >= t.startTime && currentTime < t.endTime
      ) || null
    );
  }, [station?.tracklist, currentTime]);

  const otherStations = useMemo(() => {
    if (!game?.stations?.length || !station) return [];
    return game.stations.filter((s) => s.id !== station.id).slice(0, 6);
  }, [game, station]);

  if (!game || !station) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/radio"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft size={16} /> Back to radio
          </Link>
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-2xl font-bold">Station Not Found</h1>
            <p className="mt-2 text-gray-400">This station does not exist or is unavailable.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${embedded ? 'text-white' : 'min-h-screen bg-black text-white'}`}>
      <div className={`${embedded ? 'max-w-6xl mx-auto px-1 py-1 md:px-2 md:py-2' : 'max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8'}`}>
        <Link
          to="/radio"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft size={16} /> Back to radio
        </Link>

        <section className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 lg:col-span-1 self-start">
            <img
              src={station.logo || game.logo}
              alt={station.name}
              className="w-full max-h-[340px] rounded-lg object-cover border border-white/10 aspect-[4/3]"
            />
            <h1 className="mt-4 text-2xl font-bold">{station.name}</h1>
            <p className="text-sm text-gray-400 mt-1">{game.name}</p>
            <Link
              to={`/radio?game=${game.id}&station=${station.id}`}
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold"
            >
              <Radio size={16} /> Open Player
            </Link>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Info</div>
                <p className="text-sm text-gray-200 leading-relaxed">{infoText}</p>
                <div className="mt-2 text-xs text-gray-400">
                  {stationMeta?.info?.genre || 'Unknown genre'}
                  {stationMeta?.info?.city ? ` • ${stationMeta.info.city}` : ''}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Host</div>
                <div className="text-sm text-white font-semibold">{stationMeta?.host?.name || 'Unknown host'}</div>
                {stationMeta?.host?.style && <div className="text-xs text-gray-300 mt-1">{stationMeta.host.style}</div>}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-pink-300 mb-3">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                Live Now Playing
              </div>
              {currentTrack ? (
                <>
                  <h2 className="text-xl font-semibold">
                    {currentTrack.type === 'Song' && currentTrack.artist
                      ? `${currentTrack.artist} - ${currentTrack.title}`
                      : currentTrack.title}
                  </h2>
                  <div className="mt-3 text-sm text-gray-300 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 size={14} /> {formatTime(currentTime)} / {formatTime(station.duration)}
                    </span>
                    <span className="text-gray-500">{currentTrack.type}</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-pink-400"
                      style={{ width: `${station.duration ? (currentTime / station.duration) * 100 : 0}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-gray-400">No track metadata available for this station yet.</p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <ListMusic size={16} className="text-pink-400" />
            <h3 className="text-lg font-semibold">Tracklist</h3>
          </div>
          <div className="divide-y divide-white/5">
            {(station.tracklist || []).map((track, index) => {
              const isCurrent = currentTrack && currentTrack.startTime === track.startTime;
              return (
                <Link
                  key={`${track.title}-${track.startTime}`}
                  to={`/radio/${game.id}/${station.id}?game=${game.id}&station=${station.id}&start=${track.startTime}`}
                  className={`py-2.5 px-1 flex items-center gap-3 transition-colors hover:bg-white/5 ${isCurrent ? 'bg-pink-500/10 rounded' : ''}`}
                >
                  <div className={`w-6 text-xs text-center ${isCurrent ? 'text-pink-300' : 'text-gray-500'}`}>
                    {isCurrent ? '>' : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">
                      {track.type === 'Song' && track.artist
                        ? `${track.artist} - ${track.title}`
                        : track.title}
                    </div>
                    <div className="text-xs text-gray-500">{track.type}</div>
                  </div>
                  <div className="text-xs text-gray-400">{formatTime(track.startTime)}</div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-lg font-semibold mb-3">Other Stations In {game.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {otherStations.map((s) => (
              <Link
                key={s.id}
                to={`/radio/${game.id}/${s.id}`}
                className="rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
              >
                <img src={s.logo || game.logo} alt={s.name} className="w-full aspect-square object-cover" />
                <div className="p-2 text-xs truncate">{s.name}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

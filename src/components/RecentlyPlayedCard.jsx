import React from 'react';
import { FaClock, FaPlay } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';

const RecentlyPlayedCard = ({ recentlyPlayed, onStationSelect }) => {
  const isMobile = useIsMobile();
  if (!recentlyPlayed || recentlyPlayed.length === 0) {
    return null;
  }

  return (
    <div className={`recently-played bg-white/10 backdrop-blur-xl rounded-xl border border-white/5 mb-6 ${isMobile ? 'p-2' : 'p-4'}`}>
      <div className={`flex items-center gap-2 ${isMobile ? 'mb-2' : 'mb-3'}`}>
        <FaClock className={`text-gray-400 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
        <h3 className={`text-white font-bold ${isMobile ? 'text-xs' : 'text-base'}`}>Recently Played</h3>
      </div>
      <div className={`${isMobile ? 'space-y-0.5' : 'space-y-2'}`}>
        {recentlyPlayed.slice(0, 3).map((station, index) => (
          <div 
            key={`${station.id}-${index}`}
            onClick={() => onStationSelect(station)}
            className={`flex items-center hover:bg-white/10 rounded-lg cursor-pointer transition-colors group ${isMobile ? 'gap-2 p-1' : 'gap-3 p-2'}`}
          >
            <div className="relative">
              <img 
                src={station.logo} 
                alt={station.name} 
                className={`rounded object-cover aspect-square ${isMobile ? 'w-6 h-6' : 'w-10 h-10'}`} 
              />
              <div className="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FaPlay className={`text-white ${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-white font-medium truncate ${isMobile ? 'text-[10px]' : 'text-sm'}`}>{station.name}</p>
              <p className={`text-gray-400 truncate ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
                {station.tracklist?.[0]?.artist || 'Radio Station'}
              </p>
            </div>
            <div className={`text-gray-500 ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
              {station.lastPlayed && new Date(station.lastPlayed).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayedCard;

import React from 'react';
import { FaClock, FaPlay } from 'react-icons/fa';

const RecentlyPlayedCard = ({ recentlyPlayed, onStationSelect }) => {
  if (!recentlyPlayed || recentlyPlayed.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <FaClock className="w-4 h-4 text-gray-400" />
        <h3 className="text-white font-bold">Recently Played</h3>
      </div>
      <div className="space-y-2">
        {recentlyPlayed.slice(0, 3).map((station, index) => (
          <div 
            key={`${station.id}-${index}`}
            onClick={() => onStationSelect(station)}
            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group"
          >
            <div className="relative">
              <img 
                src={station.logo} 
                alt={station.name} 
                className="w-10 h-10 rounded object-cover" 
              />
              <div className="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FaPlay className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{station.name}</p>
              <p className="text-gray-400 text-xs truncate">
                {station.tracklist?.[0]?.artist || 'Radio Station'}
              </p>
            </div>
            <div className="text-xs text-gray-500">
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

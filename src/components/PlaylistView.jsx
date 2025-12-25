import React, { useEffect, useRef } from 'react';
import { X, Music, Mic, Radio as RadioIcon } from 'lucide-react';

const PlaylistView = ({ 
  isOpen, 
  onClose, 
  tracklist = [], 
  currentTime, 
  formatTime,
  onTrackClick,
  isMobile = false 
}) => {
  const currentTrackRef = useRef(null);
  
  // Find current track
  const currentTrackIndex = tracklist.findIndex(
    t => currentTime >= t.startTime && currentTime < t.endTime
  );
  
  // Auto-scroll to current track when opened
  useEffect(() => {
    if (isOpen && currentTrackRef.current) {
      setTimeout(() => {
        currentTrackRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const getTrackIcon = (type) => {
    switch (type) {
      case 'Song':
        return <Music size={14} />;
      case 'DJ':
        return <Mic size={14} />;
      default:
        return <RadioIcon size={14} />;
    }
  };
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center ${
        isMobile ? 'bg-black/95' : 'bg-black/50'
      } backdrop-blur-sm animate-fade-in`}
      onClick={onClose}
    >
      <div 
        className={`bg-gradient-to-br from-zinc-900 to-black border border-white/10 ${
          isMobile 
            ? 'w-full h-[85vh] rounded-t-2xl animate-slide-up' 
            : 'w-full max-w-2xl max-h-[80vh] rounded-xl'
        } overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Music size={20} className="text-pink-400" />
            Tracklist
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Close playlist"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Tracklist */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tracklist.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No tracklist available
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {tracklist.map((track, index) => {
                const isCurrent = index === currentTrackIndex;
                const duration = track.endTime - track.startTime;
                
                return (
                  <button
                    key={`${track.title}-${track.startTime}`}
                    ref={isCurrent ? currentTrackRef : null}
                    onClick={() => onTrackClick(track.startTime)}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      isCurrent 
                        ? 'bg-pink-600/20 border-l-4 border-pink-500' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Track number or playing indicator */}
                      <div className={`flex-shrink-0 w-6 text-xs font-mono ${
                        isCurrent ? 'text-pink-400 font-bold' : 'text-gray-500'
                      }`}>
                        {isCurrent ? '▶' : (index + 1)}
                      </div>
                      
                      {/* Track info */}
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium truncate ${
                          isCurrent ? 'text-white' : 'text-gray-200'
                        }`}>
                          {track.type === 'Song' && track.artist 
                            ? `${track.artist} — ${track.title}` 
                            : track.title
                          }
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`flex items-center gap-1 text-xs ${
                            isCurrent ? 'text-pink-300' : 'text-gray-400'
                          }`}>
                            {getTrackIcon(track.type)}
                            {track.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(duration)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Start time */}
                      <div className={`flex-shrink-0 text-xs font-mono ${
                        isCurrent ? 'text-pink-400' : 'text-gray-500'
                      }`}>
                        {formatTime(track.startTime)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="p-3 border-t border-white/10 bg-black/40">
          <div className="text-xs text-gray-400 text-center">
            {tracklist.length} tracks • Click a track to jump to it
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;

// Inject slide animation CSS
(() => {
  if (typeof document !== 'undefined' && !document.getElementById('playlist-view-style')) {
    const style = document.createElement('style');
    style.id = 'playlist-view-style';
    style.textContent = `
      @keyframes slide-up {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .animate-slide-up {
        animation: slide-up 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }
})();

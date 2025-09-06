import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchFilter = ({ 
  searchQuery, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange, 
  stations 
}) => {
  // Get unique genres from stations
  const genres = ['all', ...new Set(stations.map(s => s.genre).filter(Boolean))];
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search stations, DJs, or genres..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-lg font-bold"
          >
            ×
          </button>
        )}
      </div>

      {/* Genre Filter */}
      <div className="min-w-[120px]">
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          {genres.map(genre => (
            <option key={genre} value={genre} className="bg-gray-800 text-white">
              {genre === 'all' ? 'All Genres' : genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;

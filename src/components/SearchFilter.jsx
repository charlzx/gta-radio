import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchFilter = ({ 
  searchQuery, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange,
  onFocus,
  onBlur,
  placeholder = 'Search stations...',
  className
}) => {
  // Get unique genres from stations (for now, only 'all' since we don't have genres yet)
  const genres = ['all'];
  
  return (
    <div className={className || 'flex flex-col sm:flex-row gap-4 mb-6'}>
      {/* Search Input */}
      <div className="relative flex-1">
        <FaSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full pl-9 pr-3 py-1.5 text-sm bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/15 focus:border-white/20"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-base font-bold"
          >
            ×
          </button>
        )}
      </div>

      {/* Genre Filter - Hidden for now since we don't have genres */}
      <div className="min-w-[120px] hidden">
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-white/15 focus:border-white/20"
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

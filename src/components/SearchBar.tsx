import React, { useRef, useEffect } from 'react';
import { Search, X, TrendingUp, Calendar } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const {
    query,
    results,
    isSearching,
    showSuggestions,
    setShowSuggestions,
    handleSearch,
    clearSearch
  } = useSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    navigate(`/article/${slug}`);
    setShowSuggestions(false);
    clearSearch();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search news and analysis..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          className="w-full px-4 py-3 pl-12 pr-12 text-lg border-2 border-gray-300 rounded-full
                   focus:border-blue-500 focus:outline-none transition-colors duration-200
                   bg-white shadow-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <Search className="w-5 h-5 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSuggestionClick(result.slug)}
                  className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 
                           last:border-b-0 transition-colors duration-150"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {result.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {result.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {result.publishedAt.toLocaleDateString()}
                        </span>
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">
                          {result.category}
                        </span>
                      </div>
                    </div>
                    <TrendingUp className="w-4 h-4 text-blue-500 ml-2" />
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              <Search className="w-5 h-5 mx-auto mb-2" />
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
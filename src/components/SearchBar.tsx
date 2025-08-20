import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Clock, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { searchVendors } from '../data/vendors';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toggleSearch, updateFilters } = useStore();

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const searchResults = searchVendors(query);
      setResults(searchResults);
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (vendor: any) => {
    // In a real app, this would center the map on the vendor
    console.log('Selected vendor:', vendor);
    toggleSearch();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      updateFilters({ searchQuery: query });
      toggleSearch();
    }
  };

  return (
    <div className="absolute top-20 left-4 right-4 z-40 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors, activities, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fallfest-500 focus:border-transparent outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-fallfest-500 text-white rounded-md hover:bg-fallfest-600 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Search Results */}
        {query.trim() && (
          <div className="max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fallfest-500 mx-auto"></div>
                <p className="text-gray-500 mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </h3>
                {results.map((vendor) => (
                  <div
                    key={vendor.id}
                    onClick={() => handleResultClick(vendor)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: getCategoryColor(vendor.category) }}
                    >
                      {getCategoryIcon(vendor.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{vendor.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{vendor.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs px-2 py-1 rounded-full text-white"
                              style={{ backgroundColor: getCategoryColor(vendor.category) }}>
                          {vendor.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {vendor.hours}
                        </div>
                        {vendor.featured && (
                          <div className="flex items-center gap-1 text-xs text-amber-600">
                            <Star className="w-3 h-3" />
                            Featured
                          </div>
                        )}
                      </div>
                    </div>
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-sm text-gray-400 mt-1">Try different keywords or check spelling</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Search Suggestions */}
        {!query.trim() && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Popular searches</h3>
            <div className="flex flex-wrap gap-2">
              {['Food', 'Arts', 'Activities', 'Entertainment', 'BBQ', 'Jewelry'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={toggleSearch}
        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

export default SearchBar; 
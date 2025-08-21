import React from 'react';
import { X, Filter, Star, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';
import { VendorCategory } from '../types';

const FilterPanel: React.FC = () => {
  const { 
    filters, 
    updateFilters, 
    resetFilters, 
    toggleFilterPanel,
    getVendorsByCategory,
    getFavorites
  } = useStore();

  const categories: VendorCategory[] = [
    'food', 'arts', 'activities', 'services', 'entertainment', 'security', 'facilities'
  ];

  const handleCategoryToggle = (category: VendorCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    updateFilters({ categories: newCategories });
  };

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    updateFilters({ [key]: value });
  };

  const getCategoryCount = (category: VendorCategory) => {
    return getVendorsByCategory(category).length;
  };

  const favorites = getFavorites();

  return (
    <div className="absolute top-20 right-4 z-40 w-80 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-fallfest-500" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
          </div>
          <button
            onClick={toggleFilterPanel}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => {
              const count = getCategoryCount(category);
              const isSelected = filters.categories.includes(category);
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-fallfest-500 bg-fallfest-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    >
                      {getCategoryIcon(category)}
                    </div>
                    <span className="capitalize text-gray-700">{category}</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    isSelected
                      ? 'bg-fallfest-100 text-fallfest-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Filters */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Status</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={false}
                onChange={() => {}}
                className="w-4 h-4 text-fallfest-500 border-gray-300 rounded focus:ring-fallfest-500"
              />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">Open now only</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.showFeaturedOnly}
                onChange={(e) => handleFilterChange('showFeaturedOnly', e.target.checked)}
                className="w-4 h-4 text-fallfest-500 border-gray-300 rounded focus:ring-fallfest-500"
              />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-gray-700">Featured vendors only</span>
              </div>
            </label>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button
              onClick={() => updateFilters({ categories: ['food'] })}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                🍔
              </div>
              <div>
                <span className="font-medium text-gray-700">Food & Drinks</span>
                <p className="text-sm text-gray-500">Show all food vendors</p>
              </div>
            </button>
            
            <button
              onClick={() => updateFilters({ categories: ['arts'] })}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                🎨
              </div>
              <div>
                <span className="font-medium text-gray-700">Arts & Crafts</span>
                <p className="text-sm text-gray-500">Show all art vendors</p>
              </div>
            </button>
            
            <button
              onClick={() => updateFilters({ categories: ['activities'] })}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                🎯
              </div>
              <div>
                <span className="font-medium text-gray-700">Activities</span>
                <p className="text-sm text-gray-500">Show all activities</p>
              </div>
            </button>
          </div>
        </div>

        {/* Favorites Summary */}
        {favorites.length > 0 && (
          <div className="mb-6 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="font-medium text-amber-800">Your Favorites</span>
            </div>
            <p className="text-sm text-amber-700">
              You have {favorites.length} favorite vendor{favorites.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => updateFilters({ categories: [] })}
              className="text-xs text-amber-600 hover:text-amber-800 mt-1 underline"
            >
              View all favorites
            </button>
          </div>
        )}

        {/* Filter Actions */}
        <div className="flex gap-2">
          <button
            onClick={resetFilters}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={toggleFilterPanel}
            className="flex-1 px-4 py-2 bg-fallfest-500 text-white rounded-lg hover:bg-fallfest-600 transition-colors"
          >
            Apply
          </button>
        </div>

        {/* Active Filters Summary */}
        {(filters.categories.length > 0 || filters.showFeaturedOnly) && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h5>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <span
                  key={category}
                  className="text-xs px-2 py-1 bg-fallfest-100 text-fallfest-700 rounded-full"
                >
                  {category}
                </span>
              ))}

              {filters.showFeaturedOnly && (
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                  Featured only
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel; 
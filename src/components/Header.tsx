import React, { useState, useMemo } from 'react';
import { Search, Filter, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { VendorData, categoryConfig } from '../data/vendors';
import { infrastructureConfig } from '../data/infrastructure';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';

interface HeaderProps {
  vendors: VendorData[];
  onVendorClick: (vendor: VendorData) => void;
  openVendorPopup?: ((vendorId: string) => void) | null;
  onCategoryFilter?: (category: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ vendors, onVendorClick, openVendorPopup, onCategoryFilter }) => {
  const { 
    toggleFilterPanel, 
    isFilterPanelOpen
  } = useStore();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Combine vendor and infrastructure categories
  const allCategories = useMemo(() => {
    const vendorCategories = Object.entries(categoryConfig).map(([key, config]) => ({
      id: key,
      type: 'vendor' as const,
      ...config
    }));
    
    const infraCategories = Object.entries(infrastructureConfig).map(([key, config]) => ({
      id: key,
      type: 'infrastructure' as const,
      ...config
    }));
    
    return [...vendorCategories, ...infraCategories];
  }, []);

  // Filter vendors based on search query and category
  const filteredVendors = useMemo(() => {
    let result = vendors;
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(vendor => vendor.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(vendor => 
        vendor.name.toLowerCase().includes(query) ||
        vendor.category.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query)
      );
    }
    
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [vendors, searchQuery, selectedCategory]);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (onCategoryFilter) {
      onCategoryFilter(categoryId);
    }
  };

  // Helper function to darken a hex color
  const darkenColor = (hex: string, percent: number = 20): string => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Darken by percentage
    const darkenedR = Math.floor(r * (1 - percent / 100));
    const darkenedG = Math.floor(g * (1 - percent / 100));
    const darkenedB = Math.floor(b * (1 - percent / 100));
    
    // Convert back to hex
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`;
  };

  return (
    <header className="fixed top-0 left-0 bottom-0 z-50 border-r border-gray-200 w-80 overflow-y-auto" style={{ backgroundColor: '#f3f3f2' }}>
      {/* Header Image - Full width, no margins */}
      <div>
        <img 
          src="/images/general/sidebar-header.jpg"
          alt="Eastwood Fallfest Header"
          className="w-full h-auto"
        />
      </div>

      <div className="px-4 py-3 flex flex-col space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">2025 Festival Sitemap</h1>
          <p className="text-sm text-gray-600">Interactive Sitemap</p>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col gap-2">
          {/* Search Component */}
          {isSearchActive ? (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vendors..."
                className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-sm"
                style={{ 
                  '--tw-ring-color': 'rgb(229, 231, 235)',
                  '--tw-ring-opacity': '1'
                } as React.CSSProperties & { [key: string]: string }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgb(229, 231, 235)';
                  e.target.style.boxShadow = '0 0 0 2px rgb(229, 231, 235)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchClick}
              className="w-full p-3 rounded-lg transition-colors flex items-center gap-3 bg-gray-100 text-gray-600 hover:bg-gray-200"
              title="Search vendors"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm font-medium">Search Vendors</span>
            </button>
          )}

          {/* Category Filter Pills */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {/* All/Clear Filter Button */}
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>All</span>
              </button>
              
              {/* Category Pills */}
              {allCategories.map((category) => {
                const isSelected = selectedCategory === category.id;
                const backgroundColor = isSelected ? darkenColor(category.color) : category.color;
                
                return (
                  <button
                    key={`${category.type}-${category.id}`}
                    onClick={() => handleCategoryFilter(isSelected ? null : category.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                      isSelected
                        ? 'text-white'
                        : 'text-white hover:opacity-80 hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor,
                      opacity: isSelected ? 1 : 0.9
                    }}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                    {isSelected && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </button>
                );
              })}
          </div>


        </div>

        {/* Vendor List */}
        <div className="border-t border-gray-200 pt-4">
          <div>
            {filteredVendors.length === 0 && searchQuery.trim() ? (
              <div className="p-4 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No vendors found matching "{searchQuery}"</p>
                <button
                  onClick={handleSearchClear}
                  className="mt-2 text-xs text-fallfest-600 hover:text-fallfest-700 underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredVendors.map((vendor, index) => (
              <div key={vendor.id}>
                <button
                  onClick={() => {
                    if (openVendorPopup) {
                      openVendorPopup(vendor.id);
                    } else {
                      onVendorClick(vendor);
                    }
                  }}
                  className="w-full p-3 hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
                >
                {/* Vendor Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {vendor.image ? (
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<div class="w-full h-full rounded-full flex items-center justify-center text-white text-sm" style="background-color: ${getCategoryColor(vendor.category)}">${getCategoryIcon(vendor.category)}</div>`;
                      }}
                    />
                  ) : (
                    <div 
                      className="w-full h-full rounded-full flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: getCategoryColor(vendor.category) }}
                    >
                      {getCategoryIcon(vendor.category)}
                    </div>
                  )}
                </div>

                  {/* Vendor Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{vendor.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: getCategoryColor(vendor.category) }}
                      >
                        {categoryConfig[vendor.category as keyof typeof categoryConfig]?.label || vendor.category}
                      </span>
                    </div>
                  </div>
                </button>
                
                {/* Divider (except for last item) */}
                {index < filteredVendors.length - 1 && (
                  <div 
                    className="mx-auto" 
                    style={{ 
                      width: '290px', 
                      height: '1px', 
                      backgroundColor: 'rgb(229, 231, 235)' 
                    }}
                  />
                )}
              </div>
              ))
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
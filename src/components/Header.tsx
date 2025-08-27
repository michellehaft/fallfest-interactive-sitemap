import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
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
  // Remove unused store destructuring

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);
    // Start animation, then switch to active state
    setTimeout(() => {
      setIsSearchActive(true);
      setIsAnimating(false);
    }, 250);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setIsAnimating(true);
    setIsSearchActive(false);
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 250);
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
    <header className="fixed top-0 left-0 bottom-0 z-50 border-r border-gray-200 overflow-y-auto" style={{ 
      backgroundColor: '#f3f3f2', 
      width: '393px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
    }}>
      {/* Header Image - Full width, no margins */}
      <div>
        <img 
          src="images/general/sidebar-header.jpg"
          alt="Eastwood Fallfest Header"
          className="w-full h-auto"
        />
      </div>

      <div className="px-6 py-3 flex flex-col space-y-4">
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
                className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-base transition-all duration-250 ease-out"
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-250 ease-out" />
              <button
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchClick}
              className="w-full rounded-lg flex items-center bg-gray-100 text-gray-600 hover:bg-gray-200 relative overflow-hidden transition-colors duration-200"
              title="Search vendors"
              style={{ 
                padding: '12px',
                paddingLeft: '12px'
              }}
            >
              <div className="flex items-center transition-all duration-250 ease-out" style={{
                transform: isAnimating ? 'translateX(28px)' : 'translateX(0)'
              }}>
                <Search className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium ml-3 whitespace-nowrap">
                  Search Vendors
                </span>
              </div>
            </button>
          )}

          {/* Category Filter Pills */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 -mr-6 pr-6">
              {/* All/Clear Filter Button */}
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === null
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{
                  backgroundColor: selectedCategory === null ? '#A5AAAF' : undefined
                }}
              >
                <span>All</span>
              </button>
              
              {/* Category Pills */}
              {allCategories.map((category) => {
                const isSelected = selectedCategory === category.id;
                const backgroundColor = isSelected ? darkenColor(category.color) : category.color;
                
                // Use dark text for light-colored categories that have poor contrast with white text
                const shouldUseDarkText = category.id === 'seating' || category.id === 'trash';
                const textColor = shouldUseDarkText ? 'text-gray-800' : 'text-white';
                
                return (
                  <button
                    key={`${category.type}-${category.id}`}
                    onClick={() => handleCategoryFilter(isSelected ? null : category.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                      isSelected
                        ? textColor
                        : `${textColor} hover:opacity-80 hover:shadow-md`
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
          {/* Vendor Count */}
          <div 
            style={{
              margin: '0 0 16px 0',
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
          </div>
          <div className="space-y-2">
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
              filteredVendors.map((vendor) => (
                <div 
                  key={vendor.id}
                  className="border relative overflow-hidden vendor-card-hover"
                  style={{ 
                    borderColor: 'rgb(229, 231, 235)',
                    borderRadius: '12px',
                    transition: 'box-shadow 0.2s ease-in-out'
                  }}
                >
                  <button
                    onClick={() => {
                      if (openVendorPopup) {
                        openVendorPopup(vendor.id);
                      } else {
                        onVendorClick(vendor);
                      }
                    }}
                    className="w-full p-3 flex items-center gap-3 text-left"
                    style={{ 
                      borderRadius: '12px'
                    }}
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
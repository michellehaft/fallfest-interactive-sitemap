import React, { useState, useMemo } from 'react';
import { Search, Filter, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { VendorData } from '../data/vendors';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';

interface HeaderProps {
  vendors: VendorData[];
  onVendorClick: (vendor: VendorData) => void;
  openVendorPopup?: ((vendorId: string) => void) | null;
}

const Header: React.FC<HeaderProps> = ({ vendors, onVendorClick, openVendorPopup }) => {
  const { 
    toggleFilterPanel, 
    isFilterPanelOpen
  } = useStore();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vendors based on search query
  const filteredVendors = useMemo(() => {
    if (!searchQuery.trim()) {
      return vendors.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    const query = searchQuery.toLowerCase().trim();
    return vendors
      .filter(vendor => 
        vendor.name.toLowerCase().includes(query) ||
        vendor.category.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [vendors, searchQuery]);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  return (
    <header className="fixed top-0 left-0 bottom-0 z-50 border-r border-gray-200 w-80 overflow-y-auto" style={{ backgroundColor: '#f3f3f2' }}>
      <div className="px-4 py-3 flex flex-col space-y-4">
        {/* Header Image */}
        <div style={{ marginTop: '4px', marginLeft: '0px', marginRight: '0px' }}>
          <img 
            src="/images/general/sidebar-header.jpg"
            alt="Eastwood Fallfest Header"
            className="w-full h-auto rounded-lg"
          />
        </div>

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

          {/* Filter Button */}
          <button
            onClick={toggleFilterPanel}
            className={`w-full p-3 rounded-lg transition-colors flex items-center gap-3 ${
              isFilterPanelOpen 
                ? 'bg-fallfest-100 text-fallfest-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Filter vendors"
          >
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">Filter Options</span>
          </button>


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
                        className="text-xs px-2 py-0.5 rounded-full text-white capitalize"
                        style={{ backgroundColor: getCategoryColor(vendor.category) }}
                      >
                        {vendor.category}
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
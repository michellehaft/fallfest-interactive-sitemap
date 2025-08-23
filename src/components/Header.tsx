import React from 'react';
import { Search, Filter, Menu } from 'lucide-react';
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
    toggleSearch, 
    isFilterPanelOpen,
    isSearchOpen
  } = useStore();

  return (
    <header className="fixed top-0 left-0 bottom-0 z-50 bg-white/90 backdrop-blur-md border-r border-gray-200 w-80 overflow-y-auto">
      <div className="px-4 py-3 flex flex-col space-y-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-fallfest-200">
            <img 
              src="https://scontent-atl3-3.cdninstagram.com/v/t51.2885-19/360424161_1324041308509534_3488725814737756122_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDI5LmMxIn0&_nc_ht=scontent-atl3-3.cdninstagram.com&_nc_cat=110&_nc_oc=Q6cZ2QFXhU5vRoclgmYbDITJVo2AGau2loB_VIAslATKSwo85HEZR65LlmJbTREF7vVv0Pk&_nc_ohc=_nqoAbmDijcQ7kNvwE5DxKg&_nc_gid=a5cGhRzBbxEgSpjrZW2Jbw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfUwJA_gcDCIaZTcLCnytSbZOMrAkjba5sOmMuDTYZhx-w&oe=68ADAD0B&_nc_sid=7a9f4b"
              alt="Eastwood Fallfest Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Eastwood Fallfest 2025</h1>
            <p className="text-sm text-gray-600">Interactive Sitemap</p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col gap-2">
          {/* Search Button */}
          <button
            onClick={toggleSearch}
            className={`w-full p-3 rounded-lg transition-colors flex items-center gap-3 ${
              isSearchOpen 
                ? 'bg-fallfest-100 text-fallfest-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Search vendors"
          >
            <Search className="w-5 h-5" />
            <span className="text-sm font-medium">Search Vendors</span>
          </button>

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
            {vendors.map((vendor, index) => (
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
                {index < vendors.length - 1 && (
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
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
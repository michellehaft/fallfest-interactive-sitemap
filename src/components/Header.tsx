import React from 'react';
import { Search, Filter, Heart, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header: React.FC = () => {
  const { 
    toggleFilterPanel, 
    toggleSearch, 
    getFavorites,
    isFilterPanelOpen,
    isSearchOpen
  } = useStore();

  const favorites = getFavorites();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
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
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button
            onClick={toggleSearch}
            className={`p-2 rounded-lg transition-colors ${
              isSearchOpen 
                ? 'bg-fallfest-100 text-fallfest-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Search vendors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Filter Button */}
          <button
            onClick={toggleFilterPanel}
            className={`p-2 rounded-lg transition-colors ${
              isFilterPanelOpen 
                ? 'bg-fallfest-100 text-fallfest-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Filter vendors"
          >
            <Filter className="w-5 h-5" />
          </button>

          {/* Favorites Button */}
          <button
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors relative"
            title="View favorites"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors md:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 pb-3 flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Open Now</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Food & Drinks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Arts & Crafts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Activities</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 
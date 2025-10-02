import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { VendorData, categoryConfig } from '../data/vendors';
import { infrastructureConfig } from '../data/infrastructure';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';
import MobileVendorDetail from './MobileVendorDetail';

interface MobileBottomSheetProps {
  vendors: VendorData[];
  onVendorClick: (vendor: VendorData) => void;
  openVendorPopup?: ((vendorId: string) => void) | null;
  onCategoryFilter?: (category: string | null) => void;
  selectedVendor?: VendorData | null;
  onVendorClose?: () => void;
  onOpenDetailView?: (vendor: VendorData) => void;
}

type SheetState = 'collapsed' | 'partial' | 'full';

const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({ 
  vendors, 
  onVendorClick, 
  openVendorPopup, 
  onCategoryFilter,
  selectedVendor: propSelectedVendor,
  onVendorClose,
  onOpenDetailView 
}) => {
  const [sheetState, setSheetState] = useState<SheetState>('partial');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState<VendorData | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);

  // Handle vendor selection from map (now for popup, not detail view)
  useEffect(() => {
    if (propSelectedVendor && propSelectedVendor !== selectedVendor) {
      // Don't automatically open detail view anymore
      // Just set the selected vendor for potential detail view opening
      setSelectedVendor(propSelectedVendor);
    }
  }, [propSelectedVendor, selectedVendor]);

  // Expose handleOpenDetailView globally for map popup buttons
  useEffect(() => {
    (window as any).mobileDetailViewHandler = (vendorId: string) => {
      const vendor = vendors.find(v => v.id === vendorId);
      if (vendor) {
        handleOpenDetailView(vendor);
        if (onOpenDetailView) {
          onOpenDetailView(vendor);
        }
      }
    };

    return () => {
      delete (window as any).mobileDetailViewHandler;
    };
  }, [vendors, onOpenDetailView]);

  // Filter vendors based on search and category
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get all unique categories for filter pills
  const allCategories = [
    ...Object.entries(categoryConfig).map(([key, config]) => ({
      id: key,
      label: config.label,
      color: config.color,
      icon: config.icon,
      type: 'vendor'
    })),
    ...Object.entries(infrastructureConfig).map(([key, config]) => ({
      id: key,
      label: config.label,
      color: config.color,
      icon: config.icon,
      type: 'infrastructure'
    }))
  ];

  const getSheetHeight = () => {
    switch (sheetState) {
      case 'collapsed': return '80px';
      case 'partial': return '45vh';
      case 'full': return '90vh';
      default: return '45vh';
    }
  };

  const handleSearchClick = () => setIsSearchActive(true);
  const handleSearchClear = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    if (onCategoryFilter) onCategoryFilter(category);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (showDetailView) return; // Disable dragging when detail view is shown
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || showDetailView) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging || showDetailView) return;
    setIsDragging(false);
    
    const deltaY = currentY - startY;
    const threshold = 50;

    if (deltaY > threshold) {
      // Swipe down
      if (sheetState === 'full') setSheetState('partial');
      else if (sheetState === 'partial') setSheetState('collapsed');
    } else if (deltaY < -threshold) {
      // Swipe up
      if (sheetState === 'collapsed') setSheetState('partial');
      else if (sheetState === 'partial') setSheetState('full');
    }
  };

  // Handle drag handle click
  const handleDragHandleClick = () => {
    if (sheetState === 'collapsed') setSheetState('partial');
    else if (sheetState === 'partial') setSheetState('full');
    else setSheetState('partial');
  };

  // Handle vendor click to show map popup (not detail view)
  const handleVendorClick = (vendor: VendorData) => {
    // Trigger the vendor click for state management
    onVendorClick(vendor);
    
    // Open the vendor popup on the map
    if (openVendorPopup) {
      openVendorPopup(vendor.id);
    }
    
    // Optionally collapse sheet to better show the map popup
    if (sheetState === 'full') {
      setSheetState('partial');
    }
  };

  // Handle opening detail view from map popup "View Details" button
  const handleOpenDetailView = (vendor: VendorData) => {
    setSelectedVendor(vendor);
    setShowDetailView(true);
    setSheetState('full'); // Expand to full for detail view
  };

  // Handle closing detail view
  const handleCloseDetailView = () => {
    setShowDetailView(false);
    setSelectedVendor(null);
    setSheetState('partial'); // Return to partial state
    if (onVendorClose) {
      onVendorClose(); // Clear parent's selectedVendor state
    }
  };

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl z-50 transition-all duration-300 ease-out"
      style={{
        height: getSheetHeight(),
        transform: isDragging ? `translateY(${Math.max(0, currentY - startY)}px)` : 'translateY(0)',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Drag Handle */}
      {!showDetailView && (
        <div 
          className="w-full flex justify-center pt-3 pb-2 cursor-pointer"
          onClick={handleDragHandleClick}
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"></div>
        </div>
      )}

      {/* Content Container */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Show Detail View or List View */}
        {showDetailView && selectedVendor ? (
          <MobileVendorDetail
            vendor={selectedVendor}
            onClose={handleCloseDetailView}
          />
        ) : (
          <div className="px-4 flex flex-col h-full overflow-hidden">
            {/* Search Bar */}
            <div className="mb-3">
              {isSearchActive ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search vendors..."
                    className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                  className="w-full rounded-lg flex items-center bg-gray-100 text-gray-600 hover:bg-gray-200 p-3"
                >
                  <Search className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium ml-3">Search Vendors</span>
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            {sheetState !== 'collapsed' && (
              <div className="flex overflow-x-auto gap-2 pb-2 mb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* All Button */}
                <button
                  onClick={() => handleCategoryFilter(null)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === null
                      ? 'text-white bg-gray-500'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span>All</span>
                </button>
                
                {/* Category Pills */}
                {allCategories.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={`${category.type}-${category.id}`}
                      onClick={() => handleCategoryFilter(isSelected ? null : category.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors text-white`}
                      style={{
                        backgroundColor: category.color,
                        opacity: isSelected ? 1 : 0.9
                      }}
                    >
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                      {isSelected && <X className="w-3 h-3 ml-1" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Vendor Count */}
            {sheetState !== 'collapsed' && (
              <div className="text-sm text-gray-500 mb-3">
                {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
              </div>
            )}

            {/* Vendor List */}
            {sheetState !== 'collapsed' && (
              <div className="flex-1 overflow-y-auto -mx-4 px-4">
                <div className="space-y-2">
                  {filteredVendors.length === 0 && searchQuery.trim() ? (
                    <div className="p-4 text-center text-gray-500">
                      <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No vendors found matching "{searchQuery}"</p>
                      <button
                        onClick={handleSearchClear}
                        className="mt-2 text-xs text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    filteredVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className="border border-gray-200 rounded-xl overflow-hidden vendor-card-hover"
                        style={{ transition: 'box-shadow 0.2s ease-in-out' }}
                      >
                        <button
                          onClick={() => handleVendorClick(vendor)}
                          className="w-full p-3 flex items-center gap-3 text-left"
                        >
                          {/* Vendor Avatar */}
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
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
                            <h4 className="text-base font-medium text-gray-900 truncate">{vendor.name}</h4>
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileBottomSheet;
import { useEffect, useState, useCallback, useRef } from 'react';
import { vendors, VendorData, categoryConfig } from './data/vendors';
import { infrastructureConfig } from './data/infrastructure';
import { mapConfig } from './data/mapConfig';
import { useStore, initializeStore } from './store/useStore';
import { getCategoryColor, getCategoryIcon } from './data/mapConfig';
import OpenStreetMap from './components/OpenStreetMap';
import Header from './components/Header';
import MobileBottomSheet from './components/MobileBottomSheet';
import { useIsMobile } from './hooks/useMediaQuery';


function App() {
  console.log('App component rendering...');
  
  const isMobile = useIsMobile();
  
  const { 
    setVendors, 
    filteredVendors, 
    selectedVendor,
    isFilterPanelOpen,
    isSearchOpen,
    setSelectedVendor
  } = useStore();

  const [showVendorPopup, setShowVendorPopup] = useState(false);
  const vendorManagerRef = useRef<any>(null);
  const infrastructureManagerRef = useRef<any>(null);
  
  // Create a stable callback function that doesn't change on every render
  const handleVendorManagerReady = useCallback((vendorManager: any) => {
    console.log('📋 VendorManager ready, storing reference');
    vendorManagerRef.current = vendorManager;
  }, []);

  const handleInfrastructureManagerReady = useCallback((infrastructureManager: any) => {
    console.log('🏗️ InfrastructureManager ready, storing reference');
    infrastructureManagerRef.current = infrastructureManager;
  }, []);

  const openVendorPopup = useCallback((vendorId: string) => {
    if (vendorManagerRef.current) {
      vendorManagerRef.current.openVendorPopup(vendorId);
    }
  }, []);

  const handleCategoryFilter = useCallback((category: string | null) => {
    if (category) {
      // Determine if it's a vendor or infrastructure category
      const isVendorCategory = categoryConfig.hasOwnProperty(category);
      const isInfrastructureCategory = infrastructureConfig.hasOwnProperty(category);
      
      if (isVendorCategory) {
        // Show only this vendor category, hide all infrastructure
        if (vendorManagerRef.current) {
          vendorManagerRef.current.applyFilter({
            categories: [category]
          });
        }
        if (infrastructureManagerRef.current) {
          infrastructureManagerRef.current.hideAll();
        }
      } else if (isInfrastructureCategory) {
        // Show only this infrastructure category, hide all vendors
        if (vendorManagerRef.current) {
          vendorManagerRef.current.hideAll();
        }
        if (infrastructureManagerRef.current) {
          infrastructureManagerRef.current.showOnly(category);
        }
      }
    } else {
      // Clear all filters to show everything
      if (vendorManagerRef.current) {
        vendorManagerRef.current.clearFilters();
      }
      if (infrastructureManagerRef.current) {
        infrastructureManagerRef.current.showAll();
      }
    }
  }, []);

  console.log('Store values:', { filteredVendors, selectedVendor, isFilterPanelOpen, isSearchOpen });

  useEffect(() => {
    try {
      console.log('Initializing app...');
      console.log('Vendors data:', vendors);
      console.log('Map config:', mapConfig);
      
      // Initialize store with vendor data
      setVendors(vendors);
      initializeStore();
      
      console.log('App initialized successfully');
      console.log('Store state after init:', useStore.getState());
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }, [setVendors]);

  const handleVendorClick = (vendor: VendorData) => {
    setSelectedVendor(vendor);
    // Only show popup on desktop - mobile will handle it via the bottom sheet
    if (!isMobile) {
      setShowVendorPopup(true);
    }
  };

  const closeVendorPopup = () => {
    setShowVendorPopup(false);
    setSelectedVendor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout - UNCHANGED */}
      {!isMobile && (
        <>
          {/* Header */}
          <Header vendors={filteredVendors as VendorData[]} onVendorClick={handleVendorClick} openVendorPopup={openVendorPopup} onCategoryFilter={handleCategoryFilter} />
          
          {/* Main Content */}
          <div className="pb-0 -mb-0" style={{ marginLeft: '393px' }}>
            <OpenStreetMap 
              vendors={filteredVendors as VendorData[]} 
              onVendorClick={handleVendorClick} 
              onVendorManagerReady={handleVendorManagerReady}
              onInfrastructureManagerReady={handleInfrastructureManagerReady}
            />
          </div>
        </>
      )}
      
      {/* Mobile Layout - NEW */}
      {isMobile && (
        <>
          {/* Full Screen Map */}
          <div className="h-screen w-full">
            <OpenStreetMap 
              vendors={filteredVendors as VendorData[]} 
              onVendorClick={handleVendorClick} 
              onVendorManagerReady={handleVendorManagerReady}
              onInfrastructureManagerReady={handleInfrastructureManagerReady}
            />
          </div>
          
          {/* Mobile Bottom Sheet */}
          <MobileBottomSheet
            vendors={filteredVendors as VendorData[]}
            onVendorClick={handleVendorClick}
            openVendorPopup={openVendorPopup}
            onCategoryFilter={handleCategoryFilter}
            selectedVendor={selectedVendor}
          />
        </>
      )}
      
      {/* Vendor Detail Popup */}
      {showVendorPopup && selectedVendor && (
        <div 
          className="fixed z-50 flex items-center justify-center bg-black bg-opacity-50"
          style={{
            top: 0,
            bottom: 0,
            left: '393px', // Start after the sidebar
            right: 0 // Extend to the right edge
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
                    {(selectedVendor as VendorData).image ? (
                      <img 
                        src={(selectedVendor as VendorData).image} 
                        alt={selectedVendor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to category icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<div class="w-full h-full rounded-full flex items-center justify-center text-white text-2xl" style="background-color: ${getCategoryColor(selectedVendor.category)}">${getCategoryIcon(selectedVendor.category)}</div>`;
                        }}
                      />
                    ) : (
                      // Placeholder image - you can replace this URL with your preferred placeholder
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                        alt={`${selectedVendor.name} placeholder`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Final fallback to category icon
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<div class="w-full h-full rounded-full flex items-center justify-center text-white text-2xl" style="background-color: ${getCategoryColor(selectedVendor.category)}">${getCategoryIcon(selectedVendor.category)}</div>`;
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedVendor.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white capitalize"
                        style={{ backgroundColor: getCategoryColor(selectedVendor.category) }}
                      >
                        {selectedVendor.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={closeVendorPopup}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{selectedVendor.description}</p>
            </div>

            {/* Detail Image */}
            {(selectedVendor as VendorData).detailImage && (
              <div className="px-6 pb-4">
                <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                  <img 
                    src={(selectedVendor as VendorData).detailImage}
                    alt={`${selectedVendor.name} detail view`}
                    className="w-full h-50 object-cover"
                    style={{ width: '400px', height: '200px' }}
                    onError={(e) => {
                      // Hide image if it fails to load
                      const target = e.target as HTMLImageElement;
                      target.parentElement!.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Details */}
            <div className="px-6 pb-4 space-y-4">
              {/* Age Requirements */}
              {(selectedVendor as VendorData).ageRequirements && (
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">👶</span>
                  <div className="flex-1 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <h4 className="font-medium text-gray-900 text-sm">Age Requirements</h4>
                    <p className="text-gray-600 text-sm">{(selectedVendor as VendorData).ageRequirements}</p>
                  </div>
                </div>
              )}

              {/* Capacity */}
              {(selectedVendor as VendorData).capacity && (
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-0.5">👥</span>
                  <div className="flex-1 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                    <h4 className="font-medium text-gray-900 text-sm">Capacity</h4>
                    <p className="text-gray-600 text-sm">{(selectedVendor as VendorData).capacity}</p>
                  </div>
                </div>
              )}

              {/* Dietary Options */}
              {(selectedVendor as VendorData).dietaryOptions && (selectedVendor as VendorData).dietaryOptions!.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">🥗</span>
                  <div className="flex-1 bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
                    <h4 className="font-medium text-gray-900 text-sm">Dietary Options</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(selectedVendor as VendorData).dietaryOptions!.map((option, index) => (
                        <span 
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {selectedVendor.contact?.website && (
                <div className="flex items-start gap-3 pt-2">
                  <span className="text-gray-400 mt-0.5">🌐</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Website</h4>
                    <a 
                      href={`https://${selectedVendor.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {selectedVendor.contact.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 
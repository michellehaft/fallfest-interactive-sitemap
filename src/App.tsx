import { useEffect, useState } from 'react';
import { vendors } from './data/vendors';
import { mapConfig } from './data/mapConfig';
import { useStore, initializeStore } from './store/useStore';
import { getCategoryColor, getCategoryIcon } from './data/mapConfig';
import OpenStreetMap from './components/OpenStreetMap';
import Header from './components/Header';
import { Vendor } from './types';

function App() {
  console.log('App component rendering...');
  
  const { 
    setVendors, 
    filteredVendors, 
    selectedVendor,
    isFilterPanelOpen,
    isSearchOpen,
    setSelectedVendor
  } = useStore();

  const [showVendorPopup, setShowVendorPopup] = useState(false);

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

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowVendorPopup(true);
  };

  const closeVendorPopup = () => {
    setShowVendorPopup(false);
    setSelectedVendor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-0 -mb-0">
        <OpenStreetMap vendors={filteredVendors} onVendorClick={handleVendorClick} />
      </div>
      
      {/* Vendor Detail Popup */}
      {showVendorPopup && selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl"
                    style={{ backgroundColor: getCategoryColor(selectedVendor.category) }}
                  >
                    {getCategoryIcon(selectedVendor.category)}
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
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedVendor.status === 'open' ? 'bg-green-100 text-green-800' :
                        selectedVendor.status === 'closed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedVendor.status}
                      </span>
                      {selectedVendor.featured && (
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                          ⭐ Featured
                        </span>
                      )}
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

            {/* Details */}
            <div className="px-6 pb-4 space-y-4">
              {/* Hours */}
              <div className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">🕒</span>
                <div>
                  <h4 className="font-medium text-gray-900">Hours</h4>
                  <p className="text-gray-600">{selectedVendor.hours}</p>
                </div>
              </div>

              {/* Special Offers */}
              {selectedVendor.specialOffers && selectedVendor.specialOffers.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">🎯</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Special Offers</h4>
                    <ul className="text-gray-600 space-y-1">
                      {selectedVendor.specialOffers.map((offer, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                          {offer}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-gray-400">📍</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <p className="text-gray-600">{selectedVendor.location.area}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Vendor ID: {selectedVendor.id}</span>
                <span>Click to visit!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 
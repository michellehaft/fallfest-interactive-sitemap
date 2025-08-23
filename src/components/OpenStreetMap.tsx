import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VendorData, categoryConfig } from '../data/vendors';
import VendorManager from '../utils/VendorManager';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface OpenStreetMapProps {
  vendors: VendorData[];
  onVendorClick: (vendor: VendorData) => void;
  onVendorManagerReady?: (openVendorPopup: (vendorId: string) => void) => void;
}

// Eastwood Village coordinates
const EASTWOOD_CENTER: [number, number] = [36.1888487, -86.7383314];



const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ vendors, onVendorClick, onVendorManagerReady }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const vendorManagerRef = useRef<VendorManager | null>(null);
  const tempMarkersRef = useRef<L.Marker[]>([]);
  
  // Development mode state
  const [devMode, setDevMode] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState<Array<{lat: number, lng: number, offsetLat: number, offsetLng: number}>>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView(EASTWOOD_CENTER, 19);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);



    // Initialize VendorManager
    vendorManagerRef.current = new VendorManager(map, vendors, {
      onVendorClick: (vendor) => {
        onVendorClick(vendor);
      },
      onVendorDrag: (vendor, newCoordinates) => {
        console.log(`🎯 ${vendor.name} moved to: [${newCoordinates[0].toFixed(7)}, ${newCoordinates[1].toFixed(7)}]`);
        console.log(`📍 For generateCoords: generateCoords(${(newCoordinates[0] - EASTWOOD_CENTER[0]).toFixed(7)}, ${(newCoordinates[1] - EASTWOOD_CENTER[1]).toFixed(7)})`);
        
        // Add to coordinates state for display
        setClickedCoordinates(prev => [...prev, { 
          lat: newCoordinates[0], 
          lng: newCoordinates[1], 
          offsetLat: newCoordinates[0] - EASTWOOD_CENTER[0], 
          offsetLng: newCoordinates[1] - EASTWOOD_CENTER[1] 
        }]);
      },
      popupOptions: {
        maxWidth: 350,
        className: 'vendor-popup'
      }
    });

    // Set global reference for popup handlers
    window.vendorManager = vendorManagerRef.current;

    // Expose vendor popup function to parent component
    if (onVendorManagerReady) {
      onVendorManagerReady((vendorId: string) => {
        vendorManagerRef.current?.openVendorPopup(vendorId);
      });
    }



    // Cleanup function
    return () => {
      // Clear temporary markers
      tempMarkersRef.current.forEach(marker => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.removeLayer(marker);
        }
      });
      tempMarkersRef.current = [];
      
      if (vendorManagerRef.current) {
        vendorManagerRef.current.destroy();
        vendorManagerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      delete window.vendorManager;
    };
  }, [vendors, onVendorClick]);

  // Handle dev mode changes
  useEffect(() => {
    try {
      console.log(`🛠️ Dev mode effect triggered. devMode=${devMode}, vendorManager=${!!vendorManagerRef.current}, map=${!!mapInstanceRef.current}`);
      if (vendorManagerRef.current && mapInstanceRef.current) {
        // Small delay to ensure markers are fully created
        setTimeout(() => {
          console.log(`🛠️ Setting drag mode to: ${devMode}`);
          vendorManagerRef.current?.setDragMode(devMode);
        }, 100);
        
        // Disable/enable map dragging based on dev mode
        if (devMode) {
          // Disable map dragging when dev mode is active
          mapInstanceRef.current.dragging.disable();
          mapInstanceRef.current.doubleClickZoom.disable();
          mapInstanceRef.current.scrollWheelZoom.disable();
          mapInstanceRef.current.boxZoom.disable();
          mapInstanceRef.current.keyboard.disable();
          if ((mapInstanceRef.current as any).tap) (mapInstanceRef.current as any).tap.disable();
        } else {
          // Re-enable map dragging when dev mode is disabled
          mapInstanceRef.current.dragging.enable();
          mapInstanceRef.current.doubleClickZoom.enable();
          mapInstanceRef.current.scrollWheelZoom.enable();
          mapInstanceRef.current.boxZoom.enable();
          mapInstanceRef.current.keyboard.enable();
          if ((mapInstanceRef.current as any).tap) (mapInstanceRef.current as any).tap.enable();
          
          // Clear temporary markers and coordinates when exiting dev mode
          tempMarkersRef.current.forEach(marker => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.removeLayer(marker);
            }
          });
          tempMarkersRef.current = [];
          setClickedCoordinates([]);
        }
      }
    } catch (error) {
      console.error('Error handling dev mode change:', error);
    }
  }, [devMode, vendors]);

  // Keyboard shortcut for dev mode (Ctrl/Cmd + D)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        setDevMode(prev => {
          const newMode = !prev;
          console.log(`🛠️ Dev Mode ${newMode ? 'ENABLED' : 'DISABLED'} (Ctrl/Cmd + D)`);
          return newMode;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Function to clear all coordinates
  const clearTempMarkers = () => {
    setClickedCoordinates([]);
    console.log('🧹 Cleared all coordinates');
  };

  // Update vendors when props change
  useEffect(() => {
    if (vendorManagerRef.current) {
      vendorManagerRef.current.importVendors(vendors);
    }
  }, [vendors]);

  // Set up global handler for popup buttons
  useEffect(() => {
    (window as any).vendorClickHandler = (vendorId: string) => {
      const vendor = vendors.find(v => v.id === vendorId);
      if (vendor) {
        onVendorClick(vendor);
      }
    };

    return () => {
      delete (window as any).vendorClickHandler;
    };
  }, [vendors, onVendorClick]);

  return (
    <div className="relative w-full h-screen mb-0 pb-0">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-t-lg border-t border-l border-r border-gray-300"
        style={{ zIndex: 1, marginBottom: 0, paddingBottom: 0, height: '100vh' }}
      />
      
      {/* Development Mode Controls */}
      <div className="absolute top-4 right-4 bg-gray-900 text-white rounded-lg shadow-lg p-3 z-20">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={devMode}
              onChange={(e) => setDevMode(e.target.checked)}
              className="rounded"
            />
            🛠️ Dev Mode
          </label>
          {devMode && (
            <button
              onClick={clearTempMarkers}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-medium transition-colors"
              title="Clear all temporary markers"
            >
              🧹 Clear
            </button>
          )}
        </div>
        {devMode && (
          <div className="mt-2 text-xs text-gray-300">
            🔒 Map dragging disabled<br/>
            🔄 Drag vendors to reposition<br/>
            <span className="text-gray-400">Ctrl/Cmd + D to toggle</span>
          </div>
        )}
      </div>

      {/* Coordinates Display */}
      {devMode && clickedCoordinates.length > 0 && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-md max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">📍 Dragged Vendor Coordinates</h4>
            <button
              onClick={clearTempMarkers}
              className="text-gray-500 hover:text-red-600 text-sm"
              title="Clear all coordinates"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            {clickedCoordinates.map((coord, index) => (
              <div key={index} className="bg-gray-50 rounded p-3 border">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Point {index + 1}
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="text-gray-600 mb-1">Raw Coordinates:</div>
                    <div 
                      className="bg-blue-50 p-2 rounded border cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        navigator.clipboard.writeText(`[${coord.lat.toFixed(7)}, ${coord.lng.toFixed(7)}]`);
                        console.log('📋 Copied raw coordinates to clipboard');
                      }}
                      title="Click to copy"
                    >
                      [{coord.lat.toFixed(7)}, {coord.lng.toFixed(7)}]
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">generateCoords:</div>
                    <div 
                      className="bg-green-50 p-2 rounded border cursor-pointer hover:bg-green-100"
                      onClick={() => {
                        navigator.clipboard.writeText(`generateCoords(${coord.offsetLat.toFixed(7)}, ${coord.offsetLng.toFixed(7)})`);
                        console.log('📋 Copied generateCoords to clipboard');
                      }}
                      title="Click to copy"
                    >
                      generateCoords({coord.offsetLat.toFixed(7)}, {coord.offsetLng.toFixed(7)})
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
        <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
        <div className="space-y-2 text-sm">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: config.color, color: 'white' }}
              >
                {config.icon}
              </div>
              <span>{config.label}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default OpenStreetMap; 
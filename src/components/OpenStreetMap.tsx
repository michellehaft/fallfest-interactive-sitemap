import React, { useEffect, useRef } from 'react';
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
}

// Eastwood Village coordinates
const EASTWOOD_CENTER: [number, number] = [36.1888487, -86.7383314];



const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ vendors, onVendorClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const vendorManagerRef = useRef<VendorManager | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView(EASTWOOD_CENTER, 18);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Add a marker for the festival center
    const centerMarker = L.marker(EASTWOOD_CENTER, {
      icon: L.divIcon({
        className: 'festival-center-marker',
        html: `
          <div style="
            background-color: #DC2626;
            border: 3px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.4);
            color: white;
            font-weight: bold;
          ">
            🎭
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })
    }).addTo(map);

    // Add popup for festival center
    centerMarker.bindPopup(`
      <div style="text-align: center; padding: 10px;">
        <h3 style="margin: 0 0 10px 0; color: #DC2626;">🎭 Fallfest 2024</h3>
        <p style="margin: 0; font-size: 14px;">Eastwood Village</p>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #6B7280;">
          Main Festival Grounds
        </p>
      </div>
    `);

    // Initialize VendorManager
    vendorManagerRef.current = new VendorManager(map, vendors, {
      onVendorClick: (vendor) => {
        onVendorClick(vendor);
      },
      popupOptions: {
        maxWidth: 350,
        className: 'vendor-popup'
      }
    });

    // Set global reference for popup handlers
    window.vendorManager = vendorManagerRef.current;

    // Add festival boundary overlay (approximate Eastwood Village area)
    const festivalBounds: [[number, number], [number, number]] = [
      [36.1895, -86.7395], // North West
      [36.1880, -86.7370]  // South East
    ];

    L.rectangle(festivalBounds, {
      color: '#DC2626',
      weight: 2,
      fillColor: '#FEE2E2',
      fillOpacity: 0.1
    }).addTo(map);

    // Add boundary label
    const boundaryCenter: [number, number] = [
      (festivalBounds[0][0] + festivalBounds[1][0]) / 2,
      (festivalBounds[0][1] + festivalBounds[1][1]) / 2
    ];

    L.marker(boundaryCenter, {
      icon: L.divIcon({
        className: 'boundary-label',
        html: `
          <div style="
            background: rgba(220, 38, 38, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
            border: 1px solid white;
          ">
            🎪 FESTIVAL BOUNDARY
          </div>
        `,
        iconSize: [120, 30],
        iconAnchor: [60, 15]
      })
    }).addTo(map);

    // Add street labels for key roads
    const streetLabels: Array<{ pos: [number, number], text: string, rotation: number }> = [
      { pos: [36.1892, -86.7383], text: 'Chapel Ave', rotation: 0 },
      { pos: [36.1895, -86.7383], text: 'Greenwood Ave', rotation: 0 },
      { pos: [36.1880, -86.7383], text: 'Hobson Chapel Pl', rotation: 0 },
      { pos: [36.1888, -86.7390], text: 'Roberts Ave', rotation: 90 },
      { pos: [36.1888, -86.7375], text: 'Sharpe Ave', rotation: 90 }
    ];

    streetLabels.forEach(label => {
      L.marker(label.pos, {
        icon: L.divIcon({
          className: 'street-label',
          html: `
            <div style="
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 10px;
              font-weight: bold;
              white-space: nowrap;
              transform: rotate(${label.rotation}deg);
            ">
              ${label.text}
            </div>
          `,
          iconSize: [80, 20],
          iconAnchor: [40, 10]
        })
      }).addTo(map);
    });

    // Cleanup function
    return () => {
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
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <span>Festival Center</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h5 className="font-medium text-gray-700 mb-2">Map Features</h5>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-200 rounded border border-red-600"></div>
              <span>Festival Boundary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-800 rounded opacity-70"></div>
              <span>Street Labels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenStreetMap; 
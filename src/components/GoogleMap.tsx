import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useStore } from '../store/useStore';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';
import { GOOGLE_MAPS_CONFIG, isDemoMode } from '../config/maps';
import { Vendor } from '../types';

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  onVendorClick?: (vendor: Vendor) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ center, zoom, onVendorClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  const { filteredVendors } = useStore();

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      // Check if we're in demo mode
      if (isDemoMode()) {
        setMapError('Google Maps API key not configured');
        return;
      }

      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_CONFIG.apiKey,
          version: 'weekly',
          libraries: ['places']
        });

        await loader.load();

        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            ...GOOGLE_MAPS_CONFIG.mapOptions
          });

          mapInstanceRef.current = map;
          setIsMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setMapError('Failed to load Google Maps. Please check your API key.');
      }
    };

    initMap();
  }, [center, zoom]);

  // Create custom marker icon
  const createMarkerIcon = (category: string): google.maps.Icon => {
    const color = getCategoryColor(category);
    const icon = getCategoryIcon(category);
    
    // Create SVG icon
    const svg = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="3"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="Arial">${icon}</text>
      </svg>
    `;

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20)
    };
  };

  // Update markers when vendors change
  useEffect(() => {
    if (!isMapLoaded || !mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create new markers
    const newMarkers = filteredVendors.map(vendor => {
      const marker = new google.maps.Marker({
        position: { lat: vendor.location.coordinates[0], lng: vendor.location.coordinates[1] },
        map: mapInstanceRef.current,
        icon: createMarkerIcon(vendor.category),
        title: vendor.name,
        animation: google.maps.Animation.DROP
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px; font-weight: 600;">${vendor.name}</h3>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${vendor.description}</p>
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 12px; padding: 4px 8px; background-color: ${getCategoryColor(vendor.category)}; color: white; border-radius: 12px; text-transform: capitalize;">
                ${vendor.category}
              </span>
              <span style="font-size: 12px; padding: 4px 8px; background-color: ${vendor.status === 'open' ? '#10b981' : vendor.status === 'closed' ? '#ef4444' : '#f59e0b'}; color: white; border-radius: 12px;">
                ${vendor.status}
              </span>
            </div>
            <p style="margin: 0; color: #6b7280; font-size: 12px;">Hours: ${vendor.hours}</p>
            ${vendor.specialOffers && vendor.specialOffers.length > 0 ? `
              <div style="margin-top: 8px;">
                <p style="margin: 0 0 4px 0; color: #f97316; font-size: 12px; font-weight: 600;">Special Offers:</p>
                <ul style="margin: 0; padding-left: 16px; color: #6b7280; font-size: 11px;">
                  ${vendor.specialOffers.map(offer => `<li>${offer}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `
      });

      // Add click listeners
      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
        if (onVendorClick) {
          onVendorClick(vendor);
        }
      });

      return marker;
    });

    markersRef.current = newMarkers;

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        if (marker.getPosition()) {
          bounds.extend(marker.getPosition()!);
        }
      });
      mapInstanceRef.current.fitBounds(bounds);
      
      // Set a maximum zoom level
      const listener = google.maps.event.addListener(mapInstanceRef.current, 'idle', () => {
        if (mapInstanceRef.current!.getZoom()! > 18) {
          mapInstanceRef.current!.setZoom(18);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [filteredVendors, isMapLoaded, onVendorClick]);

  if (mapError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 max-w-2xl">
          <div className="text-blue-500 text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Google Maps Integration Ready!</h3>
          <p className="text-gray-600 mb-6">The interactive map is set up and ready to display your Fallfest vendors.</p>
          
          {/* Demo vendor grid */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Vendors Preview ({filteredVendors.length} total)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
              {filteredVendors.slice(0, 8).map((vendor) => (
                <div key={vendor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: getCategoryColor(vendor.category) }}
                  >
                    {getCategoryIcon(vendor.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 truncate">{vendor.name}</h5>
                    <p className="text-sm text-gray-600 capitalize">{vendor.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    vendor.status === 'open' ? 'bg-green-100 text-green-800' :
                    vendor.status === 'closed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-left">
            <p className="font-semibold text-amber-800 mb-3">🔑 To enable Google Maps:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-amber-700">
              <li>Visit <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google Cloud Console</a></li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the "Maps JavaScript API"</li>
              <li>Create credentials and copy your API key</li>
              <li>Create a <code className="bg-amber-100 px-1 rounded">.env</code> file with: <code className="bg-amber-100 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY=your_key_here</code></li>
              <li>Restart the development server</li>
            </ol>
            <div className="mt-4 p-3 bg-amber-100 rounded border border-amber-300">
              <p className="text-xs text-amber-800 font-medium">💡 Pro tip: The map will automatically load all vendor markers with custom icons, info windows, and filtering capabilities!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {['food', 'arts', 'activities', 'services'].map(category => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: getCategoryColor(category) }}
              >
                {getCategoryIcon(category)}
              </div>
              <span className="capitalize text-gray-700">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
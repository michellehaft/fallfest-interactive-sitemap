// Google Maps Configuration
export const GOOGLE_MAPS_CONFIG = {
  // For development, you can use a test API key or leave this empty to see the setup instructions
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'DEMO_MODE',
  
  // Map configuration
  defaultCenter: { lat: 36.1627, lng: -86.7816 }, // Nashville area
  defaultZoom: 17,
  
  // Map styling options
  mapOptions: {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }]
      }
    ]
  }
};

// Development mode check
export const isDemoMode = () => {
  return GOOGLE_MAPS_CONFIG.apiKey === 'DEMO_MODE' || !GOOGLE_MAPS_CONFIG.apiKey;
};
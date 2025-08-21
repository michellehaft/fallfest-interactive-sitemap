export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string;
  location: {
    x: number;
    y: number;
    area: string;
    coordinates: [number, number]; // [lat, lng]
  };
  contact?: {
    email?: string;
    website?: string;
  };
}

export type VendorCategory = 
  | 'food' 
  | 'beverage'
  | 'arts' 
  | 'activities' 
  | 'services' 
  | 'entertainment' 
  | 'security' 
  | 'restrooms'
  | 'firstAid'
  | 'parking'
  | 'seating'
  | 'information';

export interface MapConfig {
  center: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]];
  areas: {
    [key: string]: {
      name: string;
      bounds: [[number, number], [number, number]];
      color: string;
    };
  };
}

export interface FilterState {
  categories: VendorCategory[];
  searchQuery: string;
  showFeaturedOnly: boolean;
}

export interface UserPreferences {
  favorites: string[];
  visited: string[];
  theme: 'light' | 'dark' | 'auto';
  language: string;
} 
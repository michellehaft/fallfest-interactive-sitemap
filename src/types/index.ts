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
    phone?: string;
    email?: string;
    website?: string;
  };
  status?: 'open' | 'closed' | 'coming-soon';
  hours?: string;
  specialOffers?: string[];
  featured?: boolean;
}

export type VendorCategory = 
  | 'food' 
  | 'beverage'
  | 'merchant'
  | 'NGO/Civic'
  | 'activities' 
  | 'services'
  | 'arts'
  | 'entertainment'
  | 'security'
  | 'facilities';

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
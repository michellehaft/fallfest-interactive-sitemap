// Fallfest 2024 - Eastwood Village
// Complete vendor, activity, and amenity data for interactive sitemap

import { Vendor, VendorCategory } from '../types';

// Base coordinates for Eastwood Village
const BASE_LAT = 36.1888487;
const BASE_LNG = -86.7383314;

// Helper function to generate coordinates with slight offsets for variety
const generateCoords = (latOffset: number, lngOffset: number): [number, number] => [
  BASE_LAT + latOffset,
  BASE_LNG + lngOffset
];

// Extended interface for our enhanced vendor data
export interface VendorData extends Vendor {
  type: 'vendor' | 'activity' | 'amenity';
  dietaryOptions?: string[];
  ageRequirements?: string;
  safetyInfo?: string;
  capacity?: string;
  accessibility?: string;
  features?: string[];
}

export const vendors: VendorData[] = [
  // === FOOD VENDORS ===
  {
    id: 'food-001',
    name: 'Ofelia Tacos.',
    type: 'vendor',
    category: 'food' as VendorCategory,
    location: {
      x: 20,
      y: 25,
      area: 'west-vendor-area',
      coordinates: generateCoords(0.0002, -0.0008)
    },
    description: 'Welcome to Ofelia, a vibrant homage to the rich culinary traditions of Mexico City, nestled in Nashville.',
    contact: {
      website: 'ofelianashville.com'
    },
    dietaryOptions: ['gluten-free buns available']
  },
  
  {
    id: 'food-002',
    name: 'Saap Saap BBQ',
    type: 'vendor',
    category: 'food' as VendorCategory,
    location: {
      x: 25,
      y: 30,
      area: 'west-vendor-area',
      coordinates: generateCoords(-0.0001, -0.0006)
    },
    description: 'Saap Saap BBQ in Nashville, TN, is where Southern barbecue meets vibrant Lao flavors, creating an unforgettable culinary experience. This catering service, complete with a trailer smoker, brings expertly smoked and grilled meats to the streets of Nashville, offering a unique twist on traditional BBQ with Lao-inspired dishes.',
    dietaryOptions: ['vegan', 'gluten-free']
  },

  // === ARTS & CRAFTS VENDORS ===
  {
    id: 'arts-001',
    name: 'Tennessee Handwoven Textiles',
    type: 'vendor',
    category: 'arts' as VendorCategory,
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0003, 0.0005)
    },
    description: 'Handwoven scarves, table runners, and wall hangings using traditional Tennessee patterns and locally sourced wool.',
    contact: {
      email: 'info@tnhandwoven.com',
      website: 'tennesseehandwoven.com'
    }
  },

  // === ACTIVITIES ===
  {
    id: 'activity-001',
    name: 'Fallfest Bounce House',
    type: 'activity',
    category: 'activities' as VendorCategory,
    location: {
      x: 30,
      y: 15,
      area: 'west-activities',
      coordinates: generateCoords(0.0001, -0.0004)
    },
    description: 'Safe, supervised bounce house for children ages 3-12.',
    ageRequirements: '3-12 years old',
    safetyInfo: 'Adult supervision required',
    capacity: '12 children maximum'
  },

  // === AMENITIES ===
  {
    id: 'amenity-001',
    name: 'Main Restroom Facility',
    type: 'amenity',
    category: 'restrooms' as VendorCategory,
    location: {
      x: 50,
      y: 70,
      area: 'central-amenities',
      coordinates: generateCoords(-0.0002, 0.0003)
    },
    description: 'Clean, well-maintained restroom facilities with baby changing stations and accessibility features.',
    accessibility: 'ADA compliant',
    features: [
      'Baby changing stations',
      'Hand sanitizer dispensers',
      'Wheelchair accessible',
      'Family restroom available'
    ]
  }
];

// Category configurations for map display
export const categoryConfig = {
  food: {
    color: '#F59E0B', // Amber
    icon: '🍔',
    label: 'Food'
  },
  beverage: {
    color: '#059669', // Green
    icon: '🥤',
    label: 'Beverages'
  },
  arts: {
    color: '#8B5CF6', // Purple
    icon: '🎨',
    label: 'Arts & Crafts'
  },
  activities: {
    color: '#10B981', // Emerald
    icon: '🎪',
    label: 'Activities & Entertainment'
  },
  services: {
    color: '#3B82F6', // Blue
    icon: '🛠️',
    label: 'Services'
  },
  restrooms: {
    color: '#6B7280', // Gray
    icon: '🚻',
    label: 'Restrooms'
  },
  firstAid: {
    color: '#EF4444', // Red
    icon: '🏥',
    label: 'First Aid'
  },
  security: {
    color: '#1F2937', // Dark Gray
    icon: '👮',
    label: 'Security'
  },
  parking: {
    color: '#059669', // Green
    icon: '🅿️',
    label: 'Parking'
  },
  seating: {
    color: '#D97706', // Orange
    icon: '🪑',
    label: 'Seating Areas'
  },
  information: {
    color: '#0891B2', // Cyan
    icon: 'ℹ️',
    label: 'Information'
  }
} as const;

// Filter and search utilities
export const getVendorsByType = (type: VendorData['type']) => vendors.filter(vendor => vendor.type === type);
export const getVendorsByCategory = (category: string) => vendors.filter(vendor => vendor.category === category);
export const getFeaturedVendors = () => vendors.slice(0, 3); // First 3 vendors as featured
export const getActiveVendors = () => vendors; // All vendors are considered active

// Search function
export const searchVendors = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(lowercaseQuery) ||
    vendor.description.toLowerCase().includes(lowercaseQuery) ||
    vendor.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Get vendor by ID
export const getVendorById = (id: string) => vendors.find(vendor => vendor.id === id);

// Statistics
export const getVendorStats = () => ({
  total: vendors.length,
  byType: {
    vendors: getVendorsByType('vendor').length,
    activities: getVendorsByType('activity').length,
    amenities: getVendorsByType('amenity').length
  },
  byCategory: Object.keys(categoryConfig).reduce((acc, category) => {
    acc[category] = getVendorsByCategory(category).length;
    return acc;
  }, {} as Record<string, number>),
  active: getActiveVendors().length
});

export default vendors;
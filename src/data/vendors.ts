import { Vendor } from '../types';

// Mock coordinates - in a real app, these would be actual GPS coordinates
// For now, using a coordinate system that matches the visual layout
const BASE_LAT = 36.1627; // Nashville area
const BASE_LNG = -86.7816;

export const vendors: Vendor[] = [
  // Security & Fire Lanes
  {
    id: 'security-north',
    name: 'Security Checkpoint - North',
    category: 'security',
    description: 'Main security checkpoint at the northern entrance. All bags will be checked.',
    location: {
      x: 85,
      y: 12,
      area: 'north-entrance',
      coordinates: [BASE_LAT + 0.001, BASE_LNG - 0.001]
    },
    hours: 'All day',
    status: 'open',
    featured: false
  },
  {
    id: 'security-south',
    name: 'Security Checkpoint - South',
    category: 'security',
    description: 'Security checkpoint at the southern entrance. All bags will be checked.',
    location: {
      x: 85,
      y: 88,
      area: 'south-entrance',
      coordinates: [BASE_LAT - 0.001, BASE_LNG - 0.001]
    },
    hours: 'All day',
    status: 'open',
    featured: false
  },
  {
    id: 'fire-lane-north',
    name: 'Fire Lane - North (20ft)',
    category: 'facilities',
    description: 'Emergency access lane - keep clear at all times.',
    location: {
      x: 45,
      y: 15,
      area: 'north-entrance',
      coordinates: [BASE_LAT + 0.0008, BASE_LNG - 0.001]
    },
    hours: 'All day',
    status: 'open',
    featured: false
  },
  {
    id: 'fire-lane-south',
    name: 'Fire Lane - South (20ft)',
    category: 'facilities',
    description: 'Emergency access lane - keep clear at all times.',
    location: {
      x: 45,
      y: 85,
      area: 'south-entrance',
      coordinates: [BASE_LAT - 0.0008, BASE_LNG - 0.001]
    },
    hours: 'All day',
    status: 'open',
    featured: false
  },

  // Main Stage & Entertainment
  {
    id: 'main-stage',
    name: 'Main Stage',
    category: 'entertainment',
    description: 'Live music and performances throughout the day. Check schedule for times.',
    location: {
      x: 35,
      y: 50,
      area: 'center-west',
      coordinates: [BASE_LAT, BASE_LNG - 0.0005]
    },
    hours: '10:00 AM - 8:00 PM',
    status: 'open',
    featured: true
  },

  // Food Vendors - West Side
  {
    id: 'food-1',
    name: 'Taco Fiesta',
    category: 'food',
    description: 'Authentic Mexican tacos, burritos, and quesadillas. Vegetarian options available.',
    location: {
      x: 20,
      y: 25,
      area: 'west-vendor-area',
      coordinates: [BASE_LAT + 0.0002, BASE_LNG - 0.0006]
    },
    hours: '11:00 AM - 7:00 PM',
    specialOffers: ['$2 Taco Tuesday', 'Free chips with any order'],
    status: 'open',
    featured: false
  },
  {
    id: 'food-2',
    name: 'BBQ Pit Stop',
    category: 'food',
    description: 'Smoked brisket, pulled pork, and ribs. Homemade BBQ sauce.',
    location: {
      x: 20,
      y: 35,
      area: 'west-vendor-area',
      coordinates: [BASE_LAT - 0.0002, BASE_LNG - 0.0006]
    },
    hours: '11:00 AM - 7:00 PM',
    specialOffers: ['Combo plates available', 'Gluten-free options'],
    status: 'open',
    featured: true
  },
  {
    id: 'food-3',
    name: 'Sweet Treats',
    category: 'food',
    description: 'Homemade cookies, brownies, and ice cream. Perfect for dessert!',
    location: {
      x: 20,
      y: 45,
      area: 'west-vendor-area',
      coordinates: [BASE_LAT + 0.0003, BASE_LNG + 0.0006]
    },
    hours: '12:00 PM - 8:00 PM',
    specialOffers: ['Buy 2 get 1 free on cookies'],
    status: 'open',
    featured: false
  },
  {
    id: 'food-4',
    name: 'Pizza Corner',
    category: 'food',
    description: 'Fresh-baked pizza by the slice or whole pie. Classic and specialty toppings.',
    location: {
      x: 20,
      y: 55,
      area: 'west-vendor-area',
      coordinates: [BASE_LAT - 0.0003, BASE_LNG + 0.0006]
    },
    hours: '11:00 AM - 7:00 PM',
    specialOffers: ['$5 lunch special', 'Gluten-free crust available'],
    status: 'open',
    featured: false
  },

  // Arts & Crafts - East Side
  {
    id: 'arts-1',
    name: 'Handmade Jewelry',
    category: 'arts',
    description: 'Unique handcrafted jewelry pieces. Custom orders welcome.',
    location: {
      x: 80,
      y: 25,
      area: 'east-vendor-area',
      coordinates: [BASE_LAT + 0.0002, BASE_LNG + 0.0007]
    },
    hours: '10:00 AM - 6:00 PM',
    specialOffers: ['20% off for festival attendees'],
    status: 'open',
    featured: false
  },
  {
    id: 'arts-2',
    name: 'Pottery Studio',
    category: 'arts',
    description: 'Hand-thrown pottery and ceramics. Watch live demonstrations.',
    location: {
      x: 80,
      y: 35,
      area: 'east-vendor-area',
      coordinates: [BASE_LAT - 0.0002, BASE_LNG + 0.0007]
    },
    hours: '10:00 AM - 6:00 PM',
    specialOffers: ['Kids pottery workshop at 2 PM'],
    status: 'open',
    featured: true
  },
  {
    id: 'arts-3',
    name: 'Woodworking',
    category: 'arts',
    description: 'Handcrafted wooden items and furniture. Custom pieces available.',
    location: {
      x: 80,
      y: 45,
      area: 'east-vendor-area',
      coordinates: [BASE_LAT, BASE_LNG + 0.0008]
    },
    hours: '10:00 AM - 6:00 PM',
    status: 'open',
    featured: false
  },

  // Activities
  {
    id: 'bounce-house-1',
    name: 'Kids Bounce House',
    category: 'activities',
    description: 'Safe and fun bounce house for children ages 3-10.',
    location: {
      x: 25,
      y: 15,
      area: 'west-activities',
      coordinates: [BASE_LAT + 0.0004, BASE_LNG - 0.0007]
    },
    hours: '10:00 AM - 7:00 PM',
    status: 'open',
    featured: false
  },
  {
    id: 'bounce-house-2',
    name: 'Teen Bounce House',
    category: 'activities',
    description: 'Larger bounce house for older kids and teens.',
    location: {
      x: 45,
      y: 15,
      area: 'west-activities',
      coordinates: [BASE_LAT - 0.0004, BASE_LNG - 0.0007]
    },
    hours: '10:00 AM - 7:00 PM',
    status: 'open',
    featured: false
  },
  {
    id: 'skate-area',
    name: 'Skate Zone',
    category: 'activities',
    description: 'Skateboarding area with ramps and obstacles. Helmets required.',
    location: {
      x: 75,
      y: 15,
      area: 'east-activities',
      coordinates: [BASE_LAT - 0.0008, BASE_LNG - 0.0008]
    },
    hours: '10:00 AM - 6:00 PM',
    status: 'open',
    featured: false
  },

  // Tables & Seating
  {
    id: 'tables-1',
    name: 'Community Tables',
    category: 'facilities',
    description: 'Shared seating area for dining and socializing.',
    location: {
      x: 50,
      y: 35,
      area: 'center',
      coordinates: [BASE_LAT + 0.0006, BASE_LNG]
    },
    hours: 'All day',
    status: 'open',
    featured: false
  },
  {
    id: 'tables-2',
    name: 'Picnic Area',
    category: 'facilities',
    description: 'Outdoor picnic tables with shade. Perfect for family meals.',
    location: {
      x: 50,
      y: 65,
      area: 'center',
      coordinates: [BASE_LAT - 0.0006, BASE_LNG]
    },
    hours: 'All day',
    status: 'open',
    featured: false
  },

  // Services
  {
    id: 'bridal-nashville',
    name: 'Bridal Nashville Dresses',
    category: 'services',
    description: 'Bridal boutique with wedding dresses and formal wear.',
    location: {
      x: 85,
      y: 50,
      area: 'east',
      coordinates: [BASE_LAT, BASE_LNG + 0.001]
    },
    hours: '10:00 AM - 6:00 PM',
    specialOffers: ['20% off all dresses during festival'],
    status: 'open',
    featured: true
  }
];

export const getVendorsByCategory = (category: string): Vendor[] => {
  return vendors.filter(vendor => vendor.category === category);
};

export const getVendorsByArea = (area: string): Vendor[] => {
  return vendors.filter(vendor => vendor.location.area === area);
};

export const searchVendors = (query: string): Vendor[] => {
  const lowercaseQuery = query.toLowerCase();
  return vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(lowercaseQuery) ||
    vendor.description.toLowerCase().includes(lowercaseQuery) ||
    vendor.category.toLowerCase().includes(lowercaseQuery)
  );
}; 
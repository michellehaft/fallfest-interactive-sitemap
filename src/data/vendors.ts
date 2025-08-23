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
  image?: string; // URL for vendor thumbnail/avatar image
  detailImage?: string; // URL for larger detail view image (400x200)
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
    image: '/images/vendors/avatars/ofelia-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/ofelia-details.jpg', // Local detail image
    location: {
      x: 20,
      y: 25,
      area: 'west-vendor-area',
      coordinates: generateCoords(0.0002280, 0.0000263)
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
    image: '/images/vendors/avatars/saapsaap-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/saapsaap-details.jpg', // Local detail image
    location: {
      x: 25,
      y: 30,
      area: 'west-vendor-area',
      coordinates: generateCoords(0.0001327, -0.0000703)
    },
    description: 'Saap Saap BBQ in Nashville, TN, is where Southern barbecue meets vibrant Lao flavors, creating an unforgettable culinary experience. This catering service, complete with a trailer smoker, brings expertly smoked and grilled meats to the streets of Nashville, offering a unique twist on traditional BBQ with Lao-inspired dishes.',
    dietaryOptions: ['vegan', 'gluten-free']
  },

  {
    id: 'food-003',
    name: 'Dreamburger',
    type: 'vendor',
    category: 'food' as VendorCategory,
    image: '/images/vendors/avatars/dreamburger-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/saapsaap-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 40,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0002648, -0.0001266)
    },
    description: 'Gourmet burgers made with locally sourced ingredients and creative toppings. From classic American favorites to innovative flavor combinations.',
    contact: {
      website: 'dreamburger.com'
    },
    dietaryOptions: ['vegetarian', 'vegan patties available']
  },

  // === BEVERAGE VENDORS ===
  {
    id: 'beverage-001',
    name: 'East Nashville Beer Works',
    type: 'vendor',
    category: 'beverage' as VendorCategory,
    image: '/images/vendors/avatars/eastnashbeerworks-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/eastnashbeerworkds-details.jpg', // Local detail image
    location: {
      x: 45,
      y: 20,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0004293, -0.0000676)
    },
    description: 'Local craft brewery featuring handcrafted beers with a focus on East Nashville community spirit. Offering a variety of seasonal brews, IPAs, lagers, and specialty craft cocktails.',
    contact: {
      website: 'eastnashvillebeerworks.com'
    }
  },

  {
    id: 'beverage-002',
    name: 'Delger Boba Tea',
    type: 'vendor',
    category: 'beverage' as VendorCategory,
    location: {
      x: 55,
      y: 25,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0002, -0.0001)
    },
    description: 'Fresh and authentic boba tea with a wide variety of flavors and toppings. From classic milk teas to fruit-infused refreshers, enjoy premium bubble tea made with quality ingredients.'
  },

  // === MERCHANT VENDORS ===
  {
    id: 'arts-001',
    name: 'Blair and Landon Matney Art',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0005678, -0.0002473)
    },
    description: 'Art-painting and paper cutouts by local artists Blair and Landon Matney.',
    contact: {
      website: 'landonmatney.com/'
    }
  },

  {
    id: 'merchant-001',
    name: 'My Cluck Hut',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    location: {
      x: 65,
      y: 35,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0004012, -0.0001722)
    },
    description: 'Unique chicken-themed merchandise, home decor, and gifts. From quirky chicken collectibles to rustic farmhouse items, find the perfect addition to your coop or home.',
    contact: {
      website: 'mycluckhut.com'
    }
  },

  {
    id: 'merchant-002',
    name: 'Mollie Weinman-Crocheted Goods',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    location: {
      x: 75,
      y: 40,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0000635, -0.0000407)
    },
    description: 'Handcrafted crocheted items including scarves, hats, blankets, and home decor. Each piece is lovingly made with quality yarn and attention to detail.',
    contact: {
      email: 'mollie@crocheted-goods.com'
    }
  },

  // === ACTIVITIES ===
  {
    id: 'activity-001',
    name: 'Fallfest Bounce House',
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: '/images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/bouncehouse-details.jpg', // Local detail image
    location: {
      x: 30,
      y: 15,
      area: 'west-activities',
      coordinates: generateCoords(0.0005787, 0.0001658)
    },
    description: 'Safe, supervised bounce house for children ages 3-12.',
    ageRequirements: '3-12 years old',
    safetyInfo: 'Adult supervision required',
    capacity: '12 children maximum'
  },

  {
    id: 'activity-002',
    name: 'Main Stage',
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: '/images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/mainstage-details.jpg', // Local detail image
    location: {
      x: 50,
      y: 40,
      area: 'central-stage',
      coordinates: generateCoords(0.0005981, 0.0000263)
    },
    description: 'Main performance stage featuring live music, square dancing,and special presentations throughout the festival.',
    capacity: '500+ audience'
  },

  {
    id: 'activity-003',
    name: 'Pie Contest',
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: '/images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/piecontest-details.jpg', // Local detail image
    location: {
      x: 40,
      y: 55,
      area: 'contest-area',
      coordinates: generateCoords(0.0005029, 0.0000129)
    },
    description: 'Annual pie baking contest featuring homemade pies from local bakers. Judging begins at 1:00pm, after which attendees are welcome to grab a slice of pie from our entries for free! The winner gets a $50 gift card to the Yellow Table Café.',
    ageRequirements: 'All ages welcome'
  },

  {
    id: 'activity-004',
    name: 'Greenwood Honey Co',
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: '/images/vendors/avatars/greenwoodhoneyco-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/greenwoodhoneyco-details.jpg', // Local detail image
    location: {
      x: 25,
      y: 50,
      area: 'demo-area',
      coordinates: generateCoords(0.0004942, -0.0000998)
    },
    description: 'Beekeeping demonstrations and honey tasting. Learn about local honey production and the importance of bees to our ecosystem. We\'ll also have our neighborhood Greenwood Honey Co. pickup truck staged in fall decor for the perfect fall family photo opportunity.',
    contact: {
      website: 'greenwoodhoney.com'
    }
  },

  {
    id: 'activity-005',
    name: 'Arts & Crafts',
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: '/images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/ofelia-details.jpg', // Local detail image
    location: {
      x: 60,
      y: 50,
      area: 'craft-area',
      coordinates: generateCoords(0.0003470, 0.0000665)
    },
    description: 'Hands-on arts and crafts activities for all ages. Create your own festival keepsakes with guided projects and free materials.',
    ageRequirements: 'All ages welcome'
  },

  {
    id: 'activity-006',
    name: "Cecil's Skate Shop",
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: '/images/vendors/avatars/cecils-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/cecils-details.jpg', // Local detail image
    location: {
      x: 70,
      y: 45,
      area: 'demo-area',
      coordinates: generateCoords(-0.0003067, 0.0000639)
    },
    description: 'Skateboard demonstrations, mini ramp setup, and skateboarding lessons for beginners. Local skate shop showcasing gear and skills.',
    ageRequirements: '8+ years old',
    safetyInfo: 'Helmets and safety gear not provided',
    contact: {
      website: 'cecilsskate.com'
    }
  },

  // === SERVICE VENDORS ===
  {
    id: 'services-001',
    name: 'Angelpuff Fairy Hair',
    type: 'vendor',
    category: 'services' as VendorCategory,
    image: '/images/vendors/avatars/angelpuff-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/angelpuff-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 45,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0004661, -0.0001990)
    },
    description: 'Magical fairy hair tinsel and temporary hair coloring services. Add sparkle and color to your festival look with our safe, temporary hair accessories and styling.',
    contact: {
      website: 'angelpufffairyhair.com'
    }
  },

  {
    id: 'services-002',
    name: 'Face To Face Creations',
    type: 'vendor',
    category: 'services' as VendorCategory,
    image: '/images/vendors/avatars/facetoface-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/facetoface-details.jpg', // Local detail image
    location: {
      x: 55,
      y: 45,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0005635, -0.0001212)
    },
    description: 'Professional face painting and temporary tattoos for all ages. From simple designs to elaborate artwork, we bring your imagination to life with safe, high-quality paints.',
    contact: {
      website: 'facetofacecreations.com'
    }
  },

  // === NGO/CIVIC VENDORS ===
  {
    id: 'ngo-001',
    name: 'Root Nashville',
    type: 'vendor',
    category: 'NGO/Civic' as VendorCategory,
    location: {
      x: 30,
      y: 60,
      area: 'south-vendor-area',
      coordinates: generateCoords(0.0000180, 0.0001121)
    },
    description: 'Community organization focused on sustainable urban development and environmental stewardship in Nashville. Learn about local environmental initiatives and how to get involved.',
    contact: {
      website: 'rootnashville.org'
    }
  },

  {
    id: 'ngo-002',
    name: 'Eastwood Neighbors Association',
    type: 'vendor',
    category: 'NGO/Civic' as VendorCategory,
    image: '/images/vendors/avatars/eastwoodneighbors-avatar.jpg', // Local avatar image
    detailImage: '/images/vendors/details/eastwoodneighbors-details.jpg', // Local detail image
    location: {
      x: 70,
      y: 60,
      area: 'south-vendor-area',
      coordinates: generateCoords(0.0006306, -0.0002768)
    },
    description: 'Local neighborhood association working to improve community life in Eastwood Village. Discover upcoming community events, volunteer opportunities, and ways to connect with your neighbors.',
    contact: {
      email: 'info@eastwoodneighbors.org',
      website: 'eastwoodneighbors.org'
    }
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
      coordinates: generateCoords(0.0006609, -0.0000729)
    },
    description: 'Clean, well-maintained restroom with accessibility features.',
    accessibility: 'ADA compliant',
    features: [
      'Hand washing station',
      'Wheelchair accessible',
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
  merchant: {
    color: '#8B5CF6', // Purple
    icon: '🛍️',
    label: 'Merchants'
  },
  'NGO/Civic': {
    color: '#EC4899', // Pink
    icon: '🤝',
    label: 'NGO/Civic Organizations'
  },
  activities: {
    color: '#10B981', // Emerald
    icon: '🎪',
    label: 'Activities & Entertainment'
  },
  services: {
    color: '#3B82F6', // Blue
    icon: '👨‍🎤',
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
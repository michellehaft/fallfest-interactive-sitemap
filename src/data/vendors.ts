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
    image: 'images/vendors/avatars/ofelia-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/ofelia-details.jpg', // Local detail image
    location: {
      x: 20,
      y: 25,
      area: 'west-vendor-area',
      coordinates: generateCoords(0.0000851, -0.0000461)
    },
    description: 'Welcome to Ofelia, a vibrant homage to the rich culinary traditions of Mexico City, nestled in Nashville.',
    contact: {
      website: 'ofelianashville.com'
    },
    dietaryOptions: ['vegan', 'vegatarian','gluten-free']
  },
  
  {
    id: 'food-002',
    name: 'Mijo Gordito',
    type: 'vendor',
    category: 'food' as VendorCategory,
    image: 'images/vendors/avatars/mijogordito-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/mijogordito-details.jpg', // Local detail image
    location: {
      x: 25,
      y: 30,
      area: 'west-vendor-area',
      coordinates: generateCoords(0.0004942, -0.0002205)
    },
    description: 'Mom + pop food shop dedicated to making food they love—blending Thai/Lao and Mexican flavors. Their rotating menu that includes everything from Golden curry and katsu to chilaquiles to pad kgra pao to griddled cheese crust burritos.',
    contact: {
      website: 'mijo-gordito.square.site'
    },
    dietaryOptions: ['vegan']
  },

  {
    id: 'food-003',
    name: 'Ivory Cotton Bar',
    type: 'vendor',
    category: 'desserts' as VendorCategory,
    image: 'images/vendors/avatars/ivorycottoncandy-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/ivorycottoncandy-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 40,
      area: 'central-vendor-area',
      coordinates: generateCoords(-0.0001985, 0.0000639)
    },
    description: 'Handcrafted cotton candy flavors, gourmet popcorn, cotton candy topped drinks, and other sweet treats.',
    contact: {
      website: 'ivorycottonbar.com'
    },
  },
  {
    id: 'food-004',
    name: 'The Yellow Table Café',
    type: 'vendor',
    category: 'food' as VendorCategory,
    image: 'images/vendors/avatars/yellowtable-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/yellowtable-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 40,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0002107, 0.0003562)
    },
    description: 'Cozy café & crêperie in the @eastwood.village.shops in East Nashville. Open Tues-Sat, 8 AM to 3 PM.',
    contact: {
      website: 'theyellowtablecafe.com'
    },
    dietaryOptions: ['vegetarian']
  },
  {
    id: 'food-005',
    name: 'Butterlamp',
    type: 'vendor',
    category: 'food' as VendorCategory,
    image: 'images/vendors/avatars/butterlamp-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/butterlamp-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 40,
      area: 'central-vendor-area',
      coordinates: generateCoords(-0.0000145, 0.0006808)
    },
    description: 'A wine bar and bread house located in East Nashville.',
    contact: {
      website: 'butterlampnashville.com'
    },
    dietaryOptions: ['vegetarian']
  },
  {
    id: 'food-006',
    name: 'FAB Pizza',
    type: 'vendor',
    category: 'food' as VendorCategory,
    image: 'images/vendors/avatars/fabpizza-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/fabpizza-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 40,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0001132, 0.0000692)
    },
    description: 'Chef driven, wood-fired pizza, we can put almost ANYTHING on a pizza!',
    contact: {
      website: 'fab-pizza.square.site/menu'
    },
    dietaryOptions: ['vegetarian']
  },

  {
    id: 'food-007',
    name: 'Ice & Bones',
    type: 'vendor',
    category: 'desserts' as VendorCategory,
    image: 'images/vendors/avatars/iceandbones-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/iceandbones-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 40,
      area: 'central-vendor-area',
      coordinates: generateCoords(-0.0000145, 0.0001229)
    },
    description: 'Crafting gourmet ice cream bars in Nashville, TN',
    contact: {
      website: 'iceandbones.com'
    },
  },

  {
    id: 'food-008',
    name: 'Sweetest Little Bakeshop',
    type: 'vendor',
    category: 'desserts' as VendorCategory,
    image: 'images/vendors/avatars/sweetestbakeshop-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/sweetestbakeshop-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 40,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0004358, -0.0001936)
    },
    description: 'Desserts and baked goods from local baker Victoria Bronfman.',
    contact: {
      website: 'victoriabronfman.com'
    },
  },

  // === BEVERAGE VENDORS ===
  {
    id: 'beverage-001',
    name: 'East Nashville Beer Works',
    type: 'vendor',
    category: 'beverage' as VendorCategory,
    image: 'images/vendors/avatars/eastnashbeerworks-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/eastnashbeerworkds-details.jpg', // Local detail image
    location: {
      x: 45,
      y: 20,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0004228, -0.0000622)
    },
    description: 'Local craft brewery featuring handcrafted beers with a focus on East Nashville community spirit. Offering a variety of seasonal brews, IPAs, lagers, and specialty craft cocktails.',
    contact: {
      website: 'eastnashvillebeerworks.com'
    },
    ageRequirements: '21 and over'
  },

  {
    id: 'beverage-002',
    name: 'Bobananza Tea',
    type: 'vendor',
    category: 'beverage' as VendorCategory,
    image: 'images/vendors/avatars/bobananza-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/bobananza-details.jpg', // Local detail image
    location: {
      x: 55,
      y: 25,
      area: 'central-vendor-area',
      coordinates: generateCoords(-0.0001422, 0.0000424)
    },
    description: 'Fresh and authentic boba tea with a wide variety of flavors and toppings. From classic milk teas to fruit-infused refreshers, enjoy premium bubble tea made with quality ingredients.'
  },
  {
    id: 'beverage-003',
    name: 'Walker Brothers Kombucha',
    type: 'vendor',
    category: 'beverage' as VendorCategory,
    image: 'images/vendors/avatars/walkerbros-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/walkerbros-details.jpg', // Local detail image
    location: {
      x: 55,
      y: 25,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0003665, -0.0000381)
    },
    description: 'Great-tasting craft kombucha. No shortcuts, nothing artificial.',
    contact: {
      website: 'drinkwalkerbrothers.com'
    },
  },
  {
    id: 'beverage-004',
    name: 'Pucker Up Lemonade',
    type: 'vendor',
    category: 'beverage' as VendorCategory,
    image: 'images/vendors/avatars/puckerup-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/puckerup-details.jpg', // Local detail image
    location: {
      x: 55,
      y: 25,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0000483, 0.0000960)
    },
    description: 'East Nashville lemonade stand run by 11 year old Ellie. Serving fresh squeezed drinks on the weekends.',
    contact: {
      website: 'instagram.com/puckerup_eastnash/'
    },
  },
  {
    id: 'beverage-005',
    name: 'Drink Nujo',
    type: 'vendor',
    category: 'beverage' as VendorCategory,
    image: 'images/vendors/avatars/nujo-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/nujo-details.jpg', // Local detail image
    location: {
      x: 55,
      y: 25,
      area: 'central-vendor-area',
      coordinates: generateCoords(0.0003059, -0.0000139)
    },
    description: 'NUJO is a beveragepowered by 6 organic superfoods that combine for a better-than-coffee experience.',
    contact: {
      website: 'drinknujo.com'
    },
  },

  // === MERCHANT VENDORS ===
  {
    id: 'arts-001',
    name: 'Blair and Landon Matney Art',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/landonmatney-avatar.png', // Local avatar image
    detailImage: 'images/vendors/details/landonmatney-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(-0.0000859, 0.0000209)
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
    image: 'images/vendors/avatars/mycluckhut-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/mycluckhut-details.png', // Local detail image
    location: {
      x: 65,
      y: 35,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0005419, -0.0001132)
    },
    description: 'Natural, plant-based bath products that don\’t suck. Our skincare is eco-friendly, plastic-free, and made for real humans with real skin. No palm oil. No weird chemicals. Just ethical, zero-waste products.',
    contact: {
      website: 'mycluckhut.com'
    }
  },

  {
    id: 'merchant-002',
    name: 'Souvenir de Marie',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/souvenirdemarie-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/souvenirdemarie-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 40,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0005549, -0.0002500)
    },
    description: 'Subscription box for women ready to rediscover themselves. A monthly box of encouragement, creativity, and growth — designed for women feeling overwhelmed, anxious, or stuck in life.',
    contact: {
      website: 'souvenirdemarie.com'
    }
  },

  {
    id: 'merchant-003',
    name: 'The Video Store',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/videostore-avatar.png', // Local avatar image
    detailImage: 'images/vendors/details/videostore-details.png', // Local detail image
    location: {
      x: 75,
      y: 40,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0003081, 0.0001872)
    },
    description: 'The Video Store is a local video rental store in East Nashville. We have a wide selection of movies and TV shows to rent.',
    contact: {
      website: 'thevideostore.com'
    }
  },

  {
    id: 'merchant-004',
    name: 'Desert + Vine',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/desertvine-avatar.png', // Local avatar image
    detailImage: 'images/vendors/details/desertvine-details.png', // Local detail image
    location: {
      x: 75,
      y: 40,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0004163, 0.0001363)
    },
    description: 'Your new favorite plant shop! Houseplants, refillable supplies, animal friends + vintage!',
    contact: {
      website: 'desertandvinebotanical.com'
    }
  },

  {
    id: 'merchant-005',
    name: 'Kinda Collected',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/kindacollected-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/kindacollected-details.png', // Local detail image
    location: {
      x: 75,
      y: 40,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0003622, 0.0001604)
    },
    description: 'A curated market shop and home good store in east nashville.',
    contact: {
      website: 'kindacollected.com'
    }
  },

  {
    id: 'merchant-006',
    name: 'Novelette Booksellers',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/novelette-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/novelette-details.png', // Local detail image
    location: {
      x: 75,
      y: 40,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0002713, 0.0003214)
    },
    description: 'We are a fun, vibey, safe space for book lovers of all ages. We boast a highly curated selection of both fiction and non-fiction books by diverse authors.',
    contact: {
      website: 'novelettebooksellers.com'
    }
  },

  {
    id: 'merchant-007',
    name: 'Virginia\'s Creations',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/virginiascreations-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/virginiascreations-details.png', // Local detail image
    location: {
      x: 75,
      y: 40,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0004834, -0.0000890)
    },
    description: 'Handmade jewelry from local artist Virginia',
  },

  {
    id: 'merchant-008',
    name: 'The Soup Dealer',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/soupdealer-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/soupdealer-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0006717, -0.0003009)
    },
    description: 'East Nashville\'s premier soup dealer',
    contact: {
      website: 'thesoupdealer.com'
    }
  },

  {
    id: 'merchant-009',
    name: 'Deer Bird Vintage',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/deerbird-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/deerbird-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0001457, -0.0000729)
    },
    description: 'We are a curated pop-up vintage shop specializing in 1960\'s & 1970\'s vintage as well as vintage western wear.',
  },

  {
    id: 'merchant-010',
    name: 'Lindy Lou Gifts',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/lindylou-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/lindylou-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0002063, -0.0000998)
    },
    description: 'Whimsical gifts & housewares',
  },

  {
    id: 'merchant-011',
    name: 'Handmade by Joyce',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/handmadebyjoyce-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/handmadebyjoyce-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0003860, -0.0001775)
    },
    description: 'Handmade knitted items like hats, scarves, washcloths and more by Joyce.',
  },
  {
    id: 'merchant-012',
    name: 'Eden\'s Jewelry',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/edensjewelry-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/edensjewelry-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(-0.0000253, -0.0000032)
    },
    description: 'Jewelry, beads, bracelets and necklaces by local Greenwood Ave. residents',
  },
  {
    id: 'merchant-013',
    name: 'Grace Wagenman Historic Renovations & Real Estate',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/gracewagenman-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/gracewagenman-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0003254, -0.0001534)
    },
    description: 'Grace does historic renovations, real-estate and design for residential clients',
    contact: {
      website: 'gracewagenman.com'
    }
  },
  {
    id: 'merchant-014',
    name: 'Refinery Fragrances',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/refinery-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/refinery-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0001457, 0.0003857)
    },
    description: 'Nashville\'s first luxury fragrance boutique. We are passionate about the art of scent and dedicated to providing a luxurious experience for fragrance enthusiasts.',
    contact: {
      website: 'refineryfragrances.com'
    }
  },
  {
    id: 'merchant-015',
    name: 'Futurustics',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/futurustics-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/futurustics-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0001804, 0.0000424)
    },
    description: 'Futurustics is a vintage store and a fun experience for the whole family. We sell everything from toys, collector\'s items, memorabilia, advertisement signs, crates, clocks and lamps, vinyl, tobacco tins and much more.',
    contact: {
      website: 'instagram.com/futurustics/'
    }
  },
  {
    id: 'merchant-016',
    name: 'Greenwood Kids Businesses',
    type: 'vendor',
    category: 'merchant' as VendorCategory,
    image: 'images/vendors/avatars/greenwoodkids-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/greenwoodkids-details.jpg', // Local detail image
    location: {
      x: 75,
      y: 25,
      area: 'east-vendor-area',
      coordinates: generateCoords(0.0006155, -0.0002768)
    },
    description: 'Local kids come together to sell their handmade goods.',
  },

  // === ACTIVITIES ===
  {
    id: 'activity-001',
    name: 'Fallfest Bounce House',
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: 'images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/bouncehouse-details.jpg', // Local detail image
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
    image: 'images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/mainstage-details.jpg', // Local detail image
    location: {
      x: 50,
      y: 40,
      area: 'central-stage',
      coordinates: generateCoords(0.0005743, -0.0000166)
    },
    description: 'Main performance stage featuring live music, square dancing,and special presentations throughout the festival.',
    capacity: '500+ audience'
  },

  {
    id: 'activity-003',
    name: 'Pie Contest',
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: 'images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/piecontest-details.jpg', // Local detail image
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
    image: 'images/vendors/avatars/greenwoodhoneyco-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/greenwoodhoneyco-details.jpg', // Local detail image
    location: {
      x: 25,
      y: 50,
      area: 'demo-area',
      coordinates: generateCoords(0.0002453, 0.0000129)
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
    image: 'images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/artsandcrafts-details.jpg', // Local detail image
    location: {
      x: 60,
      y: 50,
      area: 'craft-area',
      coordinates: generateCoords(-0.0000599, 0.0002409)
    },
    description: 'Hands-on arts and crafts activities for all ages. Decorate your own fall crown or paint a tiny pumpkin with guides and free materials.',
    ageRequirements: 'All ages welcome'
  },

  {
    id: 'activity-006',
    name: "Cecil's Skate Shop",
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: 'images/vendors/avatars/cecils-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/cecils-details.jpg', // Local detail image
    location: {
      x: 70,
      y: 45,
      area: 'demo-area',
      coordinates: generateCoords(-0.0003240, 0.0001658)
    },
    description: 'Skateboard demonstrations, mini ramp setup, and skateboarding lessons for beginners. Local skate shop showcasing gear and skills.',
    ageRequirements: '8+ years old',
    safetyInfo: 'Helmets and safety gear not provided',
    contact: {
      website: 'cecilsskate.com'
    }
  },

  {
    id: 'activity-007',
    name: "Beer Garden",
    type: 'activity',
    category: 'activities' as VendorCategory,
    image: 'images/vendors/avatars/fallfest-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/beergarden-details.jpg', // Local detail image
    location: {
      x: 70,
      y: 45,
      area: 'demo-area',
      coordinates: generateCoords(0.0003990, 0.0000397)
    },
    description: 'Enjoy your craft beer or non-alcoholic beverage in our covered beer garden',
    ageRequirements: '21+ years old',
    safetyInfo: 'No drinking and driving',
  },

  // === SERVICE VENDORS ===
  {
    id: 'services-001',
    name: 'Angelpuff Fairy Hair',
    type: 'vendor',
    category: 'services' as VendorCategory,
    image: 'images/vendors/avatars/angelpuff-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/angelpuff-details.jpg', // Local detail image
    location: {
      x: 35,
      y: 45,
      area: 'central-vendor-area',
      coordinates: generateCoords(-0.0000773, 0.0001524)
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
    image: 'images/vendors/avatars/facetoface-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/facetoface-details.jpg', // Local detail image
    location: {
      x: 55,
      y: 45,
      area: 'central-vendor-area',
      coordinates: generateCoords(-0.0001379, 0.0001792)
    },
    description: 'Professional face painting and temporary tattoos for all ages. From simple designs to elaborate artwork, we bring your imagination to life with safe, high-quality paints.',
    contact: {
      website: 'facetofacecreations.com'
    }
  },

  // === NGO/CIVIC VENDORS ===
  {
    id: 'ngo-001',
    name: 'Linden Waldorf School Nashville',
    type: 'vendor',
    category: 'NGO/Civic' as VendorCategory,
    image: 'images/vendors/avatars/lindenwaldorf-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/lindenwaldorf-details.jpg', // Local detail image
    location: {
      x: 30,
      y: 60,
      area: 'south-vendor-area',
      coordinates: generateCoords(0.0006003, -0.0001373)
    },
    description: 'Linden Waldorf School is a co-ed independent school in Nashville, Tennessee, where imagination is in the making for preschool–grade 8.',
    contact: {
      website: 'lindenwaldorf.org'
    }
  },

  {
    id: 'ngo-002',
    name: 'Eastwood Neighbors Association',
    type: 'vendor',
    category: 'NGO/Civic' as VendorCategory,
    image: 'images/vendors/avatars/eastwoodneighbors-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/eastwoodneighbors-details.jpg', // Local detail image
    location: {
      x: 70,
      y: 60,
      area: 'south-vendor-area',
      coordinates: generateCoords(0.0002669, -0.0001266)
    },
    description: 'Eastwood Neighbors, Inc. is a non-profit organization established in 1992 by community members. Discover upcoming community events, volunteer opportunities, and ways to connect with your neighbors.',
    contact: {
      email: 'info@eastwoodneighbors.org',
      website: 'eastwoodneighbors.org'
    }
  },
  {
    id: 'ngo-003',
    name: 'Walden\'s Puddle',
    type: 'vendor',
    category: 'NGO/Civic' as VendorCategory,
    image: 'images/vendors/avatars/waldenspuddle-avatar.jpg', // Local avatar image
    detailImage: 'images/vendors/details/waldenspuddle-details.jpg', // Local detail image
    location: {
      x: 70,
      y: 60,
      area: 'south-vendor-area',
      coordinates: generateCoords(0.0000310, -0.0000247)
    },
    description: 'Walden\’s Puddle provides care and treatment to sick, injured and orphaned native Tennessee wildlife. We are a professionally-staffed wildlife rehabilitation facility in Middle Tennessee.',
    contact: {
      website: 'waldenspuddle.org'
    }
  },

  // === AMENITIES ===
];

// Category configurations for map display
export const categoryConfig = {
  food: {
    color: '#F59E0B', // Amber
    icon: '🍔',
    label: 'Food'
  },
  beverage: {
    color: '#2C4BE0', // Green
    icon: '🧋',
    label: 'Beverage'
  },
  desserts: {
    color: '#FF69B4', // Hot Pink
    icon: '🍰',
    label: 'Desserts'
  },
  merchant: {
    color: '#8B5CF6', // Purple
    icon: '🛍️',
    label: 'Merchants'
  },
  'NGO/Civic': {
    color: '#EC4899', // Pink
    icon: '🤝',
    label: 'Community Org'
  },
  activities: {
    color: '#1EB86B', // Emerald
    icon: '🎪',
    label: 'Activities'
  },
  services: {
    color: '#1A1C1E', // Black
    icon: '👨‍🎤',
    label: 'Services'
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

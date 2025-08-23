// Infrastructure items for the festival map (non-vendor markers)
export interface InfrastructureItem {
  id: string;
  name: string;
  type: 'barricade' | 'detour' | 'seating' | 'trash' | 'security' | 'parking' | 'restrooms' | 'firstAid';
  location: {
    coordinates: [number, number];
  };
  description?: string;
}

// Helper function to generate coordinates relative to Eastwood center
const EASTWOOD_CENTER: [number, number] = [36.1888487, -86.7383314];
const generateCoords = (latOffset: number, lngOffset: number): [number, number] => [
  EASTWOOD_CENTER[0] + latOffset,
  EASTWOOD_CENTER[1] + lngOffset
];

export const infrastructureItems: InfrastructureItem[] = [
  // Road Closure Barricades (6 items)
  {
    id: 'barricade-001',
    name: 'Barricade',
    type: 'barricade',
    location: { coordinates: generateCoords(-0.0003457, 0.0001953) },
    description: 'Road closure for festival area'
  },
  {
    id: 'barricade-002',
    name: 'Barricade',
    type: 'barricade',
    location: { coordinates: generateCoords(0.0007410, -0.0002714) },
    description: 'Road closure for festival area'
  },
  {
    id: 'barricade-003',
    name: 'Barricade',
    type: 'barricade',
    location: { coordinates: generateCoords(-0.0002288, -0.0011083) },
    description: 'Road closure for festival area'
  },
  {
    id: 'barricade-004',
    name: 'Barricade',
    type: 'barricade',
    location: { coordinates: generateCoords(0.0002496, -0.0007220) },
    description: 'Road closure for festival area'
  },
  {
    id: 'barricade-005',
    name: 'Barricade',
    type: 'barricade',
    location: { coordinates: generateCoords(0.0007259, -0.0000568) },
    description: 'Road closure for festival area'
  },
  {
    id: 'barricade-006',
    name: 'Barricade',
    type: 'barricade',
    location: { coordinates: generateCoords(-0.0009843, 0.0004769) },
    description: 'Road closure for festival area'
  },

  // Detour Signs (6 items)
  {
    id: 'detour-001',
    name: 'Matthews Place Detour',
    type: 'detour',
    location: { coordinates: generateCoords(-0.0011077, 0.0017805) },
    description: 'Local traffic redirect'
  },
  {
    id: 'detour-002',
    name: 'Greenwood Detour',
    type: 'detour',
    location: { coordinates: generateCoords(0.0004986, 0.0020514) },
    description: 'Local traffic redirect'
  },
  {
    id: 'detour-003',
    name: 'Hobson Chapel Detour',
    type: 'detour',
    location: { coordinates: generateCoords(-0.0003955, 0.0002328) },
    description: 'Local traffic redirect'
  },
  {
    id: 'detour-005',
    name: 'Greenwood Alley Detour',
    type: 'detour',
    location: { coordinates: generateCoords(0.0002972, -0.0007676) },
    description: 'Local traffic redirect'
  },
  {
    id: 'detour-006',
    name: 'Sharpe Detour',
    type: 'detour',
    location: { coordinates: generateCoords(-0.0010427, 0.0004957) },
    description: 'Local traffic redirect'
  },
  {
    id: 'detour-007',
    name: 'Roberts Detour',
    type: 'detour',
    location: { coordinates: generateCoords(-0.0002180, -0.0013202) },
    description: 'Local traffic redirect'
  },

  // Seating Areas (4 items)
  {
    id: 'seating-001',
    name: 'Main Stage Seating',
    type: 'seating',
    location: { coordinates: generateCoords(0.0005267, 0.0001068) },
    description: 'Seating area near main stage'
  },
  {
    id: 'seating-003',
    name: 'Lower Plaza Seating',
    type: 'seating',
    location: { coordinates: generateCoords(0.0001609, 0.0002784) },
    description: 'Family seating area'
  },
  {
    id: 'seating-004',
    name: 'Seating Area',
    type: 'seating',
    location: { coordinates: generateCoords(0.0000656, 0.0001792) },
    description: 'Vendor area rest spot'
  },
  {
    id: 'seating-006',
    name: 'Seating Area',
    type: 'seating',
    location: { coordinates: generateCoords(0.0003037, 0.0000800) },
    description: 'Central gathering seating'
  },

  // Trash Cans (4 items)
  {
    id: 'trash-001',
    name: 'Main Stage Trash',
    type: 'trash',
    location: { coordinates: generateCoords(0.0004358, 0.0000639) },
    description: 'Trash disposal'
  },
  {
    id: 'trash-002',
    name: 'Seating Area Trash',
    type: 'trash',
    location: { coordinates: generateCoords(0.0001565, 0.0000531) },
    description: 'Trash disposal'
  },
  {
    id: 'trash-003',
    name: 'Main Entrance Trash',
    type: 'trash',
    location: { coordinates: generateCoords(0.0006891, 0.0000129) },
    description: 'Trash disposal'
  },
  {
    id: 'trash-004',
    name: 'Main Exit Trash',
    type: 'trash',
    location: { coordinates: generateCoords(-0.0002807, 0.0002409) },
    description: 'Trash disposal'
  },

  // Security Posts (3 items)
  {
    id: 'security-001',
    name: 'Chapel North Security',
    type: 'security',
    location: { coordinates: generateCoords(0.0007215, -0.0001829) },
    description: 'Chapel North Security'
  },
  {
    id: 'security-002',
    name: 'Roberts Security',
    type: 'security',
    location: { coordinates: generateCoords(-0.0002201, -0.0012182) },
    description: 'Roberts Security'
  },
  {
    id: 'security-003',
    name: 'Chapel South Security',
    type: 'security',
    location: { coordinates: generateCoords(-0.0009085, 0.0004447) },
    description: 'Chapel South Security'
  },

  // Parking (1 item)
  {
    id: 'parking-001',
    name: 'Cora Howe Elementary Parking',
    type: 'parking',
    location: { coordinates: generateCoords(0.0003124, 0.0035776) }, // Placeholder coordinates
    description: 'Parking at Cora Howe Elementary School'
  },
  {
    id: 'parking-002',
    name: 'Greenwood Parking',
    type: 'parking',
    location: { coordinates: generateCoords(0.0007194, 0.0002623) }, // Placeholder coordinates
    description: 'Parking on Greenwood Ave.'
  },
  {
    id: 'parking-003',
    name: 'Eastwood Village Parking',
    type: 'parking',
    location: { coordinates: generateCoords(-0.0001400, 0.0011662) }, // Placeholder coordinates
    description: 'Parking on Greenwood Ave.'
  },

  // Restrooms (1 item)
  {
    id: 'restrooms-001',
    name: 'Main Restroom Facility',
    type: 'restrooms',
    location: { coordinates: generateCoords(0.0006609, -0.0000729) },
    description: 'Clean, well-maintained restroom with accessibility features. ADA compliant with hand washing station and wheelchair accessible.'
  },

  // First Aid (1 item)
  {
    id: 'firstaid-001',
    name: 'First Aid Station',
    type: 'firstAid',
    location: { coordinates: generateCoords(0.0006934, -0.0003036) }, // Placeholder coordinates - can be moved in dev mode
    description: 'Emergency medical assistance and basic first aid services available.'
  }
];

// Infrastructure configuration for styling and display
export const infrastructureConfig = {
  barricade: {
    color: '#FF6B35', // Orange
    icon: '🚧',
    label: 'Road Closures',
    shape: 'rectangle' // Special handling for barricade shape
  },
  detour: {
    color: '#FF8C00', // Dark orange
    icon: '➡️',
    label: 'Detour Signs',
    shape: 'diamond'
  },
  seating: {
    color: '#C58C07', // Light brown
    icon: '🪑',
    label: 'Seating Areas',
    shape: 'circle'
  },
  trash: {
    color: '#DADCDE', // Gray
    icon: '🗑️',
    label: 'Trash Cans',
    shape: 'circle'
  },
  security: {
    color: '#00208D', // Dark blue
    icon: '👮',
    label: 'Security',
    shape: 'circle'
  },
  parking: {
    color: '#007AFF', // Purple
    icon: '🅿️',
    label: 'Parking',
    shape: 'circle'
  },
  restrooms: {
    color: '#6B7280', // Gray
    icon: '🚻',
    label: 'Restrooms',
    shape: 'circle'
  },
  firstAid: {
    color: '#EF4444', // Red
    icon: '🏥',
    label: 'First Aid',
    shape: 'circle'
  }
};
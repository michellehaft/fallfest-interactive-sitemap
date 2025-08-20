import { MapConfig } from '../types';

export const mapConfig: MapConfig = {
  center: [36.1627, -86.7816], // Nashville area
  zoom: 18,
  bounds: [
    [36.1617, -86.7826], // Southwest
    [36.1637, -86.7806]  // Northeast
  ],
  areas: {
    'north-entrance': {
      name: 'North Entrance',
      bounds: [
        [36.1635, -86.7820],
        [36.1639, -86.7812]
      ],
      color: '#3B82F6'
    },
    'south-entrance': {
      name: 'South Entrance',
      bounds: [
        [36.1615, -86.7820],
        [36.1619, -86.7812]
      ],
      color: '#3B82F6'
    },
    'center-west': {
      name: 'Center West',
      bounds: [
        [36.1625, -86.7820],
        [36.1630, -86.7812]
      ],
      color: '#10B981'
    },
    'center-east': {
      name: 'Center East',
      bounds: [
        [36.1625, -86.7812],
        [36.1630, -86.7804]
      ],
      color: '#8B5CF6'
    },
    'center': {
      name: 'Center',
      bounds: [
        [36.1625, -86.7816],
        [36.1630, -86.7816]
      ],
      color: '#F59E0B'
    },
    'south-west': {
      name: 'South West',
      bounds: [
        [36.1615, -86.7820],
        [36.1620, -86.7812]
      ],
      color: '#EF4444'
    },
    'east': {
      name: 'East Area',
      bounds: [
        [36.1625, -86.7804],
        [36.1630, -86.7796]
      ],
      color: '#EC4899'
    }
  }
};

export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    food: '#F97316',
    arts: '#8B5CF6',
    activities: '#10B981',
    services: '#3B82F6',
    entertainment: '#EC4899',
    security: '#EF4444',
    facilities: '#6B7280'
  };
  return colors[category] || '#6B7280';
};

export const getCategoryIcon = (category: string): string => {
  const icons: { [key: string]: string } = {
    food: '🍔',
    arts: '🎨',
    activities: '🎯',
    services: '🛍️',
    entertainment: '🎭',
    security: '🛡️',
    facilities: '🏢'
  };
  return icons[category] || '📍';
}; 
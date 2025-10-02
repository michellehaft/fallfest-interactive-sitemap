// VendorManagerExample.ts - Examples showing how to use the VendorManager class

import L from 'leaflet';
import VendorManager, { VendorFilter } from '../utils/VendorManager';
import { VendorData } from '../data/vendors';
import { VendorCategory } from '../types';

// Example: Basic VendorManager setup
export function setupBasicVendorManager(map: L.Map, vendors: VendorData[]): VendorManager {
  const vendorManager = new VendorManager(map, vendors, {
    onVendorClick: (vendor) => {
      console.log('Vendor clicked:', vendor.name);
      // Handle vendor click - open details modal, etc.
    },
    popupOptions: {
      maxWidth: 350,
      className: 'custom-vendor-popup'
    }
  });

  return vendorManager;
}

// Example: Adding a new vendor dynamically
export function addNewVendor(vendorManager: VendorManager): void {
  const newVendor: VendorData = {
    id: 'new-vendor-001',
    name: 'Amazing Tacos',
    type: 'vendor',
    category: 'food' as VendorCategory,
    location: {
      x: 30,
      y: 40,
      area: 'west-vendor-area',
      coordinates: [36.1890, -86.7385]
    },
    description: 'Delicious authentic Mexican tacos made fresh to order.',
    hours: '11:00 AM - 8:00 PM',
    contact: {
      phone: '(615) 555-TACO',
      website: 'amazingtacos.com'
    },
    specialOffers: ['Happy Hour 3-5 PM: $1 tacos'],
    status: 'open',
    featured: true
  };

  vendorManager.addVendor(newVendor);
  console.log('New vendor added:', newVendor.name);
}

// Example: Filtering vendors by type
export function filterByVendorType(vendorManager: VendorManager): void {
  // Show only food vendors
  const foodFilter: VendorFilter = {
    types: ['vendor'],
    categories: ['food']
  };
  
  vendorManager.applyFilter(foodFilter);
  console.log('Filtered to show only food vendors');
}

// Example: Filtering by multiple criteria
export function complexFiltering(vendorManager: VendorManager): void {
  // Show only open, featured vendors with search term
  const complexFilter: VendorFilter = {
    status: ['open'],
    featured: true,
    searchQuery: 'taco'
  };
  
  vendorManager.applyFilter(complexFilter);
  console.log('Applied complex filter');
}

// Example: Filtering by map bounds (show vendors in visible area)
export function filterByMapBounds(vendorManager: VendorManager, map: L.Map): void {
  const bounds = map.getBounds();
  
  const boundsFilter: VendorFilter = {
    bounds: bounds
  };
  
  vendorManager.applyFilter(boundsFilter);
  console.log('Filtered to show vendors in current map view');
}

// Example: Updating vendor information
export function updateVendorHours(vendorManager: VendorManager, vendorId: string): void {
  const success = vendorManager.updateVendor(vendorId, {
    hours: '10:00 AM - 9:00 PM', // Extended hours
    specialOffers: ['Late night special: 25% off after 8 PM']
  });
  
  if (success) {
    console.log('Vendor hours updated successfully');
  }
}

// Example: Getting vendor statistics
export function showVendorStats(vendorManager: VendorManager): void {
  const stats = vendorManager.getStats();
  
  console.log('Vendor Statistics:');
  console.log(`Total vendors: ${stats.total}`);
  console.log(`Currently visible: ${stats.visible}`);
  console.log('By type:', stats.byType);
  console.log('By category:', stats.byCategory);
}

// Example: Finding and focusing on a specific vendor
export function findAndFocusVendor(vendorManager: VendorManager, vendorName: string): void {
  const allVendors = vendorManager.getAllVendors();
  const vendor = allVendors.find(v => v.name.toLowerCase().includes(vendorName.toLowerCase()));
  
  if (vendor) {
    vendorManager.focusOnVendor(vendor.id, 18); // Zoom level 18
    console.log(`Focused on vendor: ${vendor.name}`);
  } else {
    console.log(`Vendor not found: ${vendorName}`);
  }
}

// Example: Getting vendors by category
export function getVendorsByCategory(vendorManager: VendorManager, category: VendorCategory): void {
  const categoryVendors = vendorManager.getVendorsByCategory(category);
  
  console.log(`Found ${categoryVendors.length} vendors in category: ${category}`);
  categoryVendors.forEach(vendor => {
    console.log(`- ${vendor.name}: ${vendor.status}`);
  });
}

// Example: Batch operations
export function performBatchOperations(vendorManager: VendorManager): void {
  console.log('Performing batch operations...');
  
  // 1. Get all food vendors
  const foodVendors = vendorManager.getVendorsByType('vendor')
    .filter(v => v.category === 'food');
  
  // 2. Update all food vendors to have extended hours
  foodVendors.forEach(vendor => {
    vendorManager.updateVendor(vendor.id, {
      hours: '10:00 AM - 10:00 PM'
    });
  });
  
  // 3. Show statistics
  showVendorStats(vendorManager);
  
  console.log('Batch operations completed');
}

// Example: Advanced filtering with custom logic
export function advancedFiltering(vendorManager: VendorManager): void {
  // Get all vendors and apply custom filtering logic
  const allVendors = vendorManager.getAllVendors();
  
  // Custom filter: featured food vendors
  const customFilteredVendors = allVendors.filter(vendor => 
    vendor.featured && 
    vendor.category === 'food'
  );
  
  console.log(`Found ${customFilteredVendors.length} featured food vendors`);
  
  // Apply filter to show only these vendors
  if (customFilteredVendors.length > 0) {
    vendorManager.applyFilter({
      searchQuery: customFilteredVendors[0].name // Show first vendor as example
    });
  }
}

// Example: Exporting and importing vendor data
export function exportImportExample(vendorManager: VendorManager): void {
  // Export current vendor data
  const exportedData = vendorManager.exportVendors();
  console.log('Exported vendor data:', exportedData.length, 'vendors');
  
  // You could save this to localStorage, send to server, etc.
  localStorage.setItem('festivalVendors', JSON.stringify(exportedData));
  
  // Later, import the data
  const savedData = localStorage.getItem('festivalVendors');
  if (savedData) {
    const parsedData = JSON.parse(savedData) as VendorData[];
    vendorManager.importVendors(parsedData);
    console.log('Imported vendor data:', parsedData.length, 'vendors');
  }
}

// Example: Real-time vendor updates
export function simulateRealTimeUpdates(vendorManager: VendorManager): void {
  console.log('Starting real-time vendor updates simulation...');
  
  const vendors = vendorManager.getAllVendors();
  
  // Simulate vendor status changes every 5 seconds
  setInterval(() => {
    const randomVendor = vendors[Math.floor(Math.random() * vendors.length)];
    const newStatus = randomVendor.status === 'open' ? 'closed' : 'open';
    
    vendorManager.updateVendor(randomVendor.id, {
      status: newStatus
    });
    
    console.log(`Updated ${randomVendor.name} status to: ${newStatus}`);
  }, 5000);
}

// Example: Creating custom marker styles based on vendor data
export function customMarkerStyling(vendorManager: VendorManager): void {
  // This would require extending the VendorManager class
  // or accessing the markers directly for custom styling
  
  const stats = vendorManager.getStats();
  console.log('Custom styling could be applied based on:', stats);
  
  // Example: Change marker size based on popularity (if that data existed)
  // Example: Animate markers for featured vendors
  // Example: Cluster markers in dense areas
}

// Example usage in a React component or main application:
/*
export function initializeVendorMap(mapElement: HTMLElement, vendors: VendorData[]) {
  // Create Leaflet map
  const map = L.map(mapElement).setView([36.1888487, -86.7383314], 16);
  
  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
  // Initialize VendorManager
  const vendorManager = setupBasicVendorManager(map, vendors);
  
  // Set up UI controls for filtering
  document.getElementById('filter-food')?.addEventListener('click', () => {
    filterByVendorType(vendorManager);
  });
  
  document.getElementById('show-stats')?.addEventListener('click', () => {
    showVendorStats(vendorManager);
  });
  
  return { map, vendorManager };
}
*/
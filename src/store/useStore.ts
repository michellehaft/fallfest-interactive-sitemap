import { create } from 'zustand';
import { FilterState, UserPreferences } from '../types';
import { VendorData } from '../data/vendors';

interface AppState {
  // Vendors
  vendors: VendorData[];
  filteredVendors: VendorData[];
  selectedVendor: VendorData | null;
  
  // Filters
  filters: FilterState;
  
  // User preferences
  userPrefs: UserPreferences;
  
  // UI state
  isVendorPopupOpen: boolean;
  isFilterPanelOpen: boolean;
  isSearchOpen: boolean;
  
  // Actions
  setVendors: (vendors: VendorData[]) => void;
  setFilteredVendors: (vendors: VendorData[]) => void;
  setSelectedVendor: (vendor: VendorData | null) => void;
  
  // Filter actions
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // User preference actions
  toggleFavorite: (vendorId: string) => void;
  markVisited: (vendorId: string) => void;
  updateUserPrefs: (prefs: Partial<UserPreferences>) => void;
  
  // UI actions
  toggleVendorPopup: () => void;
  toggleFilterPanel: () => void;
  toggleSearch: () => void;
  
  // Computed values
  getFavorites: () => VendorData[];
  getVisited: () => VendorData[];
  getVendorsByCategory: (category: string) => VendorData[];
}

const initialFilters: FilterState = {
  categories: [],
  searchQuery: '',
  showFeaturedOnly: false
};

const initialUserPrefs: UserPreferences = {
  favorites: [],
  visited: [],
  theme: 'light',
  language: 'en'
};

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  vendors: [],
  filteredVendors: [],
  selectedVendor: null,
  filters: initialFilters,
  userPrefs: initialUserPrefs,
  isVendorPopupOpen: false,
  isFilterPanelOpen: false,
  isSearchOpen: false,
  
  // Actions
  setVendors: (vendors) => set({ vendors, filteredVendors: vendors }),
  setFilteredVendors: (vendors) => set({ filteredVendors: vendors }),
  setSelectedVendor: (vendor) => set({ selectedVendor: vendor }),
  
  // Filter actions
  updateFilters: (newFilters) => {
    const currentFilters = get().filters;
    const updatedFilters = { ...currentFilters, ...newFilters };
    set({ filters: updatedFilters });
    
    // Apply filters to vendors
    const { vendors } = get();
    let filtered = vendors;
    
    // Category filter
    if (updatedFilters.categories.length > 0) {
      filtered = filtered.filter(vendor => 
        updatedFilters.categories.includes(vendor.category)
      );
    }
    
    // Search filter
    if (updatedFilters.searchQuery) {
      const query = updatedFilters.searchQuery.toLowerCase();
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query) ||
        vendor.category.toLowerCase().includes(query)
      );
    }
    
    // Featured only filter
    if (updatedFilters.showFeaturedOnly) {
      const featuredIds = ['food-001', 'beverage-001', 'arts-001']; // First 3 vendor IDs (food, beverage, merchant)
      filtered = filtered.filter(vendor => featuredIds.includes(vendor.id));
    }
    
    set({ filteredVendors: filtered });
  },
  
  resetFilters: () => {
    set({ 
      filters: initialFilters,
      filteredVendors: get().vendors
    });
  },
  
  // User preference actions
  toggleFavorite: (vendorId) => {
    const { userPrefs } = get();
    const favorites = userPrefs.favorites.includes(vendorId)
      ? userPrefs.favorites.filter(id => id !== vendorId)
      : [...userPrefs.favorites, vendorId];
    
    set({
      userPrefs: { ...userPrefs, favorites }
    });
    
    // Save to localStorage
    localStorage.setItem('fallfest-favorites', JSON.stringify(favorites));
  },
  
  markVisited: (vendorId) => {
    const { userPrefs } = get();
    if (!userPrefs.visited.includes(vendorId)) {
      const visited = [...userPrefs.visited, vendorId];
      set({
        userPrefs: { ...userPrefs, visited }
      });
      
      // Save to localStorage
      localStorage.setItem('fallfest-visited', JSON.stringify(visited));
    }
  },
  
  updateUserPrefs: (newPrefs) => {
    const { userPrefs } = get();
    const updatedPrefs = { ...userPrefs, ...newPrefs };
    set({ userPrefs: updatedPrefs });
    
    // Save to localStorage
    localStorage.setItem('fallfest-user-prefs', JSON.stringify(updatedPrefs));
  },
  
  // UI actions
  toggleVendorPopup: () => set(state => ({ 
    isVendorPopupOpen: !state.isVendorPopupOpen 
  })),
  
  toggleFilterPanel: () => set(state => ({ 
    isFilterPanelOpen: !state.isFilterPanelOpen 
  })),
  
  toggleSearch: () => set(state => ({ 
    isSearchOpen: !state.isSearchOpen 
  })),
  
  // Computed values
  getFavorites: () => {
    const { vendors, userPrefs } = get();
    return vendors.filter(vendor => userPrefs.favorites.includes(vendor.id));
  },
  
  getVisited: () => {
    const { vendors, userPrefs } = get();
    return vendors.filter(vendor => userPrefs.visited.includes(vendor.id));
  },
  
  getVendorsByCategory: (category) => {
    const { vendors } = get();
    return vendors.filter(vendor => vendor.category === category);
  }
}));

// Load saved preferences from localStorage on app start
export const initializeStore = () => {
  try {
    const favorites = localStorage.getItem('fallfest-favorites');
    const visited = localStorage.getItem('fallfest-visited');
    const userPrefs = localStorage.getItem('fallfest-user-prefs');
    
    if (favorites) {
      useStore.getState().updateUserPrefs({ 
        favorites: JSON.parse(favorites) 
      });
    }
    
    if (visited) {
      useStore.getState().updateUserPrefs({ 
        visited: JSON.parse(visited) 
      });
    }
    
    if (userPrefs) {
      useStore.getState().updateUserPrefs(JSON.parse(userPrefs));
    }
  } catch (error) {
    console.error('Error loading saved preferences:', error);
  }
}; 
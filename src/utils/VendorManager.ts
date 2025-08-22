// VendorManager.ts - Comprehensive vendor management system for interactive maps
import L from 'leaflet';
import { VendorData, categoryConfig } from '../data/vendors';
import { VendorCategory } from '../types';

export interface VendorFilter {
  types?: ('vendor' | 'activity' | 'amenity')[];
  categories?: VendorCategory[];
  featured?: boolean;
  searchQuery?: string;
  bounds?: L.LatLngBounds;
}

export interface MarkerClickHandler {
  (vendor: VendorData, marker: L.Marker): void;
}

export interface VendorManagerOptions {
  onVendorClick?: MarkerClickHandler;
  defaultFilter?: VendorFilter;
  enableClustering?: boolean;
  popupOptions?: L.PopupOptions;
  markerOptions?: L.MarkerOptions;
}

export class VendorManager {
  private map: L.Map;
  private vendors: VendorData[];
  private markers: Map<string, L.Marker> = new Map();
  private markerGroup: L.LayerGroup;
  private currentFilter: VendorFilter = {};
  private onVendorClick?: MarkerClickHandler;
  private popupOptions: L.PopupOptions;
  private markerOptions: L.MarkerOptions;

  constructor(map: L.Map, vendors: VendorData[], options: VendorManagerOptions = {}) {
    this.map = map;
    this.vendors = [...vendors];
    this.markerGroup = L.layerGroup().addTo(map);
    this.onVendorClick = options.onVendorClick;
    this.currentFilter = options.defaultFilter || {};
    this.popupOptions = options.popupOptions || {
      maxWidth: 300,
      className: 'vendor-popup'
    };
    this.markerOptions = options.markerOptions || {};

    this.initializeMarkers();
  }

  /**
   * Initialize all vendor markers on the map
   */
  private initializeMarkers(): void {
    this.vendors.forEach(vendor => {
      this.createMarker(vendor);
    });
    this.applyCurrentFilter();
  }

  /**
   * Create a marker for a specific vendor
   */
  private createMarker(vendor: VendorData): L.Marker {
    const [lat, lng] = vendor.location.coordinates;
    const icon = this.createCustomIcon(vendor.category);
    
    const marker = L.marker([lat, lng], {
      icon,
      title: vendor.name,
      ...this.markerOptions
    });

    // Create popup content
    const popupContent = this.createPopupContent(vendor);
    marker.bindPopup(popupContent, this.popupOptions);

    // Add click handler
    marker.on('click', () => {
      if (this.onVendorClick) {
        this.onVendorClick(vendor, marker);
      }
    });

    // Add hover effects
    marker.on('mouseover', () => {
      marker.openPopup();
    });

    this.markers.set(vendor.id, marker);
    return marker;
  }

  /**
   * Create custom icon for vendor category
   */
  private createCustomIcon(category: VendorCategory): L.DivIcon {
    const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.services;
    
    return L.divIcon({
      className: 'vendor-marker-icon',
      html: `
        <div class="vendor-marker" style="
          background-color: ${config.color};
          border: 2px solid white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        " data-category="${category}">
          ${config.icon}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  }

  /**
   * Create HTML content for vendor popup
   */
  private createPopupContent(vendor: VendorData): string {
    const config = categoryConfig[vendor.category as keyof typeof categoryConfig] || categoryConfig.services;
    
    return `
      <div class="vendor-popup-content" style="min-width: 250px;">
        <div class="popup-header" style="
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
        ">
          <div style="
            background-color: ${config.color};
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: white;
          ">
            ${config.icon}
          </div>
          <div>
            <h3 style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">
              ${vendor.name}
            </h3>
            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <span style="
                background-color: ${config.color};
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
              ">
                ${config.label}
              </span>
              <span style="
                background-color: #10b981;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
              ">
                🟢 Available
              </span>
            </div>
          </div>
        </div>
        
        <div class="popup-body">
          <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">
            ${vendor.description}
          </p>
          
          ${vendor.ageRequirements ? `
            <div style="margin-bottom: 8px;">
              <strong style="color: #374151; font-size: 13px;">👶 Age Requirements:</strong>
              <span style="color: #6b7280; font-size: 13px; margin-left: 8px;">${vendor.ageRequirements}</span>
            </div>
          ` : ''}
          
          ${vendor.capacity ? `
            <div style="margin-bottom: 8px;">
              <strong style="color: #374151; font-size: 13px;">👥 Capacity:</strong>
              <span style="color: #6b7280; font-size: 13px; margin-left: 8px;">${vendor.capacity}</span>
            </div>
          ` : ''}
          
          ${vendor.dietaryOptions && vendor.dietaryOptions.length > 0 ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #374151; font-size: 13px;">🥗 Dietary Options:</strong>
              <div style="margin: 4px 0 0 0;">
                ${vendor.dietaryOptions.map(option => `<span style="background: #e5e7eb; color: #374151; padding: 2px 6px; border-radius: 8px; font-size: 11px; margin-right: 4px; margin-bottom: 2px; display: inline-block;">${option}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          
          ${vendor.contact ? `
            <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
              ${vendor.contact.email ? `<div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">📧 ${vendor.contact.email}</div>` : ''}
              ${vendor.contact.website ? `<div style="font-size: 12px;"><a href="https://${vendor.contact.website}" target="_blank" style="color: #3b82f6; text-decoration: none;">🌐 ${vendor.contact.website}</a></div>` : ''}
            </div>
          ` : ''}
        </div>
        
        <div class="popup-footer" style="margin-top: 12px; text-align: center;">
          <button 
            onclick="window.vendorManager?.showVendorDetails('${vendor.id}')"
            style="
              background-color: ${config.color};
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 6px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.2s ease;
            "
            onmouseover="this.style.opacity='0.8'"
            onmouseout="this.style.opacity='1'"
          >
            View Details
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Add a new vendor to the map
   */
  public addVendor(vendor: VendorData): void {
    if (this.markers.has(vendor.id)) {
      console.warn(`Vendor with ID ${vendor.id} already exists`);
      return;
    }

    this.vendors.push(vendor);
    this.createMarker(vendor);
    
    if (this.passesFilter(vendor)) {
      this.showMarker(vendor.id);
    }
  }

  /**
   * Remove a vendor from the map
   */
  public removeVendor(vendorId: string): boolean {
    const marker = this.markers.get(vendorId);
    if (!marker) {
      return false;
    }

    this.markerGroup.removeLayer(marker);
    this.markers.delete(vendorId);
    this.vendors = this.vendors.filter(v => v.id !== vendorId);
    
    return true;
  }

  /**
   * Update an existing vendor
   */
  public updateVendor(vendorId: string, updates: Partial<VendorData>): boolean {
    const vendorIndex = this.vendors.findIndex(v => v.id === vendorId);
    if (vendorIndex === -1) {
      return false;
    }

    // Update vendor data
    this.vendors[vendorIndex] = { ...this.vendors[vendorIndex], ...updates };
    const updatedVendor = this.vendors[vendorIndex];

    // Remove old marker
    const oldMarker = this.markers.get(vendorId);
    if (oldMarker) {
      this.markerGroup.removeLayer(oldMarker);
    }

    // Create new marker with updated data
    this.createMarker(updatedVendor);
    
    // Apply current filter
    if (this.passesFilter(updatedVendor)) {
      this.showMarker(vendorId);
    }

    return true;
  }

  /**
   * Apply filters to show/hide vendors
   */
  public applyFilter(filter: VendorFilter): void {
    this.currentFilter = { ...filter };
    this.applyCurrentFilter();
  }

  /**
   * Apply the current filter to all vendors
   */
  private applyCurrentFilter(): void {
    this.vendors.forEach(vendor => {
      if (this.passesFilter(vendor)) {
        this.showMarker(vendor.id);
      } else {
        this.hideMarker(vendor.id);
      }
    });
  }

  /**
   * Check if a vendor passes the current filter
   */
  private passesFilter(vendor: VendorData): boolean {
    const filter = this.currentFilter;

    // Type filter
    if (filter.types && filter.types.length > 0) {
      if (!filter.types.includes(vendor.type)) {
        return false;
      }
    }

    // Category filter
    if (filter.categories && filter.categories.length > 0) {
      if (!filter.categories.includes(vendor.category)) {
        return false;
      }
    }

    // Featured filter (using first 3 vendors as featured)
    if (filter.featured !== undefined) {
      const featuredIds = ['food-001', 'beverage-001', 'arts-001']; // First 3 vendor IDs (food, beverage, merchant)
      const isFeatured = featuredIds.includes(vendor.id);
      if (isFeatured !== filter.featured) {
        return false;
      }
    }

    // Search query filter
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const query = filter.searchQuery.toLowerCase().trim();
      const searchableText = [
        vendor.name,
        vendor.description,
        vendor.category
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Bounds filter
    if (filter.bounds) {
      const [lat, lng] = vendor.location.coordinates;
      if (!filter.bounds.contains([lat, lng])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Show a vendor marker on the map
   */
  private showMarker(vendorId: string): void {
    const marker = this.markers.get(vendorId);
    if (marker && !this.markerGroup.hasLayer(marker)) {
      this.markerGroup.addLayer(marker);
    }
  }

  /**
   * Hide a vendor marker from the map
   */
  private hideMarker(vendorId: string): void {
    const marker = this.markers.get(vendorId);
    if (marker && this.markerGroup.hasLayer(marker)) {
      this.markerGroup.removeLayer(marker);
    }
  }

  /**
   * Get vendors by type
   */
  public getVendorsByType(type: 'vendor' | 'activity' | 'amenity'): VendorData[] {
    return this.vendors.filter(vendor => vendor.type === type);
  }

  /**
   * Get vendors by category
   */
  public getVendorsByCategory(category: VendorCategory): VendorData[] {
    return this.vendors.filter(vendor => vendor.category === category);
  }

  /**
   * Get currently visible vendors
   */
  public getVisibleVendors(): VendorData[] {
    return this.vendors.filter(vendor => 
      this.passesFilter(vendor) && this.markers.has(vendor.id)
    );
  }

  /**
   * Get vendor by ID
   */
  public getVendor(vendorId: string): VendorData | undefined {
    return this.vendors.find(vendor => vendor.id === vendorId);
  }

  /**
   * Get all vendors
   */
  public getAllVendors(): VendorData[] {
    return [...this.vendors];
  }

  /**
   * Clear all filters
   */
  public clearFilters(): void {
    this.currentFilter = {};
    this.applyCurrentFilter();
  }

  /**
   * Focus on a specific vendor
   */
  public focusOnVendor(vendorId: string, zoom?: number): boolean {
    const vendor = this.getVendor(vendorId);
    if (!vendor) {
      return false;
    }

    const [lat, lng] = vendor.location.coordinates;
    this.map.setView([lat, lng], zoom || 17);
    
    const marker = this.markers.get(vendorId);
    if (marker) {
      marker.openPopup();
    }

    return true;
  }

  /**
   * Get statistics about vendors
   */
  public getStats(): {
    total: number;
    visible: number;
    byType: Record<string, number>;
    byCategory: Record<string, number>;
  } {
    const visible = this.getVisibleVendors();
    
    return {
      total: this.vendors.length,
      visible: visible.length,
      byType: this.vendors.reduce((acc, vendor) => {
        acc[vendor.type] = (acc[vendor.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byCategory: this.vendors.reduce((acc, vendor) => {
        acc[vendor.category] = (acc[vendor.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  /**
   * Export vendor data
   */
  public exportVendors(): VendorData[] {
    return JSON.parse(JSON.stringify(this.vendors));
  }

  /**
   * Import vendor data
   */
  public importVendors(vendors: VendorData[]): void {
    // Clear existing vendors
    this.markerGroup.clearLayers();
    this.markers.clear();
    
    // Add new vendors
    this.vendors = [...vendors];
    this.initializeMarkers();
  }

  /**
   * Destroy the vendor manager
   */
  public destroy(): void {
    this.markerGroup.clearLayers();
    this.map.removeLayer(this.markerGroup);
    this.markers.clear();
    this.vendors = [];
  }
}

// Global reference for popup button handlers
declare global {
  interface Window {
    vendorManager?: VendorManager;
  }
}

export default VendorManager;
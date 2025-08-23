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
  onVendorDrag?: (vendor: VendorData, newCoordinates: [number, number]) => void;
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
  private isDragModeEnabled: boolean = false;
  private onVendorDrag?: (vendor: VendorData, newCoordinates: [number, number]) => void;

  constructor(map: L.Map, vendors: VendorData[], options: VendorManagerOptions = {}) {
    this.map = map;
    this.vendors = [...vendors];
    this.markerGroup = L.layerGroup().addTo(map);
    this.onVendorClick = options.onVendorClick;
    this.onVendorDrag = options.onVendorDrag;
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
      draggable: true, // Always create markers as draggable, we'll control it via enable/disable
      ...this.markerOptions
    });

    // Initially disable dragging if not in drag mode
    if (!this.isDragModeEnabled) {
      marker.dragging?.disable();
    }

    // Create popup content
    const popupContent = this.createPopupContent(vendor);
    marker.bindPopup(popupContent, this.popupOptions);

    // Add click handler
    marker.on('click', () => {
      if (this.onVendorClick) {
        this.onVendorClick(vendor, marker);
      }
    });

    // Add hover effects (only when not in drag mode)
    if (!this.isDragModeEnabled) {
      marker.on('mouseover', () => {
        marker.openPopup();
      });
    }

    // Add drag handlers
    this.addDragHandlers(marker, vendor);

    this.markers.set(vendor.id, marker);
    return marker;
  }

  /**
   * Add drag event handlers to a marker
   */
  private addDragHandlers(marker: L.Marker, vendor: VendorData): void {
    marker.on('dragstart', () => {
      marker.closePopup();
    });

    marker.on('dragend', () => {
      const newLatLng = marker.getLatLng();
      const newCoordinates: [number, number] = [newLatLng.lat, newLatLng.lng];
      
      // Update vendor data
      vendor.location.coordinates = newCoordinates;
      
      // Call the drag callback if provided
      if (this.onVendorDrag) {
        this.onVendorDrag(vendor, newCoordinates);
      }
      
      // Update popup content with new coordinates
      const updatedContent = this.createPopupContent(vendor);
      marker.setPopupContent(updatedContent);
    });
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
    try {
      const config = categoryConfig[vendor.category as keyof typeof categoryConfig] || categoryConfig.services;
    
      return `
      <div class="vendor-popup-content" style="
        min-width: 280px;
        padding: 24px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border: 1px solid #e5e7eb;
      ">
        <div class="popup-header" style="
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f3f4f6;
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
            overflow: hidden;
            flex-shrink: 0;
          ">
            ${vendor.image ? `
              <img 
                src="${vendor.image}" 
                alt="${vendor.name}" 
                style="
                  width: 40px;
                  height: 40px;
                  object-fit: cover;
                  border-radius: 50%;
                  flex-shrink: 0;
                  display: block;
                "
                onerror="this.style.display='none'; this.parentElement.innerHTML='${config.icon}';"
              />
            ` : config.icon}
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
            </div>
          </div>
        </div>
        
        <div class="popup-body">
          <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
            ${vendor.description}
          </p>
          
          ${vendor.ageRequirements ? `
            <div style="margin-bottom: 12px; padding: 8px 12px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid #0ea5e9;">
              <strong style="color: #374151; font-size: 13px;">👶 Age Requirements:</strong>
              <span style="color: #6b7280; font-size: 13px; margin-left: 8px;">${vendor.ageRequirements}</span>
            </div>
          ` : ''}
          
          ${vendor.capacity ? `
            <div style="margin-bottom: 12px; padding: 8px 12px; background-color: #fefce8; border-radius: 6px; border-left: 3px solid #eab308;">
              <strong style="color: #374151; font-size: 13px;">👥 Capacity:</strong>
              <span style="color: #6b7280; font-size: 13px; margin-left: 8px;">${vendor.capacity}</span>
            </div>
          ` : ''}
          
          ${vendor.dietaryOptions && vendor.dietaryOptions.length > 0 ? `
            <div style="margin-bottom: 16px; padding: 8px 12px; background-color: #f0fdf4; border-radius: 6px; border-left: 3px solid #22c55e;">
              <strong style="color: #374151; font-size: 13px;">🥗 Dietary Options:</strong>
              <div style="margin: 8px 0 0 0;">
                ${vendor.dietaryOptions.map(option => `<span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin-right: 6px; margin-bottom: 4px; display: inline-block; font-weight: 500;">${option}</span>`).join('')}
              </div>
            </div>
          ` : ''}

        </div>
        
        ${this.isDragModeEnabled ? `
          <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <div style="background: #f3f4f6; padding: 8px; border-radius: 6px; font-family: monospace;">
              <div style="font-size: 11px; color: #6b7280; margin-bottom: 4px;">🛠️ DEV MODE - Coordinates:</div>
              <div style="font-size: 12px; color: #374151; margin-bottom: 2px;">
                <strong>Raw:</strong> [${vendor.location.coordinates[0].toFixed(7)}, ${vendor.location.coordinates[1].toFixed(7)}]
              </div>
              <div style="font-size: 12px; color: #374151;">
                <strong>generateCoords:</strong> generateCoords(${(vendor.location.coordinates[0] - 36.1888487).toFixed(7)}, ${(vendor.location.coordinates[1] + 86.7383314).toFixed(7)})
              </div>
              <div style="font-size: 10px; color: #6b7280; margin-top: 4px;">🔄 Drag marker to update coordinates</div>
            </div>
          </div>
        ` : ''}
        
        <div class="popup-footer" style="margin-top: 20px; text-align: center;">
          <button 
            onclick="window.vendorClickHandler?.('${vendor.id}')"
            style="
              background-color: #4f7973;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
              min-width: 120px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            "
            onmouseover="this.style.backgroundColor='#4f7973CC'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.15)'"
            onmouseout="this.style.backgroundColor='#4f7973'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.1)'"
          >
            View Details
          </button>
        </div>
      </div>
    `;
    } catch (error) {
      console.error('Error creating popup content:', error);
      return `
        <div class="vendor-popup-content" style="min-width: 250px;">
          <div class="popup-header">
            <h3>${vendor.name}</h3>
            <p>Error loading vendor details</p>
          </div>
        </div>
      `;
    }
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
   * Open popup for a specific vendor by ID
   */
  public openVendorPopup(vendorId: string): void {
    const marker = this.markers.get(vendorId);
    if (marker) {
      marker.openPopup();
    }
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
   * Enable or disable drag mode for all markers
   */
  public setDragMode(enabled: boolean): void {
    try {
      console.log(`🔧 VendorManager: Setting drag mode to ${enabled} for ${this.markers.size} markers`);
      this.isDragModeEnabled = enabled;
      
      // Update all existing markers
      this.markers.forEach((marker, vendorId) => {
        if (marker) {
          console.log(`🔧 Setting draggable=${enabled} for vendor ${vendorId}`);
          
          // Use the dragging property to enable/disable
          if (enabled) {
            if (marker.dragging) {
              marker.dragging.enable();
              console.log(`🔧 Dragging enabled for vendor ${vendorId}`);
            } else {
              console.warn(`🔧 No dragging property on marker for vendor ${vendorId}`);
            }
            // Remove hover effects in drag mode
            marker.off('mouseover');
            // Change cursor to indicate draggable
            const markerElement = marker.getElement();
            if (markerElement) {
              markerElement.style.cursor = 'move';
              console.log(`🔧 Cursor set to 'move' for vendor ${vendorId}`);
            }
          } else {
            if (marker.dragging) {
              marker.dragging.disable();
              console.log(`🔧 Dragging disabled for vendor ${vendorId}`);
            }
            // Re-add hover effects when not in drag mode
            marker.on('mouseover', () => {
              marker.openPopup();
            });
            // Reset cursor
            const markerElement = marker.getElement();
            if (markerElement) {
              markerElement.style.cursor = 'pointer';
            }
          }
        } else {
          console.warn(`🔧 Marker for vendor ${vendorId} is invalid`);
        }
      });
    } catch (error) {
      console.error('Error setting drag mode:', error);
    }
  }

  /**
   * Check if drag mode is enabled
   */
  public isDragModeActive(): boolean {
    return this.isDragModeEnabled;
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
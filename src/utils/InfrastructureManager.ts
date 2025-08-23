// InfrastructureManager.ts - Manages infrastructure markers on the map
import L from 'leaflet';
import { InfrastructureItem, infrastructureConfig } from '../data/infrastructure';

export class InfrastructureManager {
  private map: L.Map;
  private infrastructureItems: InfrastructureItem[];
  private markers: Map<string, L.Marker> = new Map();
  private markerGroup: L.LayerGroup;
  private isDragModeEnabled: boolean = false;
  private onInfrastructureDrag?: (item: InfrastructureItem, newCoordinates: [number, number]) => void;

  constructor(map: L.Map, items: InfrastructureItem[], options?: {
    onInfrastructureDrag?: (item: InfrastructureItem, newCoordinates: [number, number]) => void;
  }) {
    this.map = map;
    this.infrastructureItems = [...items];
    this.markerGroup = L.layerGroup().addTo(map);
    this.onInfrastructureDrag = options?.onInfrastructureDrag;
    this.initializeMarkers();
  }

  /**
   * Initialize all infrastructure markers on the map
   */
  private initializeMarkers(): void {
    this.infrastructureItems.forEach(item => {
      this.createMarker(item);
    });
  }

  /**
   * Create a marker for a specific infrastructure item
   */
  private createMarker(item: InfrastructureItem): L.Marker {
    const [lat, lng] = item.location.coordinates;
    const icon = this.createCustomIcon(item.type);
    
    const marker = L.marker([lat, lng], {
      icon,
      title: item.name,
      zIndexOffset: -1000, // Ensure infrastructure markers stay below vendor markers
      draggable: true // Always create markers as draggable, we'll control it via enable/disable
    });

    // Initially disable dragging if not in drag mode
    if (!this.isDragModeEnabled) {
      marker.dragging?.disable();
    }

    // Create popup content
    const popupContent = this.createPopupContent(item);
    marker.bindPopup(popupContent, {
      maxWidth: 250,
      className: 'infrastructure-popup'
    });

    // Add hover handlers to show popup on mouseover
    marker.on('mouseover', () => {
      marker.openPopup();
    });

    marker.on('mouseout', () => {
      marker.closePopup();
    });

    // Add drag handlers
    this.addDragHandlers(marker, item);

    this.markers.set(item.id, marker);
    this.markerGroup.addLayer(marker);
    
    return marker;
  }

  /**
   * Add drag event handlers to a marker
   */
  private addDragHandlers(marker: L.Marker, item: InfrastructureItem): void {
    marker.on('dragstart', () => {
      marker.closePopup();
    });

    marker.on('dragend', () => {
      const newLatLng = marker.getLatLng();
      const newCoordinates: [number, number] = [newLatLng.lat, newLatLng.lng];
      
      // Update item coordinates
      item.location.coordinates = newCoordinates;
      
      // Call the drag callback if provided
      if (this.onInfrastructureDrag) {
        this.onInfrastructureDrag(item, newCoordinates);
      }
      
      // Update popup content with new coordinates
      const updatedContent = this.createPopupContent(item);
      marker.setPopupContent(updatedContent);
    });
  }

  /**
   * Create custom icon for infrastructure type
   */
  private createCustomIcon(type: InfrastructureItem['type']): L.DivIcon {
    const config = infrastructureConfig[type];
    
    let iconHtml = '';
    let iconSize: [number, number] = [32, 32];
    let iconAnchor: [number, number] = [16, 16];

    switch (config.shape) {
      case 'rectangle':
        // Special barricade styling with stripes
        iconHtml = `
          <div class="infrastructure-marker infrastructure-barricade" style="
            background: linear-gradient(
              45deg, 
              ${config.color} 25%, 
              white 25%, 
              white 50%, 
              ${config.color} 50%, 
              ${config.color} 75%, 
              white 75%, 
              white
            );
            background-size: 8px 8px;
            border: 2px solid #FFFFFF;
            width: 40px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border-radius: 3px;
          " data-type="${type}">
          </div>
        `;
        iconSize = [40, 20];
        iconAnchor = [20, 10];
        break;

      case 'diamond':
        // Diamond shape for detour signs
        iconHtml = `
          <div class="infrastructure-marker infrastructure-diamond" style="
            background-color: ${config.color};
            border: 2px solid #ffffff;
            width: 28px;
            height: 28px;
            transform: rotate(45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            position: relative;
          " data-type="${type}">
            <span style="transform: rotate(-45deg); color: black; font-weight: bold;">
              ${config.icon}
            </span>
          </div>
        `;
        iconSize = [28, 28];
        iconAnchor = [14, 14];
        break;

      case 'circle':
      default:
        // Standard circular markers for seating, trash, security
        iconHtml = `
          <div class="infrastructure-marker infrastructure-circle" style="
            background-color: ${config.color};
            border: 2px solid white;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.2s ease;
          " data-type="${type}">
            ${config.icon}
          </div>
        `;
        iconSize = [32, 32];
        iconAnchor = [16, 16];
        break;
    }

    return L.divIcon({
      className: 'infrastructure-marker-icon',
      html: iconHtml,
      iconSize,
      iconAnchor,
      popupAnchor: [0, -16]
    });
  }

  /**
   * Create HTML content for infrastructure popup
   */
  private createPopupContent(item: InfrastructureItem): string {
    const config = infrastructureConfig[item.type];
    
    return `
      <div class="infrastructure-popup-content" style="
        min-width: 200px;
        padding: 16px;
        background: white;
        border-radius: 8px;
      ">
        <div class="popup-header" style="
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        ">
          <div style="
            ${config.shape === 'rectangle' ? `
              background: linear-gradient(
                45deg, 
                ${config.color} 25%, 
                white 25%, 
                white 50%, 
                ${config.color} 50%, 
                ${config.color} 75%, 
                white 75%, 
                white
              );
              background-size: 6px 6px;
              border: 2px solid #FFFFFF;
              width: 32px;
              height: 20px;
              border-radius: 3px;
            ` : `
              background-color: ${config.color};
              border-radius: ${config.shape === 'circle' ? '50%' : '0'};
              width: 32px;
              height: 32px;
              ${config.shape === 'diamond' ? 'transform: rotate(45deg); border: 2px solid #ffffff;' : 'border: 2px solid white;'}
            `}
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: ${config.shape === 'diamond' ? 'black' : 'white'};
          ">
            <span ${config.shape === 'diamond' ? 'style="transform: rotate(-45deg);"' : ''}>
              ${config.shape === 'rectangle' ? '' : config.icon}
            </span>
          </div>
          <div>
            <h3 style="margin: 0; color: #1f2937; font-size: 14px; font-weight: 600;">
              ${item.name}
            </h3>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get all infrastructure items
   */
  public getAllItems(): InfrastructureItem[] {
    return [...this.infrastructureItems];
  }

  /**
   * Remove all markers from the map
   */
  public destroy(): void {
    this.markerGroup.clearLayers();
    this.markers.clear();
    this.map.removeLayer(this.markerGroup);
  }

  /**
   * Show or hide all infrastructure markers
   */
  public setVisible(visible: boolean): void {
    if (visible) {
      if (!this.map.hasLayer(this.markerGroup)) {
        this.map.addLayer(this.markerGroup);
      }
    } else {
      this.map.removeLayer(this.markerGroup);
    }
  }

  /**
   * Enable or disable drag mode for all infrastructure markers
   */
  public setDevMode(enabled: boolean): void {
    console.log(`🏗️ InfrastructureManager: Setting drag mode to ${enabled} for ${this.markers.size} markers`);
    this.isDragModeEnabled = enabled;
    
    // Update all existing markers
    this.markers.forEach((marker, itemId) => {
      if (marker) {
        console.log(`🏗️ Setting draggable=${enabled} for infrastructure ${itemId}`);
        
        // Use the dragging property to enable/disable
        if (enabled) {
          if (marker.dragging) {
            marker.dragging.enable();
            console.log(`🏗️ Dragging enabled for infrastructure ${itemId}`);
          } else {
            console.warn(`🏗️ No dragging property on marker for infrastructure ${itemId}`);
          }
          // Remove hover effects in drag mode
          marker.off('mouseover');
          marker.off('mouseout');
        } else {
          if (marker.dragging) {
            marker.dragging.disable();
            console.log(`🏗️ Dragging disabled for infrastructure ${itemId}`);
          }
          // Re-enable hover effects when dev mode is off
          marker.on('mouseover', () => {
            marker.openPopup();
          });
          marker.on('mouseout', () => {
            marker.closePopup();
          });
        }
      }
    });
  }
}
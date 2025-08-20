import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';
import { Vendor } from '../types';

interface VendorMarkerProps {
  vendor: Vendor;
  x: number;
  y: number;
  onVendorClick: (vendor: Vendor) => void;
}

const VendorMarker: React.FC<VendorMarkerProps> = ({ vendor, x, y, onVendorClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <g>
      {/* Vendor marker */}
      <circle
        cx={x}
        cy={y}
        r={isHovered ? 18 : 15}
        fill={getCategoryColor(vendor.category)}
        stroke="white"
        strokeWidth="3"
        className="cursor-pointer transition-all duration-200 hover:drop-shadow-lg"
        onClick={() => onVendorClick(vendor)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Category icon */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        className="pointer-events-none select-none"
      >
        {getCategoryIcon(vendor.category)}
      </text>
      
      {/* Hover tooltip */}
      {isHovered && (
        <g>
          <rect
            x={x - 60}
            y={y - 50}
            width="120"
            height="35"
            fill="rgba(0, 0, 0, 0.9)"
            rx="5"
            className="pointer-events-none"
          />
          <text
            x={x}
            y={y - 35}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="bold"
            className="pointer-events-none select-none"
          >
            {vendor.name}
          </text>
          <text
            x={x}
            y={y - 22}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            className="pointer-events-none select-none"
          >
            {vendor.category} • {vendor.status}
          </text>
        </g>
      )}
    </g>
  );
};

interface FestivalMapProps {
  onVendorClick?: (vendor: Vendor) => void;
}

const FestivalMap: React.FC<FestivalMapProps> = ({ onVendorClick }) => {
  const { filteredVendors } = useStore();
  
  // Map dimensions
  const mapWidth = 800;
  const mapHeight = 600;
  
  // Convert vendor location percentages to SVG coordinates
  const getVendorPosition = (vendor: Vendor) => {
    const x = (vendor.location.x / 100) * mapWidth;
    const y = (vendor.location.y / 100) * mapHeight;
    return { x, y };
  };
  
  const handleVendorClick = (vendor: Vendor) => {
    console.log('Vendor clicked:', vendor);
    if (onVendorClick) {
      onVendorClick(vendor);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
      <div className="relative bg-white rounded-lg shadow-lg p-4" style={{ maxWidth: '900px', width: '100%' }}>
        {/* Map Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Fallfest Event Layout</h2>
          <p className="text-gray-600">Click on any vendor marker for details</p>
        </div>
        
        {/* SVG Map */}
        <div className="relative">
          <svg
            width="100%"
            height="600"
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            className="border border-gray-300 rounded-lg bg-green-50"
          >
            {/* Background areas */}
            
            {/* Roads/Paths - Based on actual Eastwood Village layout */}
            {/* Chapel Ave - Main north-south road */}
            <rect x="380" y="0" width="40" height={mapHeight} fill="#9CA3AF" opacity="0.4" />
            
            {/* Greenwood Ave - North road */}
            <rect x="0" y="80" width={mapWidth} height="30" fill="#9CA3AF" opacity="0.4" />
            
            {/* Hobson Chapel Pl - South road */}
            <rect x="0" y="490" width={mapWidth} height="30" fill="#9CA3AF" opacity="0.4" />
            
            {/* Roberts Ave - West road */}
            <rect x="80" y="0" width="30" height={mapHeight} fill="#9CA3AF" opacity="0.4" />
            
            {/* Sharpe Ave - East road */}
            <rect x="690" y="0" width="30" height={mapHeight} fill="#9CA3AF" opacity="0.4" />
            
            {/* Main vendor areas */}
            <rect x="120" y="120" width="240" height="360" fill="#FEF3C7" opacity="0.4" rx="10" />
            <rect x="440" y="120" width="240" height="360" fill="#DBEAFE" opacity="0.4" rx="10" />
            
            {/* Activity areas */}
            <rect x="120" y="80" width="240" height="30" fill="#DCFCE7" opacity="0.4" rx="5" />
            <rect x="440" y="80" width="240" height="30" fill="#DCFCE7" opacity="0.4" rx="5" />
            
            {/* Security/Fire lanes */}
            <rect x="30" y="30" width="740" height="15" fill="#FCA5A5" opacity="0.3" />
            <rect x="30" y="555" width="740" height="15" fill="#FCA5A5" opacity="0.3" />
            
            {/* Area Labels */}
            <text x="240" y="150" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">
              WEST VENDOR AREA
            </text>
            <text x="560" y="150" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">
              EAST VENDOR AREA
            </text>
            <text x="240" y="105" textAnchor="middle" fill="#6B7280" fontSize="10">
              Activities
            </text>
            <text x="560" y="105" textAnchor="middle" fill="#6B7280" fontSize="10">
              Activities
            </text>
            
            {/* Street labels - Based on actual layout */}
            <text x="400" y="25" textAnchor="middle" fill="#6B7280" fontSize="11" fontWeight="bold">
              Chapel Ave.
            </text>
            <text x="400" y="100" textAnchor="middle" fill="#6B7280" fontSize="11" fontWeight="bold">
              Greenwood Ave.
            </text>
            <text x="400" y="515" textAnchor="middle" fill="#6B7280" fontSize="11" fontWeight="bold">
              Hobson Chapel Pl.
            </text>
            <text x="95" y="300" fill="#6B7280" fontSize="10" transform="rotate(-90, 95, 300)">
              Roberts Ave.
            </text>
            <text x="705" y="300" fill="#6B7280" fontSize="10" transform="rotate(-90, 705, 300)">
              Sharpe Ave.
            </text>
            
            {/* Traffic flow indicators */}
            <polygon points="100,95 120,105 100,115" fill="#EF4444" />
            <text x="130" y="110" fill="#6B7280" fontSize="9">Thru traffic</text>
            
            <polygon points="700,95 720,105 700,115" fill="#EF4444" />
            <text x="730" y="110" fill="#6B7280" fontSize="9">Thru traffic</text>
            
            {/* Fire lanes */}
            <text x="400" y="42" textAnchor="middle" fill="#DC2626" fontSize="8" fontWeight="bold">
              FIRE LANE - KEEP CLEAR (20 ft)
            </text>
            <text x="400" y="567" textAnchor="middle" fill="#DC2626" fontSize="8" fontWeight="bold">
              FIRE LANE - KEEP CLEAR (20 ft)
            </text>
            
            {/* Main Stage - Centered on Chapel Ave */}
            <rect x="360" y="300" width="80" height="60" fill="#8B5CF6" opacity="0.6" rx="8" />
            <text x="400" y="335" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              🎭 MAIN STAGE
            </text>
            
            {/* Seating areas */}
            <ellipse cx="200" cy="320" rx="35" ry="20" fill="#F59E0B" opacity="0.3" />
            <text x="200" y="325" textAnchor="middle" fill="#92400E" fontSize="9">Tables</text>
            
            <ellipse cx="600" cy="320" rx="35" ry="20" fill="#F59E0B" opacity="0.3" />
            <text x="600" y="325" textAnchor="middle" fill="#92400E" fontSize="9">Tables</text>
            
            {/* Vendor markers */}
            {filteredVendors.map((vendor) => {
              const { x, y } = getVendorPosition(vendor);
              return (
                <VendorMarker
                  key={vendor.id}
                  vendor={vendor}
                  x={x}
                  y={y}
                  onVendorClick={handleVendorClick}
                />
              );
            })}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span>Vendor Areas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <span>Activity Areas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Main Stage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 rounded"></div>
                <span>Fire Lanes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span>Roads</span>
              </div>
            </div>
            
            {/* Street legend */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h5 className="font-medium text-gray-700 mb-2">Streets</h5>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span>Chapel Ave (Main)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span>Greenwood Ave (North)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span>Hobson Chapel Pl (South)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span>Roberts Ave (West)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span>Sharpe Ave (East)</span>
                </div>
              </div>
            </div>
            
            {/* Category legend */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h5 className="font-medium text-gray-700 mb-2">Vendor Types</h5>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {['food', 'arts', 'activities', 'services'].map(category => (
                  <div key={category} className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    >
                      {getCategoryIcon(category)}
                    </div>
                    <span className="capitalize">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Showing {filteredVendors.length} vendors • Click markers for details
        </div>
      </div>
    </div>
  );
};

export default FestivalMap;
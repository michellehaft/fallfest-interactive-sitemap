import React from 'react';
import { X } from 'lucide-react';
import { VendorData } from '../data/vendors';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';

interface MobileVendorDetailProps {
  vendor: VendorData;
  onClose: () => void;
}

const MobileVendorDetail: React.FC<MobileVendorDetailProps> = ({ vendor, onClose }) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-end p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Vendor Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
              {vendor.image ? (
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to category icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="w-full h-full rounded-full flex items-center justify-center text-white text-3xl" style="background-color: ${getCategoryColor(vendor.category)}">${getCategoryIcon(vendor.category)}</div>`;
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center text-white text-3xl"
                  style={{ backgroundColor: getCategoryColor(vendor.category) }}
                >
                  {getCategoryIcon(vendor.category)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{vendor.name}</h1>
              <div className="flex items-center gap-2">
                <span 
                  className="text-sm px-3 py-1 rounded-full text-white capitalize font-medium"
                  style={{ backgroundColor: getCategoryColor(vendor.category) }}
                >
                  {vendor.category}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-base">{vendor.description}</p>
        </div>

        {/* Detail Image */}
        {(vendor as VendorData).detailImage && (
          <div className="px-6 pb-4">
            <div className="w-full overflow-hidden rounded-xl border border-gray-200">
              <img 
                src={(vendor as VendorData).detailImage}
                alt={`${vendor.name} detail view`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Hide image if it fails to load
                  const target = e.target as HTMLImageElement;
                  target.parentElement!.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Details Sections */}
        <div className="px-6 pb-6 space-y-4">
          {/* Age Requirements */}
          {(vendor as VendorData).ageRequirements && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">👶</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-1">Age Requirements</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{(vendor as VendorData).ageRequirements}</p>
                </div>
              </div>
            </div>
          )}

          {/* Capacity */}
          {(vendor as VendorData).capacity && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-xl">👥</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-1">Capacity</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{(vendor as VendorData).capacity}</p>
                </div>
              </div>
            </div>
          )}

          {/* Dietary Options */}
          {(vendor as VendorData).dietaryOptions && (vendor as VendorData).dietaryOptions!.length > 0 && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">🥗</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-2">Dietary Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {(vendor as VendorData).dietaryOptions!.map((option, index) => (
                      <span 
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {vendor.contact?.website && (
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <span className="text-gray-500 text-xl">🌐</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-1">Website</h3>
                  <a 
                    href={`https://${vendor.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                  >
                    {vendor.contact.website}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileVendorDetail;
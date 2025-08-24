import React from 'react';
import { X, Heart, MapPin, Clock, Star, Phone, Mail, Globe, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCategoryColor, getCategoryIcon } from '../data/mapConfig';
import { Vendor } from '../types';

interface VendorPopupProps {
  vendor: Vendor;
}

const VendorPopup: React.FC<VendorPopupProps> = ({ vendor }) => {
  const { 
    toggleVendorPopup, 
    toggleFavorite, 
    userPrefs
  } = useStore();

  const isFavorite = userPrefs.favorites.includes(vendor.id);
  const hasVisited = userPrefs.visited.includes(vendor.id);

  const handleFavoriteToggle = () => {
    toggleFavorite(vendor.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vendor.name,
        text: vendor.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${vendor.name} - ${vendor.description}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: getCategoryColor(vendor.category) }}
              >
                {getCategoryIcon(vendor.category)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{vendor.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span 
                    className="text-xs px-2 py-1 rounded-full text-white capitalize"
                    style={{ backgroundColor: getCategoryColor(vendor.category) }}
                  >
                    {vendor.category}
                  </span>
                  {vendor.status && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  )}
                  {vendor.featured && (
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={toggleVendorPopup}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{vendor.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-4 flex items-center gap-3">
          <button
            onClick={handleFavoriteToggle}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </button>
          
          <button
            onClick={handleShare}
            className="p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            title="Share vendor"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Details */}
        <div className="px-6 pb-4 space-y-4">
          {/* Hours */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Hours</h4>
              <p className="text-gray-600">{vendor.hours}</p>
            </div>
          </div>

          {/* Special Offers */}
          {vendor.specialOffers && vendor.specialOffers.length > 0 && (
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Special Offers</h4>
                <ul className="text-gray-600 space-y-1">
                  {vendor.specialOffers.map((offer, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                      {offer}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {vendor.contact && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              
              {vendor.contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`tel:${vendor.contact.phone}`}
                    className="text-fallfest-600 hover:text-fallfest-700 underline"
                  >
                    {vendor.contact.phone}
                  </a>
                </div>
              )}
              
              {vendor.contact.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`mailto:${vendor.contact.email}`}
                    className="text-fallfest-600 hover:text-fallfest-700 underline"
                  >
                    {vendor.contact.email}
                  </a>
                </div>
              )}
              
              {vendor.contact.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a 
                    href={vendor.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fallfest-600 hover:text-fallfest-700 underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Visit Status */}
          <div className="flex items-center gap-3 pt-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Location</h4>
              <p className="text-gray-600">{vendor.location.area}</p>
            </div>
            {hasVisited && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                Visited
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Vendor ID: {vendor.id}</span>
            <span>Last updated: Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPopup; 
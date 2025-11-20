import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { formatCurrency, getEnergyRatingColor } from '../../utils/imtCalculator';
import { getPropertyStatusLabel, getPropertyStatusBadge } from '../../utils/helpers';
import clsx from 'clsx';

const PropertyCard = ({ property, onFavorite, isFavorite = false }) => {
  const primaryImage = property.images?.find(img => img.isPrimary)?.url ||
                       property.images?.[0]?.url ||
                       '/placeholder-property.jpg';

  return (
    <div className="card group overflow-hidden p-0">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/properties/${property._id}`}>
          <img
            src={primaryImage}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={clsx('badge', getPropertyStatusBadge(property.status))}>
            {getPropertyStatusLabel(property.status)}
          </span>
        </div>

        {/* Favorite Button */}
        {onFavorite && (
          <button
            onClick={() => onFavorite(property._id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <FaHeart className={isFavorite ? 'text-red-500' : 'text-gray-400'} />
          </button>
        )}

        {/* Featured Badge */}
        {property.isFeatured && (
          <div className="absolute bottom-3 left-3">
            <span className="badge bg-yellow-500 text-white">Destaque</span>
          </div>
        )}

        {/* Energy Rating */}
        {property.energyCertificate?.rating && (
          <div className="absolute bottom-3 right-3">
            <span className={clsx('badge', getEnergyRatingColor(property.energyCertificate.rating))}>
              {property.energyCertificate.rating}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(property.price)}
          </span>
        </div>

        {/* Title */}
        <Link to={`/properties/${property._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {property.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <FaMapMarkerAlt className="mr-1" />
          <span>{property.address?.city}, {property.address?.district}</span>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-gray-600 text-sm border-t pt-3">
          {property.bedrooms > 0 && (
            <div className="flex items-center space-x-1">
              <FaBed />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center space-x-1">
              <FaBath />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.squareMeters && (
            <div className="flex items-center space-x-1">
              <FaRuler />
              <span>{property.squareMeters}m²</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

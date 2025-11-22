import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaUsers, FaHome } from 'react-icons/fa';

const AgencyCard = ({ agency }) => {
  const {
    _id,
    name,
    logo,
    email,
    phone,
    address,
    isVerified,
    agents = [],
    description,
    licenseNumber
  } = agency;

  return (
    <div className="card group hover:shadow-xl transition-all duration-300">
      <Link to={`/agencies/${_id}`} className="block">
        {/* Logo and Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-primary-100 flex items-center justify-center">
                <FaHome className="w-10 h-10 text-primary-600" />
              </div>
            )}
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                <FaCheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {name}
            </h3>
            {isVerified && (
              <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                <FaCheckCircle className="w-3 h-3" />
                Agência Verificada
              </span>
            )}
            {licenseNumber && (
              <p className="text-xs text-gray-500 mt-1">
                AMI: {licenseNumber}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Location */}
        {address && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <FaMapMarkerAlt className="w-4 h-4 text-primary-500 flex-shrink-0" />
            <span className="truncate">
              {address.city ? `${address.city}, ` : ''}{address.district}
            </span>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          {email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaEnvelope className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaPhone className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>{phone}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-1 text-primary-600">
                <FaUsers className="w-4 h-4" />
                <span className="text-lg font-bold">{agents.length || 0}</span>
              </div>
              <p className="text-xs text-gray-500">Agentes</p>
            </div>
          </div>

          <Link
            to={`/agencies/${_id}`}
            className="btn-primary text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Ver Agência
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default AgencyCard;

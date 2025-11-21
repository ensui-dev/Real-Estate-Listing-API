import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaCheckCircle } from 'react-icons/fa';

const AgentCard = ({ agent }) => {
  const { _id, user, agency, specialties = [], totalSales = 0, rating = 0, isVerified } = agent;

  return (
    <div className="card group hover:shadow-xl transition-all duration-300">
      <Link to={`/agents/${_id}`} className="block">
        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={user?.profilePicture || '/default-avatar.png'}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary-100"
            />
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                <FaCheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {user?.name}
            </h3>
            {agency && (
              <p className="text-sm text-gray-600">
                {agency.name}
              </p>
            )}

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <FaStar className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Specialties */}
        {specialties.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {specialties.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{specialties.length - 3} mais
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          {user?.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaEnvelope className="w-4 h-4 text-primary-500" />
              <span className="truncate">{user.email}</span>
            </div>
          )}

          {user?.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaPhone className="w-4 h-4 text-primary-500" />
              <span>{user.phone}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{totalSales}</p>
            <p className="text-xs text-gray-500">Vendas</p>
          </div>

          <Link
            to={`/agents/${_id}`}
            className="btn-primary text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Ver Perfil
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default AgentCard;

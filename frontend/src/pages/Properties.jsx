import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from '../components/property/PropertyCard';
import Loading from '../components/common/Loading';
import { PORTUGUESE_DISTRICTS } from '../utils/districts';
import { PROPERTY_TYPES } from '../utils/constants';
import { FaHome, FaFilter, FaTimes } from 'react-icons/fa';

const Properties = () => {
  const [filters, setFilters] = useState({
    district: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    page: 1
  });

  const { data, isLoading, error } = useProperties(filters);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1
    });
  };

  const clearFilters = () => {
    setFilters({
      district: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      page: 1
    });
  };

  const hasActiveFilters = filters.district || filters.propertyType || filters.minPrice || filters.maxPrice || filters.bedrooms;

  if (isLoading) return <Loading fullScreen />;
  if (error) return <div className="text-center py-12 pt-28 text-red-600">Erro ao carregar imóveis</div>;

  const properties = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="min-h-screen bg-sand-50 pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Imóveis em Portugal</h1>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-primary-600">{total}</span> imóveis encontrados
          </p>
        </div>

        {/* Filters Card */}
        <div className="card rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <FaFilter className="text-primary-600" />
              <span className="font-semibold">Filtros</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                <FaTimes />
                Limpar Filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distrito
              </label>
              <select
                name="district"
                value={filters.district}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Todos</option>
                {PORTUGUESE_DISTRICTS.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Todos</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Mínimo
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="€0"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Máximo
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Sem limite"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quartos
              </label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={clearFilters}
              className="btn-secondary"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Property Grid */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Págination placeholder - can be enhanced */}
            {data?.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="card rounded-2xl inline-flex items-center gap-2 px-6 py-3">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={filters.page === 1}
                    className="btn-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <span className="px-4 text-gray-600">
                    Página <span className="font-semibold text-primary-600">{filters.page}</span> de {data.totalPages}
                  </span>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, page: Math.min(data.totalPages, prev.page + 1) }))}
                    disabled={filters.page === data.totalPages}
                    className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proxima
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="card rounded-2xl text-center py-16">
            <FaHome className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">Nenhum imóvel encontrado</p>
            <p className="text-gray-500">Tente ajustar os filtros selecionados</p>
            <button
              onClick={clearFilters}
              className="btn-primary mt-6"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;

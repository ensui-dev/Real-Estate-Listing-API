import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from '../components/property/PropertyCard';
import Loading from '../components/common/Loading';
import { PORTUGUESE_DISTRICTS } from '../utils/districts';
import { PROPERTY_TYPES } from '../utils/constants';

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

  if (isLoading) return <Loading fullScreen />;
  if (error) return <div className="text-center py-12 text-red-600">Erro ao carregar imóveis</div>;

  const properties = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Imóveis em Portugal</h1>
        <p className="text-gray-600">{total} imóveis encontrados</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

        <div className="mt-4 flex justify-end">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nenhum imóvel encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
};

export default Properties;

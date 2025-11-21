import React, { useState, useEffect } from 'react';
import { agenciesAPI } from '../api/agencies';
import AgencyCard from '../components/agency/AgencyCard';
import Loading from '../components/common/Loading';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { PORTUGUESE_DISTRICTS } from '../utils/districts';

const Agencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    district: '',
    isVerified: '',
    sortBy: 'name'
  });

  useEffect(() => {
    fetchAgencies();
  }, [filters]);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      const response = await agenciesAPI.getAgencies(filters);
      if (response.success) {
        setAgencies(response.data);
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
      toast.error('Erro ao carregar agências');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAgencies();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredAgencies = agencies.filter(agency => {
    if (!searchTerm) return true;
    const name = agency.name?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return name.includes(search);
  });

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Agências Imobiliárias
          </h1>
          <p className="text-gray-600">
            Conheça as melhores agências de Portugal
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-12 w-full"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-2" />
                Distrito
              </label>
              <select
                name="district"
                value={filters.district}
                onChange={handleFilterChange}
                className="input w-full"
              >
                <option value="">Todos os Distritos</option>
                {PORTUGUESE_DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verificada
              </label>
              <select
                name="isVerified"
                value={filters.isVerified}
                onChange={handleFilterChange}
                className="input w-full"
              >
                <option value="">Todas</option>
                <option value="true">Apenas Verificadas</option>
                <option value="false">Não Verificadas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="input w-full"
              >
                <option value="name">Nome</option>
                <option value="agents">Nº de Agentes</option>
                <option value="createdAt">Mais Recentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredAgencies.length} {filteredAgencies.length === 1 ? 'agência encontrada' : 'agências encontradas'}
          </p>
        </div>

        {/* Agencies Grid */}
        {filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <AgencyCard key={agency._id} agency={agency} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma agência encontrada</p>
            <p className="text-gray-400 mt-2">Tente ajustar os filtros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agencies;

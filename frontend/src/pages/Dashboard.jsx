import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMyProperties } from '../hooks/useProperties';
import PropertyCard from '../components/property/PropertyCard';
import Loading from '../components/common/Loading';
import { FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: propertiesData, isLoading } = useMyProperties();

  const properties = propertiesData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Olá, {user?.name}!
        </h1>
        <p className="text-gray-600">Bem-vindo ao seu painel</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium mb-1">Meus Imóveis</h3>
          <p className="text-3xl font-bold text-primary-600">{properties.length}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium mb-1">Tipo de Conta</h3>
          <p className="text-3xl font-bold text-gray-900 capitalize">{user?.role}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium mb-1">Email</h3>
          <p className="text-lg text-gray-700">{user?.email}</p>
        </div>
      </div>

      {/* My Properties */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Meus Imóveis</h2>
          <Link to="/properties/create" className="btn-primary flex items-center space-x-2">
            <FaPlus />
            <span>Adicionar Imóvel</span>
          </Link>
        </div>

        {isLoading ? (
          <Loading />
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">Ainda não tem imóveis anunciados</p>
            <Link to="/properties/create" className="btn-primary inline-block">
              Adicionar Primeiro Imóvel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMyProperties } from '../hooks/useProperties';
import PropertyCard from '../components/property/PropertyCard';
import Loading from '../components/common/Loading';
import { FaPlus, FaHome, FaEye, FaHeart, FaBuilding } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: propertiesData, isLoading } = useMyProperties();

  const properties = propertiesData?.data || [];

  // Calculate stats
  const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalFavorites = properties.reduce((sum, p) => sum + (p.favorites?.length || 0), 0);

  return (
    <div className="bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-stone-800 mb-2">
            Olá, <span className="bg-gradient-to-r from-primary-600 to-terracotta-600 bg-clip-text text-transparent">{user?.name}</span>!
          </h1>
          <p className="text-stone-600 text-lg">Bem-vindo ao seu painel de controlo</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Properties Count */}
          <div className="card rounded-2xl hover:shadow-float transition-all duration-300 border-l-4 border-primary-600 group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-stone-500 text-sm font-medium mb-1">Meus Imóveis</h3>
                <p className="text-4xl font-display font-bold text-primary-600">{properties.length}</p>
              </div>
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <FaHome className="text-2xl text-primary-600" />
              </div>
            </div>
          </div>

          {/* Views */}
          <div className="card rounded-2xl hover:shadow-float transition-all duration-300 border-l-4 border-terracotta-600 group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-stone-500 text-sm font-medium mb-1">Visualizações</h3>
                <p className="text-4xl font-display font-bold text-terracotta-600">{totalViews}</p>
              </div>
              <div className="w-14 h-14 bg-terracotta-100 rounded-2xl flex items-center justify-center group-hover:bg-terracotta-200 transition-colors">
                <FaEye className="text-2xl text-terracotta-600" />
              </div>
            </div>
          </div>

          {/* Favorites */}
          <div className="card rounded-2xl hover:shadow-float transition-all duration-300 border-l-4 border-golden-600 group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-stone-500 text-sm font-medium mb-1">Favoritos</h3>
                <p className="text-4xl font-display font-bold text-golden-600">{totalFavorites}</p>
              </div>
              <div className="w-14 h-14 bg-golden-100 rounded-2xl flex items-center justify-center group-hover:bg-golden-200 transition-colors">
                <FaHeart className="text-2xl text-golden-600" />
              </div>
            </div>
          </div>
        </div>

        {/* My Properties Section */}
        <div className="card rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-800">Meus Imóveis</h2>
              <p className="text-stone-500 mt-1">Gerir os seus anúncios de imóveis</p>
            </div>
            <Link
              to="/properties/add"
              className="btn-primary flex items-center space-x-2 shadow-lg hover:shadow-float transition-all duration-300"
            >
              <FaPlus />
              <span>Adicionar Imóvel</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="py-12">
              <Loading />
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property._id} property={property} showApprovalStatus={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBuilding className="text-3xl text-primary-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-stone-800 mb-2">
                Ainda não tem imóveis anunciados
              </h3>
              <p className="text-stone-500 mb-8 max-w-md mx-auto">
                Comece a anunciar os seus imóveis e alcance milhares de potenciais compradores e arrendatários.
              </p>
              <Link
                to="/properties/add"
                className="btn-primary inline-flex items-center space-x-2 shadow-lg hover:shadow-float transition-all duration-300"
              >
                <FaPlus />
                <span>Adicionar Primeiro Imóvel</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

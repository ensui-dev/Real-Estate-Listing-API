import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../api/admin';
import Loading from '../../components/common/Loading';
import {
  FaUsers,
  FaHome,
  FaBuilding,
  FaUserTie,
  FaEnvelope,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaArrowRight,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Erro ao carregar dados do painel');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const { overview, recentActivity, distributions, performance, recent } = dashboardData || {};

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
              <p className="text-gray-600">
                Visão geral do sistema e estatísticas
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            to="/admin/properties"
            className="card rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3 p-5 group border-l-4 border-green-500"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaHome className="text-xl text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900">Imóveis</span>
              <p className="text-xs text-gray-500">Gerir propriedades</p>
            </div>
          </Link>
          <Link
            to="/admin/users"
            className="card rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3 p-5 group border-l-4 border-blue-500"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaUsers className="text-xl text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900">Utilizadores</span>
              <p className="text-xs text-gray-500">Gerir contas</p>
            </div>
          </Link>
          <Link
            to="/admin/inquiries"
            className="card rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3 p-5 group border-l-4 border-red-500"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaEnvelope className="text-xl text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900">Pedidos</span>
              <p className="text-xs text-gray-500">Ver mensagens</p>
            </div>
          </Link>
          <Link
            to="/admin/properties?approvalStatus=pending"
            className="card rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3 p-5 group border-l-4 border-yellow-500"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaClock className="text-xl text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900">Aprovacoes</span>
              <p className="text-xs text-gray-500">Pendentes</p>
            </div>
          </Link>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FaUsers}
            label="Total de Utilizadores"
            value={overview?.totalUsers || 0}
            color="blue"
            subtitle={`${recentActivity?.newUsersThisMonth || 0} novos este mes`}
          />
          <StatCard
            icon={FaHome}
            label="Total de Imóveis"
            value={overview?.totalProperties || 0}
            color="green"
            subtitle={`${recentActivity?.newPropertiesThisWeek || 0} novos esta semana`}
          />
          <StatCard
            icon={FaBuilding}
            label="Agencias"
            value={overview?.totalAgencies || 0}
            color="purple"
            subtitle={`${performance?.agency?.totalActive || 0} ativas`}
          />
          <StatCard
            icon={FaUserTie}
            label="Agentes"
            value={overview?.totalAgents || 0}
            color="orange"
            subtitle={`${performance?.agent?.totalActive || 0} ativos`}
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ActionCard
            icon={FaClock}
            label="Aguardando Aprovacao"
            value={overview?.pendingApproval || 0}
            color="yellow"
            link="/admin/properties?status=pending"
            linkText="Gerir Aprovacoes"
          />
          <ActionCard
            icon={FaEnvelope}
            label="Pedidos Pendentes"
            value={overview?.pendingInquiries || 0}
            color="red"
            link="/admin/inquiries"
            linkText="Ver Pedidos"
          />
          <ActionCard
            icon={FaCheckCircle}
            label="Imóveis Ativos"
            value={overview?.activeProperties || 0}
            color="green"
            link="/admin/properties"
            linkText="Ver Todos"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Distribution */}
          <div className="card rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Distribuição de Utilizadores por Tipo
            </h3>
            <div className="space-y-3">
              {distributions?.usersByRole?.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getRoleColorClass(item._id)}`}></div>
                    <span className="text-gray-700 capitalize font-medium">{item._id}</span>
                  </div>
                  <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property Status */}
          <div className="card rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Imóveis por Estado
            </h3>
            <div className="space-y-3">
              {distributions?.propertiesByStatus?.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColorClass(item._id)}`}></div>
                    <span className="text-gray-700 font-medium">{getStatusLabel(item._id)}</span>
                  </div>
                  <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Districts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Distritos com Mais Imóveis
            </h3>
            <div className="space-y-3">
              {distributions?.propertiesByDistrict?.slice(0, 5).map((item, index) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-sand-100 text-gray-500'
                    }`}>#{index + 1}</span>
                    <span className="text-gray-700 font-medium">{item._id || 'Nao especificado'}</span>
                  </div>
                  <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preço Médio por Distrito
            </h3>
            <div className="space-y-3">
              {distributions?.avgPriceByDistrict?.slice(0, 5).map((item, index) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-sand-100 text-gray-500'
                    }`}>#{index + 1}</span>
                    <span className="text-gray-700 font-medium">{item._id || 'Nao especificado'}</span>
                  </div>
                  <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
                    {new Intl.NumberFormat('pt-PT', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 0
                    }).format(item.avgPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Properties */}
          <div className="card rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Imóveis Recentes
              </h3>
              <Link to="/admin/properties" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 group">
                <span>Ver Todos</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-3">
              {recent?.properties?.slice(0, 5).map((property) => (
                <div key={property._id} className="flex items-start space-x-3 p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {property.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {property.address?.city} - {property.address?.district}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-bold text-primary-600">
                      {new Intl.NumberFormat('pt-PT', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0
                      }).format(property.price)}
                    </p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(property.status)}`}>
                      {getStatusLabel(property.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="card rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Pedidos Recentes
              </h3>
              <Link to="/admin/inquiries" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 group">
                <span>Ver Todos</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-3">
              {recent?.inquiries?.slice(0, 5).map((inquiry) => (
                <div key={inquiry._id} className="flex items-start space-x-3 p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {inquiry.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {inquiry.email}
                    </p>
                    {inquiry.property && (
                      <p className="text-xs text-gray-400 truncate mt-1">
                        {inquiry.property.title}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      inquiry.status === 'pending' ? 'badge-warning' : 'badge-success'
                    }`}>
                      {inquiry.status === 'pending' ? 'Pendente' : 'Respondido'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card rounded-2xl text-center bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FaStar className="text-2xl text-white" />
            </div>
            <h4 className="text-sm text-gray-600 mb-1">Avaliação Média Agências</h4>
            <p className="text-3xl font-bold text-gray-900">
              {performance?.agency?.avgRating?.toFixed(1) || 'N/A'}
            </p>
          </div>
          <div className="card rounded-2xl text-center bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FaStar className="text-2xl text-white" />
            </div>
            <h4 className="text-sm text-gray-600 mb-1">Avaliação Média Agentes</h4>
            <p className="text-3xl font-bold text-gray-900">
              {performance?.agent?.avgRating?.toFixed(1) || 'N/A'}
            </p>
          </div>
          <div className="card rounded-2xl text-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FaEnvelope className="text-2xl text-white" />
            </div>
            <h4 className="text-sm text-gray-600 mb-1">Total de Consultas</h4>
            <p className="text-3xl font-bold text-gray-900">
              {overview?.totalInquiries || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color, subtitle }) => {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600'
  };

  const borderColors = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    orange: 'border-orange-500'
  };

  return (
    <div className={`card rounded-2xl border-t-4 ${borderColors[color]} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center space-x-4">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="text-2xl text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ icon: Icon, label, value, color, link, linkText }) => {
  const colorClasses = {
    yellow: 'from-yellow-400 to-orange-500 border-yellow-400',
    red: 'from-red-400 to-red-600 border-red-400',
    green: 'from-green-400 to-green-600 border-green-400'
  };

  const bgClasses = {
    yellow: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    red: 'bg-gradient-to-br from-red-50 to-rose-50',
    green: 'bg-gradient-to-br from-green-50 to-emerald-50'
  };

  return (
    <div className={`card rounded-2xl border-l-4 ${colorClasses[color].split(' ')[2]} ${bgClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color].replace(colorClasses[color].split(' ')[2], '')}`}>
          <Icon className="text-2xl text-white" />
        </div>
        <span className="text-4xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">{label}</h3>
      <Link to={link} className="btn-primary inline-flex items-center space-x-2 text-sm py-2 px-4">
        <span>{linkText}</span>
        <FaArrowRight className="text-xs" />
      </Link>
    </div>
  );
};

// Helper Functions
const getRoleColorClass = (role) => {
  const colors = {
    admin: 'bg-red-500',
    agent: 'bg-blue-500',
    seller: 'bg-green-500',
    buyer: 'bg-purple-500'
  };
  return colors[role] || 'bg-gray-500';
};

const getStatusColorClass = (status) => {
  const colors = {
    'for-sale': 'bg-green-500',
    'for-rent': 'bg-blue-500',
    'sold': 'bg-gray-500',
    'rented': 'bg-gray-500',
    'pending': 'bg-yellow-500',
    'draft': 'bg-orange-500'
  };
  return colors[status] || 'bg-gray-500';
};

const getStatusLabel = (status) => {
  const labels = {
    'for-sale': 'A Venda',
    'for-rent': 'Para Arrendar',
    'sold': 'Vendido',
    'rented': 'Arrendado',
    'pending': 'Pendente',
    'draft': 'Rascunho'
  };
  return labels[status] || status;
};

const getStatusBadge = (status) => {
  const badges = {
    'for-sale': 'badge-success',
    'for-rent': 'badge-info',
    'sold': 'bg-gray-100 text-gray-800',
    'rented': 'bg-gray-100 text-gray-800',
    'pending': 'badge-warning',
    'draft': 'bg-orange-100 text-orange-800'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

export default AdminDashboard;

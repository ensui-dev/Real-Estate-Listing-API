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
  FaExclamationCircle
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Painel Administrativo
        </h1>
        <p className="text-gray-600">
          Visão geral do sistema e estatísticas
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaUsers}
          label="Total de Utilizadores"
          value={overview?.totalUsers || 0}
          color="blue"
          subtitle={`${recentActivity?.newUsersThisMonth || 0} novos este mês`}
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
          label="Agências"
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
          label="Aguardando Aprovação"
          value={overview?.pendingApproval || 0}
          color="yellow"
          link="/admin/properties?status=pending"
          linkText="Gerir Aprovações"
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
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição de Utilizadores por Tipo
          </h3>
          <div className="space-y-3">
            {distributions?.usersByRole?.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${getRoleColor(item._id)}-500`}></div>
                  <span className="text-gray-700 capitalize">{item._id}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Imóveis por Estado
          </h3>
          <div className="space-y-3">
            {distributions?.propertiesByStatus?.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${getStatusColor(item._id)}-500`}></div>
                  <span className="text-gray-700">{getStatusLabel(item._id)}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Districts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distritos com Mais Imóveis
          </h3>
          <div className="space-y-3">
            {distributions?.propertiesByDistrict?.slice(0, 5).map((item, index) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                  <span className="text-gray-700">{item._id || 'Não especificado'}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Preço Médio por Distrito
          </h3>
          <div className="space-y-3">
            {distributions?.avgPriceByDistrict?.slice(0, 5).map((item, index) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                  <span className="text-gray-700">{item._id || 'Não especificado'}</span>
                </div>
                <span className="font-semibold text-primary-600">
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
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Imóveis Recentes
            </h3>
            <Link to="/admin/properties" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver Todos
            </Link>
          </div>
          <div className="space-y-3">
            {recent?.properties?.slice(0, 5).map((property) => (
              <div key={property._id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {property.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {property.address?.city} • {property.address?.district}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-primary-600">
                    {new Intl.NumberFormat('pt-PT', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 0
                    }).format(property.price)}
                  </p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(property.status)}`}>
                    {getStatusLabel(property.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Pedidos Recentes
            </h3>
            <Link to="/admin/inquiries" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver Todos
            </Link>
          </div>
          <div className="space-y-3">
            {recent?.inquiries?.slice(0, 5).map((inquiry) => (
              <div key={inquiry._id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
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
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
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
        <div className="card text-center">
          <FaStar className="text-4xl text-yellow-500 mx-auto mb-2" />
          <h4 className="text-sm text-gray-600 mb-1">Avaliação Média Agências</h4>
          <p className="text-2xl font-bold text-gray-900">
            {performance?.agency?.avgRating?.toFixed(1) || 'N/A'}
          </p>
        </div>
        <div className="card text-center">
          <FaStar className="text-4xl text-yellow-500 mx-auto mb-2" />
          <h4 className="text-sm text-gray-600 mb-1">Avaliação Média Agentes</h4>
          <p className="text-2xl font-bold text-gray-900">
            {performance?.agent?.avgRating?.toFixed(1) || 'N/A'}
          </p>
        </div>
        <div className="card text-center">
          <FaEnvelope className="text-4xl text-blue-500 mx-auto mb-2" />
          <h4 className="text-sm text-gray-600 mb-1">Total de Consultas</h4>
          <p className="text-2xl font-bold text-gray-900">
            {overview?.totalInquiries || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color, subtitle }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="text-2xl" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ icon: Icon, label, value, color, link, linkText }) => {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    green: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className={`card border-l-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <Icon className="text-3xl" />
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <h3 className="text-sm font-medium mb-2">{label}</h3>
      <Link to={link} className="text-sm font-medium hover:underline">
        {linkText} →
      </Link>
    </div>
  );
};

// Helper Functions
const getRoleColor = (role) => {
  const colors = {
    admin: 'red',
    agent: 'blue',
    seller: 'green',
    buyer: 'purple'
  };
  return colors[role] || 'gray';
};

const getStatusColor = (status) => {
  const colors = {
    'for-sale': 'green',
    'for-rent': 'blue',
    'sold': 'gray',
    'rented': 'gray',
    'pending': 'yellow',
    'draft': 'orange'
  };
  return colors[status] || 'gray';
};

const getStatusLabel = (status) => {
  const labels = {
    'for-sale': 'À Venda',
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
    'for-sale': 'bg-green-100 text-green-800',
    'for-rent': 'bg-blue-100 text-blue-800',
    'sold': 'bg-gray-100 text-gray-800',
    'rented': 'bg-gray-100 text-gray-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'draft': 'bg-orange-100 text-orange-800'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

export default AdminDashboard;

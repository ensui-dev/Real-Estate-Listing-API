import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaTrash,
  FaFilter,
  FaCheckDouble
} from 'react-icons/fa';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    approvalStatus: '',
    district: '',
    propertyType: '',
    page: 1
  });
  const [pagination, setPagination] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectPropertyId, setRejectPropertyId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAdminProperties(filters);
      setProperties(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Erro ao carregar imóveis');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (propertyId) => {
    if (!confirm('Tem a certeza que deseja aprovar este imóvel?')) return;

    try {
      await adminAPI.approveProperty(propertyId);
      toast.success('Imóvel aprovado com sucesso!');
      fetchProperties();
    } catch (error) {
      console.error('Error approving property:', error);
      toast.error('Erro ao aprovar imóvel');
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Por favor, forneça um motivo para a rejeição');
      return;
    }

    try {
      await adminAPI.rejectProperty(rejectPropertyId, rejectionReason);
      toast.success('Imóvel rejeitado');
      setShowRejectModal(false);
      setRejectPropertyId(null);
      setRejectionReason('');
      fetchProperties();
    } catch (error) {
      console.error('Error rejecting property:', error);
      toast.error('Erro ao rejeitar imóvel');
    }
  };

  const handleBulkApprove = async () => {
    if (selectedProperties.length === 0) {
      toast.error('Selecione pelo menos um imóvel');
      return;
    }

    if (!confirm(`Aprovar ${selectedProperties.length} imóveis?`)) return;

    try {
      await adminAPI.bulkApproveProperties(selectedProperties);
      toast.success(`${selectedProperties.length} imóveis aprovados!`);
      setSelectedProperties([]);
      fetchProperties();
    } catch (error) {
      console.error('Error bulk approving:', error);
      toast.error('Erro ao aprovar imóveis em massa');
    }
  };

  const handleDelete = async (propertyId) => {
    if (!confirm('Tem a certeza que deseja eliminar este imóvel? Esta ação não pode ser revertida.')) return;

    try {
      await adminAPI.deleteProperty(propertyId);
      toast.success('Imóvel eliminado');
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Erro ao eliminar imóvel');
    }
  };

  const togglePropertySelection = (propertyId) => {
    setSelectedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProperties.length === properties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(properties.map(p => p._id));
    }
  };

  const openRejectModal = (propertyId) => {
    setRejectPropertyId(propertyId);
    setShowRejectModal(true);
  };

  if (loading && properties.length === 0) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestão de Imóveis
          </h1>
          <p className="text-gray-600">
            {pagination.total || 0} imóveis no total
          </p>
        </div>
        {selectedProperties.length > 0 && (
          <button
            onClick={handleBulkApprove}
            className="btn-primary flex items-center space-x-2"
          >
            <FaCheckDouble />
            <span>Aprovar Selecionados ({selectedProperties.length})</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <FaFilter className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.approvalStatus}
            onChange={(e) => setFilters({ ...filters, approvalStatus: e.target.value, page: 1 })}
            className="input-field"
          >
            <option value="">Todos os Estados de Aprovação</option>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="rejected">Rejeitado</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="input-field"
          >
            <option value="">Todos os Estados</option>
            <option value="for-sale">À Venda</option>
            <option value="for-rent">Para Arrendar</option>
            <option value="sold">Vendido</option>
            <option value="rented">Arrendado</option>
            <option value="draft">Rascunho</option>
          </select>

          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value, page: 1 })}
            className="input-field"
          >
            <option value="">Todos os Tipos</option>
            <option value="apartment">Apartamento</option>
            <option value="house">Casa</option>
            <option value="villa">Moradia</option>
            <option value="commercial">Comercial</option>
            <option value="land">Terreno</option>
          </select>

          <button
            onClick={() => setFilters({ status: '', approvalStatus: '', district: '', propertyType: '', page: 1 })}
            className="btn-secondary"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProperties.length === properties.length && properties.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imóvel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proprietário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aprovação
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property._id)}
                      onChange={() => togglePropertySelection(property._id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0].url}
                          alt={property.title}
                          className="h-12 w-12 rounded object-cover mr-3"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded mr-3 flex items-center justify-center">
                          <FaEye className="text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">
                          {property.address?.city}, {property.address?.district}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{property.owner?.name}</div>
                    <div className="text-sm text-gray-500">{property.owner?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {new Intl.NumberFormat('pt-PT', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0
                      }).format(property.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getStatusBadge(property.status)
                    }`}>
                      {getStatusLabel(property.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getApprovalBadge(property.approvalStatus)
                    }`}>
                      {getApprovalLabel(property.approvalStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {property.approvalStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(property._id)}
                            className="text-green-600 hover:text-green-900"
                            title="Aprovar"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => openRejectModal(property._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Rejeitar"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <a
                        href={`/properties/${property._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver"
                      >
                        <FaEye />
                      </a>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page === 1}
                className="btn-secondary"
              >
                Anterior
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page === pagination.pages}
                className="btn-secondary"
              >
                Próxima
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Página <span className="font-medium">{pagination.page}</span> de{' '}
                  <span className="font-medium">{pagination.pages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                    disabled={filters.page === 1}
                    className="btn-secondary rounded-r-none"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                    disabled={filters.page === pagination.pages}
                    className="btn-secondary rounded-l-none"
                  >
                    Próxima
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Rejeitar Imóvel
              </h3>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Motivo da rejeição..."
                className="input-field w-full h-32 resize-none"
                autoFocus
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectPropertyId(null);
                    setRejectionReason('');
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button onClick={handleReject} className="btn-danger">
                  Rejeitar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Functions
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

const getApprovalLabel = (status) => {
  const labels = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado'
  };
  return labels[status] || status;
};

const getApprovalBadge = (status) => {
  const badges = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

export default AdminProperties;

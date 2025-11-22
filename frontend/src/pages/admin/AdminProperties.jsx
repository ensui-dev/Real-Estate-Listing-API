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
  FaCheckDouble,
  FaHome,
  FaBuilding
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
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <FaHome className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Imóveis
              </h1>
              <p className="text-gray-600">
                {pagination.total || 0} imóveis no total
              </p>
            </div>
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
        <div className="card rounded-2xl mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <FaFilter className="text-white text-sm" />
            </div>
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
              <option value="for-sale">A Venda</option>
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
        <div className="card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-sand-100 to-sand-50">
                <tr>
                  <th className="px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProperties.length === properties.length && properties.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Imóvel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Proprietario
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aprovação
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-sand-50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(property._id)}
                        onChange={() => togglePropertySelection(property._id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0].url}
                            alt={property.title}
                            className="h-14 w-14 rounded-xl object-cover mr-4 shadow-sm"
                          />
                        ) : (
                          <div className="h-14 w-14 bg-gradient-to-br from-sand-200 to-sand-300 rounded-xl mr-4 flex items-center justify-center">
                            <FaBuilding className="text-sand-500" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">
                            {property.address?.city}, {property.address?.district}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{property.owner?.name}</div>
                      <div className="text-sm text-gray-500">{property.owner?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg inline-block">
                        {new Intl.NumberFormat('pt-PT', {
                          style: 'currency',
                          currency: 'EUR',
                          maximumFractionDigits: 0
                        }).format(property.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getStatusBadge(property.status)
                      }`}>
                        {getStatusLabel(property.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                              className="w-9 h-9 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg flex items-center justify-center transition-colors"
                              title="Aprovar"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => openRejectModal(property._id)}
                              className="w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
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
                          className="w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                          title="Ver"
                        >
                          <FaEye />
                        </a>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
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
            <div className="bg-sand-50 px-6 py-4 flex items-center justify-between border-t border-sand-100">
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
                  Proxima
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Pagina <span className="font-semibold">{pagination.page}</span> de{' '}
                    <span className="font-semibold">{pagination.pages}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
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
                    Proxima
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-6 border max-w-md w-full shadow-2xl rounded-2xl bg-white">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectPropertyId(null);
                  setRejectionReason('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaTimes className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Rejeitar Imóvel
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Por favor, forneça um motivo para a rejeição
                </p>
              </div>

              <div className="mb-6">
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Motivo da rejeicao..."
                  className="input-field w-full h-32 resize-none"
                  autoFocus
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectPropertyId(null);
                    setRejectionReason('');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
                <button onClick={handleReject} className="btn-danger flex-1">
                  Rejeitar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Functions
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
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-danger'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

export default AdminProperties;

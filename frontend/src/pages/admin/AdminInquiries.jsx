import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaUser,
  FaHome,
  FaCalendar,
  FaReply,
  FaTrash,
  FaCheck,
  FaSearch,
  FaFilter,
  FaEye,
  FaTimes
} from 'react-icons/fa';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    inquiryType: '',
    search: '',
    page: 1
  });
  const [pagination, setPagination] = useState({});
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [filters]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getInquiries(filters);
      setInquiries(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total
      });
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  const handleRespond = async () => {
    if (!responseText.trim()) {
      toast.error('Por favor, escreva uma resposta');
      return;
    }

    try {
      await adminAPI.respondToInquiry(selectedInquiry._id, responseText);
      toast.success('Resposta enviada com sucesso!');
      setShowResponseModal(false);
      setSelectedInquiry(null);
      setResponseText('');
      fetchInquiries();
    } catch (error) {
      console.error('Error responding to inquiry:', error);
      toast.error('Erro ao enviar resposta');
    }
  };

  const handleClose = async (inquiryId) => {
    if (!confirm('Tem a certeza que deseja fechar este pedido?')) return;

    try {
      await adminAPI.closeInquiry(inquiryId);
      toast.success('Pedido fechado');
      fetchInquiries();
    } catch (error) {
      console.error('Error closing inquiry:', error);
      toast.error('Erro ao fechar pedido');
    }
  };

  const handleDelete = async (inquiryId) => {
    if (!confirm('Tem a certeza que deseja eliminar este pedido? Esta ação não pode ser revertida.')) return;

    try {
      await adminAPI.deleteInquiry(inquiryId);
      toast.success('Pedido eliminado');
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Erro ao eliminar pedido');
    }
  };

  const openResponseModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setResponseText(inquiry.response || '');
    setShowResponseModal(true);
  };

  const openDetailModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailModal(true);
  };

  if (loading && inquiries.length === 0) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestão de Pedidos
        </h1>
        <p className="text-gray-600">
          {pagination.total || 0} pedidos no total
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900">
                {inquiries.filter(i => i.status === 'pending').length}
              </p>
            </div>
            <FaEnvelope className="text-3xl text-yellow-500" />
          </div>
        </div>

        <div className="card border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Respondidos</p>
              <p className="text-2xl font-bold text-gray-900">
                {inquiries.filter(i => i.status === 'responded').length}
              </p>
            </div>
            <FaCheck className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="card border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fechados</p>
              <p className="text-2xl font-bold text-gray-900">
                {inquiries.filter(i => i.status === 'closed').length}
              </p>
            </div>
            <FaTimes className="text-3xl text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <FaFilter className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Pesquisar por nome, email ou mensagem..."
                className="input-field pl-10"
              />
            </div>
          </form>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="input-field"
          >
            <option value="">Todos os Estados</option>
            <option value="pending">Pendente</option>
            <option value="responded">Respondido</option>
            <option value="closed">Fechado</option>
          </select>

          {/* Type Filter */}
          <select
            value={filters.inquiryType}
            onChange={(e) => setFilters({ ...filters, inquiryType: e.target.value, page: 1 })}
            className="input-field"
          >
            <option value="">Todos os Tipos</option>
            <option value="viewing">Visita</option>
            <option value="information">Informação</option>
            <option value="offer">Proposta</option>
            <option value="general">Geral</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imóvel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <FaUser className="text-primary-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                        <div className="text-sm text-gray-500">{inquiry.email}</div>
                        {inquiry.phone && (
                          <div className="text-xs text-gray-400">{inquiry.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {inquiry.property ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {inquiry.property.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {inquiry.property.address?.city}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getTypeBadge(inquiry.inquiryType)
                    }`}>
                      {getTypeLabel(inquiry.inquiryType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getStatusBadge(inquiry.status)
                    }`}>
                      {getStatusLabel(inquiry.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <FaCalendar className="mr-2 text-gray-400" />
                      {new Date(inquiry.createdAt).toLocaleDateString('pt-PT')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openDetailModal(inquiry)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver Detalhes"
                      >
                        <FaEye />
                      </button>
                      {inquiry.status !== 'closed' && (
                        <button
                          onClick={() => openResponseModal(inquiry)}
                          className="text-green-600 hover:text-green-900"
                          title="Responder"
                        >
                          <FaReply />
                        </button>
                      )}
                      {inquiry.status === 'responded' && (
                        <button
                          onClick={() => handleClose(inquiry._id)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Fechar"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(inquiry._id)}
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

        {inquiries.length === 0 && (
          <div className="text-center py-12">
            <FaEnvelope className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum pedido encontrado</p>
          </div>
        )}

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

      {/* Detail Modal */}
      {showDetailModal && selectedInquiry && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border max-w-lg shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Detalhes do Pedido
                </h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedInquiry(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Contacto</h4>
                  <p className="text-sm"><strong>Nome:</strong> {selectedInquiry.name}</p>
                  <p className="text-sm"><strong>Email:</strong> {selectedInquiry.email}</p>
                  {selectedInquiry.phone && (
                    <p className="text-sm"><strong>Telefone:</strong> {selectedInquiry.phone}</p>
                  )}
                </div>

                {selectedInquiry.property && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Imóvel</h4>
                    <p className="text-sm font-medium">{selectedInquiry.property.title}</p>
                    {selectedInquiry.property.address && (
                      <p className="text-xs text-gray-500">
                        {selectedInquiry.property.address.city}, {selectedInquiry.property.address.district}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Mensagem</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {selectedInquiry.message}
                  </p>
                </div>

                {selectedInquiry.response && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Resposta</h4>
                    <p className="text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
                      {selectedInquiry.response}
                    </p>
                    {selectedInquiry.respondedAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        Respondido em: {new Date(selectedInquiry.respondedAt).toLocaleString('pt-PT')}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Tipo: {getTypeLabel(selectedInquiry.inquiryType)}</span>
                  <span>Estado: {getStatusLabel(selectedInquiry.status)}</span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedInquiry(null);
                  }}
                  className="btn-secondary"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedInquiry && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border max-w-lg shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Responder ao Pedido
              </h3>

              <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>De:</strong> {selectedInquiry.name} ({selectedInquiry.email})
                </p>
                {selectedInquiry.property && (
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Imóvel:</strong> {selectedInquiry.property.title}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2 italic">
                  "{selectedInquiry.message}"
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sua Resposta
                </label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Escreva sua resposta aqui..."
                  className="input-field w-full h-32 resize-none"
                  autoFocus
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedInquiry(null);
                    setResponseText('');
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button onClick={handleRespond} className="btn-primary">
                  Enviar Resposta
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
    pending: 'Pendente',
    responded: 'Respondido',
    closed: 'Fechado'
  };
  return labels[status] || status;
};

const getStatusBadge = (status) => {
  const badges = {
    pending: 'bg-yellow-100 text-yellow-800',
    responded: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

const getTypeLabel = (type) => {
  const labels = {
    viewing: 'Visita',
    information: 'Informação',
    offer: 'Proposta',
    general: 'Geral'
  };
  return labels[type] || type || 'Geral';
};

const getTypeBadge = (type) => {
  const badges = {
    viewing: 'bg-blue-100 text-blue-800',
    information: 'bg-purple-100 text-purple-800',
    offer: 'bg-green-100 text-green-800',
    general: 'bg-gray-100 text-gray-800'
  };
  return badges[type] || 'bg-gray-100 text-gray-800';
};

export default AdminInquiries;

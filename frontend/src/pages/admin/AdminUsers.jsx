import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaCalendar,
  FaTrash,
  FaEdit,
  FaSearch,
  FaUsers,
  FaUserShield,
  FaTimes
} from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: '',
    search: '',
    page: 1
  });
  const [pagination, setPagination] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUsers(filters);
      setUsers(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao carregar utilizadores');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  const handleUpdateRole = async () => {
    if (!newRole) {
      toast.error('Selecione um papel');
      return;
    }

    try {
      await adminAPI.updateUserRole(editingUser._id, newRole);
      toast.success('Papel de utilizador atualizado com sucesso!');
      setEditingUser(null);
      setNewRole('');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Erro ao atualizar papel de utilizador');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Tem a certeza que deseja eliminar o utilizador "${userName}"? Esta acao nao pode ser revertida.`)) {
      return;
    }

    try {
      await adminAPI.deleteUser(userId);
      toast.success('Utilizador eliminado com sucesso!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Erro ao eliminar utilizador');
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  if (loading && users.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <FaUsers className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestao de Utilizadores
              </h1>
              <p className="text-gray-600">
                {pagination.total || 0} utilizadores registados
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card rounded-2xl mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaSearch className="text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Pesquisar e Filtrar</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Pesquisar por nome ou email..."
                  className="input-field pl-11"
                />
              </div>
            </form>

            {/* Role Filter */}
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 1 })}
              className="input-field"
            >
              <option value="">Todos os Papeis</option>
              <option value="buyer">Comprador</option>
              <option value="seller">Vendedor</option>
              <option value="agent">Agente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card rounded-2xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Compradores</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'buyer').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-xl text-white" />
              </div>
            </div>
          </div>

          <div className="card rounded-2xl border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendedores</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'seller').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-xl text-white" />
              </div>
            </div>
          </div>

          <div className="card rounded-2xl border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Agentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'agent').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <FaUserTag className="text-xl text-white" />
              </div>
            </div>
          </div>

          <div className="card rounded-2xl border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Administradores</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                <FaUserShield className="text-xl text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-sand-100 to-sand-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Utilizador
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Papel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data de Registo
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acoes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-sand-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-11 w-11">
                          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FaEnvelope className="mr-1 text-xs" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getRoleBadge(user.role)
                      }`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 flex items-center">
                        <FaCalendar className="mr-2 text-gray-400" />
                        {new Date(user.createdAt).toLocaleDateString('pt-PT')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="btn-secondary py-2 px-3 flex items-center space-x-1 text-xs"
                        >
                          <FaEdit />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          className="btn-danger py-2 px-3 flex items-center space-x-1 text-xs"
                        >
                          <FaTrash />
                          <span>Eliminar</span>
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

        {/* Edit Role Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-6 border max-w-md w-full shadow-2xl rounded-2xl bg-white">
              <button
                onClick={() => {
                  setEditingUser(null);
                  setNewRole('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaEdit className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Editar Papel de Utilizador
                </h3>
              </div>

              <div className="mb-6 p-4 bg-sand-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Utilizador:</span> {editingUser.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email:</span> {editingUser.email}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Novo Papel
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="input-field w-full"
                  autoFocus
                >
                  <option value="">Selecione um papel</option>
                  <option value="buyer">Comprador</option>
                  <option value="seller">Vendedor</option>
                  <option value="agent">Agente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setNewRole('');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
                <button onClick={handleUpdateRole} className="btn-primary flex-1">
                  Atualizar
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
const getRoleLabel = (role) => {
  const labels = {
    buyer: 'Comprador',
    seller: 'Vendedor',
    agent: 'Agente',
    admin: 'Administrador'
  };
  return labels[role] || role;
};

const getRoleBadge = (role) => {
  const badges = {
    buyer: 'badge-info',
    seller: 'badge-success',
    agent: 'bg-purple-100 text-purple-800',
    admin: 'badge-danger'
  };
  return badges[role] || 'bg-gray-100 text-gray-800';
};

export default AdminUsers;

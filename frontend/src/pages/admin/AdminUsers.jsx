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
  FaSearch
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
    if (!confirm(`Tem a certeza que deseja eliminar o utilizador "${userName}"? Esta ação não pode ser revertida.`)) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestão de Utilizadores
        </h1>
        <p className="text-gray-600">
          {pagination.total || 0} utilizadores registados
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                placeholder="Pesquisar por nome ou email..."
                className="input-field pl-10"
              />
            </div>
          </form>

          {/* Role Filter */}
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 1 })}
            className="input-field"
          >
            <option value="">Todos os Papéis</option>
            <option value="buyer">Comprador</option>
            <option value="seller">Vendedor</option>
            <option value="agent">Agente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compradores</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'buyer').length}
              </p>
            </div>
            <FaUser className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="card border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vendedores</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'seller').length}
              </p>
            </div>
            <FaUser className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="card border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Agentes</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'agent').length}
              </p>
            </div>
            <FaUserTag className="text-3xl text-purple-500" />
          </div>
        </div>

        <div className="card border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Administradores</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <FaUserTag className="text-3xl text-red-500" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilizador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Registo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FaEnvelope className="mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getRoleBadge(user.role)
                    }`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <FaCalendar className="mr-2 text-gray-400" />
                      {new Date(user.createdAt).toLocaleDateString('pt-PT')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <FaEdit />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id, user.name)}
                        className="text-red-600 hover:text-red-900 flex items-center space-x-1"
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

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Editar Papel de Utilizador
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Utilizador: <span className="font-semibold">{editingUser.name}</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Email: <span className="font-semibold">{editingUser.email}</span>
                </p>
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
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setNewRole('');
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button onClick={handleUpdateRole} className="btn-primary">
                  Atualizar
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
    buyer: 'bg-blue-100 text-blue-800',
    seller: 'bg-green-100 text-green-800',
    agent: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800'
  };
  return badges[role] || 'bg-gray-100 text-gray-800';
};

export default AdminUsers;

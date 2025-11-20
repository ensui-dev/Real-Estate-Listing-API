import axios from './axios';
import { buildQueryString } from '../utils/helpers';

export const adminAPI = {
  // Dashboard
  getDashboard: async () => {
    const response = await axios.get('/admin/dashboard');
    return response;
  },

  // User Management
  getUsers: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    const response = await axios.get(`/admin/users?${queryString}`);
    return response;
  },

  updateUserRole: async (userId, role) => {
    const response = await axios.put(`/admin/users/${userId}/role`, { role });
    return response;
  },

  deleteUser: async (userId) => {
    const response = await axios.delete(`/admin/users/${userId}`);
    return response;
  },

  // Property Management
  getAdminProperties: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    const response = await axios.get(`/admin/properties?${queryString}`);
    return response;
  },

  approveProperty: async (propertyId) => {
    const response = await axios.put(`/admin/properties/${propertyId}/approve`);
    return response;
  },

  rejectProperty: async (propertyId, reason) => {
    const response = await axios.put(`/admin/properties/${propertyId}/reject`, { reason });
    return response;
  },

  bulkApproveProperties: async (propertyIds) => {
    const response = await axios.put('/admin/properties/bulk-approve', { propertyIds });
    return response;
  },

  deleteProperty: async (propertyId) => {
    const response = await axios.delete(`/admin/properties/${propertyId}`);
    return response;
  },

  // Settings
  getSettings: async () => {
    const response = await axios.get('/admin/settings');
    return response;
  },

  updateSettings: async (settings) => {
    const response = await axios.put('/admin/settings', settings);
    return response;
  }
};

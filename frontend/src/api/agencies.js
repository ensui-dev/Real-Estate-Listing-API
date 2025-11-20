import axios from './axios';
import { buildQueryString } from '../utils/helpers';

export const agenciesAPI = {
  // Get all agencies
  getAgencies: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    const response = await axios.get(`/agencies?${queryString}`);
    return response;
  },

  // Get single agency
  getAgency: async (id) => {
    const response = await axios.get(`/agencies/${id}`);
    return response;
  },

  // Create agency (admin only)
  createAgency: async (agencyData) => {
    const response = await axios.post('/agencies', agencyData);
    return response;
  },

  // Update agency
  updateAgency: async (id, agencyData) => {
    const response = await axios.put(`/agencies/${id}`, agencyData);
    return response;
  },

  // Delete agency (admin only)
  deleteAgency: async (id) => {
    const response = await axios.delete(`/agencies/${id}`);
    return response;
  },

  // Get agency statistics
  getAgencyStats: async (id) => {
    const response = await axios.get(`/agencies/${id}/stats`);
    return response;
  },

  // Verify agency (admin only)
  verifyAgency: async (id) => {
    const response = await axios.put(`/agencies/${id}/verify`);
    return response;
  },

  // Unverify agency (admin only)
  unverifyAgency: async (id) => {
    const response = await axios.put(`/agencies/${id}/unverify`);
    return response;
  },

  // Add agent to agency
  addAgentToAgency: async (agencyId, agentId) => {
    const response = await axios.post(`/agencies/${agencyId}/agents`, { agentId });
    return response;
  },

  // Remove agent from agency
  removeAgentFromAgency: async (agencyId, agentId) => {
    const response = await axios.delete(`/agencies/${agencyId}/agents/${agentId}`);
    return response;
  }
};

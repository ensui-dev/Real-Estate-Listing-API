import axios from './axios';
import { buildQueryString } from '../utils/helpers';

export const agentsAPI = {
  // Get all agents
  getAgents: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    const response = await axios.get(`/agents?${queryString}`);
    return response;
  },

  // Get single agent
  getAgent: async (id) => {
    const response = await axios.get(`/agents/${id}`);
    return response;
  },

  // Create agent profile
  createAgent: async (agentData) => {
    const response = await axios.post('/agents', agentData);
    return response;
  },

  // Update agent profile
  updateAgent: async (id, agentData) => {
    const response = await axios.put(`/agents/${id}`, agentData);
    return response;
  },

  // Delete agent
  deleteAgent: async (id) => {
    const response = await axios.delete(`/agents/${id}`);
    return response;
  },

  // Get my agent profile
  getMyAgent: async () => {
    const response = await axios.get('/agents/me');
    return response;
  }
};

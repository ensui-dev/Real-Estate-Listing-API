import axios from './axios';
import { buildQueryString } from '../utils/helpers';

export const propertiesAPI = {
  // Get all properties with filters
  getProperties: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    const response = await axios.get(`/properties?${queryString}`);
    return response;
  },

  // Get single property
  getProperty: async (id) => {
    const response = await axios.get(`/properties/${id}`);
    return response;
  },

  // Create new property
  createProperty: async (propertyData) => {
    const response = await axios.post('/properties', propertyData);
    return response;
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    const response = await axios.put(`/properties/${id}`, propertyData);
    return response;
  },

  // Delete property
  deleteProperty: async (id) => {
    const response = await axios.delete(`/properties/${id}`);
    return response;
  },

  // Get user's properties
  getMyProperties: async () => {
    const response = await axios.get('/properties/user/my-properties');
    return response;
  }
};

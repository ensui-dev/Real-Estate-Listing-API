import axios from './axios';

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response;
  },

  // Get current user
  getMe: async () => {
    const response = await axios.get('/auth/me');
    return response;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await axios.put('/auth/updateprofile', userData);
    return response;
  }
};

import axios from './axios';

export const favoritesAPI = {
  // Get user's favorites
  getFavorites: async () => {
    const response = await axios.get('/favorites');
    return response;
  },

  // Add property to favorites
  addToFavorites: async (propertyId) => {
    const response = await axios.post(`/favorites/properties/${propertyId}`);
    return response;
  },

  // Remove property from favorites
  removeFromFavorites: async (propertyId) => {
    const response = await axios.delete(`/favorites/properties/${propertyId}`);
    return response;
  },

  // Save search criteria
  saveSearch: async (searchData) => {
    const response = await axios.post('/favorites/searches', searchData);
    return response;
  },

  // Delete saved search
  deleteSavedSearch: async (searchId) => {
    const response = await axios.delete(`/favorites/searches/${searchId}`);
    return response;
  }
};

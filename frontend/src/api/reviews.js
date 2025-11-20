import axios from './axios';

export const reviewsAPI = {
  // Get reviews for a property
  getPropertyReviews: async (propertyId) => {
    const response = await axios.get(`/reviews/property/${propertyId}`);
    return response;
  },

  // Get reviews for an agent
  getAgentReviews: async (agentId) => {
    const response = await axios.get(`/reviews/agent/${agentId}`);
    return response;
  },

  // Create property review
  createPropertyReview: async (propertyId, reviewData) => {
    const response = await axios.post(`/reviews/property/${propertyId}`, reviewData);
    return response;
  },

  // Create agent review
  createAgentReview: async (agentId, reviewData) => {
    const response = await axios.post(`/reviews/agent/${agentId}`, reviewData);
    return response;
  },

  // Update review
  updateReview: async (id, reviewData) => {
    const response = await axios.put(`/reviews/${id}`, reviewData);
    return response;
  },

  // Delete review
  deleteReview: async (id) => {
    const response = await axios.delete(`/reviews/${id}`);
    return response;
  }
};

import axios from './axios';

export const inquiriesAPI = {
  // Create inquiry
  createInquiry: async (inquiryData) => {
    const response = await axios.post('/inquiries', inquiryData);
    return response;
  },

  // Get user's inquiries
  getMyInquiries: async () => {
    const response = await axios.get('/inquiries/my-inquiries');
    return response;
  },

  // Get inquiries for a property
  getPropertyInquiries: async (propertyId) => {
    const response = await axios.get(`/inquiries/property/${propertyId}`);
    return response;
  },

  // Get single inquiry
  getInquiry: async (id) => {
    const response = await axios.get(`/inquiries/${id}`);
    return response;
  },

  // Update inquiry
  updateInquiry: async (id, inquiryData) => {
    const response = await axios.put(`/inquiries/${id}`, inquiryData);
    return response;
  },

  // Delete inquiry
  deleteInquiry: async (id) => {
    const response = await axios.delete(`/inquiries/${id}`);
    return response;
  }
};

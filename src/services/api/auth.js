// client/src/services/api/auth.js (Updated)
import apiClient from './client';

export const authAPI = {
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  sendOTP: async (phone) => {
    const response = await apiClient.post('/auth/login', { phone });
    return response.data;
  },

  verifyOTP: async (otpData) => {
    const response = await apiClient.post('/auth/verify-otp', otpData);
    return response.data;
  },

  getDashboard: async () => {
    const response = await apiClient.get('/customer/dashboard');
    return response.data;
  },

  getProjectById: async (projectId) => {
    try {
      console.log(`🎯 Frontend: Fetching project ${projectId}`);
      
      const response = await apiClient.get(`/customer/project/${projectId}`);
      
      console.log('✅ Frontend: Project data received:', response.data);
      
      return response.data.data; // Return the data portion
    } catch (error) {
      console.error('❌ Frontend: Project fetch error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 404) {
        throw new Error('Project not found');
      }
      
      if (error.response?.status === 403) {
        throw new Error('Access denied to this project');
      }
      
      // Re-throw the original error for other cases
      throw error;
    }
  },



  getTracking: async () => {
    const response = await apiClient.get('/customer/tracking');
    return response.data;
  },

  async getProjectById(projectId) {
    try {
      const response = await apiClient.get(`/auth/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('API Error - getProjectById:', error);
      
      // Handle specific error cases
      if (error.response?.status === 404) {
        throw new Error('Project not found');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied to this project');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to fetch project details');
      }
    }
  },

  getStageHistory: async () => {
    const response = await apiClient.get('/customer/tracking/history');
    return response.data;
  }
};
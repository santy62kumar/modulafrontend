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

  getTracking: async () => {
    const response = await apiClient.get('/customer/tracking');
    return response.data;
  },

  getStageHistory: async () => {
    const response = await apiClient.get('/customer/tracking/history');
    return response.data;
  }
};
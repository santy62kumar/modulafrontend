// client/src/services/api/tracking.js

import apiClient from './client';

export const trackingAPI = {
  getTracking: async () => {
    const response = await apiClient.get('/customer/tracking');
    return response.data;
  },

  getStageHistory: async () => {
    const response = await apiClient.get('/customer/tracking/history');
    return response.data;
  },

  // For admin use
  updateStage: async (leadId, newStageId) => {
    const response = await apiClient.put('/tracking/stage', {
      leadId,
      newStageId
    });
    return response.data;
  }
};
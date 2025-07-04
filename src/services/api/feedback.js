// // client/src/services/api/feedback.js
// import apiClient from './client';

// export const feedbackAPI = {
//   /**
//    * Check if user has already submitted feedback
//    */
//   checkSubmissionStatus: async () => {
//     const response = await apiClient.get('/feedback/check');
//     return response.data;
//   },

//   /**
//    * Submit customer feedback
//    * @param {Object} feedbackData - Feedback form data
//    */
//   submitFeedback: async (feedbackData) => {
//     const response = await apiClient.post('/feedback/submit', feedbackData);
//     return response.data;
//   },

//   /**
//    * Get feedback submission history (if needed)
//    */
//   getFeedbackHistory: async () => {
//     const response = await apiClient.get('/feedback/history');
//     return response.data;
//   }
// };

// client/src/services/api/feedback.js
import apiClient from './client.js';

export const feedbackAPI = {
  // Submit customer feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await apiClient.post('/feedback/submit', feedbackData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Check if user can submit feedback (hasn't submitted already)
  checkFeedbackStatus: async () => {
    try {
      const response = await apiClient.get('/feedback/status');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's submitted feedbacks
  getUserFeedbacks: async () => {
    try {
      const response = await apiClient.get('/feedback/my-feedbacks');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get feedback by ID
  getFeedbackById: async (feedbackId) => {
    try {
      const response = await apiClient.get(`/feedback/${feedbackId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get feedback by reference ID
  getFeedbackByReference: async (referenceId) => {
    try {
      const response = await apiClient.get(`/feedback/reference/${referenceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete feedback (user can only delete their own)
  deleteFeedback: async (feedbackId) => {
    try {
      const response = await apiClient.delete(`/feedback/${feedbackId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin APIs
  admin: {
    // Get all feedbacks (admin only)
    getAllFeedbacks: async (filters = {}, limit = 50) => {
      try {
        const params = new URLSearchParams({
          ...filters,
          limit: limit.toString()
        });
        
        const response = await apiClient.get(`/feedback/admin/all?${params}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Get feedback statistics (admin only)
    getStatistics: async () => {
      try {
        const response = await apiClient.get('/feedback/admin/statistics');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Get feedback trends (admin only)
    getTrends: async (period = '30days') => {
      try {
        const response = await apiClient.get(`/feedback/admin/trends?period=${period}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Generate feedback report (admin only)
    generateReport: async (filters = {}) => {
      try {
        const params = new URLSearchParams(filters);
        const response = await apiClient.get(`/feedback/admin/report?${params}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Update feedback status (admin only)
    updateStatus: async (feedbackId, status, notes = '') => {
      try {
        const response = await apiClient.patch(`/feedback/admin/${feedbackId}/status`, {
          status,
          notes
        });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  }
};

export default feedbackAPI;
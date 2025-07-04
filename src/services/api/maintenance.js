// // client/src/services/api/maintenance.js
// import apiClient from './client';

// export const maintenanceAPI = {
//   /**
//    * Submit maintenance request
//    * @param {Object} requestData - Maintenance request form data
//    */
//   submitRequest: async (requestData) => {
//     const response = await apiClient.post('/maintenance/request', requestData);
//     return response.data;
//   },

//   /**
//    * Get maintenance request history
//    */
//   getRequestHistory: async () => {
//     const response = await apiClient.get('/maintenance/history');
//     return response.data;
//   },

//   /**
//    * Get request status by ID
//    * @param {string} requestId - Request ID
//    */
//   getRequestStatus: async (requestId) => {
//     const response = await apiClient.get(`/maintenance/status/${requestId}`);
//     return response.data;
//   }
// };

// client/src/services/api/maintenance.js
import apiClient from './client.js';

export const maintenanceAPI = {
  // Submit maintenance request
  submitRequest: async (requestData) => {
    try {
      const response = await apiClient.post('/maintenance/submit', requestData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's maintenance requests
  getUserRequests: async () => {
    try {
      const response = await apiClient.get('/maintenance/my-requests');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get maintenance request by ID
  getRequestById: async (requestId) => {
    try {
      const response = await apiClient.get(`/maintenance/${requestId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get maintenance request by reference ID
  getRequestByReference: async (referenceId) => {
    try {
      const response = await apiClient.get(`/maintenance/reference/${referenceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update request status
  updateStatus: async (requestId, status, notes = '') => {
    try {
      const response = await apiClient.patch(`/maintenance/${requestId}/status`, {
        status,
        notes
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete maintenance request (only pending requests)
  deleteRequest: async (requestId) => {
    try {
      const response = await apiClient.delete(`/maintenance/${requestId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin APIs
  admin: {
    // Get all maintenance requests (admin only)
    getAllRequests: async (filters = {}, limit = 50) => {
      try {
        const params = new URLSearchParams({
          ...filters,
          limit: limit.toString()
        });
        
        const response = await apiClient.get(`/maintenance/admin/all?${params}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Get requests by status (admin only)
    getRequestsByStatus: async (status) => {
      try {
        const response = await apiClient.get(`/maintenance/admin/status/${status}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Get pending requests (admin only)
    getPendingRequests: async () => {
      try {
        const response = await apiClient.get('/maintenance/admin/pending');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Get overdue requests (admin only)
    getOverdueRequests: async () => {
      try {
        const response = await apiClient.get('/maintenance/admin/overdue');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Get maintenance statistics (admin only)
    getStatistics: async () => {
      try {
        const response = await apiClient.get('/maintenance/admin/statistics');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Generate maintenance report (admin only)
    generateReport: async (filters = {}) => {
      try {
        const params = new URLSearchParams(filters);
        const response = await apiClient.get(`/maintenance/admin/report?${params}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    // Assign team to request (admin only)
    assignTeam: async (requestId, teamId, scheduledDate = null) => {
      try {
        const response = await apiClient.post(`/maintenance/admin/${requestId}/assign-team`, {
          teamId,
          scheduledDate
        });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  }
};

export default maintenanceAPI;
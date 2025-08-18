// // client/src/services/api/maintenance.js
// import apiClient from './client';

// // Submit a new service request
// export const submitServiceRequest = async (requestData) => {
//   try {
//     const response = await apiClient.post('/maintenance/request', requestData);
//     return response.data;
//   } catch (error) {
//     console.error('Error submitting service request:', error);
//     throw new Error(
//       error.response?.data?.message || 
//       'Failed to submit service request. Please try again.'
//     );
//   }
// };

// // Get service requests for a project
// export const getServiceRequests = async (projectId) => {
//   try {
//     const response = await apiClient.get(`/maintenance/requests/${projectId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching service requests:', error);
//     throw new Error(
//       error.response?.data?.message || 
//       'Failed to fetch service requests. Please try again.'
//     );
//   }
// };

// // Get all service requests for a customer
// export const getCustomerServiceRequests = async () => {
//   try {
//     const response = await apiClient.get('/maintenance/requests');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching customer service requests:', error);
//     throw new Error(
//       error.response?.data?.message || 
//       'Failed to fetch service requests. Please try again.'
//     );
//   }
// };

// // Get service request by ID
// export const getServiceRequestById = async (requestId) => {
//   try {
//     const response = await apiClient.get(`/maintenance/request/${requestId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching service request:', error);
//     throw new Error(
//       error.response?.data?.message || 
//       'Failed to fetch service request details. Please try again.'
//     );
//   }
// };

// // Update service request status (for future admin use)
// export const updateServiceRequestStatus = async (requestId, status, notes = '') => {
//   try {
//     const response = await apiClient.patch(`/maintenance/request/${requestId}/status`, {
//       status,
//       notes
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error updating service request status:', error);
//     throw new Error(
//       error.response?.data?.message || 
//       'Failed to update service request status. Please try again.'
//     );
//   }
// };

// // Cancel service request
// export const cancelServiceRequest = async (requestId, reason = '') => {
//   try {
//     const response = await apiClient.patch(`/maintenance/request/${requestId}/cancel`, {
//       reason
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error cancelling service request:', error);
//     throw new Error(
//       error.response?.data?.message || 
//       'Failed to cancel service request. Please try again.'
//     );
//   }
// };

// export default {
//   submitServiceRequest,
//   getServiceRequests,
//   getCustomerServiceRequests,
//   getServiceRequestById,
//   updateServiceRequestStatus,
//   cancelServiceRequest
// };

// client/src/services/api/maintenance.js
import apiClient from './client';

export const submitServiceRequest = async (requestData) => {
  try {
    const response = await apiClient.post('/maintenance/request', requestData);
    return response.data;
  } catch (error) {
    console.error('Error submitting service request:', error);
    throw error;
  }
};

export const submitMultipleServiceRequests = async (requests) => {
  try {
    // Submit all requests concurrently
    const promises = requests.map(requestData => 
      submitServiceRequest(requestData)
    );
    
    const results = await Promise.all(promises);
    return {
      success: true,
      data: {
        totalRequests: results.length,
        results
      }
    };
  } catch (error) {
    console.error('Error submitting multiple service requests:', error);
    throw error;
  }
};

export const getServiceRequestsByProject = async (projectId) => {
  try {
    const response = await apiClient.get(`/maintenance/requests/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    throw error;
  }
};

export const getCustomerServiceRequests = async () => {
  try {
    const response = await apiClient.get('/maintenance/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching customer service requests:', error);
    throw error;
  }
};

export const getServiceRequestById = async (requestId) => {
  try {
    const response = await apiClient.get(`/maintenance/request/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service request:', error);
    throw error;
  }
};

export const updateServiceRequestStatus = async (requestId, statusData) => {
  try {
    const response = await apiClient.patch(`/maintenance/request/${requestId}/status`, statusData);
    return response.data;
  } catch (error) {
    console.error('Error updating service request status:', error);
    throw error;
  }
};

export const cancelServiceRequest = async (requestId, reason = '') => {
  try {
    const response = await apiClient.patch(`/maintenance/request/${requestId}/cancel`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error cancelling service request:', error);
    throw error;
  }
};

export const getServiceRequestStats = async () => {
  try {
    const response = await apiClient.get('/maintenance/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching service request stats:', error);
    throw error;
  }
};

export default {
  submitServiceRequest,
  submitMultipleServiceRequests,
  getServiceRequestsByProject,
  getCustomerServiceRequests,
  getServiceRequestById,
  updateServiceRequestStatus,
  cancelServiceRequest,
  getServiceRequestStats
};
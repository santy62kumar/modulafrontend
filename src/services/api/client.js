// // client/src/services/api/client.js
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle auth errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

// client/src/services/api/client.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request ID for tracking
    config.headers['X-Request-ID'] = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle different error scenarios
    if (response) {
      const { status, data } = response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on auth pages
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access forbidden:', data?.message);
          break;
          
        case 404:
          // Not found
          console.error('Resource not found:', data?.message);
          break;
          
        case 429:
          // Rate limit exceeded
          console.error('Rate limit exceeded:', data?.message);
          break;
          
        case 500:
          // Server error
          console.error('Server error:', data?.message);
          break;
          
        default:
          console.error('API Error:', data?.message || error.message);
      }
      
      // Return structured error
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        errors: data?.errors || [],
        details: data?.details || null,
        success: false
      });
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        success: false
      });
    } else {
      // Request setup error
      console.error('Request error:', error.message);
      return Promise.reject({
        status: 0,
        message: 'Request failed. Please try again.',
        success: false
      });
    }
  }
);

// Helper functions for common API operations
export const apiHelpers = {
  // Get request with query parameters
  get: async (url, params = {}) => {
    try {
      const response = await apiClient.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Post request
  post: async (url, data = {}) => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Put request
  put: async (url, data = {}) => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Patch request
  patch: async (url, data = {}) => {
    try {
      const response = await apiClient.patch(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete request
  delete: async (url) => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // File upload
  upload: async (url, formData, onUploadProgress = null) => {
    try {
      const response = await apiClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Download file
  download: async (url, filename = null) => {
    try {
      const response = await apiClient.get(url, {
        responseType: 'blob',
      });
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get API configuration
  getConfig: () => ({
    baseURL: API_BASE_URL,
    timeout: apiClient.defaults.timeout,
    headers: apiClient.defaults.headers,
  }),

  // Set auth token
  setAuthToken: (token) => {
    if (token) {
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete apiClient.defaults.headers.Authorization;
      localStorage.removeItem('token');
    }
  },

  // Get auth token
  getAuthToken: () => {
    return localStorage.getItem('token');
  },

  // Clear auth token
  clearAuthToken: () => {
    delete apiClient.defaults.headers.Authorization;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Check if token is expired (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
};

// Export the configured axios instance
export default apiClient;
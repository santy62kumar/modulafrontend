// // // client/src/services/api/feedback.js
// // import apiClient from './client';

// // export const feedbackAPI = {
// //   /**
// //    * Check if user has already submitted feedback
// //    */
// //   checkSubmissionStatus: async () => {
// //     const response = await apiClient.get('/feedback/check');
// //     return response.data;
// //   },

// //   /**
// //    * Submit customer feedback
// //    * @param {Object} feedbackData - Feedback form data
// //    */
// //   submitFeedback: async (feedbackData) => {
// //     const response = await apiClient.post('/feedback/submit', feedbackData);
// //     return response.data;
// //   },

// //   /**
// //    * Get feedback submission history (if needed)
// //    */
// //   getFeedbackHistory: async () => {
// //     const response = await apiClient.get('/feedback/history');
// //     return response.data;
// //   }
// // };

// // client/src/services/api/feedback.js
// import apiClient from './client.js';

// export const feedbackAPI = {
//   // Submit customer feedback
//   submitFeedback: async (feedbackData) => {
//     try {
//       const response = await apiClient.post('/feedback/submit', feedbackData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Check if user can submit feedback (hasn't submitted already)
//   checkFeedbackStatus: async () => {
//     try {
//       const response = await apiClient.get('/feedback/status');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Get user's submitted feedbacks
//   getUserFeedbacks: async () => {
//     try {
//       const response = await apiClient.get('/feedback/my-feedbacks');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Get feedback by ID
//   getFeedbackById: async (feedbackId) => {
//     try {
//       const response = await apiClient.get(`/feedback/${feedbackId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Get feedback by reference ID
//   getFeedbackByReference: async (referenceId) => {
//     try {
//       const response = await apiClient.get(`/feedback/reference/${referenceId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Delete feedback (user can only delete their own)
//   deleteFeedback: async (feedbackId) => {
//     try {
//       const response = await apiClient.delete(`/feedback/${feedbackId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // // Admin APIs
//   // admin: {
//   //   // Get all feedbacks (admin only)
//   //   getAllFeedbacks: async (filters = {}, limit = 50) => {
//   //     try {
//   //       const params = new URLSearchParams({
//   //         ...filters,
//   //         limit: limit.toString()
//   //       });
        
//   //       const response = await apiClient.get(`/feedback/admin/all?${params}`);
//   //       return response.data;
//   //     } catch (error) {
//   //       throw error.response?.data || error;
//   //     }
//   //   },

//   //   // Get feedback statistics (admin only)
//   //   getStatistics: async () => {
//   //     try {
//   //       const response = await apiClient.get('/feedback/admin/statistics');
//   //       return response.data;
//   //     } catch (error) {
//   //       throw error.response?.data || error;
//   //     }
//   //   },

//   //   // Get feedback trends (admin only)
//   //   getTrends: async (period = '30days') => {
//   //     try {
//   //       const response = await apiClient.get(`/feedback/admin/trends?period=${period}`);
//   //       return response.data;
//   //     } catch (error) {
//   //       throw error.response?.data || error;
//   //     }
//   //   },

//   //   // Generate feedback report (admin only)
//   //   generateReport: async (filters = {}) => {
//   //     try {
//   //       const params = new URLSearchParams(filters);
//   //       const response = await apiClient.get(`/feedback/admin/report?${params}`);
//   //       return response.data;
//   //     } catch (error) {
//   //       throw error.response?.data || error;
//   //     }
//   //   },

//   //   // Update feedback status (admin only)
//   //   updateStatus: async (feedbackId, status, notes = '') => {
//   //     try {
//   //       const response = await apiClient.patch(`/feedback/admin/${feedbackId}/status`, {
//   //         status,
//   //         notes
//   //       });
//   //       return response.data;
//   //     } catch (error) {
//   //       throw error.response?.data || error;
//   //     }
//   //   }
//   // }
// };

// export default feedbackAPI;

// client/src/services/api/feedback.js - ENHANCED VERSION
import apiClient from './client.js';

export const feedbackAPI = {
  /**
   * ✅ Check feedback status using boolean flags
   * Returns: { canSubmit, hasSubmitted, status, message }
   */
  // checkFeedbackStatus: async () => {
  //   try {
  //     const response = await apiClient.get('/feedback/status');
  //     return response.data;
  //   } catch (error) {
  //     // Handle different error scenarios gracefully
  //     if (error.response?.status === 403) {
  //       return {
  //         success: false,
  //         data: {
  //           canSubmit: false,
  //           hasSubmitted: false,
  //           message: 'Feedback not available yet'
  //         }
  //       };
  //     }
  //     throw error.response?.data || error;
  //   }
  //},

  /**
   * ✅ Check feedback eligibility (alternative endpoint)
   * More specific than status check
   */
  // checkFeedbackEligibility: async () => {
  //   try {
  //     const response = await apiClient.get('/feedback/eligibility');
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // },

  /**
   * ✅ Submit feedback form
   * @param {Object} feedbackData - Complete feedback form data
   */
  submitFeedback: async (feedbackData) => {
    try {
      // Transform form data to match backend expectations
      const transformedData = {
        customerName: feedbackData.customerName,
        projectName: feedbackData.projectName,
        location: feedbackData.location,
        handoverDate: feedbackData.handoverDate,
        contactNumber: feedbackData.contactNumber,
        
        // Ratings object
        ratings: {
          installationBehavior: feedbackData.ratings.installationBehavior,
          punctuality: feedbackData.ratings.punctuality,
          cleanliness: feedbackData.ratings.cleanliness,
          installationQuality: feedbackData.ratings.installationQuality,
          productQuality: feedbackData.ratings.productQuality,
          deliveryExperience: feedbackData.ratings.deliveryExperience,
          communication: feedbackData.ratings.communication,
          overallExperience: feedbackData.ratings.overallExperience
        },
        
        // Text feedback
        likedMost: feedbackData.likedMost,
        improvements: feedbackData.improvements,
        wouldRecommend: feedbackData.wouldRecommend,
        
        // Acknowledgements
        customerConfirmation: feedbackData.customerConfirmation,
        projectManager: feedbackData.projectManager,
        installerNames: feedbackData.installerNames
      };

      const response = await apiClient.post('/feedback/submit', transformedData);
      return response.data;
    } catch (error) {
      // Enhanced error handling
      if (error.response?.status === 409) {
        throw new Error('Feedback has already been submitted for this project');
      }
      if (error.response?.status === 403) {
        throw new Error('Feedback form is not available yet');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Please check your form data');
      }
      throw new Error(error.response?.data?.message || 'Failed to submit feedback');
    }
  },

  /**
   * ✅ Get user's feedback history
   */
  getUserFeedbacks: async () => {
    try {
      const response = await apiClient.get('/feedback/my-feedbacks');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * ✅ Get specific feedback by ID
   * @param {string} feedbackId - Feedback document ID
   */
  getFeedbackById: async (feedbackId) => {
    try {
      const response = await apiClient.get(`/feedback/${feedbackId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Feedback not found');
      }
      if (error.response?.status === 403) {
        throw new Error('Access denied to this feedback');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * ✅ Get feedback by reference ID (for customer lookup)
   * @param {string} referenceId - Feedback reference ID (FB-YYYYMMDD-XXXXXX)
   */
  getFeedbackByReference: async (referenceId) => {
    try {
      const response = await apiClient.get(`/feedback/reference/${referenceId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Feedback not found with this reference ID');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * ✅ Delete user's own feedback (if allowed)
   * @param {string} feedbackId - Feedback document ID
   */
  deleteFeedback: async (feedbackId) => {
    try {
      const response = await apiClient.delete(`/feedback/${feedbackId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Feedback not found');
      }
      if (error.response?.status === 403) {
        throw new Error('You can only delete your own feedback');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * ✅ Utility: Get feedback form validation rules
   */
  getValidationRules: () => {
    return {
      customerName: { required: true, minLength: 2, maxLength: 100 },
      projectName: { required: true, minLength: 2, maxLength: 100 },
      location: { required: true, minLength: 2, maxLength: 200 },
      handoverDate: { required: true, type: 'date' },
      contactNumber: { required: true, pattern: /^\d{10}$/ },
      ratings: {
        required: true,
        fields: [
          'installationBehavior',
          'punctuality', 
          'cleanliness',
          'installationQuality',
          'productQuality',
          'deliveryExperience',
          'communication',
          'overallExperience'
        ],
        min: 1,
        max: 4
      },
      likedMost: { required: true, minLength: 10, maxLength: 1000 },
      improvements: { required: true, minLength: 5, maxLength: 1000 },
      wouldRecommend: { required: true, options: ['Yes', 'No', 'Maybe'] },
      customerConfirmation: { required: true, type: 'boolean' },
      projectManager: { required: true, minLength: 2, maxLength: 100 },
      installerNames: { required: true, minLength: 2, maxLength: 200 }
    };
  },

  /**
   * ✅ Utility: Validate feedback form data
   * @param {Object} formData - Form data to validate
   * @returns {Object} Validation result
   */
  validateFeedbackData: (formData) => {
    const rules = feedbackAPI.getValidationRules();
    const errors = {};

    // Basic field validation
    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = formData[field];

      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        errors[field] = `Minimum ${rule.minLength} characters required`;
      }

      if (value && rule.maxLength && value.length > rule.maxLength) {
        errors[field] = `Maximum ${rule.maxLength} characters allowed`;
      }

      if (value && rule.pattern && !rule.pattern.test(value)) {
        errors[field] = 'Invalid format';
      }
    });

    // Ratings validation
    if (formData.ratings) {
      const ratingRules = rules.ratings;
      ratingRules.fields.forEach(ratingField => {
        const rating = formData.ratings[ratingField];
        if (!rating || rating < ratingRules.min || rating > ratingRules.max) {
          errors[`ratings.${ratingField}`] = `Rating must be between ${ratingRules.min} and ${ratingRules.max}`;
        }
      });
    }

    // Special validations
    if (formData.wouldRecommend && !rules.wouldRecommend.options.includes(formData.wouldRecommend)) {
      errors.wouldRecommend = 'Please select a valid recommendation option';
    }

    if (formData.customerConfirmation !== true) {
      errors.customerConfirmation = 'Customer confirmation is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

export default feedbackAPI;
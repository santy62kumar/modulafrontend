// client/src/services/utils/validation.js
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateOTP = (otp) => {
  const otpRegex = /^[0-9]{6}$/;
  return otpRegex.test(otp);
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validatePincode = (pincode) => {
  const pincodeRegex = /^[0-9]{6}$/;
  return pincodeRegex.test(pincode);
};

export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  if (!validateName(formData.firstName)) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  
  if (!validateName(formData.lastName)) {
    errors.lastName = 'Last name must be at least 2 characters';
  }
  
  if (!formData.address || formData.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters';
  }
  
  if (!validatePincode(formData.pincode)) {
    errors.pincode = 'Pincode must be 6 digits';
  }
  
  if (!validatePhone(formData.phone)) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateFeedbackForm = (formData) => {
  const errors = {};
  
  // Basic information validation
  if (!formData.customerName?.trim()) {
    errors.customerName = 'Customer name is required';
  }
  
  if (!formData.orderId?.trim()) {
    errors.orderId = 'Order ID is required';
  }
  
  if (!formData.location?.trim()) {
    errors.location = 'Location is required';
  }
  
  if (!formData.handOverDate) {
    errors.handOverDate = 'Hand over date is required';
  }
  
  // Ratings validation
  const requiredRatings = ['behavior', 'punctuality', 'cleanliness', 'quality', 'product', 'delivery', 'communication'];
  requiredRatings.forEach(rating => {
    if (!formData.ratings[rating]) {
      errors[`ratings.${rating}`] = `${rating} rating is required`;
    }
  });
  
  // Confirmation checkbox validation
  if (!formData.confirmation) {
    errors.confirmation = 'You must confirm the completion of the project';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// NEW: Maintenance form validation
export const validateMaintenanceForm = (formData) => {
  const errors = {};
  
  // Basic information validation
  if (!formData.customerName?.trim()) {
    errors.customerName = 'Customer name is required';
  }
  
  if (!validatePhone(formData.phoneNumber)) {
    errors.phoneNumber = 'Phone number must be exactly 10 digits';
  }
  
  if (!formData.preferredDate) {
    errors.preferredDate = 'Preferred service date is required';
  }
  
  if (!formData.location?.trim()) {
    errors.location = 'Location is required';
  }
  
  // Services validation
  if (!formData.selectedServices || formData.selectedServices.length === 0) {
    errors.selectedServices = 'Please select at least one service';
  }
  
  // Custom service validation
  if (formData.selectedServices?.includes('other') && !formData.customService?.trim()) {
    errors.customService = 'Please specify your custom service requirement';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
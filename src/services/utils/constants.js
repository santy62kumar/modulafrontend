// client/src/utils/constants.js
export const ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  OTP: '/otp',
  DASHBOARD: '/dashboard'
};

export const VALIDATION_RULES = {
  PHONE_LENGTH: 10,
  OTP_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  PINCODE_LENGTH: 6
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    VERIFY_OTP: '/api/auth/verify-otp'
  },
  CUSTOMER: {
    DASHBOARD: '/api/customer/dashboard'
  }
};

export const COLORS = {
  PRIMARY: '#3A1A1A',
  SECONDARY: '#4F372F',
  ACCENT: '#AF7C71',
  LIGHT: '#F1E6DD',
  WHITE: '#FFFFFF'
};
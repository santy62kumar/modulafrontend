// client/src/pages/auth/OTPPage.jsx
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import OTPVerification from '../../components/auth/OTPVerification';

const OTPPage = () => {
  return (
    <AuthLayout 
      title="Enter the code sent to your phone"
      //subtitle="Enter the code sent to your phone"
    >
      <OTPVerification />
    </AuthLayout>
  );
};

export default OTPPage;
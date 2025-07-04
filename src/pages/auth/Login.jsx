// client/src/pages/auth/Login.jsx
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  return (
    
    <AuthLayout 
      title="Login to Your Account"
      // subtitle="Enter your phone number to get started"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
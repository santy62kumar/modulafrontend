// client/src/pages/auth/Register.jsx
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout 
      title="Sign Up Now"
      // subtitle="Create your account to track your Modula project"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
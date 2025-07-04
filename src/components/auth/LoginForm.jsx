// client/src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validatePhone } from '../../services/utils/validation';
import { authAPI } from '../../services/api/auth';
import { PhoneIcon} from '@heroicons/react/24/outline';

const LoginForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const { addToast } = useToast();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhone(value);
      if (error) setError('');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    setLoading(true);
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await authAPI.sendOTP(phone);
      dispatch({ 
        type: 'SET_OTP_DATA', 
        payload: { phone, sessionId: response.sessionId } 
      });
      addToast('OTP sent successfully!', 'success');
      navigate('/otp');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      setError(errorMessage);
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Phone Number"
        name="phone"
        value={phone}
        icon={PhoneIcon}
        onChange={handleChange}
        error={error}
        maxLength={10}
        placeholder="Enter 10-digit phone number"
        required
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
      >
        Login
      </Button>

      <div className="text-center">
        <p className="text-sm text-primary-400 font-nunito">
          Don't have a account? {' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="font-large text-primary-600 hover:text-primary-600"
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
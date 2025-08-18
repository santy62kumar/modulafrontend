// client/src/components/auth/OTPVerification.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validateOTP } from '../../services/utils/validation';
import { authAPI } from '../../services/api/auth';

const OTPVerification = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const { addToast } = useToast();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!state.otpData) {
      navigate('/login');
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [state.otpData, navigate]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
      if (error) setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateOTP(otp)) {
      setError('OTP must be exactly 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.verifyOTP({
        phone: state.otpData.phone,
        otp,
        sessionId: state.otpData.sessionId
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: response 
      });
      
      addToast('Login successful!', 'success');
      //changes required 
      // navigate to project list
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP';
      setError(errorMessage);
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setResendLoading(true);
    try {
      const response = await authAPI.sendOTP(state.otpData.phone);
      dispatch({ 
        type: 'SET_OTP_DATA', 
        payload: { ...state.otpData, sessionId: response.sessionId } 
      });
      setCountdown(30);
      addToast('OTP resent successfully!', 'success');
    } catch (error) {
      addToast('Failed to resend OTP', 'error');
    } finally {
      setResendLoading(false);
    }
  };

  if (!state.otpData) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-primary-400 font-nunito">
          OTP sent to <span className="font-semibold">{state.otpData.phone}</span>
        </p>
      </div>

      <Input
        label="Enter OTP"
        name="otp"
        value={otp}
        onChange={handleChange}
        error={error}
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className="text-center text-lg tracking-widest"
        required
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
      >
        Verify OTP
      </Button>

      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-sm text-primary-400 font-nunito">
            Resend OTP in {countdown}s
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resendLoading}
            className="text-sm font-medium text-primary-500 hover:text-primary-600 font-nunito"
          >
            {resendLoading ? 'Sending...' : 'Resend OTP'}
          </button>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm font-medium text-primary-400 hover:text-primary-500 font-nunito"
        >
          ← Back to Login
        </button>
      </div>
    </form>
  );
};

export default OTPVerification;
// client/src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { validateRegistrationForm } from '../../services/utils/validation';
import { authAPI } from '../../services/api/auth';
import { PhoneIcon, UserIcon, MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number - only allow digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      }
      return;
    }
    
    // Special handling for pincode - only allow digits
    if (name === 'pincode') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 6) {
        setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await authAPI.register(formData);
      addToast('Registration successful! Please login.', 'success');
      navigate('/login');
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* <div className="grid grid-cols-2 gap-4"> */}
        <Input
          label="First Name"
          type="text"
          name="firstName"
          icon={UserIcon}
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="First Name"
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          icon={UserIcon}
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Last Name"
          required
        />
      {/* </div> */}

      <Input
        label="Phone Number"
        name="phone"
        icon={PhoneIcon}
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        maxLength={10}
        placeholder="Enter 10-digit phone number"
        required
      />
      
      <Input
        label="Address"
        name="address"
        icon={HomeIcon}
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
        placeholder="Enter your address"
        required
      />
      
      <Input
        label="Pincode"
        name="pincode"
        icon={MapPinIcon}
        value={formData.pincode}
        onChange={handleChange}
        error={errors.pincode}
        maxLength={6}
        placeholder="Enter your pincode"
        required
      />
      
      

      <Button
        type="submit"
        className="w-full"
        loading={loading}
      >
        Register
      </Button>

      <div className="text-center">
        <p className="text-sm text-primary-400 font-nunito">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-medium text-primary-500 hover:text-primary-600"
          >
            Login here
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
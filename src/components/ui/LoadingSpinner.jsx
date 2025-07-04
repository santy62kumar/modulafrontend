// client/src/components/ui/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`
        animate-spin rounded-full border-b-2 border-primary-500
        ${sizes[size]}
      `}></div>
    </div>
  );
};

export default LoadingSpinner;
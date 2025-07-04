// client/src/components/ui/DatePicker.jsx
import React from 'react';

const DatePicker = ({
  label,
  error,
  className = '',
  required = false,
  min,
  max,
  ...props
}) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="date"
        min={min || today}
        max={max}
        className={`
          w-full px-4 py-3 border rounded-lg font-nunito
          focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent
          ${error ? 'border-red-500' : 'border-[#D7C5AA]'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 font-nunito">{error}</p>
      )}
    </div>
  );
};

export default DatePicker;
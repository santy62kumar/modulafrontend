// client/src/components/ui/Checkbox.jsx
import React from 'react';

const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="flex items-start cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 text-[#AF7C71] border-[#D7C5AA] rounded focus:ring-[#AF7C71] mt-0.5 mr-3 flex-shrink-0"
          {...props}
        />
        <span className="text-sm text-[#3A1A1A] font-nunito">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-500 font-nunito">{error}</p>
      )}
    </div>
  );
};

export default Checkbox;

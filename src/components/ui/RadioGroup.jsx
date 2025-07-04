// client/src/components/ui/RadioGroup.jsx
import React from 'react';

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#3A1A1A] mb-3 font-montserrat">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          
          return (
            <label key={optionValue} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={value === optionValue}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-[#AF7C71] border-[#D7C5AA] focus:ring-[#AF7C71] mr-2"
              />
              <span className="text-[#3A1A1A] font-nunito">{optionLabel}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 font-nunito">{error}</p>
      )}
    </div>
  );
};

export default RadioGroup;

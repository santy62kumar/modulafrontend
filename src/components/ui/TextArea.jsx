// client/src/components/ui/TextArea.jsx
import React from 'react';

const TextArea = ({
  label,
  error,
  className = '',
  required = false,
  rows = 3,
  maxLength,
  showCharCount = false,
  ...props
}) => {
  const charCount = props.value?.length || 0;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 border rounded-lg font-nunito resize-vertical
          focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent
          ${error ? 'border-red-500' : 'border-[#D7C5AA]'}
          ${className}
        `}
        {...props}
      />
      <div className="flex justify-between items-center mt-1">
        {error && (
          <p className="text-sm text-red-500 font-nunito">{error}</p>
        )}
        {showCharCount && maxLength && (
          <p className={`text-sm font-nunito ml-auto ${
            charCount > maxLength * 0.9 ? 'text-red-500' : 'text-[#6B4B41]'
          }`}>
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;










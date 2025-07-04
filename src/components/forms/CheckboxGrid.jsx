// client/src/components/forms/CheckboxGrid.jsx
import React from 'react';

const CheckboxGrid = ({ 
  options, 
  selectedValues, 
  onChange, 
  error,
  customField = null,
  onCustomFieldChange = null 
}) => {
  const handleCheckboxChange = (optionValue) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(value => value !== optionValue)
      : [...selectedValues, optionValue];
    onChange(newValues);
  };

  const handleCustomChange = (e) => {
    if (onCustomFieldChange) {
      onCustomFieldChange(e.target.value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {options.left.map((option, index) => (
            <label 
              key={index}
              className="flex items-center space-x-3 p-4 border border-primary-100 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <input
                type="checkbox"
                className="h-5 w-5 text-primary-200 border-gray-300 rounded focus:ring-primary-200"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <div className="flex-1">
                <span className="text-primary-500 font-medium font-nunito">{option.label}</span>
                {option.description && (
                  <p className="text-sm text-primary-300 mt-1 font-nunito">{option.description}</p>
                )}
              </div>
            </label>
          ))}
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          {options.right.map((option, index) => (
            <label 
              key={index}
              className="flex items-center space-x-3 p-4 border border-primary-100 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <input
                type="checkbox"
                className="h-5 w-5 text-primary-200 border-gray-300 rounded focus:ring-primary-200"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <div className="flex-1">
                <span className="text-primary-500 font-medium font-nunito">{option.label}</span>
                {option.description && (
                  <p className="text-sm text-primary-300 mt-1 font-nunito">{option.description}</p>
                )}
              </div>
            </label>
          ))}
          
          {/* Custom Field */}
          {customField && (
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-4 border border-primary-100 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-primary-200 border-gray-300 rounded focus:ring-primary-200"
                  checked={selectedValues.includes('other')}
                  onChange={() => handleCheckboxChange('other')}
                />
                <span className="text-primary-500 font-medium font-nunito">Other:</span>
              </label>
              <input
                type="text"
                placeholder="Please specify your custom requirement..."
                className="w-full px-4 py-3 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent font-nunito"
                value={customField}
                onChange={handleCustomChange}
                disabled={!selectedValues.includes('other')}
              />
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500 font-nunito">{error}</p>
      )}
    </div>
  );
};

export default CheckboxGrid;
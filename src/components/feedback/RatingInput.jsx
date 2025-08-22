// client/src/components/feedback/RatingInput.jsx
import React from 'react';

const RatingInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error,
  required = false,
  leftLabel = 'Very Bad',
  rightLabel = 'Excellent',
  className = ''
}) => {
  // Special labels for specific ratings
  const getLeftLabel = () => {
    if (name === 'cleanliness') return 'Very Dirty';
    return leftLabel;
  };

  const getRightLabel = () => {
    if (name === 'cleanliness') return 'Very Clean';
    if (name === 'productQuality') return 'Very Good';
    return rightLabel;
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm font-medium text-[#3A1A1A] mb-3 font-montserrat">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="flex items-center justify-between">
        {/* Left label */}
        
        <span className="text-xs text-[#6B4B41] font-nunito w-20 text-left">
          {getLeftLabel()}
        </span>

        {/* Rating buttons (grid, evenly spaced, wide gap) */}
        <div className="flex-1 px-4">
          <div className="grid grid-cols-4 gap-x-12 place-items-center">
            {[1, 2, 3, 4].map((rating) => (
              <label key={rating} className="flex flex-col items-center cursor-pointer group">
                <input
                  type="radio"
                  name={name}
                  value={rating}
                  checked={value === rating}
                  onChange={() => onChange(name, rating)}
                  className="w-5 h-5 text-[#AF7C71] border-[#D7C5AA] focus:ring-[#AF7C71] focus:ring-2"
                />
                <span className="text-sm font-semibold text-[#3A1A1A] mt-1 font-montserrat group-hover:text-[#AF7C71] transition-colors">
                  {rating}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Right label */}
        <span className="text-xs text-[#6B4B41] font-nunito w-20 text-right">
          {getRightLabel()}
        </span>

       
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500 font-nunito">{error}</p>
      )}
    </div>
  );
};

export default RatingInput;
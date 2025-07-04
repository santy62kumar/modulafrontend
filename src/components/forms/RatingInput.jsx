// client/src/components/forms/RatingInput.jsx
import React from 'react';

const RatingInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  required = false 
}) => {
  const handleRatingClick = (rating) => {
    onChange(name, rating);
  };

  return (
    <div className="mb-6">
      <h4 className="text-primary-500 font-medium mb-4 font-montserrat">
        {label} {required && <span className="text-red-500">*</span>}
      </h4>
      <div className="flex items-center justify-between">
        <span className="text-primary-300 text-sm font-nunito">POOR</span>
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingClick(rating)}
              className={`
                w-12 h-12 rounded-full border-2 flex items-center justify-center 
                font-medium transition-all duration-200 focus:outline-none
                ${value === rating 
                  ? 'bg-primary-500 text-white border-primary-500' 
                  : 'border-gray-300 text-primary-500 hover:border-primary-200'
                }
              `}
            >
              {rating}
            </button>
          ))}
        </div>
        <span className="text-primary-300 text-sm font-nunito">EXCEPTIONAL</span>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 font-nunito">{error}</p>
      )}
    </div>
  );
};

export default RatingInput;
// client/src/components/ui/Alert.jsx
import React from 'react';

const Alert = ({
  type = 'info',
  title,
  children,
  onClose,
  className = ''
}) => {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`
      border rounded-lg p-4
      ${typeStyles[type]}
      ${className}
    `}>
      <div className="flex items-start">
        <span className="text-lg mr-3 mt-0.5">{iconMap[type]}</span>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold font-montserrat mb-1">{title}</h4>
          )}
          <div className="font-nunito">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 hover:opacity-70 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
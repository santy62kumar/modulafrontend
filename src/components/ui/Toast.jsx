// client/src/components/ui/Toast.jsx
import React from 'react';
import { useToast } from '../../context/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type) => {
    const baseStyles = 'mb-4 p-4 rounded-lg shadow-lg flex items-center justify-between';
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-100 text-green-800 border border-green-300`;
      case 'error':
        return `${baseStyles} bg-red-100 text-red-800 border border-red-300`;
      case 'warning':
        return `${baseStyles} bg-yellow-100 text-yellow-800 border border-yellow-300`;
      default:
        return `${baseStyles} bg-blue-100 text-blue-800 border border-blue-300`;
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {toasts.map((toast) => (
        <div key={toast.id} className={getToastStyles(toast.type)}>
          <span className="font-nunito">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-lg font-bold hover:opacity-70"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
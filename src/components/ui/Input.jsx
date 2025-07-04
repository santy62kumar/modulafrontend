const Input = ({
  label,
  error,
  type = 'text',
  className = '',
  required = false,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-primary-500 mb-2 font-montserrat">
          {label} {required && <span className="text-primary-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-primary-500" />
          </div>
        )}
        <input
          type={type}
          className={`
            w-full px-3 py-2 border rounded-lg font-nunito
            ${Icon ? 'pl-10' : ''} 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${error ? 'text-primary-500' : 'border-primary-200'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-primary-200 font-nunito">{error}</p>
      )}
    </div>
  );
};

export default Input;
// client/src/components/ui/Card.jsx
import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  shadow = 'shadow-sm',
  hover = false,
  onClick
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg border border-[#D7C5AA]
        ${shadow}
        ${hover ? 'hover:shadow-md transition-shadow' : ''}
        ${padding}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
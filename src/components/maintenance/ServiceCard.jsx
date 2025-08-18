// // client/src/components/maintenance/ServiceCard.jsx
// import React from 'react';

// const ServiceCard = ({ service, onRequestService }) => {
//   const handleRequestClick = () => {
//     onRequestService(service);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//       {/* Service Image */}
//       <div className="h-48 bg-gradient-to-br from-[#3A1A1A] to-[#5A2A2A] flex items-center justify-center">
//         {service.image ? (
//           <img 
//             src={service.image} 
//             alt={service.name}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="text-white text-4xl">
//             {service.icon || '🔧'}
//           </div>
//         )}
//       </div>
      
//       {/* Service Content */}
//       <div className="p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//           {service.name}
//         </h3>
        
//         {service.description && (
//           <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//             {service.description}
//           </p>
//         )}
        
//         {/* Service Features */}
//         {service.features && service.features.length > 0 && (
//           <ul className="text-xs text-gray-500 mb-4 space-y-1">
//             {service.features.slice(0, 3).map((feature, index) => (
//               <li key={index} className="flex items-center">
//                 <span className="w-1 h-1 bg-[#3A1A1A] rounded-full mr-2"></span>
//                 {feature}
//               </li>
//             ))}
//           </ul>
//         )}
        
//         {/* Request Button */}
//         <button
//           onClick={handleRequestClick}
//           className="w-full bg-[#3A1A1A] text-white py-2 px-4 rounded-lg hover:bg-[#2b1414] transition-colors duration-200 font-medium"
//         >
//           Request Service
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;

// client/src/components/maintenance/ServiceCard.jsx
import React from 'react';
import { useServiceCart } from '../../context/ServiceCartContext';

const ServiceCard = ({ service, category = 'services' }) => {
  const { addToCart, removeFromCart, isInCart } = useServiceCart();
  
  const inCart = isInCart(service.id);
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(service, category);
  };
  
  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    removeFromCart(service.id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Service Header */}
      <div className="w-full h-60">
        <img 
          src="/kitchens.jpg"
          alt={service.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="pt-3 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold text-[#3A1A1A]">{service.name}</h3>
            {/* {service.description && (
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
            )} */}
          </div>
        </div>
        
        {/* Cart Status Indicator */}
        {inCart && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">Added</span>
          </div>
        )}
      </div>
      
      {/* Service Features */}
      {/* {service.features && service.features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">What's included:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{feature}</span>
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-gray-500 text-xs">
                +{service.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
      )} */}
      
      {/* Price/Duration Info */}
      {/* {(service.duration || service.estimatedPrice) && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between text-sm">
            {service.duration && (
              <div>
                <span className="text-gray-500">Duration:</span>
                <span className="ml-1 font-medium text-gray-900">{service.duration}</span>
              </div>
            )}
            {service.estimatedPrice && (
              <div>
                <span className="text-gray-500">Est. Price:</span>
                <span className="ml-1 font-medium text-gray-900">{service.estimatedPrice}</span>
              </div>
            )}
          </div>
        </div>
      )} */}
      
      {/* Action Button */}
      <div className="border-t border-gray-100">
        {inCart ? (
          <button
            onClick={handleRemoveFromCart}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors font-medium flex items-center justify-center"
          >
            {/* <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg> */}
            Remove
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#6B4B41] text-white py-2 px-4 rounded-md hover:bg-[#2b1414] transition-colors font-medium flex items-center justify-center"
          >
            {/* <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h6a1 1 0 001-1v-6m-8 0V9a1 1 0 011-1h6a1 1 0 011-1v4" />
            </svg> */}
            Add
          </button>
        )}
      </div>
      
      {/* Service Details Link */}
      {/* {service.detailsUrl && (
        <div className="mt-2">
          <a
            href={service.detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6B4B41] hover:text-[#3A1A1A] transition-colors"
          >
            View detailed information →
          </a>
        </div>
      )} */}
    </div>
  );
};

export default ServiceCard;
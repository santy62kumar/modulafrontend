// // // client/src/components/maintenance/ServiceCard.jsx
// // import React from 'react';

// // const ServiceCard = ({ service, onRequestService }) => {
// //   const handleRequestClick = () => {
// //     onRequestService(service);
// //   };

// //   return (
// //     <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
// //       {/* Service Image */}
// //       <div className="h-48 bg-gradient-to-br from-[#3A1A1A] to-[#5A2A2A] flex items-center justify-center">
// //         {service.image ? (
// //           <img 
// //             src={service.image} 
// //             alt={service.name}
// //             className="w-full h-full object-cover"
// //           />
// //         ) : (
// //           <div className="text-white text-4xl">
// //             {service.icon || '🔧'}
// //           </div>
// //         )}
// //       </div>
      
// //       {/* Service Content */}
// //       <div className="p-6">
// //         <h3 className="text-lg font-semibold text-gray-900 mb-2">
// //           {service.name}
// //         </h3>
        
// //         {service.description && (
// //           <p className="text-gray-600 text-sm mb-4 line-clamp-3">
// //             {service.description}
// //           </p>
// //         )}
        
// //         {/* Service Features */}
// //         {service.features && service.features.length > 0 && (
// //           <ul className="text-xs text-gray-500 mb-4 space-y-1">
// //             {service.features.slice(0, 3).map((feature, index) => (
// //               <li key={index} className="flex items-center">
// //                 <span className="w-1 h-1 bg-[#3A1A1A] rounded-full mr-2"></span>
// //                 {feature}
// //               </li>
// //             ))}
// //           </ul>
// //         )}
        
// //         {/* Request Button */}
// //         <button
// //           onClick={handleRequestClick}
// //           className="w-full bg-[#3A1A1A] text-white py-2 px-4 rounded-lg hover:bg-[#2b1414] transition-colors duration-200 font-medium"
// //         >
// //           Request Service
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServiceCard;

// // client/src/components/maintenance/ServiceCard.jsx
// import React from 'react';
// import { useServiceCart } from '../../context/ServiceCartContext';

// const ServiceCard = ({ service, category = 'services' }) => {
//   const { addToCart, removeFromCart, isInCart } = useServiceCart();
  
//   const inCart = isInCart(service.id);
  
//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     addToCart(service, category);
//   };
  
//   const handleRemoveFromCart = (e) => {
//     e.stopPropagation();
//     removeFromCart(service.id);
//   };
  
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
//       {/* Service Header */}
//       <div className="w-full h-60">
//         <img 
//           src="/kitchens.jpg"
//           alt={service.name}
//           className="w-full h-full object-cover rounded-t-lg"
//         />
//       </div>

//       <div className="pt-3 flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-3">
//           <div>
//             <h3 className="text-lg font-semibold text-[#3A1A1A]">{service.name}</h3>
//             {/* {service.description && (
//               <p className="text-sm text-gray-600 mt-1">{service.description}</p>
//             )} */}
//           </div>
//         </div>
        
//         {/* Cart Status Indicator */}
//         {inCart && (
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-xs text-green-600 font-medium">Added</span>
//           </div>
//         )}
//       </div>
      
      
      
//       {/* Action Button */}
//       <div className="border-t border-gray-100">
//         {inCart ? (
//           <button
//             onClick={handleRemoveFromCart}
//             className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors font-medium flex items-center justify-center"
//           >
            
//             Remove
//           </button>
//         ) : (
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-[#6B4B41] text-white py-2 px-4 rounded-md hover:bg-[#2b1414] transition-colors font-medium flex items-center justify-center"
//           >
            
//             Add
//           </button>
//         )}
//       </div>
      
      
//     </div>
//   );
// };

// export default ServiceCard;

// client/src/components/maintenance/ServiceCard.jsx
import React, { useState, useEffect } from 'react';
import { useServiceCart } from '../../context/ServiceCartContext';
import firebaseStorageService from '../../services/firebase/storage';

const ServiceCard = ({ service, category = 'services' }) => {
  const { addToCart, removeFromCart, isInCart } = useServiceCart();
  const [imageUrl, setImageUrl] = useState('/kitchens.jpg'); // Default fallback
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const inCart = isInCart(service.id);

  // Load image from Firebase Storage when component mounts
  useEffect(() => {
    const loadImage = async () => {
      try {
        setImageLoading(true);
        setImageError(false);
        
        // Get image URL based on service name
        const url = await firebaseStorageService.getServiceImageUrl(service.name);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading service image:', error);
        setImageError(true);
        // Keep fallback image
      } finally {
        setImageLoading(false);
      }
    };

    if (service?.name) {
      loadImage();
    }
  }, [service?.name]);
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(service, category);
  };
  
  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    removeFromCart(service.id);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageUrl('/kitchens.jpg'); // Fallback to local image
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Service Image */}
      <div className="w-full h-60 relative">
        {imageLoading && (
          <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A1A1A]"></div>
          </div>
        )}
        
        <img 
          src={imageUrl}
          alt={service.name}
          className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={handleImageError}
          style={{ display: imageLoading ? 'none' : 'block' }}
        />
        
        {imageError && !imageLoading && (
          <div className="w-full h-full bg-gradient-to-br from-[#3A1A1A] to-[#5A2A2A] rounded-t-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">🔧</div>
              <div className="text-sm">Image not available</div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold text-[#3A1A1A]">{service.name}</h3>
            {/* {service.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
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
      
      {/* Action Button */}
      <div className="border-t border-gray-100 pt-3">
        {inCart ? (
          <button
            onClick={handleRemoveFromCart}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors font-medium flex items-center justify-center"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#6B4B41] text-white py-2 px-4 rounded-md hover:bg-[#2b1414] transition-colors font-medium flex items-center justify-center"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
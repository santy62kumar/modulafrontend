// // // client/src/pages/maintenance/SupportPage.jsx
// // import React from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import ServiceCard from '../../components/maintenance/ServiceCard';
// // import ServiceNavigation from '../../components/maintenance/ServiceNavigation';
// // import { servicesData } from '../../data/servicesData';

// // const SupportPage = () => {
// //   const navigate = useNavigate();
// //   const { projectId } = useParams();

// //   const handleRequestService = (service) => {
// //     navigate(`/dashboard/project/${projectId}/service-request`, {
// //       state: {
// //         service,
// //         category: 'support',
// //         projectId
// //       }
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
    
// //       {/* Navigation */}
// //       <ServiceNavigation projectId={projectId} />
      
// //       {/* Header */}
// //       <div className="bg-white shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">Support</h1>
// //               <p className="text-gray-600 mt-1">Get help with repairs, fixes, and troubleshooting</p>
// //             </div>
// //             <button
// //               onClick={() => navigate(`/dashboard/project/${projectId}`)}
// //               className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors"
// //             >
// //               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// //               </svg>
// //               Back to Dashboard
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Support Grid */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {servicesData.support.map((service) => (
// //             <ServiceCard
// //               key={service.id}
// //               service={service}
// //               onRequestService={handleRequestService}
// //             />
// //           ))}
// //         </div>
// //       </div>

// //       {/* Empty State */}
// //       {servicesData.support.length === 0 && (
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //           <div className="text-center">
// //             <div className="text-6xl mb-4">🛠️</div>
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">No Support Options Available</h3>
// //             <p className="text-gray-500">Support services will be available soon.</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SupportPage;

// // client/src/pages/maintenance/SupportPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { feedbackAPI } from '../../services/api/feedback';
// import ServiceCard from '../../components/maintenance/ServiceCard';
// import ServiceNavigation from '../../components/maintenance/ServiceNavigation';
// import { servicesData } from '../../data/servicesData';

// const SupportPage = () => {
//   const navigate = useNavigate();
//   const { projectId } = useParams();
//   const { state, dispatch } = useAuth();
//   const [feedbackStatus, setFeedbackStatus] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     checkFeedbackStatus();
//   }, []);

//   const checkFeedbackStatus = async () => {
//     try {
//       const response = await feedbackAPI.checkFeedbackStatus();
//       setFeedbackStatus(response.data);
//     } catch (error) {
//       console.error('Error checking feedback status:', error);
//     }
//   };

//   const handleLogout = () => {
//     dispatch({ type: 'LOGOUT' });
//   };

//   const navigateToProjects = () => {
//     navigate('/dashboard');
//   };

//   const navigateToFeedback = () => {
//     navigate('/dashboard/feedback');
//   };

//   const handleServiceNavigation = (category) => {
//     navigate(`/dashboard/project/${projectId}/${category}`);
//   };

//   const handleRequestService = (service) => {
//     navigate(`/dashboard/project/${projectId}/service-request`, {
//       state: {
//         service,
//         category: 'support',
//         projectId
//       }
//     });
//   };

//   const menuItems = [
//     { label: 'Services', category: 'services' },
//     { label: 'Upgrade', category: 'upgrade' },
//     { label: 'Support', category: 'support' },
//     { label: "Service History", category: "service-history" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F1E6DD]">
//       {/* Uniform Header */}
//       <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate(`/dashboard/project/${projectId}`)}
//                 className="flex items-center space-x-3 focus:outline-none"
//               >
//                 <img
//                   alt="Modula Logo"
//                   width="120"
//                   height="40"
//                   className="h-10 w-auto"
//                   src="/modua.png"
//                   style={{ color: "transparent" }}
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                     e.target.nextSibling.style.display = "block";
//                   }}
//                 />
//                 <h1
//                   className="text-2xl font-bold text-[#3A1A1A] font-montserrat"
//                   style={{ display: "none" }}
//                 >
//                   Modula
//                 </h1>
//               </button>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={navigateToProjects}
//                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#6B4B41] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
//               >
//                 All Projects
//               </button>
              
//               <a 
//                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" 
//                 href="https://www.modula.in/contact-us"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Contact Us
//               </a>
              
//               <button
//                 onClick={navigateToFeedback}
//                 className={`font-montserrat text-[14px] leading-[18px] font-bold px-4 py-2 rounded-[30px] transition-colors text-center ${
//                   feedbackStatus?.hasSubmitted
//                     ? 'bg-green-500 text-white hover:bg-green-600'
//                     : feedbackStatus?.canSubmit
//                     ? 'bg-[#AF7C71] text-white hover:bg-[#6B4B41] animate-pulse'
//                     : 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                 }`}
//                 disabled={!feedbackStatus?.canSubmit && !feedbackStatus?.hasSubmitted}
//                 title={
//                   feedbackStatus?.hasSubmitted 
//                     ? 'Feedback submitted' 
//                     : feedbackStatus?.canSubmit 
//                     ? 'Submit feedback' 
//                     : 'Feedback not available yet'
//                 }
//               >
//                 {feedbackStatus?.hasSubmitted ? 'Feedback ✓' : 'Feedback'}
//               </button>
              
//               <div className="relative inline-block text-left">
//                 <button
//                   onClick={() => setOpen(!open)}
//                   className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
//                 >
//                   Customer Support
//                 </button>

//                 {open && (
//                   <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                     {menuItems.map((item, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           handleServiceNavigation(item.category);
//                           setOpen(false);
//                         }}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F1EC] hover:text-[#3A1A1A] transition-all"
//                       >
//                         {item.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               <button
//                 onClick={handleLogout}
//                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       {/* <ServiceNavigation projectId={projectId} /> */}
      
//       {/* Header */}
//       <div className="bg-[#F1E6DD]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">Support</h1>
//               {/* <p className="text-gray-600 mt-1">Get help with repairs, fixes, and troubleshooting</p> */}
//             </div>
//             {/* <button
//               onClick={() => navigate(`/dashboard/project/${projectId}`)}
//               className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Back to Dashboard
//             </button> */}
//           </div>
//         </div>
//       </div>

//       {/* Support Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {servicesData.support.map((service) => (
//             <ServiceCard
//               key={service.id}
//               service={service}
//               onRequestService={handleRequestService}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Empty State */}
//       {servicesData.support.length === 0 && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <div className="text-6xl mb-4">🛠️</div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Support Options Available</h3>
//             <p className="text-gray-500">Support services will be available soon.</p>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-[#3A1A1A] py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <div className="flex space-x-6">
//               <a 
//                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
//                 href="https://www.instagram.com/modulaindia/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
//                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//                 </svg>
//               </a>
//               <a 
//                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
//                 href="https://www.youtube.com/@modula_india_11"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
//                   <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
//                   <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
//                 </svg>
//               </a>
//               <a 
//                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
//                 href="https://www.linkedin.com/company/modulaindia/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
//                   <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//                   <rect x="2" y="9" width="4" height="12"></rect>
//                   <circle cx="4" cy="4" r="2"></circle>
//                 </svg>
//               </a>
//             </div>
//             <a 
//               className="bg-[#F1E6DD] text-[#3A1A1A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#f7d3b6] transition-colors font-medium" 
//               href="https://www.modula.in/price-calculator"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Get a Free Quote
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SupportPage;

// client/src/pages/maintenance/SupportPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useServiceCart } from '../../context/ServiceCartContext';
import { feedbackAPI } from '../../services/api/feedback';
import ServiceCard from '../../components/maintenance/ServiceCard';
import { servicesData } from '../../data/servicesData';

const SupportPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { state, dispatch } = useAuth();
  const { totalItems, canProceedToCheckout, setCategory, clearCart } = useServiceCart();
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only set if needed
    setCategory((prev) => (prev !== 'support' ? 'support' : prev));

    return () => {
      if (
        !window.location.pathname.includes('/services') &&
        !window.location.pathname.includes('/service-request')
      ) {
        clearCart();
      }
    };
    // ✅ setters (setCategory, clearCart) are stable, so don't add them
  }, []);

  const checkFeedbackStatus = async () => {
    try {
      const response = await feedbackAPI.checkFeedbackStatus();
      setFeedbackStatus(response.data);
    } catch (error) {
      console.error('Error checking feedback status:', error);
    }
  };

  const handleLogout = () => {
    clearCart(); // Clear cart on logout
    dispatch({ type: 'LOGOUT' });
  };

  const navigateToProjects = () => {
    navigate('/dashboard');
  };

  const navigateToFeedback = () => {
    navigate('/dashboard/feedback');
  };

  const handleServiceNavigation = (category) => {
    navigate(`/dashboard/project/${projectId}/${category}`);
  };

  const handleProceedToCheckout = () => {
    navigate(`/dashboard/project/${projectId}/service-request`);
  };

  const menuItems = [
    { label: 'Services', category: 'services' },
    { label: 'Upgrade', category: 'upgrade' },
    { label: 'Support', category: 'support' },
    { label: "Service History", category: "service-history" },
  ];

  return (
    <div className="min-h-screen bg-[#F1E6DD]">
      {/* Uniform Header */}
      <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/dashboard/project/${projectId}`)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <img
                  alt="Modula Logo"
                  width="120"
                  height="40"
                  className="h-10 w-auto"
                  src="/modua.png"
                  style={{ color: "transparent" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <h1
                  className="text-2xl font-bold text-[#3A1A1A] font-montserrat"
                  style={{ display: "none" }}
                >
                  Modula
                </h1>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={navigateToProjects}
                className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#6B4B41] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
              >
                All Projects
              </button>
              
              <a 
                className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" 
                href="https://www.modula.in/contact-us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
              
              <button
                onClick={navigateToFeedback}
                className={`font-montserrat text-[14px] leading-[18px] font-bold px-4 py-2 rounded-[30px] transition-colors text-center ${
                  feedbackStatus?.hasSubmitted
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : feedbackStatus?.canSubmit
                    ? 'bg-[#AF7C71] text-white hover:bg-[#6B4B41] animate-pulse'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
                disabled={!feedbackStatus?.canSubmit && !feedbackStatus?.hasSubmitted}
                title={
                  feedbackStatus?.hasSubmitted 
                    ? 'Feedback submitted' 
                    : feedbackStatus?.canSubmit 
                    ? 'Submit feedback' 
                    : 'Feedback not available yet'
                }
              >
                {feedbackStatus?.hasSubmitted ? 'Feedback ✓' : 'Feedback'}
              </button>
              
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setOpen(!open)}
                  className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
                >
                  Customer Support
                </button>

                {open && (
                  <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleServiceNavigation(item.category);
                          setOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F1EC] hover:text-[#3A1A1A] transition-all"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={handleLogout}
                className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Header with Cart */}
      <div className="bg-[#F1E6DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">Support</h1>
              {/* <p className="text-[#6B4B41] mt-1">Get help with repairs, fixes, and troubleshooting</p> */}
            </div>
            
            {/* Cart Badge and Checkout Button */}
            <div className="flex items-center space-x-4">
              {/* Cart Badge */}
              <div className="relative">
                <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-[#D7C5AA]">
                  <svg className="w-5 h-5 text-[#6B4B41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h6a1 1 0 001-1v-6m-8 0V9a1 1 0 011-1h6a1 1 0 011-1v4" />
                  </svg>
                  <span className="text-sm font-medium text-[#3A1A1A]">
                    {totalItems} {totalItems === 1 ? 'Service' : 'Services'}
                  </span>
                </div>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#AF7C71] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {totalItems}
                  </div>
                )}
              </div>
              
              {/* Checkout Button */}
              {canProceedToCheckout() && (
                <button
                  onClick={handleProceedToCheckout}
                  className="bg-[#AF7C71] text-white px-6 py-2 rounded-lg hover:bg-[#6B4B41] transition-colors font-medium flex items-center space-x-2 animate-pulse hover:animate-none"
                >
                  <span>Submit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Support Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.support.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              category="support"
            />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {servicesData.support.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Support Options Available</h3>
            <p className="text-gray-500">Support services will be available soon.</p>
          </div>
        </div>
      )}

      {/* Selected Services Summary (Mobile/Bottom) */}
      {canProceedToCheckout() && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#6B4B41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h6a1 1 0 001-1v-6m-8 0V9a1 1 0 011-1h6a1 1 0 011-1v4" />
              </svg>
              {/* <span className="font-medium text-[#3A1A1A]">
                {totalItems} {totalItems === 1 ? 'service' : 'services'} selected
              </span> */}
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="bg-[#AF7C71] text-white px-6 py-2 rounded-lg hover:bg-[#6B4B41] transition-colors font-medium"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#3A1A1A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a 
                className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
                href="https://www.instagram.com/modulaindia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
                href="https://www.youtube.com/@modula_india_11"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a 
                className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
                href="https://www.linkedin.com/company/modulaindia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
            <a 
              className="bg-[#F1E6DD] text-[#3A1A1A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#f7d3b6] transition-colors font-medium" 
              href="https://www.modula.in/price-calculator"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupportPage;
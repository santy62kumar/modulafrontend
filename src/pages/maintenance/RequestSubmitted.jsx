

// // client/src/pages/maintenance/RequestSubmitted.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { feedbackAPI } from '../../services/api/feedback';

// const RequestSubmitted = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { projectId } = useParams();
//   const { state, dispatch } = useAuth();
//   const [feedbackStatus, setFeedbackStatus] = useState(null);
//   const [open, setOpen] = useState(false);

//   const { service, category, requestData } = location.state || {};

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

//   const menuItems = [
//     { label: 'Services', category: 'services' },
//     { label: 'Upgrade', category: 'upgrade' },
//     { label: 'Support', category: 'support' },
//     { label: "Service History", category: "service-history" },
//   ];

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not specified';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatUrgency = (urgency) => {
//     const urgencyMap = {
//       low: { label: 'Low Priority', color: 'text-green-600', bgColor: 'bg-green-100' },
//       normal: { label: 'Normal Priority', color: 'text-blue-600', bgColor: 'bg-blue-100' },
//       high: { label: 'High Priority', color: 'text-orange-600', bgColor: 'bg-orange-100' },
//       urgent: { label: 'Urgent', color: 'text-red-600', bgColor: 'bg-red-100' }
//     };
//     return urgencyMap[urgency] || urgencyMap.normal;
//   };

//   if (!service || !category || !requestData) {
//     return (
//       <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Not Found</h2>
//           <button
//             onClick={() => navigate(`/dashboard/project/${projectId}`)}
//             className="text-[#3A1A1A] hover:text-[#2b1414] font-medium"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const urgencyInfo = formatUrgency(requestData.urgency);

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

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Success Header */}
//         <div className="text-center mb-8">
//           {/* <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
//             <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div> */}
//           <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">Request Submitted Successfully!</h1>
//           {/* <p className="text-gray-600">Your service request has been received and is being processed.</p> */}
//         </div>

//         {/* Request Details Card */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
//           <div className="px-6 py-4 bg-gray-50 border-b">
//             <h2 className="text-lg font-semibold text-gray-900">Request Details</h2>
//           </div>
          
//           <div className="p-6 space-y-4">
//             {/* Service Info */}
//             <div className="flex items-start space-x-4 pb-4 border-b">
//               <div className="text-3xl">{service.icon}</div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
//                 <p className="text-sm text-gray-500 capitalize mb-2">{category}</p>
//                 {service.description && (
//                   <p className="text-sm text-gray-600">{service.description}</p>
//                 )}
//               </div>
//               <div className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyInfo.bgColor} ${urgencyInfo.color}`}>
//                 {urgencyInfo.label}
//               </div>
//             </div>

//             {/* Request Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 mb-1">Contact Name</dt>
//                 <dd className="text-sm text-gray-900">{requestData.contactName}</dd>
//               </div>
              
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 mb-1">Contact Phone</dt>
//                 <dd className="text-sm text-gray-900">{requestData.contactPhone}</dd>
//               </div>
              
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 mb-1">Preferred Date</dt>
//                 <dd className="text-sm text-gray-900">{formatDate(requestData.preferredDate)}</dd>
//               </div>
              
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 mb-1">Request Status</dt>
//                 <dd className="flex items-center">
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Pending
//                   </span>
//                 </dd>
//               </div>
//             </div>

//             {/* Description */}
//             {requestData.description && (
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 mb-1">Description</dt>
//                 <dd className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
//                   {requestData.description}
//                 </dd>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Next Steps */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
//           <h3 className="text-lg font-medium text-blue-900 mb-3">What Happens Next?</h3>
//           <div className="space-y-3">
//             <div className="flex items-start">
//               <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
//               <p className="text-sm text-blue-800">Our team will review your request within 24 hours</p>
//             </div>
//             <div className="flex items-start">
//               <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
//               <p className="text-sm text-blue-800">A technician will be assigned based on your location and requirements</p>
//             </div>
//             <div className="flex items-start">
//               <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
//               <p className="text-sm text-blue-800">You'll receive a confirmation call to schedule the service</p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <button
//             onClick={() => navigate(`/dashboard/project/${projectId}`)}
//             className="flex-1 bg-[#3A1A1A] text-white py-3 px-6 rounded-lg hover:bg-[#2b1414] transition-colors font-medium text-center"
//           >
//             Back to Dashboard
//           </button>
          
//           <button
//             onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
//             className="flex-1 border border-[#3A1A1A] text-[#3A1A1A] py-3 px-6 rounded-lg hover:bg-[#3A1A1A] hover:text-white transition-colors font-medium text-center"
//           >
//             Request Another Service
//           </button>
//         </div>

//         {/* Support Note */}
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>Need help? Contact our support team at <span className="font-medium">support@modula.in</span></p>
//         </div>
//       </div>

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

// export default RequestSubmitted;

// client/src/pages/maintenance/RequestSubmitted.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { feedbackAPI } from '../../services/api/feedback';

const RequestSubmitted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const { state, dispatch } = useAuth();
  // const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [open, setOpen] = useState(false);

  // Updated to handle multiple services
  const { services, category, requestData, totalServices } = location.state || {};

  // useEffect(() => {
  //   //checkFeedbackStatus();
  // }, []);

  // const checkFeedbackStatus = async () => {
  //   try {
  //     const response = await feedbackAPI.checkFeedbackStatus();
  //     setFeedbackStatus(response.data);
  //   } catch (error) {
  //     console.error('Error checking feedback status:', error);
  //   }
  // };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const navigateToProjects = () => {
    navigate('/dashboard');
  };

  // const navigateToFeedback = () => {
  //   navigate('/dashboard/feedback');
  // };

  const handleServiceNavigation = (category) => {
    navigate(`/dashboard/project/${projectId}/${category}`);
  };

  const menuItems = [
    { label: 'Services', category: 'services' },
    { label: 'Upgrade', category: 'upgrade' },
    { label: 'Support', category: 'support' },
    { label: "Service History", category: "service-history" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatUrgency = (urgency) => {
    const urgencyMap = {
      low: { label: 'Low Priority', color: 'text-green-600', bgColor: 'bg-green-100' },
      normal: { label: 'Normal Priority', color: 'text-blue-600', bgColor: 'bg-blue-100' },
      high: { label: 'High Priority', color: 'text-orange-600', bgColor: 'bg-orange-100' },
      urgent: { label: 'Urgent', color: 'text-red-600', bgColor: 'bg-red-100' }
    };
    return urgencyMap[urgency] || urgencyMap.normal;
  };

  if (!services || !category || !requestData) {
    return (
      <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Not Found</h2>
          <button
            onClick={() => navigate(`/dashboard/project/${projectId}`)}
            className="text-[#3A1A1A] hover:text-[#2b1414] font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const urgencyInfo = formatUrgency(requestData.urgency);

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
              
              {/* <a 
                className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" 
                href="https://www.modula.in/contact-us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a> */}
              
              {/* <button
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
              </button> */}
              
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          {/* <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div> */}
          <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">
            Submitted Successfully!
          </h1>
          {/* <p className="text-[#6B4B41] mt-2">
            {totalServices === 1 
              ? 'Your service request has been received and is being processed.'
              : `All ${totalServices} service requests have been received and are being processed.`
            }
          </p> */}
        </div>

        {/* Request Details Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Request Details</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyInfo.bgColor} ${urgencyInfo.color}`}>
                {urgencyInfo.label}
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Services List */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Submitted Services ({totalServices}):
              </h3>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={service.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                    {/* <div className="text-2xl">{service.icon}</div> */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      {/* <p className="text-sm text-gray-500 capitalize">{category}</p>
                      {service.description && (
                        <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                      )} */}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Contact Name</dt>
                <dd className="text-sm text-gray-900">{requestData.contactName}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Contact Phone</dt>
                <dd className="text-sm text-gray-900">{requestData.contactPhone}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Preferred Date</dt>
                <dd className="text-sm text-gray-900">{formatDate(requestData.preferredDate)}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Total Requests</dt>
                <dd className="text-sm text-gray-900 font-medium">{totalServices} service{totalServices > 1 ? 's' : ''}</dd>
              </div>
            </div>

            {/* Description */}
            {requestData.description && (
              <div className="pt-4 border-t border-gray-200">
                <dt className="text-sm font-medium text-gray-500 mb-1">Overall Description</dt>
                <dd className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                  {requestData.description}
                </dd>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(`/dashboard/project/${projectId}`)}
            className="flex-1 bg-[#3A1A1A] text-white py-3 px-6 rounded-lg hover:bg-[#2b1414] transition-colors font-medium text-center"
          >
            Back to Dashboard
          </button>
          
          <button
            onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
            className="flex-1 border border-[#3A1A1A] text-[#3A1A1A] py-3 px-6 rounded-lg hover:bg-[#3A1A1A] hover:text-white transition-colors font-medium text-center"
          >
            Request More Services
          </button>
        </div>

        {/* Support Note */}
        {/* <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at <span className="font-medium">support@modula.in</span></p>
        </div> */}
      </div>

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

export default RequestSubmitted;
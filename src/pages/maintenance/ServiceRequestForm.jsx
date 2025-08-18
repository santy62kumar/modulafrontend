// client/src/pages/maintenance/ServiceRequestForm.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { submitServiceRequest } from '../../services/api/maintenance';

// const ServiceRequestForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { projectId } = useParams();
//   const { state: authState } = useAuth();

//   const [formData, setFormData] = useState({
//     description: '',
//     contactName: '',
//     contactPhone: '',
//     preferredDate: '',
//     urgency: 'normal'
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Get service data from location state
//   const { service, category } = location.state || {};

//   useEffect(() => {
//     if (!service || !category) {
//       navigate(`/dashboard/project/${projectId}`);
//       return;
//     }

//     // Pre-fill contact information from auth state
//     if (authState.user) {
//       setFormData(prev => ({
//         ...prev,
//         contactName: authState.user.name || '',
//         contactPhone: authState.user.phone || ''
//       }));
//     }
//   }, [service, category, authState.user, navigate, projectId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const requestData = {
//         projectId,
//         category,
//         serviceId: service.id,
//         serviceName: service.name,
//         description: formData.description,
//         contactName: formData.contactName,
//         contactPhone: formData.contactPhone,
//         preferredDate: formData.preferredDate,
//         urgency: formData.urgency
//       };

//       await submitServiceRequest(requestData);
      
//       // Navigate to success page
//       navigate(`/dashboard/project/${projectId}/request-submitted`, {
//         state: {
//           service,
//           category,
//           requestData
//         }
//       });
//     } catch (err) {
//       console.error('Error submitting service request:', err);
//       setError(err.message || 'Failed to submit service request. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!service || !category) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors mb-4"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back
//           </button>
          
//           <h1 className="text-3xl font-bold text-gray-900">Request Service</h1>
//           <p className="text-gray-600 mt-2">Fill out the form below to request this service</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {/* Service Summary */}
//           <div className="bg-gray-50 px-6 py-4 border-b">
//             <div className="flex items-center space-x-4">
//               <div className="text-3xl">{service.icon}</div>
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">{service.name}</h2>
//                 <p className="text-sm text-gray-600 capitalize">{category}</p>
//                 {service.description && (
//                   <p className="text-sm text-gray-500 mt-1">{service.description}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Request Form */}
//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                 <div className="flex">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-red-800">Error</h3>
//                     <p className="text-sm text-red-700 mt-1">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 rows={4}
//                 required
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Please describe your specific requirements or issues..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//               />
//             </div>

//             {/* Contact Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="contactName"
//                   name="contactName"
//                   required
//                   value={formData.contactName}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Phone *
//                 </label>
//                 <input
//                   type="tel"
//                   id="contactPhone"
//                   name="contactPhone"
//                   required
//                   value={formData.contactPhone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 />
//               </div>
//             </div>

//             {/* Preferred Date and Urgency */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
//                   Preferred Date
//                 </label>
//                 <input
//                   type="date"
//                   id="preferredDate"
//                   name="preferredDate"
//                   value={formData.preferredDate}
//                   onChange={handleInputChange}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
//                   Urgency Level
//                 </label>
//                 <select
//                   id="urgency"
//                   name="urgency"
//                   value={formData.urgency}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 >
//                   <option value="low">Low - Can wait a week</option>
//                   <option value="normal">Normal - Within a few days</option>
//                   <option value="high">High - As soon as possible</option>
//                   <option value="urgent">Urgent - Same day if possible</option>
//                 </select>
//               </div>
//             </div>

//             {/* Service Features Info */}
//             {service.features && service.features.length > 0 && (
//               <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//                 <h4 className="text-sm font-medium text-blue-900 mb-2">What's included:</h4>
//                 <ul className="text-sm text-blue-800 space-y-1">
//                   {service.features.map((feature, index) => (
//                     <li key={index} className="flex items-center">
//                       <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="flex items-center justify-end space-x-4 pt-6 border-t">
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A]"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3A1A1A] hover:bg-[#2b1414] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting...
//                   </>
//                 ) : (
//                   'Submit Request'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceRequestForm;

// // client/src/pages/maintenance/ServiceRequestForm.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { feedbackAPI } from '../../services/api/feedback';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { submitServiceRequest } from '../../services/api/maintenance';

// const ServiceRequestForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { projectId } = useParams();
//   const { state: authState, dispatch } = useAuth();
//   const [feedbackStatus, setFeedbackStatus] = useState(null);
//   const [open, setOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     description: '',
//     contactName: '',
//     contactPhone: '',
//     preferredDate: '',
//     urgency: 'normal'
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Get service data from location state
//   const { service, category } = location.state || {};

//   useEffect(() => {
//     if (!service || !category) {
//       navigate(`/dashboard/project/${projectId}`);
//       return;
//     }

//     // Pre-fill contact information from auth state
//     if (authState.user) {
//       setFormData(prev => ({
//         ...prev,
//         contactName: authState.user.name || '',
//         contactPhone: authState.user.phone || ''
//       }));
//     }

//     checkFeedbackStatus();
//   }, [service, category, authState.user, navigate, projectId]);

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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const requestData = {
//         projectId,
//         category,
//         serviceId: service.id,
//         serviceName: service.name,
//         description: formData.description,
//         contactName: formData.contactName,
//         contactPhone: formData.contactPhone,
//         preferredDate: formData.preferredDate,
//         urgency: formData.urgency
//       };

//       await submitServiceRequest(requestData);
      
//       // Navigate to success page
//       navigate(`/dashboard/project/${projectId}/request-submitted`, {
//         state: {
//           service,
//           category,
//           requestData
//         }
//       });
//     } catch (err) {
//       console.error('Error submitting service request:', err);
//       setError(err.message || 'Failed to submit service request. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!service || !category) {
//     return (
//       <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

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
//         {/* Header */}
//         <div className="mb-8">
//           {/* <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors mb-4"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back
//           </button> */}
          
//           <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">Request Service</h1>
//           {/* <p className="text-gray-600 mt-2">Fill out the form below to request this service</p> */}
//         </div>

//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {/* Service Summary */}
//           <div className="bg-gray-50 px-6 py-4 border-b">
//             <div className="flex items-center space-x-4">
//               <div className="text-3xl">{service.icon}</div>
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">{service.name}</h2>
//                 <p className="text-sm text-gray-600 capitalize">{category}</p>
//                 {service.description && (
//                   <p className="text-sm text-gray-500 mt-1">{service.description}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Request Form */}
//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                 <div className="flex">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-red-800">Error</h3>
//                     <p className="text-sm text-red-700 mt-1">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 rows={4}
//                 required
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Please describe your specific requirements or issues..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//               />
//             </div>

//             {/* Contact Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="contactName"
//                   name="contactName"
//                   required
//                   value={formData.contactName}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Phone *
//                 </label>
//                 <input
//                   type="tel"
//                   id="contactPhone"
//                   name="contactPhone"
//                   required
//                   value={formData.contactPhone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 />
//               </div>
//             </div>

//             {/* Preferred Date and Urgency */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
//                   Preferred Date
//                 </label>
//                 <input
//                   type="date"
//                   id="preferredDate"
//                   name="preferredDate"
//                   value={formData.preferredDate}
//                   onChange={handleInputChange}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
//                   Urgency Level
//                 </label>
//                 <select
//                   id="urgency"
//                   name="urgency"
//                   value={formData.urgency}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                 >
//                   <option value="low">Low - Can wait a week</option>
//                   <option value="normal">Normal - Within a few days</option>
//                   <option value="high">High - As soon as possible</option>
//                   <option value="urgent">Urgent - Same day if possible</option>
//                 </select>
//               </div>
//             </div>

//             {/* Service Features Info */}
//             {service.features && service.features.length > 0 && (
//               <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//                 <h4 className="text-sm font-medium text-blue-900 mb-2">What's included:</h4>
//                 <ul className="text-sm text-blue-800 space-y-1">
//                   {service.features.map((feature, index) => (
//                     <li key={index} className="flex items-center">
//                       <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="flex items-center justify-end space-x-4 pt-6 border-t">
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A]"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3A1A1A] hover:bg-[#2b1414] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting...
//                   </>
//                 ) : (
//                   'Submit Request'
//                 )}
//               </button>
//             </div>
//           </form>
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

// export default ServiceRequestForm;

// client/src/pages/maintenance/ServiceRequestForm.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useServiceCart } from '../../context/ServiceCartContext';
// import { feedbackAPI } from '../../services/api/feedback';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import { submitServiceRequest } from '../../services/api/maintenance';

// const ServiceRequestForm = () => {
//   const navigate = useNavigate();
//   const { projectId } = useParams();
//   const { state: authState, dispatch } = useAuth();
//   const { items, totalItems, clearCart, canProceedToCheckout } = useServiceCart();
//   //const [feedbackStatus, setFeedbackStatus] = useState(null);
//   const [open, setOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     description: '',
//     contactName: '',
//     contactPhone: '',
//     preferredDate: '',
//     urgency: 'normal'
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Redirect if no items in cart
//     if (!canProceedToCheckout()) {
//       navigate(`/dashboard/project/${projectId}/services`);
//       return;
//     }

//     // Pre-fill contact information from auth state
//     if (authState.user) {
//       setFormData(prev => ({
//         ...prev,
//         contactName: authState.user.name || '',
//         contactPhone: authState.user.phone || ''
//       }));
//     }

//     //checkFeedbackStatus();
//   }, [authState.user, navigate, projectId, canProceedToCheckout]);

//   // const checkFeedbackStatus = async () => {
//   //   try {
//   //     const response = await feedbackAPI.checkFeedbackStatus();
//   //     setFeedbackStatus(response.data);
//   //   } catch (error) {
//   //     console.error('Error checking feedback status:', error);
//   //   }
//   // };

//   const handleLogout = () => {
//     clearCart();
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
//   const feedbackStatus = false;

//   const menuItems = [
//     { label: 'Services', category: 'services' },
//     { label: 'Upgrade', category: 'upgrade' },
//     { label: 'Support', category: 'support' },
//     { label: "Service History", category: "service-history" },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // Submit all services as separate requests or batch request
//       const promises = items.map(item => {
//         const requestData = {
//           projectId,
//           category: item.category,
//           serviceId: item.service.id,
//           serviceName: item.service.name,
//           description: formData.description,
//           contactName: formData.contactName,
//           contactPhone: formData.contactPhone,
//           preferredDate: formData.preferredDate,
//           urgency: formData.urgency
//         };
//         return submitServiceRequest(requestData);
//       });

//       await Promise.all(promises);
      
//       // Clear cart after successful submission
//       clearCart();
      
//       // Navigate to success page
//       navigate(`/dashboard/project/${projectId}/request-submitted`, {
//         state: {
//           services: items.map(item => item.service),
//           category: items[0]?.category || 'services',
//           requestData: formData,
//           totalServices: totalItems
//         }
//       });
//     } catch (err) {
//       console.error('Error submitting service requests:', err);
//       setError(err.message || 'Failed to submit service requests. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   if (!canProceedToCheckout()) {
//     return (
//       <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

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

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
//             className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors mb-4"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Services
//           </button>
          
//           <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">Request Services</h1>
//           <p className="text-[#6B4B41] mt-2">Review your selected services and provide details</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Selected Services Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Selected Services</h2>
              
//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.service.id} className="border border-gray-100 rounded-lg p-4">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-3 flex-1">
//                         {/* <div className="text-2xl">{item.service.icon}</div> */}
//                         <div className="flex-1 min-w-0">
//                           {/* <h3 className="font-medium text-gray-900 text-sm truncate">
//                             {item.service.name}
//                           </h3> */}
//                           <h3 className="font-medium text-gray-900 text-sm break-words whitespace-normal">
//                             {item.service.name}
//                           </h3>
//                         </div>
//                       </div>
                      
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-gray-900">Total Services:</span>
//                   <span className="font-bold text-[#3A1A1A]">{totalItems}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Request Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            
//               <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                 {/* Error Message */}
//                 {error && (
//                   <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                     <div className="flex">
//                       <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium text-red-800">Error</h3>
//                         <p className="text-sm text-red-700 mt-1">{error}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

                

//                 {/* Description */}
//                 <div>
                
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                     Overall Description *
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     rows={4}
//                     required
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Please describe your specific requirements for all selected services..."
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     This description will apply to all selected services. Be specific about your requirements.
//                   </p>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
//                       Contact Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="contactName"
//                       name="contactName"
//                       required
//                       value={formData.contactName}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
//                       Contact Phone *
//                     </label>
//                     <input
//                       type="tel"
//                       id="contactPhone"
//                       name="contactPhone"
//                       required
//                       value={formData.contactPhone}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                     />
//                   </div>
//                 </div>

//                 {/* Preferred Date and Urgency */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred Date
//                     </label>
//                     <input
//                       type="date"
//                       id="preferredDate"
//                       name="preferredDate"
//                       value={formData.preferredDate}
//                       onChange={handleInputChange}
//                       min={new Date().toISOString().split('T')[0]}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
//                       Urgency Level
//                     </label>
//                     <select
//                       id="urgency"
//                       name="urgency"
//                       value={formData.urgency}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
//                     >
//                       <option value="low">Low - Can wait a week</option>
//                       <option value="normal">Normal - Within a few days</option>
//                       <option value="high">High - As soon as possible</option>
//                       <option value="urgent">Urgent - Same day if possible</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Info Box */}
//                 {/* <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//                   <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next:</h4>
//                   <ul className="text-sm text-blue-800 space-y-1">
//                     <li className="flex items-center">
//                       <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Each service will be processed as a separate request
//                     </li>
//                     <li className="flex items-center">
//                       <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       You'll receive confirmation for all services
//                     </li>
//                     <li className="flex items-center">
//                       <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Services may be scheduled at different times
//                     </li>
//                   </ul>
//                 </div> */}

//                 {/* Submit Button */}
//                 <div className="flex items-center justify-end space-x-4 pt-6 border-t">
//                   <button
//                     type="button"
//                     onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
//                     className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A]"
//                   >
//                     Back to Services
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3A1A1A] hover:bg-[#2b1414] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     {isLoading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Submitting {totalItems} Services...
//                       </>
//                     ) : (
//                       `Submit ${totalItems} ${totalItems === 1 ? 'Service' : 'Services'}`
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#3A1A1A] py-6 mt-12">
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

// export default ServiceRequestForm;

// client/src/pages/maintenance/ServiceRequestForm.jsx (Debug Version)
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useServiceCart } from '../../context/ServiceCartContext';
import { feedbackAPI } from '../../services/api/feedback';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { submitServiceRequest } from '../../services/api/maintenance';

const ServiceRequestForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { state: authState, dispatch } = useAuth();
  const { items, totalItems, clearCart, canProceedToCheckout } = useServiceCart();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    contactName: '',
    contactPhone: '',
    preferredDate: '',
    urgency: 'normal'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if no items in cart
    if (!canProceedToCheckout()) {
      navigate(`/dashboard/project/${projectId}/services`);
      return;
    }

    // Pre-fill contact information from auth state
    if (authState.user) {
      setFormData(prev => ({
        ...prev,
        contactName: authState.user.name || '',
        contactPhone: authState.user.phone || ''
      }));
    }
  }, [authState.user, navigate, projectId, canProceedToCheckout]);

  const handleLogout = () => {
    clearCart();
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
  
  const feedbackStatus = false;

  const menuItems = [
    { label: 'Services', category: 'services' },
    { label: 'Upgrade', category: 'upgrade' },
    { label: 'Support', category: 'support' },
    { label: "Service History", category: "service-history" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   console.log('🚀 Starting form submission...');
  //   console.log('📋 Form Data:', formData);
  //   console.log('🛒 Cart Items:', items);
  //   console.log('📍 Project ID:', projectId);

  //   try {
  //     // Create an array to store all the request promises
  //     const requestPromises = [];
      
  //     // Submit all services as separate requests
  //     for (let i = 0; i < items.length; i++) {
  //       const item = items[i];
  //       const requestData = {
  //         projectId,
  //         category: item.category,
  //         serviceId: item.service.id,
  //         serviceName: item.service.name,
  //         description: formData.description,
  //         contactName: formData.contactName,
  //         contactPhone: formData.contactPhone,
  //         preferredDate: formData.preferredDate,
  //         urgency: formData.urgency
  //       };
        
  //       console.log(`📤 Submitting service ${i + 1}/${items.length}:`, requestData);
  //       requestPromises.push(submitServiceRequest(requestData));
  //     }

  //     // Wait for all requests to complete
  //     console.log('⏳ Waiting for all service requests to complete...');
  //     const results = await Promise.all(requestPromises);
  //     console.log('✅ All service requests completed:', results);
      
  //     // Create navigation state
  //     const navigationState = {
  //       services: items.map(item => item.service),
  //       category: items[0]?.category || 'services',
  //       requestData: formData,
  //       totalServices: totalItems
  //     };
      
  //     console.log('🧭 Navigation state:', navigationState);
      
      
  //     // Navigate to success page
  //     const successPath = `/dashboard/project/${projectId}/request-submitted`;
  //     console.log('🎯 About to navigate to:', successPath);
  //     console.log('🔍 Current location before navigation:', window.location.pathname);
      
  //     // Check if route exists
  //     console.log('🛣️ Checking if route exists...');
      
  // navigate(successPath, {
  //   state: navigationState,
  //   replace: true
  // });
  //     // navigate(`/dashboard/project/${projectId}/request-submitted`, { 
  //     //   replace: true,
  //     //   state: {
  //     //     // services: cartItems,
  //     //     category: category,
  //     //     requestData: submissionData,
  //     //     totalServices: cartItems.length
  //     //   }
  //     // });
      
  //     console.log('✅ Navigation completed!');
  //     setTimeout(() => {
  //         console.log('📍 Location after navigate():', window.location.pathname);
  //         console.log('📊 History length:', window.history.length);
  //       }, 100);
        
  //       setTimeout(() => {
  //         console.log('📍 Location after 500ms:', window.location.pathname);
  //       }, 500);
  //     // Clear cart after successful submission
  //     console.log('🧹 Clearing cart...');
  //     clearCart();
      
  //   } catch (err) {
  //     console.error('❌ Error submitting service requests:', err);
  //     console.error('📄 Error details:', {
  //       message: err.message,
  //       response: err.response?.data,
  //       status: err.response?.status
  //     });
      
  //     setError(err.response?.data?.message || err.message || 'Failed to submit service requests. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //     console.log('🏁 Form submission process completed');
      
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  console.log('🚀 Starting form submission...');
  console.log('📋 Form Data:', formData);
  console.log('🛒 Cart Items:', items);
  console.log('📍 Project ID:', projectId);

  try {
    // Create an array to store all the request promises
    const requestPromises = [];
    
    // Submit all services as separate requests
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const requestData = {
        projectId,
        category: item.category,
        serviceId: item.service.id,
        serviceName: item.service.name,
        description: formData.description,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        preferredDate: formData.preferredDate,
        urgency: formData.urgency
      };
      
      console.log(`📤 Submitting service ${i + 1}/${items.length}:`, requestData);
      requestPromises.push(submitServiceRequest(requestData));
    }

    // Wait for all requests to complete
    console.log('⏳ Waiting for all service requests to complete...');
    const results = await Promise.all(requestPromises);
    console.log('✅ All service requests completed:', results);
    
    // Create navigation state BEFORE clearing cart
    const navigationState = {
      services: items.map(item => item.service),
      category: items[0]?.category || 'services',
      requestData: formData,
      totalServices: totalItems
    };
    
    console.log('🧭 Navigation state:', navigationState);
    console.log('🔍 Current location before navigation:', window.location.pathname);
    
    // Navigate to success page FIRST
    const successPath = `/dashboard/project/${projectId}/request-submitted`;
    console.log('🎯 Navigating to:', successPath);
    
    navigate(successPath, {
      state: navigationState,
      replace: true
    });
    
    console.log('✅ Navigation completed!');
    
    // Clear cart AFTER navigation in a setTimeout to ensure navigation completes first
    setTimeout(() => {
      console.log('🧹 Clearing cart after navigation...');
      clearCart();
    }, 100);
    
  } catch (err) {
    console.error('❌ Error submitting service requests:', err);
    console.error('📄 Error details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status
    });
    
    setError(err.response?.data?.message || err.message || 'Failed to submit service requests. Please try again.');
  } finally {
    setIsLoading(false);
    console.log('🏁 Form submission process completed');
  }
};

  // Debug: Log current state
  console.log('🔍 Current component state:', {
    projectId,
    totalItems,
    canProceedToCheckout: canProceedToCheckout(),
    itemsInCart: items.length,
    isLoading,
    error
  });

  if (!canProceedToCheckout()) {
    return (
      <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold mb-4">No Services Selected</h2>
          <p className="mb-4">Please select services before proceeding to checkout.</p>
          <button
            onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
            className="bg-[#3A1A1A] text-white px-4 py-2 rounded"
          >
            Go to Services
          </button>
        </div>
      </div>
    );
  }

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
                className="font-montserrat text-[14px] leading-[18px] font-bold px-4 py-2 rounded-[30px] transition-colors text-center bg-gray-300 text-gray-600 cursor-not-allowed"
                disabled
              >
                Feedback
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* <button
            onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
            className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </button> */}
          
          <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">Request Services</h1>
          {/* <p className="text-[#6B4B41] mt-2">Review your selected services and provide details</p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Services Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Selected Services</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.service.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm break-words whitespace-normal">
                            {item.service.name}
                          </h3>
                          <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total Services:</span>
                  <span className="font-bold text-[#3A1A1A]">{totalItems}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Overall Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Please describe your specific requirements for all selected services..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This description will apply to all selected services. Be specific about your requirements.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      required
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
                    />
                  </div>
                </div>

                {/* Preferred Date and Urgency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3A1A1A] focus:border-[#3A1A1A]"
                    >
                      <option value="low">Low - Can wait a week</option>
                      <option value="normal">Normal - Within a few days</option>
                      <option value="high">High - As soon as possible</option>
                      <option value="urgent">Urgent - Same day if possible</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
                    className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A]"
                  >
                    Back to Services
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3A1A1A] hover:bg-[#2b1414] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A1A1A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting {totalItems} Services...
                      </>
                    ) : (
                      `Submit ${totalItems} ${totalItems === 1 ? 'Service' : 'Services'}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3A1A1A] py-6 mt-12">
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

export default ServiceRequestForm;
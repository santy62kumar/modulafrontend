// // client/src/pages/maintenance/ServiceHistory.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getServiceRequests } from '../../services/api/maintenance';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';

// const ServiceHistory = () => {
//   const navigate = useNavigate();
//   const { projectId } = useParams();
//   const [requests, setRequests] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchServiceRequests = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getServiceRequests(projectId);
//         setRequests(data.requests || []);
//       } catch (err) {
//         console.error('Error fetching service requests:', err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (projectId) {
//       fetchServiceRequests();
//     }
//   }, [projectId]);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusColor = (status) => {
//     const statusColors = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       completed: 'bg-green-100 text-green-800',
//       cancelled: 'bg-red-100 text-red-800',
//       in_progress: 'bg-blue-100 text-blue-800'
//     };
//     return statusColors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getUrgencyColor = (urgency) => {
//     const urgencyColors = {
//       low: 'text-green-600',
//       normal: 'text-blue-600',
//       high: 'text-orange-600',
//       urgent: 'text-red-600'
//     };
//     return urgencyColors[urgency] || 'text-gray-600';
//   };

//   const getCategoryIcon = (category) => {
//     const icons = {
//       services: '🔧',
//       upgrade: '⬆️',
//       support: '🛠️'
//     };
//     return icons[category] || '📋';
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(`/dashboard/project/${projectId}`)}
//             className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors mb-4"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Dashboard
//           </button>
          
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Service History</h1>
//               <p className="text-gray-600 mt-2">View all your past and current service requests</p>
//             </div>
            
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
//                 className="bg-[#3A1A1A] text-white px-4 py-2 rounded-lg hover:bg-[#2b1414] transition-colors font-medium"
//               >
//                 Request New Service
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
//             <div className="flex">
//               <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">Error Loading Requests</h3>
//                 <p className="text-sm text-red-700 mt-1">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Service Requests List */}
//         {requests.length > 0 ? (
//           <div className="space-y-4">
//             {requests.map((request) => (
//               <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4 flex-1">
//                       {/* Category Icon */}
//                       <div className="text-2xl">
//                         {getCategoryIcon(request.category)}
//                       </div>
                      
//                       {/* Request Details */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center space-x-3 mb-2">
//                           <h3 className="text-lg font-medium text-gray-900 truncate">
//                             {request.service_name}
//                           </h3>
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
//                             {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
//                           </span>
//                         </div>
                        
//                         <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
//                           <span className="capitalize">{request.category}</span>
//                           <span>•</span>
//                           <span>Requested on {formatDate(request.created_at)}</span>
//                           <span>•</span>
//                           <span className={getUrgencyColor(request.urgency)}>
//                             {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
//                           </span>
//                         </div>
                        
//                         {request.description && (
//                           <p className="text-sm text-gray-600 line-clamp-2 mb-3">
//                             {request.description}
//                           </p>
//                         )}
                        
//                         <div className="flex items-center space-x-6 text-xs text-gray-500">
//                           <span>Contact: {request.contact_name}</span>
//                           <span>Phone: {request.contact_phone}</span>
//                           {request.preferred_date && (
//                             <span>Preferred: {new Date(request.preferred_date).toLocaleDateString()}</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Request ID */}
//                     <div className="text-right">
//                       <div className="text-xs text-gray-500 mb-1">Request ID</div>
//                       <div className="text-sm font-mono text-gray-900">
//                         #{request.id.slice(-8).toUpperCase()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Timeline or Additional Info */}
//                 {request.status_updated_at && request.status_updated_at !== request.created_at && (
//                   <div className="bg-gray-50 px-6 py-3 border-t">
//                     <div className="text-xs text-gray-500">
//                       Last updated: {formatDate(request.status_updated_at)}
//                       {request.notes && (
//                         <span className="ml-4 text-gray-700">• {request.notes}</span>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           // Empty State
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">📋</div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Service Requests Yet</h3>
//             <p className="text-gray-500 mb-6">You haven't made any service requests for this project.</p>
//             <button
//               onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
//               className="bg-[#3A1A1A] text-white px-6 py-3 rounded-lg hover:bg-[#2b1414] transition-colors font-medium"
//             >
//               Request Your First Service
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ServiceHistory;

// client/src/pages/maintenance/ServiceHistory.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { feedbackAPI } from '../../services/api/feedback';
import { getServiceRequestsByProject } from '../../services/api/maintenance';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ServiceHistory = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { state, dispatch } = useAuth();
  // const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        setIsLoading(true);
        const data = await getServiceRequestsByProject(projectId);
        console.log('Service requests data:', data);
        console.log("request data received ",data.data.requests);
        console.log("request data received ",data.data.projectId);
        //const total = data?.total ?? requests.length;
        //console.log("request data total", total);
        setRequests(data.data.requests || []);
        // const req = Array.isArray(data?.requests) ? data.requests : [];
        // console.log("request data fetched", req );
        // const total = data?.total ?? requests.length;
        // console.log("request data total", total);
        
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchServiceRequests();
    }

    //checkFeedbackStatus();
  }, [projectId]);

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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      in_progress: 'bg-blue-100 text-blue-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyColor = (urgency) => {
    const urgencyColors = {
      low: 'text-green-600',
      normal: 'text-blue-600',
      high: 'text-orange-600',
      urgent: 'text-red-600'
    };
    return urgencyColors[urgency] || 'text-gray-600';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      services: '🔧',
      upgrade: '⬆️',
      support: '🛠️'
    };
    return icons[category] || '📋';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
        <LoadingSpinner />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* <button
            onClick={() => navigate(`/dashboard/project/${projectId}`)}
            className="flex items-center text-[#3A1A1A] hover:text-[#2b1414] transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button> */}
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#3A1A1A] font-montserrat">Service History</h1>
              {/* <p className="text-gray-600 mt-2">View all your past and current service requests</p> */}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
                className="bg-[#3A1A1A] text-white px-4 py-2 rounded-lg hover:bg-[#2b1414] transition-colors font-medium"
              >
                Request New Service
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Requests</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Service Requests List */}
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Category Icon */}
                      {/* <div className="text-2xl">
                        {getCategoryIcon(request.category)}
                      </div> */}
                      
                      {/* Request Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {request.service_name}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="capitalize">{request.category}</span>
                          <span>•</span>
                          <span>Requested on {formatDate(request.created_at)}</span>
                          <span>•</span>
                          <span className={getUrgencyColor(request.urgency)}>
                            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                          </span>
                        </div>
                        
                        {request.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {request.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-6 text-xs text-gray-500">
                          <span>Contact: {request.contact_name}</span>
                          <span>Phone: {request.contact_phone}</span>
                          {request.preferred_date && (
                            <span>Preferred: {new Date(request.preferred_date).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Request ID */}
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Request ID</div>
                      <div className="text-sm font-mono text-gray-900">
                        #{request.id.slice(-8).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline or Additional Info */}
                {request.status_updated_at && request.status_updated_at !== request.created_at && (
                  <div className="bg-gray-50 px-6 py-3 border-t">
                    <div className="text-xs text-gray-500">
                      Last updated: {formatDate(request.status_updated_at)}
                      {request.notes && (
                        <span className="ml-4 text-gray-700">• {request.notes}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Service Requests Yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any service requests for this project.</p>
            <button
              onClick={() => navigate(`/dashboard/project/${projectId}/services`)}
              className="bg-[#3A1A1A] text-white px-6 py-3 rounded-lg hover:bg-[#2b1414] transition-colors font-medium"
            >
              Request Your First Service
            </button>
          </div>
        )}
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

export default ServiceHistory;
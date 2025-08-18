// // // // client/src/pages/dashboard/CustomerDashboard.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import { useAuth } from '../../context/AuthContext';
// // // import { useToast } from '../../context/ToastContext';
// // // import { authAPI } from '../../services/api/auth';
// // // import { StageMapper } from '../../services/tracking/stageMapper';

// // // // Components
// // // import LoadingSpinner from '../../components/ui/LoadingSpinner';
// // // import Button from '../../components/ui/Button';
// // // import ProjectTracker from '../../components/dashboard/ProjectTracker';
// // // import PaymentTracker from '../../components/dashboard/PaymentTracker';
// // // import DispatchTracker from '../../components/dashboard/DispatchTracker';
// // // import ContactCards from '../../components/dashboard/ContactCards';

// // // const CustomerDashboard = () => {
// // //   const { state, dispatch } = useAuth();
// // //   const { addToast } = useToast();
// // //   const [dashboardData, setDashboardData] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetchDashboardData();
// // //   }, []);

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       const data = await authAPI.getDashboard();
// // //       setDashboardData(data);
// // //     } catch (error) {
// // //       addToast('Failed to load dashboard data', 'error');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleLogout = () => {
// // //     dispatch({ type: 'LOGOUT' });
// // //     addToast('Logged out successfully', 'success');
// // //   };

// // //   const renderDashboardContent = () => {
// // //     const { odooLead } = dashboardData;

// // //     // No Odoo lead found
// // //     if (!odooLead) {
// // //       return (
// // //         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// // //           <div className="max-w-md mx-auto">
// // //             <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // //               </svg>
// // //             </div>
            
// // //             <h3 className="text-lg font-semibold text-primary-500 font-montserrat mb-2">
// // //               Project Details Not Available
// // //             </h3>
            
// // //             <p className="text-primary-400 font-nunito mb-6">
// // //               Your project details are not present in our database yet. Please contact our support team for assistance.
// // //             </p>
            
// // //             <div className="space-y-3">
// // //               <p className="text-sm text-primary-300 font-nunito">
// // //                 <strong>Registered Phone:</strong> {state.user?.phone}
// // //               </p>
// // //               <p className="text-sm text-primary-300 font-nunito">
// // //                 <strong>Support:</strong> +91 62052 81574
// // //               </p>
// // //             </div>

// // //             <div className="mt-6">
// // //               <Button onClick={() => window.location.href = 'tel:+916205281574'}>
// // //                 Contact Support
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       );
// // //     }

// // //     const currentStageId = odooLead.stage_id?.[0];

// // //     // Hidden stages - show placeholder
// // //     if (!StageMapper.isStageVisible(currentStageId)) {
// // //       return (
// // //         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// // //           <div className="max-w-md mx-auto">
// // //             <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //               </svg>
// // //             </div>
            
// // //             <h3 className="text-lg font-semibold text-primary-500 font-montserrat mb-2">
// // //               Welcome, {odooLead.name}!
// // //             </h3>
            
// // //             <p className="text-primary-400 font-nunito mb-6">
// // //               Project details will be available soon. We're processing your order and will update you shortly.
// // //             </p>
            
// // //             <div className="space-y-3">
// // //               <p className="text-sm text-primary-300 font-nunito">
// // //                 <strong>Lead ID:</strong> {odooLead.id}
// // //               </p>
// // //               {/* <p className="text-sm text-primary-300 font-nunito">
// // //                 <strong>Current Stage:</strong> {currentStageId}
// // //               </p> */}
// // //               <p className="text-sm text-primary-300 font-nunito">
// // //                 <strong>Phone:</strong> {odooLead.phone}
// // //               </p>
// // //             </div>

// // //             <div className="mt-6">
// // //               <Button onClick={() => window.location.href = 'tel:+916205281574'}>
// // //                 Contact Support
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       );
// // //     }

// // //     // Visible stages - show full dashboard
// // //     return (
// // //       <div className="space-y-6">
// // //         {/* Welcome Banner */}
// // //         <div className="bg-white rounded-lg shadow-sm p-6 ">
// // //           <div className="flex justify-between items-start">
// // //             <div>
// // //               <h2 className="text-2xl font-semibold text-primary-500 font-montserrat mb-2">
// // //                 Welcome, {odooLead.name}!
// // //               </h2>
// // //               <p className="text-primary-400 font-nunito mb-4">
// // //                 Track your Modula project progress and stay updated with real-time information.
// // //               </p>
              
// // //               {/* Order Summary */}
// // //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                 <div>
// // //                   <div className="text-primary-300 font-nunito">Order ID</div>
// // //                   <div className="font-semibold text-primary-500 font-montserrat">#{odooLead.id}</div>
// // //                 </div>
                
// // //                 <div>
// // //                   <div className="text-primary-300 font-nunito">Phone</div>
// // //                   <div className="font-semibold text-primary-500 font-montserrat">{odooLead.phone}</div>
// // //                 </div>
                
// // //               </div>
// // //             </div>
            
           
// // //           </div>
// // //         </div>

// // //         {/* Project Tracking */}
// // //         <ProjectTracker stageId={currentStageId} odooLead={odooLead} />

// // //         {/* Payment Tracking */}
// // //         <PaymentTracker stageId={currentStageId} />

// // //         {/* Contact Cards */}
// // //         <ContactCards stageId={currentStageId} odooLead={odooLead} />

// // //         {/* Dispatch Tracking (Conditional) */}
// // //         <DispatchTracker stageId={currentStageId} odooLead={odooLead} />

// // //         {/* Feedback Trigger for Stage 22 */}
// // //         {StageMapper.shouldTriggerFeedback(currentStageId) && (
// // //           <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
// // //             <div className="flex items-center space-x-4">
// // //               <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl">
// // //                 📝
// // //               </div>
// // //               <div className="flex-1">
// // //                 <h3 className="text-lg font-semibold text-primary-500 font-montserrat">
// // //                   Share Your Feedback
// // //                 </h3>
// // //                 <p className="text-primary-400 font-nunito">
// // //                   Your installation is complete! We'd love to hear about your experience.
// // //                 </p>
// // //               </div>
// // //               <Button>
// // //                 Give Feedback
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         )}

        
// // //       </div>
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
// // //         <LoadingSpinner size="lg" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-neutral-100">
// // //       {/* Header */}
// // //       <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm  ">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center h-16">
// // //             <div className="flex items-center space-x-4">
// // //              <div className="flex items-center space-x-3">
// // //               <img
// // //                 alt="Modula Logo"
// // //                 width="120"
// // //                 height="40"
// // //                 className="h-10 w-auto"
// // //                 src="/modua.png" // Place in public/modula-logo.png
// // //                 style={{ color: "transparent" }}
// // //                 onError={(e) => {
// // //                   // Fallback to text if image fails
// // //                   e.target.style.display = 'none';
// // //                   e.target.nextSibling.style.display = 'block';
// // //                 }}
// // //               />
// // //               {/* Fallback text logo */}
// // //               <h1 
// // //                 className="text-2xl font-bold text-primary-500 font-montserrat"
// // //                 style={{ display: 'none' }}
// // //               >
// // //                 Modula
// // //               </h1>
// // //             </div>
// // //           </div>
            
// // //             <div className="flex items-center space-x-4">
// // //               <a className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" href="https://www.modula.in/contact-us">Contact Us</a>
// // //                 <button
// // //                   onClick={handleLogout}
// // //                   className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center"
// // //                 >
// // //                   Logout
// // //               </button>

// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Main Content */}
// // //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         {renderDashboardContent()}
// // //       </main>

// // //       {/* Footer */}

// // //       <footer  className="bg-[#3A1A1A] py-6  relative">
// // //         <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center">
// // //             <div className="flex space-x-6"><a target="_blank" className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" href="https://www.instagram.com/modulaindia/"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a><a target="_blank" className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" href="https://www.youtube.com/@modula_india_11"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a><a target="_blank" className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" href="https://www.linkedin.com/company/modulaindia/"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a></div><a className="bg-[#F1E6DD] text-[#3A1A1A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#f7d3b6] transition-colors font-medium" href="https://www.modula.in/price-calculator">Get a Free Quote</a>
// // //         </div>
// // //       </div>
// // //       </footer>
      
// // //     </div>
// // //   );
// // // };

// // // export default CustomerDashboard;

// // // client/src/pages/dashboard/CustomerDashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';
// // import { useToast } from '../../context/ToastContext';
// // import { authAPI } from '../../services/api/auth';
// // import { StageMapper } from '../../services/tracking/stageMapper';

// // // Components
// // import LoadingSpinner from '../../components/ui/LoadingSpinner';
// // import Button from '../../components/ui/Button';
// // import ProjectTracker from '../../components/dashboard/ProjectTracker';
// // import PaymentTracker from '../../components/dashboard/PaymentTracker';
// // import DispatchTracker from '../../components/dashboard/DispatchTracker';
// // import ContactCards from '../../components/dashboard/ContactCards';

// // const CustomerDashboard = () => {
// //   const navigate = useNavigate();
// //   const { state, dispatch } = useAuth();
// //   const { addToast } = useToast();
// //   const [dashboardData, setDashboardData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       const data = await authAPI.getDashboard();
// //       setDashboardData(data);
// //     } catch (error) {
// //       addToast('Failed to load dashboard data', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     dispatch({ type: 'LOGOUT' });
// //     addToast('Logged out successfully', 'success');
// //   };

// //   const navigateToFeedback = () => {
// //     navigate('/dashboard/feedback');
// //   };

// //   const navigateToMaintenance = () => {
// //     navigate('/dashboard/request_maintenance');
// //   };

// // const renderDashboardContent = () => {
// //   const odooLeadRaw = dashboardData?.odooLead;
// //   const lead = Array.isArray(odooLeadRaw) && odooLeadRaw.length > 0 ? odooLeadRaw[0] : null;

// //   if (!lead) {
// //     return (
// //       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// //         <div className="max-w-md mx-auto">
// //           <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //             </svg>
// //           </div>

// //           <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
// //             Project Details Not Available
// //           </h3>

// //           <p className="text-[#6B4B41] font-nunito mb-6">
// //             Your project details are not present in our database yet. Please contact our support team for assistance.
// //           </p>

// //           <div className="space-y-3">
// //             <p className="text-sm text-[#6B4B41] font-nunito">
// //               <strong>Registered Phone:</strong> {state.user?.phone}
// //             </p>
// //             <p className="text-sm text-[#6B4B41] font-nunito">
// //               <strong>Support:</strong> +91 62052 81574
// //             </p>
// //           </div>

// //           <div className="mt-6">
// //             <Button onClick={() => window.location.href = 'tel:+916205281574'}>
// //               Contact Support
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentStageId = lead.stage_id?.[0];

// //   if (!StageMapper.isStageVisible(currentStageId)) {
// //     return (
// //       <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// //         <div className="max-w-md mx-auto">
// //           <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //           </div>

// //           <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
// //             Welcome, {lead.name}!
// //           </h3>

// //           <div className="space-y-3">
// //             <p className="text-sm text-[#6B4B41] font-nunito">
// //               <strong>Lead ID:</strong> {lead.id}
// //             </p>
// //             <p className="text-sm text-[#6B4B41] font-nunito">
// //               <strong>Phone:</strong> {lead.phone}
// //             </p>
// //           </div>

// //           <div className="mt-6">
// //             <Button onClick={() => window.location.href = 'tel:+916205281574'}>
// //               Contact Support
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ✅ Main dashboard content
// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-white rounded-lg shadow-sm p-6">
// //         <div className="flex justify-between items-start">
// //           <div>
// //             <h2 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-2">
// //               Welcome, {lead.name}!
// //             </h2>
// //           </div>
// //           <div className="flex gap-8 text-sm ml-auto">
// //             <div>
// //               <span className="text-[#6B4B41] font-nunito">Order ID: </span>
// //               <span className="font-semibold text-[#3A1A1A] font-montserrat">#{lead.id}</span>
// //             </div>
// //             <div>
// //               <span className="text-[#6B4B41] font-nunito">Phone: </span>
// //               <span className="font-semibold text-[#3A1A1A] font-montserrat">{lead.phone}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <ProjectTracker stageId={currentStageId} odooLead={lead} />
// //       <PaymentTracker stageId={currentStageId} />
// //       <ContactCards stageId={currentStageId} odooLead={lead} />
// //       <DispatchTracker stageId={currentStageId} odooLead={lead} />

// //       {StageMapper.shouldTriggerFeedback(currentStageId) && (
// //         <div className="bg-[#F1E6DD] rounded-lg p-6 border border-[#D7C5AA]">
// //           <div className="flex items-center space-x-4">
// //             <div className="w-12 h-12 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-xl">
// //               📝
// //             </div>
// //             <div className="flex-1">
// //               <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
// //                 Share Your Feedback
// //               </h3>
// //               <p className="text-[#6B4B41] font-nunito">
// //                 Your installation is complete! We'd love to hear about your experience.
// //               </p>
// //             </div>
// //             <Button onClick={navigateToFeedback}>
// //               Give Feedback
// //             </Button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
// //         <LoadingSpinner size="lg" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#F1E6DD]">
// //       {/* Header */}
// //       <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center space-x-3">
// //                 <img
// //                   alt="Modula Logo"
// //                   width="120"
// //                   height="40"
// //                   className="h-10 w-auto"
// //                   src="/modua.png"
// //                   style={{ color: "transparent" }}
// //                   onError={(e) => {
// //                     e.target.style.display = 'none';
// //                     e.target.nextSibling.style.display = 'block';
// //                   }}
// //                 />
// //                 <h1 
// //                   className="text-2xl font-bold text-[#3A1A1A] font-montserrat"
// //                   style={{ display: 'none' }}
// //                 >
// //                   Modula
// //                 </h1>
// //               </div>
// //             </div>
            
// //             <div className="flex items-center space-x-4">
// //               <a 
// //                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" 
// //                 href="https://www.modula.in/contact-us"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 Contact Us
// //               </a>
              
// //               <button
// //                 onClick={navigateToFeedback}
// //                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#AF7C71] text-white px-4 py-2 rounded-[30px] hover:bg-[#6B4B41] transition-colors text-center"
// //               >
// //                 Feedback
// //               </button>
              
// //               <button
// //                 onClick={navigateToMaintenance}
// //                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
// //               >
// //                 Maintenance
// //               </button>
              
// //               <button
// //                 onClick={handleLogout}
// //                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {renderDashboardContent()}
// //       </main>

// //       {/* Footer */}
// //       <footer className="bg-[#3A1A1A] py-6">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center">
// //             <div className="flex space-x-6">
// //               <a 
// //                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
// //                 href="https://www.instagram.com/modulaindia/"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
// //                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
// //                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
// //                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
// //                 </svg>
// //               </a>
// //               <a 
// //                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
// //                 href="https://www.youtube.com/@modula_india_11"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
// //                   <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
// //                   <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
// //                 </svg>
// //               </a>
// //               <a 
// //                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
// //                 href="https://www.linkedin.com/company/modulaindia/"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
// //                   <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
// //                   <rect x="2" y="9" width="4" height="12"></rect>
// //                   <circle cx="4" cy="4" r="2"></circle>
// //                 </svg>
// //               </a>
// //             </div>
// //             <a 
// //               className="bg-[#F1E6DD] text-[#3A1A1A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#f7d3b6] transition-colors font-medium" 
// //               href="https://www.modula.in/price-calculator"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //             >
// //               Get a Free Quote
// //             </a>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default CustomerDashboard;

// // client/src/pages/dashboard/CustomerDashboard.jsx - ENHANCED WITH FEEDBACK INTEGRATION
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';
// // import { useToast } from '../../context/ToastContext';
// // import { authAPI } from '../../services/api/auth';
// // import { feedbackAPI } from '../../services/api/feedback';
// // import { StageMapper } from '../../services/tracking/stageMapper';

// // // Components
// // import LoadingSpinner from '../../components/ui/LoadingSpinner';
// // import Button from '../../components/ui/Button';
// // import ProjectTracker from '../../components/dashboard/ProjectTracker';
// // import PaymentTracker from '../../components/dashboard/PaymentTracker';
// // import DispatchTracker from '../../components/dashboard/DispatchTracker';
// // import ContactCards from '../../components/dashboard/ContactCards';

// // const CustomerDashboard = () => {
// //   const navigate = useNavigate();
// //   const { state, dispatch } = useAuth();
// //   const { addToast } = useToast();
// //   const [dashboardData, setDashboardData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [feedbackStatus, setFeedbackStatus] = useState(null); // ✅ NEW

// //   useEffect(() => {
// //     fetchDashboardData();
// //     checkFeedbackStatus(); // ✅ NEW
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       const data = await authAPI.getDashboard();
// //       setDashboardData(data);
// //     } catch (error) {
// //       addToast('Failed to load dashboard data', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ NEW: Check feedback status using boolean flags
// //   const checkFeedbackStatus = async () => {
// //     try {
// //       const response = await feedbackAPI.checkFeedbackStatus();
// //       setFeedbackStatus(response.data);
// //     } catch (error) {
// //       console.error('Error checking feedback status:', error);
// //       // Don't show error toast as this is supplementary data
// //     }
// //   };

// //   const handleLogout = () => {
// //     dispatch({ type: 'LOGOUT' });
// //     addToast('Logged out successfully', 'success');
// //   };

// //   const navigateToFeedback = () => {
// //     navigate('/dashboard/feedback');
// //   };

// //   const navigateToMaintenance = () => {
// //     navigate('/dashboard/request_maintenance');
// //   };

// //   // ✅ NEW: Render feedback card based on status
// //   const renderFeedbackCard = (currentStageId) => {
// //     // Don't show feedback card if we don't have feedback status yet
// //     if (!feedbackStatus) return null;

// //     // Show feedback card if eligible or already submitted
// //     if (feedbackStatus.canSubmit || feedbackStatus.hasSubmitted) {
// //       return (
// //         <div className={`rounded-lg p-6 border ${
// //           feedbackStatus.hasSubmitted 
// //             ? 'bg-green-50 border-green-200' 
// //             : 'bg-[#F1E6DD] border-[#D7C5AA]'
// //         }`}>
// //           <div className="flex items-center space-x-4">
// //             <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
// //               feedbackStatus.hasSubmitted 
// //                 ? 'bg-green-500 text-white' 
// //                 : 'bg-[#AF7C71] text-white'
// //             }`}>
// //               {feedbackStatus.hasSubmitted ? '✅' : '📝'}
// //             </div>
// //             <div className="flex-1">
// //               <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
// //                 {feedbackStatus.hasSubmitted ? 'Feedback Submitted' : 'Share Your Feedback'}
// //               </h3>
// //               <p className="text-[#6B4B41] font-nunito">
// //                 {feedbackStatus.hasSubmitted 
// //                   ? 'Thank you for your valuable feedback!' 
// //                   : 'Your installation is complete! We\'d love to hear about your experience.'}
// //               </p>
// //               {feedbackStatus.hasSubmitted && feedbackStatus.status.submitted_at && (
// //                 <p className="text-sm text-[#6B4B41] font-nunito mt-1">
// //                   Submitted on: {new Date(feedbackStatus.status.submitted_at).toLocaleDateString()}
// //                 </p>
// //               )}
// //             </div>
// //             {!feedbackStatus.hasSubmitted && (
// //               <Button onClick={navigateToFeedback}>
// //                 Give Feedback
// //               </Button>
// //             )}
// //           </div>
// //         </div>
// //       );
// //     }

// //     // Show when feedback becomes available (for stages close to completion)
// //     if (StageMapper.shouldTriggerFeedback(currentStageId) || [10, 11, 12, 26, 27].includes(currentStageId)) {
// //       return (
// //         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
// //           <div className="flex items-center space-x-4">
// //             <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl">
// //               ⏰
// //             </div>
// //             <div className="flex-1">
// //               <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
// //                 Feedback Coming Soon
// //               </h3>
// //               <p className="text-[#6B4B41] font-nunito">
// //                 Feedback form will be available after your project installation is completed.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       );
// //     }

// //     return null;
// //   };

// //   const renderDashboardContent = () => {
// //     const odooLeadRaw = dashboardData?.odooLead;
// //     const lead = Array.isArray(odooLeadRaw) && odooLeadRaw.length > 0 ? odooLeadRaw[0] : null;

// //     if (!lead) {
// //       return (
// //         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// //           <div className="max-w-md mx-auto">
// //             <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //               </svg>
// //             </div>

// //             <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
// //               Project Details Not Available
// //             </h3>

// //             <p className="text-[#6B4B41] font-nunito mb-6">
// //               Your project details are not present in our database yet. Please contact our support team for assistance.
// //             </p>

// //             <div className="space-y-3">
// //               <p className="text-sm text-[#6B4B41] font-nunito">
// //                 <strong>Registered Phone:</strong> {state.user?.phone}
// //               </p>
// //               <p className="text-sm text-[#6B4B41] font-nunito">
// //                 <strong>Support:</strong> +91 62052 81574
// //               </p>
// //             </div>

// //             <div className="mt-6">
// //               <Button onClick={() => window.location.href = 'tel:+916205281574'}>
// //                 Contact Support
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       );
// //     }

// //     const currentStageId = lead.stage_id?.[0];

// //     if (!StageMapper.isStageVisible(currentStageId)) {
// //       return (
// //         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// //           <div className="max-w-md mx-auto">
// //             <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //             </div>

// //             <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
// //               Welcome, {lead.name}!
// //             </h3>

// //             <p className="text-[#6B4B41] font-nunito mb-6">
// //               Project details will be available soon. We're processing your order and will update you shortly.
// //             </p>

// //             <div className="space-y-3">
// //               <p className="text-sm text-[#6B4B41] font-nunito">
// //                 <strong>Lead ID:</strong> {lead.id}
// //               </p>
// //               <p className="text-sm text-[#6B4B41] font-nunito">
// //                 <strong>Phone:</strong> {lead.phone}
// //               </p>
// //             </div>

// //             <div className="mt-6">
// //               <Button onClick={() => window.location.href = 'tel:+916205281574'}>
// //                 Contact Support
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       );
// //     }

// //     // ✅ Main dashboard content with enhanced feedback integration
// //     return (
// //       <div className="space-y-6">
// //         {/* Welcome Banner */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <div className="flex justify-between items-start">
// //             <div>
// //               <h2 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-2">
// //                 Welcome, {lead.name}!
// //               </h2>
// //               {/* <p className="text-[#6B4B41] font-nunito mb-4">
// //                 Track your Modula project progress and stay updated with real-time information.
// //               </p> */}
// //             </div>
// //             <div className="flex gap-8 text-sm ml-auto">
// //               <div>
// //                 <span className="text-[#6B4B41] font-nunito">Order ID: </span>
// //                 <span className="font-semibold text-[#3A1A1A] font-montserrat">#{lead.id}</span>
// //               </div>
// //               <div>
// //                 <span className="text-[#6B4B41] font-nunito">Phone: </span>
// //                 <span className="font-semibold text-[#3A1A1A] font-montserrat">{lead.phone}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Project Tracking */}
// //         <ProjectTracker stageId={currentStageId} odooLead={lead} />

// //         {/* Payment Tracking */}
// //         <PaymentTracker stageId={currentStageId} />

// //         {/* Contact Cards */}
// //         <ContactCards stageId={currentStageId} odooLead={lead} />

// //         

// //         {/* ✅ ENHANCED: Smart Feedback Card */}
// //         {renderFeedbackCard(currentStageId)}

// //         {/* ✅ LEGACY: Fallback feedback trigger (keeping for compatibility) */}
// //         {StageMapper.shouldTriggerFeedback(currentStageId) && !feedbackStatus?.hasSubmitted && (
// //           <div className="bg-[#F1E6DD] rounded-lg p-6 border border-[#D7C5AA]">
// //             <div className="flex items-center space-x-4">
// //               <div className="w-12 h-12 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-xl">
// //                 📝
// //               </div>
// //               <div className="flex-1">
// //                 <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
// //                   Share Your Feedback
// //                 </h3>
// //                 <p className="text-[#6B4B41] font-nunito">
// //                   Your installation is complete! We'd love to hear about your experience.
// //                 </p>
// //               </div>
// //               <Button onClick={navigateToFeedback}>
// //                 Give Feedback
// //               </Button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
// //         <LoadingSpinner size="lg" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#F1E6DD]">
// //       {/* Header */}
// //       <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center space-x-3">
// //                 <img
// //                   alt="Modula Logo"
// //                   width="120"
// //                   height="40"
// //                   className="h-10 w-auto"
// //                   src="/modua.png"
// //                   style={{ color: "transparent" }}
// //                   onError={(e) => {
// //                     e.target.style.display = 'none';
// //                     e.target.nextSibling.style.display = 'block';
// //                   }}
// //                 />
// //                 <h1 
// //                   className="text-2xl font-bold text-[#3A1A1A] font-montserrat"
// //                   style={{ display: 'none' }}
// //                 >
// //                   Modula
// //                 </h1>
// //               </div>
// //             </div>
            
// //             <div className="flex items-center space-x-4">
// //               <a 
// //                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" 
// //                 href="https://www.modula.in/contact-us"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 Contact Us
// //               </a>
              
// //               {/* ✅ ENHANCED: Smart Feedback Button */}
// //               <button
// //                 onClick={navigateToFeedback}
// //                 className={`font-montserrat text-[14px] leading-[18px] font-bold px-4 py-2 rounded-[30px] transition-colors text-center ${
// //                   feedbackStatus?.hasSubmitted
// //                     ? 'bg-green-500 text-white hover:bg-green-600'
// //                     : feedbackStatus?.canSubmit
// //                     ? 'bg-[#AF7C71] text-white hover:bg-[#6B4B41] animate-pulse'
// //                     : 'bg-gray-300 text-gray-600 cursor-not-allowed'
// //                 }`}
// //                 disabled={!feedbackStatus?.canSubmit && !feedbackStatus?.hasSubmitted}
// //                 title={
// //                   feedbackStatus?.hasSubmitted 
// //                     ? 'Feedback submitted' 
// //                     : feedbackStatus?.canSubmit 
// //                     ? 'Submit feedback' 
// //                     : 'Feedback not available yet'
// //                 }
// //               >
// //                 {feedbackStatus?.hasSubmitted ? 'Feedback ✓' : 'Feedback'}
// //               </button>
              
// //               <button
// //                 onClick={navigateToMaintenance}
// //                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
// //               >
// //                 Maintenance
// //               </button>
              
// //               <button
// //                 onClick={handleLogout}
// //                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {renderDashboardContent()}
// //       </main>

// //       {/* Footer */}
// //       <footer className="bg-[#3A1A1A] py-6">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center">
// //             <div className="flex space-x-6">
// //               <a 
// //                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
// //                 href="https://www.instagram.com/modulaindia/"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
// //                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
// //                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
// //                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
// //                 </svg>
// //               </a>
// //               <a 
// //                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
// //                 href="https://www.youtube.com/@modula_india_11"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
// //                   <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
// //                   <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
// //                 </svg>
// //               </a>
// //               <a 
// //                 className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
// //                 href="https://www.linkedin.com/company/modulaindia/"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
// //                   <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
// //                   <rect x="2" y="9" width="4" height="12"></rect>
// //                   <circle cx="4" cy="4" r="2"></circle>
// //                 </svg>
// //               </a>
// //             </div>
// //             <a 
// //               className="bg-[#F1E6DD] text-[#3A1A1A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#f7d3b6] transition-colors font-medium" 
// //               href="https://www.modula.in/price-calculator"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //             >
// //               Get a Free Quote
// //             </a>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default CustomerDashboard;

// // client/src/pages/dashboard/CustomerDashboard.jsx - Updated for Single Project View
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useToast } from '../../context/ToastContext';
// import { authAPI } from '../../services/api/auth';
// import { feedbackAPI } from '../../services/api/feedback';
// import { StageMapper } from '../../services/tracking/stageMapper';

// // Components
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
// import Button from '../../components/ui/Button';
// import ProjectTracker from '../../components/dashboard/ProjectTracker';
// import PaymentTracker from '../../components/dashboard/PaymentTracker';
// // import DispatchTracker from '../../components/dashboard/DispatchTracker';
// import ContactCards from '../../components/dashboard/ContactCards';

// const CustomerDashboard = () => {
//   const navigate = useNavigate();
//   const { projectId } = useParams(); // Get projectId from URL
//   const { state, dispatch } = useAuth();
//   const { addToast } = useToast();
//   const [projectData, setProjectData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [feedbackStatus, setFeedbackStatus] = useState(null);

//   useEffect(() => {
//     if (projectId) {
//       fetchProjectData();
//       checkFeedbackStatus();
//     } else {
//       // If no projectId, redirect to project list
//       navigate('/dashboard');
//     }
//   }, [projectId]);

//   const fetchProjectData = async () => {
//     try {
//       console.log('🔍 Fetching project data for ID:', projectId);
//       const data = await authAPI.getProjectById(projectId);
//       console.log('✅ Project data received:', data);
//       setProjectData(data);
//     } catch (error) {
//       addToast('Failed to load project data', 'error');
//       console.error('Project fetch error:', error);
//       // Redirect to project list if project not found
//       navigate('/dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

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
//     addToast('Logged out successfully', 'success');
//   };

//   const navigateToProjects = () => {
//     navigate('/dashboard');
//   };

//   const navigateToFeedback = () => {
//     navigate('/dashboard/feedback');
//   };

//   const navigateToMaintenance = () => {
//     navigate('/dashboard/request_maintenance');
//   };

//   const renderFeedbackCard = (currentStageId) => {
//     if (!feedbackStatus) return null;

//     if (feedbackStatus.canSubmit || feedbackStatus.hasSubmitted) {
//       return (
//         <div className={`rounded-lg p-6 border ${
//           feedbackStatus.hasSubmitted 
//             ? 'bg-green-50 border-green-200' 
//             : 'bg-[#F1E6DD] border-[#D7C5AA]'
//         }`}>
//           <div className="flex items-center space-x-4">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
//               feedbackStatus.hasSubmitted 
//                 ? 'bg-green-500 text-white' 
//                 : 'bg-[#AF7C71] text-white'
//             }`}>
//               {feedbackStatus.hasSubmitted ? '✅' : '📝'}
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
//                 {feedbackStatus.hasSubmitted ? 'Feedback Submitted' : 'Share Your Feedback'}
//               </h3>
//               <p className="text-[#6B4B41] font-nunito">
//                 {feedbackStatus.hasSubmitted 
//                   ? 'Thank you for your valuable feedback!' 
//                   : 'Your installation is complete! We\'d love to hear about your experience.'}
//               </p>
//               {feedbackStatus.hasSubmitted && feedbackStatus.status.submitted_at && (
//                 <p className="text-sm text-[#6B4B41] font-nunito mt-1">
//                   Submitted on: {new Date(feedbackStatus.status.submitted_at).toLocaleDateString()}
//                 </p>
//               )}
//             </div>
//             {!feedbackStatus.hasSubmitted && (
//               <Button onClick={navigateToFeedback}>
//                 Give Feedback
//               </Button>
//             )}
//           </div>
//         </div>
//       );
//     }

//     if (StageMapper.shouldTriggerFeedback(currentStageId) || [10, 11, 12, 26, 27].includes(currentStageId)) {
//       return (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl">
//               ⏰
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
//                 Feedback Coming Soon
//               </h3>
//               <p className="text-[#6B4B41] font-nunito">
//                 Feedback form will be available after your project installation is completed.
//               </p>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return null;
//   };

//   const renderDashboardContent = () => {
//     if (!projectData) {
//       return (
//         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//           <div className="max-w-md mx-auto">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//             </div>
            
//             <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
//               Project Not Found
//             </h3>
            
//             <p className="text-[#6B4B41] font-nunito mb-6">
//               The requested project could not be found or you don't have access to it.
//             </p>

//             <div className="mt-6">
//               <Button onClick={navigateToProjects}>
//                 Back to Projects
//               </Button>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     const currentStageId = projectData.data.stage_id?.[0];
//     console.log(currentStageId);

//     if (!StageMapper.isStageVisible(currentStageId)) {
//       return (
//         <div className="space-y-6">
//           {/* Back Navigation */}
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={navigateToProjects}
//               className="flex items-center space-x-2 text-[#AF7C71] hover:text-[#6B4B41] transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//               </svg>
//               <span className="font-nunito">Back to Projects</span>
//             </button>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//             <div className="max-w-md mx-auto">
//               <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>

//               <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
//                 Welcome, {projectData.data.name}!
//               </h3>

//               <p className="text-[#6B4B41] font-nunito mb-6">
//                 Project details will be available soon. We're processing your order and will update you shortly.
//               </p>

//               <div className="space-y-3">
//                 <p className="text-sm text-[#6B4B41] font-nunito">
//                   <strong>Lead ID:</strong> {projectData.data.id}
//                 </p>
//                 <p className="text-sm text-[#6B4B41] font-nunito">
//                   <strong>Phone:</strong> {projectData.data.phone}
//                 </p>
//               </div>

//               <div className="mt-6">
//                 <Button onClick={() => window.location.href = 'tel:+916205281574'}>
//                   Contact Support
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     // Main dashboard content for visible stages
//     return (
//       <div className="space-y-6">
//         {/* Back Navigation */}
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={navigateToProjects}
//             className="flex items-center space-x-2 text-[#AF7C71] hover:text-[#6B4B41] transition-colors"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//             </svg>
//             <span className="font-nunito">Back to Projects</span>
//           </button>
//         </div>

//         {/* Welcome Banner */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-2">
//                 Welcome {projectData.data.name || 'Modula Project'}!
//               </h2>
              
//               {/* <p className="text-[#6B4B41] font-nunito mb-4">
//                 Track your project progress and stay updated with real-time information.
//               </p> */}
//             </div>
//             <div className="flex gap-8 text-sm ml-auto">
//               <div>
//                 <span className="text-[#6B4B41] font-nunito">Order ID: </span>
//                 <span className="font-semibold text-[#3A1A1A] font-montserrat">#{projectData.data.id}</span>
//               </div>
//               <div>
//                 <span className="text-[#6B4B41] font-nunito">Phone: </span>
//                 <span className="font-semibold text-[#3A1A1A] font-montserrat">{projectData.data.phone}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Tracking */}
//         <ProjectTracker stageId={currentStageId} odooLead={projectData} />

//         {/* Payment Tracking */}
//         <PaymentTracker stageId={currentStageId} />

//         {/* Contact Cards */}
//         <ContactCards stageId={currentStageId} odooLead={projectData} />

      

//         {/* Enhanced Feedback Card */}
//         {renderFeedbackCard(currentStageId)}

//         {/* Legacy Feedback Trigger (keeping for compatibility) */}
//         {StageMapper.shouldTriggerFeedback(currentStageId) && !feedbackStatus?.hasSubmitted && (
//           <div className="bg-[#F1E6DD] rounded-lg p-6 border border-[#D7C5AA]">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-xl">
//                 📝
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
//                   Share Your Feedback
//                 </h3>
//                 <p className="text-[#6B4B41] font-nunito">
//                   Your installation is complete! We'd love to hear about your experience.
//                 </p>
//               </div>
//               <Button onClick={navigateToFeedback}>
//                 Give Feedback
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F1E6DD]">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-3">
//                 <img
//                   alt="Modula Logo"
//                   width="120"
//                   height="40"
//                   className="h-10 w-auto"
//                   src="/modua.png"
//                   style={{ color: "transparent" }}
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     e.target.nextSibling.style.display = 'block';
//                   }}
//                 />
//                 <h1 
//                   className="text-2xl font-bold text-[#3A1A1A] font-montserrat"
//                   style={{ display: 'none' }}
//                 >
//                   Modula
//                 </h1>
//               </div>
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
              
//               <button
//                 onClick={navigateToMaintenance}
//                 className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
//               >
//                 Maintenance
//               </button>
              
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

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {renderDashboardContent()}
//       </main>

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

// export default CustomerDashboard;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authAPI } from '../../services/api/auth';
// import { feedbackAPI } from '../../services/api/feedback';
import { StageMapper } from '../../services/tracking/stageMapper';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';
import ProjectTracker from '../../components/dashboard/ProjectTracker';
import PaymentTracker from '../../components/dashboard/PaymentTracker';
import ContactCards from '../../components/dashboard/ContactCards';

const CustomerDashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const { addToast } = useToast();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchProjectData();
      //checkFeedbackStatus();
    } else {
      // If no projectId, redirect to project list
      navigate('/dashboard');
    }
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      console.log('🔍 Fetching project data for ID:', projectId);
      const data = await authAPI.getProjectById(projectId);
      console.log('✅ Project data received:', data);
      setProjectData(data);
    } catch (error) {
      addToast('Failed to load project data', 'error');
      console.error('Project fetch error:', error);
      // Redirect to project list if project not found
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };
  const menuItems = [
    { label: "Services", category: "services" },
    { label: "Upgrade", category: "upgrade" },
    { label: "Support", category: "support" },
    { label: "Service History", category: "service-history" },
  ];

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
    addToast('Logged out successfully', 'success');
  };

  const navigateToProjects = () => {
    navigate('/dashboard');
  };

  const navigateToFeedback = () => {
    navigate('/dashboard/feedback');
  };

  const navigateToMaintenance = () => {
    navigate('/dashboard/request_maintenance');
  };

  const handleServiceNavigation = (category) => {
    navigate(`/dashboard/project/${projectId}/${category}`);
  };

  const renderFeedbackCard = (currentStageId) => {
    if (!feedbackStatus) return null;

    if (feedbackStatus.canSubmit || feedbackStatus.hasSubmitted) {
      return (
        <div className={`rounded-lg p-6 border ${
          feedbackStatus.hasSubmitted 
            ? 'bg-green-50 border-green-200' 
            : 'bg-[#F1E6DD] border-[#D7C5AA]'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
              feedbackStatus.hasSubmitted 
                ? 'bg-green-500 text-white' 
                : 'bg-[#AF7C71] text-white'
            }`}>
              {feedbackStatus.hasSubmitted ? '✅' : '📝'}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
                {feedbackStatus.hasSubmitted ? 'Feedback Submitted' : 'Share Your Feedback'}
              </h3>
              <p className="text-[#6B4B41] font-nunito">
                {feedbackStatus.hasSubmitted 
                  ? 'Thank you for your valuable feedback!' 
                  : 'Your installation is complete! We\'d love to hear about your experience.'}
              </p>
              {feedbackStatus.hasSubmitted && feedbackStatus.status.submitted_at && (
                <p className="text-sm text-[#6B4B41] font-nunito mt-1">
                  Submitted on: {new Date(feedbackStatus.status.submitted_at).toLocaleDateString()}
                </p>
              )}
            </div>
            {!feedbackStatus.hasSubmitted && (
              <Button onClick={navigateToFeedback}>
                Give Feedback
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (StageMapper.shouldTriggerFeedback(currentStageId) || [10, 11, 12, 26, 27].includes(currentStageId)) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl">
              ⏰
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
                Feedback Coming Soon
              </h3>
              <p className="text-[#6B4B41] font-nunito">
                Feedback form will be available after your project installation is completed.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderDashboardContent = () => {
    if (!projectData) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
              Project Not Found
            </h3>
            
            <p className="text-[#6B4B41] font-nunito mb-6">
              The requested project could not be found or you don't have access to it.
            </p>

            {/* <div className="mt-6">
              <Button onClick={navigateToProjects}>
                Back to Projects
              </Button>
            </div> */}
          </div>
        </div>
      );
    }

    const currentStageId = projectData.data?.stage_id?.[0];
    const lead = projectData.data;

    if (!StageMapper.isStageVisible(currentStageId)) {
      return (
        <div className="space-y-6">
          {/* Back Navigation */}
          {/* <div className="flex items-center space-x-2">
            <button
              onClick={navigateToProjects}
              className="flex items-center space-x-2 text-[#AF7C71] hover:text-[#6B4B41] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-nunito">Back to Projects</span>
            </button>
          </div> */}

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
                Welcome, {lead?.name}!
              </h3>

              <p className="text-[#6B4B41] font-nunito mb-6">
                Project details will be available soon. We're processing your order and will update you shortly.
              </p>

              <div className="space-y-3">
                <p className="text-sm text-[#6B4B41] font-nunito">
                  <strong>Lead ID:</strong> {lead?.id}
                </p>
                <p className="text-sm text-[#6B4B41] font-nunito">
                  <strong>Phone:</strong> {lead?.phone}
                </p>
              </div>

              <div className="mt-6">
                <Button onClick={() => window.location.href = 'tel:+916205281574'}>
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Main dashboard content for visible stages
    return (
      <div className="space-y-6">
        {/* Back Navigation */}
        {/* <div className="flex items-center space-x-2">
          <button
            onClick={navigateToProjects}
            className="flex items-center space-x-2 text-[#AF7C71] hover:text-[#6B4B41] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-nunito">Back to Projects</span>
          </button>
        </div> */}

        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-2">
                Welcome, {lead?.name || 'Modula Customer'}!
              </h2>
            </div>
            <div className="flex gap-8 text-sm ml-auto">
              <div>
                <span className="text-[#6B4B41] font-nunito">Order ID: </span>
                <span className="font-semibold text-[#3A1A1A] font-montserrat">#{lead?.id}</span>
              </div>
              <div>
                <span className="text-[#6B4B41] font-nunito">Phone: </span>
                <span className="font-semibold text-[#3A1A1A] font-montserrat">{lead?.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Management Quick Actions */}
        

        {/* Project Tracking */}
        <ProjectTracker stageId={currentStageId} odooLead={projectData} />

        {/* Payment Tracking */}
        <PaymentTracker stageId={currentStageId} />

        {/* Contact Cards */}
        <ContactCards stageId={currentStageId} odooLead={projectData} />

        {/* Enhanced Feedback Card */}
        {renderFeedbackCard(currentStageId)}

        {/* Legacy Feedback Trigger (keeping for compatibility) */}
        {StageMapper.shouldTriggerFeedback(currentStageId) && !feedbackStatus?.hasSubmitted && (
          <div className="bg-[#F1E6DD] rounded-lg p-6 border border-[#D7C5AA]">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-xl">
                📝
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
                  Share Your Feedback
                </h3>
                <p className="text-[#6B4B41] font-nunito">
                  Your installation is complete! We'd love to hear about your experience.
                </p>
              </div>
              <Button onClick={navigateToFeedback}>
                Give Feedback
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1E6DD]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  alt="Modula Logo"
                  width="120"
                  height="40"
                  className="h-10 w-auto"
                  src="/modua.png"
                  style={{ color: "transparent" }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <h1 
                  className="text-2xl font-bold text-[#3A1A1A] font-montserrat"
                  style={{ display: 'none' }}
                >
                  Modula
                </h1>
              </div>
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
              
              {/* <button
                onClick={navigateToMaintenance}
                className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
              >
                Customer Support
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboardContent()}
      </main>

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

export default CustomerDashboard;




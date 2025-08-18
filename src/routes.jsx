
// // client/src/routes.jsx - Updated with maintenance routes
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // Existing Pages
// import Register from './pages/auth/Register';
// import Login from './pages/auth/Login';
// import OTPPage from './pages/auth/OTPPage';
// import CustomerDashboard from './pages/dashboard/CustomerDashboard';
// import ProjectListPage from './pages/dashboard/ProjectListPage';
// import NotFound from './pages/NotFound';

// // Existing Feedback Pages
// import FeedbackPage from './pages/feedback/FeedbackPage';
// import FeedbackSubmitted from './pages/feedback/FeedbackSubmitted';

// // NEW: Maintenance Pages
// import ServicesPage from './pages/maintenance/ServicesPage';
// import UpgradePage from './pages/maintenance/UpgradePage';
// import SupportPage from './pages/maintenance/SupportPage';
// import ServiceRequestForm from './pages/maintenance/ServiceRequestForm';
// import RequestSubmitted from './pages/maintenance/RequestSubmitted';
// import ServiceHistory from './pages/maintenance/ServiceHistory';

// // Existing Maintenance Pages (keeping for backward compatibility)
// //import RequestMaintenancePage from './pages/maintenance/RequestMaintenancePage';

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { state } = useAuth();
  
//   if (!state.isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// };

// // Public Route Component (redirect if authenticated)
// const PublicRoute = ({ children }) => {
//   const { state } = useAuth();
  
//   if (state.isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }
  
//   return children;
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<Navigate to="/login" replace />} />
//       <Route path="/register" element={
//         <PublicRoute>
//           <Register />
//         </PublicRoute>
//       } />
//       <Route path="/login" element={
//         <PublicRoute>
//           <Login />
//         </PublicRoute>
//       } />
//       <Route path="/otp" element={<OTPPage />} />
      
//       {/* Protected Customer Routes */}
//       <Route path="/dashboard" element={
//         <ProtectedRoute>
//           <ProjectListPage />
//         </ProtectedRoute>
//       } />
      
//       <Route path="/dashboard/project/:projectId" element={
//         <ProtectedRoute>
//           <CustomerDashboard />
//         </ProtectedRoute>
//       } />
      
//       {/* NEW: Service Management Routes */}
//       <Route path="/dashboard/project/:projectId/services" element={
//         <ProtectedRoute>
//           <ServicesPage />
//         </ProtectedRoute>
//       } />
      
//       <Route path="/dashboard/project/:projectId/upgrade" element={
//         <ProtectedRoute>
//           <UpgradePage />
//         </ProtectedRoute>
//       } />
      
//       <Route path="/dashboard/project/:projectId/support" element={
//         <ProtectedRoute>
//           <SupportPage />
//         </ProtectedRoute>
//       } />
      
//       <Route path="/dashboard/project/:projectId/service-request" element={
//         <ProtectedRoute>
//           <ServiceRequestForm />
//         </ProtectedRoute>
//       } />
      
//       <Route path="/dashboard/project/:projectId/request-submitted" element={
//         <ProtectedRoute>
//           <RequestSubmitted />
//         </ProtectedRoute>
//       } />
      
//       <Route path="/dashboard/project/:projectId/service-history" element={
//         <ProtectedRoute>
//           <ServiceHistory />
//         </ProtectedRoute>
//       } />
      
//       {/* Existing Feedback Routes */}
//       <Route path="/dashboard/feedback" element={
//         <ProtectedRoute>
//           <FeedbackPage />
//         </ProtectedRoute>
//       } />
      
//       <Route path="/dashboard/feedback_submitted" element={
//         <ProtectedRoute>
//           <FeedbackSubmitted />
//         </ProtectedRoute>
//       } />
      
//       {/* Existing Maintenance Routes (keeping for backward compatibility) */}
//       {/* <Route path="/dashboard/request_maintenance" element={
//         <ProtectedRoute>
//           <RequestMaintenancePage />
//         </ProtectedRoute>
//       } /> */}
      
//       <Route path="/dashboard/request_submitted" element={
//         <ProtectedRoute>
//           <RequestSubmitted />
//         </ProtectedRoute>
//       } />
      
//       {/* 404 Route */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

// client/src/routes.jsx - Updated with maintenance routes
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Existing Pages
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import OTPPage from './pages/auth/OTPPage';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import ProjectListPage from './pages/dashboard/ProjectListPage';
import NotFound from './pages/NotFound';

// Existing Feedback Pages
import FeedbackPage from './pages/feedback/FeedbackPage';
import FeedbackSubmitted from './pages/feedback/FeedbackSubmitted';

// NEW: Maintenance Pages
import ServicesPage from './pages/maintenance/ServicesPage';
import UpgradePage from './pages/maintenance/UpgradePage';
import SupportPage from './pages/maintenance/SupportPage';
import ServiceRequestForm from './pages/maintenance/ServiceRequestForm';
import RequestSubmitted from './pages/maintenance/RequestSubmitted';
import ServiceHistory from './pages/maintenance/ServiceHistory';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();
  
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { state } = useAuth();
  
  if (state.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/otp" element={<OTPPage />} />
      
      {/* Protected Customer Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ProjectListPage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/project/:projectId" element={
        <ProtectedRoute>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      
      {/* NEW: Service Management Routes */}
      <Route path="/dashboard/project/:projectId/services" element={
        <ProtectedRoute>
          <ServicesPage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/project/:projectId/upgrade" element={
        <ProtectedRoute>
          <UpgradePage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/project/:projectId/support" element={
        <ProtectedRoute>
          <SupportPage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/project/:projectId/service-request" element={
        <ProtectedRoute>
          <ServiceRequestForm />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/project/:projectId/request-submitted" element={
        <ProtectedRoute>
          <RequestSubmitted />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/project/:projectId/service-history" element={
        <ProtectedRoute>
          <ServiceHistory />
        </ProtectedRoute>
      } />
      
      {/* Existing Feedback Routes */}
      <Route path="/dashboard/feedback" element={
        <ProtectedRoute>
          <FeedbackPage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/feedback_submitted" element={
        <ProtectedRoute>
          <FeedbackSubmitted />
        </ProtectedRoute>
      } />
      
      {/* Existing Maintenance Routes (keeping for backward compatibility) */}
      <Route path="/dashboard/request_submitted" element={
        <ProtectedRoute>
          <RequestSubmitted />
        </ProtectedRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
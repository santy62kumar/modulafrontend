// // client/src/routes.jsx - Updated with feedback and maintenance routes
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // Existing Pages
// import Register from './pages/auth/Register';
// import Login from './pages/auth/Login';
// import OTPPage from './pages/auth/OTPPage';
// import CustomerDashboard from './pages/dashboard/CustomerDashboard';
// import NotFound from './pages/NotFound';

// // NEW: Feedback Pages
// import FeedbackPage from './pages/feedback/FeedbackPage';
// import FeedbackSubmitted from './pages/feedback/FeedbackSubmitted';

// // NEW: Maintenance Pages
// import RequestMaintenancePage from './pages/maintenance/RequestMaintenancePage';
// import RequestSubmitted from './pages/maintenance/RequestSubmitted';

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
//           <CustomerDashboard />
//         </ProtectedRoute>
//       } />
      
      
      
//       {/* 404 Route */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

// client/src/routes.jsx - Updated with feedback and maintenance routes
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Existing Pages
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import OTPPage from './pages/auth/OTPPage';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import NotFound from './pages/NotFound';

// NEW: Feedback Pages
import FeedbackPage from './pages/feedback/FeedbackPage';
import FeedbackSubmitted from './pages/feedback/FeedbackSubmitted';

// NEW: Maintenance Pages
import RequestMaintenancePage from './pages/maintenance/RequestMaintenancePage';
import RequestSubmitted from './pages/maintenance/RequestSubmitted';

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
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      
      {/* NEW: Feedback Routes */}
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
      
      {/* NEW: Maintenance Routes */}
      <Route path="/dashboard/request_maintenance" element={
        <ProtectedRoute>
          <RequestMaintenancePage />
        </ProtectedRoute>
      } />
      
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
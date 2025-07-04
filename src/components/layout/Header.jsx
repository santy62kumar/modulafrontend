// // client/src/components/layout/Header.jsx
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Determine current page and button text/action
//   const isLoginPage = location.pathname === '/login';
//   const isRegisterPage = location.pathname === '/register';
  
//   const getButtonConfig = () => {
//     if (isLoginPage) {
//       return {
//         text: 'Register',
//         onClick: () => navigate('/register')
//       };
//     } else if (isRegisterPage) {
//       return {
//         text: 'Login',
//         onClick: () => navigate('/login')
//       };
//     } else {
//       // Default fallback
//       return {
//         text: 'Login',
//         onClick: () => navigate('/login')
//       };
//     }
//   };

//   const buttonConfig = getButtonConfig();

//   return (
//     <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               <img
//                 alt="Modula Logo"
//                 width="120"
//                 height="40"
//                 className="h-10 w-auto"
//                 src="/modua.png"
//                 style={{ color: "transparent" }}
//                 onError={(e) => {
//                   // Fallback to text if image fails
//                   e.target.style.display = 'none';
//                   e.target.nextSibling.style.display = 'block';
//                 }}
//               />
//               {/* Fallback text logo */}
//               <h1 
//                 className="text-2xl font-bold text-primary-500 font-montserrat"
//                 style={{ display: 'none' }}
//               >
//                 Modula
//               </h1>
//             </div>
//           </div>
            
//           <div className="flex items-center space-x-4">
//             <a 
//               className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" 
//               href="https://www.modula.in/contact-us"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Contact Us
//             </a>
//             <button
//               onClick={buttonConfig.onClick}
//               className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center"
//             >
//               {buttonConfig.text}
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// client/src/components/layout/Header.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: authState, dispatch } = useAuth();
  
  // Determine current page and button configurations
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isDashboard = location.pathname === '/dashboard';
  const isFeedbackPage = location.pathname === '/dashboard/feedback';
  const isMaintenancePage = location.pathname === '/dashboard/request_maintenance';
  const isAuthenticated = authState.isAuthenticated;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  // Navigation button configurations for different pages
  const getNavigationButtons = () => {
    if (!isAuthenticated) {
      // Public pages (login/register)
      if (isLoginPage) {
        return (
          <button
            onClick={() => navigate('/register')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center"
          >
            Register
          </button>
        );
      } else if (isRegisterPage) {
        return (
          <button
            onClick={() => navigate('/login')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center"
          >
            Login
          </button>
        );
      }
      return null;
    }

    // Authenticated user pages
    if (isDashboard) {
      return (
        <>
          <button
            onClick={() => navigate('/dashboard/feedback')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#AF7C71] text-white px-4 py-2 rounded-[30px] hover:bg-[#6B4B41] transition-colors text-center"
          >
            Feedback
          </button>
          
          <button
            onClick={() => navigate('/dashboard/request_maintenance')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
          >
            Maintenance
          </button>
          
          <button
            onClick={handleLogout}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
          >
            Logout
          </button>
        </>
      );
    } 
    
    if (isFeedbackPage) {
      return (
        <>
          <button
            onClick={() => navigate('/dashboard')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
          >
            Dashboard
          </button>
          
          <button
            onClick={() => navigate('/dashboard/request_maintenance')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#AF7C71] text-white px-4 py-2 rounded-[30px] hover:bg-[#6B4B41] transition-colors text-center"
          >
            Maintenance
          </button>
          
          <button
            onClick={handleLogout}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
          >
            Logout
          </button>
        </>
      );
    }
    
    if (isMaintenancePage) {
      return (
        <>
          <button
            onClick={() => navigate('/dashboard')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
          >
            Dashboard
          </button>
          
          <button
            onClick={() => navigate('/dashboard/feedback')}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#AF7C71] text-white px-4 py-2 rounded-[30px] hover:bg-[#6B4B41] transition-colors text-center"
          >
            Feedback
          </button>
          
          <button
            onClick={handleLogout}
            className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
          >
            Logout
          </button>
        </>
      );
    }

    // Default authenticated navigation (for success pages, etc.)
    return (
      <>
        <button
          onClick={() => navigate('/dashboard')}
          className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#D7C5AA] text-[#3A1A1A] px-4 py-2 rounded-[30px] hover:bg-[#AF7C71] hover:text-white transition-colors text-center"
        >
          Dashboard
        </button>
        
        <button
          onClick={handleLogout}
          className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                alt="Modula Logo"
                width="120"
                height="40"
                className="h-10 w-auto cursor-pointer"
                src="/modua.png"
                style={{ color: "transparent" }}
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
                onError={(e) => {
                  // Fallback to text if image fails
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              {/* Fallback text logo */}
              <h1 
                className="text-2xl font-bold text-[#3A1A1A] font-montserrat cursor-pointer"
                style={{ display: 'none' }}
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
              >
                Modula
              </h1>
            </div>
          </div>
            
          {/* Navigation Section */}
          <div className="flex items-center space-x-4">
            {/* Contact Us Link - Always visible */}
            <a 
              className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3D1D1C] text-white px-4 py-2 rounded-[30px] hover:bg-[#2b1514] transition-colors text-center" 
              href="https://www.modula.in/contact-us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
            
            {/* Dynamic Navigation Buttons */}
            {getNavigationButtons()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
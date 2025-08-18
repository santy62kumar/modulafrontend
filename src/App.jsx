// // client/src/App.jsx
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { ToastProvider } from './context/ToastContext';
// import AppRoutes from './routes';
// import Toast from './components/ui/Toast';
// import './styles/globals.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <ToastProvider>
//           <div className="App">
//             <AppRoutes />
//             <Toast />
//           </div>
//         </ToastProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;

// client/src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ServiceCartProvider } from './context/ServiceCartContext';
import { ToastProvider } from './context/ToastContext';
import AppRoutes from './routes';
import Toast from './components/ui/Toast';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServiceCartProvider>
          <ToastProvider>
            <div className="App">
              <AppRoutes />
              <Toast />
            </div>
          </ToastProvider>
        </ServiceCartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
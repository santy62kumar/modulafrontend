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
import React, { useEffect }from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ServiceCartProvider } from './context/ServiceCartContext';
import { ToastProvider } from './context/ToastContext';
import AppRoutes from './routes';
import Toast from './components/ui/Toast';
import './styles/globals.css';
import { useFirebaseImages } from './hooks/useFirebaseImages';

function App() {

  // Preload Firebase images when app starts
  const { preloadImages, loading: imagesLoading } = useFirebaseImages();

  useEffect(() => {
    // Preload images when app starts
    preloadImages();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ServiceCartProvider>
          <ToastProvider>
            <div className="App">
              {/* Show loading indicator while images are preloading */}
              {imagesLoading && (
                <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                  <div className="h-full bg-[#3A1A1A] animate-pulse"></div>
                </div>
              )}
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
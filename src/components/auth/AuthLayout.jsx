// client/src/components/auth/AuthLayout.jsx
import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary-500 font-montserrat">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-primary-300 font-nunito">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AuthLayout;
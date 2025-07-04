// client/src/pages/maintenance/RequestMaintenancePage.jsx
import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MaintenanceForm from '../../components/maintenance/MaintenanceForm';

const RequestMaintenancePage = () => {
  return (
    <div className="min-h-screen bg-[#F1E6DD]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#6B4B41] px-8 py-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#AF7C71] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h1 className="text-2xl font-bold text-white font-montserrat mb-2">
                Requests, Maintenance & Upgrades
              </h1>
              <p className="text-[#F1E6DD] font-nunito">
                Please click appropriate request below
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <MaintenanceForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RequestMaintenancePage;
// client/src/pages/feedback/FeedbackSubmitted.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

const FeedbackSubmitted = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  // Get data passed from feedback form
  const { referenceId, submittedAt } = location.state || {};
  const submissionDate = submittedAt ? new Date(submittedAt).toLocaleDateString() : new Date().toLocaleDateString();

  return (
  <div className="flex flex-col min-h-screen bg-[#F1E6DD]">
    {/* Header */}
    <Header />

    {/* Main Content */}
    <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-br from-[#6B4B41] to-[#AF7C71] px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white font-montserrat mb-4">
              Thank You!
            </h1>
            <p className="text-[#F1E6DD] font-nunito text-lg">
              Your feedback has been submitted successfully
            </p>
          </div>
        </div>
      </div>
    </main>

    {/* Footer */}
    <Footer />
  </div>
);

};

export default FeedbackSubmitted;
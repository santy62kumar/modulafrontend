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
    <div className="min-h-screen bg-[#F1E6DD]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-[#6B4B41] to-[#AF7C71] px-8 py-12">
            <div className="text-center">
              {/* <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✅</span>
              </div> */}
              <h1 className="text-3xl font-bold text-white font-montserrat mb-4">Thank You!</h1>
              <p className="text-[#F1E6DD] font-nunito text-lg">Your feedback has been submitted successfully</p>
            </div>
          </div>

          <div className="p-8">
            {/* Success Message */}
            {/* <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-4">
                We appreciate your valuable feedback!
              </h2>
              <p className="text-[#6B4B41] font-nunito mb-6 leading-relaxed">
                Your insights help us improve our service quality and ensure a better experience for all our customers. 
                Our team will review your feedback and take necessary actions where required.
              </p>
            </div> */}

            {/* What happens next */}
            {/* <div className="bg-[#F1E6DD] rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-4">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-[#AF7C71] mr-3 mt-1">📧</span>
                  <div>
                    <p className="text-sm font-semibold text-[#3A1A1A] font-montserrat">SMS Confirmation</p>
                    <p className="text-sm text-[#6B4B41] font-nunito">Our quality team will review your feedback within 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[#AF7C71] mr-3 mt-1">📞</span>
                  <div>
                    <p className="text-sm font-semibold text-[#3A1A1A] font-montserrat">Follow-up (if needed)</p>
                    <p className="text-sm text-[#6B4B41] font-nunito">We'll contact you if any follow-up action is required</p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Reference Information */}
            {referenceId && (
              <div className="bg-white border border-[#D7C5AA] rounded-lg p-6 mb-8">
                {/* <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-4">Feedback Reference</h3> */}
                {/* <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-4">Submitted on:</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {/* <div>
                    <span className="text-[#6B4B41] font-nunito">Reference ID:</span>
                    <span className="font-semibold text-[#3A1A1A] font-montserrat ml-2">{referenceId}</span>
                  </div> */}
                  <div>
                    <span className="font-semibold text-[#3A1A1A] font-montserrat ml-2">Submitted on: </span>
                    {/* font-semibold text-[#3A1A1A] font-montserrat ml-2 */}
                    <span className="text-[#3A1A1A] font-nunito">{submissionDate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-[#3A1A1A] text-white px-6 py-3 hover:bg-[#4F372F]"
              >
                Back to Dashboard
              </Button>
              {/* <Button
                onClick={() => navigate('/dashboard/request_maintenance')}
                className="bg-[#AF7C71] text-white px-6 py-3 hover:bg-[#6B4B41]"
              >
                Request Maintenance
              </Button> */}
            </div>

            {/* Contact Support */}
            {/* <div className="text-center mt-8 pt-6 border-t border-[#D7C5AA]">
              <p className="text-sm text-[#6B4B41] font-nunito mb-2">Need immediate assistance?</p>
              <a href="tel:+916205281574" className="text-[#AF7C71] font-semibold font-montserrat hover:text-[#6B4B41] transition-colors">
                Call +91 62052 81574
              </a>
            </div> */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeedbackSubmitted;
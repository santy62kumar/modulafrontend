// client/src/pages/maintenance/RequestSubmitted.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

const RequestSubmitted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data passed from maintenance form
  const { referenceId, submittedAt, selectedServices } = location.state || {};
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
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔧</span>
              </div>
              <h1 className="text-3xl font-bold text-white font-montserrat mb-4">Request Submitted!</h1>
              <p className="text-[#F1E6DD] font-nunito text-lg">Your maintenance request has been received</p>
            </div>
          </div>

          <div className="p-8">
            {/* Success Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-4">
                Thank you for your service request!
              </h2>
              <p className="text-[#6B4B41] font-nunito mb-6 leading-relaxed">
                Our technical team has received your maintenance request and will process it shortly. 
                We'll schedule a convenient time for our experts to visit and address your requirements.
              </p>
            </div>

            {/* Request Summary */}
            {selectedServices && selectedServices.length > 0 && (
              <div className="bg-[#F1E6DD] rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-4">Request Summary</h3>
                <div className="space-y-3">
                  {selectedServices.slice(0, 5).map((service, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#AF7C71] mr-3">✓</span>
                      <span className="text-sm text-[#3A1A1A] font-nunito">{service}</span>
                    </div>
                  ))}
                  {selectedServices.length > 5 && (
                    <div className="flex items-center">
                      <span className="text-[#AF7C71] mr-3">✓</span>
                      <span className="text-sm text-[#6B4B41] font-nunito">
                        And {selectedServices.length - 5} more services...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What happens next */}
            <div className="bg-white border border-[#D7C5AA] rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                  <div>
                    <p className="text-sm font-semibold text-[#3A1A1A] font-montserrat">Immediate Confirmation</p>
                    <p className="text-sm text-[#6B4B41] font-nunito">SMS confirmation sent to your registered number</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                  <div>
                    <p className="text-sm font-semibold text-[#3A1A1A] font-montserrat">Team Assignment</p>
                    <p className="text-sm text-[#6B4B41] font-nunito">Technical team will be assigned within 4-6 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                  <div>
                    <p className="text-sm font-semibold text-[#3A1A1A] font-montserrat">Schedule Confirmation</p>
                    <p className="text-sm text-[#6B4B41] font-nunito">Our team will call you to schedule a convenient visit time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#AF7C71] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                  <div>
                    <p className="text-sm font-semibold text-[#3A1A1A] font-montserrat">Service Completion</p>
                    <p className="text-sm text-[#6B4B41] font-nunito">Expert technicians will visit and complete the requested services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference Information */}
            {referenceId && (
              <div className="bg-white border border-[#D7C5AA] rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-4">Service Request Reference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#6B4B41] font-nunito">Request ID:</span>
                    <span className="font-semibold text-[#3A1A1A] font-montserrat ml-2">{referenceId}</span>
                  </div>
                  <div>
                    <span className="text-[#6B4B41] font-nunito">Submitted on:</span>
                    <span className="font-semibold text-[#3A1A1A] font-montserrat ml-2">{submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[#6B4B41] font-nunito">Priority:</span>
                    <span className="font-semibold text-[#AF7C71] font-montserrat ml-2">Standard</span>
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
              <Button
                onClick={() => navigate('/dashboard/feedback')}
                className="bg-[#AF7C71] text-white px-6 py-3 hover:bg-[#6B4B41]"
              >
                Give Feedback
              </Button>
            </div>

            {/* Contact Support */}
            <div className="text-center mt-8 pt-6 border-t border-[#D7C5AA]">
              <p className="text-sm text-[#6B4B41] font-nunito mb-2">Need immediate assistance?</p>
              <a href="tel:+916205281574" className="text-[#AF7C71] font-semibold font-montserrat hover:text-[#6B4B41] transition-colors">
                Call +91 62052 81574
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RequestSubmitted;
// // client/src/pages/feedback/FeedbackPage.jsx
// import React from 'react';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';
// import FeedbackForm from '../../components/feedback/FeedbackForm';

// const FeedbackPage = () => {
//   return (
//     <div className="min-h-screen bg-[#F1E6DD]">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-[#6B4B41] px-8 py-6">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-[#AF7C71] rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl">📝</span>
//               </div>
//               <h1 className="text-2xl font-bold text-white font-montserrat mb-2">
//                 Customer Feedback Form
//               </h1>
//               <p className="text-[#F1E6DD] font-nunito">
//                 At Modula your feedback helps us improve our service and ensure a seamless experience.
//               </p>
//             </div>
//           </div>

//           {/* Form Content */}
//           <div className="p-8">
//             <FeedbackForm />
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default FeedbackPage;

// client/src/pages/feedback/FeedbackPage.jsx - ENHANCED VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { feedbackAPI } from '../../services/api/feedback';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FeedbackForm from '../../components/feedback/FeedbackForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkFeedbackAccess();
  }, []);

  const checkFeedbackAccess = async () => {
    try {
      setPageLoading(true);
      const response = await feedbackAPI.checkFeedbackStatus();
      setFeedbackStatus(response.data);
      
      // If already submitted, redirect to submitted page
      if (response.data.hasSubmitted) {
        navigate('/dashboard/feedback_submitted', {
          state: {
            referenceId: response.data.feedback?.referenceId,
            submittedAt: response.data.status.submitted_at
          }
        });
      }
    } catch (error) {
      console.error('Error checking feedback access:', error);
      setError(error.message || 'Failed to check feedback status');
    } finally {
      setPageLoading(false);
    }
  };

  const renderPageContent = () => {
    // ✅ Loading state
    if (pageLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-[#6B4B41] font-nunito">Loading feedback page...</p>
        </div>
      );
    }

    // ✅ Error state
    if (error) {
      return (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-[#3A1A1A] font-montserrat mb-4">
            Unable to Load Feedback
          </h3>
          <p className="text-[#6B4B41] font-nunito mb-6 max-w-md mx-auto">
            {error}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
            <Button onClick={checkFeedbackAccess} className="bg-[#AF7C71] hover:bg-[#6B4B41]">
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    // ✅ Not eligible state
    if (feedbackStatus.hasSubmitted) {
      return (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-[#F1E6DD] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⏰</span>
          </div>
          <h3 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-4">
            Feedback Not Available Yet
          </h3>
          {/* <p className="text-[#6B4B41] font-nunito mb-8 max-w-lg mx-auto text-lg">
            {feedbackStatus.message || 'Your feedback form will be available after the project installation is completed. We will notify you via SMS when it\'s ready.'}
          </p> */}
          
          {/* <div className="bg-[#F1E6DD] rounded-lg p-6 max-w-md mx-auto mb-8">
            <h4 className="font-semibold text-[#3A1A1A] font-montserrat mb-3">What happens next?</h4>
            <div className="space-y-2 text-sm text-[#6B4B41] font-nunito">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#AF7C71] rounded-full mr-3"></span>
                Installation team completes your project
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#AF7C71] rounded-full mr-3"></span>
                You'll receive an SMS notification
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#AF7C71] rounded-full mr-3"></span>
                Feedback form becomes available
              </div>
            </div>
          </div> */}

          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      );
    }

    // ✅ Render feedback form if eligible
    return <FeedbackForm />;
  };

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
              {/* <div className="w-16 h-16 bg-[#AF7C71] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div> */}
              <h1 className="text-2xl font-bold text-white font-montserrat mb-2">
                Feedback
              </h1>
              {/* <p className="text-[#F1E6DD] font-nunito">
                Your feedback helps us improve our service and ensure a seamless experience
              </p> */}
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="p-8">
            {renderPageContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeedbackPage;
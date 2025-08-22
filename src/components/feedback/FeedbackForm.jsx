// // client/src/components/feedback/FeedbackForm.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useToast } from '../../context/ToastContext';
// import { feedbackAPI } from '../../services/api/feedback';

// // UI Components
// import Input from '../ui/Input';
// import TextArea from '../ui/TextArea';
// import RadioGroup from '../ui/RadioGroup';
// import Checkbox from '../ui/Checkbox';
// import DatePicker from '../ui/DatePicker';
// import Button from '../ui/Button';
// import LoadingSpinner from '../ui/LoadingSpinner';
// import RatingInput from './RatingInput';

// const FeedbackForm = () => {
//   const navigate = useNavigate();
//   const { state: authState } = useAuth();
//   const { addToast } = useToast();
  
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [canSubmit, setCanSubmit] = useState(false);
//   const [checkingStatus, setCheckingStatus] = useState(true);

//   const [formData, setFormData] = useState({
//     // Basic Information (auto-filled from dashboard/auth)
//     customerName: '',
//     projectName: '',
//     location: '',
//     handoverDate: new Date().toISOString().split('T')[0],
//     contactNumber: '',
    
//     // Rating fields (1-4 scale)
//     ratings: {
//       installationBehavior: 0,
//       punctuality: 0,
//       cleanliness: 0,
//       installationQuality: 0,
//       productQuality: 0,
//       deliveryExperience: 0,
//       communication: 0,
//       overallExperience: 0
//     },
    
//     // Text feedback
//     likedMost: '',
//     improvements: '',
//     wouldRecommend: '',
    
//     // Acknowledgements
//     customerConfirmation: false,
//     projectManager: '',
//     installerNames: ''
//   });

//   const [errors, setErrors] = useState({});

//   const ratingLabels = {
//     installationBehavior: 'Installation Personnel Behavior & Professionalism',
//     punctuality: 'Punctuality & Timeliness of Installation',
//     cleanliness: 'Cleanliness & Post-Installation Cleanup',
//     installationQuality: 'Quality of Installation (Alignment, Finishing, Stability)',
//     productQuality: 'Product Quality (Materials, Look & Feel, Functionality)',
//     deliveryExperience: 'Delivery Experience (Timeliness, Packaging Condition, Handling)',
//     communication: 'Communication & Support from Modula Team',
//     overallExperience: 'Overall Experience with Modula'
//   };

//   // Check if user can submit feedback
//   useEffect(() => {
//     const checkFeedbackStatus = async () => {
//       try {
//         setCheckingStatus(true);
//         const response = await feedbackAPI.checkFeedbackStatus();
//         setCanSubmit(response.data.canSubmit);
        
//         if (!response.data.canSubmit) {
//           addToast('You have already submitted feedback for this project', 'info');
//           navigate('/dashboard');
//         }
//       } catch (error) {
//         console.error('Error checking feedback status:', error);
//         addToast('Unable to verify feedback status. Please try again.', 'error');
//         navigate('/dashboard');
//       } finally {
//         setCheckingStatus(false);
//       }
//     };

//     if (authState.user) {
//       checkFeedbackStatus();
//       // Pre-fill user data
//       setFormData(prev => ({
//         ...prev,
//         customerName: authState.user.firstName + ' ' + authState.user.lastName,
//         contactNumber: authState.user.phone,
//         // Add other user data if available from dashboard context
//       }));
//     }
//   }, [authState.user, navigate, addToast]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handleRatingChange = (ratingType, value) => {
//     setFormData(prev => ({
//       ...prev,
//       ratings: {
//         ...prev.ratings,
//         [ratingType]: value
//       }
//     }));
    
//     // Clear error
//     if (errors[`ratings.${ratingType}`]) {
//       setErrors(prev => ({ ...prev, [`ratings.${ratingType}`]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Basic information validation
//     if (!formData.customerName.trim()) {
//       newErrors.customerName = 'Customer name is required';
//     }
//     if (!formData.projectName.trim()) {
//       newErrors.projectName = 'Project name is required';
//     }
//     if (!formData.location.trim()) {
//       newErrors.location = 'Location is required';
//     }
//     if (!formData.handoverDate) {
//       newErrors.handoverDate = 'Handover date is required';
//     }
//     if (!formData.contactNumber.trim()) {
//       newErrors.contactNumber = 'Contact number is required';
//     }

//     // Ratings validation
//     Object.keys(ratingLabels).forEach(key => {
//       if (!formData.ratings[key] || formData.ratings[key] < 1 || formData.ratings[key] > 4) {
//         newErrors[`ratings.${key}`] = 'This rating is required';
//       }
//     });

//     // Text feedback validation
//     if (!formData.likedMost.trim()) {
//       newErrors.likedMost = 'Please share what you liked most';
//     } else if (formData.likedMost.trim().length < 10) {
//       newErrors.likedMost = 'Please provide more detailed feedback (minimum 10 characters)';
//     }

//     if (!formData.improvements.trim()) {
//       newErrors.improvements = 'Please share improvement suggestions';
//     } else if (formData.improvements.trim().length < 5) {
//       newErrors.improvements = 'Please provide more detailed feedback (minimum 5 characters)';
//     }

//     if (!['Yes', 'No', 'Maybe'].includes(formData.wouldRecommend)) {
//       newErrors.wouldRecommend = 'Please select if you would recommend Modula';
//     }

//     // Acknowledgement validation
//     if (!formData.customerConfirmation) {
//       newErrors.customerConfirmation = 'Customer confirmation is required';
//     }
//     if (!formData.projectManager.trim()) {
//       newErrors.projectManager = 'Project manager name is required';
//     }
//     if (!formData.installerNames.trim()) {
//       newErrors.installerNames = 'Installer names are required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       addToast('Please fix the errors below', 'error');
//       return;
//     }

//     setSubmitting(true);
    
//     try {
//       const response = await feedbackAPI.submitFeedback(formData);
      
//       addToast('Feedback submitted successfully!', 'success');
//       navigate('/dashboard/feedback_submitted', {
//         state: { 
//           referenceId: response.data.referenceId,
//           submittedAt: response.data.submittedAt
//         }
//       });
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//       addToast(error.message || 'Failed to submit feedback. Please try again.', 'error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (checkingStatus) {
//     return (
//       <div className="flex justify-center items-center min-h-96">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (!canSubmit) {
//     return (
//       <div className="text-center py-12">
//         <div className="w-16 h-16 bg-[#AF7C71] rounded-full flex items-center justify-center mx-auto mb-4">
//           <span className="text-2xl">📝</span>
//         </div>
//         <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
//           Feedback Already Submitted
//         </h3>
//         <p className="text-[#6B4B41] font-nunito">
//           You have already submitted feedback for this project.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Information Section */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
//             Basic Information
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input
//               label="Customer Name"
//               name="customerName"
//               value={formData.customerName}
//               onChange={(e) => handleInputChange('customerName', e.target.value)}
//               error={errors.customerName}
//               required
//               readOnly
//               className="bg-[#F1E6DD]"
//             />
            
//             <Input
//               label="Project Name"
//               name="projectName"
//               value={formData.projectName}
//               onChange={(e) => handleInputChange('projectName', e.target.value)}
//               error={errors.projectName}
//               placeholder="Enter project name"
//               required
//             />
            
//             <Input
//               label="Location"
//               name="location"
//               value={formData.location}
//               onChange={(e) => handleInputChange('location', e.target.value)}
//               error={errors.location}
//               placeholder="Enter location"
//               required
//             />
            
//             <DatePicker
//               label="Handover Date"
//               name="handoverDate"
//               value={formData.handoverDate}
//               onChange={(e) => handleInputChange('handoverDate', e.target.value)}
//               error={errors.handoverDate}
//               required
//             />
            
//             <div className="md:col-span-2">
//               <Input
//                 label="Contact Number"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={(e) => handleInputChange('contactNumber', e.target.value)}
//                 error={errors.contactNumber}
//                 required
//                 readOnly
//                 className="bg-[#F1E6DD]"
//                 maxLength={10}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Feedback Ratings Section */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
//             Feedback for Product & Service
//           </h3>
//           <p className="text-sm text-[#6B4B41] mb-6 font-nunito">
//             Please rate the following aspects on a scale of 1 to 4, with 4 being Exceptional and 1 being Very Bad.
//           </p>
          
//           {Object.keys(ratingLabels).map((key) => (
//             <RatingInput
//               key={key}
//               label={ratingLabels[key]}
//               name={key}
//               value={formData.ratings[key]}
//               onChange={handleRatingChange}
//               error={errors[`ratings.${key}`]}
//               required
//             />
//           ))}
//         </div>

//         {/* Additional Feedback Section */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
//             Additional Feedback
//           </h3>
          
//           <div className="space-y-6">
//             <TextArea
//               label="What did you like the most about your Modula kitchen?"
//               value={formData.likedMost}
//               onChange={(e) => handleInputChange('likedMost', e.target.value)}
//               error={errors.likedMost}
//               placeholder="Share what you loved most about your experience..."
//               required
//               maxLength={1000}
//               showCharCount
//               rows={4}
//             />
            
//             <TextArea
//               label="Is there anything we could improve?"
//               value={formData.improvements}
//               onChange={(e) => handleInputChange('improvements', e.target.value)}
//               error={errors.improvements}
//               placeholder="Help us improve by sharing your suggestions..."
//               required
//               maxLength={1000}
//               showCharCount
//               rows={4}
//             />
            
//             <RadioGroup
//               label="Would you recommend Modula to others?"
//               name="wouldRecommend"
//               options={['Yes', 'No', 'Maybe']}
//               value={formData.wouldRecommend}
//               onChange={(value) => handleInputChange('wouldRecommend', value)}
//               error={errors.wouldRecommend}
//               required
//             />
//           </div>
//         </div>

//         {/* Installation Team Acknowledgement Section */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
//             Installation Team Acknowledgement
//           </h3>
          
//           <div className="space-y-6">
//             <Checkbox
//               label="I confirm that the kitchen has been installed to my satisfaction, and I have inspected all the components."
//               checked={formData.customerConfirmation}
//               onChange={(checked) => handleInputChange('customerConfirmation', checked)}
//               error={errors.customerConfirmation}
//               required
//             />
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input
//                 label="Project Manager/Supervisor"
//                 value={formData.projectManager}
//                 onChange={(e) => handleInputChange('projectManager', e.target.value)}
//                 error={errors.projectManager}
//                 placeholder="Enter project manager name"
//                 required
//               />
              
//               <Input
//                 label="Installer Names"
//                 value={formData.installerNames}
//                 onChange={(e) => handleInputChange('installerNames', e.target.value)}
//                 error={errors.installerNames}
//                 placeholder="Enter installer names"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center pt-6">
//           <Button
//             type="submit"
//             loading={submitting}
//             disabled={submitting}
//             className="px-8 py-3"
//           >
//             {submitting ? 'Submitting...' : 'Submit Feedback'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FeedbackForm;

// client/src/components/feedback/FeedbackForm.jsx - ENHANCED VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { feedbackAPI } from '../../services/api/feedback';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import Input from '../ui/Input';
import RatingInput from '../forms/RatingInput';
import { UserIcon, BuildingStorefrontIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
// import "./Dropdown.css";
import Select from './Select';
import CheckboxGrid from './CheckboxGrid';


const FeedbackForm = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { addToast } = useToast();
  
  // Component state
  const [loading, setLoading] = useState(false);
  const [checkingEligibility, setCheckingEligibility] = useState(true);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [formData, setFormData] = useState({
    customerName: state.user?.firstName && state.user?.lastName 
      ? `${state.user.firstName} ${state.user.lastName}` 
      : '',
    projectName: '',
    location: '',
    handoverDate: '',
    contactNumber: state.user?.phone || '',
    ratings: {
      installationBehavior: null,
      punctuality: null,
      cleanliness: null,
      installationQuality: null,
      productQuality: null,
      deliveryExperience: null,
      communication: null,
      overallExperience: null
    },
    likedMost: '',
    improvements: '',
    wouldRecommend: '',
    customerConfirmation: false,
    projectManager: '',
    installerNames: ''
  });
  const [errors, setErrors] = useState({});

  const recommendOptions = [
            { value: "", label: "Select an option" },      // optional placeholder
            { value: "Yes",   label: "Yes, absolutely!" },
            { value: "No",    label: "No, not really" },
            { value: "Maybe", label: "Maybe, with improvements" },
  ];

  // ✅ Check feedback eligibility on component mount
  useEffect(() => {
    checkFeedbackEligibility();
  }, []);

  const checkFeedbackEligibility = async () => {
    try {
      setCheckingEligibility(true);
      const response = await feedbackAPI.checkFeedbackStatus();
      
      setFeedbackStatus(response.data);
      
      // If already submitted, show success message and redirect
      if (response.data.hasSubmitted) {
        addToast('You have already submitted feedback for this project', 'info');
        setTimeout(() => {
          navigate('/dashboard/feedback_submitted', {
            state: {
              referenceId: response.data.feedback?.referenceId,
              submittedAt: response.data.status.submitted_at
            }
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking feedback eligibility:', error);
      addToast('Failed to check feedback status', 'error');
    } finally {
      setCheckingEligibility(false);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (ratingName, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [ratingName]: value
      }
    }));
    
    // Clear rating errors
    if (errors[`ratings.${ratingName}`]) {
      setErrors(prev => ({ ...prev, [`ratings.${ratingName}`]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic information validation
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.handoverDate) {
      newErrors.handoverDate = 'Handover date is required';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    // Rating validation
    const ratingFields = Object.keys(formData.ratings);
    ratingFields.forEach(field => {
      if (!formData.ratings[field] || formData.ratings[field] < 1 || formData.ratings[field] > 4) {
        newErrors[`ratings.${field}`] = 'Please provide a rating between 1 and 4';
      }
    });

    // Text feedback validation
    if (!formData.likedMost.trim()) {
      newErrors.likedMost = 'Please share what you liked most';
    }
    if (!formData.improvements.trim()) {
      newErrors.improvements = 'Please share improvement suggestions';
    }
    if (!formData.wouldRecommend) {
      newErrors.wouldRecommend = 'Please select recommendation';
    }

    // Acknowledgement validation
    if (!formData.customerConfirmation) {
      newErrors.customerConfirmation = 'Customer confirmation is required';
    }
    if (!formData.projectManager.trim()) {
      newErrors.projectManager = 'Project manager name is required';
    }
    if (!formData.installerNames.trim()) {
      newErrors.installerNames = 'Installer names are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addToast('Please fill all required fields correctly', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await feedbackAPI.submitFeedback(formData);
      
      addToast('Feedback submitted successfully!', 'success');
      
      // Navigate to success page with reference data
      navigate('/dashboard/feedback_submitted', {
        state: {
          referenceId: response.data.referenceId,
          submittedAt: response.data.submittedAt
        }
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      addToast(error.message || 'Failed to submit feedback. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading state while checking eligibility
  if (checkingEligibility) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[#6B4B41] font-nunito">Checking feedback availability...</p>
      </div>
    );
  }

  // ✅ Not eligible state
  if (feedbackStatus && !feedbackStatus.canSubmit && !feedbackStatus.hasSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#F1E6DD] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⏰</span>
        </div>
        <h3 className="text-xl font-semibold text-[#3A1A1A] font-montserrat mb-4">
          Feedback Not Available Yet
        </h3>
        <p className="text-[#6B4B41] font-nunito mb-6 max-w-md mx-auto">
          {feedbackStatus.message || 'Feedback form will be available after your project installation is completed.'}
        </p>
        <Button onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // ✅ Already submitted state
  if (feedbackStatus && feedbackStatus.hasSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#AF7C71] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-white">✅</span>
        </div>
        <h3 className="text-xl font-semibold text-[#3A1A1A] font-montserrat mb-4">
          Feedback Already Submitted
        </h3>
        <p className="text-[#6B4B41] font-nunito mb-6 max-w-md mx-auto">
          Thank you! You have already submitted your feedback for this project.
        </p>
        {feedbackStatus.status.submitted_at && (
          <p className="text-sm text-[#6B4B41] font-nunito mb-6">
            Submitted on: {new Date(feedbackStatus.status.submitted_at).toLocaleDateString()}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => navigate('/dashboard/request_maintenance')}
            className="bg-[#AF7C71] hover:bg-[#6B4B41]"
          >
            Request Maintenance
          </Button>
        </div>
      </div>
    );
  }

  // ✅ Render feedback form if eligible and not submitted
  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Customer Name"
            name="customerName"
            icon={UserIcon}
            value={formData.customerName}
            onChange={handleInputChange}
            error={errors.customerName}
            placeholder="Customer Name"
            required
          />
          <Input
            label="Project Name"
            name="projectName"
            icon={BuildingStorefrontIcon}
            value={formData.projectName}
            onChange={handleInputChange}
            error={errors.projectName}
            placeholder="Kitchen Installation Project"
            required
          />
          <Input
            label="Location"
            name="location"
            icon={MapPinIcon}
            value={formData.location}
            onChange={handleInputChange}
            error={errors.location}
            placeholder="Installation Location"
            required
          />
          <Input
            label="Handover Date"
            name="handoverDate"
            type="date"
            icon={CalendarIcon}
            value={formData.handoverDate}
            onChange={handleInputChange}
            error={errors.handoverDate}
            required
          />
        </div>

        <Input
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          error={errors.contactNumber}
          placeholder="Contact Number"
          required
        />

        {/* Rating Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
              Rate Your Experience
            </h3>
            <p className="text-[#6B4B41] mb-6 font-nunito">
              Please rate the following aspects on a scale of 1 to 4, with 1 = POOR and 4 = EXCEPTIONAL
            </p>
          </div>
          
          <RatingInput
            label="Installation Personnel Behavior & Professionalism"
            name="installationBehavior"
            value={formData.ratings.installationBehavior}
            onChange={handleRatingChange}
            error={errors['ratings.installationBehavior']}
            required
          />
          
          <RatingInput
            label="Punctuality & Timeliness of Installation"
            name="punctuality"
            value={formData.ratings.punctuality}
            onChange={handleRatingChange}
            error={errors['ratings.punctuality']}
            required
          />
          
          <RatingInput
            label="Cleanliness & Post-Installation Cleanup"
            name="cleanliness"
            value={formData.ratings.cleanliness}
            onChange={handleRatingChange}
            error={errors['ratings.cleanliness']}
            required
          />
          
          <RatingInput
            label="Quality of Installation (Alignment, Finishing, Stability)"
            name="installationQuality"
            value={formData.ratings.installationQuality}
            onChange={handleRatingChange}
            error={errors['ratings.installationQuality']}
            required
          />
          
          <RatingInput
            label="Product Quality (Materials, Look & Feel, Functionality)"
            name="productQuality"
            value={formData.ratings.productQuality}
            onChange={handleRatingChange}
            error={errors['ratings.productQuality']}
            required
          />
          
          <RatingInput
            label="Delivery Experience (Timeliness, Packaging Condition, Handling)"
            name="deliveryExperience"
            value={formData.ratings.deliveryExperience}
            onChange={handleRatingChange}
            error={errors['ratings.deliveryExperience']}
            required
          />
          
          <RatingInput
            label="Communication & Support"
            name="communication"
            value={formData.ratings.communication}
            onChange={handleRatingChange}
            error={errors['ratings.communication']}
            required
          />

          <RatingInput
            label="Overall Experience"
            name="overallExperience"
            value={formData.ratings.overallExperience}
            onChange={handleRatingChange}
            error={errors['ratings.overallExperience']}
            required
          />
        </div>

        {/* Text Feedback */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
              What did you like most about your kitchen? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="likedMost"
              rows="4"
              placeholder="Share what you loved about your new kitchen..."
              className="w-full px-4 py-3 border border-[#D7C5AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent resize-none font-nunito"
              value={formData.likedMost}
              onChange={handleInputChange}
            />
            {errors.likedMost && (
              <p className="mt-1 text-sm text-red-500 font-nunito">{errors.likedMost}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
              What could we improve? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="improvements"
              rows="4"
              placeholder="Let us know how we can serve you better..."
              className="w-full px-4 py-3 border border-[#D7C5AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent resize-none font-nunito"
              value={formData.improvements}
              onChange={handleInputChange}
            />
            {errors.improvements && (
              <p className="mt-1 text-sm text-red-500 font-nunito">{errors.improvements}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
              Would you recommend Modula? <span className="text-3A1A1A">*</span>
            </label>
            <select
              name="wouldRecommend"
              className="w-full px-4 py-3 border border-[#D7C5AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent font-nunito"
              value={formData.wouldRecommend}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes, absolutely!</option>
              <option value="No">No, not really</option>
              <option value="Maybe">Maybe, with improvements</option>
            </select>
            {errors.wouldRecommend && (
              <p className="mt-1 text-sm text-red-500 font-nunito">{errors.wouldRecommend}</p>
            )}

            
          </div> */}
          

          <div>
            <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
              Would you recommend Modula? <span className="text-3A1A1A">*</span>
            </label>

            <Select
              name="wouldRecommend"
              value={formData.wouldRecommend}
              onChange={(val) =>
                handleInputChange({ target: { name: "wouldRecommend", value: val } })
              }
              options={recommendOptions}
              placeholder="Select an option"
              error={errors.wouldRecommend}
            />

          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
              Project Manager/Supervisor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="projectManager"
              value={formData.projectManager}
              onChange={handleInputChange}
              placeholder="Project Manager Name"
              className="w-full px-4 py-3 border border-[#D7C5AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent font-nunito"
            />
            {errors.projectManager && (
              <p className="mt-1 text-sm text-red-500 font-nunito">{errors.projectManager}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#3A1A1A] mb-2 font-montserrat">
              Installer Name(s) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="installerNames"
              value={formData.installerNames}
              onChange={handleInputChange}
              placeholder="Installer Names"
              className="w-full px-4 py-3 border border-[#D7C5AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent font-nunito"
            />
            {errors.installerNames && (
              <p className="mt-1 text-sm text-red-500 font-nunito">{errors.installerNames}</p>
            )}
          </div>
        </div>

        {/* Confirmation Checkbox */}
        {/* <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="customerConfirmation"
            name="customerConfirmation"
            className="mt-1 h-4 w-4 text-[#AF7C71] border-gray-300 rounded focus:ring-[#AF7C71]"
            checked={formData.customerConfirmation}
            onChange={handleInputChange}
          />
          <label htmlFor="customerConfirmation" className="text-[#3A1A1A] font-nunito">
            I confirm the kitchen has been installed to my satisfaction and I acknowledge the completion of the project. <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.customerConfirmation && (
          <p className="text-sm text-red-500 font-nunito">{errors.customerConfirmation}</p>
        )} */}

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="customerConfirmation"
            name="customerConfirmation"
            className="mt-1 h-4 w-4 border-gray-300 rounded 
                      focus:ring-[#AF7C71]"
            style={{ accentColor: "#AF7C71" }}   // ✅ This line ensures checkbox is #AF7C71
            checked={formData.customerConfirmation}
            onChange={handleInputChange}
          />
          <label 
            htmlFor="customerConfirmation" 
            className="text-[#3A1A1A] font-nunito"
          >
            I confirm the kitchen has been installed to my satisfaction and I acknowledge the completion of the project. <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.customerConfirmation && (
          <p className="text-sm text-red-500 font-nunito">{errors.customerConfirmation}</p>
        )}


        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            loading={loading}
            className="px-8 bg-[#3A1A1A] hover:bg-[#4F372F]"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
          {/* <p className="text-[#6B4B41] text-sm mt-4 font-nunito">
            Thank you for choosing Modula. Your feedback helps us improve our services.
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
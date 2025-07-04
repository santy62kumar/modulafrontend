// client/src/components/feedback/FeedbackForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { feedbackAPI } from '../../services/api/feedback';

// UI Components
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import RadioGroup from '../ui/RadioGroup';
import Checkbox from '../ui/Checkbox';
import DatePicker from '../ui/DatePicker';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import RatingInput from './RatingInput';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const { addToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const [formData, setFormData] = useState({
    // Basic Information (auto-filled from dashboard/auth)
    customerName: '',
    projectName: '',
    location: '',
    handoverDate: new Date().toISOString().split('T')[0],
    contactNumber: '',
    
    // Rating fields (1-4 scale)
    ratings: {
      installationBehavior: 0,
      punctuality: 0,
      cleanliness: 0,
      installationQuality: 0,
      productQuality: 0,
      deliveryExperience: 0,
      communication: 0,
      overallExperience: 0
    },
    
    // Text feedback
    likedMost: '',
    improvements: '',
    wouldRecommend: '',
    
    // Acknowledgements
    customerConfirmation: false,
    projectManager: '',
    installerNames: ''
  });

  const [errors, setErrors] = useState({});

  const ratingLabels = {
    installationBehavior: 'Installation Personnel Behavior & Professionalism',
    punctuality: 'Punctuality & Timeliness of Installation',
    cleanliness: 'Cleanliness & Post-Installation Cleanup',
    installationQuality: 'Quality of Installation (Alignment, Finishing, Stability)',
    productQuality: 'Product Quality (Materials, Look & Feel, Functionality)',
    deliveryExperience: 'Delivery Experience (Timeliness, Packaging Condition, Handling)',
    communication: 'Communication & Support from Modula Team',
    overallExperience: 'Overall Experience with Modula'
  };

  // Check if user can submit feedback
  useEffect(() => {
    const checkFeedbackStatus = async () => {
      try {
        setCheckingStatus(true);
        const response = await feedbackAPI.checkFeedbackStatus();
        setCanSubmit(response.data.canSubmit);
        
        if (!response.data.canSubmit) {
          addToast('You have already submitted feedback for this project', 'info');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking feedback status:', error);
        addToast('Unable to verify feedback status. Please try again.', 'error');
        navigate('/dashboard');
      } finally {
        setCheckingStatus(false);
      }
    };

    if (authState.user) {
      checkFeedbackStatus();
      // Pre-fill user data
      setFormData(prev => ({
        ...prev,
        customerName: authState.user.firstName + ' ' + authState.user.lastName,
        contactNumber: authState.user.phone,
        // Add other user data if available from dashboard context
      }));
    }
  }, [authState.user, navigate, addToast]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRatingChange = (ratingType, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [ratingType]: value
      }
    }));
    
    // Clear error
    if (errors[`ratings.${ratingType}`]) {
      setErrors(prev => ({ ...prev, [`ratings.${ratingType}`]: '' }));
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

    // Ratings validation
    Object.keys(ratingLabels).forEach(key => {
      if (!formData.ratings[key] || formData.ratings[key] < 1 || formData.ratings[key] > 4) {
        newErrors[`ratings.${key}`] = 'This rating is required';
      }
    });

    // Text feedback validation
    if (!formData.likedMost.trim()) {
      newErrors.likedMost = 'Please share what you liked most';
    } else if (formData.likedMost.trim().length < 10) {
      newErrors.likedMost = 'Please provide more detailed feedback (minimum 10 characters)';
    }

    if (!formData.improvements.trim()) {
      newErrors.improvements = 'Please share improvement suggestions';
    } else if (formData.improvements.trim().length < 5) {
      newErrors.improvements = 'Please provide more detailed feedback (minimum 5 characters)';
    }

    if (!['Yes', 'No', 'Maybe'].includes(formData.wouldRecommend)) {
      newErrors.wouldRecommend = 'Please select if you would recommend Modula';
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
      addToast('Please fix the errors below', 'error');
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await feedbackAPI.submitFeedback(formData);
      
      addToast('Feedback submitted successfully!', 'success');
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
      setSubmitting(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!canSubmit) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#AF7C71] rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
          Feedback Already Submitted
        </h3>
        <p className="text-[#6B4B41] font-nunito">
          You have already submitted feedback for this project.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              error={errors.customerName}
              required
              readOnly
              className="bg-[#F1E6DD]"
            />
            
            <Input
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              error={errors.projectName}
              placeholder="Enter project name"
              required
            />
            
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              error={errors.location}
              placeholder="Enter location"
              required
            />
            
            <DatePicker
              label="Handover Date"
              name="handoverDate"
              value={formData.handoverDate}
              onChange={(e) => handleInputChange('handoverDate', e.target.value)}
              error={errors.handoverDate}
              required
            />
            
            <div className="md:col-span-2">
              <Input
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                error={errors.contactNumber}
                required
                readOnly
                className="bg-[#F1E6DD]"
                maxLength={10}
              />
            </div>
          </div>
        </div>

        {/* Feedback Ratings Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
            Feedback for Product & Service
          </h3>
          <p className="text-sm text-[#6B4B41] mb-6 font-nunito">
            Please rate the following aspects on a scale of 1 to 4, with 4 being Exceptional and 1 being Very Bad.
          </p>
          
          {Object.keys(ratingLabels).map((key) => (
            <RatingInput
              key={key}
              label={ratingLabels[key]}
              name={key}
              value={formData.ratings[key]}
              onChange={handleRatingChange}
              error={errors[`ratings.${key}`]}
              required
            />
          ))}
        </div>

        {/* Additional Feedback Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
            Additional Feedback
          </h3>
          
          <div className="space-y-6">
            <TextArea
              label="What did you like the most about your Modula kitchen?"
              value={formData.likedMost}
              onChange={(e) => handleInputChange('likedMost', e.target.value)}
              error={errors.likedMost}
              placeholder="Share what you loved most about your experience..."
              required
              maxLength={1000}
              showCharCount
              rows={4}
            />
            
            <TextArea
              label="Is there anything we could improve?"
              value={formData.improvements}
              onChange={(e) => handleInputChange('improvements', e.target.value)}
              error={errors.improvements}
              placeholder="Help us improve by sharing your suggestions..."
              required
              maxLength={1000}
              showCharCount
              rows={4}
            />
            
            <RadioGroup
              label="Would you recommend Modula to others?"
              name="wouldRecommend"
              options={['Yes', 'No', 'Maybe']}
              value={formData.wouldRecommend}
              onChange={(value) => handleInputChange('wouldRecommend', value)}
              error={errors.wouldRecommend}
              required
            />
          </div>
        </div>

        {/* Installation Team Acknowledgement Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
            Installation Team Acknowledgement
          </h3>
          
          <div className="space-y-6">
            <Checkbox
              label="I confirm that the kitchen has been installed to my satisfaction, and I have inspected all the components."
              checked={formData.customerConfirmation}
              onChange={(checked) => handleInputChange('customerConfirmation', checked)}
              error={errors.customerConfirmation}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Project Manager/Supervisor"
                value={formData.projectManager}
                onChange={(e) => handleInputChange('projectManager', e.target.value)}
                error={errors.projectManager}
                placeholder="Enter project manager name"
                required
              />
              
              <Input
                label="Installer Names"
                value={formData.installerNames}
                onChange={(e) => handleInputChange('installerNames', e.target.value)}
                error={errors.installerNames}
                placeholder="Enter installer names"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            loading={submitting}
            disabled={submitting}
            className="px-8 py-3"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
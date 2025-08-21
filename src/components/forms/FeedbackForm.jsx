// // client/src/components/forms/FeedbackForm.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import RatingInput from './RatingInput';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import { useToast } from '../../context/ToastContext';
// import { validateFeedbackForm } from '../../services/utils/validation';
// import { feedbackAPI } from '../../services/api/feedback';
// import { UserIcon, BuildingStorefrontIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

// const FeedbackForm = () => {
//   const navigate = useNavigate();
//   const { addToast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     customerName: '',
//     orderId: '',
//     location: '',
//     handOverDate: '',
//     ratings: {
//       behavior: null,
//       punctuality: null,
//       cleanliness: null,
//       quality: null,
//       product: null,
//       delivery: null,
//       communication: null
//     },
//     likedMost: '',
//     improvement: '',
//     recommend: '',
//     projectManager: '',
//     installerNames: '',
//     confirmation: false
//   });
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const inputValue = type === 'checkbox' ? checked : value;
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: inputValue
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleRatingChange = (ratingName, value) => {
//     setFormData(prev => ({
//       ...prev,
//       ratings: {
//         ...prev.ratings,
//         [ratingName]: value
//       }
//     }));
    
//     // Clear rating errors
//     if (errors[`ratings.${ratingName}`]) {
//       setErrors(prev => ({ ...prev, [`ratings.${ratingName}`]: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validation = validateFeedbackForm(formData);
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       addToast('Please fill all required fields correctly', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       await feedbackAPI.submitFeedback(formData);
//       addToast('Feedback submitted successfully!', 'success');
//       navigate('/customer/feedback_submitted');
//     } catch (error) {
//       addToast(error.response?.data?.message || 'Failed to submit feedback', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-8">
//       <div className="bg-white rounded-lg shadow-sm p-8">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-primary-500 mb-2 font-montserrat">Feedback Form</h1>
//         <p className="text-primary-300 mb-8 font-nunito">Referral reward of up to ₹5,000 INR</p>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Basic Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input
//               label="Customer Name"
//               name="customerName"
//               icon={UserIcon}
//               value={formData.customerName}
//               onChange={handleInputChange}
//               error={errors.customerName}
//               placeholder="Customer Name"
//               required
//             />
//             <Input
//               label="Order ID"
//               name="orderId"
//               icon={BuildingStorefrontIcon}
//               value={formData.orderId}
//               onChange={handleInputChange}
//               error={errors.orderId}
//               placeholder="Order Number"
//               required
//             />
//             <Input
//               label="Location"
//               name="location"
//               icon={MapPinIcon}
//               value={formData.location}
//               onChange={handleInputChange}
//               error={errors.location}
//               placeholder="Location"
//               required
//             />
//             <Input
//               label="Hand Over Date"
//               name="handOverDate"
//               type="date"
//               icon={CalendarIcon}
//               value={formData.handOverDate}
//               onChange={handleInputChange}
//               error={errors.handOverDate}
//               required
//             />
//           </div>

//           {/* Rating Section */}
//           <div className="space-y-6">
//             <p className="text-primary-500 mb-6 font-nunito">
//               Please rate the following aspects on a scale of 1 to 4, with 1 = POOR and 4 = EXCEPTIONAL
//             </p>
            
//             <RatingInput
//               label="Installation Personnel Behavior & Professionalism"
//               name="behavior"
//               value={formData.ratings.behavior}
//               onChange={handleRatingChange}
//               error={errors['ratings.behavior']}
//               required
//             />
            
//             <RatingInput
//               label="Punctuality & Timeliness of Installation"
//               name="punctuality"
//               value={formData.ratings.punctuality}
//               onChange={handleRatingChange}
//               error={errors['ratings.punctuality']}
//               required
//             />
            
//             <RatingInput
//               label="Cleanliness & Post-Installation Cleanup"
//               name="cleanliness"
//               value={formData.ratings.cleanliness}
//               onChange={handleRatingChange}
//               error={errors['ratings.cleanliness']}
//               required
//             />
            
//             <RatingInput
//               label="Quality of Installation (Alignment, Finishing, Stability)"
//               name="quality"
//               value={formData.ratings.quality}
//               onChange={handleRatingChange}
//               error={errors['ratings.quality']}
//               required
//             />
            
//             <RatingInput
//               label="Product Quality (Materials, Look & Feel, Functionality)"
//               name="product"
//               value={formData.ratings.product}
//               onChange={handleRatingChange}
//               error={errors['ratings.product']}
//               required
//             />
            
//             <RatingInput
//               label="Delivery Experience (Timeliness, Packaging Condition, Handling)"
//               name="delivery"
//               value={formData.ratings.delivery}
//               onChange={handleRatingChange}
//               error={errors['ratings.delivery']}
//               required
//             />
            
//             <RatingInput
//               label="Communication & Support"
//               name="communication"
//               value={formData.ratings.communication}
//               onChange={handleRatingChange}
//               error={errors['ratings.communication']}
//               required
//             />
//           </div>

//           {/* Text Feedback */}
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-primary-500 mb-2 font-montserrat">
//                 What did you like most about your kitchen?
//               </label>
//               <textarea
//                 name="likedMost"
//                 rows="4"
//                 placeholder="Share what you loved about your new kitchen..."
//                 className="w-full px-4 py-3 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent resize-none font-nunito"
//                 value={formData.likedMost}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-primary-500 mb-2 font-montserrat">
//                 What could we improve?
//               </label>
//               <textarea
//                 name="improvement"
//                 rows="4"
//                 placeholder="Let us know how we can serve you better..."
//                 className="w-full px-4 py-3 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent resize-none font-nunito"
//                 value={formData.improvement}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-primary-500 mb-2 font-montserrat">
//                 Would you recommend Modula? (Yes/No)
//               </label>
//               <select
//                 name="recommend"
//                 className="w-full px-4 py-3 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent font-nunito"
//                 value={formData.recommend}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select an option</option>
//                 <option value="yes">Yes, absolutely!</option>
//                 <option value="no">No, not really</option>
//                 <option value="maybe">Maybe, with improvements</option>
//               </select>
//             </div>
//           </div>

//           {/* Additional Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input
//               label="Project Manager/Supervisor"
//               name="projectManager"
//               value={formData.projectManager}
//               onChange={handleInputChange}
//               placeholder="Project Manager Name"
//             />
//             <Input
//               label="Installer Name(s)"
//               name="installerNames"
//               value={formData.installerNames}
//               onChange={handleInputChange}
//               placeholder="Installer Names"
//             />
//           </div>

//           {/* Confirmation Checkbox */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="confirmation"
//               name="confirmation"
//               className="mt-1 h-4 w-4 text-primary-200 border-gray-300 rounded focus:ring-primary-200"
//               checked={formData.confirmation}
//               onChange={handleInputChange}
//             />
//             <label htmlFor="confirmation" className="text-primary-500 font-nunito">
//               I confirm the kitchen has been installed to my satisfaction and I acknowledge the completion of the project.
//             </label>
//           </div>
//           {errors.confirmation && (
//             <p className="text-sm text-red-500 font-nunito">{errors.confirmation}</p>
//           )}

//           {/* Submit Button */}
//           <div className="text-center">
//             <Button
//               type="submit"
//               size="lg"
//               loading={loading}
//               className="px-8"
//             >
//               Submit Feedback
//             </Button>
//             <p className="text-primary-300 text-sm mt-4 font-nunito">
//               Thank you for choosing Modula. Your feedback helps us improve our services.
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeedbackForm;
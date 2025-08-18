// // client/src/components/maintenance/MaintenanceForm.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useToast } from '../../context/ToastContext';
// import { maintenanceAPI } from '../../services/api/maintenance';

// // UI Components
// import Input from '../ui/Input';
// import DatePicker from '../ui/DatePicker';
// import Checkbox from '../ui/Checkbox';
// import Button from '../ui/Button';
// import Card from '../ui/Card';

// const MaintenanceForm = () => {
//   const navigate = useNavigate();
//   const { state: authState } = useAuth();
//   const { addToast } = useToast();
  
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     // Basic Information (auto-filled from dashboard/auth)
//     customerName: '',
//     projectName: '',
//     contactNumber: '',
//     requestDate: new Date().toISOString().split('T')[0],
    
//     // Service requests (checkboxes)
//     services: {
//       fixDrawerAlignment: false,
//       channelHingeServicing: false,
//       replaceDamagedHardware: false,
//       fixLooseHinges: false,
//       kitchenDeepClean: false,
//       addCoatingShutters: false,
//       fixApplianceIssues: false,
//       addKitchenAccessories: false,
//       upgradeShutters: false,
//       remodelKitchen: false,
//       addMoreUnits: false,
//       upgradeAppliances: false,
//       repairMinorDamages: false,
//       fixUnderCabinetLighting: false,
//       changeHoodFilter: false,
//       other: ''
//     }
//   });

//   const [errors, setErrors] = useState({});

//   const serviceOptions = [
//     { key: 'fixDrawerAlignment', label: 'Fix Drawer / Shutter Alignment' },
//     { key: 'channelHingeServicing', label: 'Channel and Hinge Servicing' },
//     { key: 'replaceDamagedHardware', label: 'Replace Damaged Hardware' },
//     { key: 'fixLooseHinges', label: 'Fix Loose Hinges / Screws / Handles' },
//     { key: 'kitchenDeepClean', label: 'Kitchen Deep Clean' },
//     { key: 'addCoatingShutters', label: 'Add Coating on Shutters (Teflon / Ceramic)' },
//     { key: 'fixApplianceIssues', label: 'Fix Appliance Issues' },
//     { key: 'addKitchenAccessories', label: 'Add Kitchen Accessories (e.g. Corner Unit)' },
//     { key: 'upgradeShutters', label: 'Upgrade Shutters' },
//     { key: 'remodelKitchen', label: 'Remodel/Renovate my Kitchen' },
//     { key: 'addMoreUnits', label: 'Add More Units (LC / UC)' },
//     { key: 'upgradeAppliances', label: 'Upgrade Appliances' },
//     { key: 'repairMinorDamages', label: 'Repair Minor Damages (Peel-off / Scratches)' },
//     { key: 'fixUnderCabinetLighting', label: 'Fix Under-Cabinet Lighting' },
//     { key: 'changeHoodFilter', label: 'Change Hood Filter' }
//   ];

//   // Pre-fill user data on component mount
//   useEffect(() => {
//     if (authState.user) {
//       setFormData(prev => ({
//         ...prev,
//         customerName: authState.user.firstName + ' ' + authState.user.lastName,
//         contactNumber: authState.user.phone,
//         // Add other user data if available from dashboard context
//       }));
//     }
//   }, [authState.user]);

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

//   const handleServiceChange = (serviceKey, checked) => {
//     setFormData(prev => ({
//       ...prev,
//       services: {
//         ...prev.services,
//         [serviceKey]: checked
//       }
//     }));
    
//     // Clear services error if any service is selected
//     if (errors.services) {
//       setErrors(prev => ({ ...prev, services: '' }));
//     }
//   };

//   const handleOtherServiceChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       services: {
//         ...prev.services,
//         other: value
//       }
//     }));
    
//     // Clear services error
//     if (errors.services) {
//       setErrors(prev => ({ ...prev, services: '' }));
//     }
//   };

//   const getSelectedServices = () => {
//     const selected = [];
    
//     // Standard services
//     serviceOptions.forEach(service => {
//       if (formData.services[service.key]) {
//         selected.push(service.label);
//       }
//     });
    
//     // Other service
//     if (formData.services.other?.trim()) {
//       selected.push(`Other: ${formData.services.other}`);
//     }
    
//     return selected;
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
//     if (!formData.contactNumber.trim()) {
//       newErrors.contactNumber = 'Contact number is required';
//     }
//     if (!formData.requestDate) {
//       newErrors.requestDate = 'Request date is required';
//     }

//     // Check if at least one service is selected
//     const hasSelectedService = serviceOptions.some(service => 
//       formData.services[service.key]
//     ) || formData.services.other?.trim();

//     if (!hasSelectedService) {
//       newErrors.services = 'At least one service must be selected';
//     }

//     // Validate other service description if provided
//     if (formData.services.other?.trim() && formData.services.other.trim().length < 5) {
//       newErrors.otherService = 'Other service description must be at least 5 characters';
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
//       const response = await maintenanceAPI.submitRequest(formData);
      
//       addToast('Maintenance request submitted successfully!', 'success');
//       navigate('/dashboard/request_submitted', {
//         state: { 
//           referenceId: response.data.referenceId,
//           submittedAt: response.data.submittedAt,
//           selectedServices: getSelectedServices()
//         }
//       });
//     } catch (error) {
//       console.error('Error submitting maintenance request:', error);
//       addToast(error.message || 'Failed to submit request. Please try again.', 'error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const selectedServices = getSelectedServices();

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
//               label="Contact Number"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={(e) => handleInputChange('contactNumber', e.target.value)}
//               error={errors.contactNumber}
//               required
//               readOnly
//               className="bg-[#F1E6DD]"
//               maxLength={10}
//             />
            
//             <DatePicker
//               label="Request Date"
//               name="requestDate"
//               value={formData.requestDate}
//               onChange={(e) => handleInputChange('requestDate', e.target.value)}
//               error={errors.requestDate}
//               required
//               min={new Date().toISOString().split('T')[0]}
//             />
//           </div>
//         </div>

//         {/* Service Requests Section */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-6 border-b border-[#D7C5AA] pb-2">
//             Service Requests
//           </h3>
//           <p className="text-sm text-[#6B4B41] mb-6 font-nunito">
//             Select all services that you need:
//           </p>
          
//           {errors.services && (
//             <p className="text-sm text-red-500 font-nunito mb-4">{errors.services}</p>
//           )}
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {serviceOptions.map((service) => (
//               <div key={service.key} className="p-3 rounded-lg hover:bg-[#F1E6DD] transition-colors">
//                 <Checkbox
//                   label={service.label}
//                   checked={formData.services[service.key]}
//                   onChange={(checked) => handleServiceChange(service.key, checked)}
//                 />
//               </div>
//             ))}
            
//             {/* Other Option */}
//             <div className="md:col-span-2 p-3 rounded-lg hover:bg-[#F1E6DD] transition-colors">
//               <div className="space-y-3">
//                 <Checkbox
//                   label="Other:"
//                   checked={formData.services.other !== ''}
//                   onChange={(checked) => {
//                     if (!checked) {
//                       handleOtherServiceChange('');
//                     }
//                   }}
//                 />
//                 {(formData.services.other !== '' || errors.otherService) && (
//                   <Input
//                     placeholder="Please specify your request..."
//                     value={formData.services.other}
//                     onChange={(e) => handleOtherServiceChange(e.target.value)}
//                     error={errors.otherService}
//                     maxLength={500}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Selected Services Summary */}
//         {selectedServices.length > 0 && (
//           <Card className="bg-[#F1E6DD]">
//             <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-4">
//               Selected Services Summary
//             </h3>
//             <div className="space-y-2">
//               {selectedServices.map((service, index) => (
//                 <div key={index} className="flex items-center text-sm text-[#3A1A1A] font-nunito">
//                   <span className="text-[#AF7C71] mr-2">✓</span>
//                   {service}
//                 </div>
//               ))}
//             </div>
//           </Card>
//         )}

//         {/* Submit Button */}
//         <div className="flex justify-center pt-6">
//           <Button
//             type="submit"
//             loading={submitting}
//             disabled={submitting || selectedServices.length === 0}
//             className="px-8 py-3"
//           >
//             {submitting ? 'Submitting...' : 'Submit Request'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MaintenanceForm;
// // client/src/components/forms/RequestMaintenanceForm.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CheckboxGrid from './CheckboxGrid';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import { useToast } from '../../context/ToastContext';
// import { validateMaintenanceForm } from '../../services/utils/validation';
// import { maintenanceAPI } from '../../services/api/maintenance';
// import { UserIcon, PhoneIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

// const RequestMaintenanceForm = () => {
//   const navigate = useNavigate();
//   const { addToast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     customerName: '',
//     phoneNumber: '',
//     preferredDate: '',
//     location: '',
//     selectedServices: [],
//     customService: '',
//     additionalDetails: ''
//   });
//   const [errors, setErrors] = useState({});

//   // Service options with your exact Figma design
//   const serviceOptions = {
//     left: [
//       { value: 'fix_drawer_alignment', label: 'Fix Drawer / Shutter Alignment', description: 'Adjust misaligned doors and drawers' },
//       { value: 'channel_hinge_servicing', label: 'Channel and Hinge Servicing', description: 'Lubricate and adjust hinges' },
//       { value: 'replace_damaged_hardware', label: 'Replace Damaged Hardware', description: 'Replace broken handles, knobs, etc.' },
//       { value: 'fix_loose_hinges', label: 'Fix Loose Hinges / Screws / Handles', description: 'Tighten loose components' },
//       { value: 'kitchen_deep_clean', label: 'Kitchen Deep Clean', description: 'Professional deep cleaning service' },
//       { value: 'add_coating_shutters', label: 'Add Coating on Shutters (Teflon / Ceramic)', description: 'Protective coating application' },
//       { value: 'fix_appliance_issues', label: 'Fix Appliance Issues', description: 'Repair built-in appliances' },
//       { value: 'add_kitchen_accessories', label: 'Add Kitchen Accessories (e.g. Corner Unit)', description: 'Corner units, organizers, etc.' }
//     ],
//     right: [
//       { value: 'upgrade_shutters', label: 'Upgrade Shutters', description: 'Replace with premium materials' },
//       { value: 'remodel_kitchen', label: 'Remodel/Renovate my Kitchen', description: 'Complete kitchen makeover' },
//       { value: 'add_more_units', label: 'Add More Units (LC / UC)', description: 'Expand storage capacity' },
//       { value: 'upgrade_appliances', label: 'Upgrade Appliances', description: 'Install new appliances' },
//       { value: 'repair_minor_damages', label: 'Repair Minor Damages (Peel-off / Scratches)', description: 'Fix surface damages' },
//       { value: 'fix_under_cabinet_lighting', label: 'Fix Under-Cabinet Lighting', description: 'Repair or replace LED strips' },
//       { value: 'change_hood_filter', label: 'Change Hood Filter', description: 'Replace chimney filters' }
//     ]
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     // Special handling for phone number - only allow digits
//     if (name === 'phoneNumber') {
//       const digitsOnly = value.replace(/\D/g, '');
//       if (digitsOnly.length <= 10) {
//         setFormData(prev => ({ ...prev, [name]: digitsOnly }));
//       }
//       return;
//     }
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleServicesChange = (selectedServices) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedServices
//     }));
    
//     // Clear error when user selects services
//     if (errors.selectedServices) {
//       setErrors(prev => ({ ...prev, selectedServices: '' }));
//     }
//   };

//   const handleCustomServiceChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       customService: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validation = validateMaintenanceForm(formData);
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       addToast('Please fill all required fields correctly', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       await maintenanceAPI.submitRequest(formData);
//       addToast('Maintenance request submitted successfully!', 'success');
//       navigate('/customer/request_submitted');
//     } catch (error) {
//       addToast(error.response?.data?.message || 'Failed to submit request', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8">
//       <div className="bg-white rounded-lg shadow-sm p-8">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-primary-500 mb-2 font-montserrat">
//           Requests, Maintenance & Upgrades
//         </h1>
//         <p className="text-primary-300 mb-8 font-nunito">
//           Please click appropriate request below
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Customer Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input
//               label="Customer Name"
//               name="customerName"
//               icon={UserIcon}
//               value={formData.customerName}
//               onChange={handleInputChange}
//               error={errors.customerName}
//               placeholder="Enter your name"
//               required
//             />
//             <Input
//               label="Phone Number"
//               name="phoneNumber"
//               icon={PhoneIcon}
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               error={errors.phoneNumber}
//               maxLength={10}
//               placeholder="Enter phone number"
//               required
//             />
//             <Input
//               label="Preferred Service Date"
//               name="preferredDate"
//               type="date"
//               icon={CalendarIcon}
//               value={formData.preferredDate}
//               onChange={handleInputChange}
//               error={errors.preferredDate}
//               required
//             />
//             <Input
//               label="Location"
//               name="location"
//               icon={MapPinIcon}
//               value={formData.location}
//               onChange={handleInputChange}
//               error={errors.location}
//               placeholder="Enter location"
//               required
//             />
//           </div>

//           {/* Service Selection */}
//           <div className="space-y-6">
//             <h2 className="text-xl font-bold text-primary-500 font-montserrat">
//               Select Required Services
//             </h2>
//             <p className="text-primary-300 font-nunito">
//               Choose all services that apply to your kitchen needs
//             </p>
            
//             <CheckboxGrid
//               options={serviceOptions}
//               selectedValues={formData.selectedServices}
//               onChange={handleServicesChange}
//               customField={formData.customService}
//               onCustomFieldChange={handleCustomServiceChange}
//               error={errors.selectedServices}
//             />
//           </div>

//           {/* Additional Details */}
//           <div className="space-y-3">
//             <label className="block text-sm font-medium text-primary-500 mb-2 font-montserrat">
//               Describe your requirements in detail
//             </label>
//             <textarea
//               name="additionalDetails"
//               rows="5"
//               placeholder="Please provide more details about your request, any specific issues you're facing, or additional requirements..."
//               className="w-full px-4 py-3 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent resize-none font-nunito"
//               value={formData.additionalDetails}
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <Button
//               type="submit"
//               size="lg"
//               loading={loading}
//               className="px-12"
//             >
//               Submit Service Request
//             </Button>
//             <p className="text-primary-300 text-sm mt-4 font-nunito">
//               Our team will contact you within 24 hours to schedule your service.
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RequestMaintenanceForm;
// // client/src/components/dashboard/DispatchTracker.jsx
// import React from 'react';
// import { StageMapper } from '../../services/tracking/stageMapper';
// import ProgressIndicator from './ProgressIndicator';

// const DispatchTracker = ({ stageId, odooLead }) => {
//   // Only show dispatch tracking for dispatch-related stages
//   if (!StageMapper.shouldShowDispatchTracking(stageId)) {
//     return null;
//   }

//   const currentDispatchStage = StageMapper.getCurrentDispatchStage(stageId);
//   const allDispatchStages = StageMapper.getAllDispatchStages();

//   if (!currentDispatchStage) {
//     return null;
//   }

//   // const getTrackingInfo = () => {
//   //   const orderId = odooLead?.id ? `#${odooLead.id}` : '#123456789';
//   //   const courierFacility = 'XYZ Logistics Facility'; // This could come from Odoo in future
//   //   const estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'); // 2 days from now
    
//   //   return { orderId, courierFacility, estimatedDelivery };
//   // };

//   // const trackingInfo = getTrackingInfo();

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-primary-500">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-primary-500 font-montserrat mb-2">
//             Dispatch Tracking Details
//           </h3>
          
//         </div>
        
//         <div className="text-right">
//           <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
//             currentDispatchStage.currentStage === 3 
//               ? 'bg-primary-500 text-white'
//               : currentDispatchStage.currentStage === 2
//                 ? 'bg-primary-500 text-white'
//                 : 'bg-primary-500 text-white'
//           }`}>
//             {currentDispatchStage.config.name}
//           </div>
//         </div>
//       </div>

//       {/* Current Dispatch Status */}
//       {/* <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg">
//             {currentDispatchStage.config.icon}
//           </div>
//           <div className="flex-1">
//             <h4 className="font-semibold text-orange-700 font-montserrat">
//               {currentDispatchStage.config.name}
//             </h4>
//             <p className="text-sm text-orange-600 font-nunito">
//               {currentDispatchStage.config.description}
//             </p>
//           </div>
//           <div className="text-xs text-orange-500 font-nunito">
//             Stage ID: {stageId}
//           </div>
//         </div>
//       </div> */}

//       {/* Dispatch Progress Indicator */}
//       <ProgressIndicator
//         stages={allDispatchStages}
//         currentStage={currentDispatchStage.currentStage}
//         type="dispatch"
//         className="mb-6"
//       />

//       {/* Dispatch Timeline */}
      

//       {/* Delivery Information */}
      
      
//     </div>
//   );
// };

// export default DispatchTracker;

// client/src/components/dashboard/DispatchTracker.jsx
import React from 'react';
import { StageMapper } from '../../services/tracking/stageMapper';
import ProgressIndicator from './ProgressIndicator';

const DispatchTracker = ({ stageId, odooLead }) => {
  // Only show dispatch tracking for dispatch-related stages
  if (!StageMapper.shouldShowDispatchTracking(stageId)) {
    return null;
  }

  const currentDispatchStage = StageMapper.getCurrentDispatchStage(stageId);
  const allDispatchStages = StageMapper.getAllDispatchStages();

  if (!currentDispatchStage) {
    return null;
  }

  const getTrackingInfo = () => {
    const orderId = odooLead?.id ? `#${odooLead.id}` : '#123456789';
    const courierFacility = 'XYZ Facility'; // This could come from Odoo in future
    
    return { orderId, courierFacility };
  };

  const trackingInfo = getTrackingInfo();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
      {/* Header - Exact Figma Design */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-semibold text-primary-500 font-montserrat">
            Dispatch Tracking Details
          </h3>
        </div>
        
        <div className="text-right">
          {/* <div className="text-lg font-semibold text-primary-500 font-montserrat mb-1">
            Order ID: {trackingInfo.orderId}
          </div> */}
          <div>
              <span className="text-[#6B4B41] font-nunito">Order ID: </span>
              <span className="font-semibold text-[#3A1A1A] font-montserrat">#{odooLead.id}</span>
          </div>
          {/* <div className="text-base text-primary-400 font-nunito">
            Courier Facility: {trackingInfo.courierFacility}
          </div> */}
        </div>
      </div>

      {/* Dispatch Progress Indicator - Figma Style */}
      <div className="mt-8">
        <ProgressIndicator
          stages={allDispatchStages}
          currentStage={currentDispatchStage.currentStage}
          type="dispatch"
          className=""
        />
      </div>
    </div>
  );
};

export default DispatchTracker;
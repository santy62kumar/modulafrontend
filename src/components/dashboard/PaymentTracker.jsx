// client/src/components/dashboard/PaymentTracker.jsx
import React from 'react';
import { StageMapper } from '../../services/tracking/stageMapper';

const PaymentTracker = ({ stageId }) => {
  const currentPaymentStage = StageMapper.getCurrentPaymentStage(stageId);
  const paymentProgress = StageMapper.getPaymentProgress(stageId);
  const allPaymentStages = StageMapper.getAllPaymentStages();

  const getPaymentStatus = (stageNumber) => {
    if (!currentPaymentStage) return 'pending';
    if (stageNumber <= currentPaymentStage.currentStage) return 'completed';
    return 'pending';
  };

  const handleReceiptClick = (stage) => {
    // TODO: Implement receipt download/view functionality
    console.log('Receipt clicked for:', stage.name);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-500 font-montserrat">
          Payment Milestones
        </h3>
        
      </div>

      

      {/* Payment Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allPaymentStages.map((stage) => {
          const status = getPaymentStatus(stage.stageNumber);
          const isCurrent = currentPaymentStage?.currentStage === stage.stageNumber;
          
          return (
            <div 
              key={stage.stageNumber}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                status === 'completed' 
                  ? 'border-primary-500 bg-white-50' 
                  : isCurrent
                    ? 'border-primary-200 bg-primary-50'
                    : 'border-primary-500 bg-white-50'
              }`}
            >
              {/* Payment Icon */}
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-md border-2 border-primary-500 flex items-center justify-center text-lg font-bold ${
                  status === 'completed'
                    ? 'bg-primary-500 text-white'
                    : isCurrent
                         ? 'bg-white text-primary-500'
                          : 'bg-white text-primary-500'
                }`}>
                  {status === 'completed' ? '✓' : ''}
                </div>

                
                <div className="flex-1">
                  <h4 className={`text-sm font-semibold font-montserrat ${
                    status === 'completed' 
                      ? 'text-primary-700' 
                      : isCurrent
                        ? 'text-primary-500'
                        : 'text-primary-500'
                  }`}>
                    {stage.name}
                  </h4>
                </div>

                
              </div>

              

              {/* Receipt Button */}
              {/* {stage.receiptAvailable && status === 'completed' && (
                <button
                  onClick={() => handleReceiptClick(stage)}
                  className="w-full text-xs bg-primary-100 text-primary-500 py-2 px-3 rounded hover:bg-primary-200 transition-colors duration-200 font-nunito"
                >
                  View Receipt
                </button>
              )} */}

              {/* Pending State */}
              {status === 'pending' && (
                <div className="w-full text-xs bg-primary-100 text-primary-500 py-2 px-3 rounded text-center font-nunito">
                  Pending
                </div>
              )}

              {/* Current Stage Indicator */}
              {isCurrent && status !== 'completed' && (
                <div className="w-full text-xs bg-primary-500 text-white py-2 px-3 rounded text-center font-nunito">
                  Processing
                </div>
              )}
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default PaymentTracker;
// client/src/services/tracking/stageMapper.js
export const STAGE_MAPPINGS = {
  // 5 Project Tracking Stages
  PROJECT_STAGES: {
    1: { // Booking Confirmed
      stageIds: [7, 8],
      name: 'Booking Confirmed',
      description: 'Your order has been confirmed',
      icon: '✓',
      color: 'bg-green-500'
    },
    2: { // In Production
      stageIds: [17, 18, 25, 19, 9],
      name: 'In Production',
      description: 'Your kitchen is being manufactured',
      icon: '🏭',
      color: 'bg-blue-500'
    },
    3: { // Dispatched
      stageIds: [24, 20, 21],
      name: 'Dispatched',
      description: 'Your order is on the way',
      icon: '🚚',
      color: 'bg-orange-500'
    },
    4: { // Installed
      stageIds: [10, 22],
      name: 'Installed',
      description: 'Installation completed',
      icon: '🔧',
      color: 'bg-purple-500'
    },
    5: { // Order Completed
      stageIds: [11, 12, 26, 27],
      name: 'Order Complete',
      description: 'Project successfully completed',
      icon: '🎉',
      color: 'bg-primary-500'
    }
  },

  // 3 Payment Milestones
  PAYMENT_STAGES: {
    1: { // Booking Fees
      stageIds: [4],
      name: 'Booking Amount Received',
      description: 'Initial booking payment',
      amount: null,
      receiptAvailable: true
    },
    2: { // First Installment
      stageIds: [7, 8, 17, 18, 25, 19],
      name: 'First Installment Received',
      description: 'Production milestone payment',
      amount: null,
      receiptAvailable: true
    },
    3: { // Second Installment
      stageIds: [9, 24, 20, 21, 10, 22, 11, 12, 26, 27],
      name: 'Second Installment Received',
      description: 'Final payment completed',
      amount: null,
      receiptAvailable: true
    }
  },

  // 3 Dispatch Sub-stages
  DISPATCH_STAGES: {
    1: { // Ready for Dispatch
      stageIds: [24],
      name: 'Ready for Dispatch',
      description: 'Order prepared for shipping',
      icon: '📦'
    },
    2: { // Order Dispatched
      stageIds: [20],
      name: 'Dispatched',
      description: 'Order shipped from facility',
      icon: '🚛'
    },
    3: { // Reached Location
      stageIds: [21],
      name: 'Reached Location',
      description: 'Order delivered to your location',
      icon: '📍'
    }
  }
};

// Hidden stages that show placeholder
export const HIDDEN_STAGES = [1, 2, 23, 13, 3, 14, 5, 6, 15, 16, 28];

// Stage flow order for fallback detection
export const STAGE_FLOW_ORDER = [
  4, 7, 8, 17, 18, 25, 19, // BEFORE STAGE 9
  9,                        // INSTALLATION SCHEDULING TRIGGER
  24, 20, 21, 10,
  22,                      // FEEDBACK TRIGGER
  11, 12, 26, 27           // FINAL STAGES
];

export class StageMapper {
  static getCurrentProjectStage(stageId) {
    for (const [stageNum, config] of Object.entries(STAGE_MAPPINGS.PROJECT_STAGES)) {
      if (config.stageIds.includes(stageId)) {
        return {
          currentStage: parseInt(stageNum),
          config,
          stageId
        };
      }
    }
    return null;
  }

  static getCurrentPaymentStage(stageId) {
    for (const [stageNum, config] of Object.entries(STAGE_MAPPINGS.PAYMENT_STAGES)) {
      if (config.stageIds.includes(stageId)) {
        return {
          currentStage: parseInt(stageNum),
          config,
          stageId
        };
      }
    }
    return null;
  }

  static getCurrentDispatchStage(stageId) {
    // Only show dispatch tracking for dispatch-related stages
    if (![24, 20, 21].includes(stageId)) {
      return null;
    }

    for (const [stageNum, config] of Object.entries(STAGE_MAPPINGS.DISPATCH_STAGES)) {
      if (config.stageIds.includes(stageId)) {
        return {
          currentStage: parseInt(stageNum),
          config,
          stageId
        };
      }
    }
    return null;
  }

  static isStageVisible(stageId) {
    return !HIDDEN_STAGES.includes(stageId);
  }

  static getProjectProgress(stageId) {
    const currentStage = this.getCurrentProjectStage(stageId);
    if (!currentStage) return { completed: 0, total: 5, percentage: 0 };

    const completed = currentStage.currentStage;
    const total = Object.keys(STAGE_MAPPINGS.PROJECT_STAGES).length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
  }

  static getPaymentProgress(stageId) {
    const currentStage = this.getCurrentPaymentStage(stageId);
    if (!currentStage) return { completed: 0, total: 3, percentage: 0 };

    const completed = currentStage.currentStage;
    const total = Object.keys(STAGE_MAPPINGS.PAYMENT_STAGES).length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
  }

  static shouldShowDispatchTracking(stageId) {
    return [24, 20, 21].includes(stageId);
  }

  static shouldTriggerFeedback(stageId) {
    return stageId === 22;
  }

  static getAllProjectStages() {
    return Object.entries(STAGE_MAPPINGS.PROJECT_STAGES).map(([num, config]) => ({
      stageNumber: parseInt(num),
      ...config
    }));
  }

  static getAllPaymentStages() {
    return Object.entries(STAGE_MAPPINGS.PAYMENT_STAGES).map(([num, config]) => ({
      stageNumber: parseInt(num),
      ...config
    }));
  }

  static getAllDispatchStages() {
    return Object.entries(STAGE_MAPPINGS.DISPATCH_STAGES).map(([num, config]) => ({
      stageNumber: parseInt(num),
      ...config
    }));
  }
}
// client/src/hooks/useTracking.js
import { useState, useEffect } from 'react';
import { authAPI } from '../services/api/auth';
import { useToast } from '../context/ToastContext';

export const useTracking = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const fetchTrackingData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.getTracking();
      setTrackingData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch tracking data';
      setError(errorMessage);
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const refreshTracking = () => {
    fetchTrackingData();
  };

  useEffect(() => {
    fetchTrackingData();
  }, []);

  return {
    trackingData,
    loading,
    error,
    refreshTracking,
    hasProject: trackingData?.odooLead != null,
    isStageVisible: trackingData?.stageVisible || false,
    currentStageId: trackingData?.currentStageId
  };
};

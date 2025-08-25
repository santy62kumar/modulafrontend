// client/src/hooks/useFirebaseImages.js
import { useState, useEffect } from 'react';
import firebaseStorageService from '../services/firebase/storage';

/**
 * Custom hook to manage Firebase Storage images
 * @param {boolean} preload - Whether to preload all images on mount
 * @returns {object} - Image management utilities
 */
export const useFirebaseImages = (preload = false) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Preload all images
  const preloadImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const allImages = await firebaseStorageService.preloadImages();
      setImages(allImages);
    } catch (err) {
      setError(err);
      console.error('Error preloading images:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get specific image URL
  const getImageUrl = async (imagePath) => {
    try {
      return await firebaseStorageService.getImageUrl(imagePath);
    } catch (err) {
      console.error('Error getting image URL:', err);
      return null;
    }
  };

  // Get service image URL
  const getServiceImageUrl = async (serviceName) => {
    try {
      return await firebaseStorageService.getServiceImageUrl(serviceName);
    } catch (err) {
      console.error('Error getting service image URL:', err);
      return null;
    }
  };

  // Preload images on mount if requested
  useEffect(() => {
    if (preload) {
      preloadImages();
    }
  }, [preload]);

  return {
    images,
    loading,
    error,
    preloadImages,
    getImageUrl,
    getServiceImageUrl,
    clearCache: firebaseStorageService.clearCache
  };
};
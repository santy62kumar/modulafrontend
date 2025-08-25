// client/src/services/firebase/storage.js
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from './config';

class FirebaseStorageService {
  constructor() {
    this.imageCache = new Map();
  }

  /**
   * Get download URL for a specific image
   * @param {string} imagePath - Path to the image in Firebase Storage (e.g., 'Modula image/image1.png')
   * @returns {Promise<string>} - Download URL
   */
  async getImageUrl(imagePath) {
    try {
      // Check cache first
      if (this.imageCache.has(imagePath)) {
        return this.imageCache.get(imagePath);
      }

      const imageRef = ref(storage, imagePath);
      const url = await getDownloadURL(imageRef);
      
      // Cache the URL
      this.imageCache.set(imagePath, url);
      
      return url;
    } catch (error) {
      console.error(`Error getting image URL for ${imagePath}:`, error);
      // Return fallback image or placeholder
      return '/kitchens.jpg'; // Your current fallback
    }
  }

  /**
   * Get all images from a folder
   * @param {string} folderPath - Path to the folder in Firebase Storage
   * @returns {Promise<Array>} - Array of {name, url} objects
   */
  async getImagesFromFolder(folderPath = 'Modula image') {
    try {
      const folderRef = ref(storage, folderPath);
      const result = await listAll(folderRef);
      
      const imagePromises = result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          path: itemRef.fullPath,
          url: url
        };
      });

      const images = await Promise.all(imagePromises);
      
      // Cache all images
      images.forEach(image => {
        this.imageCache.set(image.path, image.url);
      });
      
      return images;
    } catch (error) {
      console.error(`Error getting images from folder ${folderPath}:`, error);
      return [];
    }
  }

  /**
   * Map service names to their corresponding Firebase image names
   * You can customize this mapping based on your service names and image names
   */
  getImageMapping() {
    return {
      'Kitchen Deep Clean': 'image1.png',
      'AMC (Annual Maintenance Contract)': 'image3.jpg',
      'Channel and Hinge Servicing': 'image4.jpg',
      'Hob Services': 'image5.jpg',
      // Add more mappings as needed
    };
  }

  /**
   * Get image URL for a service based on service name
   * @param {string} serviceName - Name of the service
   * @returns {Promise<string>} - Download URL
   */
  async getServiceImageUrl(serviceName) {
    const imageMapping = this.getImageMapping();
    const imageName = imageMapping[serviceName];
    
    if (!imageName) {
      console.warn(`No image mapping found for service: ${serviceName}`);
      return '/kitchens.jpg'; // Fallback
    }
    
    const imagePath = `Modula image/${imageName}`;
    return await this.getImageUrl(imagePath);
  }

  /**
   * Clear image cache
   */
  clearCache() {
    this.imageCache.clear();
  }

  /**
   * Preload all images from Firebase Storage
   * Call this method early in your app to cache all images
   */
  async preloadImages() {
    try {
      const images = await this.getImagesFromFolder('Modula image');
      console.log(`Preloaded ${images.length} images from Firebase Storage`);
      return images;
    } catch (error) {
      console.error('Error preloading images:', error);
      return [];
    }
  }
}

// Export singleton instance
export default new FirebaseStorageService();
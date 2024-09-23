
import { useMemo } from 'react';
import { useResources } from './useContext';

export const RESOURCE_TYPES = {
  FONT: 'fonts',
  IMAGE: 'images',
  VIDEO: 'videos',
};
/**
 * 
 * @param {string} resourceName - resource name includes...
 * @param {string} resourceType - resource type（'image', 'video', 'font'）
 * @returns {string | null} - URL or null
 */
const useResourceByName = (resourceName, resourceType) => {
  const { resources } = useResources();

  return useMemo(() => {
    if (!resources) return null;
    switch (resourceType) {
      case 'images':
        return resources.images.find((src) => src.includes(resourceName));
      case 'videos':
        return resources.videos.find((src) => src.includes(resourceName));
      case 'fonts':
        return resources.fonts.find((font) => font.family.includes(resourceName))?.url;
      default:
        return null;
    }
  }, [resources, resourceName, resourceType]);
};

export default useResourceByName;

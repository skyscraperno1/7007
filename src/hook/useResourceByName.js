
import { useMemo } from 'react';
import { useResources } from './useContext';
import { _resources } from './useLoading';

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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      switch (resourceType) {
      case 'images':
        return _resources.images.find((src) => src.includes(resourceName));
      case 'videos':
        return _resources.videos.find((src) => src.includes(resourceName));
      default:
        return null;
    }
    } else {
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
    }
  }, [resources, resourceName, resourceType]);
};

export default useResourceByName;

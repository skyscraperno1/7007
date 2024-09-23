import { useContext } from 'react';
import { ResourcesContext } from './ResourcesProvider';
import { MobileContext } from './MobileProvider'

export const useResources = () => {
  return useContext(ResourcesContext);
};

export const useIsMobile = () => {
  return useContext(MobileContext)
}

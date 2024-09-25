import { useContext } from 'react';
import { ResourcesContext } from './ResourcesProvider';

export const useResources = () => {
  return useContext(ResourcesContext);
};

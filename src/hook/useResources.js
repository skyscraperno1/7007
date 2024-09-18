import { useContext } from 'react';
import { ResourcesContext } from './ResourcesProvider';

const useResources = () => {
  return useContext(ResourcesContext);
};

export default useResources;

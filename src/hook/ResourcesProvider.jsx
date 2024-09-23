import { createContext, useMemo } from 'react';
import useLoading from './useLoading';

const ResourcesContext = createContext();

const ResourcesProvider = ({ children }) => {
  const { isLoading, resources, progress } = useLoading();

  const value = useMemo(() => ({ isLoading, resources, progress }), [isLoading, resources, progress]);

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
};

export default ResourcesProvider;
export { ResourcesContext }; 

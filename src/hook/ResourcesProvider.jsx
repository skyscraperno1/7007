import { createContext, useMemo } from 'react';
import useLoading from './useLoading';

const ResourcesContext = createContext();

const ResourcesProvider = ({ children }) => {
  const { isLoading, resources } = useLoading();

  const value = useMemo(() => ({ isLoading, resources }), [isLoading, resources]);

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
};

export default ResourcesProvider;
export { ResourcesContext }; 

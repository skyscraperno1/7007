import { createContext, useMemo } from 'react';
import useLoading from './useLoading';

const ResourcesContext = createContext();

const ResourcesProvider = ({ children }) => {
  const isMobile = useMemo(() => {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }, []);
  
  const { isLoading, resources, progress } = useLoading(isMobile);

  const value = useMemo(() => ({ isLoading, resources, progress, isMobile }), [isLoading, resources, progress, isMobile]);

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
};

export default ResourcesProvider;
export { ResourcesContext }; 

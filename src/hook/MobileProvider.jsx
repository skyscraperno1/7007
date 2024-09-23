import { createContext, useMemo } from 'react';

const MobileContext = createContext();

const MobileProvider = ({ children }) => {
  const isMobile = useMemo(() => {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  )
}

export default MobileProvider;
export { MobileContext }
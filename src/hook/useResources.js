import { useContext } from 'react';
import { ResourcesContext } from './ResourcesProvider'; // 这里导入 ResourcesContext

const useResources = () => {
  return useContext(ResourcesContext);
};

export default useResources;

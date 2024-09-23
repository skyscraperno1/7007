import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { init } from './useMatter'
import useResourceByName, { RESOURCE_TYPES } from '../../../hook/useResourceByName';
const MatterCanvas = forwardRef(({ colorIndex }, ref) => {
  
  const matter = useRef(null)
  const canvasRef = useRef(null);
  const circle_black = useResourceByName('circle_black.png', RESOURCE_TYPES.IMAGE);
  const circle_white = useResourceByName('circle_white.png', RESOURCE_TYPES.IMAGE);
  const eth_sm = useResourceByName('eth_sm.png', RESOURCE_TYPES.IMAGE);
  const eth_sm_gray = useResourceByName('eth_sm_gray.png', RESOURCE_TYPES.IMAGE);
  const [changeCount, setChangeCount] = useState(0);
  useEffect(() => {
    setChangeCount(prevCount => prevCount + 1);
  }, [colorIndex]);
  useEffect(() => {
    if (changeCount > 0 && changeCount % 2 === 0) {
      if (matter.current, eth_sm, eth_sm_gray) {
        matter.current.handleTextureTransition(eth_sm, eth_sm_gray);
      }
      setChangeCount(0);
    }
  }, [changeCount, matter, eth_sm, eth_sm_gray]);
  useImperativeHandle(ref, () => ({
    addBox: () => {
      if (matter.current) {
        matter.current.addCircle(circle_black, circle_white, eth_sm)
      }
    },
  }));

  useEffect(() => {
    matter.current = init(canvasRef.current)
  }, [])
 
  return (
    <div
      ref={canvasRef}
      className="h-full w-full absolute bottom-0 right-0 z-20 bg-transparent"
    />
  );
});

MatterCanvas.displayName = 'MatterCanvas';

export default MatterCanvas;

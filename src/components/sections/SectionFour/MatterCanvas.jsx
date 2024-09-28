import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { init } from './useMatter'
import useResourceByName, { RESOURCE_TYPES } from '../../../hook/useResourceByName';
const MatterCanvas = forwardRef(({ isMobile }, ref) => {
  
  const matter = useRef(null)
  const canvasRef = useRef(null);
  const circle_black = useResourceByName('circle_black.png', RESOURCE_TYPES.IMAGE);
  const circle_white = useResourceByName('circle_white.png', RESOURCE_TYPES.IMAGE);
  const eth_sm = useResourceByName('eth_sm.png', RESOURCE_TYPES.IMAGE);

  useImperativeHandle(ref, () => ({
    addBox: () => {
      if (matter.current) {
        matter.current.addItem(circle_black, circle_white, eth_sm)
      }
    },
    removeBox: () => {
      if (matter.current) {
        matter.current.clearItem()
      }
    }
  }));

  useEffect(() => {
    matter.current = init(canvasRef.current, isMobile)
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

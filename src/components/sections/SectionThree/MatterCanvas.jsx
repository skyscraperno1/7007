import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { init } from './useMatter'
import ImgA from '/Section4/Img1.png'
import ImgB from '/Section4/Img2.png'
const MatterCanvas = forwardRef((_, ref) => {
  const matter = useRef(null)
  const canvasRef = useRef(null);

  
  useImperativeHandle(ref, () => ({
    addBox: () => {
      if (matter.current) {
        matter.current.addImg(ImgA, ImgB)
      }
    }
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

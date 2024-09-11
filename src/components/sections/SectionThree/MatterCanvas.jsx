import { useState, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { init } from './useMatter'
import Img from '/Section3/ShapeRight.png'
const colors = ['#03D25C', '#FEED01', '#FF0501'];
const MatterCanvas = forwardRef(({show}, ref) => {
  const [colorIndex, setColorIndex] = useState(0);
  const [interval, defineInterval] = useState(null);
  const matter = useRef(null)
  const canvasRef = useRef(null);

  
  useImperativeHandle(ref, () => ({
    bgChange: () => {
      if (interval) return;
      let _interval = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      }, 1000);
      defineInterval(_interval);
    },
    addBox: () => {
      if (matter.current) {
        // matter.current.addPolygon()
        matter.current.addImg(Img)
      }
      // const box = Matter.Bodies.rectangle(Math.random() * window.innerWidth, -50, 50, 50);
      // console.log(box)
      // Matter.Composite.add(engine.current.world, box);
    }
  }));

  useEffect(() => {
    matter.current = init(canvasRef.current)
  }, [])

  useEffect(() => {
    if (!show && interval) {
      clearInterval(interval);
    }
  }, [show, interval]);
  return (
    <div
      ref={canvasRef}
      className="h-full absolute bottom-0 right-0 -z-10"
      style={{ backgroundColor: colors[colorIndex], width: 'calc(100% - 60px)' }}
    />
  );
});

MatterCanvas.displayName = 'MatterCanvas';

export default MatterCanvas;

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";



export default function ScrollBar({ children, baseVelocity = 100, isMobile }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

 
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

   
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const verticalSideDiv = Array.from({ length: 8 }, (v, k) => (
    <div className={isMobile ? "" : "vertical-side-div"} key={k}>
      {children}
    </div>
  ));

  const mainStyle = isMobile 
  ? { width: '100%', borderBottomWidth: '4px', height: '49px', marginTop: '74px'}
  : { width: '65px', borderRightWidth: '4px', height: '100%' }
  
  return (
    <div className="fixed top-0 left-0 z-[999] bg-white overflow-hidden leading-[0.8] flex flex-nowrap m-0 whitespace-nowrap select-none border-black" style={mainStyle}>
      <motion.div 
        className="w-full text-bold uppercase text-3xl flex items-center justify-center whitespace-nowrap flex-col" style={
        !isMobile ? { y: x,  flexDirection: 'column' } : { x, flexDirection: 'row' }}>
        {verticalSideDiv}
      </motion.div>
    </div>
  );
}
import { useRef } from 'react'
import { ReactLenis } from "lenis/dist/lenis-react";
import { motion, useScroll, useTransform } from "framer-motion";
const FixSectionTwo = ({children}) => {
  const { scrollY } = useScroll();
  
  const screenW = window.innerWidth
  const screenH = window.innerHeight
  const top = useTransform(scrollY, 
    [screenW, screenW + screenH * 3],
    [0, screenH * 3],
  )
  
  return (
    <>
    <div className="w-full h-full relative top-0" >
      <ReactLenis root options={{ lerp: 0.05 }}>
          <div className='relative w-full h-[200vh]'>
            <motion.div
              className='absolute top-0 h-[90vh] w-full flex items-center justify-center'
              style={{
                top
              }}
            >
              {children}
            </motion.div>
          </div>
      </ReactLenis>
    </div>
   </>
  );
};

export default FixSectionTwo
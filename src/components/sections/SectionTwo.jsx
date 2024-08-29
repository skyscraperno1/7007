import { useRef, useEffect } from 'react'
import { SmoothScrollHero } from './SectionTwo/ScrollTwo'
const SectionTwo = () => {
  const ref = useRef(null)
  
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  
  return (
    <>
    <div ref={ref} className="w-full h-full relative top-0 bg-stone-500" >
      <SmoothScrollHero />
    </div>
   </>
  );
};

export default SectionTwo
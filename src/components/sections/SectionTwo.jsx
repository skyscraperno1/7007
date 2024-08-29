import { useRef, useEffect } from 'react'
import FixSectionTwo from './SectionTwo/FixSectionTwo';
import Cover from '/Cover.png'
import { motion, useScroll, useTransform } from "framer-motion";
import { SmoothScrollHero } from './SectionTwo/Source'

const SectionTwo = () => {
  const { scrollY } = useScroll();
  return (
    <>
    <div className="w-full h-full relative top-0" >
      <SmoothScrollHero />
      {/* <FixSectionTwo >
        
      </FixSectionTwo> */}
    </div>
   </>
  );
};

export default SectionTwo
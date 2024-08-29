import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from "@gsap/react";
import { useRef } from 'react'
import ParallaxText from '../core/ScrollBar'
const SectionTwo = () => {
  const ref = useRef(null)
  gsap.registerPlugin(useGSAP, ScrollTrigger)

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.value,
      start: `${windowWidth} top`,
      end: `${windowHeight * 2 + windowWidth} top`,
      pin: true,
      markers: true
    })
  }, [])
  return (
    <>
    <div id="section-two" ref={ref} className=" w-full h-full absolute top-0 bg-pink-500" >
      <ParallaxText baseVelocity={-3}>Ultimate AIGC Exchange&nbsp;</ParallaxText>
    </div>
   </>
  );
};

export default SectionTwo
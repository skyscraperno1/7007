import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
const MotionPartner = ({ page, title,  }) => {
  const ref = useRef(null)
  const bounceTransition = {
    duration: 4,
    repeat: Infinity,
    ease: 'linear',
    repeatType: 'loop' 
}
const animation = {
  x: [0, page === 1 ? window.innerWidth - 210 : 0, 0],
} 
useEffect(() => {
  const rect = ref.current.getBoundingClientRect()
  const parentRect  = document.getElementById('bounce-box').getBoundingClientRect()
  const position =  {
    x: rect.left - parentRect.left, // 子元素相对于父元素的横向偏移
    y: rect.top - parentRect.top  // 子元素相对于父元素的纵向偏移
  };
  console.log(position, page);
  
}, [])
  return (
    <motion.div 
    ref={ref}
    className="flex flex-col items-center justify-between select-none"
      transition={bounceTransition}
      animate={animation}
    >
      <div className="bg-no-repeat bg-center h-[200px] w-[210px] flex items-center justify-center" style={{
        backgroundImage: `url(/Section4/Frames/Frame${page}.png)`
      }}><img className="" src={`/Section4/Partners/Partner${page}.png`} />
      </div>
      <div className="uppercase text-[31px]">{title}</div>
    </motion.div>
  )
}

export default MotionPartner
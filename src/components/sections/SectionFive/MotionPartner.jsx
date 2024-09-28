import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getDelay, getOffset, getTransition, makeAnimationArr, getRandomInt } from './getAnimation'
import useResourceByName, { RESOURCE_TYPES } from '../../../hook/useResourceByName'
import { cn } from '../../../lib/utils'

const generateImagePairs = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    frame: useResourceByName(`Frame${i + 1}.png`, RESOURCE_TYPES.IMAGE),
    partner: useResourceByName(`Partner${i + 1}.png`, RESOURCE_TYPES.IMAGE),
  }));
};
const MotionPartner = ({ page, title, show, isMobile }) => {
  const images = generateImagePairs(8)
  const ref = useRef(null)
  const [animation, setAnimation] = useState({
    x: 0,
    y: 0,
  })
  const [transition, setTransition] = useState({
    x: {
      duration: 0,
      repeat: Infinity,
      repeatType: 'loop',
      times: [],
      ease: 'linear',
      delay: 0
    },
    y: {
      duration: 7,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'loop',
      times: [],
      delay: 0
    },
  })

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect()
    const parentRect = document.getElementById('bounce-box').getBoundingClientRect()
    const { offsetX, offsetY } = getOffset(page)
    const offset = {
      x: Math.abs(rect[offsetX] - parentRect[offsetX]),
      y: Math.abs(rect[offsetY] - parentRect[offsetY])
    }
    const position = {
      x: parentRect.width - offset.x - rect.width,
      y: parentRect.height - offset.y - rect.height
    };
    const xArr = offsetX === 'left' 
    ? [-offset.x, position.x]
    : [offset.x, -position.x]
    const yArr = offsetY === 'top' 
    ? [-offset.y, position.y]
    : [offset.y, -position.y]
    setAnimation({
      x: makeAnimationArr(xArr),
      y: makeAnimationArr(yArr)
    })
    const speedX = isMobile ? 300 + getRandomInt(0, 100) : 400 + getRandomInt(0, 200)
    const speedY = isMobile ? 260 + getRandomInt(0, 100) : 360 + getRandomInt(0, 200)
    
    const transX = getTransition(speedX, xArr)
    const transY = getTransition(speedY, yArr)
    setTransition({
      x: {
        ...transition.x,
        duration: transX.duration,
        times: transX.times,
        delay: getDelay(page)
      },
      y: {
        ...transition.y,
        duration: transY.duration,
        times: transY.times,
        delay: getDelay(page)
      }
    })
  }, [page])

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col items-center justify-between select-none")}
      transition={show ? transition: {}}
      animate={show ? animation : { x: 0, y: 0}}
    >
      <div className={cn("bg-no-repeat bg-center h-[150px] w-[157.5px] 2xl:h-[200px] 2xl:w-[210px] flex items-center justify-center bg-contain", {"h-[100px] w-[105px]": isMobile})} style={{
        backgroundImage: `url(${images[page -1].frame})`
      }}><img className={cn('scale-75 2xl:scale-100', {'scale-50': isMobile})} src={`${images[page -1].partner}`} />
      </div>
      <div className="uppercase text-lg 2xl:text-2xl">{title}</div>
    </motion.div>
  )
}

export default MotionPartner
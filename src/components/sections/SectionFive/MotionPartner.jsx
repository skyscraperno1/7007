import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getDelay, getOffset, getTransition, makeAnimationArr, getRandomInt } from './getAnimation'
import useResourceByName, { RESOURCE_TYPES } from '../../../hook/useResourceByName'

const generateImagePairs = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    frame: useResourceByName(`Frame${i + 1}.png`, RESOURCE_TYPES.IMAGE),
    partner: useResourceByName(`Partner${i + 1}.png`, RESOURCE_TYPES.IMAGE),
  }));
};
const MotionPartner = ({ page, title, show }) => {
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
    const parentRect = document.getElementById('section-five').getBoundingClientRect()
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
    const speedX = 400 + getRandomInt(0, 200)
    const speedY = 360 + getRandomInt(0, 200)
    
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
      className="flex flex-col items-center justify-between select-none"
      transition={show ? transition: {}}
      animate={show ? animation : { x: 0, y: 0}}
    >
      <div className="bg-no-repeat bg-center h-[200px] w-[210px] flex items-center justify-center" style={{
        backgroundImage: `url(${images[page -1].frame})`
      }}><img className="" src={`${images[page -1].partner}`} />
      </div>
      <div className="uppercase text-lg 2xl:text-2xl">{title}</div>
    </motion.div>
  )
}

export default MotionPartner
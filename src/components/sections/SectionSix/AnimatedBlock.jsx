import { cn } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'

const AnimatedBlock = ({ bgColor, width = '100%', height = '100%', direction, title, num, children, isMobile = false}) => {
  const [hover, setHover] = useState(false);
  const [initial, setInitial] = useState({ x: 0, y: 0, opacity: 1 })
  const [borderWidth, setBorderWidth] = useState(5)
  useEffect(() => {
    if (isMobile) {
      setBorderWidth(3)
    } else {
      if (window.innerWidth < 1537) {
        setBorderWidth(4)
      } else {
        setBorderWidth(5)
      }
    }
  }, [isMobile])
  useEffect(() => {
    switch (direction) {
      case 'left':
        setInitial({...initial, x: borderWidth })
        break;
      case 'down':
        setInitial({...initial, y: -borderWidth })
        break;
      case 'rightDown':
        setInitial({...initial, x: -borderWidth, y: -borderWidth })
        break;
      default:
        break;
    }
  }, [direction, borderWidth])
  const [variants, setVariants] = useState({
    initial: initial,
    left: { x: -20 + borderWidth, opacity: 0.9 },
    rightUp: { y: -20, opacity: 0.9 },
    down: { y: 20 - borderWidth, opacity: 0.9 },
    rightDown: { x: 20 - borderWidth, y: 20 - borderWidth, opacity: 0.9 },
  });
  useEffect(() => {
    const trans = isMobile ? 10 : 20
    setVariants({
      initial: initial,
      left: { x: -trans + borderWidth, opacity: 0.9 },
      rightUp: { y: -trans, opacity: 0.9 },
      down: { y: trans - borderWidth, opacity: 0.9 },
      rightDown: { x: trans - borderWidth, y: trans - borderWidth, opacity: 0.9 },
    })

  }, [borderWidth, initial, isMobile])
 
  const handleHover = (e) => {
    if (isMobile) return;
    if (e.target === e.currentTarget || e.target.classList.contains('inner-title')) {
      setHover(true)
    } else {
      setHover(false)
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHover(false)
  };

  const makeTransition = () => {
    if (isMobile) {
      return { duration: 2, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
    } else {
      return { duration: 0.25, ease: 'linear' }
    }
  }
 
  return (
    <motion.div
      className={cn("box flex justify-center items-center relative m-pointer border-black", bgColor)}
      onMouseMove={handleHover}
      onMouseLeave={handleMouseLeave}
      variants={variants}
      animate={hover || isMobile ? direction : "initial"}
      transition={makeTransition()}
      style={{ width, height, borderWidth }}
    >
      <div
        className="text-center m-pointer"
      >
        <h5 className={cn("inner-title text-2xl 2xl:text-3xl",{'text-xs': isMobile})}>{title}</h5>
        <h4 className={cn("inner-title text-5xl 2xl:text-7xl",{'text-xl': isMobile})}>{num}</h4>
          {children}
      </div>
    </motion.div>
  );
};
export default AnimatedBlock
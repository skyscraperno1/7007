import { cn } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const getInitial = (direction) => {
  switch (direction) {
    case 'left':
      return {
        x: 3
      };
    case 'down':
      return {
        y: -3
      };
    case 'rightDown':
      return {
        x: -3,
        y: -3
      };
    default:
      return {};
  }
};

const getAnimate = (direction) => {
  switch (direction) {
    case 'left':
      return {
        x: -7
      };
    case 'down':
      return {
        y: 7
      };
    case 'rightDown':
      return {
        x: 7,
        y: 7
      };
    case 'rightUp':
      return {
        y: -10
      }
    default:
      return {};
  }
}

const makeTransition = (isMobile) => {
  if (isMobile) {
    return { duration: 1, ease: 'linear', repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5, delay: 0 };
  } else {
    return { duration: 0.25, ease: 'linear' };
  }
};

const AnimatedBlock = ({ bgColor, width = '100%', height = '100%', direction, title, num, children, isMobile = false, update = null }) => {
  const [hover, setHover] = useState(false);
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [borderWidth, setBorderWidth] = useState(5);

  useEffect(() => {
    if (isMobile) {
      setBorderWidth(3);
    } else {
      if (window.innerWidth < 1537) {
        setBorderWidth(4);
      } else {
        setBorderWidth(5);
      }
    }
  }, [isMobile]);

  // Update the initial position based on direction and borderWidth
  useEffect(() => {
    switch (direction) {
      case 'left':
        setInitial({ x: borderWidth, y: 0 });
        break;
      case 'down':
        setInitial({ x: 0, y: -borderWidth });
        break;
      case 'rightDown':
        setInitial({ x: -borderWidth, y: -borderWidth });
        break;
      default:
        setInitial({ x: 0, y: 0 });
        break;
    }
  }, [direction, borderWidth]);

  const makeVariants = () => {
    const trans = isMobile ? 10 : 20;
    return {
      initial: initial,
      left: { x: -trans + borderWidth },
      rightUp: { y: -trans },
      down: { y: trans - borderWidth },
      rightDown: { x: trans - borderWidth, y: trans - borderWidth },
    };
  };

  const handleHover = (e) => {
    if (isMobile) return;
    if (e.target === e.currentTarget || e.target.classList.contains('inner-title')) {
      setHover(true);
    } else {
      setHover(false);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHover(false);
  };



  const handleUpdate = (latest) => {
    if (update) {
      update(latest.y);
    }
  };
 
  return <>
      {isMobile ? (<motion.div
        className={cn("box flex justify-center items-center relative m-pointer border-black", bgColor)}
        initial={getInitial(direction)}
        animate={getAnimate(direction)}
        style={{ width, height, borderWidth }}
        transition={makeTransition(isMobile)}
      >
        <div className="text-center m-pointer">
        <h5 className={cn("inner-title text-2xl 2xl:text-3xl", {'text-xs': isMobile})}>{title}</h5>
        <h4 className={cn("inner-title text-5xl 2xl:text-7xl", {'text-xl': isMobile})}>{num}</h4>
        {children}
      </div>
      </motion.div>) : (
      <motion.div
      className={cn("box flex justify-center items-center relative m-pointer border-black", bgColor)}
      onMouseMove={handleHover}
      onMouseLeave={handleMouseLeave}
      variants={makeVariants()}
      animate={hover ? direction : "initial"} 
      transition={makeTransition(isMobile)}
      onUpdate={handleUpdate}
      style={{ width, height, borderWidth }}
    >
      <div className="text-center m-pointer">
        <h5 className={cn("inner-title text-2xl 2xl:text-3xl", {'text-xs': isMobile})}>{title}</h5>
        <h4 className={cn("inner-title text-5xl 2xl:text-7xl", {'text-xl': isMobile})}>{num}</h4>
        {children}
      </div>
    </motion.div>
    )}
  </>

};

export default AnimatedBlock;
import { cn } from "../../../lib/utils";
import { useState } from "react";
import { motion } from 'framer-motion'

const AnimatedBlock = ({ bgColor, width = '100%', height = '100%', direction, title, num, children }) => {
  const [hover, setHover] = useState(false);
  const variants = {
    initial: { x: 0, y: 0, opacity: 1 },
    left: { x: -20, opacity: 0.9 },
    rightUp: { y: -20, opacity: 0.9 },
    down: { y: 20, opacity: 0.9 },
    rightDown: { x: 20, y: 20, opacity: 0.9 },
  };
  const handleHover = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('inner-title')) {
      setHover(true)
    } else {
      setHover(false)
    }
  };

  const handleMouseLeave = () => {
    setHover(false)
  };

  return (
    <motion.div
      className={cn("box flex justify-center items-center relative m-pointer", bgColor)}
      onMouseMove={handleHover}
      onMouseLeave={handleMouseLeave}
      variants={variants}
      animate={hover ? direction : "initial"}
      transition={{ duration: 0.25, ease: 'linear' }}
      style={{ width, height }}
    >
      <div
        className="text-center m-pointer"
      >
        <h5 className="inner-title text-2xl 2xl:text-3xl">{title}</h5>
        <h4 className="inner-title text-5xl 2xl:text-7xl">{num}</h4>
          {children}
      </div>
    </motion.div>
  );
};
export default AnimatedBlock
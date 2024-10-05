import { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils'

const ButtonWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border: 3px solid #000000;
  box-shadow: -4px 4px 0px #000000;

  @media(min-width: 1537px) {
    box-shadow: -6px 6px 0px #000000;
    border: 4px solid #000000;
  }

  span {
    position: relative;
    z-index: 1;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: -0.04em;
  }
`;

const HoverBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 0;
  will-change: 'transform'
`;

function Button({ children, duration = 0.4, kls, onClick = () => {}, isMobile, isAnimating = null}) {
  const isText = useMemo(() => typeof children === 'string' , [children])
  const whileInteractive = isMobile ? { whileTap: "hover" } : { whileHover: "hover" };
  const _duration = isMobile ? 0.15 : duration;
  return (
    <ButtonWrapper
      initial="rest"
      animate="rest"
      {...whileInteractive}
      onClick={onClick}
      className={cn("h-12 2xl:h-16 flex items-center justify-center uppercase m-pointer text-nowrap bg-themeYellow text-2xl", 
        kls
      )}
    >
      {
        !!duration && 
        <HoverBackground
         variants={{
           rest: { x: '-100%' },
           hover: { x: 0 },
         }}
         transition={{ duration: _duration, ease: 'easeInOut' }}
       />
      }
      {isText ? <span className='select-none'>{children}</span> : children}
    </ButtonWrapper>
  );
}

export default Button;

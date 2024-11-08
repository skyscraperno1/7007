import { useState, useRef, useEffect } from "react";
import BoldTitle from '../../core/BoldTitle'
import Button from "../../core/Button";
import { motion } from 'framer-motion'
import AnimatedBlock from "./AnimatedBlock"
import usePosition from "./useAnimations";
import { makeCoverAnimation, makeBtnAnimation, BoxContainer } from './useConfig'
const ColorBlock = ({ isScrolling }) => {
  const btnRef = useRef(null);
  const wrapperRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    if (isScrolling) {
      setIsHovering(false)
    }
  }, [isScrolling])
  const { translate, inset } = usePosition(btnRef, 'section-six');

  const getRight = () => {
    if (btnRef.current) {
      return `calc(15% - ${btnRef.current.clientWidth / 2}px)`
    } else {
      return '60px'
    }
  }
  const getTop = () => {
    if (wrapperRef.current) {
      return `calc(${wrapperRef.current.getBoundingClientRect().top}px - 10vh - ${btnRef.current.clientHeight / 2}px + ${btnY}px)`
    }
    return `60px`
  }

  const [btnY, setBtnY] = useState(0);
  const updateBtn = (y) => {
    if (isHovering) return;
    setBtnY(y)
  }
  const [isAnimating, setIsAnimating] = useState(false)
  const handleClick = () => {
    if (!isHovering || isAnimating) return;
    setIsHovering(false)
    window.open('https://app.uniswap.org/swap?outputcurrency=0x77a4b0bfe5c7257f67a1de1b99aa7e157035b1b2&chain=ethereum&utm_source=dexscreener&utm_medium=app')
  }

  const handleMouseEnter = () => {
    if (isHovering) return;
    sessionStorage.setItem('last_pop', 'true')
    setIsHovering(true)
  }

  return (
    <>
 
      <motion.div
        className="z-40 select-none fixed bottom-0 right-0 bg-themeYellow"
        variants={makeCoverAnimation(inset)}
        animate={isHovering ? 'visible' : 'hidden'}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{
          height: '90%',
          width: 'calc(100vw - 65px)',
          opacity: 0,
        }}
      />

      <BoxContainer className="h-full grid select-none" ref={wrapperRef}>
        <motion.div
          ref={btnRef}
          onMouseEnter={handleMouseEnter}
          variants={makeBtnAnimation(translate.x, translate.y)}
          animate={isHovering ? "hover" : "shake"}
          className="z-50 m-pointer absolute"
          style={{
            right: getRight(),
            top: getTop(),
            width: 'fit-content'
          }}
        >
          <Button kls="px-8 py-5 bg-themeGreen" onClick={handleClick} duration={0.4}>
            Buy $7007
          </Button>
        </motion.div>
        <AnimatedBlock bgColor="bg-themeGreen" direction="left" title='ƒ(A.I.)ℝ launch' num='70.07%' height='calc(100% - 5px)'>
          <div className="absolute top-[-50px] left-[-50px] -rotate-[13deg]">
            <BoldTitle content='$7007' color="#FEED01" />
          </div>
          <div className='flex justify-start flex-col items-start absolute bottom-[-24px] left-[-50px]'>
            <BoldTitle content='Total supply:' size='small' color="#FF0501" italic />
            <BoldTitle content='112,001,800' size='small' color="#FF0501" italic />
          </div>
        </AnimatedBlock>
        <div className="right h-full grid">
          <AnimatedBlock bgColor="bg-themeRed" direction="rightUp" title='Ecosystem reward' num='13.93%' update={updateBtn}/>
          <div className="right-bottom grid">
            <AnimatedBlock bgColor="bg-themeYellow" direction="down" title='LP' num='10%' />
            <AnimatedBlock bgColor="bg-themeGreen" width="calc(100% + 44px)" height="calc(100% + 44px)" direction="rightDown" title='Airdrop' num='6%' />
          </div>
        </div>
      </BoxContainer>
    </>
  );
};
export default ColorBlock;

import { useState, useRef } from "react";
import BoldTitle from '../../core/BoldTitle'
import Button from "../../core/Button";
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import AnimatedBlock from "./AnimatedBlock"
import usePosition from "./useAnimations";
import { makeCoverAnimation, makeBtnAnimation, BoxContainer } from './useConfig'
const ColorBlock = () => {
  const btnRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    setIsHovering(false)
  })
  const { translate, inset } = usePosition(btnRef, 'section-six');

  return (
    <>
      <motion.div
        className="z-50 select-none fixed bottom-0 right-0 bg-themeYellow"
        variants={makeCoverAnimation(inset)}
        animate={isHovering ? 'visible' : 'hidden'}
        style={{
          height: '90%',
          width: 'calc(100vw - 65px)',
          opacity: 0,
        }}
      />
      <BoxContainer className="h-full grid select-none">

        <AnimatedBlock bgColor="bg-themeGreen" direction="left" title='ƒ(A.I.)ℝ launch' num='70.07%' height='calc(100% - 5px)'>
          <div className="absolute top-[-50px] left-[-50px] -rotate-[13deg]">
            <BoldTitle content='$7007' color="#FEED01" />
          </div>
          <div className='flex justify-start flex-col items-start absolute bottom-[-24px] left-[-50px]'>
            <BoldTitle content='Total supply:' size='small' color="#FF0501" italic />
            <BoldTitle content='Total allocation from' size='small' color="#FF0501" italic />
            <BoldTitle content='ƒ(A.I.)ℝ launch / 0.7007' size='small' color="#FF0501" italic />
          </div>
        </AnimatedBlock>
        <div className="right h-full grid">
          <AnimatedBlock bgColor="bg-themeRed" direction="rightUp" title='Ecosystem reward' num='13.93%'>
            <motion.div
              ref={btnRef}
              onMouseEnter={() => {
                if (isHovering) return;
                setIsHovering(true)
              }}
              onClick={() => {
                setIsHovering(false)
              }}
              variants={makeBtnAnimation(translate.x, translate.y)}
              animate={isHovering ? "hover" : "shake"}
              className="z-[60] m-pointer absolute top-[-40px] 2xl:top-[-50px] right-[-50px]">
              <Button kls="px-8 py-5 bg-themeGreen" duration={0.2}>
                Buy $7007
              </Button>
            </motion.div>
          </AnimatedBlock>
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

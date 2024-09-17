import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import BoldTitle from '../../core/BoldTitle'
import Button from "../../core/Button";
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import AnimatedBlock from "./AnimatedBlock" 
import { makeBtnAnimation, makeCoverAnimation } from "./makeAnimations";
const BoxContainer = styled.div`
  grid-template-columns: 70% 30%;
  .right {
    grid-template-rows: 65% 35%;
    .right-bottom {
      grid-template-columns: 3fr 2fr;
    }
  }
  &  .box {
    border: 5px solid black;
    @media(max-width: 1537px) { 
      border-width: 4px;
    }
  }
`
const ColorBlock = () => {
  const btnRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    setIsHovering(false)
  })

  const [insetValues, setInsetValues] = useState('inset(0 0 0 0)');
  const [translateBtn, setTranslate] = useState({
    x: 0,
    y: 0
  })
  
  useEffect(() => {
    const boxRect = btnRef.current.getBoundingClientRect();
    const parentRect = document.getElementById('section-six').getBoundingClientRect()
    const topDistance = boxRect.top - parentRect.top;
    const bottomDistance = parentRect.bottom - boxRect.bottom;
    const leftDistance = boxRect.left - parentRect.left;
    const rightDistance = parentRect.right - boxRect.right;
    const x = (parentRect.width - boxRect.width) / 2 - boxRect.left + parentRect.left;
    const y = (parentRect.height - boxRect.height) / 2 - boxRect.top + parentRect.top;
    setTranslate({
      x,
      y
    })
    const inset = `inset(${topDistance}px ${rightDistance}px ${bottomDistance}px ${leftDistance}px)`;
    setInsetValues(inset);
  }, [])
 
  return (
    <BoxContainer className="h-full grid select-none">
      <motion.div
        className="z-50 select-none fixed bottom-0 right-0 bg-themeYellow"
        variants={makeCoverAnimation(insetValues)}
        animate={isHovering ? 'visible' : 'hidden'}
        style={{
          height: '90%',
          width: 'calc(100vw - 65px)',
          opacity: 0,
        }}
      />
      <AnimatedBlock bgColor="bg-themeGreen"  direction="left" title='ƒ(A.I.) ℝ launch' num='70.07%' height='calc(100% - 5px)'> 
        <div className="absolute top-[-50px] left-[-50px] -rotate-[13deg]">
          <BoldTitle content='$TOOT' color="#FEED01"/>
        </div>
        <div className='flex justify-start flex-col items-start absolute bottom-[-24px] left-[-50px]'>
          <BoldTitle content='Total supply:' size='small' color="#FF0501" italic/>
          <BoldTitle content='Total allocation from' size='small' color="#FF0501" italic/>
          <BoldTitle content='ƒ(A.I.) ℝ launch / 0.7007' size='small' color="#FF0501" italic/>
        </div> 
      </AnimatedBlock>
      <div className="right h-full grid">
      <AnimatedBlock bgColor="bg-themeRed"  direction="rightUp" title='Ecosystem reward' num='13.93%'>
        <motion.div 
          ref={btnRef}
          onMouseEnter={() => {
            if(isHovering) return;
            setIsHovering(true)
          }}
          onClick={() => {
            setIsHovering(false)
          }}
          variants={makeBtnAnimation(translateBtn.x, translateBtn.y)}
          animate={isHovering ? "hover" : "shake"}
          className="z-[60] m-pointer absolute top-[-40px] 2xl:top-[-50px] right-[-50px]">
          <Button kls="px-8 py-5 bg-themeGreen" duration={0.8}>
            Buy the token
          </Button>
        </motion.div>
      </AnimatedBlock>
        <div className="right-bottom grid">
          <AnimatedBlock bgColor="bg-themeYellow" direction="down" title='LP' num='10%'/>
          <AnimatedBlock bgColor="bg-themeGreen" width="calc(100% + 44px)" height="calc(100% + 44px)" direction="rightDown" title='Airdrop' num='6%' />
        </div>
      </div>
    </BoxContainer>
  );
};
export default ColorBlock;

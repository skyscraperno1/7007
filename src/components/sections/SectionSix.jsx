import ColorBlock from './SectionSix/ColorBlock'
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName'
import Button from '../core/Button'
import BoldTitle from '../core/BoldTitle'
import { useRef, useState, useMemo } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import usePosition from './SectionSix/useAnimations'
import { makeCoverAnimation, makeBtnAnimation, MobileBoxContainer } from './SectionSix/useConfig'
import AnimatedBlock from './SectionSix/AnimatedBlock'
import { usePhoneCal } from '../../hook/useContext'
const SectionSix = ({ isMobile }) => {
  const btnRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const bg = useResourceByName('$7007.png', RESOURCE_TYPES.IMAGE)
  const { translate, inset } = usePosition(btnRef, 'section-six', isMobile);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    setIsHovering(false)
  })
  const flag = usePhoneCal()
  const calStyle = useMemo(() => {
    if (flag) {
      return {
        height: "calc(100% - 12vh)",
        paddingBottom: "8vh",
        paddingTop:  "0",
      }
    } else {
      return {}
    }
  }, [flag]);

  const [isAnimating, setIsAnimating] = useState(false)
  const handleClick = () => {
    if (isAnimating) return;
    setIsHovering(prev => {
      if (prev) {
        window.open('https://dexscreener.com/ethereum/0x364af9c1d154e6d62c64f37811a7f31961e035f1')
      } else {
        sessionStorage.setItem('last_pop', 'true')
      }
      return !prev
    })
  }

  return (
    <>
      <div id="section-six" className='h-full w-full flex items-center justify-center' style={{ backgroundImage: `url(${bg})` }}>
        {
          isMobile ? (<div className='w-full h-full flex flex-col gap-4 px-8 py-10 justify-between'
            style={calStyle}
          >
            <motion.div
              className="z-20 select-none w-full fixed bottom-0 right-0 bg-themeYellow"
              variants={makeCoverAnimation(inset)}
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              animate={isHovering ? 'visible' : 'hidden'}
              style={{
                height: 'calc(100% - 123px)',
                opacity: 0,
              }}
            />
            <BoldTitle content="Buy $7007 Now" color="#03D25C" size="small" kls='text-start' />
            <div className='w-full h-1/4'>
              <BoldTitle content='$7007' color="#FEED01" kls="rotate-[-20deg] translate-y-12 -translate-x-4" />
            </div>
            <MobileBoxContainer className='w-full h-3/4 grid select-none'>
              <AnimatedBlock bgColor="bg-themeGreen" direction="left" title='ƒ(A.I.)ℝ launch' num='70.07%' height='calc(100% - 3px)' isMobile={isMobile}></AnimatedBlock>
              <div className='right h-full grid'>
                <AnimatedBlock bgColor="bg-themeRed" direction="rightUp" title='Ecosystem reward' num='13.93%' isMobile={isMobile}></AnimatedBlock>
                <div className='right-bottom grid'>
                  <AnimatedBlock bgColor="bg-themeYellow" direction="down" title='LP' num='10%' isMobile={isMobile} />
                  <AnimatedBlock bgColor="bg-themeGreen" width="calc(100% + 14px)" height="calc(100% + 14px)" direction="rightDown" title='Airdrop' num='6%' isMobile={isMobile} />
                </div>
              </div>
            </MobileBoxContainer>
            <div className='flex justify-start flex-col items-start w-full'>
              <BoldTitle content='Total supply:' size='small' color="#FF0501" italic xs={true} />
              <BoldTitle content='112,001,800' size='small' color="#FF0501" italic xs />
            </div>
            <motion.div
              ref={btnRef}
              variants={makeBtnAnimation(translate.x, translate.y, true)}
              animate={isHovering ? "hover" : "shake"}
              className='relative z-30'
            >
              <Button kls="bg-themeGreen h-16" isMobile={true} duration={0.05} onClick={handleClick}>Buy $7007</Button>
            </motion.div>
          </div>) : (
            <div id="color-block" className="w-[70%] h-[70%] 2xl:w-[75%] 2xl:h-[75%]">
              <ColorBlock />
            </div>
          )
        }
      </div>
    </>
  )
}

export default SectionSix;

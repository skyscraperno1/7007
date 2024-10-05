import BoldTitle from '../core/BoldTitle';
import Button from '../core/Button';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import eth from './SectionThree/data-fox-combined.json';
import LottieComponent from './SectionThree/LottieComponent';
import { cn } from '../../lib/utils';
import MatterCanvas from "./SectionFour/MatterCanvas";
import SectionFour from './SectionFour';
import { usePhoneCal } from '../../hook/useContext';
const SectionThree = ({ currentSection, isMobile }) => {
    const ref = useRef(null)

    const handleMouseEnter = () => {
        if (isAnimating || !next) return;
        ref.current.addBox()
    }
    const handleClick = () => {
        if (isAnimating) return;
        if (!next) {
            setNext(true)
        } else {
            if (isMobile) {
                ref.current.addBox();
            } else {
                ref.current.addBox();
                ref.current.addBox();
            }
        }
    }

    const TITLE_VARIANTS = {
        hidden: { opacity: 0, y: -100, display: 'none' },
        visible: { opacity: 1, y: 0,  display: 'block' },
    };

    const isLarge = window.innerWidth > 1537;

    const LEFT_VARIANTS = {
        hidden: { opacity: 0, x: -100, display: 'none', rotate: 200, scale: isLarge ? 1 : 0.65  },
        visible: { opacity: 1, x: 0, display: 'block', rotate: 200, scale: isLarge ? 1 : 0.65  },
    }

    const RIGHT_VARIANTS = {
        hidden: { opacity: 0, x: 100, display: 'none', rotate: -30, scale: isLarge ? 1 : 0.65 },
        visible: { opacity: 1, x: 0, display: 'block', rotate: -30, scale: isLarge ? 1 : 0.65 },
    }

    const BOTTOM_VARIANTS = {
        hidden: { opacity: 0, y: 100, display: 'none', rotate: -30, scale: 0.65 },
        visible: { opacity: 1, y: 0, display: 'block', rotate: -30, scale: 0.65 },
    }
    const flag = usePhoneCal()


    const [inView, setInView] = useState(false);
    const [next, setNext] = useState(false);
    const [afterNext, setAfterNext] = useState(false)

    useEffect(() => {
        if (next) {
            setTimeout(() => setAfterNext(true), 1000)
        }
    }, [next])
    const [isAnimating, setIsAnimating] = useState(false)
    const [lastSection, setLastSection] = useState(0)
    useEffect(() => {
        if (currentSection === 4) {
            setInView(true);
        } else {
            setInView(false);
        }
        if (currentSection === 3 && lastSection === 4) {
            ref.current.removeBox();
        }
        setLastSection(currentSection);
    }, [currentSection]);
    return (
        <div id="section-three" className='relative h-full w-full flex flex-col items-center justify-start pt-[10%] overflow-hidden' >
            { afterNext && <div className='absolute top-0 left-0 w-full h-full'>
                <SectionFour isMobile={isMobile} currentSection={currentSection} afterNext={afterNext} >
                    <MatterCanvas ref={ref} isMobile={isMobile} />
                </SectionFour>
            </div>}
            <motion.div 
                animate={next ? 'hidden' : 'visible'}
                variants={TITLE_VARIANTS}
                transition={{ duration: 1 }}
                onAnimationComplete={() => {
                    setIsAnimating(false); 
                }}
                onAnimationStart={() => { setIsAnimating(true)}}
                className={cn('relative', {'pt-4 z-0': isMobile})}>
                <BoldTitle content='ONE PROMPT COLLECTION!' color="#FF0501" italic kls={cn({'whitespace-normal text-5xl': isMobile})} medium={isMobile}/>
            </motion.div>
            <motion.div className={cn("absolute bottom-28 z-50", {"mt-24": isMobile, "bottom-16": !flag})} animate={{
                rotate: [0, 5, 0, -5, 0],
                transition: { duration: 0.25, repeat: 'Infinity', repeatType: 'loop', ease: 'linear' },
            }}
                onMouseEnter={handleMouseEnter}
            >
                <Button kls={cn("w-80 normal-case h-20 2xl:h-24 text-3xl 2xl:text-4xl uppercase", {'w-60 h-16': isMobile, 'text-white': isAnimating })} duration={isAnimating ? 2 : 0.4} isMobile={isMobile}
                    isActive={isAnimating}
                    onClick={handleClick}
                >
                    { afterNext ? 'trade' : 'mint'}
                </Button>
            </motion.div>
            {
                isMobile ? (
                    <motion.div 
                        animate={next ? 'hidden' : 'visible'}
                        variants={BOTTOM_VARIANTS}
                        transition={{ duration: 1 }}
                        style={{
                            marginTop: '-3rem'
                        }}
                        className='-rotate-[30deg] scale-[65%] select-none'>
                        <LottieComponent play={inView} animationData={eth} />
                    </motion.div>
                ) : (
                    <>
                        <motion.div 
                            animate={next ? 'hidden' : 'visible'}
                            variants={RIGHT_VARIANTS}
                            transition={{ duration: 1 }}
                            className='mt-0 2xl:mt-[3%] -rotate-[30deg] absolute scale-[65%] 2xl:scale-100 right-0 w-[530px] h-[530px]'>
                            <LottieComponent play={inView} animationData={eth} />
                        </motion.div>
                        <motion.div 
                          animate={next ? 'hidden' : 'visible'}
                          variants={LEFT_VARIANTS}
                          transition={{ duration: 1 }}
                          className='absolute mt-[140px] 2xl:mt-[220px] left-0 ml-4 2xl:ml-16 w-[360px] h-[360px]'>
                            <LottieComponent play={inView} delay={2000} animationData={eth} />
                        </motion.div>
                    </>
                )
            }
        </div>
    )
}

export default SectionThree;

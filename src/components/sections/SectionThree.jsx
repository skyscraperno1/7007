import BoldTitle from '../core/BoldTitle';
import AnimationPop from './SectionThree/AnimationPop'
import Button from '../core/Button';
import StarImg from '/Stars/GreenStar.png'
import { useState } from 'react'
import { motion } from 'framer-motion';
import LottieComponent from './SectionThree/LottieComponent';
const SectionThree = () => {
    const [show, setShow] = useState(false)
    const [alertTitle, setAlertTitle] = useState('initial')
    const variants = {
        origin: {
            x: 0,
            y: 0
        },
        translate: {
            x: -100,
            y: 50,
        },
    }
    
    const alertTileVariants = {
        animate: { scale: 1.1, transition: { duration: 0.2, yoyo: 1 } },
        initial: { scale: 1 } 
    };
    
    
    const handleClick = () => {
        window.scrollTo({
            top: window.scrollY + window.innerWidth - 61,
            behavior: 'smooth'
        });
    
    }

    const handleWheel = () => {
        setShow(false)
        window.removeEventListener('wheel', handleWheel)
    }
    const handleClose = () => {
        document.body.style.overflow = ''
        window.addEventListener('wheel', handleWheel)
    }
    return (
        <>
            <div id="section-three" className='relative h-full w-full flex flex-col items-center justify-between pt-[7%] pb-[17%]' >
                <div className='absolute -right-3 -bottom-8 2xl:bottom-1 2xl:right-9 scale-75 2xl:scale-100 select-none w-[530px] h-[530px]'>
                    <LottieComponent />
                </div>
                <motion.div
                    variants={variants}
                    animate={show ? 'translate' : 'origin'}
                    transition={{duration: show ? 2 : 0.1}}
                    className='relative'>
                    <div className='absolute top-[-116px] left-[-131px] 2xl:top-[-102px] 2xl:left-[-137px] scale-75 2xl:scale-100 select-none'>
                        <motion.img src={StarImg} alt="Star" 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <motion.div
                      variants={alertTileVariants} 
                      initial={false} 
                      animate={alertTitle}
                      onAnimationComplete={() => { setAlertTitle('initial')}}
                    >                        
                        <BoldTitle content='ONE PROMPT ONLY!' color="#FF0501" italic />
                    </motion.div>
                </motion.div>
                <div className='w-80 2xl:w-96 relative select-none'>
                    <div className='absolute left-[-30.75rem] 2xl:left-[-41rem] top-2 rotate-90 scale-75 2xl:scale-100 w-[320px] h-[320px]' >
                        <LottieComponent />
                    </div>
                    <Button kls="normal-case h-20 2xl:h-24 text-3xl 2xl:text-4xl" duration={0.8} onClick={() => {handleClick()}}>Mint</Button>
                </div>
                <AnimationPop show={show} canClose={handleClose}/>
            </div>
        </>
    )
}

export default SectionThree;

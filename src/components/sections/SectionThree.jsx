import BoldTitle from '../core/BoldTitle';
import Button from '../core/Button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import eth from './SectionThree/data-fox-combined.json';
import LottieComponent from './SectionThree/LottieComponent';
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName';
import { cn } from '../../lib/utils';
const SectionThree = ({ currentSection, isMobile }) => {
    const StarImg = useResourceByName('GreenStar.png', RESOURCE_TYPES.IMAGE);
    const handleClick = () => {
        if (isMobile) {
            const wrapper = document.getElementById('mobile-scroller')
            const nextSnapPoint = wrapper.scrollHeight - wrapper.scrollTop;
            wrapper.scrollTo({
                top: nextSnapPoint,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: window.innerWidth * 4 - 70,
                behavior: 'smooth'
            });
        }
    }
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (currentSection === 4) {
            setInView(true);
        } else {
            setInView(false);
        }
    }, [currentSection]);
    const startPosition = isMobile ? {
        left: '-88px',
        top: '-112px',
        transform: 'scale(0.45)'
    } : {}
    return (
        <>
            <div id="section-three" className='relative h-full w-full flex flex-col items-center justify-start z-50 pt-[10%] overflow-hidden' >
                <div className={cn('relative', {'pt-4': isMobile})}>
                    <div className='absolute top-[-116px] left-[-131px] 2xl:top-[-102px] 2xl:left-[-137px] scale-75 2xl:scale-100 select-none'
                        style={startPosition}
                    >
                        <motion.img src={StarImg} alt="Star"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <BoldTitle content='ONE PROMPT ONLY!' color="#FF0501" italic kls={cn({'whitespace-normal text-5xl': isMobile})} medium={isMobile}/>
                </div>
                <motion.div className={cn("mt-32", {"mt-24": isMobile})} animate={{
                    rotate: [0, 5, 0, -5, 0],
                    transition: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' },
                }}>
                    <Button kls={cn("w-80 normal-case h-20 2xl:h-24 text-3xl 2xl:text-4xl", {'w-60': isMobile})} duration={0.4} onClick={() => { handleClick() }} isMobile={isMobile}>Mint</Button>
                </motion.div>
                {
                    isMobile ? (
                        <div className='-rotate-[30deg] scale-[65%] -translate-y-16   select-none'>
                            <LottieComponent play={inView} animationData={eth} />
                        </div>
                    ) : (
                        <>
                            <div className='mt-0 2xl:mt-[3%] -rotate-[30deg] absolute scale-[65%] 2xl:scale-100 right-0 w-[530px] h-[530px]'>
                                <LottieComponent play={inView} animationData={eth} />
                            </div>
                            <div className='rotate-[200deg] absolute mt-[140px] 2xl:mt-[220px] scale-[65%] 2xl:scale-100 left-0 ml-4 2xl:ml-16 w-[360px] h-[360px]'>
                                <LottieComponent play={inView} delay={2000} animationData={eth} />
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default SectionThree;

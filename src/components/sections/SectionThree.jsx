import BoldTitle from '../core/BoldTitle';
import Button from '../core/Button';
import StarImg from '/Stars/GreenStar.png'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LottieComponent from './SectionThree/LottieComponent';
const SectionThree = ({ currentSection }) => {
    const handleClick = () => {
        window.scrollTo({
            top: window.innerWidth * 4 - 100,
            behavior: 'smooth'
        });
    }
    const [inView, setInView] = useState(false);
    useEffect(() => {
      if (currentSection === 4) {
        setInView(true);
      } else {
        setInView(false);
      }
    }, [currentSection]);
    return (
        <>
            <div id="section-three" className='relative h-full w-full flex flex-col items-center justify-start z-50 pt-[10%]' >
                <div className='relative'>
                    <div className='absolute top-[-116px] left-[-131px] 2xl:top-[-102px] 2xl:left-[-137px] scale-75 2xl:scale-100 select-none'>
                        <motion.img src={StarImg} alt="Star" 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <BoldTitle content='ONE PROMPT ONLY!' color="#FF0501" italic />
                </div>
                <div className="mt-32">
                    <Button kls="w-80 normal-case h-20 2xl:h-24 text-3xl 2xl:text-4xl" duration={0.8} onClick={() => {handleClick()}}>Mint</Button>
                </div>
                <div className='-rotate-[30deg] absolute scale-75 2xl:scale-100 right-0 w-[530px] h-[530px]'>
                    <LottieComponent play={inView}/>
                </div>
                <div className='rotate-[210deg] absolute mt-[200px] scale-75 2xl:scale-100 left-0 w-[320px] h-[320px]'>
                    <LottieComponent play={inView} delay={2000}/>
                </div>
            </div>
        </>
    )
}

export default SectionThree;

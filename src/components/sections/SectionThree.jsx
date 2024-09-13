import BoldTitle from '../core/BoldTitle';
import Button from '../core/Button';
import StarImg from '/Stars/GreenStar.png'
import { motion } from 'framer-motion';
import LottieComponent from './SectionThree/LottieComponent';
const SectionThree = () => {
    const handleClick = () => {
        window.scrollTo({
            top: window.innerWidth * 4 - 100,
            behavior: 'smooth'
        });
    
    }
    return (
        <>
            <div id="section-three" className='relative h-full w-full flex flex-col items-center justify-between pt-[7%] pb-[17%] z-50' >
                <div className='absolute -right-3 -bottom-8 2xl:bottom-1 2xl:right-9 scale-75 2xl:scale-100 select-none w-[530px] h-[530px]'>
                    <LottieComponent />
                </div>
                <div
                    className='relative'>
                    <div className='absolute top-[-116px] left-[-131px] 2xl:top-[-102px] 2xl:left-[-137px] scale-75 2xl:scale-100 select-none'>
                        <motion.img src={StarImg} alt="Star" 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div>                        
                        <BoldTitle content='ONE PROMPT ONLY!' color="#FF0501" italic />
                    </div>
                </div>
                <div className='w-80 2xl:w-96 relative select-none'>
                    <div className='absolute left-[-30.75rem] 2xl:left-[-41rem] top-2 rotate-90 scale-75 2xl:scale-100 w-[320px] h-[320px]' >
                        <LottieComponent />
                    </div>
                    <Button kls="normal-case h-20 2xl:h-24 text-3xl 2xl:text-4xl" duration={0.8} onClick={() => {handleClick()}}>Mint</Button>
                </div>
            </div>
        </>
    )
}

export default SectionThree;

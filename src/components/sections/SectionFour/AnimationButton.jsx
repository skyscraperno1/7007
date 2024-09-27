import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../core/Button';
import { cn } from '../../../lib/utils';

const AnimationButton = ({ showButton, isMobile }) => {
    const variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 20,
            opacity: 1,
            rotate: [0, 5, 0, -5, 0],
            transition: { 
                duration: 0.5, 
                rotate: {
                    duration: 0.25, 
                    delay: 0.25,
                    repeat: Infinity, 
                    repeatType: 'loop', 
                    ease: 'linear'
                }
            }
        }
    };

    return (
        <AnimatePresence >
            {
                showButton &&
                <motion.div
                    initial="hidden"
                    animate={showButton ? "visible" : "hidden"}
                    variants={variants}
                    className='relative z-30'
                >
                    <Button kls={cn("h-20 2xl:h-24 text-3xl 2xl:text-4xl w-72 2xl:w-96", {"w-64": isMobile})} duration={0.8} isMobile={isMobile}>trade</Button>
                </motion.div>
            }
        </AnimatePresence>

    );
}

export default AnimationButton;

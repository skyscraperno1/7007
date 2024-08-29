import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../core/Button';

const AnimationButton = ({showButton}) => {

    const variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 20,
            opacity: 1,
            transition: { duration: 1 }
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
                >
                    <Button kls="h-20 2xl:h-24 text-3xl 2xl:text-4xl w-72 2xl:w-96" duration={0} onClick={() => { handleClick() }}>trade</Button>
                </motion.div>
            }
        </AnimatePresence>

    );
}

export default AnimationButton;

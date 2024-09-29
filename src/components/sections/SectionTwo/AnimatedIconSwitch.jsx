import { motion, MotionConfig } from 'framer-motion';

const TRANSITION = {
  type: 'spring',
  stiffness: 50, 
  damping: 10
}
const AnimatedIconSwitch = ({ flag, IconA, IconB }) => {
  return (
    <div className="w-full h-full m-pointer overflow-hidden" style={{mixBlendMode: 'difference'}}>
      <MotionConfig transition={TRANSITION}>
        <motion.div
          className='h-full flex items-center justify-center'
          initial={{ y: 0 }}
          animate={{ y: flag ? -32 : 0 }}
        >
          {IconA}
        </motion.div>
        <motion.div
          className='h-full flex items-center justify-center'
          initial={{ y: 32 }}
          animate={{ y: flag ? -32 : 32 }}
        >
          {IconB}
        </motion.div>
      </MotionConfig>

    </div>
  );
};

export default AnimatedIconSwitch;
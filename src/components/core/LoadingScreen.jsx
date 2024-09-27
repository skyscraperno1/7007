import { motion, AnimatePresence } from "framer-motion";
import LoadingSrc from './loading.json';
import { useEffect, useState } from "react";
import LottieComponent from "../sections/SectionThree/LottieComponent";

const LoadingScreen = ({ isLoading, progress, isMobile }) => {
  const [afterLoading, setAfterLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setAfterLoading(false)
      }, 1000);
    }
  }, [isLoading, progress]);
  useEffect(() => {
    if (afterLoading) {
      document.body.style.overflow = "hidden"; 
      document.body.style.cursor = ""; 
      if (isMobile) {
        const root = document.getElementById('root')
        if (root) {
          root.style.overflow = 'hidden'  
        }
      } else {
        const root = document.getElementById('root')
        if (root) {
          root.style.overflow = ''  
        }
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.cursor = "none";
    }
  }, [afterLoading]);
  const exitAni = isMobile ? { y: "-100vh" } : { x: "100vw" };
  return (
    <AnimatePresence>
      {afterLoading && (
        <motion.div
          className="bg-white w-screen h-screen fixed z-[1000] flex items-center justify-center"
          initial={{ x: 0, y: 0 }} 
          exit={exitAni}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex justify-center">
            <motion.div
              className={isMobile ? 'w-1/4' : 'w-1/12'}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LottieComponent play={afterLoading} animationData={LoadingSrc}></LottieComponent>
            </motion.div>
          </div>
          <motion.div 
              className="absolute w-full text-center text-black text-base user-select-none"
              style={{top: isMobile ? '80%' : '90%'}}
              initial={{ opacity: 0 }} 
              animate={{ opacity: progress === 100 ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.min(progress, 100).toFixed(0)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

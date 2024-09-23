import { motion, AnimatePresence } from "framer-motion";
import LoadingSrc from '/Logo/Loading.mp4';
import { useEffect, useState } from "react";

const LoadingScreen = ({ isLoading, progress }) => {
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
    } else {
      document.body.style.overflow = "";
      document.body.style.cursor = "none";
    }
  }, [afterLoading]);
  return (
    <AnimatePresence>
      {afterLoading && (
        <motion.div
          className="bg-white w-screen h-screen fixed z-[1000] flex items-center justify-center"
          initial={{ x: 0 }} 
          exit={{ x: "100vw" }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex justify-center">
            <motion.video
              src={LoadingSrc}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              alt="logo"
              className="w-full"
              autoPlay
              muted
              loop
            />
          </div>
          <motion.div 
              className="absolute top-[90%] w-full text-center text-black text-base user-select-none"
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

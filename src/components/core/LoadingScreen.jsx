import { motion, AnimatePresence } from "framer-motion";
import logo from '/Logo/GreenLogo.png'
import { useEffect } from "react";

const LoadingScreen = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"; 
      document.body.style.cursor = ""; 
    } else {
      document.body.style.overflow = "";
      document.body.style.cursor = "none";
    }
  }, [isLoading]);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="bg-themeGreen w-screen h-screen fixed z-[1000] flex items-center justify-center"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={logo}
            alt="logo"
            className="w-[65px]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

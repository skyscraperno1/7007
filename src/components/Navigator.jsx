import Button from "./core/Button";
import { motion, AnimatePresence } from "framer-motion";
import useResourceByName, { RESOURCE_TYPES } from "../hook/useResourceByName";
import { cn } from "../lib/utils";
import { useState } from 'react'
import SmoothScroll from 'smooth-scroll';
const RotatingImage = ({ src, alt, isMobile }) => {
  const whileInteractive = isMobile ? { whileTap: { rotate: -20 } } : { whileHover: { rotate: -20 } };
  
  const backTop = () => {
    if (isMobile) {
      const wrapper = document.getElementById('mobile-scroller');
      wrapper.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const scroll = new SmoothScroll();
      const duration = 1000; 
      scroll.animateScroll(0, { speed: duration });
    }
  }
  return (
    <div
      className={cn("m-pointer hidden sm:block", {'block': isMobile, 'ml-4': isMobile, 'w-12': isMobile })}
      onClick={backTop}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ rotate: 0 }}
        {...whileInteractive}
        className="w-12 2xl:w-full"
        transition={{ type: "spring", stiffness: 500 }}
        style={{ height: "auto" }}
      />
    </div>
  );
};
function Navigator({ isMobile }) {
  const logo = useResourceByName("GreenLogo.png", RESOURCE_TYPES.IMAGE);
  const XLogo = useResourceByName("X-logo.svg", RESOURCE_TYPES.IMAGE);
  const TwitterLogo = useResourceByName(
    "twitter-logo.svg",
    RESOURCE_TYPES.IMAGE
  );
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header
      className={cn("top-0 z-40 w-full flex justify-between items-center py-2 select-none bg-white fixed border-b-4 border-black", isMobile ? 'h-[74px]' : 'h-[10vh] pr-6 pl-24')}
    >
      <RotatingImage src={logo} alt="7007" isMobile={isMobile}/>
      {isMobile ? (
        <>
          <Button kls="w-24 mr-4" onClick={() => setShowMenu(!showMenu)} isMobile={isMobile}>menu</Button>
          <AnimatePresence>
            {
              showMenu && (
                <motion.div 
                  className="fixed bg-themeGreen w-full z-[200] top-[123px] pt-4 flex flex-col justify-start items-center" style={{ height: 'calc(100vh - 123px)'}}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 500, damping: 40 }} 
                >
                  <div className="flex justify-between items-center uppercase w-screen px-4 h-12 text-lg"
                    
                  >
                    <div className="w-5">01</div>
                    <div className="w-32 text-end text-nowrap">launch app</div>
                  </div>
                  <div className="flex justify-between items-center uppercase w-screen px-4 h-12 text-lg"
                    >
                      <div className="w-5">02</div>
                      <div className="w-32 text-end text-nowrap">white paper</div>
                    </div>
                  <div className="flex justify-between items-center uppercase w-screen px-4 h-12 text-lg"
                     onClick={() => {
                      window.open("https://x.com/lab7007?s=21", "_blank");
                    }}
                  >
                    <div className="w-5">03</div>
                    <div className="w-32 text-end text-nowrap">X</div>
                  </div>
                  <div className="flex justify-between items-center uppercase w-screen px-4 h-12 text-lg"
                     onClick={() => {
                      window.open("https://t.me/lab7007", "_blank");
                    }}
                  >
                    <div className="w-5 text-end">04</div>
                    <div className="w-32 text-end text-nowrap">Telegram</div>
                  </div>
                </motion.div>
              )
            }
          </AnimatePresence>
        </>
      ) : (
        <div className="h-full flex items-center gap-5">
          <Button
            kls="w-12 2xl:w-16 px-2 2xl:px-3"
            onClick={() => {
              window.open("https://x.com/lab7007?s=21", "_blank");
            }}
          >
            <img src={XLogo} alt="x" className="z-10 h-auto w-6 2xl:w-full" />
          </Button>
          <Button
            kls="w-12 2xl:w-16 px-2 2xl:px-3"
            onClick={() => {
              window.open("https://t.me/lab7007", "_blank");
            }}
          >
            <img
              src={TwitterLogo}
              alt="twitter"
              className="z-10 h-auto w-6 2xl:w-full"
            />
          </Button>
          <Button kls="px-2 2xl:px-3">launch app</Button>
          <Button kls="px-2 2xl:px-3">white paper</Button>
        </div>
      )}
    </header>
  );
}
export default Navigator;

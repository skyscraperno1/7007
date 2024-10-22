import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button";
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

const _config = [
  { bg: 'themeGreen', text: "Product Launch Coming Soon! Secure Your Spot On The Waitlist Now." },
  { bg: 'themeRed', text: "PAre you sure you don't want to join?" },
  { bg: 'themeGreen', text: "This is the final call, join or you’ll regret!" }
]
const Popover = forwardRef(({ isLoading, isMobile, isScrolling, currentSection, showWallet }, ref) => {
  const [show, setShow] = useState(false)
  let _timer = null
  const [config, setConfig] = useState({
    bg: 'themeGreen',
    text: ''
  })
  useEffect(() => {
    if ((isLoading || isScrolling) && _timer) {
      clearTimeout(_timer)
      _timer = null;
    }
    if (!isLoading && !isScrolling && !_timer) {
      const walletPopover = sessionStorage.getItem('walletPopover')
      if (walletPopover) {
        _timer && clearTimeout(_timer)
        return;
      }
      if (currentSection === 1) {
        _timer = setTimeout(() => {
          setConfig(_config[0])
          setShow(true);
        }, 2000);
      } else if ((!isMobile && currentSection === 5) || (isMobile && currentSection === 4)) {
        _timer = setTimeout(() => {
          setConfig(_config[1])
          setShow(true);
        }, 2000);

      } else if ((!isMobile && currentSection === 6) || (isMobile && currentSection === 5)) {
         _timer = setTimeout(() => {
          const last_pop = sessionStorage.getItem('last_pop')
          if (last_pop) {
            _timer && clearTimeout(_timer)
            return;
          }
          setConfig(_config[2])
          setShow(true);
        }, 2000);

      }
    } else {
      clearTimeout(_timer)
      _timer = null
      setShow(false)
    }
  }, [isLoading, isScrolling, currentSection])

  useImperativeHandle(ref, () => ({
    clearTimer: () => {
      if (_timer) {
        clearTimeout(_timer)
        _timer = null
      }
    }
  }))
  return (
    <AnimatePresence>
      {
        show && (
            <motion.div
              key="motionKey"
              initial={{ opacity: 0, x: 100, display: 'none' }}
              animate={{ opacity: 1, x: 0, rotate: [0, 2, 0, -2, 0], display: 'block'}}
              exit={{ opacity: 0, x: 100, rotate: [0], display: 'none' }}
              transition={{
                x: { duration: 0.5 },
                opacity: { duration: 0.5 },
                rotate: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
              }}
              className={`uppercase fixed w-[428px] h-[298px] px-6 bg-${config.bg} z-[2000] text-white border-black pt-14 pb-10`}
              id="popover"
              style={{
                top: 'calc(50% - 149px)',
                left: 'calc(50% - 214px)',
                borderWidth: '5px',
                boxShadow: '-8px 8px 0px #000',
                scale: isMobile ? 0.75 : 1,
                willChange: 'transform, display, rotate'
              }}
            >
              <IoCloseSharp onClick={() => setShow(false)} className="absolute top-4 right-4 text-3xl text-black font-bolder m-pointer" />
              <div className="flex flex-col items-center justify-between h-full text-center">
                <div>
                  <h1 className="text-3xl mb-4">get early access</h1>
                  <h2 className="text-lg">{config.text}</h2>
                </div>
                <Button kls="text-black w-full text-lg font-normal" isMobile={isMobile} onClick={() => {
                  setShow(false)
                  showWallet()
                }}>join waitlist</Button>
              </div>

            </motion.div>
        )
      }
    </AnimatePresence>
  )
})
Popover.displayName = 'Popover';

export default Popover;
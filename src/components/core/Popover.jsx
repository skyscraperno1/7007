import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button";

const Popover = ({ show, close, children, background, isMobile = true }) => {
  return (
    <AnimatePresence>
      {
        show && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`uppercase absolute w-[428px] h-[298px] px-6 bg-${background} z-[100]  text-white border-black pt-14 pb-10`}
            id="popover"
            style={{
              top: 'calc(50% - 149px)',
              left: 'calc(50% - 214px)',
              borderWidth: '5px',
              boxShadow: '-8px 8px 0px #000',
              scale: isMobile ? 0.75 : 1
            }}
          >
            <IoCloseSharp onClick={() => close && close()}className="absolute top-4 right-4 text-3xl text-black font-bolder m-pointer" />
            <div className="flex flex-col items-center justify-between h-full text-center">
              <div>
                <h1 className="text-3xl mb-4">get early access</h1>
                <h2 className="text-lg">{ children }</h2>
              </div>
              <Button kls="text-black w-full text-lg font-normal">join waitlist</Button>
            </div>

          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default Popover;
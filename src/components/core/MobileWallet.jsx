import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button";
import CheckBox from './CheckBox';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
const links = [
  {url: '#', content: '01 rainbow'},
  {url: '#', content: '02 coinbase wallet'},
  {url: '#', content: '03 metamask'},
  {url: '#', content: '04 rainbow'},
]
const MobileWallet = ({ show, onClose }) => {
  const [check, setCheck] = useState(false)
  const [active, setActive] = useState('')
  const handleCheckboxChange = () => {
    setCheck(!check);
  };
  const handleClick = (content) => {
    setActive(content)
  }
  const handleClose = () => {
    setActive('')
    setCheck(false)
    onClose();
  }
  return (
   <AnimatePresence>
    {
      show && (
        <motion.div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[300]"
          initial={{ display: 'none' }}
          animate={{ display: 'flex' }}
          exit={{ display: 'none' }}
        >
        <motion.div className="w-[330px] h-[440px] flex flex-col justify-center items-center py-6 px-6 border-black bg-white"
          initial={{ opacity: 0, x: 100, display: 'none' }}
          animate={{ opacity: 1, x: 0, display: 'block'}}
          exit={{ opacity: 0, x: 100, rotate: [0], display: 'none' }}
          transition={{
            x: { duration: 0.5 },
            opacity: { duration: 0.5 },
            rotate: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
          }}
          style={{
            borderWidth: '5px',
            boxShadow: '-8px 8px 0px #000',
            willChange: 'transform, display, rotate'
          }}
        >
          <p className="w-full flex justify-end h-10">
            <IoCloseSharp className="absolute top-4 right-4 text-2xl leading-4 text-black font-bolder" onClick={handleClose}/>
          </p>
          <h2 className="uppercase px-4 w-full text-start text-xl">connect a wallet</h2>
          <div className="flex flex-1 flex-col w-full px-4 my-7">
          {links.map((link, index) => (
            <a
              key={link.content}
              href={link.url}
              className={cn('underline uppercase', {'mb-4': index < links.length - 1}, {'text-themeGreen': active === link.content})}
              onClick={() => handleClick(link.content)} 
            >
              {link.content}
            </a>
            ))}
          </div>
          <div className="flex mb-6">
            <div className="h-full flex items-center mr-4">
              <CheckBox checked={check} onChange={handleCheckboxChange} />
            </div>
            <div className="uppercase underline">binding my account to discord</div>
          </div>
          <Button kls="w-full text-sm" isMobile={true} noShadow={true} disabled={!check || !active}>NEXT</Button>
        </motion.div>
      </motion.div>
      )
    }
   </AnimatePresence>
  )
}
export default MobileWallet;
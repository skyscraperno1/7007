import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button";
import CheckBox from './CheckBox';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import useResourceByName, { RESOURCE_TYPES } from "../../hook/useResourceByName";
const WalletPopover = ({ show, onClose, isMobile }) => {
  const RAINBOW = useResourceByName('rainbow.svg', RESOURCE_TYPES.IMAGE);
  const COINBASE = useResourceByName('coinbase_wallet.svg', RESOURCE_TYPES.IMAGE);
  const METAMASK = useResourceByName('meta_mask.svg', RESOURCE_TYPES.IMAGE);
  const WALLET_CONNECT = useResourceByName('wallet_connect.svg', RESOURCE_TYPES.IMAGE);
  const [check, setCheck] = useState(false)
  const [active, setActive] = useState('')
  
  const links = [
    {url: '#', content: 'rainbow', logo: RAINBOW},
    {url: '#', content: 'coinbase wallet', logo: COINBASE},
    {url: '#', content: 'metamask', logo: METAMASK},
    {url: '#', content: 'wallet connect', logo: WALLET_CONNECT},
  ]

  useEffect(() => {
    if (isMobile) return;
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobile, show])
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

  const handleNext = () => {
    const wallet = active.substring(3)
    console.log('link to your next step', wallet);
    handleClose()
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
          <h2 className="uppercase px-4 w-full text-start text-2xl select-none">connect a wallet</h2>
          <div className="flex flex-1 flex-col w-full px-4 my-7">
          {links.map((link, index) => (
            <div
              key={link.content}
              href={link.url}
              className={cn('underline uppercase flex-1 w-fit-content', {'mb-4': index < links.length - 1}, {'text-themeGreen': active === link.content})}
            >
              <div className="flex transition-all w-fit select-none" onClick={() => handleClick(link.content)} >
                <img src={link.logo} alt={link.content} className={cn("w-6 h-6 mr-2 rounded opacity-60 m-pointer", {"opacity-100": active === link.content})} />
                <div className="m-pointer">{link.content}</div>
              </div>
            </div>
            ))}
          </div>
          <div className="flex mb-6 2xl:mb-4">
            <div className="h-inherit flex items-center mr-4">
              <CheckBox checked={check} onChange={handleCheckboxChange} />
            </div>
            <div className="uppercase underline select-none">binding my account to discord</div>
          </div>
          <Button kls="w-full text-sm max-h-12" isMobile={isMobile} noShadow={true} disabled={!check || !active} onClick={handleNext}>NEXT</Button>
        </motion.div>
      </motion.div>
      )
    }
   </AnimatePresence>
  )
}
export default WalletPopover;
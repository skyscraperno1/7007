import logo from '/Logo/GreenLogo.png'
import Button from './core/Button'
import XLogo from '/Logo/X-logo.svg'
import TwitterLogo from '/Logo/twitter-logo.svg'
import { motion } from 'framer-motion';

const RotatingImage = ({ src, alt }) => {
  return (
    <div className='m-pointer hidden sm:block'>
      <motion.img
        src={src}
        alt={alt}
        initial={{ rotate: 0 }} 
        whileHover={{ rotate: -20 }} 
        className="w-12 2xl:w-full"
        transition={{ type: "spring", stiffness: 500 }} 
        style={{ height: 'auto' }} // 调整图片大小
      />
    </div>
  );
};
function Navigator() {

  return (
    <header className="top-0 z-40 w-full h-[10vh] flex justify-between items-center pl-24 pr-6 py-2 select-none bg-white fixed border-b-4 border-black">
      <RotatingImage src={logo} alt="7007" />
      <div className='h-full flex items-center gap-5'>
        <Button kls="w-12 2xl:w-16 px-2 2xl:px-3" onClick={() => {
          window.open('https://x.com/lab7007?s=21', '_blank');
        }}><img src={XLogo} alt='x' className='z-10 h-auto w-6 2xl:w-full'/></Button>
        <Button kls="w-12 2xl:w-16 px-2 2xl:px-3"
          onClick={() => {
            window.open('https://t.me/lab7007', '_blank');
          }}
        ><img src={TwitterLogo} alt='twitter' className='z-10 h-auto w-6 2xl:w-full'/></Button>
        <Button kls="px-2 2xl:px-3">launch app</Button>
      </div>
    </header>
  )
}
export default Navigator

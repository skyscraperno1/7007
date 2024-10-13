import Button from "./core/Button";
import { motion, AnimatePresence } from "framer-motion";
import useResourceByName, { RESOURCE_TYPES } from "../hook/useResourceByName";
import { cn } from "../lib/utils";
import { useEffect, useState } from 'react'
import SmoothScroll from 'smooth-scroll';
const renderBtn = (content, isImg, name) => {
  return (
    isImg ? (
      <img src={content} alt={name} className="z-10 h-auto w-6 2xl:w-full" />
    ) : (
      content
    )
  )
}
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
  const TgLogo = useResourceByName(
    "tg-logo.svg",
    RESOURCE_TYPES.IMAGE
  );
  const DiscordLogo = useResourceByName(
    "Discord-logo.svg",
    RESOURCE_TYPES.IMAGE
  );
  const [links, setLinks] = useState([])
  useEffect(() => {
    if (isMobile) {
      setLinks([
        {url: '#', content: '01_launch app'},
        {url: '#', content: '02_whitepaper'},
        {url: 'https://x.com/lab7007?s=21', content: '03_X'},
        {url: 'https://t.me/lab7007', content: '04_Telegram'},
        {url: 'https://discord.gg/D5ewSJxuQM', content: '05_Discord'},
      ])
    } else {
      if (!XLogo || !TgLogo || !DiscordLogo) return;
      setLinks([
        {url: 'https://x.com/lab7007?s=21', content: XLogo, name: 'X'},
        {url: 'https://t.me/lab7007', content: TgLogo, name: 'Telegram'},
        {url: 'https://discord.gg/D5ewSJxuQM', content: DiscordLogo, name: 'Discord'},
        {url: '#', content: 'whitepaper', name: ''},
        {url: '#', content: 'launch app', name: ''},
      ])
    }
  }, [isMobile, XLogo, TgLogo, DiscordLogo])
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = (url) => {
    window.open(url, '_blank');
    console.log('fill your link above', url)
  }
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
                  className="fixed bg-themeGreen w-full z-[200] top-[123px] pt-4 flex flex-col justify-start items-center" style={{ height: 'calc(100vh - 123px)', willChange: 'transform'}}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 500, damping: 40 }} 
                >
                  {links.map(({ url, content }) => {
                    const [num, name] = content.split('_');
                    return (
                      <a
                        key={name}
                        className="flex justify-between items-center uppercase w-screen px-4 h-12 text-lg"
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <div className="w-5">{num}</div>
                        <div className="w-32 text-end text-nowrap">{name}</div>
                      </a>
                    );
                  })}
                </motion.div>
              )
            }
          </AnimatePresence>
        </>
      ) : (
        <div className="h-full flex items-center gap-5">
          {
            links.map(({ url, content, name }) => {
              const isImg = content.startsWith('/')
              const kls = isImg ? 'w-12 2xl:w-16 px-2 2xl:px-3' : 'px-2 2xl:px-3'
              return (
                <Button
                  key={content}
                  kls={kls}
                  onClick={() => handleClick(url)}
                >
                  {renderBtn(content, isImg, name)}
                </Button>
              )
            })
          }
        </div>
      )}
    </header>
  );
}
export default Navigator;

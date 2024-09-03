import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import AnimationText from './AnimationText';
import AnimationButton from './AnimationButton';

import Img1 from '/Section3/bgs/Img1.png'
import Img2 from '/Section3/bgs/Img2.png'
import Img3 from '/Section3/bgs/Img3.png'
import Img4 from '/Section3/bgs/Img4.png'
import Img5 from '/Section3/bgs/Img5.png'
import Img6 from '/Section3/bgs/Img6.png'
import Img7 from '/Section3/bgs/Img7.png'
const ImgW = 269
const ImgH = 424
const images = [
  { src: Img1, x: `calc(30% - ${ImgW / 2}px)`, y: `calc(65% - ${ImgH / 2}px)`, delay: 2.2 },
  { src: Img2, x: `calc(50% - ${ImgW / 2}px)`, y: `calc(50% - ${ImgH / 2}px)`, delay: 2.2 },
  { src: Img3, x: `calc(70% - ${ImgW / 2}px)`, y: `calc(45% - ${ImgH / 2}px)`, delay: 2.2 },
  { src: Img4, x: `calc(14% - ${ImgW / 2}px)`, y: `calc(43% - ${ImgH / 2}px)`, delay: 2.7 },
  { src: Img5, x: `calc(45% - ${ImgW / 2}px)`, y: `calc(70% - ${ImgH / 2}px)`, delay: 2.7 },
  { src: Img6, x: `calc(90% - ${ImgW / 2}px)`, y: `calc(63% - ${ImgH / 2}px)`, delay: 2.7 },
  { src: Img7, x: `calc(80% - ${ImgW / 2}px)`, y: `calc(52% - ${ImgH / 2}px)`, delay: 3.2 },
  { src: Img1, x: `calc(63% - ${ImgW / 2}px)`, y: `calc(35% - ${ImgH / 2}px)`, delay: 3.2 },
];


const AnimatedScreen = ({ show, canClose }) => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const handleAnimationComplete = (index) => {
    if (index === images.length - 1) {
      setTimeout(() => {
        setShowText(true)
      }, 1000);
    }
  };

  const showCallback = () => {
    setTimeout(() => {
      setShowButton(true)
      canClose()
    }, 1000)
  }
  return createPortal(
    <AnimatePresence>
      {show && <motion.div
        initial={{ opacity: 0, display: 'flex' }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{ opacity: 0, top: '-100%', display: 'none' }}
        transition={{
          duration: show ? 3 : 1,
        }}
        id="animation-pop"
        className='fixed bg-themeGreen w-screen h-screen left-0 bottom-0 z-50  flex justify-center items-center'>
        {
          images.map((image, index) => {
            const { src, x, y, delay } = image;
            return (
              <motion.div
                className="absolute scale-75 2xl:scale-100 will-change-opacity animated-image-container"
                key={`img-${index}`}
                initial={{ display: 'none' }}
                animate={{
                  display: 'block',
                  transition: { delay },
                }}
                onAnimationComplete={() => { handleAnimationComplete(index) }}
                style={{ top: `${y}`, left: `${x}` }}
              >
                <img src={src} />
              </motion.div>
            )
          })
        }
        <div className='flex flex-col items-center justify-center'>
          <div className="h-[288px] 2xl:h-[384px]">
            <AnimationText showText={showText} showCallback={() => {
              showCallback()
            }} />
          </div>
          <div className='h-20 2xl:h-24'>
          <AnimationButton showButton={showButton} />
          </div>
        </div>
      </motion.div>
      }
    </AnimatePresence>,
    document.body
  );
};

export default AnimatedScreen;

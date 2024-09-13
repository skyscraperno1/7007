import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimationText from './SectionThree/AnimationText';
import AnimationButton from './SectionThree/AnimationButton';
import MatterCanvas from './SectionThree/MatterCanvas';
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
  { src: Img1, x: `calc(24% - ${ImgW / 2}px)`, y: `calc(55% - ${ImgH / 2}px)`, delay: 2.2 },
  { src: Img2, x: `calc(50% - ${ImgW / 2}px)`, y: `calc(50% - ${ImgH / 2}px)`, delay: 2.2 },
  { src: Img3, x: `calc(70% - ${ImgW / 2}px)`, y: `calc(45% - ${ImgH / 2}px)`, delay: 2.2 },
  { src: Img4, x: `calc(10% - ${ImgW / 2}px)`, y: `calc(43% - ${ImgH / 2}px)`, delay: 2.7 },
  { src: Img5, x: `calc(38% - ${ImgW / 2}px)`, y: `calc(66% - ${ImgH / 2}px)`, delay: 2.7 },
  { src: Img6, x: `calc(87% - ${ImgW / 2}px)`, y: `calc(68% - ${ImgH / 2}px)`, delay: 2.7 },
  { src: Img7, x: `calc(80% - ${ImgW / 2}px)`, y: `calc(52% - ${ImgH / 2}px)`, delay: 3.2 },
  { src: Img1, x: `calc(63% - ${ImgW / 2}px)`, y: `calc(35% - ${ImgH / 2}px)`, delay: 3.2 },
];

const colors = ['#03D25C', '#FEED01', '#FF0501', '#03D25C', '#FEED01', '#FF0501'];
const SectionFour = ({currentSection}) => {
  const [inView, setInView] = useState(false)
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [secondTextShown, setSecondTextShown] = useState(false);
  useEffect(() => {
    if (currentSection === 5) {
      setInView(true)
    } else {
      setInView(false)
    }
}, [currentSection])

  const ref = useRef(null);
  const handleAnimationComplete = (index) => {
    if (index === images.length - 1) {
      setTimeout(() => {
        setShowText(true)
      }, 1000);
    }
  };
  
  useEffect(() => {
    let timer
    if (!inView) {
      timer && clearInterval(timer);
    } 
    if (showText && inView) {
      let intervalTime = 1000;
      if (colorIndex === 1 && !secondTextShown) {
        intervalTime = 2000;
        setTimeout(() => {
          setShowButton(true)
        }, 1000)
      }
      timer = setInterval(() => {
        setColorIndex(prevIndex => {
          if (prevIndex === 1) {
            setSecondTextShown(true);
          }
          return (prevIndex + 1) % colors.length;
        })
      }, intervalTime);
    }
    return () => timer && clearInterval(timer);
  }, [showText, secondTextShown, colorIndex, inView])

  return (
     <div
        id="section-four"
        style={{ backgroundColor: colors[colorIndex] }}
        className='h-full w-full shrink-0 relative z-10'>
        {
          images.map((image, index) => {
            const { src, x, y, delay } = image;
            return (
              <motion.div
                className="absolute scale-75 2xl:scale-100 will-change-opacity animated-image-container z-[11]"
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
          <div className="h-[288px] 2xl:h-[384px] mt-20">
            <AnimationText showText={showText}  currentTextIndex={colorIndex}/>
          </div>
          <div className='h-20 2xl:h-24' onMouseEnter={() => {
            ref.current.addBox()
          }}>
            <AnimationButton showButton={showButton} />
          </div>
        </div>
        <MatterCanvas ref={ref}/> 
      </div>
  );
};

export default SectionFour;

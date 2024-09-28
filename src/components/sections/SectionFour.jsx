import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimationText from "./SectionFour/AnimationText";
import AnimationButton from "./SectionFour/AnimationButton";
import MatterCanvas from "./SectionFour/MatterCanvas";
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName';
import { createUseX, createUseY, calDelay } from "./SectionFour/calPosition";

const colors = [
  "#03D25C",
  "#FEED01",
  "#FF0501",
  "#03D25C",
  "#FEED01",
  "#FF0501",
];

const basicWidth = 216
const basicHeight = 318
const SectionFour = ({ currentSection, isMobile }) => {
  const Img1 = useResourceByName('Img1.png', RESOURCE_TYPES.IMAGE);
  const Img2 = useResourceByName('Img2.png', RESOURCE_TYPES.IMAGE);
  const Img3 = useResourceByName('Img3.png', RESOURCE_TYPES.IMAGE);
  const Img4 = useResourceByName('Img4.png', RESOURCE_TYPES.IMAGE);
  const Img5 = useResourceByName('Img5.png', RESOURCE_TYPES.IMAGE);
  const Img6 = useResourceByName('Img6.png', RESOURCE_TYPES.IMAGE);
  const Img7 = useResourceByName('Img7.png', RESOURCE_TYPES.IMAGE);
  const Img8 = useResourceByName('Img8.png', RESOURCE_TYPES.IMAGE);
  const Img9 = useResourceByName('Img9.png', RESOURCE_TYPES.IMAGE);
  const target = useRef(null)
  const [images, setImages] = useState([]);
  const [ImgW, setWidth] = useState(0)
  const [ImgH, setHeight] = useState(0)

  useEffect(() => {
    setWidth(isMobile ? 0.5 * basicWidth : basicWidth);
    setHeight(isMobile ? 0.5 * basicHeight : basicHeight);
  }, [isMobile])

  useEffect(() => {
    if (target.current && ImgW && ImgH) {
      if (target.current.offsetWidth > 1472) {
        setWidth(basicWidth * 1.23)
        setHeight(basicHeight * 1.23)
      } 
      const useX = createUseX(target.current.offsetWidth, ImgW)
      const useY = createUseY(target.current.offsetHeight, ImgH)
      const _images = [
        {
          src: Img1,
          x: useX(0),
          y: useY(0.4),
          delay: calDelay(2),
          zIndex: 1
        },
        {
          src: Img2,
          x: useX(0.2),
          y: useY(0.49),
          delay: calDelay(3),
          zIndex: 2
        },
        {
          src: Img3,
          x: useX(0.3),
          y: useY(0.6),
          delay: calDelay(1),
          zIndex: 3
        },
        {
          src: Img4,
          x: useX(0.4),
          y: useY(0.65),
          delay: calDelay(3),
          zIndex: 4
        },
        {
          src: Img5,
          x: useX(0.5),
          y: useY(0.5),
          delay: calDelay(1),
          zIndex: 5
        },
        {
          src: Img6,
          x: useX(0.6),
          y: useY(0.4),
          delay: calDelay(3),
          zIndex: 6
        },
        {
          src: Img7,
          x: useX(0.7),
          y: useY(0.35),
          delay: calDelay(1),
          zIndex: 7
        },
        {
          src: Img8,
          x: useX(0.8),
          y: useY(0.435),
          delay: calDelay(2),
          zIndex: 8
        },
        {
          src: Img9,
          x: useX(1),
          y: useY(0.52),
          delay: calDelay(3),
          zIndex: 9
        },
      ]
      setImages(_images)
    } else {
      setImages([])
    }
  }, [target, ImgW, ImgH, Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9]);


  const [inView, setInView] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [secondTextShown, setSecondTextShown] = useState(false);
  useEffect(() => {
    if (currentSection === 5) {
      setInView(true);
      setIsSeen(true)
    } else {
      setInView(false);
    }
  }, [currentSection, isMobile]);

  const ref = useRef(null);
  const handleAnimationComplete = (index) => {
    if (index === images.length - 1) {
      setTimeout(() => {
        setShowText(true);
      }, 1000);
    }
  };

  useEffect(() => {
    let timer;
    if (!inView) {
      timer && clearInterval(timer);
    }
    if (showText && inView) {
      let intervalTime = 500;
      if (colorIndex === 1 && !secondTextShown) {
        intervalTime = 1000;
        setTimeout(() => {
          setShowButton(true);
        }, 500);
      }
      timer = setInterval(() => {
        setColorIndex((prevIndex) => {
          if (prevIndex === 1) {
            setSecondTextShown(true);
          }
          return (prevIndex + 1) % colors.length;
        });
      }, intervalTime);
    }
    return () => timer && clearInterval(timer);
  }, [showText, secondTextShown, colorIndex, inView]);

  return (
    <div
      id="section-four"
      ref={target}
      style={{ backgroundColor: colors[colorIndex] }}
      className="h-full w-full relative z-10 overflow-hidden"
    >
      <AnimatePresence>
        {(inView || isSeen) &&
          images.map((image, index) => {
            const { src, x, y, delay, zIndex } = image;
            return (
              <motion.div
                className="absolute"
                key={`img-${index}`}
                initial={{ display: "none" }}
                animate={{
                  display: "block",
                  x,
                  y,
                  transition: { delay, x: { duration: 0 }, y: { duration: 0 } },
                }}
                onAnimationComplete={() => {
                  handleAnimationComplete(index);
                }}
                style={{ width: ImgW, height: ImgH, zIndex}}
              >
                <img src={src} className="w-full h-full" />
              </motion.div>
            );
          })}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center">
        <div className="h-[288px] 2xl:h-[384px] mt-20">
          <AnimationText showText={showText} currentTextIndex={colorIndex} isMobile={isMobile} />
        </div>
        <div
          className="h-20 2xl:h-24"
          onMouseEnter={() => {
            ref.current.addBox();
          }}
          onClick={() => {
            if (isMobile) {
              ref.current.addBox();
            } else {
              ref.current.addBox();
              ref.current.addBox();
            }
          }}
        >
          <AnimationButton showButton={showButton} isMobile={isMobile} />
        </div>
      </div>
      <MatterCanvas ref={ref} colorIndex={colorIndex} isMobile={isMobile} />
    </div>
  );
};

export default SectionFour;
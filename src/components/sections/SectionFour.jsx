import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimationText from "./SectionFour/AnimationText";
import AnimationButton from "./SectionFour/AnimationButton";
import MatterCanvas from "./SectionFour/MatterCanvas";
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName';
const ImgW = 269;
const ImgH = 424;
const colors = [
  "#03D25C",
  "#FEED01",
  "#FF0501",
  "#03D25C",
  "#FEED01",
  "#FF0501",
];
const SectionFour = ({ currentSection }) => {
  const Img1 = useResourceByName('Img1.png', RESOURCE_TYPES.IMAGE);
  const Img2 = useResourceByName('Img2.png', RESOURCE_TYPES.IMAGE);
  const Img3 = useResourceByName('Img3.png', RESOURCE_TYPES.IMAGE);
  const Img4 = useResourceByName('Img4.png', RESOURCE_TYPES.IMAGE);
  const Img5 = useResourceByName('Img5.png', RESOURCE_TYPES.IMAGE);
  const Img6 = useResourceByName('Img6.png', RESOURCE_TYPES.IMAGE);
  const Img7 = useResourceByName('Img7.png', RESOURCE_TYPES.IMAGE);
  const Img8 = useResourceByName('Img8.png', RESOURCE_TYPES.IMAGE);

  const images = [
    {
      src: Img4,
      x: `calc(24% - ${ImgW / 2}px)`,
      y: `calc(55% - ${ImgH / 2}px)`,
      delay: 0.5,
    },
    {
      src: Img2,
      x: `calc(50% - ${ImgW / 2}px)`,
      y: `calc(50% - ${ImgH / 2}px)`,
      delay: 0.5,
    },
    {
      src: Img3,
      x: `calc(70% - ${ImgW / 2}px)`,
      y: `calc(45% - ${ImgH / 2}px)`,
      delay: 0.5,
    },
    {
      src: Img1,
      x: `calc(7% - ${ImgW / 2}px)`,
      y: `calc(43% - ${ImgH / 2}px)`,
      delay: 1,
    },
    {
      src: Img5,
      x: `calc(38% - ${ImgW / 2}px)`,
      y: `calc(66% - ${ImgH / 2}px)`,
      delay: 1,
    },
    {
      src: Img8,
      x: `calc(95% - ${ImgW / 2}px)`,
      y: `calc(68% - ${ImgH / 2}px)`,
      delay: 1,
    },
    {
      src: Img7,
      x: `calc(80% - ${ImgW / 2}px)`,
      y: `calc(52% - ${ImgH / 2}px)`,
      delay: 1.5,
    },
    {
      src: Img6,
      x: `calc(63% - ${ImgW / 2}px)`,
      y: `calc(35% - ${ImgH / 2}px)`,
      delay: 1.5,
    },
  ];
  const [inView, setInView] = useState(false);
  const [isSeen, setISSeen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [secondTextShown, setSecondTextShown] = useState(false);
  useEffect(() => {
    if (currentSection === 5) {
      setInView(true);
      setISSeen(true)
    } else {
      setInView(false);
    }
  }, [currentSection]);

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
      style={{ backgroundColor: colors[colorIndex] }}
      className="h-full w-full shrink-0 relative z-10 overflow-hidden"
    >
      <AnimatePresence>
        {(inView || isSeen) &&
          images.map((image, index) => {
            const { src, x, y, delay } = image;
            return (
              <motion.div
                className="absolute scale-75 2xl:scale-100 will-change-opacity animated-image-container z-[11]"
                key={`img-${index}`}
                initial={{ display: "none" }}
                animate={{
                  display: "block",
                  transition: { delay },
                }}
                onAnimationComplete={() => {
                  handleAnimationComplete(index);
                }}
                style={{ top: `${y}`, left: `${x}` }}
              >
                <img src={src} />
              </motion.div>
            );
          })}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center">
        <div className="h-[288px] 2xl:h-[384px] mt-20">
          <AnimationText showText={showText} currentTextIndex={colorIndex} />
        </div>
        <div
          className="h-20 2xl:h-24"
          onMouseEnter={() => {
            ref.current.addBox();
          }}
          onClick={() => {
            ref.current.addBox();
            ref.current.addBox();
          }}
        >
          <AnimationButton showButton={showButton} />
        </div>
      </div>
      <MatterCanvas ref={ref} colorIndex={colorIndex}/>
    </div>
  );
};

export default SectionFour;
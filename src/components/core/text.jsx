import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import VideoPlayer from "../core/VideoPlayer";
import { useEffect, useState } from "react";
export const SmoothScrollHero = () => {
  return (
    <div className="bg-pink-200">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
      </ReactLenis>
    </div>
  );
};



const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const [play, setPlay] = useState(false)

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  useEffect(() => {
    console.log(scrollY);
    if (scrollY > 1400) {
      
      setPlay(true)
    }
  }, [scrollY])

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <VideoPlayer/>
    </motion.div>
  );
};






import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";
import useResourceByName, {
  RESOURCE_TYPES,
} from "../../hook/useResourceByName";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import styled from "styled-components";

// Styled component for the progress bar
const ProgressBar = styled.input.attrs(props => ({
  type: 'range',
  style: {
    background: `linear-gradient(to right, #4CAF50 ${props.$progress}%, #ddd ${props.$progress}%)`
  }
}))`
  width: 100%;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  outline: none;
  transition: background 0.2s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0;
    height: 0;
  }

  &::-moz-range-thumb {
    width: 0;
    height: 0;
  }
`;

const SectionTwoPlus = ({ currentSection }) => {
  const Video = useResourceByName("full_video.mp4", RESOURCE_TYPES.VIDEO);
  const [inView, setInView] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);

  const videoContainerVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

  useEffect(() => {
    if (currentSection === 3) {
      setInView(true);
    } else {
      setInView(false);
    }
  }, [currentSection]);

  const updateProgressBar = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
      animationFrameRef.current = requestAnimationFrame(updateProgressBar);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        cancelAnimationFrame(animationFrameRef.current);
      } else {
        videoRef.current.play();
        animationFrameRef.current = requestAnimationFrame(updateProgressBar);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target?.value || 0;
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowVideo(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
      animationFrameRef.current = requestAnimationFrame(updateProgressBar);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [showVideo]);

  return (
    <div
      className={cn(
        "w-full h-full relative overflow-hidden pointer-events-none",
        {
          "m-pointer": inView && !showVideo,
          "pointer-events-auto": inView,
        }
      )}
      onClick={() => setShowVideo(true)}
    >
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="w-full h-full bg-themeGreen p-8 relative flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={videoContainerVariants}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-fill rounded-lg"
              src={Video}
              autoPlay
              onPlay={() => animationFrameRef.current = requestAnimationFrame(updateProgressBar)}
              onPause={() => cancelAnimationFrame(animationFrameRef.current)}
            />
            <div className="absolute bottom-14 right-0 left-0 px-[15%] z-100">
              <div className="flex items-center justify-between h-8 gap-4">
                <div className="flex bg-slate-600 flex-1 h-full items-center p-2 rounded">
                  <div
                    onClick={handlePlayPause}
                    className="text-white text-xl mr-4 m-pointer"
                  >
                    {isPlaying ? (
                      <FaPause className="m-pointer" />
                    ) : (
                      <FaPlay className="m-pointer" />
                    )}
                  </div>
                  <ProgressBar
                    $progress={progress}
                    onChange={handleProgressChange}
                  />
                </div>
                <div className="bg-slate-600 h-full flex items-center p-2 rounded px-1">
                  <div
                    onClick={handleClose}
                    className="text-white text-2xl m-pointer"
                  >
                    <IoClose className="m-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionTwoPlus;
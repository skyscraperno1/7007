import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";
import useResourceByName, {
  RESOURCE_TYPES,
} from "../../hook/useResourceByName";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import { ProgressBar } from "./SectionTwo/ProgressBar";

const SectionTwoPlus = ({ currentSection, isMobile }) => {
  const Video = useResourceByName("full_video.mp4", RESOURCE_TYPES.VIDEO);
  const [inView, setInView] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  let timeoutId;
  const [isScrolling, setIsScrolling] = useState(false);
  const handleScroll = () => {
    setShowVideo(false)
    setIsScrolling(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null
    }
    timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 800); 

  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      timeoutId && clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);

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
      setIsPlaying(prev => !prev);
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
          "m-pointer": inView && !showVideo && !isScrolling,
          "pointer-events-auto": inView && !isScrolling,
          // "bg-slate-400": isMobile
        }
      )}
      onClick={() => setShowVideo(true)}
    >
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="w-full h-full relative flex items-center justify-center"
            initial={{ x: "-100vw" }} 
            animate={{ x: 0 }}     
            exit={{ x: "100vw" }}  
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-fill"
              src={Video}
              autoPlay
              loop
              onPlay={() => {
                animationFrameRef.current = requestAnimationFrame(updateProgressBar)
                setIsPlaying(true)
              }}
              onPause={() => {
                cancelAnimationFrame(animationFrameRef.current)
                setIsPlaying(false)
              }}
              onMouseEnter={() => setShowControls(true)} 
              onMouseLeave={() => setShowControls(false)}
            />
            <AnimatePresence>
              {showControls && (
                <motion.div
                  className="absolute bottom-24 right-0 left-0 px-[35%] z-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  onMouseEnter={() => setShowControls(true)} 
                >
                  <div className="flex items-center justify-between h-8 gap-4">
                    <div className="flex bg-gray-300/75 flex-1 h-full items-center p-2 rounded">
                      <div
                        className="text-white text-xl mr-4 m-pointer"
                        onClick={handlePlayPause}
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
                    <div className="bg-gray-300/75 h-full flex items-center p-2 rounded px-1">
                      <div
                        className="text-white text-2xl"
                        onClick={handleClose}
                      >
                        <IoClose className="m-pointer" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionTwoPlus;
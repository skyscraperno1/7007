import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence, } from "framer-motion";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { ProgressBar } from "./SectionTwo/ProgressBar";
import AnimatedIconSwitch from "./SectionTwo/AnimatedIconSwitch";
import VideoPlayer from "./SectionTwo/VideoPlayer";
import { usePhoneCal } from "../../hook/useContext";


const SectionTwoPlus = ({ isMobile, currentSection, isScrolling }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mute, setMute] = useState(true)
  const [showControls, setShowControls] = useState(false);
  // control_scroll
  let timeoutId = null;
  useEffect(() => {
    return () => {
      timeoutId && clearTimeout(timeoutId);
    }
  }, [])

  // controls_progress
  const animationFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [exitDuration, setExitDuration] = useState(0);
  const updateProgressBar = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
      animationFrameRef.current = requestAnimationFrame(updateProgressBar);
    }
  };
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateProgressBar);
    } else {
      animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current);
    }
  }, [videoRef.current, isPlaying])
  const handleProgressChange = (e) => {
    const newProgress = e.target?.value || 0;
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
    }
  };
  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        videoRef.current.muted = mute;
      }
      setIsPlaying(prev => !prev);
    }
  };
  const handleMuteClick = () => {
    if (videoRef.current) {
      setMute(prev => {
        videoRef.current.muted = !prev;
        return !prev
      })
    }
  };
  const handleClick = () => {
    if (!videoRef.current) {
      const _videoRef = document.getElementById('video-7007')
      if (!_videoRef) return;
      videoRef.current = _videoRef
      setShowControls(true)
      videoRef.current.play();
      setIsPlaying(true);
      videoRef.current.muted = false;
      setMute(false)
    }
  }
  useEffect(() => {
    if (isScrolling) {
      setExitDuration(0.3)
      setShowControls(false)
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null
      }
    } else {
      setExitDuration(0)
    }
  }, [isScrolling])

  const updateControlTimer = () => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setShowControls(false);
    }, 2000);
    setTimer(newTimer);
  }
  const [timer, setTimer] = useState(null);
  const handleMouseMove = (e) => {
    if (isMobile) return;
    if (!videoRef.current) return;
    if (e.target === e.currentTarget) {
      setShowControls(true);
      updateControlTimer();
    } else {
      timer && clearTimeout(timer);
    }
  }

  useEffect(() => {
    if (showControls) {
      !isMobile && updateControlTimer()
    } else {
      timer && clearTimeout(timer);
    }
  }, [showControls])

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const getPointer =() => {
    if (isMobile) return false;
    return !showControls && videoRef.current === null && document.getElementById('video-7007') && currentSection === 2 
  }
  // for mobile
  const flag = usePhoneCal()
  const getStyle = () => (flag ? {
    height: "calc(100% - 10vh)",
  } : {})

  useEffect(() => {
    if (!isMobile && currentSection !== 2) {
      videoRef.current?.pause()
      videoRef.current = null;
      setShowControls(false);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [currentSection, isMobile])

  const keepControls = () => {
    setShowControls(true)
    if (timer) {
      clearTimeout(timer);
      setTimer(null)
    }
  }

  return (
    <div
      className={cn(
        "w-full h-full relative overflow-hidden select-none",
        {"m-pointer": getPointer()}
      )}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      style={getStyle()}
    >
      {isMobile && <div className="w-full h-full flex justify-center items-center">
        <VideoPlayer isMobile={isMobile}/>
        </div>}
      <AnimatePresence>
        {(showControls) && (
          <motion.div
            id="video-controls"
            className="absolute bottom-16 right-0 left-0 px-[35%] z-100 opacity-50"
            initial={{ opacity: 0, display: "none" }}
            animate={{ opacity: 0.5, display: "block" }}
            exit={{ opacity: 0, display: "none", duration: exitDuration }}
            transition={{ duration: 0.3 }}
            style={ isMobile ? { marginBottom: '10%', padding: '0 20%' } : {}}
            onMouseEnter={keepControls}
            onMouseMove={keepControls}
            onClick={keepControls}
          >
            <div className="flex items-center justify-between h-8 gap-4 text-slate-50 text-base overflow-hidden">
              <div className="flex bg-[#151515] flex-1 h-full items-center p-2 rounded">
                <div
                  className="mr-4 m-pointer w-8 h-8 text-sm"
                  onClick={handlePlayClick}
                >
                  <AnimatedIconSwitch flag={!isPlaying} IconA={<FaPause className="m-pointer" />} IconB={<FaPlay className="m-pointer" />}></AnimatedIconSwitch>
                </div>
                <div className="w-full h-[6px] flex items-center justify-center">
                  <ProgressBar
                    $progress={progress}
                    onChange={handleProgressChange}
                  />
                </div>
              </div>
              <div
                className="bg-[#151515] h-full rounded w-8 flex items-center m-pointer justify-center"
                onClick={handleMuteClick}
              >
                <AnimatedIconSwitch flag={mute} IconA={<FaVolumeMute className="m-pointer"/>} IconB={<FaVolumeUp className="m-pointer"/>}></AnimatedIconSwitch>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionTwoPlus;
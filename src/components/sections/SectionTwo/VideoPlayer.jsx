import { useRef } from 'react'
import useResourceByName, { RESOURCE_TYPES } from "../../../hook/useResourceByName";
import { cn } from '../../../lib/utils';
const VideoPlayer = ({ isMobile }) => {
  const Video = useResourceByName('full_video.mp4', RESOURCE_TYPES.VIDEO);
  const videoRef = useRef(null);
  return <>
    <video
      ref={videoRef}
      className={cn("w-full h-full object-fill absolute z-10", {'h-auto': isMobile, 'z-0': isMobile})}
      id="video-7007"
      src={Video}
      alt="7007 Video"
      autoPlay
      loop
      muted
      playsInline
    />
  </>
};

export default VideoPlayer;
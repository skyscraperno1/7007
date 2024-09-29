import { useRef } from 'react'
import useResourceByName, { RESOURCE_TYPES } from "../../../hook/useResourceByName";
const VideoPlayer = ({ isMobile }) => {
  const Video = useResourceByName('full_video.mp4', RESOURCE_TYPES.VIDEO);
  const videoRef = useRef(null);

  return <>
    <video
      ref={videoRef}
      className="w-full h-full object-fill relative z-10"
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
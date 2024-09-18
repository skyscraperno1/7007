import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
const SectionTwoPlus = ({ currentSection }) => {
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (currentSection === 3) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  }, [currentSection]);
  return (
    <div className={cn(
      "w-full h-full relative overflow-hidden pointer-events-none",
      {
        'm-pointer': showVideo,
        'pointer-events-auto': showVideo
      }
    )} 
    onClick={() => {
      console.log('fdsafdsajlf');
      
    }}>
    </div>
  );
} 

export default SectionTwoPlus;
import  { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './data-fox-combined.json';
const LottieComponent = ({ play, delay = 0}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (!play) {
      setIsPlaying(false)
      return
    }
    setTimeout(() => {
      setIsPlaying(true)
    }, delay)
  }, [play, delay])

  const handelMouseEnter = () => {
    if (delay !== 0 && !isPlaying) {
      setIsPlaying(true)
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: false, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='w-full h-full' onMouseEnter={handelMouseEnter.bind(null)}>
      <Lottie
        options={defaultOptions}
        height='100%'
        width='100%'
        isStopped={!isPlaying} 
      />
    </div>
  );
};

export default LottieComponent;

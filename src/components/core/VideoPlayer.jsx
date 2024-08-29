import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

import { cn } from '../../lib/utils';

const VideoPlayer = ({ url }) => {
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isErr, setIsErr] = useState(false)
  const playerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const video = playerRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        console.log('视频元数据加载完成');
        setLoading(false)
      });
    }

    return () => {
      video?.removeEventListener('loadedmetadata', null);
    };
  }, []);

  const togglePlayPause = () => {
    if (loading || !playerRef.current) return
    if (paused) {
      playerRef.current.play().then(() => setPaused(false)).catch(error => console.error(error));
    } else {
      playerRef.current.pause().catch(() => {});
      setPaused(true);
    }
  };

  return (
    <div className={cn("group relative h-full w-full flex items-center justify-center border-black", {'border-[1px]': loading })}>
       <video
          ref={playerRef} 
          src={'dfa'}
          controls={false}
          autoPlay={!paused}
          muted
          loop
          width="100%"
          height="100%"
          className=''
          onError={() => {
            setIsErr(true)
          }}
        />
      {!loading ? (
        <div className="absolute inset-0 text-xl">Video {isErr ? 'Error' : 'Loading'}...</div>
      ) : (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
          >
            <button
              className="text-white text-2xl m-pointer"
              onClick={togglePlayPause}
              disabled={loading} // 视频加载中时禁用播放按钮
            >
              {paused ? <FaPlay className='m-pointer' /> : <FaPause className='m-pointer' />}
            </button>
          </div>
      )}
    </div>
  );
};

export default VideoPlayer;
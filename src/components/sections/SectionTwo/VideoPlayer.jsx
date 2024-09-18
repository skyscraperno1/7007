import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

const VideoPlayer = ({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = false,
  controls = false,
  playsInline = true,
  showPlayPauseButton = true,
  showMuteButton = true,
  loadingText = 'Loading...',
  errorText = 'Video loading failed',
  isPlayingExternal,
  onPlayPause,
  onLoaded,
  onError
}) => {
  const [isPlaying, setIsPlaying] = useState(
    isPlayingExternal !== undefined ? isPlayingExternal : false
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMuted, setIsMuted] = useState(muted)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (isPlayingExternal !== undefined) {
      setIsPlaying(isPlayingExternal)
    }
  }, [isPlayingExternal])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error('Play was prevented:', error)
          setIsPlaying(false)
          onPlayPause && onPlayPause(false)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, isMuted, onPlayPause])

  const togglePlay = () => {
    const newPlayingState = !isPlaying
    setIsPlaying(newPlayingState)
    onPlayPause && onPlayPause(newPlayingState)
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  const handleLoadedData = () => {
    setIsLoading(false)
    onLoaded && onLoaded()
  }

  const handleError = (e) => {
    console.error(e)
    setError(errorText)
    setIsLoading(false)
    onError && onError(errorText)
  }

  return (
    <div
      className={`relative ${className} cursor-none z-100`}
      onClick={togglePlay}
      onMouseEnter={() => {
        setIsHovered(true)
        console.log(123)
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
          {loadingText}
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-200 bg-opacity-50">
          {error}
        </div>
      )}
      <video
        ref={videoRef}
        playsInline={playsInline}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        controls={controls}
        alt="7007 Video"
        onLoadedData={handleLoadedData}
        onError={handleError}
        onPlay={() => {
          setIsPlaying(true)
          onPlayPause && onPlayPause(true)
        }}
        onPause={() => {
          setIsPlaying(false)
          onPlayPause && onPlayPause(false)
        }}
        className="w-full h-full object-cover"
      >
        <source src={src} />
        Your browser does not support the video tag.
      </video>
      {(isHovered || !isPlaying) && !isLoading && !error && (
        <>
          {showPlayPauseButton && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              {isPlaying ? (
                <FaPause className="text-white text-4xl" />
              ) : (
                <FaPlay className="text-white text-4xl" />
              )}
            </div>
          )}
          {showMuteButton && (
            <div
              className="absolute bottom-2 right-2 transition-opacity duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-white text-xl bg-black bg-opacity-50 p-2 rounded-full cursor-none"
                onClick={toggleMute}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default VideoPlayer

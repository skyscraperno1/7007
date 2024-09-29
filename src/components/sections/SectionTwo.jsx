import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BoldTitle from "../core/BoldTitle";
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName';
import SmoothScroll from 'smooth-scroll';
import VideoPlayer from "./SectionTwo/VideoPlayser";

const SectionTwo = ({ currentSection, isMobile }) => {
  const RedStar = useResourceByName('RedStar.png', RESOURCE_TYPES.IMAGE);
  const PlayBtn = useResourceByName('PlayBtn.png', RESOURCE_TYPES.IMAGE)
  const Cover = useResourceByName('Cover.gif', RESOURCE_TYPES.IMAGE)

  const toVideo = () => {
    if (isMobile) {
      alert(123)
    } else {
      const scroll = new SmoothScroll();
      const duration = 1000; 
      scroll.animateScroll(window.innerWidth * 2, { speed: duration });
    }
  }
  
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const [leftTitleWidth, setLeftTitleWidth] = useState(0);
  const [rightTitleWidth, setRightTitleWidth] = useState(0);
  useEffect(() => {
    if (titleLeftRef.current) {
      const width = titleLeftRef.current.getBoundingClientRect().width;
      setLeftTitleWidth(width);
    }
  }, [titleLeftRef]);
  useEffect(() => {
    if (titleRightRef.current) {
      const width = titleRightRef.current.getBoundingClientRect().width;
      setRightTitleWidth(width);
    }
  }, [titleRightRef]);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (currentSection === 3) {
      gsap.set(sectionRef.current, {
        x: window.innerWidth,
      });
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  }, [currentSection]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(sectionRef.current, { x: 0 });
    gsap.set(imageRef.current, {
      clipPath: "inset(25% 25% 25% 25% round 2px)",
    });
    const width = window.innerWidth;
    const headerHeight = isMobile ? 123 : window.innerHeight * 0.1;
    if (!sectionRef.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: `${width - headerHeight} top`,
      end: `${2 * width - headerHeight} top`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(sectionRef.current, {
          x: progress * width,
        });
        if (imageRef.current) {
          const insetValue = 25 - 25 * progress;
          gsap.set(imageRef.current, {
            clipPath: `inset(${insetValue}% ${insetValue}% ${insetValue}% ${insetValue}% round 2px)`,
          });
        }
        if (titleLeftRef.current && titleRightRef.current) {
          const leftMoveDistance = progress * (width / 4 + leftTitleWidth / 2);
          const rightMoveDistance =
            progress * (width / 4 + rightTitleWidth / 2);
          gsap.set(titleLeftRef.current, {
            x: -leftMoveDistance,
          });
          gsap.set(titleRightRef.current, {
            x: rightMoveDistance,
          });
        }
      },
    });
  }, [leftTitleWidth, rightTitleWidth]);

  const _height = isMobile 
   ? { height: 'auto'}
   : { height: '100%'}

  return (
    <div ref={sectionRef} className="w-full h-full" id="section-two">
      {showVideo ? (
        <VideoPlayer />
      ) : (
        <div className="w-full h-full relative flex items-center">
          <div
            className="absolute z-10"
            ref={titleLeftRef}
            style={{ left: `calc(25% - ${leftTitleWidth + 10}px)` }}
          >
            <BoldTitle content="7007 Protocol" color="#FEED01" size="small" xs={isMobile}/>
            <img
              src={RedStar}
              className="absolute scale-50 2xl:scale-75"
              style={{
                top: `calc(-100% - ${isMobile ? '8' : '40'}px)`,
              }}
            />
          </div>
          <div
            ref={imageRef}
            className="zoom-image w-full h-full relative flex items-center justify-center"
            style={_height}
          >
            <img className="w-full" src={Cover} style={_height}/>
            <img className='play-btn w-auto h-1/6 m-pointer absolute' src={PlayBtn} onClick={toVideo}></img>
          </div>
          <div
            className="absolute right-0 z-10"
            ref={titleRightRef}
            style={{ right: `calc(25% - ${rightTitleWidth + 10}px)` }}
          >
            <BoldTitle content="AIGC Exchange" color="#FEED01" size="small" xs={isMobile}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionTwo;

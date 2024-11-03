import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import BoldTitle from "../core/BoldTitle";
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName';
import { cn } from "../../lib/utils";
import SectionTwoPlus from "./SectionTwoPlus";

const SectionTwo = ({ currentSection, isMobile, toNextPage, scrollDistance }) => {
  const RedStar = useResourceByName('RedStar.png', RESOURCE_TYPES.IMAGE);
  const PlayBtn = useResourceByName('PlayBtn.png', RESOURCE_TYPES.IMAGE)
  const Cover = useResourceByName('Cover.gif', RESOURCE_TYPES.IMAGE)
  const toVideo = () => {
    if (isMobile) {
      setShowVideo(true)
    } else {
      toNextPage()
    }
  }

  useEffect(() => {
    if (isMobile) return;
    const sc = Math.abs(scrollDistance);
    const startScroll = window.innerWidth; 
    const endScroll = window.innerWidth * 2; 
    const endVideo = window.innerWidth * 3; 
    if (sc <= startScroll) {
      gsap.set(sectionRef.current, { x: 0, y: 0 });
      gsap.set(imageRef.current, {
        clipPath: "inset(25% 25% 25% 25% round 2px)",
      });
      setShowVideo(false)
    } else if (sc > startScroll && sc < endScroll) {
      setShowVideo(false)
      const width = window.innerWidth;
      // 计算 progress
      const progress = (sc - startScroll) / window.innerWidth;
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
    } else if (sc >= endScroll && sc < endVideo) {
      setShowVideo(true)
    } else {
      setShowVideo(false)
    }
  }, [scrollDistance, isMobile]);
  
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
    if (isMobile) {
      if (currentSection !== 2) {
        setShowVideo(false);
      } 
      return
    }
  }, [currentSection]);

  const _height = isMobile 
   ? { height: 'auto'}
   : { height: '100%'}

  return (
    <div ref={sectionRef} className="w-full h-full" style={{ willChange: 'transform' }} id="section-two">
      {showVideo ? (
        <div className="w-full h-full relative flex items-center justify-center">
          <SectionTwoPlus isMobile={isMobile}></SectionTwoPlus>
        </div>
      ) : (
        <div className="w-full h-full relative flex items-center">
          {!isMobile && (
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
          )}
          <div
            ref={imageRef}
            className="zoom-image w-full h-full relative flex items-center justify-center"
            style={_height}
          >
            <img className="w-full" src={Cover} style={_height}/>
            <img className={cn('play-btn w-auto h-1/6 m-pointer absolute', {'h-1/3' : isMobile})} src={PlayBtn} onClick={toVideo}></img>
          </div>
          {
            !isMobile && (
              <div
              className="absolute right-0 z-10"
              ref={titleRightRef}
              style={{ right: `calc(25% - ${rightTitleWidth + 10}px)` }}
            >
              <BoldTitle content="AIGC Exchange" color="#FEED01" size="small" xs={isMobile}/>
            </div>
            )
          }
        </div>
      )}
    </div>
  );
};

export default SectionTwo;

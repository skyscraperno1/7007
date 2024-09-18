import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BoldTitle from "../core/BoldTitle";
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName';

const SectionTwo = ({ currentSection }) => {
  const RedStar = useResourceByName('RedStar.png', RESOURCE_TYPES.IMAGE);
  const Video = useResourceByName('clip.mp4', RESOURCE_TYPES.VIDEO);
  
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
      clipPath: "inset(25% 25% 25% 25% round 2px)", // 初始裁剪一半
    });
    const width = window.innerWidth;
    const headerHeight = window.innerHeight * 0.1;
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

  return (
    <div ref={sectionRef} className="w-full h-full" id="section-two">
      {showVideo ? (
        <video
          className="w-full h-full object-fill"
          src={Video}
          alt="7007 Video"
          autoPlay
          loop
          muted
        />
      ) : (
        <div className="w-full h-full relative flex items-center">
          <div
            className="absolute"
            ref={titleLeftRef}
            style={{ left: `calc(25% - ${leftTitleWidth + 10}px)` }}
          >
            <BoldTitle content="7007 A.I." color="#FEED01" size="small" />
            <img
              src={RedStar}
              className="absolute scale-50 2xl:scale-75"
              style={{
                top: "calc(-100% - 40px)",
              }}
            />
          </div>
          <div
            ref={imageRef}
            className="zoom-image w-full h-full bg-no-repeat bg-cover relative -z-10"
            style={{ backgroundImage: `url(/Section2/Cover.gif)` }}
          ></div>
          <div
            className="absolute right-0"
            ref={titleRightRef}
            style={{ right: `calc(25% - ${rightTitleWidth + 10}px)` }}
          >
            <BoldTitle content="NFT Protocol" color="#FEED01" size="small" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionTwo;

import { useState, useEffect } from "react";
import styled from "styled-components";
import ShakeBanner from "./ShakeBanner";
import useResourceByName, {
  RESOURCE_TYPES,
} from "../../../hook/useResourceByName";
import HoverImage from "../../core/HoverImg";
import Star from "../../core/Star";
import { motion } from "framer-motion";
const Title = styled.div`
  font-family: "IBM Plex Mono";
  z-index: 49;
  position: relative;
  text-align: center;
  color: ${(props) => props.color};
  will-change: 'color';
  text-shadow: -18px -10px 0px #000000;
  @media (min-width: 1537px) {
    text-shadow: -21px -12px 0px #000000;
  }
  transition: color 0.5s ease-in-out, text-shadow 0.5s ease-in-out;
`;

const TextSpan = styled.span`
  -webkit-text-stroke: 10px #000000;
  display: block;
  position: relative;
  white-space: nowrap;

  &:before {
    content: "${(props) => props.content}";
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-text-stroke: 0;
  }
`;

const MobileTitle = styled.div`
  font-family: "IBM Plex Mono";
  z-index: 49;
  position: relative;
  text-align: center;
  width: 100%;
  padding-left: 8px;
  font-weight: 900;
  will-change: 'color';
  color: ${(props) => props.color};
  text-shadow: -12px -10px 0px #000000;
  transition: color 0.5s ease-in-out, text-shadow 0.5s ease-in-out;
`;

const MobileSpan = styled.div`
  -webkit-text-stroke: 8px #000;
  font-size: 70px;
  position: relative;
  white-space: nowrap;
  line-height: 90px;
  &:before {
    content: "${(props) => props.content}";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    -webkit-text-stroke: 0;
  }
`;

function MainTitle({ isMobile }) {
  const BlackLogo = useResourceByName("BlackLogo.png", RESOURCE_TYPES.IMAGE);
  const Protocol = useResourceByName("7007Protocol.svg", RESOURCE_TYPES.IMAGE);
  const [color, setColor] = useState("#FEED01");
  const [popImg, setPopIndex] = useState(0);
  const [isHover, setHover] = useState(false);

  const getRandomNumber = (oldCount) => {
    const newCount = Math.floor(Math.random() * 3) + 1;
    if (newCount === oldCount) {
      return getRandomNumber();
    }
    return newCount;
  };

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      setPopIndex((prevNum) => {
        return getRandomNumber(prevNum);
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;

    if (!isHover) {
      if (interval) clearInterval(interval);
      let colorSequence = ["#FF0501", "#FEED01", "#03D25C"];
      let index = 0;
      interval = setInterval(() => {
        setColor(colorSequence[index]);
        index = (index + 1) % colorSequence.length;
      }, 500);
    } else {
      if (interval) clearInterval(interval);
      let colorSequence = ["#FF0501", "#03D25C"];
      if (color === "#FF0501") {
        colorSequence = colorSequence.reverse();
      }
      let index = 0;
      interval = setInterval(() => {
        setColor(colorSequence[index]);
        index = (index + 1) % colorSequence.length;
      }, 350);
    }

    return () => clearInterval(interval);
  }, [isHover]);

  return (
    <div className={isMobile ? "relative" : "relative"}>
      {isMobile ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="absolute top-[-105px] right-[-60px] scale-50">
            <Star color="#FEED01" rotate="4" />
          </div>
          <motion.img
              src={BlackLogo}
              alt="logo"
              initial={{ rotate: 0 }}
              whileTap={{ rotate: -20 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="m-pointer absolute top-[-126px] right-[44px] w-[65px] h-[65px]"
            />
          <div className="absolute z-50 top-[-70px] left-[50px] text-black scale-75">
            <ShakeBanner
              fontFamily="text-italic"
              bgColor="themeRed"
              duration={0.8}
            >
              Caution!
            </ShakeBanner>
          </div>
          <div
              className="absolute top-[138px] right-[-65px] z-10"
              style={{
                transform: "rotate(-20deg) scale(0.65)",
              }}
            >
              <HoverImage
                src={Protocol}
                alt="protocol"
                animation={3 === popImg}
              />
            </div>
            <div
              className="absolute top-[232px] left-[-50px] z-10"
              style={{
                transform: "scale(0.65)",
              }}
            >
              <HoverImage
                src={Protocol}
                alt="protocol"
                animation={1 === popImg}
              />
            </div>
            <div
              className="absolute top-[-36px] left-[-54px] z-10"
              style={{
                transform: "scale(0.65)",
              }}
            >
              <HoverImage
                src={Protocol}
                alt="protocol"
                animation={2 === popImg}
              />
            </div>
          <MobileTitle color={color}>
            {/* Text Part */}
            <MobileSpan
              className="m-pointer relative block z-40"
              content="Ultimate"
            >
              Ultimate
            </MobileSpan>
            <MobileSpan
              className="m-pointer relative block z-40"
              content="AIGC"
            >
              AIGC
            </MobileSpan>
            <MobileSpan
              className="m-pointer relative block z-40"
              content="Exchange"
            >
              Exchange
            </MobileSpan>
          </MobileTitle>
        </div>
      ) : (
        <>
          <div className="layer-one">
            <div className="absolute z-50 top-[-100px] left-[250px] 2xl:top-[-120px] 2xl:left-[315px]">
              <ShakeBanner
                fontMamily="text-italic"
                bgColor="themeRed"
                duration={0.8}
              >
                Caution!
              </ShakeBanner>
            </div>
            <motion.img
              src={BlackLogo}
              alt="logo"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: -20 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="m-pointer absolute top-[-90px] left-[470px] 2xl:top-[-105px] 2xl:left-[604px] scale-75 2xl:scale-100"
            />
          </div>
          <Title
            color={color}
            className="layer-two text-[7.5rem] leading-none 2xl:text-[160px] font-bold 2xl:font-black text-wrap flex items-center flex-col select-none relative"
          >
            <div>
              <div className="absolute top-[-132px] right-[171px] 2xl:top-[-140px] 2xl:right-[267px] z-50 scale-75 2xl:scale-100">
                <Star color="#FEED01" rotate="4" />
              </div>
              <div className="absolute top-[-94px] left-[-24px] 2xl:top-[-142px] 2xl:left-[-28px] scale-75 2xl:scale-100">
                <HoverImage
                  src={Protocol}
                  alt="protocol"
                  animation={1 === popImg}
                />
              </div>
              <TextSpan
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="m-pointer relative block z-40"
                content="Ultimate"
              >
                Ultimate
              </TextSpan>
            </div>
            <div>
              <div className="absolute top-[168px] left-[-109px]  2xl:top-[253px] 2xl:left-[-113px] z-50 scale-75 2xl:scale-100">
                <Star rotate="44" duration={10} />
              </div>
              <div className="absolute top-[178px] left-[58px] 2xl:top-[220px] 2xl:left-[130px] scale-75 2xl:scale-100">
                <HoverImage
                  src={Protocol}
                  alt="protocol"
                  animation={2 === popImg}
                />
              </div>
              <TextSpan
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="m-pointer relative block z-40"
                content="AIGC&ensp;Exchange"
              >
                AIGC&ensp;Exchange
              </TextSpan>
              <div
                className="absolute top-[18px] left-[636px] 2xl:top-[36px] 2xl:left-[857px] scale-75 2xl:scale-100"
                style={{
                  transform: "rotate(-20deg)",
                }}
              >
                <HoverImage
                  src={Protocol}
                  alt="protocol"
                  animation={3 === popImg}
                />
              </div>
            </div>
          </Title>
        </>
      )}
    </div>
  );
}

export default MainTitle;

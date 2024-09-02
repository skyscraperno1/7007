import { useState, useEffect } from "react";
import styled from "styled-components";
import ShakeBanner from "./ShakeBanner";
import BlackLogo from "/Logo/BlackLogo.png";
import Protocol from "/Section1/7007Protocol.svg";
import HoverImage from "../../core/HoverImg";
import Star from "../../core/Star";
const Title = styled.div`
  font-family: "IBM Plex Mono";
  z-index: 49;
  position: relative;
  text-align: center;
  color: ${(props) => props.color};
  text-shadow: -18px -10px 0px #000000;
  @media(min-width: 1537px) {
    text-shadow: -21px -12px 0px #000000;
  }
  transition: color 0.3s, text-shadow 0.3s;
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
`

function MainTitle() {
  const [color, setColor] = useState("#FEED01");
  const [popImg, setPopIndex] = useState(0)

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
    }, 1000)
    return () => clearInterval(timer); 
  }, [])

  useEffect(() => {
    let interval;
    let colorSequence = ["#FF0501", "#03D25C", "#FEED01"];
    let index = 0;

    interval = setInterval(() => {
      setColor(colorSequence[index]);
      index = (index + 1) % colorSequence.length; 
    }, 500);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="relative">
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
        <img
          src={BlackLogo}
          alt="logo"
          className="m-pointer absolute top-[-90px] left-[470px] 2xl:top-[-105px] 2xl:left-[604px] scale-75 2xl:scale-100"
        />
      </div>
      <Title
        color={color}
        className="layer-two text-[7.5rem] leading-none 2xl:text-[160px] font-bold 2xl:font-black text-wrap flex items-center flex-col select-none relative"
      >
        <div
        >
          <div className="absolute top-[-132px] right-[171px] 2xl:top-[-140px] 2xl:right-[267px] z-50 scale-75 2xl:scale-100">
            <Star color="#FEED01"  rotate='4' />
          </div>
          <div className="absolute top-[-94px] left-[-24px] 2xl:top-[-142px] 2xl:left-[-28px] scale-75 2xl:scale-100">
            <HoverImage src={Protocol} alt="protocol" animation={1 === popImg} />
          </div>
          <TextSpan
          className="m-pointer relative block z-40" content="Ultimate">
            Ultimate
          </TextSpan>
        </div>
        <div
        >
          <div className="absolute top-[168px] left-[-109px]  2xl:top-[253px] 2xl:left-[-113px] z-50 scale-75 2xl:scale-100">
            <Star rotate='44' />
          </div>
          <div className="absolute top-[178px] left-[58px] 2xl:top-[220px] 2xl:left-[130px] scale-75 2xl:scale-100">
            <HoverImage src={Protocol} alt="protocol" animation={2 === popImg}/>
          </div>
          <TextSpan 
            className="m-pointer relative block z-40" content="AIGC&ensp;Exchange">
            AIGC&ensp;Exchange
          </TextSpan>
          <div className="absolute top-[18px] left-[636px] 2xl:top-[36px] 2xl:left-[857px] scale-75 2xl:scale-100"
            style={{
              transform: 'rotate(-20deg)'
            }}
          >
            <HoverImage src={Protocol} alt="protocol" animation={3 === popImg}/>
          </div>
        </div>
      </Title>
    </div>
  );
}

export default MainTitle;

import React, { useRef } from "react";
import gsap from "gsap";
import { cn, MoveDir } from "../../../lib/utils";
import styled from "styled-components";
import BoldTitle from '../../core/BoldTitle'
import Button from "../../core/Button";
const BoxContainer = styled.div`
  grid-template-columns: 70% 30%;
  .right {
    grid-template-rows: 65% 35%;
    .right-bottom {
      grid-template-columns: 3fr 2fr;
    }
  }
  &  .box {
    border: 5px solid black;
    @media(max-width: 1537px) { 
      border-width: 4px;
    }
  }
`

const AnimatedBlock = ({ color, width = '100%', height = '100%', direction, title, num, children }) => {
  const blockRef = useRef(null);
  const handleHover = () => {
    MoveDir(blockRef.current, direction)
  };
  const handleMouseLeave = () => {
    gsap.to(blockRef.current, { x: 0, y: 0, opacity: 1 });
  };

  return (
    <div
      ref={blockRef}
      className={cn("box flex justify-center items-center relative", color)}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      style={{
        width,
        height
      }}
    >
      <div className="text-center">
        <h5 className="text-2xl 2xl:text-3xl">{title}</h5>
        <h4 className="text-5xl 2xl:text-7xl">{num}</h4>
      </div>
      {children}
    </div>
  );
};

const ColorBlock = () => {
  return (
    <BoxContainer className="h-full grid select-none">
      <AnimatedBlock color="bg-themeGreen"  direction="left" title='ƒ(A.I.) ℝ launch' num='70.07%'> 
        <div className="absolute top-[-50px] left-[-50px] -rotate-[13deg]">
          <BoldTitle content='$TOOT' color="#FEED01"/>
        </div>
        <div className='flex justify-start flex-col items-start absolute bottom-[-36px] left-[-50px]'>
          <BoldTitle content='Total supply:' size='small' color="#FF0501" italic/>
          <BoldTitle content='Total allocation from' size='small' color="#FF0501" italic/>
          <BoldTitle content='ƒ(A.I.) ℝ launch / 0.7007' size='small' color="#FF0501" italic/>
        </div> 
      </AnimatedBlock>
      <div className="right h-full grid">
      <AnimatedBlock color="bg-themeRed"  direction="up" title='Ecosystem reward' num='13.93%'>
        <div className="absolute top-[-40px] 2xl:top-[-50px] right-[-50px]">
          <Button kls="px-8 py-5 bg-themeGreen" duration={0}>
            Buy the token
          </Button>
        </div>
      </AnimatedBlock>
        <div className="right-bottom grid">
          <AnimatedBlock color="bg-themeYellow" direction="down" title='LP' num='10%'/>
          <AnimatedBlock color="bg-themeGreen" width="calc(100% + 44px)" height="calc(100% + 44px)" direction="rightDown" title='Airdrop' num='6%' />
        </div>
      </div>
    </BoxContainer>
  );
};
export default ColorBlock;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cn } from '../../lib/utils'
const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
 &.startAnimation {
  &:before {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    transition-delay: 0.1s;
  }

  &:after {
    opacity: 1;
    visibility: visible;
    transform: translateX(0); 
    transition-delay: 0.2s;
  }
 }
 &.endAnimation {
  &:before {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-10px);
    transition-delay: 0.2s;
  }

  &:after {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-10px);
    transition-delay: 0.1s;
  }
 }
 
  img {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 2;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${(props) => props.$src}) no-repeat center center;
    background-size: cover;
    opacity: 0; 
    visibility: hidden; 
    pointer-events: none;
    transition: opacity 0s ease, visibility 0s ease, transform 0.1s ease;
  }

  &:before {
    top: 10px;
    left: 10px;
    z-index: 1;
    transform: translateX(-10px); 
    transition-delay: 0.1s; 
  }

  &:after {
    top: 20px;
    left: 20px;
    z-index: 0;
    transform: translateX(-10px); 
    transition-delay: 0.2s;
  }
`;

function HoverImage({ src, alt, animation }) {
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    setStart(animation)
  }, [animation]);

  return (
    <ImageWrapper $src={src} onMouseEnter={(() => {
      setStart(true)
    })} 
    onMouseLeave={(() => {
      setStart(false)
    })} 
    className={cn("m-pointer", {'startAnimation': start, 'endAnimation': !start })}>
      <img src={src} alt={alt} />
    </ImageWrapper>
  );
}

export default HoverImage;

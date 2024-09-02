import { useState, useEffect } from "react";
import CursorSrc from '/Pointers/cursor.png';
import styled from 'styled-components';

const CursorWrapper = styled.div.attrs(props => ({
  style: {
    transform: `translateX(${props.$offset.x}px) translateY(${props.$offset.y}px) scale(2) rotate(${props.$offset.deg}deg)`,
    backgroundImage: `url(${CursorSrc})`,
    top: props.$y,
    left: props.$x,

  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  pointer-events: none;
  z-index: 10000;
  transform-origin: calc(50% -9px) calc(50% + 4px);

  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  will-change: transform;
  user-select: none;
`;

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setPointer] = useState(false);
  const [offset, setOffset] = useState({
    x: -3,
    y: 7,
    deg: 180
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const correctedX = e.clientX + offset.x;
      const correctedY = e.clientY + offset.y;
      setPosition({ x: correctedX, y: correctedY });
    };

    const handleMouseOver = (e) => {
      if (e.target.classList.contains('m-pointer') || (e.target.parentNode && e.target.parentNode?.classList?.contains('m-pointer'))) {
        setPointer(true);
        setOffset({
          x: -30,
          y: 9,
          deg: 220
        })
      } else {
        setOffset({
          x: -3,
          y: 7,
          deg: 180
        })
        setPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []); // 将 offset 作为依赖项传入 useEffect

  return (
    <CursorWrapper id="cursor" $x={position.x} $y={position.y} $pointer={isPointer ? 1 : 0}  $offset={offset}/>
  );
};

export default Cursor;

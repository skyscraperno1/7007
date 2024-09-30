import { useState, useEffect } from "react";
import styled from 'styled-components';
import useResourceByName, { RESOURCE_TYPES } from "../../hook/useResourceByName";

const CursorWrapper = styled.div.attrs(props => ({
  style: {
    transform: `translateX(${props.$offset.x}px) translateY(${props.$offset.y}px) scale(2) rotate(${props.$offset.deg}deg)`,
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
  const CursorSrc = useResourceByName('cursor.png', RESOURCE_TYPES.IMAGE);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setPointer] = useState(false);
  const [offset, setOffset] = useState({
    x: -26,
    y: -1,
    deg: 0
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const correctedX = e.clientX + offset.x;
      const correctedY = e.clientY + offset.y;
      setPosition({ x: correctedX, y: correctedY });
      if (e.target.classList.contains('m-pointer') || (e.target.parentNode && e.target.parentNode?.classList?.contains('m-pointer'))) {
        setPointer(true);
        setOffset({
          x: -3,
          y: 13,
          deg: -40
        })
      } else {
        setOffset({
          x: -26,
          y: -1,
          deg: 0
        })
        setPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <CursorWrapper id="cursor" $x={position.x} $y={position.y} $pointer={isPointer ? 1 : 0}  $offset={offset} style={{
      backgroundImage: `url(${CursorSrc})`
    }}/>
  );
};

export default Cursor;

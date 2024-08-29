import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 65px;
  z-index: 999;
  overflow-y: hidden;
  border-right: 5px solid black;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  writing-mode: vertical-rl;
  text-orientation: sideways;
  font-weight: bold;
  white-space: nowrap;
`;

function ScrollSide({ scrollY }) {
  const textWrapperRef = useRef(null);

  useEffect(() => {
    const textWrapper = textWrapperRef.current;

    const updatePosition = () => {
      if (textWrapper) {
        const speed = 1.7;
        textWrapper.style.transform = `translateY(${scrollY * speed}px)`;
      }
    };
    updatePosition()
  }, [scrollY]);

  return (
    <Sidebar className="text-black bg-white uppercase select-none">
      <div ref={textWrapperRef} className="will-change-transform flex w-full flex-col items-center">
        {Array.from({ length: 20 }).map((_, index) => (
          <Text className="text-3xl 2xl:text-4xl" key={index}>Ultimate AIGC Exchange&nbsp;</Text>
        ))}
      </div>
    </Sidebar>
  );
}

export default ScrollSide;

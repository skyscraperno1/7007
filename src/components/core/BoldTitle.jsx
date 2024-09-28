import styled from "styled-components";
import { cn } from "../../lib/utils";

const SpanWrapper = styled.span`
  display: block;
  position: relative;
  text-shadow: ${(props) =>
      props.$isBig ? "-12px -8px 0px #000000;" : "-5px -4px 0px #000000;"}
    @media (min-width: 1537px) {
    text-shadow: ${(props) =>
      props.$isBig ? "-13px -9px 0px #000000;" : "-5px -4px 0px #000000;"};
  }
  -webkit-text-stroke: ${(props) =>
    props.$isBig ? "8px #000000" : "5px #000000"};

  &:before {
    content: "${(props) => props.content}";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 100%;
    -webkit-text-stroke: 0;
  }
`;
const BoldTitle = ({
  content,
  color,
  size = "big",
  italic = false,
  xs = false,
  medium = false,
  kls
}) => {
  const isBig = size === "big";
  
  const xsStyle = xs 
    ? {WebkitTextStroke: '3px #000', textShadow: '-3px -2.5px 0px #000'}
    : {} 
  const mediumStyle = medium 
    ? {textShadow: '-8px -5px 0px #000'}
    : {}
  return (
    <SpanWrapper
      className={cn(
        "flex select-none flex-center text-center whitespace-nowrap z-10",
        `${
          isBig ? "text-7xl 2xl:text-8xl uppercase" : "text-4xl 2xl:text-4xl"
        }`,
        { italic: italic },
        { "text-xl": xs },
        { "text-6xl": medium}
        ,kls
      )}
      style={{
        color: color,
        ...xsStyle,
        ...mediumStyle
      }}
      $isBig={isBig}
      content={content}
    >
      {content}
    </SpanWrapper>
  );
};

export default BoldTitle;

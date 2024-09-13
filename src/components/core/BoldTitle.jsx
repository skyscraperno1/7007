import styled from "styled-components";
import { cn } from "../../lib/utils";

const SpanWrapper = styled.span`
  z-index: 49;
  display: block;
  position: relative;
  white-space: nowrap;
  text-align: center;
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
const BoldTitle = ({ content, color, size = "big", italic = false }) => {
  const isBig = size === "big";

  return (
    <SpanWrapper
      className={cn(
        "flex select-none flex-center",
        `${
          isBig ? "text-7xl 2xl:text-8xl uppercase" : "text-3xl 2xl:text-4xl"
        }`,
        { italic: italic }
      )}
      style={{
        color: color,
      }}
      $isBig={isBig}
      content={content}
    >
      {content}
    </SpanWrapper>
  );
};

export default BoldTitle;

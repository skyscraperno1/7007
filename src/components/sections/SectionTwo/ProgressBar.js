import styled from "styled-components";

export const ProgressBar = styled.input.attrs(props => ({
  type: 'range',
  style: {
    background: `linear-gradient(to right, rgb(248 250 252) ${props.$progress}%, #353535 ${props.$progress}%)`
  }
}))`
  width: 100%;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  outline: none;
  transition: background 0.2s;
  cursor: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0;
    height: 0;
  }

  &::-moz-range-thumb {
    width: 0;
    height: 0;
  }
`;
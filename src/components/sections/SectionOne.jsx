import styled from 'styled-components';
import MainTitle from './SectionOne/MainTitle';
import CircleElement from '../../assets/3dElement.png';
const SectionWrapper = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to right, #25AA34 2px, transparent 1px),
                      linear-gradient(to bottom, #25AA34 2px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }
`;

const ElementBg = styled.div`
  background-image: url(${CircleElement});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 35%;
`;

const SectionOne = () => {

  return (
    <>
      <SectionWrapper id="section-one" className='relative h-full w-full bg-themeGreen overflow-hidden z-[90]'>
        <ElementBg className='relative z-10 h-full w-screen flex items-center justify-center'>
          <MainTitle />
        </ElementBg>
      </SectionWrapper>
    </>
  );
};

export default SectionOne;

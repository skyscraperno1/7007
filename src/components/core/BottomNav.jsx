import styled, { css } from 'styled-components';
import ArrowIcon from '/Pointers/cursor-icon.png';

const TriangleShape = styled.div`
  width: 0;
  height: 0;
  border-left: 50vw solid transparent;
  border-right: 50vw solid transparent;
  border-bottom: 10vh solid ${(props) => props.$isWhite ? 'white' : 'transparent'};
  position: relative;
  ${(props) =>
    props.$isLast &&
    css`
      border-bottom: 10vh solid transparent !important;
    `}
`;
const BottomNav = ({ page }) => {
    const isLast = page === 6
    const isFirst = page === 1
    return (
        <div className="select-none absolute overflow-hidden bg-transparent w-full bottom-0 left-0 z-[100]">
            <TriangleShape $isWhite={isFirst} $isLast={isLast} className='flex justify-center items-center'>
                <div className='items-center text-bold 2xl:text-black font-bold mt-20 2xl:mt-28 hidden sm:flex'>
                    {
                        !isFirst && 
                        <div className='w-12 h-8 mb-2 py-1 hidden md:inline' style={{ transform: 'rotateY(180deg)' }}>
                            <img src={ArrowIcon} alt="Arrow Icon" className='w-full h-full ml-2' />
                        </div>
                    }
                    <div className='h-8 uppercase text-2xl mb-2 whitespace-nowrap leading-8'>Scroll to {!isLast ? 'next' : 'last'} page</div>
                    {
                        !isLast &&
                        <div className='w-12 h-8 mb-2 py-1 hidden md:inline'>
                            <img src={ArrowIcon} alt="Arrow Icon" className='w-full h-full ml-2' />
                        </div>
                    }
                </div>
            </TriangleShape>
        </div>
    )
}

export default BottomNav;
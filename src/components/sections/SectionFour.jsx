import bg from '../../assets/page-four-bg.png'
import ColorBlock from './SectionFour/ColorBlock'
import styled from 'styled-components'

const BlocksWrapper = styled.div`
    height: 70%;
    width: 70%;
  @media(min-width: 1537px) { 
    height: 80%;
    width: 80%;
  }
`
const SectionFour = () => {
    return (
        <>
        <div id="section-four" className='h-full w-full shrink-0 px-10 flex items-center justify-center' style={{ backgroundImage: `url(${bg})` }}>
            <BlocksWrapper id="color-block">
              <ColorBlock />
            </BlocksWrapper>
        </div>
      </>
    )
}

export default SectionFour;

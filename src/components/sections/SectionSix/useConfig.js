import styled from "styled-components";
export const makeCoverAnimation = (clipPath) => {
  return {
    hidden: { clipPath, pointerEvents: 'none', opacity: 0 },
    visible: {
        pointerEvents: 'auto',
        opacity: 1,
        clipPath: 'inset(0 0 0 0)',
        transition: {
          duration: .5,
          ease: 'easeInOut'
        }
    }
  };
}

export const makeBtnAnimation = (x, y, isMobile = false) => {
  return {
    shake: {
      rotate: [0, 6, 0, -6, 0],
      transition: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
    },
    hover: { 
      // rotate: [0, 3, 0, 3, 0],
      scale: isMobile ? 1 : 4,
      x,
      y,
      transition: {
        rotate: {
          duration: 0.25, 
          repeat: Infinity, 
          repeatType: 'loop', 
          ease: 'linear' 
        },
        scale: {
          delay: .75,
          duration: 0.1,
          ease: 'linear'
        },
        x: {
          delay: .25,
          duration: .5,
          ease: 'easeInOut'
        },
        y: {
          delay: .25,
          duration: .5,
          ease: 'easeInOut'
        }
      }
    }
  }
}

export const BoxContainer = styled.div`
  grid-template-columns: 70% 30%;
  .right {
    grid-template-rows: 65% 35%;
    .right-bottom {
      grid-template-columns: 3fr 2fr;
    }
  }
`
export const MobileBoxContainer = styled.div`
  grid-template-columns: 60% 40%;
  .right {
    grid-template-rows: 65% 35%;
    .right-bottom {
      grid-template-columns: 3fr 2fr;
    }
  }
`
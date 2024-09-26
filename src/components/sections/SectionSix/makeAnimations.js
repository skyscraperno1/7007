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

export const makeBtnAnimation = (x, y) => {
  return {
    shake: {
      rotate: [0, 3, 0, -3, 0],
      transition: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
    },
    hover: { 
      rotate: [0, 3, 0, -3, 0],
      scale: 4,
      x,
      y,
      zIndex: 60,
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
          ease: 'easeInOut'
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
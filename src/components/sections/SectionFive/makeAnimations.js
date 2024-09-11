export const makeCoverAnimation = (clipPath) => {
  return {
    hidden: { clipPath, pointerEvents: 'none', opacity: 0 },
    visible: {
        pointerEvents: 'auto',
        opacity: 1,
        clipPath: 'inset(0 0 0 0)',
        transition: {
          duration: 1,
          ease: 'easeInOut'
        }
    }
  };
}

export const makeBtnAnimation = (x, y) => {
  return {
    shake: {
      rotate: [0, 5, 0, -5, 0],
      transition: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
    },
    hover: { 
      rotate: 0,
      scale: 2.5,
      x,
      y,
      transition: {
        rotate: {
          delay: 0
        },
        scale: {
          delay: 1.2,
          duration: 0.5,
          ease: 'easeInOut'
        },
        x: {
          delay: .4,
          duration: .8,
          ease: 'easeInOut'
        },
        y: {
          delay: .4,
          duration: .8,
          ease: 'easeInOut'
        }
      }
    }
  }
}
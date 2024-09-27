export const createUseX = (screenWidth, ImgWidth) => {
  return function(x) {
    const result = screenWidth * x - ImgWidth / 2;
    return Math.max(0, Math.min(result, screenWidth - ImgWidth));
  }
}

export const createUseY = (screenHeight, ImgHeight) => {
  return function(y) {
    const result = screenHeight * y - ImgHeight / 2;
    return Math.max(0, Math.min(result, screenHeight - ImgHeight))
  }
}

export const calDelay = (sequence) => {
  return sequence * 0.5;
}
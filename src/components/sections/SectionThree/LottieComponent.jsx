import animationData from './data-fox-combined.json'
import Lottie from 'react-lottie';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData, // 你的 Lottie 动画 JSON 数据
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const LottieComponent = () => {
  return <Lottie options={defaultOptions} height='100%' width='100%' />
}

export default LottieComponent
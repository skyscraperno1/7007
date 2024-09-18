import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import styled from "styled-components";

const BannerWrapper = styled(motion.div)`
    border-width: 4px;
    @media(min-width: 1537px) {
        border-width: 5px;
    }
`;
const ShakeBanner = ({children, bgColor = 'themeRed', fontFamily = ''}) => {
    return (
        <BannerWrapper 
            animate={{ x: [0, 5, 0, -5, 0] }}
            transition={{ duration: 0.25, repeat: Infinity, repeatType: 'loop' }}
            className={twMerge('w-fit h-fit select-none flex items-center justify-center p-2 uppercase border-solid border-black m-pointer text-4xl 2xl:text-5xl', `bg-${bgColor}`, fontFamily)}
        >
            {children}
        </BannerWrapper>
    )
}

export default ShakeBanner;

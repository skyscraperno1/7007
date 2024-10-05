import { motion } from 'framer-motion';
import BoldTitle from '../../core/BoldTitle';
const themeGreen = '#03D25C';
const themeRed = '#FF0501';
const themeYellow = '#FEED01';
const titles = [
    [
        {color: themeRed, text: 'trade with'},
        {color: themeRed, text: 'efficiency'},
    ],
    [
        {color: themeGreen, text: 'up to'},
        {color: themeRed, text: 'millions'},
        {color: themeGreen, text: 'and'},
        {color: themeYellow, text: 'unique'},
    ],
    [
        {color: themeYellow, text: 'trade with'},
        {color: themeYellow, text: 'efficiency'},
    ],
    [
        {color: themeRed, text: 'up to'},
        {color: themeYellow, text: 'millions'},
        {color: themeRed, text: 'and'},
        {color: themeGreen, text: 'unique'},
    ],
    [
        {color: themeRed, text: 'trade with'},
        {color: themeRed, text: 'efficiency'},
    ],
    [
        {color: themeYellow, text: 'up to'},
        {color: themeGreen, text: 'millions'},
        {color: themeYellow, text: 'and'},
        {color: themeRed, text: 'unique'},
    ],
    [
        {color: themeGreen, text: 'trade with'},
        {color: themeGreen, text: 'efficiency'},
    ],
]

const AnimationText = ({ showText, currentTextIndex, isMobile }) => { 

    return showText ? (
        <>
            {titles.map((item, index) => (
                index === currentTextIndex && (
                    <motion.div
                        key={index}
                        initial={{ display: 'none' }}
                        animate={{ display: 'block', delay: 0.1 }}
                        exit={{ display: 'none' }}
                    >
                        {item.map(({ color, text }, i) => (
                            <BoldTitle key={i} color={color} content={text} medium={isMobile}/>
                        ))}
                    </motion.div>
                )
            ))}
        </>
    ) : null; 
};

export default AnimationText;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BoldTitle from '../../core/BoldTitle';
const themeGreen = '#03D25C';
const themeRed = '#FF0501';
const themeYellow = '#FEED01';
const titles = [
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

const AnimationText = ({ showText, showCallback, emitIndex }) => { 
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [secondTextShown, setSecondTextShown] = useState(false);
    
    useEffect(() => {
        if (!showText) return; 

        let intervalTime = 1000;
        if (currentTextIndex === 1 && !secondTextShown) {
            intervalTime = 2000;
            showCallback()
        }

        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => {
                if (prevIndex === 1) {
                    setSecondTextShown(true);
                }
                emitIndex(prevIndex)
                return (prevIndex + 1) % titles.length;
            });
        }, intervalTime);

        return () => interval && clearInterval(interval);
    }, [showText, currentTextIndex, secondTextShown]); 


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
                            <BoldTitle key={i} color={color} content={text} />
                        ))}
                    </motion.div>
                )
            ))}
        </>
    ) : null; 
};

export default AnimationText;

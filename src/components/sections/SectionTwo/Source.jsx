import { ReactLenis } from "lenis/dist/lenis-react";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
    useMotionValueEvent
} from "framer-motion";
import Cover from '/Section2/Cover.gif'
import Video from '/Section2/clip.mp4'
import { useEffect, useState } from "react";
import BoldTitle from "../../core/BoldTitle";
import RedStar from '/Stars/RedStar.png'
export const SmoothScrollHero = () => {
    return (
        <ReactLenis root options={{ lerp: 0.05 }}>
            <Hero />
        </ReactLenis>
    );
};

const Hero = () => {
    return (
        <div
            style={{ height: `300vh` }}
            className="relative w-full"
        >
            <CenterImage />
        </div>
    );
};

const CenterImage = () => {
    const { scrollY } = useScroll();
    const [shouldShowVideo, setShouldShowVideo] = useState(false);
    const [leftWidth, setLeftWidth] = useState(['19%', '-10%'])
    const [rightWidth, setRightWidth] = useState(['15%', '-13%'])
    const [showPage, setShowPage] = useState(false)
    const startY = window.innerWidth
    const endY = startY + window.innerHeight * 3
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!showPage) {
            setShowPage(true)
        }
        if (latest > startY + window.innerHeight) {
            setShouldShowVideo(true)
        } else {
            setShouldShowVideo(false)
        }
    })

    useEffect(() => {
        console.log(leftWidth);
        
    }, [leftWidth])

    const clip1 = useTransform(scrollY, [startY, startY + window.innerHeight], [30, 0]);
    const clip2 = useTransform(scrollY, [startY, startY + window.innerHeight], [70, 100]);
    const textLeft = useTransform(scrollY, [startY, startY + window.innerHeight], [...leftWidth])
    const textRight = useTransform(scrollY, [startY, startY + window.innerHeight], [...rightWidth]);

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    const top = useTransform(scrollY,
        [startY, endY],
        [0, endY - startY],
    )

    const setWidth = (w, position) => {
        if (position === 'left') {
            w = w + 24
            const start  = (window.innerWidth * 0.3 - w) + 'px'
            const end = -w + 'px'
            setLeftWidth([start, end])
        } else {
            w = w + 30
            const start  = (window.innerWidth * 0.3 - w) + 'px'
            const end = -w + 'px'
            setRightWidth([start, end])
        }
    }

    return (
        <motion.div
            className="absolute top-0 h-screen w-full flex justify-center items-center"
            style={{
                top,
            }}
        >
            <div className="z-10 w-full">
                <motion.div className="absolute"
                    style={{
                        left: textLeft,
                    }}
                >
                    <BoldTitle showPage={showPage} content="7007 A.I." color="#FEED01" size="small" useWidth={(w) => {
                       setWidth(w, 'left')
                    }}/>
                    <img src={RedStar} className="absolute scale-50 2xl:scale-75" style={{
                        top: 'calc(-100% - 40px)'
                    }}/>
                </motion.div>
                <motion.div
                    style={{
                        right: textRight
                    }}
                    className="absolute">
                    <BoldTitle content="NFT Protocol" color="#FEED01" size="small" showPage={showPage} useWidth={(w) => {
                       setWidth(w, 'right')
                    }}/>
                </motion.div>
            </div>
            <motion.div
                className="absolute top-0 h-full w-full flex justify-center items-center"
                style={{
                    clipPath,
                }}
            >

                {shouldShowVideo ? (
                    <motion.video
                        className="w-full h-full object-cover"
                        src={Video}
                        alt="7007 Video"
                        autoPlay
                        loop
                        muted
                        transition={{ duration: 0.5 }}
                        style={{ opacity: 1 }}
                    />
                ) : (
                    <motion.img
                        className="w-full h-full object-cover"
                        src={Cover}
                        alt="7007 Img"
                        transition={{ duration: 0.5 }}
                        style={{ opacity: 1 }}
                    />
                )}
            </motion.div>
        </motion.div>

    );
};






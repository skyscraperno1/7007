import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import BottomNav from './BottomNav';
import Popover from './Popover'
export default function Scroll({ sections, isMobile, isLoading }) {
    const sectionRef = useRef(null)
    const triggerRef = useRef(null)
    const [currentSection, setCurrentSection] = useState(0)
 
    const [show, setShow] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false);
    let timeoutId;
    const handleScroll = () => {
        setIsScrolling(true);
        setShow(false)
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null
        }
        timeoutId = setTimeout(() => {
            setIsScrolling(false);
        }, 1000); 
    }
    const [popContent, setPopContent] = useState({
        bg: 'themeGreen',
        text: ''
    })
    gsap.registerPlugin(ScrollTrigger)
    useEffect(() => {
        if (isLoading || isScrolling) return;
        if (currentSection === 1) {
            setTimeout(() => {
                setPopContent({
                    bg: 'themeGreen',
                    text: 'Product Launch Coming Soon! Secure Your Spot On The Waitlist Now.'
                })
                setShow(true);
            }, 3000);
        } else if (currentSection === 4) {
            setTimeout(() => {
                setPopContent({
                    bg: "themeRed",
                    text: "Are you sure you don't want to join?"
                })
                setShow(true);
            }, 2000);
        } else if (currentSection === 7) {
            setTimeout(() => {
                setPopContent({
                    bg: 'themeGreen',
                    text: 'This is the final call, join or you’ll regret!'
                })
                setShow(true);
            }, 2000);
        }
    }, [currentSection, isLoading, isMobile, isScrolling])
    useEffect(() => {
        function getScrollAmount() {
            let sectionWidth = sectionRef.current.scrollWidth;
            return -(sectionWidth - window.innerWidth);
        }
        const tween = gsap.to(sectionRef.current, {
            x: getScrollAmount,
            duration: 3,
            ease: "none",
        });

        let scrollTween = ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            snap: 1 / (sections.length - 1),
            animation: tween,
            // ease: 'none',
            pin: true,
            scrub: 0.05,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                handleScroll()
                const progress = self.progress;
                const currentSection = Math.floor(progress * (sections.length - 1)) + 1;
                setCurrentSection(currentSection)
            },
        })
        return () => {
            scrollTween?.kill()
        }
    }, [])
    const wrapperStyle = isMobile
        ? { height: 'calc(100% - 123px)', width: '100vw', marginTop: '123px' }
        : { height: '90vh', width: 'calc(100% - 65px)', marginTop: '10vh', marginLeft: '65px' }
    const getPageIndex = (page) => (page === 1
        ? { position: 'relative', zIndex: 90 }
        : {})
    return (
        <div className='overflow-hidden'>
            <div ref={triggerRef}>
                <div ref={sectionRef} className="flex z-40" style={{ width: `${sections.length * 100}vw` }}>
                    {
                        sections.map((section) => {
                            const { Component, page } = section;
                            return (
                                <section key={page} className='relative w-screen h-screen' id={`section-${page}`} style={getPageIndex(page)}>
                                    <div className='h-full w-full relative z-40' style={wrapperStyle}>
                                        <Component currentSection={currentSection} isMobile={isMobile} />
                                        <Popover show={show} close={() => { setShow(false) }} background={popContent.bg}>
                                            {popContent.text}
                                        </Popover>
                                    </div>
                                    <BottomNav page={page} isMobile={isMobile} />
                                </section>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

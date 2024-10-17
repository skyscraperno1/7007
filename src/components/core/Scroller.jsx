import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import BottomNav from './BottomNav';
import Popover from './Popover'
import WalletPopover from './WalletPopover';
export default function Scroll({ sections, isMobile, isLoading }) {
    const sectionRef = useRef(null)
    const triggerRef = useRef(null)
    const ref = useRef(null)
    const [currentSection, setCurrentSection] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false);
    let timeoutId;
    const handleScroll = () => {
        setIsScrolling(true);
        ref.current.clearTimer()
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null
        }
        timeoutId = setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    }

    gsap.registerPlugin(ScrollTrigger)

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

    const getWrapperStyle = (flag) => {
        return isMobile
            ? { height: 'calc(100% - 123px)', width: '100vw', marginTop: '123px' }
            : flag ? { height: '90vh', width: '100%', marginTop: '10vh' } : { height: '90vh', width: 'calc(100% - 65px)', marginTop: '10vh', marginLeft: '65px' }
    }
    const getPageIndex = (page) => (page === 1
        ? { position: 'relative', zIndex: 90 }
        : {})
    const [showWallet, setShowWallet] = useState(false)

    const lastPageShowWallet = () => {
        sessionStorage.setItem('last_pop', 'true')
        setShowWallet(true)
    }
    const handleClose = () => {
        setShowWallet(false)
        sessionStorage.removeItem('last_pop')
    }
    return (
        <div className='overflow-hidden'>
            <div ref={triggerRef}>
                <div ref={sectionRef} className="flex z-40" style={{ width: `${sections.length * 100}vw` }}>
                    {
                        sections.map((section) => {
                            const { Component, page } = section;
                            return (
                                <section key={page} className='relative w-screen h-screen' id={`section-${page}`} style={getPageIndex(page)}>
                                    <div className='h-full w-full relative z-40' style={getWrapperStyle(page === 3)}>
                                        <Component currentSection={currentSection} isMobile={isMobile} updateShowWallet={lastPageShowWallet}/>
                                    </div>
                                    <BottomNav page={page} isMobile={isMobile} />
                                </section>
                            )
                        })
                    }
                </div>
            </div>
            <Popover ref={ref} isLoading={isLoading} isMobile={isMobile} isScrolling={isScrolling} currentSection={currentSection} showWallet={() => {
                setShowWallet(false)
            }}/>
            <WalletPopover show={false} onClose={handleClose} isMobile={false}/>
        </div>

    )
}

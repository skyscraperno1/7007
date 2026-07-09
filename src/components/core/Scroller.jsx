import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import BottomNav from './BottomNav';
import Popover from './Popover'
// import WalletPopover from './WalletPopover';
export default function Scroll({ sections, isLoading, setScrollDistance, scrollDistance, triggerHome, hasDiscord }) {
    const sectionRef = useRef(null)
    const [currentSection, setCurrentSection] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    let scrollDelta = 0 // 滚动累计值
    
    useEffect(() => {
        triggerScroll(0)
    }, [triggerHome])

    const triggerScroll = (newSection) => {
        setIsScrolling(true);
        gsap.to(sectionRef.current, {
            x: -newSection * window.innerWidth,
            duration: 1.25,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentSection(newSection);
                setTimeout(() => {
                    setIsScrolling(false);
                }, 500)
            },
            onUpdate: () => {
                setShowWallet(false)
                const currentX = gsap.getProperty(sectionRef.current, "x"); 
                setScrollDistance(currentX)
            }
        });
    }
    const listenScroll = (e) => {
        e.preventDefault();
        scrollDelta += e.deltaY
        if (isScrolling || !!sessionStorage.getItem('walletPopover')) return
        if (Math.abs(scrollDelta) >= 1) {
            const direction = scrollDelta > 0 ? 1 : -1
            let newSection = currentSection + direction

            if (newSection < 0) newSection = 0
            if (newSection >= sections.length) newSection = sections.length - 1

            if (newSection !== currentSection) {
                triggerScroll(newSection)
            }
            scrollDelta = 0
        }
    }
    
    const toNextPage = () => {
        listenScroll({
            preventDefault: () => {},
            deltaY: 1
        })
    }

    useEffect(() => {
        window.addEventListener("wheel", listenScroll, { passive: false })
        return () => {
            window.removeEventListener("wheel", listenScroll)
        }
    }, [currentSection, isScrolling])

    const getWrapperStyle = (page) => {
        return page === 3 ? { height: '90vh', width: '100%', marginTop: '10vh' } : { height: '90vh', width: 'calc(100% - 65px)', marginTop: '10vh', marginLeft: '65px', zIndex: page === 2.1 ? -10 : undefined }
    }
    const getPageIndex = (page) => (page === 1
        ? { position: 'relative', zIndex: 90 }
        : {})

    const popoverRef = useRef(null)
    const [showWallet, setShowWallet] = useState(false)
    
    useEffect(() => {
        if (!isLoading && hasDiscord) {
            // wait for loading animation finish
            setTimeout(() => {
                popoverRef.current?.clearTimer()
                setShowWallet(true)
            }, 1000)
        }
    }, [isLoading, hasDiscord])

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
            <div ref={sectionRef} className="flex z-40" style={{ width: `${sections.length * 100}vw` }} id="scroll-trigger">
                {sections.map((section) => {
                    const { Component, page } = section;
                    return (
                        <section key={page} className='relative w-screen h-screen' id={`section-${page}`} style={getPageIndex(page)}>
                            <div className='h-full w-full relative z-40' style={getWrapperStyle(page)}>
                                <Component scrollDistance={scrollDistance} currentSection={currentSection} isMobile={false} isScrolling={isScrolling} updateShowWallet={lastPageShowWallet} toNextPage={toNextPage}/>
                            </div>
                            <BottomNav page={page} isMobile={false} />
                        </section>
                    )
                })}
            </div>
            <Popover ref={popoverRef} isLoading={isLoading} isMobile={false} isScrolling={isScrolling} currentSection={currentSection} showWallet={() => {
                setShowWallet(true)
            }}/>
            {/* <WalletPopover show={showWallet} onClose={handleClose} isMobile={false}/> */}
        </div>
    )
}

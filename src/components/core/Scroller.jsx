import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from "@gsap/react";
import BottomNav from './BottomNav';
export default function Scroll({ sections }) {
    const sectionRef = useRef(null)
    const triggerRef = useRef(null)
    const [currentSection, setCurrentSection] = useState(0)
    gsap.registerPlugin(useGSAP, ScrollTrigger)
    
    useGSAP(() => {
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
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const currentSection = Math.floor(progress * (sections.length - 1)) + 1;
                setCurrentSection(currentSection)
            },
        })
        return () => {
            scrollTween?.kill()
        }
    }, [])
    return (
        <>
            <div ref={triggerRef}>
                <div ref={sectionRef} className="flex z-40" style={{ width: `${sections.length * 100}vw`}}>
                    {
                        sections.map((section) => {
                            const { Component, page } = section;
                            return (
                                <section key={page} className='w-screen h-screen pt-[10vh] relative' id={`section-${page}`}>
                                    <div className='h-full relative z-40 ml-[65px]' style={{ width: 'calc(100% - 65px)' }}>
                                        <Component currentSection={currentSection}/>
                                    </div>
                                    <BottomNav page={page}/>
                                </section>
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}

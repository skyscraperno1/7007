import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from "@gsap/react";
import BottomNav from './BottomNav';
export default function Scroll({ sections }) {
    const sectionRef = useRef(null)
    const triggerRef = useRef(null)

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
                            const { Component, page, height } = section;
                            return (
                                <section key={page} className='w-screen h-screen overflow-hidden pt-[10vh] flex relative' style={{
                                    height: `${height ? height : '100vh'}`
                                }}>
                                    <div className='w-[65px] h-screen select-none'></div>
                                    <div className='flex-1 relative overflow-hidden z-50'>
                                        <Component/>
                                    </div>
                                    { page !== 2 && <BottomNav page={page}/>}
                                </section>
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}

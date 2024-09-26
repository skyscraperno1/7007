import { useEffect, useRef, useState } from 'react'

const MobileScroller = ({ isLoading, sections, isMobile }) => {
  const target = useRef(null)
  const [currentSection, setCurrentSection] = useState(0) // 用于存储当前激活的 section
  const sectionRefs = useRef([])

  const handleScroll = () => {
    if (!target.current) return
    const scrollPosition = target.current.scrollTop;
    const height = window.innerHeight - 123
    const _currentSection = Math.floor(scrollPosition / height)
    setCurrentSection(_currentSection)
  }

  useEffect(() => {
    if (!target.current) return
    target.current.addEventListener('scroll', handleScroll)
    return () => target.current.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='overflow-hidden'>
      <div className="w-screen overflow-x-hidden"
        ref={target}
        style={{
          height: `calc(100vh - 123px)`,
          marginTop: '123px',
          scrollSnapType: 'y mandatory',
        }}>
        {
          sections.map(({ Component, page }, index) => {
            return (
              <section key={page}
                ref={(el) => sectionRefs.current[index] = el} // 绑定每个 section 的 ref
                className="w-full h-full sections"
                style={{
                  scrollSnapAlign: 'start',
                  scrollBehavior: 'smooth'
                }}>
                <Component currentSection={currentSection} isMobile={isMobile} />
              </section>
            )
          })
        }
      </div>
    </div>
  )
}

export default MobileScroller
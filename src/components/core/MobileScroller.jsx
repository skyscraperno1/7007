import { useEffect, useRef, useState } from 'react'
import Popover from './Popover'
import WalletPopover from './WalletPopover'

const MobileScroller = ({ isLoading, sections, isMobile }) => {
  const target = useRef(null)
  const ref = useRef(null)
  const [currentSection, setCurrentSection] = useState(1)
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
    if (target.current) {
      const scrollPosition = target.current.scrollTop;
      const height = window.innerHeight - 123
      const _currentSection = Math.floor(scrollPosition / height) + 1
      setCurrentSection(_currentSection)
    }
  }

  useEffect(() => {
    if (!target.current) return
    target.current?.addEventListener('scroll', handleScroll)
  }, [])

  const [showWallet, setShowWallet] = useState(false)
  const handleClose = () => {
    sessionStorage.removeItem('last_pop')
    setShowWallet(false)
  }
  return (
    <div className='overflow-hidden'>
      <div className="w-screen overflow-x-hidden"
        id="mobile-scroller"
        ref={target}
        style={{
          height: `calc(100vh - 123px)`,
          marginTop: '123px',
          scrollSnapType: 'y mandatory',
        }}>
        {
          sections.map(({ Component, page }) => {
            return (
              <section key={page}
                className="w-full h-full sections"
                style={{
                  scrollSnapAlign: 'start',
                  scrollBehavior: 'smooth'
                }}>
                <Component currentSection={currentSection} isMobile={isMobile} updateShowWallet={() => setShowWallet(true)}/>
              </section>
            )
          })
        }
        <Popover ref={ref} isLoading={isLoading} isMobile={isMobile} isScrolling={isScrolling} currentSection={currentSection} showWallet={() => {
          setShowWallet(false)
        }}/>
        <WalletPopover show={false} onClose={handleClose} isMobile={true} />
      </div>
    </div>
  )
}

export default MobileScroller
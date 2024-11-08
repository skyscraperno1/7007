import Navigator from "./components/Navigator";
import SectionOne from "./components/sections/SectionOne";
import SectionTwo from "./components/sections/SectionTwo";
import SectionThree from "./components/sections/SectionThree";
import SectionFive from "./components/sections/SectionFive";
import SectionSix from "./components/sections/SectionSix";
import Scroller from "./components/core/Scroller";
import ScrollBar from "./components/core/ScrollBar";
import Cursor from "./components/core/Cursor";
import ResourcesProvider from "./hook/ResourcesProvider";
import { useResources } from "./hook/useContext";
import LoadingScreen from "./components/core/LoadingScreen";
import MobileScroller from "./components/core/MobileScroller";
import { useState, useEffect } from "react";

const sectionTwoSlot = () => {
  return (
    <div className="w-full h-full"></div>
  )
}
let sections = [
  { Component: SectionOne, page: 1 },
  { Component: SectionTwo, page: 2 },
  { Component: sectionTwoSlot, page: 2.1 },
  { Component: SectionThree, page: 3 },
  { Component: SectionFive, page: 5 },
  { Component: SectionSix, page: 6 },
];

const AppContent = () => {
  const { isLoading, progress, isMobile } = useResources(); 
  const [hasDiscord, setHasDiscord] = useState(false)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');
    const error = urlParams.get('error');
    if (userId || error) {
      setHasDiscord(true)
    }
  }, []);
 
  if (isMobile) {
    sections = sections.filter((section) => section.page !== 2.1)
  }
  const ua = window.navigator.userAgent;
  if (isMobile || /Safari/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua)) {
    import ('./fonts.css');
  }
  const [scrollDistance, setScrollDistance] = useState(0);
  const [triggerHome, setTrigger] = useState(0)
  const toHome = () => {
    setTrigger(triggerHome + 1)
  }
  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={progress} isMobile={isMobile}/>
      <Navigator isMobile={isMobile} toHome={toHome}/>
      {isMobile 
        ? <MobileScroller sections={sections} isLoading={isLoading}  setScrollDistance={setScrollDistance} hasDiscord={hasDiscord}/> 
        : <Scroller sections={sections} isLoading={isLoading} setScrollDistance={setScrollDistance} scrollDistance={scrollDistance} triggerHome={triggerHome} hasDiscord={hasDiscord}/>
      }
      <ScrollBar baseVelocity={isMobile ? 2: 4} isMobile={isMobile} scrollDistance={scrollDistance}>Ultimate AIGC Exchange&nbsp;</ScrollBar>
      {!isLoading && !isMobile && <Cursor />}
    </>
  );
};

export default function App() {
  return (
    <ResourcesProvider>
      <AppContent/>
    </ResourcesProvider>
  );
}

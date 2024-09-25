import Navigator from "./components/Navigator";
import SectionOne from "./components/sections/SectionOne";
import SectionTwo from "./components/sections/SectionTwo";
import SectionTwoPlus from "./components/sections/SectionTwoPlus";
import SectionThree from "./components/sections/SectionThree";
import SectionFour from "./components/sections/SectionFour";
import SectionFive from "./components/sections/SectionFive";
import SectionSix from "./components/sections/SectionSix";
import Scroller from "./components/core/Scroller";
import ScrollBar from "./components/core/ScrollBar";
import Cursor from "./components/core/Cursor";
import ResourcesProvider from "./hook/ResourcesProvider";
import { useResources, useIsMobile } from "./hook/useContext";
import LoadingScreen from "./components/core/LoadingScreen";
import MobileProvider from "./hook/MobileProvider";
let sections = [
  { Component: SectionOne, page: 1 },
  { Component: SectionTwo, page: 2 },
  { Component: SectionTwoPlus, page: 2.1 },
  { Component: SectionThree, page: 3 },
  { Component: SectionFour, page: 4 },
  { Component: SectionFive, page: 5 },
  { Component: SectionSix, page: 6 },
];

const AppContent = () => {
  const { isLoading, progress } = useResources();
  const isMobile = useIsMobile();
  isMobile && import ('./fonts.css');
  sections = isMobile ? sections.filter(item => item.page !== 3 && item.page !== 6) : sections;
  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={progress} isMobile={isMobile}/>
      <Navigator isMobile={isMobile} />
      <Scroller sections={sections} isMobile={isMobile} isLoading={isLoading}/>
      <ScrollBar baseVelocity={2} isMobile={isMobile}>Ultimate AIGC Exchange&nbsp;</ScrollBar>
      {!isLoading && !isMobile && <Cursor />}
    </>
  );
};

export default function App() {
  return (
    <ResourcesProvider>
      <MobileProvider>
        <AppContent />
      </MobileProvider>
    </ResourcesProvider>
  );
}

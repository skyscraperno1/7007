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
import useResources from "./hook/useResources";
import { motion, AnimatePresence } from "framer-motion";
import logo from '/Logo/GreenLogo.png'

const sections = [
  { Component: SectionOne, page: 1 },
  { Component: SectionTwo, page: 2 },
  { Component: SectionTwoPlus, page: 2.1 },
  { Component: SectionThree, page: 3 },
  { Component: SectionFour, page: 4 },
  { Component: SectionFive, page: 5 },
  { Component: SectionSix, page: 6 },
];

const LoadingScreen = () => {
  return (
    <motion.div 
      className="bg-themeGreen w-screen h-screen fixed z-[1000] flex items-center justify-center"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={logo}
        alt="logo"
        className="w-[65px]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

const AppContent = () => {
  const { isLoading } = useResources();

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <Navigator />
      <Scroller sections={sections} />
      <ScrollBar baseVelocity={2}>Ultimate AIGC Exchange&nbsp;</ScrollBar>
      <Cursor />
    </>
  );
};

export default function App() {
  return (
    <ResourcesProvider>
      <AppContent />
    </ResourcesProvider>
  );
}

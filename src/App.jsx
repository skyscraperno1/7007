import Navigator from "./components/Navigator";
import SectionOne from "./components/sections/SectionOne";
import SectionTwo from "./components/sections/SectionTwo";
import SectionTwoPlus from './components/sections/SectionTwoPlus'
import SectionThree from "./components/sections/SectionThree";
import SectionFour from "./components/sections/SectionFour"
import SectionFive from "./components/sections/SectionFive";
import SectionSix from "./components/sections/SectionSix";
import Scroller from './components/core/Scroller'
import ScrollBar from "./components/core/ScrollBar";
const sections = [
  {Component: SectionOne, page: 1},
  {Component: SectionTwo, page: 2},
  {Component: SectionTwoPlus, page: 2.1},
  {Component: SectionThree, page: 3},
  {Component: SectionFour, page: 4},
  {Component: SectionFive, page: 5},
  {Component: SectionSix, page: 6},
]
export default function App() {
  return (
    <>
      <Navigator />
      <Scroller sections={sections}/>
      <ScrollBar baseVelocity={2}>Ultimate AIGC Exchange&nbsp;</ScrollBar>
    </>
  );
}

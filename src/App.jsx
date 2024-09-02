import Navigator from "./components/Navgator";
import SectionOne from "./components/sections/SectionOne";
import SectionTwo from "./components/sections/SectionTwo";
import SectionThree from "./components/sections/SectionThree";
import SectionFour from "./components/sections/SectionFour"
import SectionFive from "./components/sections/SectionFive";
import Scroller from './components/core/Scroller'
import ScrollBar from "./components/core/ScrollBar";
const layerOne = [
  {Component: SectionOne, page: 1},
  {Component: SectionTwo, page: 2, height: '300vh'},
]
const layerTwo = [
  {Component: SectionThree, page: 3},
  {Component: SectionFour, page: 4},
  {Component: SectionFive, page: 5},
]
export default function App() {
  return (
    <>
      <Navigator />
      <Scroller sections={layerOne}/>
      <Scroller sections={layerTwo}/>
      <ScrollBar baseVelocity={2}>Ultimate AIGC Exchange&nbsp;</ScrollBar>
    </>
  );
}

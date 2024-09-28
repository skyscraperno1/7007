import MotionPartner from "./SectionFive/MotionPartner";
import BoldTitle from "../core/BoldTitle";
import { useEffect, useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import { usePhoneCal } from "../../hook/useContext";

const titles = [
  "Stratos",
  "Stake stone",
  "0G LABS",
  "Arbitrum",
  "Story Protocol",
  "RARI CHAIN",
  "Eth storage",
  "Ora protocol",
];

const SectionFive = ({ currentSection, isMobile }) => {
  const [inView, setInView] = useState(false);
  const flag = usePhoneCal()
  const calStyle = useMemo(() => {
    if (flag) {
      return {
        height: "calc(100% - 12vh)",
      }
    } else {
      return {}
    }
  }, [flag])
  
  useEffect(() => {
    if (currentSection === 6) {
      setInView(true);
    } else {
      setInView(false);
    }
  }, [currentSection, isMobile]);

  const titleHeight = isMobile ? { height: "40px" } : { height: "10vh"}
  const gridHeight = isMobile ? { height: "calc(100% - 40px)" } : { height: "calc(100% - 10vh)" }
  return (
    <>
      <div id="section-five" className="h-full w-full overflow-hidden">
        <div id="bounce-box" className={ isMobile? "h-full" : "h-[90vh]"}
          style={calStyle}
        >
          <div className="w-screen text-center h-[10vh] flex items-end justify-center relative z-10" 
            style={titleHeight}
          >
            <BoldTitle content="OUR Partners" color="#FF0501" size="small" />
          </div>
          <div
            className={cn("grid grid-cols-4 w-full", {"grid-cols-2 grid-rows-4": isMobile})}
            style={gridHeight}
          >
            {titles.map((title, page) => (
              <div
                key={"partner_" + page}
                className="w-full h-full flex items-center justify-center"
              >
                <MotionPartner page={page + 1} title={title} show={inView} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionFive;

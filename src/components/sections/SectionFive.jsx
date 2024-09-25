import MotionPartner from "./SectionFive/MotionPartner";
import BoldTitle from "../core/BoldTitle";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

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
  useEffect(() => {
    if (currentSection === 6) {
      setInView(true);
    } else {
      setInView(false);
    }
  }, [currentSection]);
  return (
    <>
      <div id="section-five" className="h-full w-full overflow-hidden">
        <div id="bounce-box" className="h-[85vh]" 
        // style={isMobile && { height: 'calc(100% - 40px)'}}
        >
          <div className="w-screen text-center h-[10vh] flex items-end justify-center" 
          // style={isMobile && { height: '40px'}}
          >
            <BoldTitle content="OUR Partners" color="#FF0501" size="small" />
          </div>
          <div
            className={cn("grid grid-cols-4 w-full", {"grid-cols-2": isMobile})}
            // style={{
            //   height: isMobile ? "calc(100% - 40px)" : "calc(100% - 10vh)",
            // }}
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

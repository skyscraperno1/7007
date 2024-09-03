import MotionPartner from "./SectionFour/MotionPartner";
import BoldTitle from "../core/BoldTitle"
import { useRef } from "react";

const titles = ['Stratos', 'Stake stone', '0G LABS', 'Arbitrum', 'Story Protocol', 'RARI CHAIN', 'Eth storage', 'Ora protocol']

const SectionFour = () => {
    const bounceBox = useRef(null)

    return (
        <>
            <div id="section-four" className='h-full w-full shrink-0'>
                <div id="bounce-box" className="h-[85vh]">
                    <div className="w-screen text-center h-[10vh] flex items-end justify-center">
                        <BoldTitle content='OUR Partners' color="#FF0501" size="small" />
                    </div>
                    <div className="grid grid-cols-4 w-full" style={{
                        height: 'calc(100% - 10vh)'
                    }}>
                        {
                            titles.map((title, page) => (
                                <div
                                    key={'partner_' + page}
                                    className="w-full h-full flex items-center justify-center scale-75 2xl:scale-100"

                                >
                                    <MotionPartner page={page + 1} title={title} parent={bounceBox} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionFour;

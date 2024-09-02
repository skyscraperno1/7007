import MotionPartner from "./SectionFour/MovePartner";
import BoldTitle from "../core/BoldTitle"
const titles = ['Stratos', 'Stake stone', '0G LABS', 'Arbitrum', 'Story Protocol', 'RARI CHAIN', 'Eth storage', 'Ora protocol']
const SectionFour = () => {
    return (
        <>
            <div id="section-four" className='h-full w-full shrink-0'>
                <div className="w-screen text-center h-[10vh] flex items-end justify-center">
                    <BoldTitle content='OUR Partners' color="#FF0501" size="small" />
                </div>
                <div className="grid grid-cols-4 w-full" style={{
                    height: 'calc(100% - 15vh)'
                }}>
                    {
                        titles.map((title, page) => (<div key={'partner_'+page} className="w-full h-full flex items-center justify-center">
                            <MotionPartner page={page + 1} title={title}/>
                        </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default SectionFour;

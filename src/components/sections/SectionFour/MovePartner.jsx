const MotionPartner = ({ page }) => {
  return (
    <div className="select-none bg-no-repeat bg-cover h-[200px] w-[210px] flex items-center justify-center" style={{
      backgroundImage: `url(/Section4/Frames/Frame${page}.png)`
    }}><img className="" src={`/Section4/Partners/Partner${page}.png`} /></div>
  )
}

export default MotionPartner
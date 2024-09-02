const MotionPartner = ({ page, title }) => {
  return (
    <div className="flex flex-col items-center justify-between w-full select-none">
      <div className="bg-no-repeat bg-center h-[200px] w-[210px] flex items-center justify-center" style={{
        backgroundImage: `url(/Section4/Frames/Frame${page}.png)`
      }}><img className="" src={`/Section4/Partners/Partner${page}.png`} />
      </div>
      <div className="uppercase text-[31px]">{title}</div>

    </div>


  )
}

export default MotionPartner
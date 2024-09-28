import ColorBlock from './SectionSix/ColorBlock'
import useResourceByName, { RESOURCE_TYPES} from '../../hook/useResourceByName'
const SectionSix = () => {
  const bg = useResourceByName('$7007.png', RESOURCE_TYPES.IMAGE)
    return (
        <>
        <div id="section-six" className='h-full w-full px-10 flex items-center justify-center' style={{ backgroundImage: `url(${bg})` }}>
            <div id="color-block" className="w-[70%] h-[70%] 2xl:w-[75%] 2xl:h-[75%]">
              <ColorBlock />
            </div>
        </div>
      </>
    )
}

export default SectionSix;

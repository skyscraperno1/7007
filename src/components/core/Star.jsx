import { motion } from 'framer-motion'
import useResourceByName, { RESOURCE_TYPES } from '../../hook/useResourceByName'
const Star = ({ color = '#FF0501', rotate = '0' }) => {
    const RedStar = useResourceByName('RedStar.png', RESOURCE_TYPES.IMAGE)
    const YellowStar = useResourceByName('YellowStar.png', RESOURCE_TYPES.IMAGE)
    return (
        <div style={{ transform: `rotate(${rotate}deg)` }} >
            <motion.img 
                className="scale-75 2xl:scale-100" 
                src={color === '#FF0501' ? RedStar : YellowStar}
                animate={{ rotate: color === '#FF0501' ? 360 : -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

export default Star;

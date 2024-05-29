import image from '@/assets/images/flash-card.png'
import { routerPaths } from '@/routes/path'
import { Link } from 'react-router-dom'
const Logo = () => {
    return (
        <Link to={routerPaths.HOME}>
            <img src={image} alt="logo" className='w-8 h-8 object-cover' />
        </Link>
    )
}

export default Logo
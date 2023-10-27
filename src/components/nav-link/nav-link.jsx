import { Link } from 'react-router-dom'
import { navLinkPropType } from '../../utils/prop-types'
import styles from './nav-link.module.css'

export default function NavLink({ children, type = 'primary', to }) {
  return (
    <Link to={to} className={`text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${styles.link} text_color_${type}`}>
      {children}
    </Link>
  )
}

NavLink.propTypes = navLinkPropType
import { navLinkPropType } from '../../utils/prop-types'
import styles from './nav-link.module.css'

export default function NavLink({ children, type = 'primary', href }) {
  return (
    <a href={href} className={`text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${styles.link} text_color_${type}`}>
      {children}
    </a>
  )
}

NavLink.propTypes = navLinkPropType
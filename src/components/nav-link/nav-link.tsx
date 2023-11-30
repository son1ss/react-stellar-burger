import { Link, LinkProps } from 'react-router-dom'
import styles from './nav-link.module.css'

type Props = {
  to: LinkProps['to']
  type?: 'primary' | 'inactive'
  children: LinkProps['children']
}

export default function NavLink({ children, type = 'primary', to }: Props) {
  return (
    <Link to={to} className={`text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${styles.link} text_color_${type}`}>
      {children}
    </Link>
  )
}

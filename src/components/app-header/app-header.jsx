import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import NavLink from "../nav-link/nav-link";
import { Link, useLocation } from "react-router-dom";

export default function AppHeader() {

  const { pathname } = useLocation()

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <NavLink to="/react-stellar-burger" type={pathname === '/react-stellar-burger' ? 'primary' : 'inactive' }>
            <BurgerIcon type={pathname === '/react-stellar-burger' ? 'primary' : 'secondary' } />Конструктор
          </NavLink>
          <NavLink to="/react-stellar-burger" type="inactive">
            <ListIcon type="secondary" />Лента заказов
          </NavLink>
        </nav>
        <Link to="/react-stellar-burger" className={styles.logo}><Logo /></Link>
        <NavLink to="/react-stellar-burger/profile" type={pathname.includes('/profile') ? 'primary' : 'inactive' }>
          <ProfileIcon type={pathname.includes('/react-stellar-burger/profile') ? 'primary' : 'secondary' } />Личный Кабинет
        </NavLink>
      </div>
    </header>
  )
}
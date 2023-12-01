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
          <NavLink to="/" type={pathname === '/' ? 'primary' : 'inactive' }>
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary' } />Конструктор
          </NavLink>
          <NavLink to="/feed" type={pathname.includes('/feed') ? 'primary' : 'inactive' }>
            <ListIcon type={pathname.includes('/feed') ? 'primary' : 'secondary' } />Лента заказов
          </NavLink>
        </nav>
        <Link to="" className={styles.logo}><Logo /></Link>
        <NavLink to="/profile" type={pathname.includes('/profile') ? 'primary' : 'inactive' }>
          <ProfileIcon type={pathname.includes('/profile') ? 'primary' : 'secondary' } />Личный Кабинет
        </NavLink>
      </div>
    </header>
  )
}
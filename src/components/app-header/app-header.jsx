import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import NavLink from "../nav-link/nav-link";

export default function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <NavLink href="#" type="primary"><BurgerIcon type="primary" />Конструктор</NavLink>
          <NavLink href="#" type="inactive"><ListIcon type="secondary" />Лента заказов</NavLink>
        </nav>
        <a href="/" className={styles.logo}><Logo /></a>
        <NavLink href="#" type="inactive"><ProfileIcon type="secondary" />Личный Кабинет</NavLink>
      </div>
    </header>
  )
}
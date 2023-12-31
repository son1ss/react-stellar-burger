import { Link, useHistory, useLocation } from 'react-router-dom'
import styles from './profile-nav.module.css'
import { useLogoutUserMutation } from '../../services/api'

export default function ProfileNav() {

  const { pathname } = useLocation()
  const { push } = useHistory()

  const [logoutUser] = useLogoutUserMutation()

  const logout = async () => {
    await logoutUser()
    // localStorage.removeItem('refreshToken')
    push('/login')
  }

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <Link 
          className={`text text_type_main-medium text_color_${pathname.endsWith('profile') ? 'primary': 'inactive'}`} 
          to="/profile"
        >
          Профиль
        </Link>
        <Link 
          className={`text text_type_main-medium text_color_${pathname.includes('/orders') ? 'primary': 'inactive'}`} 
          to="/profile/orders"
        >
          История заказов
        </Link>
        <button onClick={logout} type="button" className="text text_type_main-medium text_color_inactive">
          Выход
        </button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  )
}
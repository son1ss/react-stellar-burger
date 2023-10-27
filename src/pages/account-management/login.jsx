import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forms.module.css'
import { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useLoginUserMutation } from '../../services/api'
import { useActions } from '../../hooks/use-actions'

export default function Login() {
  const { setUser } = useActions()
  const history = useHistory()

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [login] = useLoginUserMutation()

  const toggle = () => { setVisiblePassword(prev => !prev) }

  const submit = async e => {
    e.preventDefault()
    const regData = Object.fromEntries(new FormData(e.target))
    const { data: credentials } = await login(regData)
    if (credentials?.user) {
      setUser(credentials.accessToken)
      localStorage.setItem('refreshToken', credentials.refreshToken)
      history.replace('/react-stellar-burger/profile')
    }
  }


  if (localStorage.getItem('refreshToken')) return <Redirect to="/react-stellar-burger/profile" />

  return (
    <main className={styles.main}>
      <form onSubmit={submit} className={styles.fields}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <Input placeholder="E-mail" name="email" type="email" />
        <Input
          placeholder="Пароль"
          name="password"
          icon="ShowIcon"
          onIconClick={toggle}
          type={visiblePassword ? 'text' : 'password'}
        />
        <Button htmlType="submit">Войти</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь? <Link to="/react-stellar-burger/register" className="text text_type_main-default text_color_accent">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link to="/react-stellar-burger/forgot-password" className="text text_type_main-default text_color_accent">Восстановить пароль</Link>
        </p>
      </div>
    </main>
  )
}
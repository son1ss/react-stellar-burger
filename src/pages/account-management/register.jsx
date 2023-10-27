import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forms.module.css'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegisterUserMutation } from '../../services/api'

export default function Register() {
  const form = useRef(null)

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [ register, { isSuccess } ] = useRegisterUserMutation()

  const toggle = () => { setVisiblePassword(prev => !prev) }

  const submit = e => {
    e.preventDefault()
    const regData = Object.fromEntries(new FormData(e.target))
    register(regData)
  }

  return (
    <main className={styles.main}>
      <form ref={form} onSubmit={submit} className={styles.fields}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input placeholder="Имя" name="name" type="text" />
        <Input placeholder="E-mail" name="email" type="email" />
        <Input 
          placeholder="Пароль" 
          name="password"
          icon="ShowIcon" 
          onIconClick={toggle} 
          type={visiblePassword ? 'text' : 'password'} 
        />
        <Button htmlType="submit">Зарегистрироваться</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь? <Link to="/react-stellar-burger/login" className="text text_type_main-default text_color_accent">Войти</Link>
        </p>
      </div>
    </main>
  )
}
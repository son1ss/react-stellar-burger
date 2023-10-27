import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forms.module.css'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useResetPasswordMutation } from '../../services/api'

export default function ResetPassword() {

  const [resetPassword] = useResetPasswordMutation()

  const { push } = useHistory()

  const submitHandler = async (e) => {
    e.preventDefault()
    const resetData = Object.fromEntries(new FormData(e.target))
    const result = await resetPassword(resetData)

    if (result.data) result.data.success && push('/react-stellar-burger/login')
  }

  const [visiblePassword, setVisiblePassword] = useState(false)

  const toggle = () => { setVisiblePassword(prev => !prev) }

  return (
    <main className={styles.main}>
      <form onSubmit={submitHandler} className={styles.fields}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input 
          placeholder="Введите новый пароль" 
          icon="ShowIcon"
          name="password"
          onIconClick={toggle} 
          type={visiblePassword ? 'text' : 'password'} 
        />
        <Input placeholder="Введите код из письма" type="text" name="token" />
        <Button htmlType="submit">Сохранить</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/react-stellar-burger/login" className="text text_type_main-default text_color_accent">Войти</Link>
        </p>
      </div>
    </main>
  )
}
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forms.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useForgotPasswordMutation } from '../../services/api'

export default function ForgotPassword() {

  const [forgot] = useForgotPasswordMutation()

  const { push } = useHistory()

  const submitHandler = async (e) => {
    e.preventDefault()
    const result = await forgot(e.target.elements.email.value)

    if (result.data) result.data.success && push('/react-stellar-burger/reset-password')
  }

  return (
    <main className={styles.main}>
      <form onSubmit={submitHandler} className={styles.fields}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input placeholder="Укажите e-mail" name="email" type="email" />
        <Button htmlType="submit">Восстановить</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to="/react-stellar-burger/login" className="text text_type_main-default text_color_accent">Войти</Link>
        </p>
      </div>
    </main>
  )
}
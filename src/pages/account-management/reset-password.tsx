import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forms.module.css'
import { useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useResetPasswordMutation } from '../../services/api'
import { useForm } from '../../hooks/use-form'

const initialData = {
  password: '',
  token: ''
}

type FormData = typeof initialData

export default function ResetPassword() {

  const [resetPassword] = useResetPasswordMutation()
  const { handleSubmit, register } = useForm(initialData)

  const location = useLocation<{ from?: Location }>()
  const { push } = useHistory()

  const submit = async (resetData: FormData) => {
    const result = await resetPassword(resetData)

    if ('data' in result) result.data.success && push('/login')
  }

  const [visiblePassword, setVisiblePassword] = useState(false)

  const toggle = () => { setVisiblePassword(prev => !prev) }

  if (!(location.state?.from?.pathname === '/forgot-password')) return <Redirect to="/forgot-password" />

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(submit)} className={styles.fields}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input 
          {...register('password')}
          placeholder="Введите новый пароль" 
          icon="ShowIcon"
          onIconClick={toggle} 
          type={visiblePassword ? 'text' : 'password'} 
        />
        <Input {...register('token')} placeholder="Введите код из письма" type="text" />
        <Button htmlType="submit">Сохранить</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to="/login" className="text text_type_main-default text_color_accent">Войти</Link>
        </p>
      </div>
    </main>
  )
}
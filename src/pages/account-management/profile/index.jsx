import styles from './profile.module.css'
import ProfileNav from '../../../components/profile-nav'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEditUserMutation, useGetUserQuery } from '../../../services/api'
import { useForm } from '../../../hooks/use-form'
import { useEffect } from 'react'

export default function Profile() {

  const { data, isLoading } = useGetUserQuery()
  const [editUser] = useEditUserMutation()

  const { handleSubmit, register, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    data?.user && setValues(prev => ({ ...prev, ...data.user }))
  }, [data])

  const submit = formData => {
    const user = Object.fromEntries(Object.entries(formData).filter(([key, val]) => key in data?.user && data?.user[key] !== val))
    editUser(user)
  }

  const reset = () => {
    data?.user && setValues(prev => ({ ...prev, ...data.user }))
  }

  if (isLoading) return 'Loading...'

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <ProfileNav />
        <form className={styles.edit} onSubmit={handleSubmit(submit)} onReset={reset}>
          <Input {...register('name')} placeholder="Имя" type="text" icon="EditIcon" />
          <Input {...register('email')} placeholder="E-mail" type="email" icon="EditIcon" />
          <Input
            {...register('password')}
            placeholder="Пароль"
            icon="EditIcon"
            type="password"
          />
          <div className={styles.buttons}>
            <Button htmlType="reset" type="secondary">Отмена</Button>
            <Button htmlType="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </main>
  )
}
import styles from './profile.module.css'
import ProfileNav from '../../../components/profile-nav'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useGetUserQuery } from '../../../services/api'
import { useForm } from '../../../hooks/use-form'
import { useEffect } from 'react'

export default function Profile() {

  const { data, isLoading } = useGetUserQuery()

  const { handleSubmit, register, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    data?.user && setValues(prev => ({...prev, ...data.user}))
  }, [data])

  if (isLoading) return 'Loading...'

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <ProfileNav />
        <form className={styles.edit}>
          <Input {...register('name')} placeholder="Имя" type="text" icon="EditIcon" />
          <Input {...register('email')} placeholder="E-mail" type="email" icon="EditIcon" />
          <Input
            {...register('password')}
            placeholder="Пароль"
            icon="EditIcon" 
            type="password"
          />
        </form>
      </div>
    </main>
  )
}
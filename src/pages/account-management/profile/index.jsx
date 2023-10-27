import styles from './profile.module.css'
import ProfileNav from '../../../components/profile-nav'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useGetUserQuery } from '../../../services/api'

export default function Profile() {

  const { data, isLoading } = useGetUserQuery()

  if (isLoading) return 'Loading...'

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <ProfileNav />
        <form className={styles.edit}>
          <Input defaultValue={data?.user?.name || null} placeholder="Имя" name="name" type="text" icon="EditIcon" />
          <Input defaultValue={data?.user?.email || null} placeholder="E-mail" name="email" type="email" icon="EditIcon" />
          <Input
            placeholder="Пароль" 
            name="password"
            icon="EditIcon" 
            type="password"
          />
        </form>
      </div>
    </main>
  )
}
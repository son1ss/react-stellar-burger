import Order from '../../../components/order/order'
import ProfileNav from '../../../components/profile-nav'
import { useGetUserOrdersQuery } from '../../../services/api'
import styles from './orders.module.css'

export default function Orders() {
  const { data, isFetching } = useGetUserOrdersQuery()

  if (isFetching) return 'Loading...'

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <div className="pt-20">
          <ProfileNav />
        </div>
        <div className={`custom-scroll pl-2 pr-2 ${styles.orders}`}>
          {data?.orders.toReversed().map(order => <Order {...order} key={order._id} />)}
        </div>
      </div>
    </main>
  )
}
import { useGetOrdersQuery } from '../../services/api'
import Order from '../../components/order/order';
import styles from './feed.module.css'

export default function Feed() {
  const { data, isFetching } = useGetOrdersQuery()

  if (isFetching || !data) return <p>Loading...</p>

  return (
    <main className={styles.main}>
      <h2 className="pl-2 pb-5 pt-10 text text_color_primary text_type_main-large">Лента заказов</h2>
      <div className={styles.inner}>
        <div className={`custom-scroll pl-2 pr-2 ${styles.orders}`}>
          {data.orders.map(order => <Order {...order} key={order._id} />)}
        </div>
        <div className={styles.stats}>
          <div className={styles.dash}>
            <div>
              <h3 className="pb-6 text text_color_primary text_type_main-medium">Готовы:</h3>
              <ul className={styles.list}>
                {data.orders.filter(order => order.status === 'done').slice(-5).map(({ number, _id }) => (
                  <p key={_id} className="text text_color_success text_type_digits-default">{number}</p>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="pb-6 text text_color_primary text_type_main-medium">В работе:</h3>
              <ul className={styles.list}>
                {data.orders.filter(order => order.status === 'pending').slice(-5).map(({ number, _id }) => (
                  <p key={_id} className="text text_color_primary text_type_digits-default">{number}</p>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.total}>
            <h3 className="text text_color_primary text_type_main-medium">Выполнено за все время:</h3>
            <p className="text text_color_primary text_type_digits-large">{data.total}</p>
          </div>
          <div className={styles.total}>
            <h3 className="text text_color_primary text_type_main-medium">Выполнено за сегодня:</h3>
            <p className="text text_color_primary text_type_digits-large">{data.totalToday}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
import { useSelector } from 'react-redux'
import { useCreateOrderQuery } from '../../services/api'
import styles from './order-details.module.css'

export default function OrderDetails() {
  const { bun, fillings } = useSelector(state => state.currentBurger)
  const ingredientsList = [
    bun._id,
    ...fillings.map(filling => filling._id),
    bun._id
  ]
  const { data: burger, isError, isFetching } = useCreateOrderQuery(ingredientsList, { refetchOnMountOrArgChange: true })

  if (isError) return <div className={styles.details}>Ошибка</div>

  return (
    <div className={styles.details}>
      <p className={`text text_type_digits-large pt-4 pb-8 ${styles.id}`}>{isFetching || !burger ? '...' : burger.order.number}</p>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <div className={`pb-15 ${styles.confirm}`}>
        <img src="/react-stellar-burger/images/confirm-1.svg" alt="подтверждеие-1" className={styles.decoration} />
        <img src="/react-stellar-burger/images/confirm-2.svg" alt="подтверждеие-2" className={styles.decoration} />
        <img src="/react-stellar-burger/images/confirm-3.svg" alt="подтверждеие-3" className={styles.decoration} />
        <img src="/react-stellar-burger/images/confirm.svg" alt="подтверждеие" className={styles.decoration} />
      </div>
      <p className="pb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="pb-30 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
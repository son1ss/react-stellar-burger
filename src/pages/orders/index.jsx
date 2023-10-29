import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../../services/api'
import styles from './orders.module.css'
import Order from '../../components/order/order';

export default function Orders({ }) {

  // const accessToken = useSelector(state => state.user.accessToken)
  const { data, isFetching } = useGetOrdersQuery()
  console.log(data);

  if (isFetching) return 'loading'

  return (
    <div>
      {data.orders.map(order => <Order {...order} />)}
    </div>
  )
}
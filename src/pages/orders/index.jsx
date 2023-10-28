import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../../services/api'
import styles from './orders.module.css'

export default function Orders({ }) {

  // const accessToken = useSelector(state => state.user.accessToken)
  const { data } = useGetOrdersQuery()
  console.log(data);

  return (
    <div>

    </div>
  )
}
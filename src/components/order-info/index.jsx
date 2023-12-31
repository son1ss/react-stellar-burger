import { useParams } from 'react-router-dom'
import styles from './order-info.module.css'
import { useGetIngredientsQuery, useGetOrdersQuery, useGetUserOrdersQuery } from '../../services/api'
import { Preview, getPrice } from '../order/order'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

function Ingredient({ name, image, amount, price }) {
  return (
    <li className={styles.ingredient}>
      <div>
        <Preview src={image} alt={name} />
        <span className="text text_type_main-default text_color_primary">{name}</span>
      </div>
      <span className="text text_type_digits-default text_color_primary">{amount} x {price} <CurrencyIcon /></span>
    </li>
  )
}

function OrderInfo({ orders, className }) {

  const { id } = useParams()
  const { data: ingredients, isLoading } = useGetIngredientsQuery()

  const cooking = {
    done: 'Выполнен',
    pending: 'Готовится',
    created: 'Создан'
  }

  const order = orders.find(order => order._id === id)

  const ingredientIds = Object.keys(order.ingredients)

  if (isLoading) return 'Loading...'

  return (
    <div className={`pb-10 ${styles.order} ${className}`}>
      <h4 className="text text_type_digits-default text_color_primary pb-10">#{order.number}</h4>
      <h2 className="text text_color_primary text_type_main-medium">{order.name}</h2>
      <p className={`pb-15 text text_type_main-default text_color_${order.status === 'done' ? 'success' : 'primary'}`}>
        {cooking[order.status]}
      </p>
      <h3 className="text text_type_main-medium text_color_primary">Состав:</h3>
      <ul className="text custom-scroll mt-6 pr-6 mb-8">
        {ingredientIds.map(id => <Ingredient {...ingredients.find(ingredient => ingredient._id === id)} key={id} amount={order.ingredients[id]} />)}
      </ul>
      <div className={styles.info}>
        <FormattedDate date={new Date(order.createdAt)} className="text text_color_inactive text_type_main-default" />
        <span className="text text_type_digits-default text_color_primary">
          {getPrice(order.ingredients, ingredients)}
          <CurrencyIcon />
        </span>
      </div>
    </div>
  )
}

export function FeedOrder({ className }) {
  const { data, isLoading } = useGetOrdersQuery()

  if (isLoading) return 'Loading...'

  return <OrderInfo className={className} orders={data.orders} />
}

export function ProfileOrder({ className }) {
  const { data, isLoading } = useGetUserOrdersQuery()

  if (isLoading) return 'Loading...'

  return <OrderInfo className={className} orders={data.orders} />
}
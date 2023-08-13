import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'

export default function Ingredient({ name, amount, price, image }) {
  return (
    <div className={styles.card}>
      <Counter count={amount} />
      <img src={image} alt={name} className="pl-4 pr-4" />
      <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon /></p>
      <p className={`text text_type_main-default ${styles.name}`} >{name}</p>
    </div>
  )
}
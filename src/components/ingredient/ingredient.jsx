import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import { ingredientComponentPropTypes } from '../../utils/prop-types'

export default function Ingredient({ ingredient, amount, viewInfo }) {
  const { name, price, image } = ingredient;

  return (
    <div className={styles.card} onClick={() => viewInfo(ingredient)}>
      {amount && <Counter count={amount} />}
      <img src={image} alt={name} className="pl-4 pr-4" />
      <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon /></p>
      <p className={`text text_type_main-default ${styles.name}`} >{name}</p>
    </div>
  )
}

Ingredient.propTypes = ingredientComponentPropTypes
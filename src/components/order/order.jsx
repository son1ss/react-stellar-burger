import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useGetIngredientsQuery } from "../../services/api";
import styles from './order.module.css'

export const getPrice = (orderIngredients, ingredients) => {
  let price = 0

  for (let key in orderIngredients) {
    price += ingredients.find(ingredient => ingredient._id === key)?.price || 0 * orderIngredients[key]
  }

  return price
}

export function Preview(props) {
  return (
    <div className={[styles.container, props.className].join(' ')}>
      <img src={props.src} alt={props.alt} className={styles.preview} />
      {props.overlay && <p className={`text text_type_main-small text_color_primary ${styles.previewOverlay}`}>+{props.excess}</p>}
    </div>
  )

}

function IngredientsRow({ ids, ingredients }) {

  const usedIngredients = ingredients.filter(ingredient => ids.includes(ingredient._id))
  const excess = usedIngredients.length - 5

  return (
    <div className={styles.previews}>
      {usedIngredients[5] &&
        <Preview key={usedIngredients[5]._id} src={usedIngredients[5].image} alt={usedIngredients[5].name} overlay={excess > 1} excess={excess} className={styles.icons} />}
      {usedIngredients.slice(0, 5).toReversed().map(ingredient => (
        <Preview key={ingredient._id} src={ingredient.image} className={styles.icons} alt={ingredient.name} />
      ))}
    </div>
  )
}

export default function Order({ createdAt, ingredients: orderIngredients, name, number, _id }) {

  const location = useLocation()

  const { data: ingredients, isLoading } = useGetIngredientsQuery()

  if (isLoading) return 'loading'

  return (
    <Link
      to={{ pathname: `${location.pathname}/${_id}`, state: { background: location } }}
      className={`p-6 ${styles.order}`}
    >
      <div className={styles.row}>
        <p className="text text_color_primary text_type_digits-default">#{number}</p>
        <p className="text text_color_primary text_type_main-default"><FormattedDate date={new Date(createdAt)} /></p>
      </div>
      <p className="text text_type_main-medium text_color_primary">{name}</p>
      <div className={styles.row}>
        <IngredientsRow ids={Object.keys(orderIngredients)} ingredients={ingredients} />
        <p className={`text text_color_primary text_type_digits-default ${styles.price}`}>
          {getPrice(orderIngredients, ingredients)}
          <CurrencyIcon />
        </p>
      </div>
    </Link>
  )
}
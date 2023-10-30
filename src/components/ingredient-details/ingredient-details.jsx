import { useSelector } from 'react-redux'
import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'
import { useGetIngredientsQuery } from '../../services/api'

export default function IngredientDetails() {

  const { data, isFetching } = useGetIngredientsQuery()

  const { id } = useParams()

  if (!data || isFetching) return 'Loading...'

  const ingredient = data.find(ingredient => ingredient._id === id)

  return (
    <div className={styles.ingredient}>
      <img src={ingredient.image_large} alt={ingredient.name} className="pb-4 pl-5 pr-5" />
      <h3 className="pb-8 pt-4 text text_type_main-medium">{ingredient.name}</h3>
      <ul className={`pb-15 text ${styles.stats}`}>
        <li className={`text_color_inactive ${styles.stat}`}>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={`text_color_inactive ${styles.stat}`}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={`text_color_inactive ${styles.stat}`}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={`text_color_inactive ${styles.stat}`}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}
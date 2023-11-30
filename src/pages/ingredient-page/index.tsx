import styles from './ingredient-page.module.css'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'

export default function IngredientPage() {

  return (
    <div className={`pt-30 ${styles.main}`}>
      <h2 className="text text_type_main-large text_color_primary">Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  )
}
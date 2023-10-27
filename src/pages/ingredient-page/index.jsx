import { useLocation } from 'react-router-dom'
import styles from './ingredient-page.module.css'
import { useEffect } from 'react'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useActions } from '../../hooks/use-actions'
import { useGetIngredientsQuery } from '../../services/api'

export default function IngredientPage() {

  const { pathname } = useLocation()
  const { setModalIngredient } = useActions()
  const { data } = useGetIngredientsQuery()

  useEffect(() => {
    const id = pathname.split('/').at(-1)
    const ingredient = data?.find(ingredient => ingredient._id === id) || {}
    setModalIngredient(ingredient)
  }, [data])

  return (
    <div className={`pt-30 ${styles.main}`}>
      <h2 className="text text_type_main-large text_color_primary">Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  )
}
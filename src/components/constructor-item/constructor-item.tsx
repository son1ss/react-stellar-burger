import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useActions } from '../../hooks/use-actions'
import styles from './constructor-item.module.css'

export default function ConstructorItem({ ingredient, index }: {ingredient: Ingredient, index: number}) {
  const ref = useRef(null)
  const { removeIngredient, moveIngredient } = useActions()

  const [, drag] = useDrag({
    type: 'filling',
    item: {index}
  })
  
  const [, drop] = useDrop({
    accept: 'filling',
    drop: ({index: dropIndex}: {index: number}) => {
      if (index === dropIndex) return
      moveIngredient({from: dropIndex, to: index})
    }
  })

  drag(drop(ref))

  return (
    <div ref={ref} className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement 
        price={ingredient.price} 
        thumbnail={ingredient.image} 
        text={ingredient.name} 
        handleClose={() => {removeIngredient(index)}} 
      />
    </div>
  )
}
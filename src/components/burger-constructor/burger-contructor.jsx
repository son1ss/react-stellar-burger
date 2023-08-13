import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './burger-contructor.module.css'
import { burgerConstructorPropTypes } from "../../utils/prop-types";


export default function BurgerConstructor({top, bottom, middle}) {
  const [price, setPrice] = useState(0)


  return (
    <section className="pt-25 pl-4 pr-4 main-block">
      <div className={styles.ingredients}>
        <ConstructorElement type="top" extraClass="ml-8" price={top.price} thumbnail={top.image} text={top.name} isLocked />
        <div className={`custom-scroll pr-2 ${styles.middle}`}>
          {middle.map(ingredient => (
            <div key={ingredient._id} className={styles.item}>
              <DragIcon />
              <ConstructorElement price={ingredient.price} thumbnail={ingredient.image} text={ingredient.name} />
            </div>
          ))}
        </div>
        <ConstructorElement type="bottom" extraClass="ml-8" price={bottom.price} thumbnail={bottom.image} text={bottom.name} isLocked />
      </div>
      <div className={`pt-10 ${styles.confirmation}`}>
        <p className={`text text_type_main-medium ${styles.price}`}>{price} <CurrencyIcon /></p>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = burgerConstructorPropTypes
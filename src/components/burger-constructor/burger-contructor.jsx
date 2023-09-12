import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext, useState } from "react";
import styles from './burger-contructor.module.css'
import { burgerConstructorPropTypes } from "../../utils/prop-types";
import { IngredientsContext } from "../../services/ingredients-context";
import { useModal } from "../../hooks/use-modal";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { api } from "../api/api";



export default function BurgerConstructor() {
  const [isOpenOrder, toggleOpenOrder] = useModal()
  const { currentBurger, ingredients, price } = useContext(IngredientsContext)
  const [orderNumber, setOrderNumber] = useState(0)
  const bun = ingredients.find(ingredient => ingredient._id === currentBurger.bun)
  const fillings = currentBurger.fillings.map(filling => ingredients.find(ingredient => ingredient._id === filling))

  const order = async () => {
    api.createOrder([currentBurger.bun, ...currentBurger.fillings, currentBurger.bun]).then(data => {
      setOrderNumber(data.order.number);
      toggleOpenOrder();
    })
  }


  return (
    <section className="pt-25 pl-4 pr-4 main-block">
      <div className={styles.ingredients}>
        <ConstructorElement type="top" extraClass="ml-8" price={bun.price} thumbnail={bun.image} text={`${bun.name} (верх)`} isLocked />
        <div className={`custom-scroll pr-2 ${styles.middle}`}>
          {fillings.map(ingredient => (
            <div key={ingredient._id} className={styles.item}>
              <DragIcon />
              <ConstructorElement price={ingredient.price} thumbnail={ingredient.image} text={ingredient.name} />
            </div>
          ))}
        </div>
        <ConstructorElement type="bottom" extraClass="ml-8" price={bun.price} thumbnail={bun.image} text={`${bun.name} (низ)`} isLocked />
      </div>
      <div className={`pt-10 ${styles.confirmation}`}>
        <p className={`text text_type_main-medium ${styles.price}`}>{price} <CurrencyIcon /></p>
        <Button onClick={order} htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
      {isOpenOrder &&
      <Modal toggle={toggleOpenOrder} opened={isOpenOrder}>
        <OrderDetails number={orderNumber} />
      </Modal>}
    </section>
  )
}
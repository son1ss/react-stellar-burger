import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useModal } from "../../hooks/use-modal";
import { useActions } from "../../hooks/use-actions";
import styles from './burger-contructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import ConstructorItem from "../constructor-item/constructor-item";
import { useGetUserQuery } from "../../services/api";
import { useHistory } from "react-router-dom";

const getPrice = (bun, fillings) => {
  const price = [bun.price, ...fillings, bun].reduce((prev, current) => prev + current.price)
  return !isNaN(price) ? price : 0
}

export default function BurgerConstructor() {
  const { push } = useHistory()
  const { refetch } = useGetUserQuery()
  const { addIngredient, setBun } = useActions()
  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type === 'bun') setBun(item)
      else addIngredient(item)
    }
  })
  
  const [isOpenOrder, toggleOpenOrder] = useModal()
  const createOrder = async () => {
    await refetch()
    if (localStorage.getItem('refreshToken')) toggleOpenOrder()
    else push('/login')
  }
  const { bun, fillings } = useSelector(state => state.currentBurger);

  return (
    <section className="pt-25 pl-4 pr-4 main-block">
      <div ref={drop} className={styles.ingredients}>
        {!!Object.keys(bun).length && <ConstructorElement type="top" extraClass="ml-8" price={bun.price} thumbnail={bun.image} text={`${bun.name} (верх)`} isLocked />}
        <div className={`custom-scroll pr-2 ${styles.middle}`}>
          {fillings.map((ingredient, index) => (
            <ConstructorItem key={ingredient.uid} ingredient={ingredient} index={index} />
          ))}
        </div>
        {!!Object.keys(bun).length && <ConstructorElement type="bottom" extraClass="ml-8" price={bun.price} thumbnail={bun.image} text={`${bun.name} (низ)`} isLocked />}
      </div>
      <div className={`pt-10 ${styles.confirmation}`}>
        <p className={`text text_type_main-medium ${styles.price}`}>{getPrice(bun, fillings)}<CurrencyIcon /></p>
        <Button onClick={createOrder} htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
      {isOpenOrder &&
      <Modal toggle={toggleOpenOrder}>
        <OrderDetails />
      </Modal>}
    </section>
  )
}
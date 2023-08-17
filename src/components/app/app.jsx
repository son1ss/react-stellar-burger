import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-contructor";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useModal } from "../../hooks/use-modal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";


function App() {
  const [ingredients, setIngredients] = useState()
  const [modalIngredient, setModalIngredient] = useState()
  const [isOpenIngredient, toggleOpenIngredient] = useModal()
  const [isOpenOrder, toggleOpenOrder] = useModal()

  const openIngredientModal = ingredient => {
    setModalIngredient(ingredient)
    toggleOpenIngredient()
  }


  useEffect(() => {
    api.getIngredients().then(ingredients => {setIngredients(ingredients.data)})
  }, [])

  return (
    <>
    <AppHeader />
    <main className={styles.app}>
      {ingredients && 
      <>
        <BurgerIngredients ingredients={ingredients} viewInfo={openIngredientModal} />
        <BurgerConstructor
          top={ingredients[0]}
          middle={ingredients.filter(item => item.type !== 'bun')} 
          bottom={ingredients[0]}
          order={toggleOpenOrder}
        />
      </>}
    </main>
    {modalIngredient && 
    <Modal title="Детали ингредиента" toggle={toggleOpenIngredient} opened={isOpenIngredient} >
      <IngredientDetails ingredient={modalIngredient}/>
    </Modal>}

    <Modal toggle={toggleOpenOrder} opened={isOpenOrder}>
      <OrderDetails />
    </Modal>
    </>
  );
}

export default App;

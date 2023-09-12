import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-contructor";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useModal } from "../../hooks/use-modal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientsContext } from "../../services/ingredients-context";

const baseBurger = {
  fillings: [
    '643d69a5c3f7b9001cfa0947',
    '643d69a5c3f7b9001cfa0946',
    '643d69a5c3f7b9001cfa0945'
  ],
  bun: '643d69a5c3f7b9001cfa093c'
}


function App() {
  const [ingredients, setIngredients] = useState()
  const [currentBurger, setCurrentBurger] = useState(baseBurger)
  const [price, setPrice] = useState(0)
  const [modalIngredient, setModalIngredient] = useState()
  const [isOpenIngredient, toggleOpenIngredient] = useModal()

  const openIngredientModal = ingredient => {
    setModalIngredient(ingredient)
    toggleOpenIngredient()
  }


  useEffect(() => {
    api.getIngredients().then(ingredients => {setIngredients(ingredients.data)})
  }, [])

  useEffect(() => {
    if (currentBurger && ingredients) {
      const fillingsPrices = currentBurger.fillings.map(filling => ingredients.find(ingredient => ingredient._id === filling).price)
      const fillingsPrice = fillingsPrices.reduce((price, filling) => price + filling)
      setPrice(ingredients.find(ingredient => ingredient._id === currentBurger.bun).price * 2 + fillingsPrice)
    }
  }, [currentBurger, ingredients])

  return (
    <>
    <AppHeader />
    <main className={styles.app}>
      {ingredients && currentBurger && 
      <>
        <IngredientsContext.Provider value={{ingredients, currentBurger, price}}>
          <BurgerIngredients viewInfo={openIngredientModal} />
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </>}
    </main>
    {modalIngredient && isOpenIngredient &&
    <Modal title="Детали ингредиента" toggle={toggleOpenIngredient} opened={isOpenIngredient} >
      <IngredientDetails ingredient={modalIngredient}/>
    </Modal>}
    </>
  );
}

export default App;

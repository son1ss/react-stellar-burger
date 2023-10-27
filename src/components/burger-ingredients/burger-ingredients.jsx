import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, Fragment, useRef } from "react";
import { useModal } from "../../hooks/use-modal";
import { useGetIngredientsQuery } from "../../services/api";
import Ingredient from "../ingredient/ingredient";
import styles from './burger-ingredients.module.css'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function BurgerIngredients() {
  const { data: ingredients, isFetching } = useGetIngredientsQuery()
  const categories = [
    {bun: 'Булки'},
    {sauce: 'Соусы'},
    {main: 'Начинки'}
  ];

  const scrollContainer = useRef()

  const [currentTab, setCurrentTab] = useState(Object.keys(categories[0])[0]);
  const setTab = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  const [isOpenIngredient, toggleOpenIngredient] = useModal()
  const toggleDetails = () => {
    isOpenIngredient && window.history.replaceState('', '', '/react-stellar-burger')
    toggleOpenIngredient()
  }

  const handleScroll = () => {
    const scrollPosition = scrollContainer.current.scrollTop
    const tabElements = categories.map((category) => document.getElementById(Object.keys(category)[0]))
    
    let closestTab = null
    let closestDistance = Infinity
    
    tabElements.forEach((element) => {
      if (element) {
        const distance = Math.abs(element.getBoundingClientRect().top - scrollPosition)
        if (distance < closestDistance) {
          closestDistance = distance;
          closestTab = element.id;
        }
      }
    })
    
    if (closestTab) {
      setCurrentTab(closestTab);
    }
  };

  if (isFetching) return 'Загрузка'

  return (
    <section className="pt-10 main-block">
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={styles.categories}>
        {categories.map(item => {
          const id = Object.keys(item)[0]
          const name = item[id]
          return <Tab value={id} key={id} active={currentTab === id} onClick={setTab}>{name}</Tab>
        })}
      </div>
      <div onScroll={handleScroll} ref={scrollContainer} className={`custom-scroll pt-10 ${styles.ingredientsPanel}`}>
        {categories.map(category => {
          const categoryName = Object.keys(category)[0] 
          return (
            <Fragment key={categoryName}>
              <h2 className="text text_type_main-large" id={categoryName}>{category[categoryName]}</h2>
              <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
                {ingredients.filter(ingredient => ingredient.type === categoryName).map(ingredient => (
                  <Ingredient 
                    key={ingredient._id}
                    ingredient={ingredient}
                    openModal={toggleDetails}
                  />
                ))}
              </div>
            </Fragment>
          )
        })}
        
        {isOpenIngredient &&
        <Modal title="Детали ингредиента" toggle={toggleDetails} opened={isOpenIngredient} >
          <IngredientDetails />
        </Modal>}
      </div>
    </section>
  )
}
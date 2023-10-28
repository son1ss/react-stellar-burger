import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-contructor";

function Main() {

  return (
    <main className={styles.app}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;

import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <>
    <AppHeader />
    <main className={styles.app}>
      <BurgerIngredients ingredients={data} />
    </main>
    </>
  );
}

export default App;

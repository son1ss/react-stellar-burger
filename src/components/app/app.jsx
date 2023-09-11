import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-contructor";


function App() {
  return (
    <>
    <AppHeader />
    <main className={styles.app}>
      <BurgerIngredients ingredients={data} />
      <BurgerConstructor
        top={data[0]}
        middle={data.filter(item => item.type !== 'bun')}
        bottom={data[0]}
      />
    </main>
    </>
  );
}

export default App;

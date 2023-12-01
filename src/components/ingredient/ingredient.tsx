import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../services';

export default function Ingredient({ ingredient }: { ingredient: Ingredient }) {
  const { name, price, image, _id } = ingredient;
  const location = useLocation();
  const { bun, fillings } = useTypedSelector((state) => state.currentBurger);
  const [, drag] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const amount = [bun, ...fillings, bun].filter((item) => item._id === ingredient._id).length;

  return (
    <Link to={{ pathname: `/ingredients/${_id}`, state: { background: location } }} className={styles.card} ref={drag}>
      {amount > 0 && <Counter count={amount} />}
      <img src={image} alt={name} className="pl-4 pr-4" />
      <p className={`text text_type_digits-default ${styles.price}`}>
        {price} <CurrencyIcon type="primary" />
      </p>
      <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
    </Link>
  );
}

import { useContext } from "react";
import AddDishes from "./AddDishes";
import CartContext from "../../ContextStore/CartContext";
import styles from "./DishesOnPlate.module.css";

const DishesOnPlate = (props) => {
  const ctx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = amount => {
    ctx.itemAdd({
      id: props.id,
      name:props.name,
      price: props.price,
      amount: amount
    })
  };

  return (
    <li className={styles.dish}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.content}>{props.content}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <AddDishes onAddItem={addToCartHandler} id={props.id}/>
      </div>
    </li>
  );
};

export default DishesOnPlate;

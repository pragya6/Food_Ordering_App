import { useContext, useEffect, useState } from "react";
import CartContext from "../../ContextStore/CartContext";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const ctx = useContext(CartContext);

  const [btnAnimation, setBtnAnimation] = useState(false);

  const { item } = ctx;

  const btnClasses = `${styles.button} ${btnAnimation ? styles.bump : ""}`;

  const badgeNmuber = item.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);

  useEffect(() => {
    if (item.length === 0) {
      return;
    }
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [item]);

  return (
    <button className={btnClasses} onClick={props.onClicked}>
      <span className={styles.icon}>
        <img
          src="https://img.icons8.com/material/24/FFFFFF/shopping-cart-loaded--v1.png"
          alt="cart icon"
        />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{badgeNmuber}</span>
    </button>
  );
};

export default CartButton;

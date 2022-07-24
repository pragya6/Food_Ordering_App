import { useContext, useState } from "react";
import Popup from "../Layout/Popup";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../ContextStore/CartContext";
import Form from "./Form";

const Cart = (props) => {
  const [formVisiblity, setFormVisibility] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const orderShow = ctx.item.length > 0;

  const removeCartItemHandler = (id) => {
    ctx.itemRemove(id);
  };

  const addCartItemHandler = (item) => {
    ctx.itemAdd({ ...item, amount: 1 });
  };

  const formVisiblityHandler = () => {
    setFormVisibility(true);
  };

  const formHideHandler = (state) => {
    setFormVisibility(false);
  };

  const orderConfirm = async (userData) => {
    await fetch(
      "https://react-http-2630b-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: ctx.item,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    setIsSubmitted(true);
    ctx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.item.map((itemInCart) => (
        <CartItem
          key={itemInCart.id}
          name={itemInCart.name}
          price={itemInCart.price}
          amount={itemInCart.amount}
          onRemove={removeCartItemHandler.bind(null, itemInCart.id)}
          onAdd={addCartItemHandler.bind(null, itemInCart)}
        />
      ))}
    </ul>
  );

  const cartContent = (
    <>
      {!formVisiblity && (
        <>
          {cartItems}
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
        </>
      )}
      {formVisiblity && (
        <Form onOrder={orderConfirm} onCancel={formHideHandler} />
      )}
      {!formVisiblity && (
        <div className={styles.actions}>
          <button className={styles.buttonAlt} onClick={props.onHide}>
            Close
          </button>
          {orderShow && (
            <button className={styles.button} onClick={formVisiblityHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const loadingContent = (
    <>
      <p>Order Sent Successfully!!</p>
      <div className={styles.actions}>
          <button className={styles.button} onClick={props.onHide}>
            Close
          </button>
        </div>
    </>
  );

  return (
    <Popup onClick={props.onHide}>
      {!isSubmitted && cartContent}
      {isSubmitted && loadingContent}
    </Popup>
  );
};

export default Cart;

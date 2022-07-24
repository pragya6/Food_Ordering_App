import React from "react";

const CartContext = React.createContext({
  item: [],
  totalAmount: 0,
  itemAdd: (item) => {},
  itemRemove: (id) => {},
  clearCart: () => {}
});

export default CartContext;
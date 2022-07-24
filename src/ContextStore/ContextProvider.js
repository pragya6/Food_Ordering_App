import { useReducer } from "react";
import CartContext from "./CartContext";

const initialValues = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, actions) => {
  if(actions.act === 'Add'){
    const upAmount = state.totalAmount + actions.item.price * actions.item.amount;

    const existingItemIndex = state.items.findIndex(item => item.id === actions.item.id);
    const existingItem = state.items[existingItemIndex];

    let updatedItems;
    if(existingItem){
      const updatedItem = {...existingItem,
      amount : existingItem.amount + actions.item.amount};
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }else{
      updatedItems = state.items.concat(actions.item);
    }

    return{
      items: updatedItems,
      totalAmount: upAmount
    };
  }
  if(actions.act === 'Remove'){

    const existingItemIndex = state.items.findIndex(item => item.id === actions.id);
    const existingItem = state.items[existingItemIndex];
    const upAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if(existingItem.amount === 1){
      updatedItems = state.items.filter(item => item.id !== actions.id);
    }else{
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem; 
    }

    return {
      items: updatedItems,
      totalAmount: upAmount
    }
  }

  if(actions.act === 'Clear'){
    return initialValues;
  }

  return initialValues;
};

const ContextProvider = (props) => {

  const [cartItem, cartAction] = useReducer(cartReducer, initialValues);

  const addItemHandler = (item) => {
    cartAction({act: 'Add', item: item});
  };

  const removeItemHandler = (id) => {
    cartAction({act: 'Remove', id: id});
  };

  const cartClearHandler = () => {
    cartAction({act: 'Clear'});
  };


  const cartContext = {
    item: cartItem.items,
    totalAmount: cartItem.totalAmount,
    itemAdd: addItemHandler,
    itemRemove: removeItemHandler,
    clearCart: cartClearHandler
  };

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default ContextProvider;
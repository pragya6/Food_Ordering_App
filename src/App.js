import { useState } from "react";
import Header from "./components/Header/Header";
import Dishes from "./components/Dishes/Dishes";
import Cart from "./components/Cart/Cart";
import ContextProvider from "./ContextStore/ContextProvider";

function App() {

  const [popupState, setPopupState] = useState(false);

  const showCartHandler = () => {
    setPopupState(true);
  };

  const hideCartHandler = () => {
    setPopupState(false);
  };

  return (
    <ContextProvider>
      {popupState && <Cart onHide={hideCartHandler}/>}
      <Header onCartClick={showCartHandler}/>
      <main>
        <Dishes />
      </main>
    </ContextProvider>
  );
}

export default App;

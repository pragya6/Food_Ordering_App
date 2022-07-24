import { useRef, useState } from "react";
import Input from "../Layout/Input";
import styles from "./AddDishes.module.css";

const AddDishes = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const inputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const amountValue = inputRef.current.value;
    const amountValueNumber = +amountValue;

    if (
      amountValue.trim().length === 0 ||
      amountValueNumber > 5 ||
      amountValueNumber < 1
    ) {
      setIsAmountValid(false);
      return;
    }
    setIsAmountValid(true);
    props.onAddItem(amountValueNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          min: 1,
          step: 1,
          defaultValue: "1",
        }}
      />
      <button type="submit">+Add</button>
      {!isAmountValid && <p>Please Enter Valid Amount(1-5)</p>}
    </form>
  );
};

export default AddDishes;

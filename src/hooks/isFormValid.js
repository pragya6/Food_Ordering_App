import { useState } from "react";

const useIsFormValid = (valid) => {
  const [value, setValue] = useState('');
  const [touch, setTouch] = useState(false);

  const isValid = valid(value);
  const classInvalid = !isValid && touch;

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setTouch(true);
  };

  const reset = () => {
    setValue("");
    setTouch(false);
  };
  return{
    value,
    isValid,
    classInvalid,
    changeHandler,
    blurHandler,
    reset
  };
};

export default useIsFormValid;
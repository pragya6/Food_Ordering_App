import useIsFormValid from "../../hooks/isFormValid";
import styles from "./Form.module.css";

const Form = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    classInvalid: nameClassInvalid,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useIsFormValid(name => name.trim() !== '');

  const {
    value: streetValue,
    isValid: streetIsValid,
    classInvalid: streetClassInvalid,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    reset: streetReset,
  } = useIsFormValid(street => street.trim() !== '');

  const {
    value: codeValue,
    isValid: codeIsValid,
    classInvalid: codeClassInvalid,
    changeHandler: codeChangeHandler,
    blurHandler: codeBlurHandler,
    reset: codeReset,
  } = useIsFormValid(code => code.trim().length === 6);

  const {
    value: cityValue,
    isValid: cityIsValid,
    classInvalid: cityClassInvalid,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    reset: cityReset,
  } = useIsFormValid(city => city.trim() !== '');

  let formValidity = false;

  if (nameIsValid && streetIsValid && codeIsValid && cityIsValid) {
    formValidity = true;
  }

  const nameClasses = nameClassInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const streetClasses = streetClassInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const codeClasses = codeClassInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const cityClasses = cityClassInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const submitHandler = (event) => {
    event.preventDefault();

    if (!formValidity) {
      return;
    }

    nameReset();
    streetReset();
    codeReset();
    cityReset();
    props.onCancel();
    props.onOrder({
      name: nameValue,
      street: streetValue,
      code: codeValue,
      city: cityValue,
    });
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
      </div>
      <div className={codeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={codeValue}
          onChange={codeChangeHandler}
          onBlur={codeBlurHandler}
        />
        {codeClassInvalid && <p>Please! Enter A Valid Code(5-Digits Only)</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!formValidity} >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Form;

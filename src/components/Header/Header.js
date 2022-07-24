import styles from "./Header.module.css";
import CartButton from './CartButton';
import meals from '../../assets/meals.jpg';

const Header = (props) => {

  return (
    <>
      <header className={styles.header}>
        <h1>FullBelly</h1>
        <CartButton onClicked={props.onCartClick}/>
      </header>
      <div className={styles.belowHeader}>
        <img src={meals} alt="A Food Table" />
      </div>
    </>
  );
};

export default Header;

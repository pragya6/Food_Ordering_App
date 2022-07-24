import ReactDOM  from "react-dom";
import styles from "./Popup.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick}/>;
};

const Overlay = (props) => {
  return (
    <div className={styles.popup}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const toWhere = document.getElementById("modal");

const Popup = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, toWhere)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, toWhere)}
    </>
  );
};

export default Popup;

import React from 'react';
import styles from './ErrorModal.module.css';
import Card from './Card';
import Button from './Button';
import ReactDOM from 'react-dom';

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
}

function ModalOverlay(props) {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>Title: {props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>Error: {props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
}

function ErrorModal(props) {
  return (
    <React.Fragment>
      {/* <div className={styles.backdrop} onClick={props.onConfirm} /> */}
      {/* <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>Title: {props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>Error: {props.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card> */}
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
}
export default ErrorModal;
import React from 'react';
import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';
import './Modal.css';

const animationTiming = {
  enter: 400,
  exit: 500,
};

const modal = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      // classNames='fade-slide'
      classNames={{
        enter: '', // Could also just not define
        enterActive: 'ModalOpen',
        exit: '',
        exitActive: 'ModalClosed',
        // First time rendered to DOM (good for elements that are always there)
        // appear:
        // appearActive:
      }}
    >
      <div className='Modal'>
        <h1>A Modal</h1>
        <button className='Button' onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
    // <Transition
    //   mountOnEnter
    //   unmountOnExit
    //   in={props.show}
    //   timeout={animationTiming}
    // >
    //   {(state) => {
    //     const classes = [
    //       'Modal',
    //       state === 'entering'
    //         ? 'ModalOpen'
    //         : state === 'exiting'
    //         ? 'ModalClosed'
    //         : null,
    //     ];
    //     return (
    //       <div className={classes.join(' ')}>
    //         <h1>A Modal</h1>
    //         <button className='Button' onClick={props.closed}>
    //           Dismiss
    //         </button>
    //       </div>
    //     );
    //   }}
    // </Transition>
  );
};

export default modal;

import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';
import './App.css';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import List from './components/List/List';

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className='App'>
        <h1>React Animations</h1>

        <button
          className='Button'
          onClick={() =>
            this.setState((prevState) => ({
              showBlock: !prevState.showBlock,
            }))
          }
        >
          Toggle
        </button>
        <br />

        <CSSTransition
          in={this.state.showBlock}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div
            style={{
              backgroundColor: 'red',
              width: 100,
              height: 100,
              margin: 'auto',
            }}
          >
            CSS Transition!
          </div>
        </CSSTransition>

        <Transition
          in={this.state.showBlock}
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log('onEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onexiting={() => console.log('onexiting')}
          onExited={() => console.log('onExited')}
        >
          {(state) => (
            <div
              style={{
                backgroundColor: 'blue',
                width: 100,
                height: 100,
                margin: 'auto',
                transition: 'opacity 1s ease-out',
                opacity: state === 'exiting' ? 0 : 1,
              }}
            >
              {state}
            </div>
          )}
        </Transition>

        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />

        <Backdrop show={this.state.modalIsOpen} />
        <button className='Button' onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;

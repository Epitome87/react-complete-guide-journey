const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case 'increment':
      return {
        counter: state.counter + 1,
      };
    case 'decrement':
      return {
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

const store = redux.createStore(counterReducer);

let iter = 0;

const counterSubscriber = () => {
  const latestState = store.getState();
  iter++;
  console.log(`${latestState.counter}, total: ${iter}`);
};

store.subscribe(counterSubscriber);

setInterval(() => {
  store.dispatch({ type: 'increment' });
}, 2000);

setInterval(() => {
  store.dispatch({ type: 'decrement' });
}, 4000);

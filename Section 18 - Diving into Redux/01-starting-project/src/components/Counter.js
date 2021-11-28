import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const showCounter = useSelector((state) => state.counter.showCounter);
  const counter = useSelector((state) => state.counter.counter);


  const handleIncrease = () => {
    // dispatch({ type: 'increase', amount: 5 });

    // With Redux Toolkit
    dispatch(counterActions.increase(5)); // { type: increment, payload: 10 }
  };

  const handleIncrement = () => {
    // dispatch({ type: 'increment' }); 

    // With Redux Toolkit
    dispatch(counterActions.increment());
  };

  const handleDecrement = () => {
    // dispatch({ type: 'decrement' });

    // With Redux Toolkit
    dispatch(counterActions.decrement());
    console.log(counter)
  };

  const handleToggleCounter = () => {
    // dispatch({ type: 'toggle' });

    // With Redux Toolkit
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{showCounter && counter}</div>
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleIncrease}>Increment by 5</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <button onClick={handleToggleCounter}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

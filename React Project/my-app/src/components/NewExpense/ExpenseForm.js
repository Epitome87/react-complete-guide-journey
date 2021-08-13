import { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm(props) {
  // Title, amount, and date need values that persist
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  //   const [userInput, setUserinput] = useState({
  //     enteredTitle: '',
  //     enteredAmount: '',
  //     enteredDate: '',
  //   });

  // Handle the title input
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    // Use this method if you combine multiple states into an object
    // setUserinput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    // Safe way if state depends on previous state! Ensures its up to date
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  // Handle the amount input
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });
  };

  // Handle the date input
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserinput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // });
  };

  const submitHandler = (event) => {
    // Prevent default of request being sent and page reloading
    event.preventDefault();

    // Gather the necessary data into a single object
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    // Execute our passed down event handler
    // This passes the data UP to NewExpense
    props.onSaveExpenseData(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label for='title'>Title</label>
          <input
            type='text'
            id='title'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label for='amount'>Amount</label>
          <input
            type='number'
            id='amount'
            value={enteredAmount}
            onChange={amountChangeHandler}
            min='0.01'
            step='0.01'
          />
        </div>
        <div className='new-expense__control'>
          <label for='date'>Date</label>
          <input
            type='date'
            id='date'
            value={enteredDate}
            onChange={dateChangeHandler}
            min='2019-01-01'
            max='2022-12-31'
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;

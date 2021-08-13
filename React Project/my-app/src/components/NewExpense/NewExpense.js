import { useState } from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

function NewExpense(props) {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    // Pass this data up AGAIN to App
    props.onAddExpense(expenseData);
    setShowExpenseForm(false);
  };

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const showExpenseFormHandler = (event) => {
    setShowExpenseForm(true);
  };

  const removeExpenseFormHandler = (event) => {
    setShowExpenseForm(false);
  };

  return (
    <div className='new-expense'>
      {!showExpenseForm && (
        <button onClick={showExpenseFormHandler}>Add New Expense</button>
      )}
      {showExpenseForm && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={removeExpenseFormHandler}
        />
      )}
    </div>
  );
}

export default NewExpense;

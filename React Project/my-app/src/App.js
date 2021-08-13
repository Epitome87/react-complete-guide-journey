import React, { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const DUMMY_EXPENSES = [
  { title: 'Car Insurance', amount: 294.67, date: new Date(2021, 2, 28) },
  { title: 'Amazon', amount: 69.69, date: new Date(2021, 4, 16) },
  { title: 'Wingstop', amount: 21.86, date: new Date(2021, 7, 3) },
  { title: 'Wingstop', amount: 21.86, date: new Date(2021, 7, 4) },
];

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const addExpenseHandler = (expense) => {
    setExpenses((previousExpenses) => [expense, ...previousExpenses]);
  };

  return (
    <div className='App'>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
